"""Public /api/appointment endpoint — private consultation booking."""
from __future__ import annotations

import uuid
from datetime import datetime, timezone

from fastapi import APIRouter

from deps import (
    AppointmentRequestCreate,
    SubmitResponse,
    db,
    next_reference,
)
from notifications import dispatch_acknowledgement

router = APIRouter()


@router.post("/appointment", response_model=SubmitResponse, status_code=201)
async def create_appointment_request(payload: AppointmentRequestCreate) -> SubmitResponse:
    doc_id = str(uuid.uuid4())
    reference = await next_reference("appointment")
    created_at = datetime.now(timezone.utc).isoformat()
    doc = {
        "id": doc_id,
        "reference": reference,
        "name": payload.name,
        "email": payload.email,
        "mode": payload.mode,
        "preferred": payload.preferred or "",
        "note": payload.note or "",
        "created_at": created_at,
        "status": "new",
    }
    await db.appointment_requests.insert_one(doc)
    dispatch_acknowledgement(
        kind="appointment",
        doc_id=doc_id,
        reference=reference,
        name=payload.name,
        email=payload.email,
        created_at=created_at,
        extra={
            "Mode": "Paris" if payload.mode == "paris" else "Video",
            "Preferred": payload.preferred or "",
            "Note": payload.note or "",
        },
    )
    return SubmitResponse(
        id=doc_id,
        reference=reference,
        message="Received. We reply personally, in our own time.",
    )
