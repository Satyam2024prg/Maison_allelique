import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Head } from "@/components/Head";
import { TrackedCaps } from "@/components/TrackedCaps";
import { SectionDivider } from "@/components/Editorial";
import { useT } from "@/i18n/LocaleContext";
import { pushEvent } from "@/lib/analytics";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const BRIEF = `${process.env.PUBLIC_URL || ""}/brief`;

/* Full-screen lightbox — click any piece to open, ESC/click-out to close */
const Lightbox = ({ piece, onClose, onPrev, onNext, t }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  if (!piece) return null;
  return (
    <div
      data-testid="art-lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={piece.title}
      className="fixed inset-0 z-[100] bg-encre/95 backdrop-blur-lg flex items-center justify-center p-4 md:p-10 animate-fade-in"
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label={t("Close", "Fermer", "Cerrar")}
        data-testid="art-lightbox-close"
        className="absolute top-6 right-6 md:top-10 md:right-10 text-os font-sans text-[11px] tracking-[0.32em] uppercase border-b border-os pb-1 hover:opacity-70"
      >
        {t("Close", "Fermer", "Cerrar")} ✕
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous"
        data-testid="art-lightbox-prev"
        className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-os text-3xl md:text-5xl hover:opacity-70 select-none"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next"
        data-testid="art-lightbox-next"
        className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-os text-3xl md:text-5xl hover:opacity-70 select-none"
      >
        ›
      </button>
      <figure
        onClick={(e) => e.stopPropagation()}
        className="max-w-[92vw] max-h-[92vh] flex flex-col items-center gap-6"
      >
        <img
          src={piece.image}
          alt={piece.title}
          className="max-w-full max-h-[78vh] object-contain"
          style={{ filter: "saturate(1.18) contrast(1.06) brightness(1.02)" }}
        />
        <figcaption className="text-center max-w-[60ch]">
          <h3 className="font-italic-display text-2xl md:text-3xl text-os leading-tight">
            {piece.title}
          </h3>
          <p className="mt-2 font-sans text-sm text-os/80 leading-snug">
            {piece.caption}
          </p>
        </figcaption>
      </figure>
    </div>
  );
};

/* Gallery-visit subscription form */
const GallerySubscribe = ({ t }) => {
  const [form, setForm] = useState({ name: "", email: "", city: "both", note: "" });
  const [state, setState] = useState({ status: "idle", reference: "", error: "" });

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setState({ status: "sending", reference: "", error: "" });
    try {
      const { data } = await axios.post(`${API}/gallery/subscribe`, form);
      pushEvent("gallery_subscribe", {
        reference: data.reference || "",
        city: form.city,
      });
      setState({ status: "done", reference: data.reference, error: "" });
    } catch (err) {
      setState({
        status: "error",
        reference: "",
        error: err?.response?.data?.detail || "Please try again in a moment.",
      });
    }
  };

  if (state.status === "done") {
    return (
      <div
        data-testid="gallery-subscribe-success"
        className="border border-os/40 p-8 md:p-12 max-w-xl"
      >
        <TrackedCaps className="block mb-4">
          {t("Registered", "Enregistré", "Registrado")}
        </TrackedCaps>
        <p className="font-italic-display text-2xl md:text-3xl text-os leading-tight mb-4">
          {t(
            "You will be invited.",
            "Vous serez invité·e.",
            "Serás invitado·a."
          )}
        </p>
        <p className="font-sans text-sm text-os/80 leading-relaxed">
          {t(
            "The Maison will write personally when the interactive gallery visit opens near you.",
            "La Maison vous écrira personnellement lorsque la visite interactive de la galerie s'ouvrira près de vous.",
            "La Maison te escribirá personalmente cuando la visita interactiva de la galería se abra cerca de ti."
          )}
        </p>
        <p className="mt-6 font-sans text-[10px] tracking-[0.32em] uppercase text-os/60">
          {t("Reference", "Référence", "Referencia")}: {state.reference}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      data-testid="gallery-subscribe-form"
      className="max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <div className="md:col-span-1">
        <label className="block font-sans text-[10px] tracking-[0.32em] uppercase text-os/70 mb-2">
          {t("Full name", "Nom complet", "Nombre completo")}
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={onChange("name")}
          data-testid="gallery-input-name"
          className="w-full bg-transparent border-b border-os/40 focus:border-os py-2 text-os placeholder-os/40 outline-none transition-colors"
          placeholder="—"
        />
      </div>
      <div className="md:col-span-1">
        <label className="block font-sans text-[10px] tracking-[0.32em] uppercase text-os/70 mb-2">
          {t("Email", "E-mail", "Correo")}
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={onChange("email")}
          data-testid="gallery-input-email"
          className="w-full bg-transparent border-b border-os/40 focus:border-os py-2 text-os placeholder-os/40 outline-none transition-colors"
          placeholder="—"
        />
      </div>
      <div className="md:col-span-1">
        <label className="block font-sans text-[10px] tracking-[0.32em] uppercase text-os/70 mb-2">
          {t("Preferred city", "Ville préférée", "Ciudad preferida")}
        </label>
        <select
          value={form.city}
          onChange={onChange("city")}
          data-testid="gallery-input-city"
          className="w-full bg-transparent border-b border-os/40 focus:border-os py-2 text-os outline-none transition-colors"
        >
          <option value="paris" className="bg-encre">Paris</option>
          <option value="shanghai" className="bg-encre">Shanghai</option>
          <option value="both" className="bg-encre">
            {t("Either — surprise me", "L'une ou l'autre — surprenez-moi", "Cualquiera — sorpréndeme")}
          </option>
        </select>
      </div>
      <div className="md:col-span-1">
        <label className="block font-sans text-[10px] tracking-[0.32em] uppercase text-os/70 mb-2">
          {t("Note (optional)", "Note (facultatif)", "Nota (opcional)")}
        </label>
        <input
          type="text"
          value={form.note}
          onChange={onChange("note")}
          data-testid="gallery-input-note"
          className="w-full bg-transparent border-b border-os/40 focus:border-os py-2 text-os placeholder-os/40 outline-none transition-colors"
          placeholder="—"
        />
      </div>
      <div className="md:col-span-2 mt-4 flex items-center gap-6">
        <button
          type="submit"
          disabled={state.status === "sending"}
          data-testid="gallery-subscribe-submit"
          className="inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.32em] uppercase px-8 py-4 border text-os border-os hover:bg-os hover:text-encre transition-all duration-500 disabled:opacity-60"
        >
          {state.status === "sending"
            ? t("Sending…", "Envoi…", "Enviando…")
            : t("Subscribe to the visit", "S'abonner à la visite", "Suscribirse a la visita")}
          {" "}→
        </button>
        {state.status === "error" ? (
          <p className="font-sans text-xs text-os/70">{state.error}</p>
        ) : null}
      </div>
    </form>
  );
};

const ArtPieces = () => {
  const t = useT();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const SOLSTICE = [
    {
      key: "solstice-01",
      title: t("The Solstice · N° 01 · The Monk", "Le Solstice · N° 01 · Le Moine", "El Solsticio · N° 01 · El Monje"),
      caption: t("Single vessel — mycelium body, brass comb-crown, the Grail cradled inside an oval window.", "Vaisseau unique — corps en mycélium, couronne-peigne en laiton, le Graal blotti dans une fenêtre ovale.", "Vasija única — cuerpo de micelio, corona-peine de latón, el Grial acunado en una ventana ovalada."),
      image: `${BRIEF}/art-solstice-01-monk.jpg`,
    },
    {
      key: "solstice-02",
      title: t("The Solstice · N° 02 · The Father", "Le Solstice · N° 02 · Le Père", "El Solsticio · N° 02 · El Padre"),
      caption: t("Twin brass tulips rising from a mycelium plinth — the Grail centered in the circular threshold.", "Deux tulipes en laiton s'élevant d'un socle en mycélium — le Graal centré dans le seuil circulaire.", "Dos tulipanes de latón elevándose de un pedestal de micelio — el Grial centrado en el umbral circular."),
      image: `${BRIEF}/art-solstice-02-father.jpg`,
    },
    {
      key: "solstice-03",
      title: t("The Solstice · N° 03 · The Trio", "Le Solstice · N° 03 · Le Trio", "El Solsticio · N° 03 · El Trío"),
      caption: t("Three vessels together — comb, disc, tulip. Three postures of a single solstice.", "Trois vaisseaux ensemble — peigne, disque, tulipe. Trois postures d'un même solstice.", "Tres vasijas juntas — peine, disco, tulipán. Tres posturas de un mismo solsticio."),
      image: `${BRIEF}/art-solstice-03-trio.jpg`,
    },
  ];

  const ARTEFACT = [
    {
      key: "artefact-01",
      title: t("The Artefact · N° 01 · Moon-door", "L'Artefact · N° 01 · Porte-lune", "El Artefacto · N° 01 · Puerta-luna"),
      caption: t("A split mycelium monolith opening around the Grail — the moon-door made object.", "Un monolithe en mycélium fendu s'ouvrant autour du Graal — la porte-lune faite objet.", "Un monolito de micelio hendido abriéndose alrededor del Grial — la puerta-luna hecha objeto."),
      image: `${BRIEF}/art-artefact-01-moondoor.jpg`,
    },
    {
      key: "artefact-02",
      title: t("The Artefact · N° 02 · Crescent", "L'Artefact · N° 02 · Croissant", "El Artefacto · N° 02 · Creciente"),
      caption: t("Two crescent walls meeting over a brass cube — the Grail held between weight and light.", "Deux murs en croissant se rejoignant sur un cube de laiton — le Graal tenu entre poids et lumière.", "Dos muros en creciente encontrándose sobre un cubo de latón — el Grial sostenido entre peso y luz."),
      image: `${BRIEF}/art-artefact-02-crescent.jpg`,
    },
    {
      key: "artefact-03",
      title: t("The Artefact · N° 03 · Chorus", "L'Artefact · N° 03 · Chœur", "El Artefacto · N° 03 · Coro"),
      caption: t("Three artefacts in dialogue — a stone chorus around three Grails standing on brass horns.", "Trois artefacts en dialogue — un chœur de pierre autour de trois Graals sur cornes en laiton.", "Tres artefactos en diálogo — un coro de piedra alrededor de tres Griales sobre cuernos de latón."),
      image: `${BRIEF}/art-artefact-03-trio.jpg`,
    },
  ];

  const ALL_PIECES = [...SOLSTICE, ...ARTEFACT];

  const openLightbox = useCallback((i) => {
    const piece = ALL_PIECES[i];
    if (piece) {
      pushEvent("lightbox_open", { piece_key: piece.key, position: i + 1 });
    }
    setLightboxIndex(i);
  }, [ALL_PIECES]);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPiece = useCallback(
    () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + ALL_PIECES.length) % ALL_PIECES.length)),
    [ALL_PIECES.length]
  );
  const nextPiece = useCallback(
    () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % ALL_PIECES.length)),
    [ALL_PIECES.length]
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Event",
      "@id": "https://maisonallelique.ai/art-pieces#paris",
      name: "Maison Allélique — The Solstice & The Artefact · Paris",
      description:
        "Maison Allélique's collectible mycelium art pieces launch in a private Parisian gallery, third quarter 2026.",
      startDate: "2026-09-01",
      endDate: "2026-09-30",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Private gallery · Paris",
        address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
      },
      organizer: { "@type": "Organization", "@id": "https://maisonallelique.ai/#brand", name: "Maison Allélique", url: "https://maisonallelique.ai" },
      image: "https://maisonallelique.ai/brief/art-solstice-03-trio.jpg",
      offers: { "@type": "Offer", url: "https://maisonallelique.ai/preorder", availability: "https://schema.org/PreOrder", priceCurrency: "EUR", validFrom: "2026-02-01" },
    },
    {
      "@context": "https://schema.org",
      "@type": "Event",
      "@id": "https://maisonallelique.ai/art-pieces#shanghai",
      name: "Maison Allélique — The Solstice & The Artefact · Shanghai",
      description:
        "Maison Allélique's collectible mycelium art pieces launch in a private Shanghai gallery, third quarter 2026.",
      startDate: "2026-09-15",
      endDate: "2026-10-15",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: "Private gallery · Shanghai",
        address: { "@type": "PostalAddress", addressLocality: "Shanghai", addressCountry: "CN" },
      },
      organizer: { "@type": "Organization", "@id": "https://maisonallelique.ai/#brand", name: "Maison Allélique", url: "https://maisonallelique.ai" },
      image: "https://maisonallelique.ai/brief/art-artefact-03-trio.jpg",
      offers: { "@type": "Offer", url: "https://maisonallelique.ai/preorder", availability: "https://schema.org/PreOrder", priceCurrency: "EUR", validFrom: "2026-02-01" },
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWorkSeries",
      "@id": "https://maisonallelique.ai/art-pieces#collection",
      name: "Maison Allélique — The Solstice & The Artefact",
      description:
        "A collectible mycelium art series for Maison Allélique collectors. Six pieces across two concepts — The Solstice (three variations) and The Artefact (three variations) — grown in collaboration with biomyc. A strict limited edition of only 300 pieces per model, each shipped with an original certificate of authenticity and a unique number, and registered in the Maison's provenance ledger. Waiting time six to eight months after the gallery openings in Paris and Shanghai; the first waiting list is already 25% booked. A second collection of 300 new styles arrives Spring 2027; its waiting list opens November 2026.",
      creator: { "@type": "Organization", name: "Maison Allélique", url: "https://maisonallelique.ai" },
      contributor: { "@type": "Organization", name: "biomyc" },
      hasPart: ALL_PIECES.map((p, i) => ({
        "@type": "VisualArtwork",
        position: i + 1,
        name: `${p.key.startsWith("solstice") ? "The Solstice" : "The Artefact"} — ${p.key.slice(-2)}`,
        artform: "Sculptural mycelium vessel",
        artMedium: "Mycelium composite, brass",
        artEdition: "Limited edition of 300 pieces per model, each with an original certificate of authenticity and a unique number",
        image: `https://maisonallelique.ai${p.image.replace(process.env.PUBLIC_URL || "", "")}`,
      })),
    },
  ];

  return (
    <div data-testid="art-pieces-page">
      {lightboxIndex !== null ? (
        <Lightbox
          piece={ALL_PIECES[lightboxIndex]}
          onClose={closeLightbox}
          onPrev={prevPiece}
          onNext={nextPiece}
          t={t}
        />
      ) : null}
      <Head
        title={t(
          "The Art Collection — Maison Allélique · Paris · Shanghai · Q3 2026",
          "La Collection d'Art — Maison Allélique · Paris · Shanghai · T3 2026",
          "La Colección de Arte — Maison Allélique · París · Shanghai · T3 2026"
        )}
        description={t(
          "The Maison Allélique art collection: six collectible mycelium art pieces — The Solstice and The Artefact — in a strict limited edition of only 300 pieces per model, each with an original certificate of authenticity and a unique number. Presented in private galleries in Paris and Shanghai in September 2026. Waiting time six to eight months after the gallery openings. The waiting list is already 25% booked; a second collection of 300 new styles arrives Spring 2027, waiting list opens November 2026.",
          "La collection d'art Maison Allélique : six pièces à collectionner en mycélium — Le Solstice et L'Artefact — en édition strictement limitée à 300 pièces par modèle, chacune avec un certificat d'authenticité original et un numéro unique. Présentées en galeries privées à Paris et Shanghai en septembre 2026. Délai d'attente de six à huit mois après les ouvertures. La liste d'attente est déjà réservée à 25 % ; une deuxième collection de 300 formes nouvelles arrive au printemps 2027, liste d'attente ouverte en novembre 2026.",
          "La colección de arte Maison Allélique: seis piezas coleccionables en micelio — El Solsticio y El Artefacto — en una edición estrictamente limitada de sólo 300 piezas por modelo, cada una con un certificado de autenticidad original y un número único. Presentadas en galerías privadas en París y Shanghai en septiembre de 2026. Tiempo de espera de seis a ocho meses tras las aperturas. La lista de espera ya está reservada al 25 %; una segunda colección de 300 formas nuevas llega en primavera de 2027, lista de espera abierta en noviembre de 2026."
        )}
        keywords="Maison Allélique art collection, limited edition mycelium art, 300 pieces per model, unique numbered certificate, traceable art collection, Solstice Maison Allélique, Artefact Maison Allélique, art gallery Paris perfume, art gallery Shanghai perfume, 6 to 8 months waiting list, waiting list 25 percent, Spring 2027 second collection"
        jsonLd={jsonLd}
      />

      {/* HERO */}
      <section className="px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <TrackedCaps tone="ink">N° 06</TrackedCaps>
            <div className="mt-2">
              <TrackedCaps>{t("The Art Collection", "La Collection d'Art", "La Colección de Arte")}</TrackedCaps>
            </div>
          </div>
          <div className="md:col-span-9">
            <span className="block font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-encre mb-6">
              {t("For Maison Allélique collectors", "Pour les collectionneurs Maison Allélique", "Para los coleccionistas Maison Allélique")} · Q3 2026
            </span>
            <h1 className="font-italic-display text-4xl md:text-6xl lg:text-7xl text-encre leading-[0.98] max-w-[22ch]">
              {t(
                "Six art pieces. Two concepts. One collection.",
                "Six pièces d'art. Deux concepts. Une collection.",
                "Seis piezas de arte. Dos conceptos. Una colección."
              )}
            </h1>
            <p className="mt-10 font-display text-lg md:text-2xl text-encre max-w-3xl leading-snug">
              {t(
                "A Maison Allélique art collection — grown in mycelium, finished in brass. Six numbered pieces that hold the Grail perfumes, presented in private art galleries in Paris and Shanghai in the third quarter of 2026.",
                "Une collection d'art Maison Allélique — cultivée en mycélium, finie en laiton. Six pièces numérotées qui abritent les parfums Graal, présentées en galeries privées à Paris et Shanghai au troisième trimestre 2026.",
                "Una colección de arte Maison Allélique — cultivada en micelio, terminada en latón. Seis piezas numeradas que sostienen los perfumes Grial, presentadas en galerías privadas en París y Shanghai en el tercer trimestre de 2026."
              )}
            </p>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
              <a href="#subscribe" className="inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.32em] uppercase px-8 py-4 border text-encre border-encre hover:bg-encre hover:text-os transition-all duration-500" data-testid="art-cta-subscribe-hero">
                {t("Subscribe to the gallery visit", "S'abonner à la visite de galerie", "Suscribirse a la visita de galería")} →
              </a>
              <Link to="/preorder" className="font-sans text-[11px] tracking-[0.32em] uppercase text-encre border-b border-encre pb-1 hover:text-sang hover:border-sang transition-colors duration-500">
                {t("Join the waiting list →", "Rejoindre la liste d'attente →", "Unirse a la lista de espera →")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* THE SOLSTICE — 3 pieces */}
      <section className="px-6 md:px-12 py-20 md:py-28" data-testid="art-solstice-section">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 md:mb-16">
            <div className="md:col-span-3">
              <TrackedCaps>The Solstice</TrackedCaps>
              <span className="mt-2 block font-sans text-[10px] tracking-[0.32em] uppercase text-cendre">3 {t("variations", "variations", "variaciones")}</span>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-italic-display text-3xl md:text-5xl text-encre leading-[1.02] max-w-[24ch]">
                {t(
                  "An organic vessel — grown, not manufactured.",
                  "Un vaisseau organique — cultivé, non fabriqué.",
                  "Una vasija orgánica — cultivada, no fabricada."
                )}
              </h2>
              <p className="mt-6 font-sans text-sm md:text-base text-cendre leading-relaxed max-w-2xl">
                {t(
                  "Mycelium composite · 22 × 7.7 × 40 cm · brass accents · edition of three per variation.",
                  "Composite de mycélium · 22 × 7,7 × 40 cm · accents en laiton · édition de trois par variation.",
                  "Composite de micelio · 22 × 7,7 × 40 cm · acentos de latón · edición de tres por variación."
                )}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {SOLSTICE.map((p, i) => (
              <figure key={p.key} data-testid={`art-piece-${p.key}`} className="flex flex-col gap-5">
                <button
                  type="button"
                  onClick={() => openLightbox(i)}
                  data-testid={`art-piece-${p.key}-open`}
                  aria-label={`View ${p.title}`}
                  className="group relative block w-full overflow-hidden bg-transparent cursor-zoom-in"
                >
                  <div className="w-full aspect-[3/2] bg-encre flex items-center justify-center overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                      style={{ filter: "saturate(1.15) contrast(1.05) brightness(1.0)" }}
                    />
                  </div>
                  <span className="absolute bottom-4 right-4 font-sans text-[10px] tracking-[0.32em] uppercase text-encre bg-os/90 px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {t("View full →", "Voir en grand →", "Ver completa →")}
                  </span>
                </button>
                <figcaption>
                  <span className="block font-sans text-[10px] tracking-[0.4em] uppercase text-cendre">N° 0{i + 1}</span>
                  <h3 className="mt-2 font-italic-display text-xl md:text-2xl text-encre leading-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm text-cendre leading-snug max-w-[36ch]">
                    {p.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* THE ARTEFACT — 3 pieces */}
      <section className="px-6 md:px-12 py-20 md:py-28" data-testid="art-artefact-section">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 md:mb-16">
            <div className="md:col-span-3">
              <TrackedCaps>The Artefact</TrackedCaps>
              <span className="mt-2 block font-sans text-[10px] tracking-[0.32em] uppercase text-cendre">3 {t("variations", "variations", "variaciones")}</span>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-italic-display text-3xl md:text-5xl text-encre leading-[1.02] max-w-[24ch]">
                {t(
                  "A geometric structure — a moon-door around the Grail.",
                  "Une structure géométrique — une porte-lune autour du Graal.",
                  "Una estructura geométrica — una puerta-luna alrededor del Grial."
                )}
              </h2>
              <p className="mt-6 font-sans text-sm md:text-base text-cendre leading-relaxed max-w-2xl">
                {t(
                  "Mycelium composite with brass foundation · up to 45 × 25 × 45 cm · edition of three per variation.",
                  "Composite de mycélium avec base en laiton · jusqu'à 45 × 25 × 45 cm · édition de trois par variation.",
                  "Composite de micelio con base de latón · hasta 45 × 25 × 45 cm · edición de tres por variación."
                )}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {ARTEFACT.map((p, i) => {
              const globalIndex = SOLSTICE.length + i;
              return (
                <figure key={p.key} data-testid={`art-piece-${p.key}`} className="flex flex-col gap-5">
                  <button
                    type="button"
                    onClick={() => openLightbox(globalIndex)}
                    data-testid={`art-piece-${p.key}-open`}
                    aria-label={`View ${p.title}`}
                    className="group relative block w-full overflow-hidden bg-transparent cursor-zoom-in"
                  >
                    <div className="w-full aspect-[3/2] bg-encre flex items-center justify-center overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                        style={{ filter: "saturate(1.15) contrast(1.05) brightness(1.0)" }}
                      />
                    </div>
                    <span className="absolute bottom-4 right-4 font-sans text-[10px] tracking-[0.32em] uppercase text-encre bg-os/90 px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {t("View full →", "Voir en grand →", "Ver completa →")}
                    </span>
                  </button>
                  <figcaption>
                    <span className="block font-sans text-[10px] tracking-[0.4em] uppercase text-cendre">N° 0{i + 1}</span>
                    <h3 className="mt-2 font-italic-display text-xl md:text-2xl text-encre leading-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 font-sans text-sm text-cendre leading-snug max-w-[36ch]">
                      {p.caption}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* COLLECTOR'S TERMS — limited edition, certificate, traceability, waiting list */}
      <section
        className="px-6 md:px-12 py-24 md:py-32 bg-encre text-os"
        data-testid="art-collector-terms"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-20">
            <div className="md:col-span-4">
              <TrackedCaps tone="os">{t("The collection", "La collection", "La colección")}</TrackedCaps>
              <span className="mt-2 block font-sans text-[10px] tracking-[0.4em] uppercase text-os/60">
                {t("A limited edition", "Une édition limitée", "Una edición limitada")}
              </span>
            </div>
            <div className="md:col-span-8">
              <h2 className="font-italic-display text-4xl md:text-6xl text-os leading-[1.0] max-w-[22ch]">
                {t(
                  "A limited edition. Numbered. Certified. Traceable.",
                  "Une édition limitée. Numérotée. Certifiée. Traçable.",
                  "Una edición limitada. Numerada. Certificada. Trazable."
                )}
              </h2>
              <p className="mt-8 font-display text-lg md:text-xl text-os/85 leading-snug max-w-2xl">
                {t(
                  "Only 300 pieces per model. Each one carries an original certificate of authenticity and its own unique number — a real, traceable collectible, from the Maison's studio to your name.",
                  "Seulement 300 pièces par modèle. Chacune porte un certificat d'authenticité original et son propre numéro unique — un véritable objet à collectionner, traçable, de l'atelier de la Maison à votre nom.",
                  "Sólo 300 piezas por modelo. Cada una lleva un certificado de autenticidad original y su propio número único — un verdadero coleccionable, trazable, del taller de la Maison a tu nombre."
                )}
              </p>
            </div>
          </div>

          {/* Four terms grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-y-14 md:gap-y-0 md:gap-x-10 mb-20 md:mb-24" data-testid="art-terms-grid">
            {/* Limited 300 per model */}
            <div className="border-t border-os/30 pt-6" data-testid="art-term-limited">
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-os/70">
                {t("Limited edition", "Édition limitée", "Edición limitada")}
              </span>
              <p className="mt-4 font-italic-display text-4xl md:text-5xl text-os leading-none">
                300
              </p>
              <p className="mt-4 font-sans text-sm text-os/80 leading-relaxed">
                {t(
                  "Only three hundred pieces per model. A strict limited edition — never re-issued.",
                  "Seulement trois cents pièces par modèle. Une édition limitée stricte — jamais rééditée.",
                  "Sólo trescientas piezas por modelo. Una edición limitada estricta — nunca reeditada."
                )}
              </p>
            </div>

            {/* Certificate + unique number */}
            <div className="border-t border-os/30 pt-6" data-testid="art-term-certificate">
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-os/70">
                {t("Certificate", "Certificat", "Certificado")}
              </span>
              <p className="mt-4 font-italic-display text-3xl md:text-4xl text-os leading-tight">
                {t("Original & numbered", "Original & numéroté", "Original y numerado")}
              </p>
              <p className="mt-4 font-sans text-sm text-os/80 leading-relaxed">
                {t(
                  "Every piece ships with an original certificate of authenticity and its own unique number.",
                  "Chaque pièce est livrée avec un certificat d'authenticité original et son propre numéro unique.",
                  "Cada pieza se entrega con un certificado de autenticidad original y su propio número único."
                )}
              </p>
            </div>

            {/* Traceable */}
            <div className="border-t border-os/30 pt-6" data-testid="art-term-traceable">
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-os/70">
                {t("Traceable", "Traçable", "Trazable")}
              </span>
              <p className="mt-4 font-italic-display text-3xl md:text-4xl text-os leading-tight">
                {t("Studio → owner", "Atelier → propriétaire", "Taller → propietario")}
              </p>
              <p className="mt-4 font-sans text-sm text-os/80 leading-relaxed">
                {t(
                  "Each work is registered in the Maison's provenance ledger — its full lineage traceable, from the studio to the collector's hand.",
                  "Chaque œuvre est inscrite au registre de provenance de la Maison — sa lignée complète traçable, de l'atelier à la main du collectionneur.",
                  "Cada obra queda inscrita en el registro de procedencia de la Maison — su linaje completo trazable, del taller a las manos del coleccionista."
                )}
              </p>
            </div>

            {/* Waiting time 6 to 8 months */}
            <div className="border-t border-os/30 pt-6" data-testid="art-term-waitlist">
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-os/70">
                {t("Waiting time", "Délai d'attente", "Tiempo de espera")}
              </span>
              <p className="mt-4 font-italic-display text-3xl md:text-4xl text-os leading-tight">
                {t("6 to 8 months", "6 à 8 mois", "6 a 8 meses")}
              </p>
              <p className="mt-4 font-sans text-sm text-os/80 leading-relaxed">
                {t(
                  "Delivery runs six to eight months after the gallery openings in Paris and Shanghai (September 2026).",
                  "La livraison s'étend sur six à huit mois après les ouvertures des galeries à Paris et Shanghai (septembre 2026).",
                  "La entrega se realiza entre seis y ocho meses tras las aperturas de las galerías en París y Shanghai (septiembre de 2026)."
                )}
              </p>
            </div>
          </div>

          {/* Waiting-list progress + second collection */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-os/30 pt-14 md:pt-16" data-testid="art-waitlist-progress">
            <div className="md:col-span-5">
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-os/70">
                {t("Waiting list · N° 01", "Liste d'attente · N° 01", "Lista de espera · N° 01")}
              </span>
              <h3 className="mt-3 font-italic-display text-3xl md:text-4xl text-os leading-tight">
                {t(
                  "Already 25 % booked.",
                  "Déjà réservée à 25 %.",
                  "Ya reservada al 25 %."
                )}
              </h3>
              {/* Progress bar — 25% */}
              <div className="mt-6" aria-hidden="true">
                <div className="h-[2px] w-full bg-os/20 relative overflow-hidden">
                  <div className="h-full bg-os transition-[width] duration-[1600ms] ease-out" style={{ width: "25%" }} />
                </div>
                <div className="mt-2 flex justify-between font-sans text-[10px] tracking-[0.32em] uppercase text-os/60">
                  <span>25 %</span>
                  <span>{t("First collection", "Première collection", "Primera colección")}</span>
                </div>
              </div>
              <p className="mt-6 font-sans text-sm text-os/80 leading-relaxed max-w-md">
                {t(
                  "One in four places is already spoken for. The Maison writes personally when a place opens.",
                  "Une place sur quatre est déjà réservée. La Maison écrit personnellement lorsqu'une place se libère.",
                  "Uno de cada cuatro lugares ya está reservado. La Maison escribe personalmente cuando se abre un lugar."
                )}
              </p>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-os/70">
                {t("Second collection · Spring 2027", "Deuxième collection · Printemps 2027", "Segunda colección · Primavera 2027")}
              </span>
              <h3 className="mt-3 font-italic-display text-3xl md:text-4xl text-os leading-tight max-w-[22ch]">
                {t(
                  "Three hundred new pieces. New forms. Spring 2027.",
                  "Trois cents nouvelles pièces. Nouvelles formes. Printemps 2027.",
                  "Trescientas piezas nuevas. Formas nuevas. Primavera 2027."
                )}
              </h3>
              <p className="mt-6 font-sans text-sm text-os/80 leading-relaxed max-w-md">
                {t(
                  "A second edition of three hundred art pieces, in new sculptural styles, will be released in Spring 2027. Its waiting list opens in November 2026 — reserved first for collectors already on the register.",
                  "Une deuxième édition de trois cents pièces d'art, dans de nouvelles formes sculpturales, sera dévoilée au printemps 2027. Sa liste d'attente ouvre en novembre 2026 — réservée d'abord aux collectionneurs déjà inscrits.",
                  "Una segunda edición de trescientas piezas de arte, en nuevas formas escultóricas, se presentará en la primavera de 2027. Su lista de espera se abre en noviembre de 2026 — reservada primero para los coleccionistas ya inscritos."
                )}
              </p>
              <a
                href="#subscribe"
                data-testid="art-cta-secondlist"
                className="inline-flex mt-8 items-center gap-3 font-sans text-[11px] tracking-[0.32em] uppercase px-8 py-4 border text-os border-os hover:bg-os hover:text-encre transition-all duration-500"
              >
                {t("Reserve a place on the register", "Réserver une place au registre", "Reservar un lugar en el registro")} →
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider withSeal />

      {/* GALLERY LAUNCHES + SUBSCRIBE FORM */}
      <section
        id="subscribe"
        className="px-6 md:px-12 py-24 md:py-32 bg-encre text-os scroll-mt-24"
        data-testid="art-launches"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-14">
            <div className="md:col-span-4">
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-os/60">
                {t("Interactive gallery visit", "Visite interactive de la galerie", "Visita interactiva de la galería")}
              </span>
            </div>
            <div className="md:col-span-8">
              <h2 className="font-italic-display text-4xl md:text-6xl text-os leading-[1.0] max-w-[20ch]">
                {t(
                  "Paris. Shanghai. Only on invitation.",
                  "Paris. Shanghai. Sur invitation.",
                  "París. Shanghai. Solo con invitación."
                )}
              </h2>
              <p className="mt-8 font-display text-lg md:text-xl text-os/85 leading-snug max-w-2xl">
                {t(
                  "Subscribe to receive the invitation to an interactive visit — a private tour of the art pieces, the perfumes they hold, and Allelium composing between them.",
                  "Abonnez-vous pour recevoir l'invitation à une visite interactive — une visite privée des pièces d'art, des parfums qu'elles abritent et d'Allelium qui compose entre eux.",
                  "Suscríbete para recibir la invitación a una visita interactiva — un recorrido privado por las piezas de arte, los perfumes que sostienen y Allelium componiendo entre ellos."
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-20">
            <div className="border-t border-os/30 pt-8">
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-os/70">N° 01 · September 2026</span>
              <h3 className="mt-4 font-italic-display text-2xl md:text-3xl text-os leading-tight">Paris</h3>
              <p className="mt-3 font-sans text-sm text-os/85 leading-relaxed max-w-md">
                {t(
                  "A private Parisian gallery — the six pieces shown together with the Grail perfumes they hold.",
                  "Une galerie privée parisienne — les six pièces présentées avec les parfums Graal qu'elles abritent.",
                  "Una galería privada parisina — las seis piezas presentadas con los perfumes Grial que sostienen."
                )}
              </p>
            </div>
            <div className="border-t border-os/30 pt-8">
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-os/70">N° 02 · September – October 2026</span>
              <h3 className="mt-4 font-italic-display text-2xl md:text-3xl text-os leading-tight">Shanghai</h3>
              <p className="mt-3 font-sans text-sm text-os/85 leading-relaxed max-w-md">
                {t(
                  "A private Shanghai gallery — the first Asian presentation of the maison's collectible objects.",
                  "Une galerie privée à Shanghai — la première présentation asiatique des objets à collectionner de la maison.",
                  "Una galería privada en Shanghai — la primera presentación asiática de los objetos coleccionables de la maison."
                )}
              </p>
            </div>
          </div>

          {/* Subscribe form */}
          <GallerySubscribe t={t} />
        </div>
      </section>

      {/* Collaboration */}
      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <TrackedCaps>{t("Collaboration", "Collaboration", "Colaboración")}</TrackedCaps>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-italic-display text-3xl md:text-5xl text-encre leading-[1.02] max-w-[22ch]">
              {t(
                "Grown, not manufactured. In collaboration with biomyc.",
                "Cultivé, non fabriqué. En collaboration avec biomyc.",
                "Cultivado, no fabricado. En colaboración con biomyc."
              )}
            </h2>
            <p className="mt-8 font-display text-lg text-encre leading-snug max-w-2xl">
              {t(
                "Every art piece is grown from mycelium — the living network beneath the forest floor. Porous, quiet, unique, and biologically alive to its own history. It holds the Grail the way a living thing holds another.",
                "Chaque pièce est cultivée à partir du mycélium — le réseau vivant sous le sol forestier. Poreuse, silencieuse, unique et biologiquement vivante à sa propre histoire. Elle abrite le Graal comme un vivant abrite un autre.",
                "Cada pieza se cultiva a partir del micelio — la red viva bajo el suelo del bosque. Porosa, silenciosa, única y biológicamente viva a su propia historia. Sostiene el Grial como un ser vivo sostiene a otro."
              )}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtPieces;
