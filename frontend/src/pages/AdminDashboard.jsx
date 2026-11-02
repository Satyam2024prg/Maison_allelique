import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { RadialMark } from "@/components/RadialMark";
import { TrackedCaps } from "@/components/TrackedCaps";
import { useAdminAuth, API } from "@/context/AdminAuthContext";

const STATUSES = ["new", "replied", "scheduled", "archived"];
const STATUS_LABEL = {
  new: "New",
  replied: "Replied",
  scheduled: "Scheduled",
  archived: "Archived",
};

const StatusPill = ({ value, onChange, testid }) => (
  <select
    value={value || "new"}
    onChange={(e) => onChange(e.target.value)}
    data-testid={testid}
    className={`bg-transparent border border-encre/20 px-3 py-1 font-sans text-[10px] tracking-[0.28em] uppercase text-encre focus:outline-none focus:border-sang transition-colors duration-500 cursor-pointer ${
      value === "archived" ? "text-cendre" : ""
    }`}
    style={{ borderRadius: 0 }}
  >
    {STATUSES.map((s) => (
      <option key={s} value={s}>
        {STATUS_LABEL[s]}
      </option>
    ))}
  </select>
);

// Delivery status is set by the Resend webhook (queued / sent / delivered /
// bounced / complained / opened / clicked / delivery_delayed). We show a
// single dot + terse label under the email cell.
const DELIVERY_DOT = {
  queued: "bg-cendre",
  sent: "bg-cendre",
  delivered: "bg-emerald-600",
  opened: "bg-emerald-600",
  clicked: "bg-emerald-600",
  delivery_delayed: "bg-amber-500",
  bounced: "bg-sang",
  complained: "bg-sang",
};

const DeliveryTag = ({ status, testid }) => {
  if (!status) return null;
  const dot = DELIVERY_DOT[status] || "bg-cendre";
  return (
    <span
      data-testid={testid}
      className="mt-1 inline-flex items-center gap-1.5 font-sans text-[9px] tracking-[0.28em] uppercase text-cendre"
    >
      <span aria-hidden="true" className={`inline-block w-1.5 h-1.5 rounded-full ${dot}`} />
      {status.replace(/_/g, " ")}
    </span>
  );
};

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (_) {
    return iso;
  }
};

const filterRowsByStatus = (rows, filter) => {
  if (filter === "all") return rows;
  return rows.filter((r) => (r.status || "new") === filter);
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { token, user, logout, authHeaders } = useAdminAuth();
  const [accessRows, setAccessRows] = useState([]);
  const [apptRows, setApptRows] = useState([]);
  const [subs, setSubs] = useState([]);
  const [galleryRows, setGalleryRows] = useState([]);
  const [config, setConfig] = useState({ email_configured: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [accessFilter, setAccessFilter] = useState("all");
  const [apptFilter, setApptFilter] = useState("all");

  useEffect(() => {
    if (!token) navigate("/admin", { replace: true });
  }, [token, navigate]);

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [a, b, s, g, cfg] = await Promise.all([
        axios.get(`${API}/admin/access-requests`, { headers: authHeaders }),
        axios.get(`${API}/admin/appointment-requests`, { headers: authHeaders }),
        axios.get(`${API}/admin/subscribers`, { headers: authHeaders }),
        axios.get(`${API}/admin/gallery-subscribers`, { headers: authHeaders }),
        axios.get(`${API}/admin/config`, { headers: authHeaders }),
      ]);
      setAccessRows(a.data || []);
      setApptRows(b.data || []);
      setSubs(s.data || []);
      setGalleryRows(g.data || []);
      setConfig(cfg.data || { email_configured: false });
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate("/admin", { replace: true });
        return;
      }
      setError("Unable to load the register.");
    } finally {
      setLoading(false);
    }
  }, [authHeaders, logout, navigate]);

  useEffect(() => {
    if (token) reload();
  }, [token, reload]);

  const updateStatus = async (kind, id, next, setRows) => {
    try {
      await axios.patch(
        `${API}/admin/${kind}-requests/${id}`,
        { status: next },
        { headers: authHeaders }
      );
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: next } : r)));
    } catch (err) {
      setError("Unable to update status.");
    }
  };

  const downloadCsv = async (kind) => {
    let path;
    let filename;
    if (kind === "subscribers") {
      path = `${API}/admin/subscribers.csv`;
      filename = "correspondents.csv";
    } else if (kind === "gallery-subscribers") {
      path = `${API}/admin/gallery-subscribers.csv`;
      filename = "gallery-subscribers.csv";
    } else {
      path = `${API}/admin/${kind}-requests.csv`;
      filename = `${kind}-register.csv`;
    }
    try {
      const res = await axios.get(path, {
        headers: authHeaders,
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "text/csv" }));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Unable to export.");
    }
  };

  const downloadPdf = async (kind, id, reference) => {
    try {
      const res = await axios.get(
        `${API}/admin/${kind}-requests/${id}/acknowledgement.pdf`,
        { headers: authHeaders, responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      const safeRef = (reference || "N-000").replace(/[°\s]/g, "-");
      link.setAttribute("download", `${kind}-${safeRef}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Unable to render acknowledgement.");
    }
  };

  if (!token) return null;

  const accessCount = accessRows.length;
  const apptCount = apptRows.length;
  const accessNew = accessRows.filter((r) => (r.status || "new") === "new").length;
  const apptNew = apptRows.filter((r) => (r.status || "new") === "new").length;

  const filteredAccess = filterRowsByStatus(accessRows, accessFilter);
  const filteredAppt = filterRowsByStatus(apptRows, apptFilter);

  const FilterPills = ({ value, onChange, rows, testid }) => (
    <div className="flex items-center gap-1 flex-wrap" data-testid={testid}>
      {[
        { key: "all", label: "All" },
        ...STATUSES.map((s) => ({ key: s, label: STATUS_LABEL[s] })),
      ].map((f) => {
        const n = f.key === "all" ? rows.length : rows.filter((r) => (r.status || "new") === f.key).length;
        return (
          <button
            key={f.key}
            type="button"
            onClick={() => onChange(f.key)}
            data-testid={`${testid}-${f.key}`}
            className={`px-3 py-1 font-sans text-[10px] tracking-[0.28em] uppercase transition-colors duration-500 ${
              value === f.key
                ? "text-encre border-b border-sang"
                : "text-cendre hover:text-encre border-b border-transparent"
            }`}
          >
            {f.label} <span className="text-cendre">· {n}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-os text-encre" data-testid="admin-dashboard-page">
      <header className="border-b border-encre/10 bg-os sticky top-0 z-10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <RadialMark size={22} />
            <span className="font-sans text-[10px] tracking-[0.32em] uppercase">
              Maison&nbsp;·&nbsp;
              <span className="font-display italic normal-case tracking-normal text-[13px]">
                Allélique
              </span>
              &nbsp;·&nbsp;Register
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="font-sans text-[10px] tracking-[0.32em] uppercase text-cendre">
              {accessNew + apptNew} unread
            </span>
            <span className="font-sans text-[10px] tracking-[0.32em] uppercase text-cendre">
              {user?.email}
            </span>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/admin", { replace: true });
              }}
              data-testid="admin-logout"
              className="font-sans text-[10px] tracking-[0.32em] uppercase text-cendre hover:text-sang transition-colors duration-500"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 md:px-12 py-16 md:py-20">
        {loading ? (
          <TrackedCaps data-testid="admin-loading">Reading the register…</TrackedCaps>
        ) : error ? (
          <p role="alert" data-testid="admin-error" className="font-sans text-sm text-sang">
            {error}
          </p>
        ) : (
          <>
            {/* Access requests */}
            <section className="mt-4">
              <div className="flex items-baseline justify-between mb-6 flex-wrap gap-4">
                <h2 className="font-display text-3xl md:text-4xl leading-tight">
                  <span className="font-italic-display">Access requests</span>
                </h2>
                <div className="flex items-center gap-4">
                  <TrackedCaps>{accessCount} entries</TrackedCaps>
                  <button
                    type="button"
                    onClick={() => downloadCsv("access")}
                    data-testid="admin-export-access-csv"
                    className="font-sans text-[10px] tracking-[0.28em] uppercase text-encre border-b border-encre pb-1 hover:text-sang hover:border-sang transition-colors duration-500"
                  >
                    Export CSV ↓
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <FilterPills
                  value={accessFilter}
                  onChange={setAccessFilter}
                  rows={accessRows}
                  testid="admin-access-filter"
                />
              </div>
              {filteredAccess.length === 0 ? (
                <p className="font-sans text-sm text-cendre">No entries.</p>
              ) : (
                <div className="overflow-x-auto" data-testid="admin-access-table">
                  <table className="w-full text-left font-sans text-sm">
                    <thead>
                      <tr className="border-b border-encre/15">
                        {["N°", "Received", "Status", "Name", "Email", "Country", "Referral", "Interest", "PDF"].map((h) => (
                          <th key={h} className="py-3 pr-6 tracked whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAccess.map((r) => (
                        <tr
                          key={r.id}
                          data-testid={`admin-access-row-${r.id}`}
                          className="border-b border-encre/10 align-top hover:bg-encre/[0.015] transition-colors"
                        >
                          <td className="py-4 pr-6 font-display text-base">{r.reference}</td>
                          <td className="py-4 pr-6 text-cendre whitespace-nowrap">
                            {formatDate(r.created_at)}
                          </td>
                          <td className="py-4 pr-6">
                            <StatusPill
                              value={r.status}
                              onChange={(v) => updateStatus("access", r.id, v, setAccessRows)}
                              testid={`admin-access-status-${r.id}`}
                            />
                          </td>
                          <td className="py-4 pr-6">{r.name}</td>
                          <td className="py-4 pr-6">
                            <a href={`mailto:${r.email}`} className="hover:text-sang transition-colors">
                              {r.email}
                            </a>
                            <DeliveryTag status={r.delivery_status} testid={`admin-access-delivery-${r.id}`} />
                          </td>
                          <td className="py-4 pr-6 text-cendre">{r.country || "—"}</td>
                          <td className="py-4 pr-6 text-cendre">{r.referral || "—"}</td>
                          <td className="py-4 pr-6 text-encre max-w-md">{r.interest || "—"}</td>
                          <td className="py-4 pr-6 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => downloadPdf("access", r.id, r.reference)}
                              data-testid={`admin-access-pdf-${r.id}`}
                              className="font-sans text-[10px] tracking-[0.28em] uppercase text-cendre hover:text-sang transition-colors duration-500 pb-0.5 border-b border-transparent hover:border-sang"
                            >
                              PDF ↓
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* Appointment requests */}
            <section className="mt-20">
              <div className="flex items-baseline justify-between mb-6 flex-wrap gap-4">
                <h2 className="font-display text-3xl md:text-4xl leading-tight">
                  <span className="font-italic-display">Appointment requests</span>
                </h2>
                <div className="flex items-center gap-4">
                  <TrackedCaps>{apptCount} entries</TrackedCaps>
                  <button
                    type="button"
                    onClick={() => downloadCsv("appointment")}
                    data-testid="admin-export-appointment-csv"
                    className="font-sans text-[10px] tracking-[0.28em] uppercase text-encre border-b border-encre pb-1 hover:text-sang hover:border-sang transition-colors duration-500"
                  >
                    Export CSV ↓
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <FilterPills
                  value={apptFilter}
                  onChange={setApptFilter}
                  rows={apptRows}
                  testid="admin-appointment-filter"
                />
              </div>
              {filteredAppt.length === 0 ? (
                <p className="font-sans text-sm text-cendre">No entries.</p>
              ) : (
                <div className="overflow-x-auto" data-testid="admin-appointment-table">
                  <table className="w-full text-left font-sans text-sm">
                    <thead>
                      <tr className="border-b border-encre/15">
                        {["N°", "Received", "Status", "Name", "Email", "Mode", "Preferred", "Note", "PDF"].map((h) => (
                          <th key={h} className="py-3 pr-6 tracked whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppt.map((r) => (
                        <tr
                          key={r.id}
                          data-testid={`admin-appointment-row-${r.id}`}
                          className="border-b border-encre/10 align-top hover:bg-encre/[0.015] transition-colors"
                        >
                          <td className="py-4 pr-6 font-display text-base">{r.reference}</td>
                          <td className="py-4 pr-6 text-cendre whitespace-nowrap">
                            {formatDate(r.created_at)}
                          </td>
                          <td className="py-4 pr-6">
                            <StatusPill
                              value={r.status}
                              onChange={(v) => updateStatus("appointment", r.id, v, setApptRows)}
                              testid={`admin-appointment-status-${r.id}`}
                            />
                          </td>
                          <td className="py-4 pr-6">{r.name}</td>
                          <td className="py-4 pr-6">
                            <a href={`mailto:${r.email}`} className="hover:text-sang transition-colors">
                              {r.email}
                            </a>
                            <DeliveryTag status={r.delivery_status} testid={`admin-appointment-delivery-${r.id}`} />
                          </td>
                          <td className="py-4 pr-6">{r.mode === "paris" ? "Paris" : "Video"}</td>
                          <td className="py-4 pr-6 text-cendre">{r.preferred || "—"}</td>
                          <td className="py-4 pr-6 text-encre max-w-md">{r.note || "—"}</td>
                          <td className="py-4 pr-6 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => downloadPdf("appointment", r.id, r.reference)}
                              data-testid={`admin-appointment-pdf-${r.id}`}
                              className="font-sans text-[10px] tracking-[0.28em] uppercase text-cendre hover:text-sang transition-colors duration-500 pb-0.5 border-b border-transparent hover:border-sang"
                            >
                              PDF ↓
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* Subscribers */}
            <section className="mt-20" data-testid="admin-subscribers-section">
              <div className="flex items-baseline justify-between mb-6 flex-wrap gap-4">
                <h2 className="font-display text-3xl md:text-4xl leading-tight">
                  <span className="font-italic-display">Correspondents</span>
                </h2>
                <div className="flex items-center gap-4">
                  <TrackedCaps>{subs.length} on the list</TrackedCaps>
                  <button
                    type="button"
                    onClick={() => downloadCsv("subscribers")}
                    data-testid="admin-export-subscribers-csv"
                    className="font-sans text-[10px] tracking-[0.28em] uppercase text-encre border-b border-encre pb-1 hover:text-sang hover:border-sang transition-colors duration-500"
                  >
                    Export CSV ↓
                  </button>
                </div>
              </div>
              {subs.length === 0 ? (
                <p className="font-sans text-sm text-cendre">No entries.</p>
              ) : (
                <div className="overflow-x-auto" data-testid="admin-subscribers-table">
                  <table className="w-full text-left font-sans text-sm max-w-3xl">
                    <thead>
                      <tr className="border-b border-encre/15">
                        {["Email", "Received"].map((h) => (
                          <th key={h} className="py-3 pr-6 tracked whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {subs.map((r) => (
                        <tr
                          key={r.id}
                          data-testid={`admin-subscriber-row-${r.id}`}
                          className="border-b border-encre/10 align-top hover:bg-encre/[0.015] transition-colors"
                        >
                          <td className="py-4 pr-6">
                            <a
                              href={`mailto:${r.email}`}
                              className="hover:text-sang transition-colors"
                            >
                              {r.email}
                            </a>
                          </td>
                          <td className="py-4 pr-6 text-cendre whitespace-nowrap">
                            {formatDate(r.created_at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* Gallery Subscribers */}
            <section className="mt-20" data-testid="admin-gallery-section">
              <div className="flex items-baseline justify-between mb-6 flex-wrap gap-4">
                <h2 className="font-display text-3xl md:text-4xl leading-tight">
                  <span className="font-italic-display">Gallery visit</span> — waitlist
                </h2>
                <div className="flex items-center gap-4">
                  <TrackedCaps>{galleryRows.length} on the list</TrackedCaps>
                  <button
                    type="button"
                    onClick={() => downloadCsv("gallery-subscribers")}
                    data-testid="admin-export-gallery-csv"
                    className="font-sans text-[10px] tracking-[0.28em] uppercase text-encre border-b border-encre pb-1 hover:text-sang hover:border-sang transition-colors duration-500"
                  >
                    Export CSV ↓
                  </button>
                </div>
              </div>
              {galleryRows.length === 0 ? (
                <p className="font-sans text-sm text-cendre">No entries.</p>
              ) : (
                <div className="overflow-x-auto" data-testid="admin-gallery-table">
                  <table className="w-full text-left font-sans text-sm">
                    <thead>
                      <tr className="border-b border-encre/15">
                        {["Ref", "Received", "Name", "Email", "City", "Note"].map((h) => (
                          <th key={h} className="py-3 pr-6 tracked whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {galleryRows.map((r) => (
                        <tr
                          key={r.id}
                          data-testid={`admin-gallery-row-${r.id}`}
                          className="border-b border-encre/10 align-top hover:bg-encre/[0.015] transition-colors"
                        >
                          <td className="py-4 pr-6 font-display text-base whitespace-nowrap">{r.reference}</td>
                          <td className="py-4 pr-6 text-cendre whitespace-nowrap">
                            {formatDate(r.created_at)}
                          </td>
                          <td className="py-4 pr-6 whitespace-nowrap">{r.name}</td>
                          <td className="py-4 pr-6">
                            <a href={`mailto:${r.email}`} className="hover:text-sang transition-colors">
                              {r.email}
                            </a>
                          </td>
                          <td className="py-4 pr-6 text-cendre whitespace-nowrap capitalize">{r.city || "—"}</td>
                          <td className="py-4 pr-6 text-encre max-w-md">{r.note || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* Email service status */}
            <section className="mt-20 border-t border-encre/10 pt-10" data-testid="admin-config-section">
              <div className="flex items-baseline gap-4">
                <TrackedCaps>Email service</TrackedCaps>
                {config.email_configured ? (
                  <span className="font-sans text-sm text-encre">
                    Live · sending from{" "}
                    <span className="font-display italic">{config.sender}</span>
                  </span>
                ) : (
                  <span className="font-sans text-sm text-cendre">
                    Console mode — set RESEND_API_KEY in <code>/app/backend/.env</code> and
                    restart backend to send real emails. All submissions are still recorded.
                  </span>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
