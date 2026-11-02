import React, { useState } from "react";
import axios from "axios";
import { useT } from "@/i18n/LocaleContext";
import { API } from "@/context/AdminAuthContext";

export const CorrespondenceForm = ({ testidPrefix = "footer-correspondence" }) => {
  const t = useT();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error
  const [message, setMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    // Simple client-side email pattern — avoids a network round-trip for obvious typos.
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!looksLikeEmail) {
      setStatus("error");
      setMessage(
        t(
          "That does not look like an email address.",
          "Cela ne ressemble pas à une adresse courriel.",
          "Eso no parece una dirección de correo."
        )
      );
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      const { data } = await axios.post(`${API}/correspondence`, {
        email: trimmed,
      });
      setStatus("sent");
      setMessage(
        data.message ||
          t(
            "Received. Correspondence — occasional, considered.",
            "Reçu. Correspondance — occasionnelle, mesurée.",
            "Recibido. Correspondencia — ocasional, mesurada."
          )
      );
      setEmail("");
    } catch (err) {
      const detail = err.response?.data?.detail;
      setStatus("error");
      setMessage(
        typeof detail === "string"
          ? detail
          : Array.isArray(detail)
            ? detail.map((d) => d.msg || JSON.stringify(d)).join(" · ")
            : t(
                "Something went quiet. Please try again.",
                "Un silence s'est glissé. Veuillez réessayer.",
                "Se hizo un silencio. Por favor, inténtelo de nuevo."
              )
      );
    }
  };

  if (status === "sent") {
    return (
      <div
        data-testid={`${testidPrefix}-confirmation`}
        className="flex flex-col gap-2 max-w-sm"
      >
        <p className="font-display italic text-lg text-encre leading-snug">
          {t("Received.", "Reçu.", "Recibido.")}
        </p>
        <p className="font-sans text-xs text-cendre leading-relaxed">
          {message}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      data-testid={`${testidPrefix}-form`}
      className="flex flex-col gap-3 max-w-sm"
      noValidate
    >
      <label
        htmlFor={`${testidPrefix}-email`}
        className="tracked block"
      >
        {t("Correspondence", "Correspondance", "Correspondencia")}
      </label>
      <p className="font-sans text-xs text-cendre leading-relaxed">
        {t(
          "Occasional, considered. No newsletter noise.",
          "Occasionnelle, mesurée. Sans bruit.",
          "Ocasional, mesurada. Sin ruido."
        )}
      </p>
      <div className="flex items-end gap-4 pt-2">
        <input
          id={`${testidPrefix}-email`}
          type="email"
          required
          placeholder={t("your@address.com", "votre@adresse.com", "tu@direccion.com")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          data-testid={`${testidPrefix}-email`}
          className="field flex-1"
        />
        <button
          type="submit"
          disabled={status === "submitting" || !email}
          data-testid={`${testidPrefix}-submit`}
          className="font-sans text-[10px] tracking-[0.28em] uppercase pb-1 border-b border-encre text-encre hover:text-sang hover:border-sang transition-colors duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === "submitting"
            ? t("Sending…", "Envoi…", "Enviando…")
            : t("Send →", "Envoyer →", "Enviar →")}
        </button>
      </div>
      {status === "error" && (
        <p
          role="alert"
          data-testid={`${testidPrefix}-error`}
          className="font-sans text-xs text-sang mt-2"
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default CorrespondenceForm;
