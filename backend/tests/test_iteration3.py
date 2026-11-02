"""Backend tests for Maison Allélique iteration 3 - status field, PATCH, CSV export."""
import os
import re
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL",
"http://127.0.0.1:8000").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def admin_token(session):
    r = session.post(f"{API}/admin/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, r.text
    return r.json()["token"]


@pytest.fixture(scope="module")
def auth_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}"}


@pytest.fixture(scope="module")
def created_access(session):
    r = session.post(f"{API}/access", json={
        "name": "TEST_Iter3 Access", "email": "TEST_iter3_access@example.com",
        "country": "FR", "interest": "Parfum", "referral": "test"
    })
    assert r.status_code == 201, r.text
    return r.json()


@pytest.fixture(scope="module")
def created_appt(session):
    r = session.post(f"{API}/appointment", json={
        "name": "TEST_Iter3 Appt", "email": "TEST_iter3_appt@example.com",
        "mode": "paris", "preferred": "Mon", "note": ""
    })
    assert r.status_code == 201, r.text
    return r.json()


# ── new status default ──
class TestStatusDefault:
    def test_access_default_status_new(self, session, auth_headers, created_access):
        r = session.get(f"{API}/admin/access-requests", headers=auth_headers)
        assert r.status_code == 200
        docs = r.json()
        match = [d for d in docs if d.get("id") == created_access["id"]]
        assert match, "created access not found"
        assert match[0].get("status") == "new", f"expected new, got {match[0].get('status')}"

    def test_appt_default_status_new(self, session, auth_headers, created_appt):
        r = session.get(f"{API}/admin/appointment-requests", headers=auth_headers)
        assert r.status_code == 200
        docs = r.json()
        match = [d for d in docs if d.get("id") == created_appt["id"]]
        assert match, "created appt not found"
        assert match[0].get("status") == "new"


# ── PATCH status ──
class TestPatchStatus:
    def test_patch_requires_auth(self, session, created_access):
        r = session.patch(f"{API}/admin/access-requests/{created_access['id']}", json={"status": "replied"})
        assert r.status_code == 401

    @pytest.mark.parametrize("status", ["replied", "scheduled", "archived", "new"])
    def test_patch_access_valid_statuses(self, session, auth_headers, created_access, status):
        r = session.patch(f"{API}/admin/access-requests/{created_access['id']}",
                          json={"status": status}, headers=auth_headers)
        assert r.status_code == 200, r.text
        # verify via GET
        g = session.get(f"{API}/admin/access-requests", headers=auth_headers)
        docs = g.json()
        found = [d for d in docs if d.get("id") == created_access["id"]][0]
        assert found["status"] == status

    def test_patch_appt_valid(self, session, auth_headers, created_appt):
        r = session.patch(f"{API}/admin/appointment-requests/{created_appt['id']}",
                          json={"status": "scheduled"}, headers=auth_headers)
        assert r.status_code == 200
        g = session.get(f"{API}/admin/appointment-requests", headers=auth_headers)
        docs = g.json()
        found = [d for d in docs if d.get("id") == created_appt["id"]][0]
        assert found["status"] == "scheduled"

    def test_patch_invalid_status(self, session, auth_headers, created_access):
        r = session.patch(f"{API}/admin/access-requests/{created_access['id']}",
                          json={"status": "bogus"}, headers=auth_headers)
        assert r.status_code == 422

    def test_patch_nonexistent_id(self, session, auth_headers):
        r = session.patch(f"{API}/admin/access-requests/nonexistent-id-xyz",
                          json={"status": "replied"}, headers=auth_headers)
        assert r.status_code == 404
        assert r.json().get("detail") == "Entry not found"

    def test_patch_nonexistent_appt_id(self, session, auth_headers):
        r = session.patch(f"{API}/admin/appointment-requests/nonexistent-id-xyz",
                          json={"status": "replied"}, headers=auth_headers)
        assert r.status_code == 404


# ── CSV export ──
class TestCsvExport:
    def test_access_csv_requires_auth(self, session):
        r = session.get(f"{API}/admin/access-requests.csv")
        assert r.status_code == 401

    def test_access_csv_ok(self, session, auth_headers):
        r = session.get(f"{API}/admin/access-requests.csv", headers=auth_headers)
        assert r.status_code == 200, r.text
        ct = r.headers.get("content-type", "")
        assert "text/csv" in ct, ct
        cd = r.headers.get("content-disposition", "")
        assert "attachment" in cd.lower(), cd
        body = r.text
        first_line = body.splitlines()[0]
        # assert first_line == "reference,created_at,status,name,email,country,referral,interest", first_line

        expected_header = (
            "reference,created_at,status,name,email,country,referral,"
            "track,grail,set_choice,art_piece,interest"
        )

        assert first_line == expected_header, first_line


    def test_appt_csv_requires_auth(self, session):
        r = session.get(f"{API}/admin/appointment-requests.csv")
        assert r.status_code == 401

    def test_appt_csv_ok(self, session, auth_headers):
        r = session.get(f"{API}/admin/appointment-requests.csv", headers=auth_headers)
        assert r.status_code == 200
        assert "text/csv" in r.headers.get("content-type", "")
        assert "attachment" in r.headers.get("content-disposition", "").lower()
        first_line = r.text.splitlines()[0]
        assert first_line == "reference,created_at,status,name,email,mode,preferred,note", first_line
