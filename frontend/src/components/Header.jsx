import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { useT } from "@/i18n/LocaleContext";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const NAV = [
    { to: "/maison", label: t("About Us", "À propos", "Nosotros") },
    { to: "/worlds", label: t("Maison", "Maison", "Maison") },
    { to: "/editions", label: t("Editions", "Éditions", "Ediciones") },
    { to: "/art-pieces", label: t("Art Pieces", "Pièces d'Art", "Piezas de Arte") },
    { to: "/layering", label: t("AI Layering", "Superposition IA", "Superposición IA") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-900 ease-out ${
        transparent
          ? "bg-transparent"
          : "bg-os/95 backdrop-blur-[2px] border-b border-encre/5"
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <Link
          to="/"
          data-testid="nav-home-mark"
          aria-label="Maison Allélique — Éditions Vivantes — home"
          className="text-encre"
        >
          {/* Full lockup on md+, mark-only on mobile to preserve nav space. */}
          <span className="hidden md:inline-flex">
            <Logo variant="horizontal" size="sm" showSubtitle={false} animate testid="header-logo" />
          </span>
          <span className="md:hidden inline-flex">
            <Logo variant="mark" size="sm" animate testid="header-logo-mark" />
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              data-testid={`nav-link-${item.to.slice(1).split("/")[0]}`}
              className={({ isActive }) =>
                `font-sans text-[11px] tracking-[0.28em] uppercase transition-colors duration-700 ${
                  isActive ? "text-encre" : "text-cendre hover:text-encre"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/preorder"
            data-testid="nav-link-access"
            className="font-sans text-[11px] tracking-[0.28em] uppercase text-sang hover:opacity-80 transition-opacity duration-700"
          >
            {t("Waiting list", "Liste d'attente", "Lista de espera")}
          </NavLink>
          <LanguageToggle testid="header-language-toggle" />
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          data-testid="nav-mobile-toggle"
          className="md:hidden text-encre p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} strokeWidth={1} /> : <Menu size={18} strokeWidth={1} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-900 ease-out border-t border-encre/5 bg-os ${
          open ? "max-h-[90vh]" : "max-h-0"
        }`}
      >
        <nav className="px-6 py-10 flex flex-col gap-6">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              data-testid={`mobile-nav-${item.to.slice(1).split("/")[0]}`}
              className="font-sans text-[11px] tracking-[0.32em] uppercase text-encre"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/preorder"
            data-testid="mobile-nav-access"
            className="font-sans text-[11px] tracking-[0.32em] uppercase text-sang"
          >
            {t("Waiting list", "Liste d'attente", "Lista de espera")}
          </Link>
          <Link
            to="/contact"
            data-testid="mobile-nav-contact"
            className="font-sans text-[11px] tracking-[0.32em] uppercase text-cendre"
          >
            {t("Contact", "Contact", "Contacto")}
          </Link>
          <div className="pt-4 border-t border-encre/10">
            <LanguageToggle testid="mobile-language-toggle" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
