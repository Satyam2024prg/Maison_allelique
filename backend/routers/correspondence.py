"""Public /api/correspondence endpoint — quiet mailing list."""
from __future__ import annotations

import asyncio
import uuid
from datetime import datetime, timezone

from fastapi import APIRouter

from deps import SubmitResponse, SubscriberCreate, db, logger
from email_service import send_subscriber_welcome

router = APIRouter()


@router.post("/correspondence", response_model=SubmitResponse, status_code=201)
async def create_subscriber(payload: SubscriberCreate) -> SubmitResponse:
    email = payload.email.lower()
    existing = await db.subscribers.find_one({"email": email})
    if existing:
        return SubmitResponse(
            id=existing["id"],
            reference=existing.get("reference", ""),
            message="Already on our correspondence.",
        )
    doc_id = str(uuid.uuid4())
    doc = {
        "id": doc_id,
        "email": email,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.subscribers.insert_one(doc)
    # try:
    #     asyncio.create_task(send_subscriber_welcome(to=email))
    # except Exception as exc:  # noqa: BLE001
    #     logger.warning("Subscriber welcome failed for %s: %s", doc_id, exc)
    task = asyncio.create_task(send_subscriber_welcome(to=email))

    def log_welcome_result(completed_task: asyncio.Task) -> None:
        if completed_task.cancelled():
            logger.warning(
                "Subscriber welcome task cancelled for %s", doc_id
            )
            return

        exc = completed_task.exception()
        if exc is not None:
            logger.error(
                "Subscriber welcome task failed for %s: %s",
                doc_id,
                exc,
                exc_info=(type(exc), exc, exc.__traceback__),
            )

    task.add_done_callback(log_welcome_result)
    return SubmitResponse(
        id=doc_id,
        reference="",
        message="Received. Correspondence — occasional, considered.",
    )
