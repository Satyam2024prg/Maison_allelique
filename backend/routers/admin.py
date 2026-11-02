"""Admin dashboard endpoints — JWT-protected."""
from __future__ import annotations

import os
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Response

from deps import (
    AccessRequest,
    AdminMe,
    AppointmentRequest,
    LoginRequest,
    LoginResponse,
    StatusUpdate,
    SubmitResponse,
    Subscriber,
    collection_for,
    create_access_token,
    db,
    require_admin,
    rows_to_csv,
    verify_password,
)
from email_service import is_configured as email_is_configured
from pdf_service import render_acknowledgement_pdf

router = APIRouter(prefix="/admin")


# ---- login & register views -----------------------------------
@router.post("/login", response_model=LoginResponse)
async def admin_login(payload: LoginRequest) -> LoginResponse:
    email = payload.email.lower()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Not an administrator")
    token = create_access_token(user["id"], email)
    return LoginResponse(token=token, email=email, role="admin")


@router.get("/me", response_model=AdminMe)
async def admin_me(user: dict = Depends(require_admin)) -> AdminMe:
    return AdminMe(id=user["id"], email=user["email"], role=user.get("role", "admin"))


@router.get("/access-requests", response_model=List[AccessRequest])
async def list_access_requests(user: dict = Depends(require_admin)):
    docs = await db.access_requests.find(
        {}, {"_id": 0, "pdf_cache_b64": 0}
    ).sort("created_at", -1).to_list(1000)
    for d in docs:
        d.setdefault("status", "new")
    return docs


@router.get("/appointment-requests", response_model=List[AppointmentRequest])
async def list_appointment_requests(user: dict = Depends(require_admin)):
    docs = await db.appointment_requests.find(
        {}, {"_id": 0, "pdf_cache_b64": 0}
    ).sort("created_at", -1).to_list(1000)
    for d in docs:
        d.setdefault("status", "new")
    return docs


# ---- status update & CSV export -------------------------------
@router.patch("/{kind}-requests/{doc_id}", response_model=SubmitResponse)
async def update_status(
    kind: str,
    doc_id: str,
    payload: StatusUpdate,
    user: dict = Depends(require_admin),
) -> SubmitResponse:
    coll = collection_for(kind)
    result = await coll.find_one_and_update(
        {"id": doc_id},
        {"$set": {"status": payload.status}},
        return_document=True,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Entry not found")
    return SubmitResponse(
        id=doc_id,
        reference=result.get("reference", ""),
        message=f"Status set to {payload.status}.",
    )


@router.get("/access-requests.csv")
async def export_access_csv(user: dict = Depends(require_admin)) -> Response:
    docs = await db.access_requests.find(
        {}, {"_id": 0, "pdf_cache_b64": 0}
    ).sort("created_at", -1).to_list(2000)
    for d in docs:
        d.setdefault("status", "new")
    columns = ["reference", "created_at", "status", "name", "email", "country", "referral", "track", "grail", "set_choice", "art_piece", "interest"]
    body = rows_to_csv(docs, columns)
    return Response(
        content=body,
        media_type="text/csv",
        headers={"Content-Disposition": 'attachment; filename="access-register.csv"'},
    )


@router.get("/appointment-requests.csv")
async def export_appointment_csv(user: dict = Depends(require_admin)) -> Response:
    docs = await db.appointment_requests.find(
        {}, {"_id": 0, "pdf_cache_b64": 0}
    ).sort("created_at", -1).to_list(2000)
    for d in docs:
        d.setdefault("status", "new")
    columns = ["reference", "created_at", "status", "name", "email", "mode", "preferred", "note"]
    body = rows_to_csv(docs, columns)
    return Response(
        content=body,
        media_type="text/csv",
        headers={"Content-Disposition": 'attachment; filename="appointment-register.csv"'},
    )


# ---- subscribers + acknowledgement PDF + config check --------
@router.get("/subscribers", response_model=List[Subscriber])
async def list_subscribers(user: dict = Depends(require_admin)):
    docs = await db.subscribers.find({}, {"_id": 0}).sort("created_at", -1).to_list(2000)
    return docs


@router.get("/subscribers.csv")
async def export_subscribers_csv(user: dict = Depends(require_admin)) -> Response:
    docs = await db.subscribers.find({}, {"_id": 0}).sort("created_at", -1).to_list(5000)
    columns = ["email", "created_at"]
    body = rows_to_csv(docs, columns)
    return Response(
        content=body,
        media_type="text/csv",
        headers={"Content-Disposition": 'attachment; filename="correspondents.csv"'},
    )


# ---- gallery subscribers (Q3 2026 Paris/Shanghai visit) -----
@router.get("/gallery-subscribers")
async def list_gallery_subscribers(user: dict = Depends(require_admin)):
    docs = await db.gallery_subscribers.find({}, {"_id": 0}).sort("created_at", -1).to_list(5000)
    for d in docs:
        d.setdefault("status", "new")
    return docs


@router.get("/gallery-subscribers.csv")
async def export_gallery_subscribers_csv(user: dict = Depends(require_admin)) -> Response:
    docs = await db.gallery_subscribers.find({}, {"_id": 0}).sort("created_at", -1).to_list(5000)
    for d in docs:
        d.setdefault("status", "new")
    columns = ["reference", "created_at", "status", "name", "email", "city", "note"]
    body = rows_to_csv(docs, columns)
    return Response(
        content=body,
        media_type="text/csv",
        headers={"Content-Disposition": 'attachment; filename="gallery-subscribers.csv"'},
    )


import base64

@router.get("/{kind}-requests/{doc_id}/acknowledgement.pdf")
async def download_acknowledgement(
    kind: str,
    doc_id: str,
    user: dict = Depends(require_admin),
) -> Response:
    coll = collection_for(kind)
    doc = await coll.find_one({"id": doc_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Entry not found")

    # Serve the cached PDF if it was stored at submit time. Otherwise render
    # on demand and back-fill the cache so subsequent downloads are instant.
    cached_b64 = doc.get("pdf_cache_b64")
    if cached_b64:
        pdf_bytes = base64.b64decode(cached_b64)
    else:
        pdf_bytes = render_acknowledgement_pdf(
            kind="access" if kind == "access" else "appointment",
            reference=doc.get("reference", ""),
            name=doc.get("name", ""),
            created_at=doc.get("created_at", ""),
        )
        await coll.update_one(
            {"id": doc_id},
            {"$set": {"pdf_cache_b64": base64.b64encode(pdf_bytes).decode("ascii")}},
        )

    safe_ref = (doc.get("reference", "N-000") or "N-000").replace("N° ", "N-").replace(" ", "-")
    filename = f"{kind}-{safe_ref}.pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )


@router.get("/config")
async def admin_config(user: dict = Depends(require_admin)) -> dict:
    return {
        "email_configured": email_is_configured(),
        "sender": os.environ.get("SENDER_EMAIL", ""),
        "admin_inbox": os.environ.get("ADMIN_INBOX", "") or os.environ.get("ADMIN_EMAIL", ""),
    }
