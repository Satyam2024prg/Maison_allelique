import React from "react";
import { Link } from "react-router-dom";
import { Head } from "@/components/Head";
import { TrackedCaps } from "@/components/TrackedCaps";
import { SectionDivider } from "@/components/Editorial";
import { useT } from "@/i18n/LocaleContext";

const FAQS = [
  {
    q: "What is a private apothecary at home?",
    a: "It is Maison Allélique's positioning: a private Parisian apothecary that lives in your home. Not a shop. Not a subscription. Not a routine. A quiet system — Allelium — that tells you how to blend Maison Allélique products into formulas that follow your life.",
  },
  {
    q: "Where is Maison Allélique based?",
    a: "In Paris. Formulation, atelier work, and the register are held at the Maison. Allelium is the private system that carries the Maison's savoir-faire into your home.",
  },
  {
    q: "Is this a subscription?",
    a: "No. You receive a Grail, a Set, and Allelium — reserved in your name. Nothing is billed today; the Maison writes personally when the limited edition is ready.",
  },
];

const SeoParisApothecary = () => {
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
    <div data-testid="seo-apothecary-page">
      <Head
        title={t(
          "A Private Apothecary at Home, Guided by Paris — Maison Allélique",
          "Un apothicaire privé à la maison, guidé par Paris — Maison Allélique",
          "Un apotecario privado en casa, guiado por París — Maison Allélique"
        )}
        description={t(
          "Maison Allélique is a private Parisian apothecary at home. Through Allelium, blend skincare and fragrance formulas guided by the Maison in Paris, evolving with your skin, mood, season, and life.",
          "Maison Allélique est un apothicaire privé parisien à la maison. Grâce à Allelium, composez des formules de soin et de parfum guidées par la Maison à Paris, évoluant avec votre peau, votre humeur, la saison et votre vie.",
          "Maison Allélique es un apotecario privado parisino en casa. A través de Allelium, compón fórmulas de cuidado y perfume guiadas por la Maison en París, evolucionando con tu piel, tu ánimo, la estación y tu vida."
        )}
        keywords="private apothecary Paris, luxury apothecary, Parisian beauty Maison, personal formulation Maison, apothecary at home, bespoke skincare Paris, bespoke fragrance Paris, Maison Allélique Paris"
        jsonLd={faqSchema}
      />

      <section className="px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <TrackedCaps tone="ink">N° 04</TrackedCaps>
            <div className="mt-2">
              <TrackedCaps>{t("Paris Apothecary", "Apothicaire de Paris", "Apotecario de París")}</TrackedCaps>
            </div>
          </div>
          <div className="md:col-span-9">
            <h1 className="font-italic-display text-4xl md:text-6xl lg:text-7xl text-encre leading-[0.98] max-w-[24ch]">
              {t(
                "Your own apothecary at home, guided by Paris.",
                "Votre propre apothicaire à la maison, guidé par Paris.",
                "Tu propia botica en casa, guiada por París."
              )}
            </h1>
            <p className="mt-10 font-display text-lg md:text-2xl text-encre max-w-3xl leading-snug">
              {t(
                "Maison Allélique is a Parisian personal formulation Maison. A private apothecary carried into your home through Allelium — a system that composes formulas from Maison Allélique's own house of Grails, Sets, and skincare, guided by the savoir-faire of Paris.",
                "Maison Allélique est une maison de formulation personnelle parisienne. Un apothicaire privé porté chez vous par Allelium — un système qui compose vos formules à partir des Graals, Sets et soins de la maison, guidé par le savoir-faire de Paris.",
                "Maison Allélique es una maison de formulación personal parisina. Un apotecario privado llevado a tu casa a través de Allelium — un sistema que compone tus fórmulas a partir de los Griales, Sets y cuidados de la maison, guiado por el savoir-faire de París."
              )}
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-italic-display text-3xl md:text-5xl text-encre leading-[1.02] max-w-[16ch]">
              {t("Parisian formulation, quietly held.", "Formulation parisienne, tenue en silence.", "Formulación parisina, sostenida en silencio.")}
            </h2>
            <p className="mt-6 font-sans text-sm md:text-base text-cendre leading-relaxed max-w-md">
              {t(
                "Every formula begins in the Parisian atelier and ends in your home. The register — of Grails, Sets, and skincare — is kept at the Maison. Allelium is the intelligence that carries it, quietly, into the day you are living.",
                "Chaque formule commence dans l'atelier parisien et se termine chez vous. Le registre — des Graals, Sets et soins — est tenu à la Maison. Allelium est l'intelligence qui le porte, en silence, dans le jour que vous vivez.",
                "Cada fórmula empieza en el atelier parisino y termina en tu casa. El registro — de Griales, Sets y cuidados — se guarda en la Maison. Allelium es la inteligencia que lo lleva, en silencio, al día que estás viviendo."
              )}
            </p>
          </div>
          <div>
            <h2 className="font-italic-display text-3xl md:text-5xl text-encre leading-[1.02] max-w-[16ch]">
              {t("Not a shop. A private ritual.", "Pas une boutique. Un rituel privé.", "No una tienda. Un ritual privado.")}
            </h2>
            <p className="mt-6 font-sans text-sm md:text-base text-cendre leading-relaxed max-w-md">
              {t(
                "There is no cart. There are no prices in the window. There is a register, a Grail, a Set, and an Allelium — reserved to your name, delivered when ready.",
                "Il n'y a pas de panier. Pas de prix en vitrine. Un registre, un Graal, un Set et un Allelium — réservés à votre nom, livrés le moment venu.",
                "No hay carrito. No hay precios en el escaparate. Un registro, un Grial, un Set y un Allelium — reservados a tu nombre, entregados cuando estén listos."
              )}
            </p>
          </div>
        </div>
      </section>

      <SectionDivider withSeal />

      <section className="px-6 md:px-12 py-20 md:py-28 bg-encre text-os">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-italic-display text-3xl md:text-5xl text-os leading-[1.02] max-w-[24ch]">
            {t("Paris in your home. Formula in your hand.", "Paris chez vous. La formule dans votre main.", "París en tu casa. La fórmula en tu mano.")}
          </h2>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            <Link to="/allelium" className="font-sans text-[11px] tracking-[0.32em] uppercase text-os border-b border-os pb-1 hover:opacity-70">{t("Discover Allelium →", "Découvrir Allelium →", "Descubrir Allelium →")}</Link>
            <Link to="/how-it-works" className="font-sans text-[11px] tracking-[0.32em] uppercase text-os border-b border-os pb-1 hover:opacity-70">{t("How it works →", "Comment ça fonctionne →", "Cómo funciona →")}</Link>
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

export default SeoParisApothecary;
