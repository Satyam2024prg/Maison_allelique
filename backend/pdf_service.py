"""
Maison Allélique — PDF acknowledgement.

Generates a numbered, sealed PDF for a submission. Uses reportlab (no external fonts:
we use the built-in Helvetica + Times-Italic families, which are close enough to
Inter + Cormorant Garamond for a quiet slip of correspondence).
"""
from __future__ import annotations

import io
import math
from datetime import datetime, timezone

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A5
from reportlab.pdfgen import canvas

ENCRE = HexColor("#0A0A0A")
OS = HexColor("#F4F1EA")
CENDRE = HexColor("#6B6B6B")
SANG = HexColor("#5C1A1B")


def _draw_radial_mark(c: canvas.Canvas, cx: float, cy: float, radius: float = 22) -> None:
    """Draw the maison's living-system mark: two rings + rays + terminal nodes."""
    c.setStrokeColor(ENCRE)
    c.setFillColor(ENCRE)
    c.setLineWidth(0.4)
    # Two concentric rings
    c.circle(cx, cy, radius, stroke=1, fill=0)
    c.circle(cx, cy, radius * 0.55, stroke=1, fill=0)
    # Rays with terminal dots
    rays = 8
    for i in range(rays):
        angle = (i * 2 * math.pi) / rays - math.pi / 2
        x1 = cx + (radius * 0.55) * math.cos(angle)
        y1 = cy + (radius * 0.55) * math.sin(angle)
        x2 = cx + radius * math.cos(angle)
        y2 = cy + radius * math.sin(angle)
        c.line(x1, y1, x2, y2)
        c.circle(x2, y2, 0.7, stroke=0, fill=1)
    # Central node
    c.circle(cx, cy, 1.1, stroke=0, fill=1)


def _draw_sang_seal(c: canvas.Canvas, cx: float, cy: float, size: float = 8) -> None:
    """The maison's single --sang seal, slightly rotated."""
    c.saveState()
    c.setFillColor(SANG)
    c.translate(cx, cy)
    c.rotate(3)
    c.rect(-size / 2, -size / 2, size, size, stroke=0, fill=1)
    c.restoreState()


def _tracked(c: canvas.Canvas, text: str, x: float, y: float, color=CENDRE, size: float = 6.5) -> None:
    """Small tracked-caps label."""
    c.setFillColor(color)
    c.setFont("Helvetica", size)
    tracked = "  ".join(list(text.upper()))
    c.drawString(x, y, tracked)


def render_acknowledgement_pdf(
    *,
    kind: str,  # 'access' | 'appointment'
    reference: str,
    name: str,
    created_at: str,
) -> bytes:
    """
    Render a single-page A5 PDF acknowledgement.
    Returns the PDF as bytes.
    """
    buf = io.BytesIO()
    width, height = A5  # points

    c = canvas.Canvas(buf, pagesize=A5)
    # Background wash
    c.setFillColor(OS)
    c.rect(0, 0, width, height, stroke=0, fill=1)

    # Top edge: mark + wordmark
    _draw_radial_mark(c, 40, height - 45, radius=12)
    _tracked(c, "Maison ·", 60, height - 43, color=ENCRE, size=6.5)
    c.setFillColor(ENCRE)
    c.setFont("Times-Italic", 12)
    c.drawString(125, height - 45, "Allélique")

    # Top right: Éditions Vivantes tracked (right-aligned)
    c.setFillColor(CENDRE)
    c.setFont("Helvetica", 6)
    edv_txt = "  ".join(list("Éditions Vivantes".upper()))
    edv_w = c.stringWidth(edv_txt, "Helvetica", 6)
    c.drawString(width - 40 - edv_w, height - 43, edv_txt)

    # Ruling below header
    c.setStrokeColor(ENCRE)
    c.setLineWidth(0.3)
    c.line(40, height - 60, width - 40, height - 60)

    # Kind label + reference (very large)
    kind_label = "Introduction" if kind == "access" else "Consultation"
    _tracked(c, kind_label, 40, height - 100, color=CENDRE)

    c.setFillColor(ENCRE)
    c.setFont("Times-Italic", 48)
    c.drawString(40, height - 165, reference)

    # Received line
    _tracked(c, "Received", 40, height - 195, color=SANG, size=7)

    # Body — italic display line
    c.setFillColor(ENCRE)
    c.setFont("Times-Italic", 20)
    lines_italic = [
        "Received.",
        "We reply personally,",
        "in our own time.",
    ]
    y = height - 240
    for line in lines_italic:
        c.drawString(40, y, line)
        y -= 26

    # Body — quiet sans block
    c.setFillColor(CENDRE)
    c.setFont("Helvetica", 8.5)
    quiet_lines_en = [
        "Your introduction has been set down in our register.",
        "You will hear from us.",
    ] if kind == "access" else [
        "Your consultation has been set down in our register.",
        "You will hear from us.",
    ]
    y -= 10
    for line in quiet_lines_en:
        c.drawString(40, y, line)
        y -= 12

    # Middle divider hairline
    c.setStrokeColor(ENCRE)
    c.setLineWidth(0.3)
    y -= 20
    c.line(40, y, width - 40, y)

    # Meta lines
    c.setFillColor(ENCRE)
    c.setFont("Helvetica", 8)
    y -= 22
    if name:
        _tracked(c, "For", 40, y + 12, color=CENDRE, size=6)
        c.drawString(40, y, name)
    try:
        dt = datetime.fromisoformat(created_at.replace("Z", "+00:00"))
    except Exception:
        dt = datetime.now(timezone.utc)
    date_str = dt.strftime("%d %B %Y · %H:%M UTC")
    _tracked(c, "Set down", 40, y - 22, color=CENDRE, size=6)
    c.drawString(40, y - 34, date_str)

    # Footer — RP + seal
    _tracked(c, "Responsible Person", 40, 60, color=CENDRE, size=6)
    c.setFillColor(CENDRE)
    c.setFont("Helvetica", 7)
    c.drawString(40, 48, "Melissa SASU · 29 Rue d'Artois · 75008 Paris")

    # A single sang seal, bottom right, tilted
    _draw_sang_seal(c, width - 55, 55, size=10)
    _tracked(c, "N° " + reference.replace("N° ", ""), width - 130, 60, color=CENDRE, size=6)

    c.showPage()
    c.save()
    return buf.getvalue()
