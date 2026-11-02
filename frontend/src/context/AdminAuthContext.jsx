import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); // memory only, per brief
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(false);

  const login = useCallback(async (email, password) => {
    const { data } = await axios.post(`${API}/admin/login`, { email, password });
    setToken(data.token);
    setUser({ email: data.email, role: data.role });
    return data;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const authHeaders = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token]
  );

  // Optional: revalidate token freshness on mount is skipped — token lives in memory only,
  // so a page refresh returns the admin to the login screen (by design).

  const value = useMemo(
    () => ({ token, user, checking, login, logout, authHeaders }),
    [token, user, checking, login, logout, authHeaders]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
};
