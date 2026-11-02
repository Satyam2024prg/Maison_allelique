import React from "react";
import { Link } from "react-router-dom";
import { Head } from "@/components/Head";
import { TrackedCaps } from "@/components/TrackedCaps";
import { SectionDivider } from "@/components/Editorial";
import { useT } from "@/i18n/LocaleContext";

const FAQS = [
  {
    q: "What is a personalized fragrance at Maison Allélique?",
    a: "A composed fragrance, not a chosen one. Your Grail is the base — Alma, Vida, or Sereno — worn alone as your voice. Allelium prescribes a seasonal Set to layer on top: three perfumes in one olfactive family, blended in the exact ratio for the mood, occasion, and season you are in.",
  },
  {
    q: "How does the fragrance composition work?",
    a: "You wear your Grail. You tell Allelium which Set you own. Allelium prescribes which perfume from the Set to open, how many drops, and where to place them on the skin — over the Grail already there. The composition ends when the model stops.",
  },
  {
    q: "Can I keep the same fragrance every day?",
    a: "You can. Your Grail is a constant — the voice you are, worn alone. Sets are seasonal companions that layer over. You may keep a Grail for a decade and renew your signature every quarter with a new Set.",
  },
];

const SeoPersonalizedFragrance = () => {
  const t = useT();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <div data-testid="seo-fragrance-page">
      <Head
        title={t(
          "Personalized Fragrance Composition — Maison Allélique",
          "Composition de parfum personnalisée — Maison Allélique",
          "Composición de perfume personalizada — Maison Allélique"
        )}
        description={t(
          "Personalized fragrance composition from Maison Allélique in Paris. Through Allelium, compose a scent that evolves with your mood, occasion, season, memory, and identity — Grail worn alone, Sets layered on top.",
          "Composition de parfum personnalisée de Maison Allélique à Paris. Grâce à Allelium, composez un parfum qui évolue avec votre humeur, l'occasion, la saison, la mémoire et l'identité — le Graal porté seul, les Sets superposés.",
          "Composición de perfume personalizada de Maison Allélique en París. A través de Allelium, compón un perfume que evoluciona con tu ánimo, la ocasión, la estación, la memoria y la identidad — el Grial llevado a solas, los Sets superpuestos."
        )}
        keywords="personalized fragrance composition, custom fragrance composition, personalized perfume, luxury personalized perfume, bespoke fragrance Paris, AI fragrance personalization, fragrance for different occasions, how mood affects fragrance choice, Maison Allélique fragrance, Allelium fragrance"
        jsonLd={faqSchema}
      />

      <section className="px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <TrackedCaps tone="ink">N° 03</TrackedCaps>
            <div className="mt-2">
              <TrackedCaps>{t("Personalized Fragrance", "Parfum personnalisé", "Perfume personalizado")}</TrackedCaps>
            </div>
          </div>
          <div className="md:col-span-9">
            <h1 className="font-italic-display text-4xl md:text-6xl lg:text-7xl text-encre leading-[0.98] max-w-[24ch]">
              {t(
                "Fragrance, composed around you.",
                "Le parfum, composé autour de vous.",
                "El perfume, compuesto a tu alrededor."
              )}
            </h1>
            <p className="mt-10 font-display text-lg md:text-2xl text-encre max-w-3xl leading-snug">
              {t(
                "Maison Allélique is a Parisian personal formulation Maison. Through Allelium, compose a fragrance that evolves with your mood, occasion, season, memory, and the way you want to be felt — your Grail as your voice, seasonal Sets layered on top.",
                "Maison Allélique est une maison de formulation personnelle parisienne. Grâce à Allelium, composez un parfum qui évolue avec votre humeur, l'occasion, la saison, la mémoire et la manière dont vous souhaitez être perçu — votre Graal comme voix, Sets saisonniers superposés.",
                "Maison Allélique es una maison de formulación personal parisina. A través de Allelium, compón un perfume que evoluciona con tu ánimo, la ocasión, la estación, la memoria y la forma en que quieres ser sentido — tu Grial como voz, Sets estacionales superpuestos."
              )}
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { n: "N° 01", h: t("Grail — your voice", "Graal — votre voix", "Grial — tu voz"), b: t("Alma, Vida, or Sereno. Worn alone as who you are.", "Alma, Vida ou Sereno. Porté seul, comme qui vous êtes.", "Alma, Vida o Sereno. Llevado a solas, como quien eres.") },
            { n: "N° 02", h: t("Set — the season", "Set — la saison", "Set — la temporada"), b: t("Florals, Citrus, Gourmand, Aromatic, Oud — three perfumes to layer over your Grail.", "Florales, Agrumes, Gourmand, Aromatique, Oud — trois parfums à superposer sur votre Graal.", "Florales, Cítricos, Gourmand, Aromático, Oud — tres perfumes para superponer sobre tu Grial.") },
            { n: "N° 03", h: t("Allelium — the composer", "Allelium — le compositeur", "Allelium — el compositor"), b: t("Prescribes the ratio, drop by drop, for the mood and occasion you are in.", "Prescrit le rapport, goutte à goutte, pour l'humeur et l'occasion que vous vivez.", "Prescribe la proporción, gota a gota, para el ánimo y la ocasión que vives.") },
          ].map((s, i) => (
            <div key={i} className="border-t border-encre/15 pt-8">
              <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-cendre">{s.n}</span>
              <h3 className="mt-5 font-italic-display text-2xl md:text-3xl text-encre leading-tight">{s.h}</h3>
              <p className="mt-4 font-sans text-sm text-cendre leading-relaxed max-w-[38ch]">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider withSeal />

      <section className="px-6 md:px-12 py-20 md:py-28 bg-encre text-os">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-italic-display text-3xl md:text-5xl text-os leading-[1.02] max-w-[24ch]">
            {t("A fragrance that changes with you — not with the marketing calendar.", "Un parfum qui change avec vous — pas avec le calendrier marketing.", "Un perfume que cambia contigo — no con el calendario de marketing.")}
          </h2>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            <Link to="/allelium" className="font-sans text-[11px] tracking-[0.32em] uppercase text-os border-b border-os pb-1 hover:opacity-70">{t("Discover Allelium →", "Découvrir Allelium →", "Descubrir Allelium →")}</Link>
            <Link to="/personalized-skincare" className="font-sans text-[11px] tracking-[0.32em] uppercase text-os border-b border-os pb-1 hover:opacity-70">{t("Personalized skincare →", "Soin personnalisé →", "Cuidado personalizado →")}</Link>
          </div>
          <div className="mt-12">
            <Link to="/preorder" className="inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.32em] uppercase px-8 py-4 border text-os border-os hover:bg-os hover:text-encre transition-all duration-500">
              {t("Request Private Access", "Demander un accès privé", "Solicitar acceso privado")} →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="mx-auto max-w-[1000px]">
          <TrackedCaps className="block mb-10">{t("Frequently asked", "Questions fréquentes", "Preguntas frecuentes")}</TrackedCaps>
          <div className="space-y-10">
            {FAQS.map((f, i) => (
              <div key={i} className="border-t border-encre/15 pt-6">
                <h3 className="font-display text-xl md:text-2xl text-encre leading-snug mb-3">{f.q}</h3>
                <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-3xl">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeoPersonalizedFragrance;
