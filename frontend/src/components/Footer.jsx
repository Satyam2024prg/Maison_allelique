import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { TrackedCaps } from "./TrackedCaps";
import { LanguageToggle } from "./LanguageToggle";
import { CorrespondenceForm } from "./CorrespondenceForm";
import { useT } from "@/i18n/LocaleContext";

export const Footer = () => {
  const t = useT();

  const FOOTER_NAV = [
    { to: "/maison", label: t("About Us", "À propos", "Nosotros") },
    { to: "/worlds", label: t("Maison", "Maison", "Maison") },
    { to: "/editions", label: t("Editions", "Éditions", "Ediciones") },
    { to: "/art-pieces", label: t("Art Pieces", "Pièces d'Art", "Piezas de Arte") },
    { to: "/layering", label: t("AI Layering", "Superposition IA", "Superposición IA") },
    { to: "/journal", label: t("Journal", "Journal", "Journal") },
    { to: "/preorder", label: t("Waiting list", "Liste d'attente", "Lista de espera") },
    { to: "/contact", label: t("Contact", "Contact", "Contacto") },
  ];

  return (
    <footer
      data-testid="site-footer"
      className="w-full border-t border-encre/10 bg-os text-encre"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-4 flex flex-col gap-8">
          <Logo variant="horizontal" size="md" showSubtitle testid="footer-logo" />
          <p className="font-display italic text-sm text-cendre max-w-xs leading-snug">
            {t("The planet, speaking in silence.", "La planète, parlant en silence.", "El planeta, hablando en silencio.")}
          </p>
          <div className="pt-2">
            <CorrespondenceForm />
          </div>
          <LanguageToggle testid="footer-language-toggle" />
        </div>

        <div className="md:col-span-4">
          <TrackedCaps className="block mb-6">{t("Navigate", "Naviguer", "Navegar")}</TrackedCaps>
          <ul className="flex flex-col gap-3">
            {FOOTER_NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  data-testid={`footer-link-${item.to.slice(1).split("/")[0] || "home"}`}
                  className="font-sans text-[13px] text-encre hover:text-sang transition-colors duration-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4 flex flex-col gap-8">
          <div>
            <TrackedCaps className="block mb-4">{t("Correspondence", "Correspondance", "Correspondencia")}</TrackedCaps>
            <a
              href="mailto:touch@maisonallelique.ai"
              data-testid="footer-contact-email"
              className="font-sans text-[13px] text-encre hover:text-sang transition-colors duration-700 block"
            >
              touch@maisonallelique.ai
            </a>
            <a
              href="mailto:press@maisonallelique.ai"
              data-testid="footer-press-email"
              className="font-sans text-[12px] text-cendre hover:text-encre transition-colors duration-700 block mt-2"
            >
              {t("Press & Partnerships", "Presse & Partenariats", "Prensa y Colaboraciones")} — press@maisonallelique.ai
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-encre/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-cendre">
            © Maison Allélique — Éditions Vivantes
          </p>
          <ul className="flex items-center gap-6">
            {[
              { to: "/contact", label: t("Privacy", "Confidentialité", "Privacidad"), tid: "footer-privacy" },
              { to: "/contact", label: t("Cookies", "Cookies", "Cookies"), tid: "footer-cookies" },
              { to: "/contact", label: t("Terms", "Conditions", "Términos"), tid: "footer-terms" },
            ].map((l) => (
              <li key={l.tid}>
                <Link
                  to={l.to}
                  className="font-sans text-[10px] tracking-[0.28em] uppercase text-cendre hover:text-encre transition-colors duration-700"
                  data-testid={l.tid}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
