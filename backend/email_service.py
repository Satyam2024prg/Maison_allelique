"""
Maison Allélique — email service.

Sends transactional emails via Resend. If RESEND_API_KEY is not set,
degrades gracefully to console-logging so the app remains fully
functional without configured mail delivery.
"""
from __future__ import annotations

import asyncio
import base64
import html
import logging
import os
from typing import Iterable, Optional

logger = logging.getLogger("maison.email")

try:
    import resend  # type: ignore
except Exception:  # noqa: BLE001
    resend = None

def _validate_header_value(value: str) -> str:
    """Reject newline characters in email header values."""
    if "\r" in value or "\n" in value:
        raise ValueError("Invalid newline character in email header value")
    return value

def _get_api_key() -> Optional[str]:
    key = os.environ.get("RESEND_API_KEY", "").strip()
    return key or None


def _get_sender() -> str:
    return os.environ.get("SENDER_EMAIL", "").strip() or "onboarding@resend.dev"


def _get_admin_inbox() -> str:
    return os.environ.get("ADMIN_INBOX", "").strip() or os.environ.get("ADMIN_EMAIL", "").strip()


def is_configured() -> bool:
    return bool(_get_api_key()) and resend is not None


def _send_sync(
    to: str,
    subject: str,
    html: str,
    text: str,
    attachments: Optional[Iterable[dict]] = None,
) -> Optional[str]:
    """Blocking send. Returns the resend id, or None if console-mode."""
    api_key = _get_api_key()
    attachment_list = list(attachments) if attachments else []
    if not api_key or resend is None:
        logger.info(
            "[email/console-mode] to=%s subject=%r attachments=%d",
            to,
            subject,
            len(attachment_list),
        )
        logger.debug("[email/console-mode] body:\n%s", text)
        return None

    resend.api_key = api_key
    params = {
        "from": _get_sender(),
        "to": [to],
        "subject": subject,
        "html": html,
        "text": text,
    }
    if attachment_list:
        params["attachments"] = attachment_list
    try:
        result = resend.Emails.send(params)
        return (result or {}).get("id")
    except Exception as exc:  # noqa: BLE001
        logger.error("[email] Resend send failed: %s", exc)
        return None


async def send_email(
    to: str,
    subject: str,
    html: str,
    text: str,
    attachments: Optional[Iterable[dict]] = None,
) -> Optional[str]:
    """Non-blocking wrapper — runs the sync SDK in a worker thread."""
    return await asyncio.to_thread(_send_sync, to, subject, html, text, attachments)


def _attachment_from_bytes(filename: str, content: bytes, content_type: str = "application/pdf") -> dict:
    return {
        "filename": filename,
        "content": base64.b64encode(content).decode("ascii"),
        "content_type": content_type,
    }


# ────────────────────────────────────────────────────────────────
# High-level flows
# ────────────────────────────────────────────────────────────────
def _wrap_html(body_html: str) -> str:
    return f"""<!doctype html>
<html><body style="margin:0;padding:0;background:#F4F1EA;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
         style="background:#F4F1EA;padding:48px 24px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0"
             style="background:#F4F1EA;color:#0A0A0A;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.6;">
        <tr><td style="padding:0 0 24px;letter-spacing:0.28em;text-transform:uppercase;font-size:10px;color:#6B6B6B;">
          Maison · <span style="font-family:'Times New Roman',serif;font-style:italic;text-transform:none;letter-spacing:normal;font-size:14px;color:#0A0A0A;">Allélique</span>
        </td></tr>
        <tr><td style="padding:0 0 32px;border-bottom:1px solid rgba(10,10,10,0.15);"></td></tr>
        <tr><td style="padding:32px 0 0;">{body_html}</td></tr>
        <tr><td style="padding:40px 0 0;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:#6B6B6B;">
          Éditions Vivantes
        </td></tr>
        <tr><td style="padding:8px 0 0;font-size:11px;color:#6B6B6B;">
          Melissa SASU · 29 Rue d'Artois · 75008 Paris
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>"""


async def send_applicant_acknowledgement(
    *,
    to: str,
    name: str,
    kind: str,  # 'access' | 'appointment'
    reference: str,
    pdf_bytes: bytes,
) -> Optional[str]:
    label = "Introduction" if kind == "access" else "Consultation"
    safe_filename_reference = "".join(
        char for char in reference
        if char.isalnum() or char in ("-", "_")
    )

    filename = f"{label.lower()}-{safe_filename_reference}.pdf"
    safe_subject_reference = _validate_header_value(reference)
    subject = f"{label} {safe_subject_reference} · Received — Maison Allélique"

    safe_name = html.escape(name, quote=True)
    safe_reference = html.escape(reference, quote=True)
    body_html = f"""
      <p style="font-family:'Times New Roman',serif;font-style:italic;font-size:22px;line-height:1.35;margin:0 0 16px;color:#0A0A0A;">
        Received. We reply personally,<br/>in our own time.
      </p>
      <p style="font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:#5C1A1B;margin:16px 0 24px;">
        {label} {safe_reference}
      </p>
      <p style="margin:0 0 20px;color:#0A0A0A;">
        {safe_name},
      </p>
      <p style="margin:0 0 20px;color:#0A0A0A;">
        Your {label.lower()} has been set down in our register. A numbered
        acknowledgement, sealed with our mark, is enclosed with this letter.
      </p>
      <p style="margin:24px 0 0;color:#6B6B6B;font-size:12px;">
        We do not sell products. We compose ceremonies.
      </p>
    """
    text_body = (
        f"{label} {reference} — Received.\n\n"
        f"{name},\n\n"
        f"Your {label.lower()} has been set down in our register. "
        f"A numbered acknowledgement is attached to this letter.\n\n"
        f"Received. We reply personally, in our own time.\n\n"
        f"— Maison Allélique · Éditions Vivantes\n"
        f"29 Rue d'Artois, 75008 Paris.\n"
    )

    attachments = [_attachment_from_bytes(filename, pdf_bytes)]
    return await send_email(to, subject, _wrap_html(body_html), text_body, attachments)


async def send_admin_notification(
    *,
    kind: str,
    reference: str,
    name: str,
    email: str,
    extra: dict,
) -> Optional[str]:
    admin = _get_admin_inbox()
    if not admin:
        logger.info("[email] admin inbox not configured — skipping admin notification")
        return None
    label = "Access request" if kind == "access" else "Appointment request"
    safe_subject_reference = _validate_header_value(reference)
    safe_subject_name = _validate_header_value(name)

    subject = (
        f"{label} {safe_subject_reference} · "
        f"{safe_subject_name} — Maison Allélique"
    )
    safe_name = html.escape(name, quote=True)
    safe_email = html.escape(email, quote=True)
    safe_reference = html.escape(reference, quote=True)
    fields_html = "".join(
        f'<tr><td style="padding:6px 12px 6px 0;color:#6B6B6B;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;">{html.escape(str(k), quote=True)}</td>'
        f'<td style="padding:6px 0;color:#0A0A0A;">{html.escape(str(v), quote=True)}</td></tr>'
        for k, v in extra.items()
        if v
    )
    body_html = f"""
      <p style="font-size:10px;letter-spacing:0.28em;text-transform:uppercase;color:#5C1A1B;margin:0 0 16px;">
        {label} · {safe_reference}
      </p>
      <p style="font-family:'Times New Roman',serif;font-style:italic;font-size:22px;color:#0A0A0A;margin:0 0 24px;">
        A new correspondent.
      </p>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-top:1px solid rgba(10,10,10,0.15);">
        <tr><td style="padding:12px 12px 6px 0;color:#6B6B6B;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;">Name</td>
            <td style="padding:12px 0 6px;color:#0A0A0A;">{safe_name}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#6B6B6B;font-size:10px;letter-spacing:0.28em;text-transform:uppercase;">Email</td>
            <td style="padding:6px 0;color:#0A0A0A;"><a href="mailto:{safe_email}" style="color:#0A0A0A;">{safe_email}</a></td></tr>
        {fields_html}
      </table>
    """
    text_lines = [f"{label} {reference}", f"Name: {name}", f"Email: {email}"]
    for k, v in extra.items():
        if v:
            text_lines.append(f"{k}: {v}")
    return await send_email(admin, subject, _wrap_html(body_html), "\n".join(text_lines))


async def send_subscriber_welcome(*, to: str) -> Optional[str]:
    subject = "Correspondance — occasional, considered"
    body_html = """
      <p style="font-family:'Times New Roman',serif;font-style:italic;font-size:22px;color:#0A0A0A;margin:0 0 20px;">
        Received.
      </p>
      <p style="margin:0 0 20px;color:#0A0A0A;">
        You are on our correspondence. It is occasional, and considered.
      </p>
      <p style="margin:24px 0 0;color:#6B6B6B;font-size:12px;">
        The planet, speaking in silence.
      </p>
    """
    text_body = "Received.\n\nYou are on our correspondence. It is occasional, and considered.\n\n— Maison Allélique · Éditions Vivantes"
    return await send_email(to, subject, _wrap_html(body_html), text_body)
