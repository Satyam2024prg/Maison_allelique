"""Backend tests for Maison Allélique iteration 2."""
import os
import re
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "http://127.0.0.1:8000").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

# REF_RE = re.compile(r"^N° 0\d{2}$")
REF_RE = re.compile(r"^N° \d{3,}$")


@pytest.fixture(scope="session")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def admin_token(session):
    r = session.post(f"{API}/admin/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, r.text
    return r.json()["token"]


# ── Health ──
def test_root(session):
    r = session.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert data == {"maison": "Allélique", "status": "quiet"}


# ── Access ──
class TestAccess:
    def test_create_access_valid(self, session):
        r = session.post(f"{API}/access", json={
            "name": "TEST_Ada Lovelace",
            "email": "TEST_ada@example.com",
            "country": "France",
            "interest": "Édition Vivante",
            "referral": "friend"
        })
        assert r.status_code == 201, r.text
        d = r.json()
        assert "id" in d and REF_RE.match(d["reference"]), d
        assert d["message"] == "Received. We reply personally, in our own time."
        pytest.access_ref = d["reference"]
        pytest.access_id = d["id"]

    def test_access_invalid_email(self, session):
        r = session.post(f"{API}/access", json={
            "name": "TEST_x", "email": "not-an-email", "country": "", "interest": "", "referral": ""
        })
        assert r.status_code == 422

    def test_access_empty_name(self, session):
        r = session.post(f"{API}/access", json={
            "name": "", "email": "a@b.com", "country": "", "interest": "", "referral": ""
        })
        assert r.status_code == 422


# ── Appointment ──
class TestAppointment:
    def test_create_appointment_paris(self, session):
        r = session.post(f"{API}/appointment", json={
            "name": "TEST_Grace Hopper",
            "email": "TEST_grace@example.com",
            "mode": "paris",
            "preferred": "Tuesday afternoon",
            "note": "Prefer quiet room"
        })
        assert r.status_code == 201, r.text
        d = r.json()
        assert REF_RE.match(d["reference"]), d
        pytest.appt_ref = d["reference"]

    def test_create_appointment_video(self, session):
        r = session.post(f"{API}/appointment", json={
            "name": "TEST_Video User", "email": "TEST_v@example.com",
            "mode": "video", "preferred": "", "note": ""
        })
        assert r.status_code == 201, r.text

    def test_appointment_invalid_mode(self, session):
        r = session.post(f"{API}/appointment", json={
            "name": "TEST_X", "email": "x@y.com", "mode": "invalid", "preferred": "", "note": ""
        })
        assert r.status_code == 422


# ── References monotonic ──
def test_references_monotonic(session):
    refs = []
    for i in range(2):
        r = session.post(f"{API}/access", json={
            "name": f"TEST_Mono{i}", "email": f"TEST_mono{i}@example.com",
            "country": "", "interest": "", "referral": ""
        })
        assert r.status_code == 201
        ref = r.json()["reference"]
        assert REF_RE.match(ref), ref
        # extract number
        n = int(ref.split()[1])
        refs.append(n)
    assert refs[1] > refs[0]
    assert refs[0] >= 18, f"references should start >= 18, got {refs[0]}"


# ── Admin auth ──
class TestAdmin:
    def test_login_bad_password(self, session):
        r = session.post(f"{API}/admin/login", json={"email": ADMIN_EMAIL, "password": "wrong"})
        assert r.status_code == 401

    def test_login_ok(self, session, admin_token):
        assert isinstance(admin_token, str) and len(admin_token) > 20

    def test_access_requires_auth(self, session):
        r = session.get(f"{API}/admin/access-requests")
        assert r.status_code == 401

    def test_access_list(self, session, admin_token):
        r = session.get(f"{API}/admin/access-requests", headers={"Authorization": f"Bearer {admin_token}"})
        assert r.status_code == 200
        docs = r.json()
        assert isinstance(docs, list) and len(docs) >= 1
        # our just-inserted record
        emails = [d["email"] for d in docs]
        assert "TEST_ada@example.com" in emails

    def test_appointment_list(self, session, admin_token):
        r = session.get(f"{API}/admin/appointment-requests", headers={"Authorization": f"Bearer {admin_token}"})
        assert r.status_code == 200
        docs = r.json()
        assert isinstance(docs, list) and len(docs) >= 1
        modes = {d["mode"] for d in docs}
        assert modes <= {"paris", "video"}
