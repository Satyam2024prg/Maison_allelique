"""Public /api/access endpoint — application-to-the-register form."""
from __future__ import annotations

import uuid
from datetime import datetime, timezone

from fastapi import APIRouter

from deps import (
    AccessRequestCreate,
    SubmitResponse,
    db,
    next_reference,
)
from notifications import dispatch_acknowledgement

router = APIRouter()


@router.post("/access", response_model=SubmitResponse, status_code=201)
async def create_access_request(payload: AccessRequestCreate) -> SubmitResponse:
    doc_id = str(uuid.uuid4())
    reference = await next_reference("access")
    created_at = datetime.now(timezone.utc).isoformat()
    doc = {
        "id": doc_id,
        "reference": reference,
        "name": payload.name,
        "email": payload.email,
        "country": payload.country or "",
        "interest": payload.interest or "",
        "referral": payload.referral or "",
        "grail": payload.grail or "",
        "set_choice": payload.set_choice or "",
        "created_at": created_at,
        "status": "new",
    }
    await db.access_requests.insert_one(doc)
    dispatch_acknowledgement(
        kind="access",
        doc_id=doc_id,
        reference=reference,
        name=payload.name,
        email=payload.email,
        created_at=created_at,
        extra={
            "Country": payload.country or "",
            "Referral": payload.referral or "",
            "Grail": payload.grail or "—",
            "Set": payload.set_choice or "—",
            "Interest": payload.interest or "",
        },
    )
    return SubmitResponse(
        id=doc_id,
        reference=reference,
        message="Received. We reply personally, in our own time.",
    )
