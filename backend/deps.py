"""Shared dependencies: db client, logger, auth, models, small helpers."""
from __future__ import annotations

import csv
import io
import logging
import os
from datetime import datetime, timedelta, timezone
from typing import Annotated, Optional

import bcrypt
import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, ConfigDict, EmailStr, Field

# ────────────────────────────────────────────────────────────────
# Logger
# ────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger("maison")


# ────────────────────────────────────────────────────────────────
# Mongo
# ────────────────────────────────────────────────────────────────
mongo_url = os.getenv("MONGO_URL")
db_name = os.getenv("DB_NAME")
mongo_client = AsyncIOMotorClient(mongo_url)
db = mongo_client[db_name]


# ────────────────────────────────────────────────────────────────
# Auth
# ────────────────────────────────────────────────────────────────
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = 24
bearer_scheme = HTTPBearer(auto_error=False)


def _jwt_secret() -> str:
    secret = os.environ.get("JWT_SECRET")
    if not secret:
        raise RuntimeError("JWT_SECRET is not configured")
    return secret


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except ValueError:
        return False


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "role": "admin",
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRY_HOURS),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, _jwt_secret(), algorithm=JWT_ALGORITHM)


async def require_admin(
    credentials: Annotated[Optional[HTTPAuthorizationCredentials], Depends(bearer_scheme)],
) -> dict:
    if credentials is None or not credentials.credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = credentials.credentials
    try:
        payload = jwt.decode(token, _jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access" or payload.get("role") != "admin":
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await db.users.find_one({"id": payload["sub"]}, {"password_hash": 0, "_id": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User no longer exists")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ────────────────────────────────────────────────────────────────
# Models
# ────────────────────────────────────────────────────────────────
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    token: str
    email: EmailStr
    role: str


class AdminMe(BaseModel):
    id: str
    email: EmailStr
    role: str


class AccessRequestCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    country: Optional[str] = Field(default="", max_length=120)
    interest: Optional[str] = Field(default="", max_length=2000)
    referral: Optional[str] = Field(default="", max_length=200)
    grail: Optional[str] = Field(default="", max_length=60)
    set_choice: Optional[str] = Field(default="", max_length=60)
    track: Optional[str] = Field(default="parfum", max_length=32)  # "parfum" | "art" | "both"
    art_piece: Optional[str] = Field(default="", max_length=80)  # e.g. "solstice-01", "artefact-03", "spring-2027"


class AccessRequest(AccessRequestCreate):
    id: str
    reference: str  # e.g. "N° 018"
    created_at: str
    status: str = "new"
    delivery_status: Optional[str] = None
    delivery_status_at: Optional[str] = None


class AppointmentRequestCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    mode: str = Field(pattern="^(paris|video)$")
    preferred: Optional[str] = Field(default="", max_length=200)
    note: Optional[str] = Field(default="", max_length=2000)


class AppointmentRequest(AppointmentRequestCreate):
    id: str
    reference: str
    created_at: str
    status: str = "new"
    delivery_status: Optional[str] = None
    delivery_status_at: Optional[str] = None


class StatusUpdate(BaseModel):
    status: str = Field(pattern="^(new|replied|scheduled|archived)$")


class SubscriberCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    email: EmailStr


class Subscriber(SubscriberCreate):
    id: str
    created_at: str


class SubmitResponse(BaseModel):
    id: str
    reference: str
    message: str


# ────────────────────────────────────────────────────────────────
# Small helpers used across routers
# ────────────────────────────────────────────────────────────────
def _format_reference(n: int) -> str:
    return f"N° {n:03d}"


async def next_reference(collection: str) -> str:
    counter = await db.counters.find_one_and_update(
        {"_id": collection},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=True,
    )
    # motor's find_one_and_update with upsert may return None on first insertion depending on version.
    if not counter:
        counter = await db.counters.find_one({"_id": collection})
    seq = int(counter.get("seq", 1))
    # Start at 18 for a warmer register (never expose 001).
    seq = seq + 17
    return _format_reference(seq)


def collection_for(kind: str):
    if kind == "access":
        return db.access_requests
    if kind == "appointment":
        return db.appointment_requests
    raise HTTPException(status_code=404, detail="Unknown register")


def _normalise_csv(value):
    if value is None:
        return ""
    if isinstance(value, str):
        return value.replace("\r\n", " ").replace("\n", " ").strip()
    return str(value)


def rows_to_csv(rows: list, columns: list) -> str:
    buf = io.StringIO()
    writer = csv.writer(buf, quoting=csv.QUOTE_MINIMAL)
    writer.writerow(columns)
    for r in rows:
        writer.writerow([_normalise_csv(r.get(c, "")) for c in columns])
    return buf.getvalue()
