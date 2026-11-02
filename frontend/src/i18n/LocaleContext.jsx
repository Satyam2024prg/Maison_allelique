import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { pushEvent } from "@/lib/analytics";

const LocaleContext = createContext(null);

const KEY = "lang";
const SUPPORTED = ["en", "fr", "es"];

const readInitialLocale = () => {
  if (typeof window === "undefined") return "en";
  try {
    const params = new URLSearchParams(window.location.search);
    const q = params.get(KEY);
    if (SUPPORTED.includes(q)) return q;
  } catch (_) {
    /* URLSearchParams not available */
  }
  return "en";
};

export const LocaleProvider = ({ children }) => {
  const [locale, _setLocale] = useState(readInitialLocale);

  const setLocale = (next) => {
    if (!SUPPORTED.includes(next)) return;
    const prev = locale;
    _setLocale(next);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (next === "en") {
        url.searchParams.delete(KEY);
      } else {
        url.searchParams.set(KEY, next);
      }
      window.history.replaceState({}, "", url.toString());
      document.documentElement.setAttribute("lang", next);
    }
    if (next !== prev) {
      pushEvent("language_switch", { from_locale: prev, to_locale: next });
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", locale);
    }
  }, [locale]);

  const value = useMemo(() => {
    // t(en, fr, es) — es falls back to en when not provided.
    const t = (en, fr, es) => {
      if (locale === "fr") return fr;
      if (locale === "es") return es !== undefined ? es : en;
      return en;
    };
    return { locale, setLocale, t };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const useLocale = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
};

export const useT = () => useLocale().t;
