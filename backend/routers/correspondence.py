"""Public /api/correspondence endpoint — quiet mailing list."""

from __future__ import annotations

import uuid
from datetime import datetime, timezone

from fastapi import APIRouter

from deps import SubmitResponse, SubscriberCreate, db, logger
from email_service import (
    send_admin_notification,
    send_subscriber_welcome,
)
from notifications import schedule_background_task

router = APIRouter()


@router.post(
    "/correspondence",
    response_model=SubmitResponse,
    status_code=201,
)
async def create_subscriber(payload: SubscriberCreate) -> SubmitResponse:
    email = str(payload.email).lower()

    existing = await db.subscribers.find_one({"email": email})

    now = datetime.now(timezone.utc).isoformat()

    if existing:
        doc_id = existing["id"]

        await db.subscribers.update_one(
            {"email": email},
            {
                "$set": {
                    "last_subscribed_at": now,
                },
                "$inc": {
                    "subscription_count": 1,
                },
            },
        )

        schedule_background_task(
            send_subscriber_welcome(to=email),
            task_name="Correspondence subscriber confirmation",
            doc_id=doc_id,
        )

        schedule_background_task(
            send_admin_notification(
                kind="correspondence",
                reference=doc_id[:8].upper(),
                name="Returning correspondence subscriber",
                email=email,
                extra={
                    "Submission type": "Repeat correspondence subscription",
                    "Resubscribed at": now,
                },
            ),
            task_name="Correspondence admin notification",
            doc_id=doc_id,
        )

        return SubmitResponse(
            id=doc_id,
            reference=existing.get("reference", ""),
            message="Your correspondence subscription has been refreshed.",
        )

    doc_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()

    # doc = {
    #     "id": doc_id,
    #     "email": email,
    #     "created_at": created_at,
    # }

    doc = {
        "id": doc_id,
        "email": email,
        "created_at": created_at,
        "last_subscribed_at": created_at,
        "subscription_count": 1,
    }

    await db.subscribers.insert_one(doc)

    # Confirmation email to the subscriber.
    schedule_background_task(
        send_subscriber_welcome(to=email),
        task_name="Correspondence subscriber confirmation",
        doc_id=doc_id,
    )

    # Notification email to the admin.
    schedule_background_task(
        send_admin_notification(
            kind="correspondence",
            reference=doc_id[:8].upper(),
            name="Correspondence subscriber",
            email=email,
            extra={
                "Submission type": "Correspondence subscription",
                "Submitted at": created_at,
            },
        ),
        task_name="Correspondence admin notification",
        doc_id=doc_id,
    )

    return SubmitResponse(
        id=doc_id,
        reference="",
        message="Received. Correspondence — occasional, considered.",
    )


# """Public /api/correspondence endpoint — quiet mailing list."""
# from __future__ import annotations

# import asyncio
# import uuid
# from datetime import datetime, timezone

# from fastapi import APIRouter

# from deps import SubmitResponse, SubscriberCreate, db, logger
# from email_service import send_subscriber_welcome

# router = APIRouter()


# @router.post("/correspondence", response_model=SubmitResponse, status_code=201)
# async def create_subscriber(payload: SubscriberCreate) -> SubmitResponse:
#     email = payload.email.lower()
#     existing = await db.subscribers.find_one({"email": email})
#     if existing:
#         return SubmitResponse(
#             id=existing["id"],
#             reference=existing.get("reference", ""),
#             message="Already on our correspondence.",
#         )
#     doc_id = str(uuid.uuid4())
#     doc = {
#         "id": doc_id,
#         "email": email,
#         "created_at": datetime.now(timezone.utc).isoformat(),
#     }
#     await db.subscribers.insert_one(doc)
#     # try:
#     #     asyncio.create_task(send_subscriber_welcome(to=email))
#     # except Exception as exc:  # noqa: BLE001
#     #     logger.warning("Subscriber welcome failed for %s: %s", doc_id, exc)
#     task = asyncio.create_task(send_subscriber_welcome(to=email))

#     def log_welcome_result(completed_task: asyncio.Task) -> None:
#         if completed_task.cancelled():
#             logger.warning(
#                 "Subscriber welcome task cancelled for %s", doc_id
#             )
#             return

#         exc = completed_task.exception()
#         if exc is not None:
#             logger.error(
#                 "Subscriber welcome task failed for %s: %s",
#                 doc_id,
#                 exc,
#                 exc_info=(type(exc), exc, exc.__traceback__),
#             )

#     task.add_done_callback(log_welcome_result)
#     return SubmitResponse(
#         id=doc_id,
#         reference="",
#         message="Received. Correspondence — occasional, considered.",
#     )
