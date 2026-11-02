import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RadialMark } from "@/components/RadialMark";
import { TrackedCaps } from "@/components/TrackedCaps";
import { useAdminAuth } from "@/context/AdminAuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(email.trim().toLowerCase(), password);
      navigate("/admin/register", { replace: true });
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(
        typeof detail === "string"
          ? detail
          : Array.isArray(detail)
            ? detail.map((d) => d.msg || JSON.stringify(d)).join(" · ")
            : "Unable to sign in."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-os text-encre flex items-center justify-center px-6" data-testid="admin-login-page">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-3 mb-16" aria-label="Home">
          <RadialMark size={22} />
          <span className="font-sans text-[10px] tracking-[0.32em] uppercase">
            Maison&nbsp;·&nbsp;
            <span className="font-display italic normal-case tracking-normal text-[13px]">
              Allélique
            </span>
          </span>
        </Link>

        <TrackedCaps className="block mb-4">Register — Access</TrackedCaps>
        <h1 className="font-display text-4xl md:text-5xl leading-tight mb-12">
          <span className="font-italic-display">The register.</span>
        </h1>

        <form onSubmit={onSubmit} className="flex flex-col gap-8" data-testid="admin-login-form">
          <div>
            <label htmlFor="admin-email" className="tracked block mb-3">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="field"
              data-testid="admin-login-email"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="tracked block mb-3">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="field"
              data-testid="admin-login-password"
            />
          </div>

          {error && (
            <p
              role="alert"
              data-testid="admin-login-error"
              className="font-sans text-sm text-sang"
            >
              {error}
            </p>
          )}

          <div className="pt-4 flex items-center justify-between">
            <Link
              to="/"
              className="font-sans text-[10px] tracking-[0.32em] uppercase text-cendre hover:text-encre transition-colors duration-500"
            >
              ← Return to the maison
            </Link>
            <button
              type="submit"
              disabled={submitting}
              data-testid="admin-login-submit"
              className="font-sans text-sm tracking-[0.28em] uppercase pb-1 border-b border-sang text-sang bg-transparent disabled:opacity-40 disabled:cursor-not-allowed transition-opacity duration-500"
            >
              {submitting ? "Entering…" : "Enter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
