"""Public /api/gallery endpoint — subscribe to gallery-visit invitations."""
from __future__ import annotations

import re
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, Field

from deps import db

router = APIRouter()

_ALLOWED_CITIES = {"paris", "shanghai", "both"}


class GallerySubscribeCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    city: str = Field(default="both")   # paris | shanghai | both
    note: str = Field(default="", max_length=500)


class GallerySubscribeResponse(BaseModel):
    id: str
    reference: str
    ok: bool = True


@router.post("/gallery/subscribe", response_model=GallerySubscribeResponse, status_code=201)
async def create_gallery_subscription(payload: GallerySubscribeCreate) -> GallerySubscribeResponse:
    city = (payload.city or "both").strip().lower()
    if city not in _ALLOWED_CITIES:
        raise HTTPException(status_code=422, detail="city must be one of: paris, shanghai, both")

    doc_id = str(uuid.uuid4())
    reference = "GAL-" + re.sub(r"[^0-9A-Z]", "", doc_id.upper())[:8]
    created_at = datetime.now(timezone.utc).isoformat()

    doc = {
        "id": doc_id,
        "reference": reference,
        "name": payload.name.strip(),
        "email": payload.email.lower(),
        "city": city,
        "note": payload.note.strip(),
        "created_at": created_at,
        "status": "new",
    }
    await db.gallery_subscribers.insert_one(doc)
    return GallerySubscribeResponse(id=doc_id, reference=reference, ok=True)
