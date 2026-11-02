import React from "react";
import { Link } from "react-router-dom";
import { Head } from "@/components/Head";
import { TrackedCaps } from "@/components/TrackedCaps";
import { SectionDivider } from "@/components/Editorial";
import { useT } from "@/i18n/LocaleContext";

const FAQS = [
  {
    q: "What is a personalized skincare routine at Maison Allélique?",
    a: "It is a skincare formula, not a fixed routine. Allelium reads your skin metrics, season, sleep, hydration, sensitivity, rhythm, and environment, then tells you how to blend Maison Allélique skincare products for the day you are actually living.",
  },
  {
    q: "How is this different from a regular skincare routine?",
    a: "A regular routine is fixed. A Maison Allélique formula changes with your metrics. Your skin is never the same twice — your formula should not be either. As your context changes, Allelium adjusts the way products are blended.",
  },
  {
    q: "Do I need to know which products to choose?",
    a: "No. Allelium does not recommend products. It composes the blend using Maison Allélique products in your ritual — the order, the cadence, the quantity, and the pairing your skin needs today.",
  },
];

const SeoPersonalizedSkincare = () => {
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
    <div data-testid="seo-skincare-page">
      <Head
        title={t(
          "Personalized Skincare Formulas — Maison Allélique Paris",
          "Formules de soin personnalisées — Maison Allélique Paris",
          "Fórmulas de cuidado personalizadas — Maison Allélique París"
        )}
        description={t(
          "Personalized skincare formulas from Maison Allélique in Paris. Through Allelium, blend skincare products at home that evolve with your skin metrics, season, mood, hydration, sensitivity, and rhythm.",
          "Formules de soin personnalisées de Maison Allélique à Paris. Grâce à Allelium, composez chez vous des soins qui évoluent avec vos indicateurs cutanés, la saison, votre humeur, votre hydratation, votre sensibilité et votre rythme.",
          "Fórmulas de cuidado personalizadas de Maison Allélique en París. A través de Allelium, compón en casa cuidados que evolucionan con tus métricas de piel, la estación, el ánimo, la hidratación, la sensibilidad y el ritmo."
        )}
        keywords="personalized skincare routine Paris, personalized skincare formula, luxury personalized skincare, bespoke skincare Paris, AI skincare formulation, skincare routine for changing skin, personalized skincare for lifestyle, Maison Allélique skincare, Allelium skincare"
        jsonLd={faqSchema}
      />

      <section className="px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <TrackedCaps tone="ink">N° 02</TrackedCaps>
            <div className="mt-2">
              <TrackedCaps>{t("Personalized Skincare", "Soin personnalisé", "Cuidado personalizado")}</TrackedCaps>
            </div>
          </div>
          <div className="md:col-span-9">
            <h1 className="font-italic-display text-4xl md:text-6xl lg:text-7xl text-encre leading-[0.98] max-w-[24ch]">
              {t(
                "Personalized skincare formulas, composed around today.",
                "Des formules de soin personnalisées, composées autour d'aujourd'hui.",
                "Fórmulas de cuidado personalizadas, compuestas alrededor de hoy."
              )}
            </h1>
            <p className="mt-10 font-display text-lg md:text-2xl text-encre max-w-3xl leading-snug">
              {t(
                "Maison Allélique is a Parisian personal formulation Maison. Through Allelium, blend Maison Allélique skincare products at home into a routine that evolves with your skin metrics, season, mood, hydration, sensitivity, and rhythm.",
                "Maison Allélique est une maison de formulation personnelle parisienne. Grâce à Allelium, composez chez vous les soins Maison Allélique dans une routine qui évolue avec vos indicateurs cutanés, la saison, votre humeur, votre hydratation, votre sensibilité et votre rythme.",
                "Maison Allélique es una maison de formulación personal parisina. A través de Allelium, compón en casa los cuidados Maison Allélique en una rutina que evoluciona con tus métricas de piel, la estación, el ánimo, la hidratación, la sensibilidad y el ritmo."
              )}
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { n: "N° 01", h: t("Skin metrics", "Indicateurs cutanés", "Métricas de piel"), b: t("Hydration, texture, balance, sensitivity — the day your skin is actually having.", "Hydratation, texture, équilibre, sensibilité — l'état réel de votre peau du jour.", "Hidratación, textura, equilibrio, sensibilidad — el estado real de tu piel del día.") },
            { n: "N° 02", h: t("Blend, not choose", "Composer, pas choisir", "Componer, no elegir"), b: t("Allelium tells you which Maison Allélique products to blend, in what order, at what cadence.", "Allelium vous dit quels produits Maison Allélique composer, dans quel ordre, à quelle cadence.", "Allelium te dice qué productos Maison Allélique componer, en qué orden, con qué cadencia.") },
            { n: "N° 03", h: t("Evolve, quietly", "Évoluer, en silence", "Evolucionar, en silencio"), b: t("As metrics change — season, sleep, environment — the formula changes with you.", "À mesure que vos indicateurs changent — saison, sommeil, environnement — la formule change avec vous.", "A medida que cambian tus métricas — estación, sueño, entorno — la fórmula cambia contigo.") },
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
            {t("A routine that follows your real life, not a fixed script.", "Une routine qui suit votre vraie vie, pas un script figé.", "Una rutina que sigue tu vida real, no un guion fijo.")}
          </h2>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            <Link to="/allelium" className="font-sans text-[11px] tracking-[0.32em] uppercase text-os border-b border-os pb-1 hover:opacity-70">{t("Discover Allelium →", "Découvrir Allelium →", "Descubrir Allelium →")}</Link>
            <Link to="/personalized-fragrance" className="font-sans text-[11px] tracking-[0.32em] uppercase text-os border-b border-os pb-1 hover:opacity-70">{t("Personalized fragrance →", "Parfum personnalisé →", "Perfume personalizado →")}</Link>
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

export default SeoPersonalizedSkincare;
