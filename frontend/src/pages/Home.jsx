import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RadialMark } from "@/components/RadialMark";
import { TrackedCaps } from "@/components/TrackedCaps";
import { EditorialBlock, SectionDivider } from "@/components/Editorial";
import { Head } from "@/components/Head";
import { useT } from "@/i18n/LocaleContext";
import IMAGES from "@/data/images";

/* Interactive world card — sharp image, mouse/touch tilt + reveal */
const WorldCard = ({ world, index }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, tx: 0, ty: 0, hovered: false });

  const handleMove = (clientX, clientY) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (clientX - r.left) / r.width;
    const py = (clientY - r.top) / r.height;
    const ry = (px - 0.5) * 12;
    const rx = -(py - 0.5) * 10;
    const tx = (px - 0.5) * 10;
    const ty = (py - 0.5) * 10;
    setTilt({ rx, ry, tx, ty, hovered: true });
  };

  const reset = () => setTilt({ rx: 0, ry: 0, tx: 0, ty: 0, hovered: false });

  return (
    <Link
      to={world.to}
      ref={ref}
      data-testid={`hero-world-card-${world.key}`}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseLeave={reset}
      onTouchStart={(e) => {
        const t0 = e.touches[0];
        if (t0) handleMove(t0.clientX, t0.clientY);
      }}
      onTouchMove={(e) => {
        const t0 = e.touches[0];
        if (t0) handleMove(t0.clientX, t0.clientY);
      }}
      onTouchEnd={reset}
      className="group relative block w-full"
      style={{ perspective: "1400px" }}
    >
      <div
        className="relative w-full aspect-[3/4] overflow-hidden bone-placeholder transition-transform duration-500 ease-out will-change-transform"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translate3d(${tilt.tx}px, ${tilt.ty}px, 0) scale(${tilt.hovered ? 1.02 : 1})`,
          transformStyle: "preserve-3d",
          boxShadow: tilt.hovered
            ? "0 30px 60px -30px rgba(10,10,10,0.35), 0 12px 24px -12px rgba(10,10,10,0.15)"
            : "0 8px 20px -12px rgba(10,10,10,0.12)",
        }}
      >
        <img
          src={world.image}
          alt={world.alt}
          loading={index === 0 ? "eager" : "lazy"}
          className="absolute inset-0 w-full h-full object-cover transition-[filter,transform] duration-1000 ease-out"
          style={{
            objectPosition: "center center",
            filter: tilt.hovered
              ? "saturate(1.20) contrast(1.06) brightness(1.02)"
              : "saturate(1.12) contrast(1.05) brightness(1.0)",
            transform: tilt.hovered ? "scale(1.06)" : "scale(1.00)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(244,241,234,0.05) 0%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.28) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 flex items-end justify-between gap-4">
          <div>
            <span className="block font-sans text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-os leading-none mb-2 opacity-90">
              {world.number}
            </span>
            <h3 className="font-italic-display text-3xl md:text-4xl lg:text-5xl text-os leading-[0.95]">
              {world.title}
            </h3>
          </div>
          <span
            className="font-sans text-[10px] tracking-[0.32em] uppercase text-os border-b border-os/70 pb-0.5 transition-opacity duration-500"
            style={{ opacity: tilt.hovered ? 1 : 0.55 }}
          >
            →
          </span>
        </div>
      </div>
      <p className="mt-4 md:mt-5 font-display italic text-sm md:text-base text-cendre leading-snug max-w-[32ch]">
        {world.essence}
      </p>
    </Link>
  );
};

/* Primary CTA — "Request Private Access" */
const AccessButton = ({ label, testid = "cta-access", tone = "ink" }) => {
  const isDark = tone === "os";
  return (
    <Link
      to="/preorder"
      data-testid={testid}
      className={`inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.32em] uppercase px-8 py-4 border transition-all duration-500 ${
        isDark
          ? "text-os border-os hover:bg-os hover:text-encre"
          : "text-encre border-encre hover:bg-encre hover:text-os"
      }`}
    >
      {label} <span aria-hidden>→</span>
    </Link>
  );
};

/* Secondary CTA — quiet link */
const QuietCTA = ({ to, label, testid, tone = "ink" }) => (
  <Link
    to={to}
    data-testid={testid}
    className={`font-sans text-[11px] tracking-[0.32em] uppercase border-b pb-1 transition-colors duration-700 ${
      tone === "os"
        ? "text-os border-os hover:text-os/70 hover:border-os/70"
        : "text-encre border-encre hover:text-sang hover:border-sang"
    }`}
  >
    {label} →
  </Link>
);

const Home = () => {
  const t = useT();

  const WORLDS = [
    {
      key: "host",
      number: "N° 01",
      title: t("The Host", "L'Hôte", "El Anfitrión"),
      essence: t(
        "The pour is short. A quarter cup means stay.",
        "La verse est courte. Un quart de tasse veut dire reste.",
        "El servir es breve. Un cuarto de taza significa quédate."
      ),
      to: "/worlds/host",
      image: IMAGES.host.sculpture,
      alt: IMAGES.host.hero_alt,
    },
    {
      key: "master",
      number: "N° 02",
      title: t("The Master", "Le Maître", "El Maestro"),
      essence: t(
        "The form is not designed. It is grown.",
        "La forme n'est pas dessinée. Elle est cultivée.",
        "La forma no se diseña. Se cultiva."
      ),
      to: "/worlds/master",
      image: IMAGES.master.sculpture,
      alt: IMAGES.master.hero_alt,
    },
    {
      key: "observer",
      number: "N° 03",
      title: t("The Observer", "L'Observateur", "El Observador"),
      essence: t(
        "Nature creates. We recognise.",
        "La nature crée. Nous reconnaissons.",
        "La naturaleza crea. Nosotros reconocemos."
      ),
      to: "/worlds/observer",
      image: IMAGES.observer.sculpture,
      alt: IMAGES.observer.hero_alt,
    },
  ];

  const STEPS = [
    {
      n: "N° 01",
      title: t("Share your metrics", "Partagez vos indicateurs", "Comparte tus métricas"),
      body: t(
        "Your skin, mood, habits, season, lifestyle, occasion, and personal rhythm become the starting point.",
        "Votre peau, votre humeur, vos habitudes, la saison, votre art de vivre, l'occasion et votre rythme personnel deviennent le point de départ.",
        "Tu piel, tu estado de ánimo, tus hábitos, la estación, tu estilo de vida, la ocasión y tu ritmo personal se convierten en el punto de partida."
      ),
    },
    {
      n: "N° 02",
      title: t("Receive your formula", "Recevez votre formule", "Recibe tu fórmula"),
      body: t(
        "Allelium tells you how to blend Maison Allélique products into the skincare routine you need and the fragrance you must compose.",
        "Allelium vous dit comment composer les produits Maison Allélique pour créer la routine de soin dont vous avez besoin et le parfum que vous devez composer.",
        "Allelium te dice cómo componer los productos Maison Allélique para crear la rutina de cuidado que necesitas y el perfume que debes componer."
      ),
    },
    {
      n: "N° 03",
      title: t("Evolve your ritual", "Faites évoluer votre rituel", "Haz evolucionar tu ritual"),
      body: t(
        "As your metrics change, Allelium adjusts your formulas — so your ritual follows your real life, not a fixed routine.",
        "À mesure que vos indicateurs changent, Allelium ajuste vos formules — pour que votre rituel suive votre vraie vie, pas une routine figée.",
        "A medida que cambian tus métricas, Allelium ajusta tus fórmulas — para que tu ritual siga tu vida real, no una rutina fija."
      ),
    },
  ];

  const CTA_PRIMARY = t("Request Private Access", "Demander un accès privé", "Solicitar acceso privado");
  const CTA_DISCOVER = t("Discover Allelium", "Découvrir Allelium", "Descubrir Allelium");

  return (
    <div data-testid="home-page">
      <Head
        title={t(
          "Maison Allélique | Personalized Skincare & Fragrance Formulas from Paris",
          "Maison Allélique | Formules personnalisées de soin et de parfum depuis Paris",
          "Maison Allélique | Fórmulas personalizadas de cuidado y perfume desde París"
        )}
        description={t(
          "Discover Maison Allélique, a Parisian personal formulation Maison. Through Allelium, blend skincare and fragrance formulas at home that evolve with your skin, mood, season, habits, and personal metrics.",
          "Découvrez Maison Allélique, une maison de formulation personnelle parisienne. Grâce à Allelium, composez chez vous des formules de soin et de parfum qui évoluent avec votre peau, votre humeur, la saison, vos habitudes et vos indicateurs personnels.",
          "Descubre Maison Allélique, una maison de formulación personal parisina. A través de Allelium, compón en casa fórmulas de cuidado y perfume que evolucionan con tu piel, tu ánimo, la estación, tus hábitos y tus métricas personales."
        )}
        keywords={t(
          "Maison Allélique, Allelium, personal formulation Maison, personalized skincare Paris, personalized skincare routine, personalized fragrance, custom fragrance composition, luxury personalized skincare, luxury personalized perfume, Parisian beauty Maison, private apothecary Paris, bespoke skincare Paris, bespoke fragrance Paris, AI skincare formulation, AI fragrance personalization",
          "Maison Allélique, Allelium, maison de formulation personnelle, soin personnalisé Paris, parfum personnalisé, parfum sur mesure, soin de luxe personnalisé, parfum de luxe personnalisé, maison de beauté parisienne, apothicaire privé Paris, soin sur mesure Paris, parfum sur mesure Paris, formulation IA soin, personnalisation IA parfum",
          "Maison Allélique, Allelium, maison de formulación personal, cuidado personalizado París, perfume personalizado, composición de perfume a medida, cuidado de lujo personalizado, perfume de lujo personalizado, maison de belleza parisina, apotecario privado París, cuidado a medida París, perfume a medida París, formulación IA cuidado, personalización IA perfume"
        )}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Maison Allélique",
            url: "https://maisonallelique.ai",
            logo: "https://maisonallelique.ai/logo.svg",
            description:
              "A Parisian personal formulation Maison. Through Allelium, blend skincare and fragrance formulas at home that evolve with your skin, mood, season, habits, and personal metrics.",
            sameAs: [],
            contactPoint: [
              { "@type": "ContactPoint", email: "touch@maisonallelique.ai", contactType: "customer support" },
              { "@type": "ContactPoint", email: "press@maisonallelique.ai", contactType: "press" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Maison Allélique",
            url: "https://maisonallelique.ai",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://maisonallelique.ai/?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Maison Allélique?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Maison Allélique is a Parisian personal formulation Maison. Through Allelium, it tells you how to blend skincare and fragrance formulas at home that evolve with your skin, mood, season, habits, and personal metrics.",
                },
              },
              {
                "@type": "Question",
                name: "What is Allelium?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Allelium is Maison Allélique's private formulation system. It does not recommend products; it tells you how to blend them into precise skincare and fragrance formulas that evolve with you.",
                },
              },
              {
                "@type": "Question",
                name: "Is this a subscription?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. You reserve a Grail, a Set, and Allelium — nothing is billed today. The Maison writes personally when the limited edition is ready.",
                },
              },
              {
                "@type": "Question",
                name: "Where is Maison Allélique based?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "In Paris. Formulation, atelier work, and the register are held at the Maison. Allelium carries that savoir-faire into your home.",
                },
              },
            ],
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* HERO — commercial + emotional headline                     */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-24"
        data-testid="home-hero"
      >
        <div className="mx-auto max-w-[1600px] w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-3 flex flex-col gap-3">
              <TrackedCaps tone="ink">N° 00</TrackedCaps>
              <TrackedCaps>Éditions Vivantes</TrackedCaps>
            </div>
            <div className="md:col-span-9">
              <span className="block font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-encre mb-6 md:mb-10">
                Maison&nbsp;·&nbsp;
                <span className="font-display italic normal-case tracking-normal text-lg md:text-2xl">
                  Allélique
                </span>
              </span>
              <h1
                data-testid="hero-title"
                className="font-italic-display text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] text-encre leading-[0.98] max-w-[22ch]"
              >
                {t(
                  "Your skin is never the same twice.",
                  "Votre peau n'est jamais la même deux fois.",
                  "Tu piel nunca es la misma dos veces."
                )}{" "}
                <span className="text-cendre">
                  {t(
                    "Why should your formula be?",
                    "Pourquoi votre formule le serait-elle ?",
                    "¿Por qué tu fórmula debería serlo?"
                  )}
                </span>
              </h1>
              <p
                className="mt-10 md:mt-14 font-display text-lg md:text-xl lg:text-2xl text-encre max-w-3xl leading-snug"
                data-testid="hero-subhead"
              >
                {t(
                  "Maison Allélique is a Parisian beauty Maison where skincare and fragrance become living formulas — blended at home, guided by Allelium, and adapted to your skin, habits, mood, season, occasions, and changing needs.",
                  "Maison Allélique est une maison de beauté parisienne où le soin et le parfum deviennent des formules vivantes — composées chez vous, guidées par Allelium, et adaptées à votre peau, vos habitudes, votre humeur, la saison, les occasions et vos besoins changeants.",
                  "Maison Allélique es una maison de belleza parisina donde el cuidado y el perfume se convierten en fórmulas vivas — compuestas en casa, guiadas por Allelium, y adaptadas a tu piel, tus hábitos, tu estado de ánimo, la estación, las ocasiones y tus necesidades cambiantes."
                )}
              </p>
              <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
                <AccessButton label={CTA_PRIMARY} testid="hero-cta-access" />
                <QuietCTA to="/layering" label={CTA_DISCOVER} testid="hero-cta-discover" />
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-24 flex items-end justify-between gap-6">
            <div className="flex items-center gap-3">
              <RadialMark size={22} animate />
              <span className="font-sans text-[10px] tracking-[0.32em] uppercase text-encre">
                Maison&nbsp;·&nbsp;
                <span className="font-display italic normal-case tracking-normal text-[14px]">
                  Allélique
                </span>
              </span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="hairline-vertical" />
              <span className="font-sans text-[10px] tracking-[0.32em] uppercase text-encre">
                {t("Scroll", "Défiler", "Desplazar")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider withSeal />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* MEET ALLELIUM                                              */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-36"
        data-testid="home-meet-allelium"
      >
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20">
          <div className="md:col-span-3">
            <TrackedCaps>{t("The Model", "Le Modèle", "El Modelo")}</TrackedCaps>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-italic-display text-4xl md:text-6xl lg:text-7xl text-encre leading-[0.98] max-w-[22ch]">
              {t(
                "Meet Allelium, your private formulation system.",
                "Rencontrez Allelium, votre système de formulation privé.",
                "Conoce Allelium, tu sistema de formulación privado."
              )}
            </h2>
            <p className="mt-10 md:mt-14 font-display text-lg md:text-xl text-encre max-w-2xl leading-snug">
              {t(
                "Allelium is the intelligence behind the Maison Allélique ritual. It does not recommend products. It tells you how to blend them.",
                "Allelium est l'intelligence derrière le rituel Maison Allélique. Il ne recommande pas de produits. Il vous dit comment les composer.",
                "Allelium es la inteligencia detrás del ritual Maison Allélique. No recomienda productos. Te dice cómo componerlos."
              )}
            </p>
            <p className="mt-6 font-sans text-sm md:text-base text-cendre max-w-2xl leading-relaxed">
              {t(
                "Through your daily habits, skin metrics, mood, season, lifestyle, occasions, and evolving needs, Allelium creates precise skincare and fragrance formulas using Maison Allélique products. As you change, your formulas change with you.",
                "À travers vos habitudes quotidiennes, vos indicateurs cutanés, votre humeur, la saison, votre art de vivre, vos occasions et vos besoins qui évoluent, Allelium crée des formules précises de soin et de parfum à partir des produits Maison Allélique. À mesure que vous changez, vos formules changent avec vous.",
                "A través de tus hábitos cotidianos, tus métricas de piel, tu estado de ánimo, la estación, tu estilo de vida, tus ocasiones y tus necesidades que evolucionan, Allelium crea fórmulas precisas de cuidado y perfume con productos Maison Allélique. A medida que cambias, tus fórmulas cambian contigo."
              )}
            </p>
            <p className="mt-10 font-display italic text-xl md:text-2xl text-encre max-w-2xl leading-snug">
              {t(
                "Your own apothecary at home, guided by the Maison in Paris.",
                "Votre propre apothicaire à la maison, guidé par la Maison à Paris.",
                "Tu propia botica en casa, guiada por la Maison en París."
              )}
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* HOW IT WORKS — 3 steps                                     */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        data-testid="home-how-it-works"
      >
        <div className="mx-auto max-w-[1400px]">
          <TrackedCaps className="block mb-10 md:mb-14">
            {t("How it works", "Comment ça fonctionne", "Cómo funciona")}
          </TrackedCaps>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                data-testid={`home-step-${i + 1}`}
                className="flex flex-col gap-5 border-t border-encre/15 pt-8"
              >
                <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-cendre">
                  {s.n}
                </span>
                <h3 className="font-italic-display text-3xl md:text-4xl text-encre leading-[1.02]">
                  {s.title}
                </h3>
                <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-[38ch]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* A RITUAL THAT MOVES WITH YOU                               */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-36"
        data-testid="home-ritual-moves"
      >
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5">
            <TrackedCaps className="block mb-8">
              {t("A ritual, alive", "Un rituel, vivant", "Un ritual, vivo")}
            </TrackedCaps>
            <h2 className="font-italic-display text-4xl md:text-5xl lg:text-6xl text-encre leading-[1.0] max-w-[18ch]">
              {t(
                "A ritual that moves with you.",
                "Un rituel qui bouge avec vous.",
                "Un ritual que se mueve contigo."
              )}
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="font-display text-lg md:text-xl text-encre leading-snug max-w-2xl mb-6">
              {t(
                "Your skin changes with weather, stress, sleep, time, desire, and memory.",
                "Votre peau change avec le temps, le stress, le sommeil, l'heure, le désir et la mémoire.",
                "Tu piel cambia con el clima, el estrés, el sueño, el tiempo, el deseo y la memoria."
              )}
            </p>
            <p className="font-display text-lg md:text-xl text-encre leading-snug max-w-2xl mb-6">
              {t(
                "Your fragrance changes with mood, occasion, season, and presence.",
                "Votre parfum change avec l'humeur, l'occasion, la saison et la présence.",
                "Tu perfume cambia con el estado de ánimo, la ocasión, la estación y la presencia."
              )}
            </p>
            <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-2xl">
              {t(
                "Maison Allélique transforms those changes into formulas that feel precise, intimate, and alive.",
                "Maison Allélique transforme ces changements en formules qui semblent précises, intimes et vivantes.",
                "Maison Allélique transforma esos cambios en fórmulas que se sienten precisas, íntimas y vivas."
              )}
            </p>
          </div>
        </div>
      </section>

      <SectionDivider withSeal />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* SKINCARE + FRAGRANCE — two cards                           */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-36"
        data-testid="home-two-cards"
      >
        <div className="mx-auto max-w-[1400px]">
          <TrackedCaps className="block mb-10 md:mb-14">
            {t("Two rituals, one voice", "Deux rituels, une voix", "Dos rituales, una voz")}
          </TrackedCaps>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
            {/* Skincare */}
            <article
              data-testid="home-card-skincare"
              className="flex flex-col gap-6"
            >
              <div className="aspect-[5/6] overflow-hidden bone-placeholder">
                <img
                  src={IMAGES.skincare.still}
                  alt={IMAGES.skincare.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1600 ease-out hover:scale-[1.02]"
                  style={{ filter: "saturate(1.12) contrast(1.04) brightness(1.0)" }}
                />
              </div>
              <h3 className="font-italic-display text-3xl md:text-4xl text-encre leading-[1.02] max-w-[16ch]">
                {t(
                  "Skincare, formulated around today.",
                  "Le soin, formulé autour d'aujourd'hui.",
                  "El cuidado, formulado alrededor de hoy."
                )}
              </h3>
              <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-md">
                {t(
                  "Allelium guides how Maison Allélique skincare products are blended according to your current needs — hydration, texture, balance, season, sensitivity, rhythm, and environment.",
                  "Allelium guide la façon dont les soins Maison Allélique sont composés selon vos besoins du moment — hydratation, texture, équilibre, saison, sensibilité, rythme et environnement.",
                  "Allelium guía cómo se componen los cuidados Maison Allélique según tus necesidades del momento — hidratación, textura, equilibrio, estación, sensibilidad, ritmo y entorno."
                )}
              </p>
              <QuietCTA
                to="/personalized-skincare"
                label={t("Personalized skincare", "Soin personnalisé", "Cuidado personalizado")}
                testid="home-card-skincare-link"
              />
            </article>
            {/* Fragrance */}
            <article
              data-testid="home-card-fragrance"
              className="flex flex-col gap-6"
            >
              <div className="aspect-[5/6] overflow-hidden bone-placeholder">
                <img
                  src={IMAGES.parfum.still}
                  alt={IMAGES.parfum.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1600 ease-out hover:scale-[1.02]"
                  style={{ filter: "saturate(1.15) contrast(1.05) brightness(1.0)" }}
                />
              </div>
              <h3 className="font-italic-display text-3xl md:text-4xl text-encre leading-[1.02] max-w-[16ch]">
                {t(
                  "Fragrance, composed around you.",
                  "Le parfum, composé autour de vous.",
                  "El perfume, compuesto a tu alrededor."
                )}
              </h3>
              <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-md">
                {t(
                  "Allelium guides the fragrance you compose according to your mood, occasion, season, memory, and the way you want to be felt.",
                  "Allelium guide le parfum que vous composez selon votre humeur, l'occasion, la saison, la mémoire et la manière dont vous souhaitez être perçu.",
                  "Allelium guía el perfume que compones según tu estado de ánimo, la ocasión, la estación, la memoria y la forma en que quieres ser sentido."
                )}
              </p>
              <QuietCTA
                to="/personalized-fragrance"
                label={t("Personalized fragrance", "Parfum personnalisé", "Perfume personalizado")}
                testid="home-card-fragrance-link"
              />
            </article>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* WHY MAISON ALLÉLIQUE                                       */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-32"
        data-testid="home-why-ma"
      >
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <TrackedCaps>{t("Why Maison Allélique", "Pourquoi Maison Allélique", "Por qué Maison Allélique")}</TrackedCaps>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-sans font-light text-3xl md:text-5xl uppercase tracking-[-0.01em] text-encre leading-[1.08] max-w-[24ch]">
              {t(
                "Parisian craft. Intelligent formulation. Personal ritual.",
                "Artisanat parisien. Formulation intelligente. Rituel personnel.",
                "Artesanía parisina. Formulación inteligente. Ritual personal."
              )}
            </h2>
            <p className="mt-10 md:mt-14 font-display text-lg md:text-xl text-encre leading-snug max-w-2xl">
              {t(
                "Maison Allélique brings together the precision of formulation, the intimacy of fragrance, and the ritual of skincare. Every experience is designed for those who do not want a generic routine, but a beauty system that understands their singularity.",
                "Maison Allélique réunit la précision de la formulation, l'intimité du parfum et le rituel du soin. Chaque expérience est conçue pour ceux qui ne veulent pas d'une routine générique, mais d'un système de beauté qui comprend leur singularité.",
                "Maison Allélique reúne la precisión de la formulación, la intimidad del perfume y el ritual del cuidado. Cada experiencia está diseñada para quienes no quieren una rutina genérica, sino un sistema de belleza que comprenda su singularidad."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* INSTITUTE OF THE SILENT BIOME — video                      */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-36 border-t border-encre/10"
        data-testid="home-institute"
      >
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
          <div className="md:col-span-5 order-2 md:order-1">
            <TrackedCaps className="block mb-6">
              {t("The Institute", "L'Institut", "El Instituto")}
            </TrackedCaps>
            <h2 className="font-sans font-light text-3xl md:text-5xl uppercase tracking-[-0.01em] text-encre leading-[1.05] mb-8">
              {t(
                "The Institute of the Silent Biome.",
                "L'Institut du Biome Silencieux.",
                "El Instituto del Biome Silencioso."
              )}
            </h2>
            <p className="font-display text-lg md:text-xl text-encre leading-snug max-w-md mb-10">
              {t(
                "A Parisian atelier where mycelium and formulations are displayed as an art gallery — and where Allelium lives, kept as the maison's best secret.",
                "Un atelier parisien où le mycélium et les formulations sont exposés comme dans une galerie d'art — et où Allelium habite, gardé comme le meilleur secret de la maison.",
                "Un atelier parisino donde el micelio y las formulaciones se exhiben como una galería de arte — y donde Allelium habita, guardado como el mejor secreto de la maison."
              )}
            </p>
            <QuietCTA
              to="/maison"
              label={t("Learn more", "En savoir plus", "Saber más")}
              testid="home-institute-learn-more"
            />
          </div>
          <div className="md:col-span-7 order-1 md:order-2">
            <div className="aspect-[3/4] md:aspect-[5/6] overflow-hidden bone-placeholder">
              <video
                key="institute-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={IMAGES.provenance.hand}
                data-testid="home-institute-video"
                className="w-full h-full object-cover object-[65%_center] md:object-center"
                style={{ filter: "saturate(0.35) contrast(1.03) brightness(0.98) sepia(0.12)" }}
              >
                <source src="/video/institute-silent.webm" type="video/webm" />
                <source src="/video/institute-silent.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider withSeal />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* ONLY AT MAISON ALLÉLIQUE — exclusivity                     */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-12 py-24 md:py-36 bg-encre text-os"
        data-testid="home-exclusivity"
      >
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-os/60">
              {t("Exclusivity", "Exclusivité", "Exclusividad")}
            </span>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-italic-display text-4xl md:text-6xl lg:text-7xl text-os leading-[1.0] max-w-[16ch]">
              {t("Only at Maison Allélique.", "Uniquement chez Maison Allélique.", "Solo en Maison Allélique.")}
            </h2>
            <p className="mt-10 md:mt-14 font-display text-lg md:text-xl text-os/85 leading-snug max-w-2xl">
              {t(
                "Allelium exists only within Maison Allélique. It is not a public AI tool, not a chatbot, and not a generic beauty quiz. It is a private formulation system created to translate your personal metrics into evolving skincare and fragrance rituals.",
                "Allelium existe uniquement au sein de Maison Allélique. Ce n'est pas un outil d'IA public, ni un agent conversationnel, ni un questionnaire beauté générique. C'est un système de formulation privé, créé pour traduire vos indicateurs personnels en rituels évolutifs de soin et de parfum.",
                "Allelium existe únicamente dentro de Maison Allélique. No es una herramienta pública de IA, ni un chatbot, ni un cuestionario de belleza genérico. Es un sistema de formulación privado, creado para traducir tus métricas personales en rituales evolutivos de cuidado y perfume."
              )}
            </p>
            <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start sm:gap-10 gap-6">
              <AccessButton label={CTA_PRIMARY} testid="exclusivity-cta-access" tone="os" />
              <div className="flex flex-wrap gap-x-6 gap-y-3 md:pl-2">
                <Link
                  to="/allelium"
                  data-testid="exclusivity-link-allelium"
                  className="font-sans text-[10px] tracking-[0.32em] uppercase text-os/80 border-b border-os/40 pb-0.5 hover:text-os hover:border-os transition-colors duration-500"
                >
                  {t("Discover Allelium →", "Découvrir Allelium →", "Descubrir Allelium →")}
                </Link>
                <Link
                  to="/how-it-works"
                  data-testid="exclusivity-link-how"
                  className="font-sans text-[10px] tracking-[0.32em] uppercase text-os/80 border-b border-os/40 pb-0.5 hover:text-os hover:border-os transition-colors duration-500"
                >
                  {t("How it works →", "Comment ça fonctionne →", "Cómo funciona →")}
                </Link>
                <Link
                  to="/paris-apothecary"
                  data-testid="exclusivity-link-paris"
                  className="font-sans text-[10px] tracking-[0.32em] uppercase text-os/80 border-b border-os/40 pb-0.5 hover:text-os hover:border-os transition-colors duration-500"
                >
                  {t("Paris apothecary →", "Apothicaire de Paris →", "Apotecario de París →")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* THREE WORLDS — interactive cards                           */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        className="relative w-full px-6 md:px-12 py-24 md:py-36"
        data-testid="home-worlds"
        aria-label="Maison Allélique — three worlds"
      >
        <div className="mx-auto max-w-[1600px] w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 md:mb-20">
            <div className="md:col-span-3">
              <TrackedCaps>{t("The Three Worlds", "Les Trois Mondes", "Los Tres Mundos")}</TrackedCaps>
            </div>
            <div className="md:col-span-9">
              <h2 className="font-italic-display text-4xl md:text-6xl lg:text-7xl text-encre leading-[0.98] max-w-[18ch]">
                {t(
                  "Three doorways into the Maison.",
                  "Trois seuils vers la Maison.",
                  "Tres umbrales hacia la Maison."
                )}
              </h2>
              <p className="mt-8 font-display italic text-lg md:text-xl text-cendre max-w-xl">
                {t(
                  "Touch a world. The Maison responds.",
                  "Touchez un monde. La Maison répond.",
                  "Toca un mundo. La Maison responde."
                )}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 lg:gap-14" data-testid="hero-worlds-grid">
            {WORLDS.map((w, i) => (
              <WorldCard key={w.key} world={w} index={i} />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider withSeal />

      {/* ─────────────────────────────────────────────────────────── */}
      {/* FINAL CTA                                                   */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        className="px-6 md:px-12 py-32 md:py-48"
        data-testid="home-final-cta"
      >
        <div className="mx-auto max-w-[1200px] text-center">
          <TrackedCaps className="block mb-8">
            {t("Private access", "Accès privé", "Acceso privado")}
          </TrackedCaps>
          <h2 className="font-italic-display text-4xl md:text-6xl lg:text-7xl text-encre leading-[1.0] max-w-[22ch] mx-auto">
            {t(
              "Begin with the formula that belongs to who you are today.",
              "Commencez par la formule qui appartient à ce que vous êtes aujourd'hui.",
              "Comienza con la fórmula que pertenece a quien eres hoy."
            )}
          </h2>
          <p className="mt-10 md:mt-14 font-display text-lg md:text-xl text-cendre leading-snug max-w-2xl mx-auto">
            {t(
              "Request private access to Maison Allélique and discover your evolving apothecary at home.",
              "Demandez un accès privé à Maison Allélique et découvrez votre apothicaire évolutif à la maison.",
              "Solicita acceso privado a Maison Allélique y descubre tu apotecario evolutivo en casa."
            )}
          </p>
          <div className="mt-14 md:mt-16 flex justify-center">
            <AccessButton label={CTA_PRIMARY} testid="final-cta-access" />
          </div>
        </div>
      </section>

      <EditorialBlock eyebrow={t("Positioning", "Positionnement", "Posicionamiento")}>
        <p className="font-display italic text-lg md:text-2xl text-cendre max-w-3xl leading-snug">
          {t(
            "Maison Allélique is a personal formulation Maison: a private Parisian apothecary that tells you how to blend skincare and fragrance formulas at home, evolving with your skin, mood, metrics, season, and life.",
            "Maison Allélique est une maison de formulation personnelle : un apothicaire parisien privé qui vous dit comment composer vos formules de soin et de parfum chez vous, évoluant avec votre peau, votre humeur, vos indicateurs, la saison et votre vie.",
            "Maison Allélique es una maison de formulación personal: un apotecario parisino privado que te dice cómo componer tus fórmulas de cuidado y perfume en casa, evolucionando con tu piel, tu ánimo, tus métricas, la estación y tu vida."
          )}
        </p>
      </EditorialBlock>
    </div>
  );
};

export default Home;
