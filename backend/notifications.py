"""Fire-and-forget acknowledgement dispatcher — used by /access and /appointment."""
from __future__ import annotations

import asyncio
import inspect
import base64
from typing import Literal,Coroutine,Any
import logging

from deps import db, logger
from email_service import (
    send_admin_notification,
    send_applicant_acknowledgement,
)
from pdf_service import render_acknowledgement_pdf

Kind = Literal["access", "appointment"]

_COLL_FOR = {"access": "access_requests", "appointment": "appointment_requests"}

def _log_task_result(
    task: asyncio.Task,
    *,
    task_name: str,
    doc_id: str,
) -> None:
    """Retrieve background-task results so failures are not silently missed."""
    if task.cancelled():
        logger.warning(
            "Background task %s was cancelled for request %s",
            task_name,
            doc_id,
        )
        return

    exc = task.exception()
    if exc is not None:
        logger.error(
            "Background task %s failed for request %s: %s",
            task_name,
            doc_id,
            exc,
            exc_info=(type(exc), exc, exc.__traceback__),
        )


# def _schedule_task(
#     coroutine: Coroutine[Any, Any, Any],
#     *,
#     task_name: str,
#     doc_id: str,
# ) -> asyncio.Task:
#     """Schedule a task and make sure its result is observed."""
#     try:
#         task = asyncio.create_task(coroutine)
#     except Exception:
#         coroutine.close()
#         raise

#     task.add_done_callback(
#         lambda completed: _log_task_result(
#             completed,
#             task_name=task_name,
#             doc_id=doc_id,
#         )
#     )
#     return task

logger = logging.getLogger("maison")

def _schedule_task(awaitable, *, task_name, doc_id):
    try:
        task = asyncio.ensure_future(awaitable)

        if isinstance(task, asyncio.Task):
            task.set_name(task_name)

        task.add_done_callback(
            lambda completed: _log_task_result(
                completed,
                task_name=task_name,
                doc_id=doc_id,
            )
        )

        return task

    except Exception:
        if inspect.iscoroutine(awaitable):
            awaitable.close()

        logger.exception(
            "Could not schedule background task: %s for request %s",
            task_name,
            doc_id,
        )
        return None
    
async def _send_applicant_and_persist_id(
    *,
    coll_name: str,
    doc_id: str,
    to: str,
    name: str,
    kind: Kind,
    reference: str,
    pdf_bytes: bytes,
) -> None:
    """Send applicant email and save its Resend ID for delivery webhooks."""
    email_id = await send_applicant_acknowledgement(
        to=to,
        name=name,
        kind=kind,
        reference=reference,
        pdf_bytes=pdf_bytes,
    )

    if email_id:
        await db[coll_name].update_one(
            {"id": doc_id},
            {
                "$set": {
                    "applicant_email_id": email_id,
                    "delivery_status": "queued",
                }
            },
        )


def dispatch_acknowledgement(
    *,
    kind: Kind,
    doc_id: str,
    reference: str,
    name: str,
    email: str,
    created_at: str,
    extra: dict,
) -> None:
    """Render and cache the PDF, then schedule acknowledgement emails."""
    try:
        pdf_bytes = render_acknowledgement_pdf(
            kind=kind,
            reference=reference,
            name=name,
            created_at=created_at,
        )

        coll_name = _COLL_FOR[kind]

        _schedule_task(
            db[coll_name].update_one(
                {"id": doc_id},
                {
                    "$set": {
                        "pdf_cache_b64": base64.b64encode(pdf_bytes).decode("ascii")
                    }
                },
            ),
            task_name="PDF cache update",
            doc_id=doc_id,
        )

        _schedule_task(
            _send_applicant_and_persist_id(
                coll_name=coll_name,
                doc_id=doc_id,
                to=email,
                name=name,
                kind=kind,
                reference=reference,
                pdf_bytes=pdf_bytes,
            ),
            task_name="Applicant acknowledgement",
            doc_id=doc_id,
        )

        _schedule_task(
            send_admin_notification(
                kind=kind,
                reference=reference,
                name=name,
                email=email,
                extra=extra,
            ),
            task_name="Admin notification",
            doc_id=doc_id,
        )

    except Exception as exc:
        logger.warning(
            "Could not schedule post-submit side-effects for %s: %s",
            doc_id,
            exc,
            exc_info=True,
        )

# async def _send_applicant_and_persist_id(
#     *,
#     coll_name: str,
#     doc_id: str,
#     to: str,
#     name: str,
#     kind: Kind,
#     reference: str,
#     pdf_bytes: bytes,
# ) -> None:
#     """Send the applicant email and stamp the returned Resend id back to the
#     request document, so incoming delivery webhooks can find this request."""
#     email_id = await send_applicant_acknowledgement(
#         to=to,
#         name=name,
#         kind=kind,
#         reference=reference,
#         pdf_bytes=pdf_bytes,
#     )
#     if email_id:
#         await db[coll_name].update_one(
#             {"id": doc_id},
#             {"$set": {"applicant_email_id": email_id, "delivery_status": "queued"}},
#         )


# def dispatch_acknowledgement(
#     *,
#     kind: Kind,
#     doc_id: str,
#     reference: str,
#     name: str,
#     email: str,
#     created_at: str,
#     extra: dict,
# ) -> None:
#     """Render PDF, cache it on the request document, then fan out emails.

#     All side-effects are non-fatal: any failure is logged, the caller is
#     unaffected. Emails are dispatched via ``asyncio.create_task`` so that the
#     HTTP response returns immediately.
#     """
#     try:
#         pdf_bytes = render_acknowledgement_pdf(
#             kind=kind,
#             reference=reference,
#             name=name,
#             created_at=created_at,
#         )
#         # Cache the rendered PDF back to the request document. Admin downloads
#         # then serve directly from Mongo without re-running ReportLab.
#         coll_name = _COLL_FOR[kind]
#         asyncio.create_task(
#             db[coll_name].update_one(
#                 {"id": doc_id},
#                 {"$set": {"pdf_cache_b64": base64.b64encode(pdf_bytes).decode("ascii")}},
#             )
#         )
#         # Send applicant email AND persist its Resend id back to the doc so
#         # /api/webhooks/resend can locate the request on delivery callbacks.
#         asyncio.create_task(
#             _send_applicant_and_persist_id(
#                 coll_name=coll_name,
#                 doc_id=doc_id,
#                 to=email,
#                 name=name,
#                 kind=kind,
#                 reference=reference,
#                 pdf_bytes=pdf_bytes,
#             )
#         )
#         asyncio.create_task(
#             send_admin_notification(
#                 kind=kind,
#                 reference=reference,
#                 name=name,
#                 email=email,
#                 extra=extra,
#             )
#         )
#     except Exception as exc:  # noqa: BLE001
#         logger.warning("Post-submit side-effects failed for %s: %s", doc_id, exc)
