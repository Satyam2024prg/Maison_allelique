"""Maison Allélique — FastAPI entry point.

Thin main: env loading, DB, app, routers, CORS, startup/shutdown, admin seed.
Business logic lives in `routers/*.py`; shared helpers in `deps.py`.
"""
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import os
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, FastAPI
from starlette.middleware.cors import CORSMiddleware

from deps import db, hash_password, logger, mongo_client, verify_password
from routers import access as access_router
from routers import admin as admin_router
from routers import appointment as appointment_router
from routers import correspondence as correspondence_router
from routers import gallery as gallery_router
from routers import webhooks as webhooks_router

# ────────────────────────────────────────────────────────────────
# App
# ────────────────────────────────────────────────────────────────
app = FastAPI(title="Maison Allélique — API")
api_router = APIRouter(prefix="/api")


@api_router.get("/")
async def root():
    return {"maison": "Allélique", "status": "quiet"}


api_router.include_router(access_router.router)
api_router.include_router(appointment_router.router)
api_router.include_router(correspondence_router.router)
api_router.include_router(admin_router.router)
api_router.include_router(gallery_router.router)
api_router.include_router(webhooks_router.router)

app.include_router(api_router)

# app.add_middleware(
#     CORSMiddleware,
#     allow_credentials=True,
#     allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=[
        origin.strip()
        for origin in os.environ.get("CORS_ORIGINS", "").split(",")
        if origin.strip()
    ],
    allow_methods=["GET", "POST", "PATCH", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

# ────────────────────────────────────────────────────────────────
# Startup / shutdown
# ────────────────────────────────────────────────────────────────
async def seed_admin() -> None:
    admin_email = os.environ.get("ADMIN_EMAIL", "").lower().strip()
    admin_password = os.environ.get("ADMIN_PASSWORD", "").strip()
    if not admin_email or not admin_password:
        logger.warning("ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin seed")
        return
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Admin user seeded (%s)", admin_email)
    elif not verify_password(admin_password, existing.get("password_hash", "")):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}},
        )
        logger.info("Admin password refreshed (%s)", admin_email)


@app.on_event("startup")
async def on_startup() -> None:
    try:
        await db.users.create_index("email", unique=True)
        await db.access_requests.create_index("created_at")
        await db.appointment_requests.create_index("created_at")
        await db.subscribers.create_index("email", unique=True)
    except Exception as exc:  # noqa: BLE001
        logger.warning("Index creation warning: %s", exc)
    await seed_admin()


@app.on_event("shutdown")
async def on_shutdown() -> None:
    mongo_client.close()
