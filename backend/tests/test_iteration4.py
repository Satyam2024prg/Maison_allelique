"""Iteration 4 backend tests — email service (console mode), PDF ack, subscribers, config."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "http://127.0.0.1:8000").rstrip("/")
API = f"{BASE_URL}/api"
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")


@pytest.fixture(scope="module")
def token():
    r = requests.post(f"{API}/admin/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, r.text
    return r.json()["token"]


@pytest.fixture(scope="module")
def auth(token):
    return {"Authorization": f"Bearer {token}"}


# ── Access + Appointment: fire-and-forget email/PDF must not block ─────────────
def test_access_post_fast_and_created():
    t0 = time.time()
    r = requests.post(f"{API}/access", json={
        "name": "TEST_iter4_access", "email": "iter4_access@test.com",
        "country": "FR", "interest": "silence", "referral": "friend"
    }, timeout=10)
    dt = time.time() - t0
    assert r.status_code == 201, r.text
    body = r.json()
    assert body["reference"].startswith("N° ")
    assert "Received" in body["message"]
    assert dt < 3.0, f"Access endpoint too slow ({dt:.2f}s) — email should be fire-and-forget"


def test_appointment_post_fast_and_created():
    t0 = time.time()
    r = requests.post(f"{API}/appointment", json={
        "name": "TEST_iter4_appt", "email": "iter4_appt@test.com",
        "mode": "video", "preferred": "next week", "note": "quiet"
    }, timeout=10)
    dt = time.time() - t0
    assert r.status_code == 201, r.text
    body = r.json()
    assert body["reference"].startswith("N° ")
    assert dt < 3.0, f"Appointment endpoint too slow ({dt:.2f}s)"


# ── Correspondence (mailing list) ─────────────────────────────────────────────
def test_correspondence_new_email():
    email = f"TEST_iter4_{int(time.time())}@example.com"
    r = requests.post(f"{API}/correspondence", json={"email": email}, timeout=10)
    assert r.status_code == 201
    body = r.json()
    assert "Received. Correspondence" in body["message"]
    assert "reference" in body


def test_correspondence_duplicate_returns_already():
    email = "TEST_iter4_dup@example.com"
    r1 = requests.post(f"{API}/correspondence", json={"email": email}, timeout=10)
    assert r1.status_code in (200, 201)
    r2 = requests.post(f"{API}/correspondence", json={"email": email}, timeout=10)
    assert r2.status_code in (200, 201)
    assert "Already on our correspondence" in r2.json()["message"]


def test_correspondence_invalid_email_422():
    r = requests.post(f"{API}/correspondence", json={"email": "notanemail"}, timeout=10)
    assert r.status_code == 422


# ── Admin subscribers list + CSV ──────────────────────────────────────────────
def test_admin_subscribers_requires_auth():
    r = requests.get(f"{API}/admin/subscribers", timeout=10)
    assert r.status_code == 401


def test_admin_subscribers_list(auth):
    r = requests.get(f"{API}/admin/subscribers", headers=auth, timeout=10)
    assert r.status_code == 200
    rows = r.json()
    assert isinstance(rows, list)
    if rows:
        row = rows[0]
        assert set(["id", "email", "created_at"]).issubset(row.keys())


def test_admin_subscribers_csv(auth):
    r = requests.get(f"{API}/admin/subscribers.csv", headers=auth, timeout=10)
    assert r.status_code == 200
    ct = r.headers.get("content-type", "")
    assert "text/csv" in ct
    cd = r.headers.get("content-disposition", "")
    assert "correspondents.csv" in cd
    first_line = r.text.splitlines()[0]
    assert first_line == "email,created_at"


# ── Admin config ─────────────────────────────────────────────────────────────
def test_admin_config(auth):
    r = requests.get(f"{API}/admin/config", headers=auth, timeout=10)
    assert r.status_code == 200
    body = r.json()
    assert body["email_configured"] is False
    assert body["sender"] == "contact@maisonallelique.ai"
    assert body["admin_inbox"] == "admin@maisonallelique.ai"


# ── PDF acknowledgement download ─────────────────────────────────────────────
def _create_access(email="TEST_iter4_pdf@test.com"):
    r = requests.post(f"{API}/access", json={
        "name": "TEST_iter4_pdf", "email": email, "country": "FR",
        "interest": "x", "referral": "y"
    }, timeout=10)
    return r.json()["id"]


def _create_appt(email="TEST_iter4_pdf_appt@test.com"):
    r = requests.post(f"{API}/appointment", json={
        "name": "TEST_iter4_pdf_appt", "email": email, "mode": "paris",
        "preferred": "", "note": ""
    }, timeout=10)
    return r.json()["id"]


def test_access_pdf_requires_auth():
    doc_id = _create_access()
    r = requests.get(f"{API}/admin/access-requests/{doc_id}/acknowledgement.pdf", timeout=10)
    assert r.status_code == 401


def test_access_pdf_valid(auth):
    doc_id = _create_access("TEST_iter4_pdfvalid@test.com")
    r = requests.get(f"{API}/admin/access-requests/{doc_id}/acknowledgement.pdf", headers=auth, timeout=15)
    assert r.status_code == 200
    assert "application/pdf" in r.headers.get("content-type", "")
    assert len(r.content) > 1000
    assert r.content.startswith(b"%PDF")


def test_access_pdf_404(auth):
    r = requests.get(f"{API}/admin/access-requests/no-such-id/acknowledgement.pdf", headers=auth, timeout=10)
    assert r.status_code == 404


def test_appointment_pdf_valid(auth):
    doc_id = _create_appt("TEST_iter4_apdf@test.com")
    r = requests.get(f"{API}/admin/appointment-requests/{doc_id}/acknowledgement.pdf", headers=auth, timeout=15)
    assert r.status_code == 200
    assert "application/pdf" in r.headers.get("content-type", "")
    assert len(r.content) > 1000
    assert r.content.startswith(b"%PDF")


def test_appointment_pdf_404(auth):
    r = requests.get(f"{API}/admin/appointment-requests/no-such-id/acknowledgement.pdf", headers=auth, timeout=10)
    assert r.status_code == 404


# ── Sitemap alternates ───────────────────────────────────────────────────────
def test_sitemap_hreflang():
    # r = requests.get(f"{BASE_URL}/sitemap.xml", timeout=10)
    FRONTEND_URL = os.environ.get(
        "FRONTEND_URL",
        "http://127.0.0.1:3000"
    ).rstrip("/")

    r = requests.get(f"{FRONTEND_URL}/sitemap.xml", timeout=10)

    assert r.status_code == 200
    ct = r.headers.get("content-type", "")
    assert "xml" in ct
    body = r.text
    assert "xhtml:link" in body
    assert 'hreflang="fr"' in body
    assert 'hreflang="en"' in body
    assert 'hreflang="x-default"' in body


# ── Regression: iter3 endpoints still working ────────────────────────────────
def test_regression_admin_lists(auth):
    r1 = requests.get(f"{API}/admin/access-requests", headers=auth, timeout=10)
    r2 = requests.get(f"{API}/admin/appointment-requests", headers=auth, timeout=10)
    assert r1.status_code == 200 and isinstance(r1.json(), list)
    assert r2.status_code == 200 and isinstance(r2.json(), list)


def test_regression_csv_exports(auth):
    r1 = requests.get(f"{API}/admin/access-requests.csv", headers=auth, timeout=10)
    r2 = requests.get(f"{API}/admin/appointment-requests.csv", headers=auth, timeout=10)
    assert r1.status_code == 200 and "text/csv" in r1.headers.get("content-type", "")
    assert r2.status_code == 200 and "text/csv" in r2.headers.get("content-type", "")
