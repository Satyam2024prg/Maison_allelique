import React from "react";
import { Link } from "react-router-dom";
import { Head } from "@/components/Head";
import { TrackedCaps } from "@/components/TrackedCaps";
import { SectionDivider } from "@/components/Editorial";
import { useT } from "@/i18n/LocaleContext";

const FAQS = [
  {
    q: "How do personalized skincare and fragrance formulas work at Maison Allélique?",
    a: "In three steps. First, you share your metrics — skin, mood, habits, season, lifestyle, occasion, rhythm. Second, Allelium tells you how to blend Maison Allélique products into the skincare routine you need and the fragrance you must compose. Third, as your metrics change, Allelium changes your formulas — the ritual follows your real life, not a fixed script.",
  },
  {
    q: "What do I need to start?",
    a: "A Grail — Alma, Vida, or Sereno — and Allelium, which is included with your first Grail. Sets are ordered separately when you want a seasonal layer.",
  },
  {
    q: "Do I choose products, or does Allelium tell me?",
    a: "Allelium does not recommend products. It tells you how to blend the Maison Allélique products already in your ritual — the order, cadence, quantity, and pairing your day requires.",
  },
];

const SeoHowItWorks = () => {
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
    <div data-testid="seo-how-page">
      <Head
        title={t(
          "How Maison Allélique Works — Blend Your Personal Formula",
          "Comment fonctionne Maison Allélique — Composez votre formule personnelle",
          "Cómo funciona Maison Allélique — Compón tu fórmula personal"
        )}
        description={t(
          "How personalized skincare and fragrance formulas work at Maison Allélique. Share your metrics, receive your formula from Allelium, evolve your ritual as your skin, mood, and season change.",
          "Comment fonctionnent les formules personnalisées de soin et de parfum chez Maison Allélique. Partagez vos indicateurs, recevez votre formule d'Allelium, faites évoluer votre rituel à mesure que votre peau, votre humeur et la saison changent.",
          "Cómo funcionan las fórmulas personalizadas de cuidado y perfume en Maison Allélique. Comparte tus métricas, recibe tu fórmula de Allelium, haz evolucionar tu ritual a medida que tu piel, tu ánimo y la estación cambian."
        )}
        keywords="how personalized skincare and fragrance formulas work, how Maison Allélique works, blend personal formula, personalized beauty routine, Allelium how it works, personal formulation Paris"
        jsonLd={faqSchema}
      />

      <section className="px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <TrackedCaps tone="ink">N° 05</TrackedCaps>
            <div className="mt-2">
              <TrackedCaps>{t("How it works", "Comment ça fonctionne", "Cómo funciona")}</TrackedCaps>
            </div>
          </div>
          <div className="md:col-span-9">
            <h1 className="font-italic-display text-4xl md:text-6xl lg:text-7xl text-encre leading-[0.98] max-w-[24ch]">
              {t(
                "How Maison Allélique works — blend your personal formula.",
                "Comment fonctionne Maison Allélique — composez votre formule personnelle.",
                "Cómo funciona Maison Allélique — compón tu fórmula personal."
              )}
            </h1>
            <p className="mt-10 font-display text-lg md:text-2xl text-encre max-w-3xl leading-snug">
              {t(
                "Three quiet steps. Share your metrics. Receive your formula from Allelium. Evolve your ritual as your life changes.",
                "Trois étapes silencieuses. Partagez vos indicateurs. Recevez votre formule d'Allelium. Faites évoluer votre rituel à mesure que votre vie change.",
                "Tres pasos silenciosos. Comparte tus métricas. Recibe tu fórmula de Allelium. Haz evolucionar tu ritual a medida que tu vida cambia."
              )}
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { n: "N° 01", h: t("Share your metrics", "Partagez vos indicateurs", "Comparte tus métricas"), b: t("Your skin, mood, habits, season, lifestyle, occasion, and personal rhythm become the starting point.", "Votre peau, votre humeur, vos habitudes, la saison, votre art de vivre, l'occasion et votre rythme personnel deviennent le point de départ.", "Tu piel, tu ánimo, tus hábitos, la estación, tu estilo de vida, la ocasión y tu ritmo personal se convierten en el punto de partida.") },
            { n: "N° 02", h: t("Receive your formula", "Recevez votre formule", "Recibe tu fórmula"), b: t("Allelium tells you how to blend Maison Allélique products into the skincare routine you need and the fragrance you must compose.", "Allelium vous dit comment composer les produits Maison Allélique pour créer la routine de soin dont vous avez besoin et le parfum que vous devez composer.", "Allelium te dice cómo componer los productos Maison Allélique para crear la rutina de cuidado que necesitas y el perfume que debes componer.") },
            { n: "N° 03", h: t("Evolve your ritual", "Faites évoluer votre rituel", "Haz evolucionar tu ritual"), b: t("As your metrics change, Allelium adjusts your formulas — the ritual follows your real life, not a fixed routine.", "À mesure que vos indicateurs changent, Allelium ajuste vos formules — le rituel suit votre vraie vie, pas une routine figée.", "A medida que cambian tus métricas, Allelium ajusta tus fórmulas — el ritual sigue tu vida real, no una rutina fija.") },
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
            {t("Begin with the formula that belongs to who you are today.", "Commencez par la formule qui appartient à ce que vous êtes aujourd'hui.", "Comienza con la fórmula que pertenece a quien eres hoy.")}
          </h2>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            <Link to="/allelium" className="font-sans text-[11px] tracking-[0.32em] uppercase text-os border-b border-os pb-1 hover:opacity-70">{t("Discover Allelium →", "Découvrir Allelium →", "Descubrir Allelium →")}</Link>
            <Link to="/paris-apothecary" className="font-sans text-[11px] tracking-[0.32em] uppercase text-os border-b border-os pb-1 hover:opacity-70">{t("Paris apothecary →", "Apothicaire de Paris →", "Apotecario de París →")}</Link>
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

export default SeoHowItWorks;
