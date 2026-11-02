import React from "react";
import { useLocale } from "@/i18n/LocaleContext";

const OPTIONS = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
];

export const LanguageToggle = ({ className = "", testid = "language-toggle" }) => {
  const { locale, setLocale } = useLocale();
  return (
    <div
      className={`inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.32em] uppercase ${className}`}
      data-testid={testid}
    >
      {OPTIONS.map((opt, i) => (
        <React.Fragment key={opt.code}>
          {i > 0 && <span aria-hidden="true" className="text-cendre">·</span>}
          <button
            type="button"
            onClick={() => setLocale(opt.code)}
            data-testid={`language-${opt.code}`}
            aria-pressed={locale === opt.code}
            className={`transition-colors duration-500 ${
              locale === opt.code ? "text-encre" : "text-cendre hover:text-encre"
            }`}
          >
            {opt.label}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default LanguageToggle;
