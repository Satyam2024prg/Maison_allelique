import React from "react";
import { Link } from "react-router-dom";
import { Head } from "@/components/Head";
import { TrackedCaps } from "@/components/TrackedCaps";
import { SectionDivider } from "@/components/Editorial";
import { useT } from "@/i18n/LocaleContext";

const FAQS = [
  {
    q: "What is Allelium?",
    a: "Allelium is Maison Allélique's personal formulation system. It is not a chatbot, not a survey, and not a product recommender. It tells you how to blend Maison Allélique products at home into precise skincare and fragrance formulas that evolve with your skin, mood, habits, season, occasions, and personal metrics.",
  },
  {
    q: "How does Allelium work?",
    a: "You share your skin metrics, habits, mood, season, lifestyle, and occasions. Allelium translates them into a precise blending formula using Maison Allélique products. As your metrics change, Allelium changes your formulas — your routine follows your real life, not a fixed script.",
  },
  {
    q: "Is Allelium a chatbot or a beauty quiz?",
    a: "No. Allelium is a private formulation system created by Maison Allélique in Paris. It is not a public AI tool, not a chatbot, and not a generic beauty quiz. It exists only within the Maison and is included with the first Grail.",
  },
  {
    q: "What makes Allelium different from other personalization tools?",
    a: "Allelium does not recommend products from a catalogue. It composes formulas from the Maison's own house of Grails and Sets, evolving each formula with the person — the way a Parisian apothecary composes a private prescription.",
  },
];

const SeoAllelium = () => {
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
    <div data-testid="seo-allelium-page">
      <Head
        title={t(
          "Allelium — The Personal Formulation System by Maison Allélique",
          "Allelium — Le système de formulation personnel de Maison Allélique",
          "Allelium — El sistema de formulación personal de Maison Allélique"
        )}
        description={t(
          "Allelium is Maison Allélique's private formulation system in Paris. It tells you how to blend skincare and fragrance formulas at home that evolve with your skin, mood, habits, season, occasions, and personal metrics.",
          "Allelium est le système de formulation privé de Maison Allélique à Paris. Il vous dit comment composer chez vous des formules de soin et de parfum qui évoluent avec votre peau, votre humeur, vos habitudes, la saison, les occasions et vos indicateurs personnels.",
          "Allelium es el sistema de formulación privado de Maison Allélique en París. Te dice cómo componer en casa fórmulas de cuidado y perfume que evolucionan con tu piel, tu ánimo, tus hábitos, la estación, las ocasiones y tus métricas personales."
        )}
        keywords="Allelium, Allelium formulation system, personal formulation system, private formulation Maison, luxury AI skincare, personalized skincare Paris, personalized fragrance composition, apothecary Paris, Maison Allélique"
        jsonLd={faqSchema}
      />

      <section className="px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <TrackedCaps tone="ink">N° 01</TrackedCaps>
            <div className="mt-2">
              <TrackedCaps>{t("Allelium", "Allelium", "Allelium")}</TrackedCaps>
            </div>
          </div>
          <div className="md:col-span-9">
            <h1 className="font-italic-display text-4xl md:text-6xl lg:text-7xl text-encre leading-[0.98] max-w-[24ch]">
              {t(
                "Allelium — the personal formulation system by Maison Allélique.",
                "Allelium — le système de formulation personnel de Maison Allélique.",
                "Allelium — el sistema de formulación personal de Maison Allélique."
              )}
            </h1>
            <p className="mt-10 font-display text-lg md:text-2xl text-encre max-w-3xl leading-snug">
              {t(
                "Maison Allélique is a Parisian personal formulation Maison that tells you how to blend skincare and fragrance formulas at home through Allelium, an evolving system guided by your skin, habits, mood, season, occasions, and personal metrics.",
                "Maison Allélique est une maison de formulation personnelle parisienne qui vous dit comment composer chez vous vos formules de soin et de parfum grâce à Allelium, un système évolutif guidé par votre peau, vos habitudes, votre humeur, la saison, les occasions et vos indicateurs personnels.",
                "Maison Allélique es una maison de formulación personal parisina que te dice cómo componer en casa tus fórmulas de cuidado y perfume a través de Allelium, un sistema evolutivo guiado por tu piel, tus hábitos, tu ánimo, la estación, las ocasiones y tus métricas personales."
              )}
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* What Allelium is (and is not) */}
      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
          <div>
            <TrackedCaps className="block mb-6">
              {t("What it is", "Ce qu'il est", "Lo que es")}
            </TrackedCaps>
            <ul className="space-y-4 font-display text-base md:text-lg text-encre leading-snug">
              <li>— {t("A private formulation system, built for the singularity of each person.", "Un système de formulation privé, conçu pour la singularité de chaque personne.", "Un sistema de formulación privado, creado para la singularidad de cada persona.")}</li>
              <li>— {t("A blending intelligence for Maison Allélique products.", "Une intelligence de composition pour les produits Maison Allélique.", "Una inteligencia de composición para los productos Maison Allélique.")}</li>
              <li>— {t("An evolving apothecary that changes formulas as you change.", "Un apothicaire évolutif qui change vos formules à mesure que vous changez.", "Una botica evolutiva que cambia tus fórmulas a medida que tú cambias.")}</li>
              <li>— {t("Included, quietly, with the first Grail.", "Inclus, en silence, avec le premier Grail.", "Incluida, en silencio, con el primer Grial.")}</li>
            </ul>
          </div>
          <div>
            <TrackedCaps className="block mb-6">
              {t("What it is not", "Ce qu'il n'est pas", "Lo que no es")}
            </TrackedCaps>
            <ul className="space-y-4 font-display text-base md:text-lg text-cendre leading-snug">
              <li>— {t("Not a chatbot.", "Pas un agent conversationnel.", "No un chatbot.")}</li>
              <li>— {t("Not a beauty quiz.", "Pas un questionnaire beauté.", "No un cuestionario de belleza.")}</li>
              <li>— {t("Not a survey.", "Pas un questionnaire.", "No una encuesta.")}</li>
              <li>— {t("Not a public AI tool.", "Pas un outil d'IA public.", "No una herramienta pública de IA.")}</li>
              <li>— {t("Not a product recommender.", "Pas un moteur de recommandation.", "No un recomendador de productos.")}</li>
            </ul>
          </div>
        </div>
      </section>

      <SectionDivider withSeal />

      {/* Internal links + CTA */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-encre text-os">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-italic-display text-3xl md:text-5xl text-os leading-[1.02] max-w-[24ch]">
            {t(
              "Enter the Maison. Compose your formula.",
              "Entrez dans la Maison. Composez votre formule.",
              "Entra en la Maison. Compón tu fórmula."
            )}
          </h2>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            <Link to="/personalized-skincare" className="font-sans text-[11px] tracking-[0.32em] uppercase text-os border-b border-os pb-1 hover:opacity-70" data-testid="allelium-link-skincare">
              {t("Personalized skincare →", "Soin personnalisé →", "Cuidado personalizado →")}
            </Link>
            <Link to="/personalized-fragrance" className="font-sans text-[11px] tracking-[0.32em] uppercase text-os border-b border-os pb-1 hover:opacity-70" data-testid="allelium-link-fragrance">
              {t("Personalized fragrance →", "Parfum personnalisé →", "Perfume personalizado →")}
            </Link>
            <Link to="/how-it-works" className="font-sans text-[11px] tracking-[0.32em] uppercase text-os border-b border-os pb-1 hover:opacity-70" data-testid="allelium-link-how">
              {t("How it works →", "Comment ça fonctionne →", "Cómo funciona →")}
            </Link>
          </div>
          <div className="mt-12">
            <Link
              to="/preorder"
              data-testid="allelium-cta-access"
              className="inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.32em] uppercase px-8 py-4 border text-os border-os hover:bg-os hover:text-encre transition-all duration-500"
            >
              {t("Request Private Access", "Demander un accès privé", "Solicitar acceso privado")} →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ (visible content mirrored in JSON-LD) */}
      <section className="px-6 md:px-12 py-20 md:py-28" data-testid="allelium-faq">
        <div className="mx-auto max-w-[1000px]">
          <TrackedCaps className="block mb-10">
            {t("Frequently asked", "Questions fréquentes", "Preguntas frecuentes")}
          </TrackedCaps>
          <div className="space-y-10">
            {FAQS.map((f, i) => (
              <div key={i} className="border-t border-encre/15 pt-6">
                <h3 className="font-display text-xl md:text-2xl text-encre leading-snug mb-3">
                  {f.q}
                </h3>
                <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-3xl">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SeoAllelium;
