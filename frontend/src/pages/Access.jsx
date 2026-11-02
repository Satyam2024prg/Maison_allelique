import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PageIntro, EditorialBlock } from "@/components/Editorial";
import { Head } from "@/components/Head";
import { useT } from "@/i18n/LocaleContext";
import { API } from "@/context/AdminAuthContext";
import { pushEvent } from "@/lib/analytics";

const GRAIL_OPTIONS = ["Alma", "Vida", "Sereno", "Allelium"];
const SET_OPTIONS = ["Florals", "Citrus", "Gourmand", "Aromatic", "Oud", "Allelium"];

// Art collection pieces — must mirror the /art-pieces page
const ART_PIECE_OPTIONS = [
  { value: "solstice-01", labelEn: "The Solstice · N° 01 · The Monk", labelFr: "Le Solstice · N° 01 · Le Moine", labelEs: "El Solsticio · N° 01 · El Monje" },
  { value: "solstice-02", labelEn: "The Solstice · N° 02 · The Father", labelFr: "Le Solstice · N° 02 · Le Père", labelEs: "El Solsticio · N° 02 · El Padre" },
  { value: "solstice-03", labelEn: "The Solstice · N° 03 · The Trio", labelFr: "Le Solstice · N° 03 · Le Trio", labelEs: "El Solsticio · N° 03 · El Trío" },
  { value: "artefact-01", labelEn: "The Artefact · N° 01 · Moon-door", labelFr: "L'Artefact · N° 01 · Porte-lune", labelEs: "El Artefacto · N° 01 · Puerta-luna" },
  { value: "artefact-02", labelEn: "The Artefact · N° 02 · Crescent", labelFr: "L'Artefact · N° 02 · Croissant", labelEs: "El Artefacto · N° 02 · Creciente" },
  { value: "artefact-03", labelEn: "The Artefact · N° 03 · Chorus", labelFr: "L'Artefact · N° 03 · Chœur", labelEs: "El Artefacto · N° 03 · Coro" },
  { value: "spring-2027", labelEn: "Second collection · Spring 2027 (waiting list opens Nov 2026)", labelFr: "Deuxième collection · Printemps 2027 (liste d'attente ouverte en novembre 2026)", labelEs: "Segunda colección · Primavera 2027 (lista de espera abierta en noviembre de 2026)" },
];

const Access = () => {
  const t = useT();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    grail: "",
    set_choice: "",
    art_piece: "",
    track: "parfum", // "parfum" | "art" | "both"
    interest: "",
    referral: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const wantsParfum = form.track === "parfum" || form.track === "both";
      const wantsArt = form.track === "art" || form.track === "both";
      const { data } = await axios.post(`${API}/access`, {
        name: form.name.trim(),
        email: form.email.trim(),
        country: form.country.trim(),
        interest: form.interest.trim(),
        referral: form.referral.trim(),
        grail: wantsParfum ? form.grail : "",
        set_choice: wantsParfum ? form.set_choice : "",
        art_piece: wantsArt ? form.art_piece : "",
        track: form.track,
      });
      const ref = encodeURIComponent(data.reference || "");
      pushEvent("waitlist_submit", {
        reference: data.reference || "",
        track: form.track,
        grail: wantsParfum ? form.grail : "",
        set_choice: wantsParfum ? form.set_choice : "",
        art_piece: wantsArt ? form.art_piece : "",
        country: form.country.trim() || "unknown",
      });
      const params = new URLSearchParams({
        ref: data.reference || "",
        track: form.track,
        grail: wantsParfum ? form.grail : "",
        set: wantsParfum ? form.set_choice : "",
        art: wantsArt ? form.art_piece : "",
      });
      navigate(`/enter?${params.toString()}`);
    } catch (err) {
      const detail = err.response?.data?.detail;
      setErrorMsg(
        Array.isArray(detail)
          ? detail.map((d) => d.msg || JSON.stringify(d)).join(" · ")
          : typeof detail === "string"
            ? detail
            : t("Something went quiet. Please try again.", "Un silence s'est glissé. Veuillez réessayer.", "Se hizo un silencio. Por favor, inténtelo de nuevo.")
      );
      setStatus("error");
    }
  };

  const grailLabel = (g) =>
    g === "Allelium"
      ? t("Let Allelium choose", "Laisser Allelium choisir", "Que Allelium elija")
      : g;
  const setLabel = (s) =>
    s === "Allelium"
      ? t("Let Allelium choose", "Laisser Allelium choisir", "Que Allelium elija")
      : s;

  return (
    <div data-testid="access-page">
      <Head
        title={t("Waiting list", "Liste d'attente", "Lista de espera")}
        description={t(
          "The limited edition of Maison Allélique — a Grail, a Set, and Allelium — reserved in your name, delivered when it is ready.",
          "L'édition limitée de Maison Allélique — un Graal, un Set et Allelium — réservée à votre nom, livrée lorsqu'elle sera prête.",
          "La edición limitada de Maison Allélique — un Grial, un Set y Allelium — reservada a tu nombre, entregada cuando esté lista."
        )}
      />

      <PageIntro
        number="N° 06"
        eyebrow={t("Waiting list", "Liste d'attente", "Lista de espera")}
        title={
          <>
            {t("Join the", "Rejoignez la", "Únete a la")}{" "}
            <span className="font-italic-display">
              {t("waiting list", "liste d'attente", "lista de espera")}
            </span>
            .
          </>
        }
        essence={t(
          "A Grail, a Set, and Allelium — held for you when the first edition opens. Nothing is charged today.",
          "Un Graal, un Set et Allelium — gardés pour vous à l'ouverture de la première édition. Rien n'est facturé aujourd'hui.",
          "Un Grial, un Set y Allelium — guardados a tu nombre cuando se abra la primera edición. Nada se factura hoy."
        )}
      />

      <EditorialBlock eyebrow={t("A note", "Une note", "Una nota")}>
        <div className="space-y-6 max-w-2xl">
          <p className="font-display italic text-xl md:text-2xl text-encre leading-snug">
            {t(
              "There is no queue. There is a conversation.",
              "Il n'y a pas de file d'attente. Il y a une conversation.",
              "No hay cola. Hay una conversación."
            )}
          </p>
          <p className="font-sans text-sm md:text-base text-cendre leading-relaxed">
            {t(
              "Place your name on the waiting list. Choose the Grail that speaks and the first Set you would like to layer with it. When the edition opens, the Maison writes personally — no charge until you confirm, nothing ships before it is ready.",
              "Inscrivez votre nom sur la liste d'attente. Choisissez le Graal qui vous parle et le premier Set que vous souhaitez y superposer. Lorsque l'édition s'ouvre, la Maison écrit personnellement — aucun débit avant votre confirmation, rien ne part avant d'être prêt.",
              "Inscribe tu nombre en la lista de espera. Elige el Grial que te habla y el primer Set que quieres superponer. Cuando se abra la edición, la Maison escribe personalmente — sin cargo hasta que confirmes, nada se envía antes de estar listo."
            )}
          </p>
        </div>
      </EditorialBlock>

      <section className="px-6 md:px-12 py-16 md:py-24" data-testid="access-form-section">
        <div className="mx-auto max-w-3xl">
          <form
            onSubmit={onSubmit}
            data-testid="access-form"
            noValidate
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
          >
            <div>
              <label htmlFor="name" className="tracked block mb-4">
                {t("Name", "Nom", "Nombre")}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={onChange}
                className="field"
                data-testid="access-field-name"
              />
            </div>

            <div>
              <label htmlFor="email" className="tracked block mb-4">
                {t("Email", "Courriel", "Correo")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={onChange}
                className="field"
                data-testid="access-field-email"
              />
            </div>

            <div>
              <label htmlFor="country" className="tracked block mb-4">
                {t("Country", "Pays", "País")}
              </label>
              <input
                id="country"
                name="country"
                type="text"
                autoComplete="country-name"
                value={form.country}
                onChange={onChange}
                className="field"
                data-testid="access-field-country"
              />
            </div>

            <div>
              <label htmlFor="referral" className="tracked block mb-4">
                {t("Referral (optional)", "Recommandation (facultatif)", "Recomendación (opcional)")}
              </label>
              <input
                id="referral"
                name="referral"
                type="text"
                value={form.referral}
                onChange={onChange}
                className="field"
                data-testid="access-field-referral"
              />
            </div>

            {/* Track selector — which waiting list */}
            <fieldset className="md:col-span-2 border-t border-encre/15 pt-10 mt-4" data-testid="access-track-fieldset">
              <legend className="tracked block mb-5">
                {t("What are you joining the list for?", "Sur quelle liste vous inscrivez-vous ?", "¿A qué lista te unes?")}
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { v: "parfum", en: "The Grail perfumes", fr: "Les parfums Graal", es: "Los perfumes Grial", subEn: "Grail + first Set", subFr: "Graal + premier Set", subEs: "Grial + primer Set" },
                  { v: "art", en: "The Art collection", fr: "La collection d'art", es: "La colección de arte", subEn: "300 per piece · certificate · traceable", subFr: "300 par pièce · certificat · traçable", subEs: "300 por pieza · certificado · trazable" },
                  { v: "both", en: "Both", fr: "Les deux", es: "Ambas", subEn: "Perfumes & art collection", subFr: "Parfums & collection d'art", subEs: "Perfumes y colección de arte" },
                ].map((opt) => {
                  const active = form.track === opt.v;
                  return (
                    <label
                      key={opt.v}
                      data-testid={`access-track-${opt.v}`}
                      className={`cursor-pointer block px-6 py-5 border transition-all duration-500 ${
                        active
                          ? "border-sang bg-sang/[0.03]"
                          : "border-encre/15 hover:border-encre/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="track"
                        value={opt.v}
                        checked={active}
                        onChange={onChange}
                        className="sr-only"
                      />
                      <span className={`block font-italic-display text-2xl leading-tight ${active ? "text-sang" : "text-encre"}`}>
                        {t(opt.en, opt.fr, opt.es)}
                      </span>
                      <span className={`mt-2 block font-sans text-[10px] tracking-[0.28em] uppercase ${active ? "text-sang/80" : "text-cendre"}`}>
                        {t(opt.subEn, opt.subFr, opt.subEs)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* Grail selector — parfum or both */}
            {(form.track === "parfum" || form.track === "both") && (
            <fieldset className="md:col-span-2" data-testid="access-grail-fieldset">
              <legend className="tracked block mb-5">
                {t("Choose your Grail", "Choisissez votre Graal", "Elige tu Grial")}
              </legend>
              <div className="flex flex-wrap gap-x-3 gap-y-3">
                {GRAIL_OPTIONS.map((g) => {
                  const active = form.grail === g;
                  return (
                    <label
                      key={g}
                      data-testid={`access-grail-${g.toLowerCase()}`}
                      className={`cursor-pointer inline-flex items-center px-5 py-3 border transition-all duration-500 font-sans text-[11px] tracking-[0.28em] uppercase ${
                        active
                          ? "border-sang text-sang"
                          : "border-encre/20 text-cendre hover:text-encre hover:border-encre/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="grail"
                        value={g}
                        checked={active}
                        onChange={onChange}
                        className="sr-only"
                      />
                      {grailLabel(g)}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            )}

            {/* Set selector — parfum or both */}
            {(form.track === "parfum" || form.track === "both") && (
            <fieldset className="md:col-span-2" data-testid="access-set-fieldset">
              <legend className="tracked block mb-5">
                {t("Choose your first Set", "Choisissez votre premier Set", "Elige tu primer Set")}
              </legend>
              <div className="flex flex-wrap gap-x-3 gap-y-3">
                {SET_OPTIONS.map((s) => {
                  const active = form.set_choice === s;
                  return (
                    <label
                      key={s}
                      data-testid={`access-set-${s.toLowerCase()}`}
                      className={`cursor-pointer inline-flex items-center px-5 py-3 border transition-all duration-500 font-sans text-[11px] tracking-[0.28em] uppercase ${
                        active
                          ? "border-sang text-sang"
                          : "border-encre/20 text-cendre hover:text-encre hover:border-encre/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="set_choice"
                        value={s}
                        checked={active}
                        onChange={onChange}
                        className="sr-only"
                      />
                      {setLabel(s)}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            )}

            {/* Art collection collector-terms + piece selector — art or both */}
            {(form.track === "art" || form.track === "both") && (
              <div className="md:col-span-2" data-testid="access-art-block">
                {/* Collector's terms — dark inline card */}
                <div className="bg-encre text-os p-8 md:p-10 mb-8" data-testid="access-art-terms">
                  <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-os/70">
                    {t("The Art collection · a limited edition", "La collection d'art · une édition limitée", "La colección de arte · una edición limitada")}
                  </span>
                  <h3 className="mt-3 font-italic-display text-2xl md:text-3xl text-os leading-tight max-w-[28ch]">
                    {t(
                      "A limited edition. Numbered. Certified. Traceable.",
                      "Une édition limitée. Numérotée. Certifiée. Traçable.",
                      "Una edición limitada. Numerada. Certificada. Trazable."
                    )}
                  </h3>
                  <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 font-sans text-sm text-os/85 leading-relaxed">
                    <li>{t(
                      "Only 300 pieces per model — a strict limited edition, never re-issued.",
                      "Seulement 300 pièces par modèle — une édition limitée stricte, jamais rééditée.",
                      "Sólo 300 piezas por modelo — una edición limitada estricta, nunca reeditada."
                    )}</li>
                    <li>{t(
                      "Each piece carries an original certificate of authenticity and its own unique number.",
                      "Chaque pièce porte un certificat d'authenticité original et son propre numéro unique.",
                      "Cada pieza lleva un certificado de autenticidad original y su propio número único."
                    )}</li>
                    <li>{t(
                      "Registered in the Maison's provenance ledger — traceable from studio to owner.",
                      "Inscrite au registre de provenance de la Maison — traçable de l'atelier au propriétaire.",
                      "Inscrita en el registro de procedencia de la Maison — trazable del taller al propietario."
                    )}</li>
                    <li>{t(
                      "Waiting time after the gallery openings in Paris and Shanghai: six to eight months.",
                      "Délai d'attente après les ouvertures des galeries à Paris et Shanghai : six à huit mois.",
                      "Tiempo de espera tras las aperturas de las galerías en París y Shanghai: seis a ocho meses."
                    )}</li>
                    <li>{t(
                      "The waiting list is already 25% booked.",
                      "La liste d'attente est déjà réservée à 25 %.",
                      "La lista de espera ya está reservada al 25 %."
                    )}</li>
                    <li>{t(
                      "Second collection · 300 new styles · Spring 2027. Waiting list opens November 2026.",
                      "Deuxième collection · 300 formes nouvelles · Printemps 2027. Liste d'attente ouverte en novembre 2026.",
                      "Segunda colección · 300 formas nuevas · Primavera 2027. Lista de espera abierta en noviembre de 2026."
                    )}</li>
                  </ul>
                </div>

                {/* Art piece selector */}
                <fieldset data-testid="access-art-piece-fieldset">
                  <legend className="tracked block mb-5">
                    {t("Which art piece calls you?", "Quelle pièce d'art vous appelle ?", "¿Qué pieza de arte te llama?")}
                  </legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {ART_PIECE_OPTIONS.map((piece) => {
                      const active = form.art_piece === piece.value;
                      return (
                        <label
                          key={piece.value}
                          data-testid={`access-art-${piece.value}`}
                          className={`cursor-pointer flex items-center px-5 py-4 border transition-all duration-500 font-sans text-[11px] tracking-[0.22em] uppercase ${
                            active
                              ? "border-sang text-sang"
                              : "border-encre/15 text-cendre hover:text-encre hover:border-encre/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="art_piece"
                            value={piece.value}
                            checked={active}
                            onChange={onChange}
                            className="sr-only"
                          />
                          {t(piece.labelEn, piece.labelFr, piece.labelEs)}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
              </div>
            )}

            <div className="md:col-span-2">
              <label htmlFor="interest" className="tracked block mb-4">
                {t("A short line on your interest", "Une brève ligne sur votre intérêt", "Una breve línea sobre tu interés")}
              </label>
              <textarea
                id="interest"
                name="interest"
                rows={4}
                value={form.interest}
                onChange={onChange}
                className="field"
                data-testid="access-field-interest"
              />
            </div>

            {status === "error" && (
              <p
                role="alert"
                data-testid="access-error"
                className="md:col-span-2 font-sans text-sm text-sang"
              >
                {errorMsg}
              </p>
            )}

            <div className="md:col-span-2 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <p className="tracked max-w-sm leading-relaxed">
                {t(
                  "Nothing is charged today. Nothing ships before it is ready.",
                  "Rien n'est facturé aujourd'hui. Rien ne part avant d'être prêt.",
                  "Nada se factura hoy. Nada se envía antes de estar listo."
                )}
              </p>
              <button
                type="submit"
                data-testid="access-submit"
                disabled={status === "submitting"}
                className="quiet-link quiet-link-sang font-sans text-sm tracking-[0.28em] uppercase pb-1 border-b border-sang bg-transparent disabled:opacity-40 disabled:cursor-not-allowed self-start md:self-auto"
              >
                {status === "submitting"
                  ? t("Joining…", "Inscription…", "Uniéndote…")
                  : t("Join the waiting list →", "Rejoindre la liste d'attente →", "Unirse a la lista de espera →")}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Access;
