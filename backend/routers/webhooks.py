"""Resend webhooks — delivery / bounce / complaint status callbacks.

Resend posts an event JSON to this endpoint whenever an email changes state.
We tagged each outbound acknowledgement with the returned Resend id
(``applicant_email_id`` on the request document) so we can find the request
and stamp its ``delivery_status`` and ``delivery_history``.

Signature verification is mandatory in production and requires
RESEND_WEBHOOK_SECRET. Unsigned requests are accepted only when
APP_ENV=development.

Docs: https://resend.com/docs/dashboard/webhooks/introduction
"""
from __future__ import annotations

import os
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Header, HTTPException, Request, Response

from deps import db, logger

router = APIRouter()


# Events that carry an ``email.id`` in ``data``. The suffix (after "email.")
# is stored on the request document.
_ACCEPTED = {
    "email.sent",
    "email.delivered",
    "email.delivery_delayed",
    "email.bounced",
    "email.complained",
    "email.opened",
    "email.clicked",
}


def _verify_signature(
    body: bytes,
    svix_id: Optional[str],
    svix_timestamp: Optional[str],
    svix_signature: Optional[str],
) -> None:
    """Verify Resend webhook signatures.

    Unsigned requests are allowed only in development mode.
    Production always requires a configured secret and valid signature.
    """
    app_env = os.environ.get("APP_ENV", "production").strip().lower()
    secret = os.environ.get("RESEND_WEBHOOK_SECRET", "").strip()

    if not secret:
        if app_env == "development":
            logger.warning(
                "[webhooks/resend] no secret configured — accepting unsigned event in development"
            )
            return

        logger.error(
            "[webhooks/resend] webhook secret missing — rejecting request"
        )
        raise HTTPException(
            status_code=503,
            detail="Webhook verification is not configured",
        )

    if not (svix_id and svix_timestamp and svix_signature):
        raise HTTPException(
            status_code=401,
            detail="Missing signature headers",
        )

    try:
        from svix.webhooks import Webhook, WebhookVerificationError
    except Exception:
        logger.error(
            "[webhooks/resend] svix library missing; cannot verify signature"
        )
        raise HTTPException(
            status_code=500,
            detail="Verification library unavailable",
        )

    try:
        Webhook(secret).verify(
            body,
            {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            },
        )
    except WebhookVerificationError as exc:
        logger.warning("[webhooks/resend] invalid signature: %s", exc)
        raise HTTPException(
            status_code=401,
            detail="Invalid signature",
        )


# async def _stamp_request(email_id: str, status: str) -> Optional[str]:
#     """Find the request doc that owns this email id and update its status.

#     Returns the collection name that was updated, or None if no doc matched.
#     """
#     now = datetime.now(timezone.utc).isoformat()
#     update = {
#         "$set": {
#             "delivery_status": status,
#             "delivery_status_at": now,
#         },
#         "$push": {
#             "delivery_history": {"status": status, "at": now},
#         },
#     }
#     for coll_name in ("access_requests", "appointment_requests"):
#         result = await db[coll_name].update_one(
#             {"applicant_email_id": email_id},
#             update,
#         )
#         if result.matched_count:
#             return coll_name
#     return None


async def _stamp_request(
    email_id: str,
    status: str,
    event_id: str,
) -> Optional[str]:
    """Update delivery status once per unique Svix event ID."""

    now = datetime.now(timezone.utc).isoformat()

    update = {
        "$set": {
            "delivery_status": status,
            "delivery_status_at": now,
        },
        "$push": {
            "delivery_history": {
                "event_id": event_id,
                "status": status,
                "at": now,
            },
        },
    }

    for coll_name in ("access_requests", "appointment_requests"):
        result = await db[coll_name].update_one(
            {
                "applicant_email_id": email_id,
                "delivery_history.event_id": {"$ne": event_id},
            },
            update,
        )

        if result.modified_count:
            return coll_name

        existing = await db[coll_name].find_one(
            {"applicant_email_id": email_id},
            {"_id": 1, "delivery_history.event_id": 1},
        )

        if existing:
            processed_ids = {
                item.get("event_id")
                for item in existing.get("delivery_history", [])
            }

            if event_id in processed_ids:
                return f"{coll_name} (duplicate)"

    return None


@router.post("/webhooks/resend")
async def resend_webhook(
    request: Request,
    svix_id: Optional[str] = Header(default=None, alias="svix-id"),
    svix_timestamp: Optional[str] = Header(default=None, alias="svix-timestamp"),
    svix_signature: Optional[str] = Header(default=None, alias="svix-signature"),
) -> Response:
    body = await request.body()
    _verify_signature(body, svix_id, svix_timestamp, svix_signature)

    try:
        event = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON body")

    event_type = event.get("type") or ""
    if event_type not in _ACCEPTED:
        logger.info("[webhooks/resend] ignored event type=%s", event_type)
        return Response(status_code=204)

    data = event.get("data") or {}
    email_id = data.get("email_id") or data.get("id")
    if not email_id:
        logger.warning(
            "[webhooks/resend] event missing email id (event_type=%s)",
            event_type,
        )
        return Response(status_code=204)

    status = event_type.split("email.", 1)[-1]  # sent / delivered / bounced / …
    # updated = await _stamp_request(email_id, status)
    if not svix_id:
        logger.warning("[webhooks/resend] missing event ID")
        return Response(status_code=400)

    updated = await _stamp_request(email_id, status, svix_id)

    if updated and updated.endswith("(duplicate)"):
        logger.info("[webhooks/resend] duplicate event ignored")
    elif updated:
        logger.info(
            "[webhooks/resend] %s → %s", updated, status
        )
    else:
        logger.info(
            "[webhooks/resend] no request matched (event=%s)",
            event_type,
        )
    return Response(status_code=204)
