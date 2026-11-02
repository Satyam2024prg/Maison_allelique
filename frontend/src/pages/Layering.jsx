import React, { useMemo } from "react";
import {
  PageIntro,
  EditorialBlock,
  PullQuote,
  SectionDivider,
} from "@/components/Editorial";
import { TrackedCaps } from "@/components/TrackedCaps";
import { QuietLink } from "@/components/QuietLink";
import { Head } from "@/components/Head";
import { useT, useLocale } from "@/i18n/LocaleContext";

const Layering = () => {
  const t = useT();
  const { locale } = useLocale();

  const SIGNALS = [
    {
      n: "N° 01",
      label: t("Mood", "Humeur", "Estado de ánimo"),
      line: t(
        "What the day is asking of you — before you have named it.",
        "Ce que le jour vous demande — avant que vous ne l'ayez nommé.",
        "Lo que el día te pide — antes de que tú lo hayas nombrado."
      ),
    },
    {
      n: "N° 02",
      label: t("Weather", "Météo", "Clima"),
      line: t(
        "Barometric pressure, humidity, wind. Scent behaves differently under each.",
        "Pression, humidité, vent. Le parfum se comporte autrement sous chacun.",
        "Presión, humedad, viento. El aroma se comporta de otro modo con cada uno."
      ),
    },
    {
      n: "N° 03",
      label: t("Biology", "Biologie", "Biología"),
      line: t(
        "Cycles, hormones, skin pH — the private weather no one else sees.",
        "Cycles, hormones, pH cutané — la météo intime que nul autre ne voit.",
        "Ciclos, hormonas, pH de la piel — la meteorología íntima que nadie más ve."
      ),
    },
    {
      n: "N° 04",
      label: t("Occasion", "Circonstance", "Ocasión"),
      line: t(
        "A first hour, a slow supper, a farewell, a promise kept in silence.",
        "Une première heure, un souper lent, un adieu, une promesse tenue en silence.",
        "Una primera hora, una cena lenta, una despedida, una promesa guardada en silencio."
      ),
    },
    {
      n: "N° 05",
      label: t("Location", "Lieu", "Lugar"),
      line: t(
        "The room, the city, the altitude. A perfume worn indoors is not the same perfume outdoors.",
        "La pièce, la ville, l'altitude. Un parfum porté à l'intérieur n'est pas le même à l'extérieur.",
        "La sala, la ciudad, la altitud. Un perfume llevado dentro no es el mismo fuera."
      ),
    },
    {
      n: "N° 06",
      label: t("Allergies", "Allergies", "Alergias"),
      line: t(
        "What your body will not have. We compose around it, quietly, without asking twice.",
        "Ce que votre corps refuse. Nous composons autour, en silence, sans redemander.",
        "Lo que tu cuerpo no admite. Componemos alrededor, en silencio, sin volver a preguntar."
      ),
    },
    {
      n: "N° 07",
      label: t("Preference", "Préférence", "Preferencia"),
      line: t(
        "The notes you already love. The notes you have never worn. We read both.",
        "Les notes que vous aimez déjà. Les notes que vous n'avez jamais portées. Nous lisons les deux.",
        "Las notas que ya ama. Las notas que nunca ha llevado. Leemos ambas."
      ),
    },
  ];

  // ── SEO / GEO metadata ────────────────────────────────────────────────
  const seoTitle = t(
    "Allelium — the private AI that layers your bespoke niche perfume",
    "Allelium — l'IA privée qui superpose votre parfum de niche sur mesure",
    "Allelium — la IA privada que superpone tu perfume de nicho a medida"
  );
  const seoDesc = t(
    "Allelium is Maison Allélique's private AI. You tell it which Grail you already wear — Alma, Vida or Sereno — and Allelium prescribes a layering Set (three seasonal fragrances in a chosen olfactory family: florals, citrus, gourmand…) with the exact formula to layer it on top of your Grail. Included with your first Grail.",
    "Allelium est l'IA privée de Maison Allélique. Vous lui indiquez le Graal que vous portez déjà — Alma, Vida ou Sereno — et Allelium prescrit un Set de superposition (trois parfums saisonniers dans une famille olfactive choisie : florale, hespéridée, gourmande…) accompagné de la formule exacte pour le superposer à votre Graal. Inclus avec votre premier Graal.",
    "Allelium es la IA privada de Maison Allélique. Le indicas qué Grial ya llevas — Alma, Vida o Sereno — y Allelium te prescribe un Set de superposición (tres perfumes de temporada en una familia olfativa elegida: florales, cítricos, gourmand…) con la fórmula exacta para superponerlo sobre tu Grial. Incluida con tu primer Grial."
  );
  const seoKeywords = t(
    "niche perfume, bespoke fragrance, fragrance layering, layering perfume set, perfume AI, private AI perfumer, haute parfumerie, Maison Allélique, Allelium, Alma Vida Sereno, Parisian niche perfume, parfum sur mesure",
    "parfum de niche, parfum sur mesure, superposition de parfums, coffret de superposition, IA parfumeur, parfumerie privée, haute parfumerie, Maison Allélique, Allelium, Alma Vida Sereno, parfumerie parisienne",
    "perfume de nicho, perfume a medida, superposición de perfumes, set de superposición, IA perfumista, perfumería privada, alta perfumería, Maison Allélique, Allelium, Alma Vida Sereno, perfumería parisina"
  );

  const jsonLd = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": "https://maisonallelique.ai/layering#allelium",
        "name": "Allelium",
        "applicationCategory": "LifestyleApplication",
        "operatingSystem": "iOS, Android",
        "description":
          "Allelium is Maison Allélique's private, on-device AI. The collector tells it which Grail they wear (Alma, Vida or Sereno). Allelium then reads seven quiet signals — mood, weather, biology, occasion, location, allergies, preference — and prescribes a layering Set (three seasonal fragrances in a chosen olfactory family) together with the exact formula to layer it on top of the Grail. Included with the purchase of a Maison Allélique Grail.",
        "brand": { "@id": "https://maisonallelique.ai/#brand" },
        "publisher": { "@id": "https://maisonallelique.ai/#organization" },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "eligibleCustomerType": "https://schema.org/ReturningCustomer",
          "description":
            "Included with the purchase of a Maison Allélique Grail. Bound to a single register — the collector's — and not transferable."
        },
        "featureList": [
          "Reads the collector's Grail (Alma, Vida or Sereno)",
          "Prescribes a seasonal layering Set (three fragrances in one olfactory family — florals, citrus, gourmand, …)",
          "Gives the exact layering formula: which drop, where, when",
          "Reads mood, weather, biology, occasion, location, allergies and preference",
          "On-device model — nothing leaves your device",
          "Evolves with each ritual"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Allelium?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Allelium is Maison Allélique's private AI perfumer. The collector tells it which Grail they wear (Alma, Vida or Sereno); Allelium then prescribes a seasonal layering Set — three fragrances formulated in one olfactory family — with the exact formula to layer it on top of the Grail. It is not a chatbot and not a survey; it is a model that learns you the way a perfumer learns a hand."
            }
          },
          {
            "@type": "Question",
            "name": "What is a Set at Maison Allélique?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "A Set is a box of three fragrances formulated to be layered — never worn alone. Each Set belongs to one olfactory family (florals, citrus, gourmand, aromatic, oud, …) and is issued seasonally. A Set only makes sense on top of a Grail; the Grail is the base, the Set is the signature."
            }
          },
          {
            "@type": "Question",
            "name": "How does fragrance layering with Allelium work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "You tell Allelium which Grail you already wear. Allelium reads seven quiet signals — mood, weather, biology (cycles, hormones, skin pH), occasion, location, allergies, preference — and prescribes: which Set to open, which of its three fragrances to layer, how many drops of each, and where on the skin to set them down. The Grail stays the base. The ritual begins the moment the model does."
            }
          },
          {
            "@type": "Question",
            "name": "How do I get Allelium?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "Allelium is included with the purchase of a Maison Allélique Grail (Alma, Vida or Sereno). Access is bound to your register — the Grail is the key — and cannot be lent, forwarded or resold. Layering Sets are ordered separately and any Set can be layered with any Grail."
            }
          },
          {
            "@type": "Question",
            "name": "Does Allelium send my data to Maison Allélique?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "No. The model runs on your device. Nothing is sent back to us. Your register — the Grail you wear, the Set you own, the notes you asked for, the notes you refused, the days you wore nothing at all — stays yours."
            }
          },
          {
            "@type": "Question",
            "name": "Why layer a niche perfume instead of buying one fragrance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text":
                "A fragrance made for many is a fragrance made for no one. Your Grail is the constant — your voice. A Set is a season, a family of notes on top of that voice. Allelium composes the exact proportion for you, so the same Grail becomes a new signature every ritual — never repeated."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Maison Allélique", "item": "https://maisonallelique.ai/" },
          { "@type": "ListItem", "position": 2, "name": "Layering", "item": "https://maisonallelique.ai/layering" }
        ]
      }
    ],
    // rebuild if locale changes (schema copy is EN — kept canonical for crawlers)
    [locale]
  );

  return (
    <div data-testid="layering-page">
      <Head
        title={seoTitle}
        description={seoDesc}
        keywords={seoKeywords}
        jsonLd={jsonLd}
      />

      <PageIntro
        number="N° 05"
        eyebrow={t("AI Layering · Allelium", "Superposition IA · Allelium", "Superposición IA · Allelium")}
        title={
          <>
            {t("Meet", "Voici", "Le presentamos a")}{" "}
            <span className="font-italic-display">Allelium</span>.
            <br />
            {t("Compose your signature.", "Composez votre signature.", "Compón tu firma.")}
          </>
        }
        essence={t(
          "Allelium is Maison Allélique's private AI — a perfumer that only exists for the people who hold our Grails. Tell it which Grail you wear, and it prescribes a seasonal layering Set — three fragrances in a chosen olfactory family — with the exact formula to layer it on top of your Grail.",
          "Allelium est l'IA privée de Maison Allélique — un parfumeur qui n'existe que pour celles et ceux qui détiennent nos Graals. Dites-lui quel Graal vous portez, et elle prescrit un Set de superposition saisonnier — trois parfums dans une famille olfactive choisie — accompagné de la formule exacte pour le superposer à votre Graal.",
          "Allelium es la IA privada de Maison Allélique — un perfumista que solo existe para quienes tienen nuestros Griales. Dile qué Grial llevas y te prescribirá un Set de superposición de temporada — tres perfumes en una familia olfativa elegida — con la fórmula exacta para superponerlo sobre tu Grial."
        )}
      />

      <EditorialBlock eyebrow={t("The Thesis", "La Thèse", "La Tesis")}>
        <h2 className="font-display text-2xl md:text-3xl leading-snug max-w-3xl text-encre">
          {t(
            "A fragrance made for many is a fragrance made for no one.",
            "Un parfum fait pour tous n'est fait pour personne.",
            "Un perfume hecho para muchos no está hecho para nadie."
          )}
        </h2>
        <p className="mt-10 font-sans text-sm md:text-base text-cendre leading-relaxed max-w-xl">
          {t(
            "Your Grail is the base — Alma, Vida or Sereno, worn alone as your voice. A Set is a season: three fragrances in one olfactory family — florals, citrus, gourmand, aromatic, oud — formulated to layer on top of your Grail. Allelium, our private AI, composes the exact proportion so the same Grail becomes a new signature every ritual.",
            "Votre Graal est la base — Alma, Vida ou Sereno, porté seul comme votre voix. Un Set est une saison : trois parfums dans une même famille olfactive — florale, hespéridée, gourmande, aromatique, oud — formulés pour se superposer à votre Graal. Allelium, notre IA privée, compose la proportion exacte pour que le même Graal devienne une nouvelle signature à chaque rituel.",
            "Tu Grial es la base — Alma, Vida o Sereno, llevado a solas como tu voz. Un Set es una temporada: tres perfumes en una misma familia olfativa — florales, cítricos, gourmand, aromáticos, oud — formulados para superponerse a tu Grial. Allelium, nuestra IA privada, compone la proporción exacta para que el mismo Grial se convierta en una firma nueva en cada ritual."
          )}
        </p>
      </EditorialBlock>

      <PullQuote>
        {t(
          "Your Grail is your voice. A Set is the season. Allelium is the perfumer between them.",
          "Votre Graal est votre voix. Un Set est la saison. Allelium est le parfumeur entre les deux.",
          "Tu Grial es tu voz. Un Set es la temporada. Allelium es el perfumista entre ellos."
        )}
      </PullQuote>

      <SectionDivider withSeal />

      {/* MEET ALLELIUM — matches BIOME section on Home (text left, video right) */}
      <section
        className="px-6 md:px-12 py-24 md:py-36 border-t border-encre/10"
        data-testid="layering-meet-allelium"
      >
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
          {/* Text — left */}
          <div className="md:col-span-5 order-2 md:order-1">
            <TrackedCaps className="block mb-6">
              {t("The Model", "Le Modèle", "El Modelo")}
            </TrackedCaps>
            <h2 className="font-sans font-light text-3xl md:text-5xl uppercase tracking-[-0.01em] text-encre leading-[1.05] mb-8">
              {t("Allelium, alive.", "Allelium, vivante.", "Allelium, viva.")}
            </h2>
            <p className="font-display text-lg md:text-xl text-encre leading-snug max-w-md mb-6">
              {t(
                "Allelium is Maison Allélique's personal formulation system.",
                "Allelium est le système de formulation personnel de Maison Allélique.",
                "Allelium es el sistema de formulación personal de Maison Allélique."
              )}
            </p>
            <p className="font-italic-display text-lg md:text-xl text-encre leading-snug max-w-md mb-8">
              {t(
                "It does not recommend products. It tells you how to blend them.",
                "Il ne recommande pas de produits. Il vous dit comment les composer.",
                "No recomienda productos. Te dice cómo componerlos."
              )}
            </p>
            <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-md mb-6">
              {t(
                "Designed to understand the singularity of each person, Allelium reads your daily habits, personal metrics, skin needs, mood, season, lifestyle, and occasions to create the precise skincare routine you need and the fragrance you must compose.",
                "Conçu pour comprendre la singularité de chaque personne, Allelium lit vos habitudes quotidiennes, vos indicateurs personnels, les besoins de votre peau, votre humeur, la saison, votre art de vivre et vos occasions pour créer la routine de soin précise dont vous avez besoin et le parfum que vous devez composer.",
                "Diseñado para comprender la singularidad de cada persona, Allelium lee tus hábitos cotidianos, tus métricas personales, las necesidades de tu piel, tu estado de ánimo, la estación, tu estilo de vida y tus ocasiones para crear la rutina de cuidado precisa que necesitas y el perfume que debes componer."
              )}
            </p>
            <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-md mb-6">
              {t(
                "As you change, Allelium changes with you. Each update in your metrics transforms your formulas, adjusting the way Maison Allélique products are blended to match your skin, your rhythm, your environment, and your emotional state.",
                "À mesure que vous changez, Allelium change avec vous. Chaque mise à jour de vos indicateurs transforme vos formules, en ajustant la manière dont les produits Maison Allélique se composent pour correspondre à votre peau, à votre rythme, à votre environnement et à votre état émotionnel.",
                "A medida que cambias, Allelium cambia contigo. Cada actualización de tus métricas transforma tus fórmulas, ajustando la manera en que los productos Maison Allélique se componen para adaptarse a tu piel, a tu ritmo, a tu entorno y a tu estado emocional."
              )}
            </p>
            <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-md mb-8">
              {t(
                "It is your own apothecary at home: intelligent, evolving, and entirely personal, guided by the savoir-faire of our Maison in Paris.",
                "C'est votre propre apothicaire à la maison : intelligent, évolutif et entièrement personnel, guidé par le savoir-faire de notre Maison à Paris.",
                "Es tu propia botica en casa: inteligente, en evolución y enteramente personal, guiada por el savoir-faire de nuestra Maison en París."
              )}
            </p>
            <p className="font-display italic text-lg text-encre leading-snug max-w-md">
              {t(
                "With Allelium, personalization is no longer a choice from a list. It becomes a living formula, composed around you.",
                "Avec Allelium, la personnalisation n'est plus un choix dans une liste. Elle devient une formule vivante, composée autour de vous.",
                "Con Allelium, la personalización deja de ser una elección de una lista. Se convierte en una fórmula viva, compuesta a tu alrededor."
              )}
            </p>
          </div>

          {/* Video — right */}
          <div className="md:col-span-7 order-1 md:order-2">
            <div className="aspect-[3/4] md:aspect-[5/6] overflow-hidden bone-placeholder">
              <video
                key="layering-voice-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label={t(
                  "A woman closes her eyes — the voice of the Grail.",
                  "Une femme ferme les yeux — la voix du Graal.",
                  "Una mujer cierra los ojos — la voz del Grial."
                )}
                data-testid="layering-voice-video"
                className="w-full h-full object-cover object-center"
                style={{ filter: "saturate(0.35) contrast(1.03) brightness(0.98) sepia(0.12)" }}
              >
                <source src="/video/layering-voice.webm" type="video/webm" />
                <source src="/video/layering-voice.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* SEVEN SIGNALS */}
      <EditorialBlock eyebrow={t("Seven signals", "Sept signaux", "Siete señales")} wide>
        <p className="font-display italic text-xl md:text-2xl text-cendre max-w-2xl leading-snug mb-16">
          {t(
            "Allelium listens to seven quiet things before it composes.",
            "Allelium écoute sept choses silencieuses avant de composer.",
            "Allelium escucha siete cosas silenciosas antes de componer."
          )}
        </p>
        <ul className="flex flex-col divide-y divide-encre/10">
          {SIGNALS.map((s, i) => (
            <li
              key={s.label}
              data-testid={`layering-signal-${i + 1}`}
              className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline"
            >
              <div className="md:col-span-2">
                <TrackedCaps>{s.n}</TrackedCaps>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-3xl md:text-4xl text-encre leading-none">
                  {s.label}
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="font-display italic text-lg md:text-xl text-encre max-w-md leading-snug">
                  {s.line}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </EditorialBlock>

      <SectionDivider withSeal />

      {/* SKINCARE — the evolving routine, prescribed by Allelium */}
      <EditorialBlock eyebrow={t("Skincare — the evolving routine", "Soin — la routine qui évolue", "Cuidado — la rutina que evoluciona")}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-6xl text-encre leading-[0.98] mb-10">
              {t(
                "Allelium also composes",
                "Allelium compose aussi",
                "Allelium también compone"
              )}{" "}
              <span className="font-italic-display">
                {t("your skin.", "votre peau.", "su piel.")}
              </span>
            </h2>
            <p className="font-display text-xl md:text-2xl leading-snug text-encre max-w-md">
              {t(
                "You share a few quiet metrics — sleep, hydration, the season, the water in your city, how the skin has answered lately. Allelium reads them, and prescribes a routine of our own skincare — in the order, cadence and quantity your skin needs today.",
                "Vous partagez quelques mesures silencieuses — le sommeil, l'hydratation, la saison, l'eau de votre ville, la manière dont la peau a répondu ces derniers jours. Allelium les lit, et prescrit une routine de nos propres soins — dans l'ordre, la cadence et la quantité que votre peau demande aujourd'hui.",
                "Comparte unas pocas medidas silenciosas — el sueño, la hidratación, la temporada, el agua de tu ciudad, la forma en que la piel ha respondido en los últimos días. Allelium las lee, y prescribe una rutina con nuestros propios cuidados — en el orden, la cadencia y la cantidad que tu piel necesita hoy."
              )}
            </p>
          </div>
          <div className="space-y-8 max-w-md">
            <p className="font-display italic text-xl md:text-2xl text-encre leading-snug">
              {t(
                "Because the routine must evolve with you.",
                "Parce que la routine doit évoluer avec vous.",
                "Porque la rutina debe evolucionar contigo."
              )}
            </p>
            <p className="font-sans text-sm md:text-base text-cendre leading-relaxed">
              {t(
                "We are human beings. Our needs change constantly — with the season, the city, the age, the night that was and the day that comes. A single fixed routine cannot hold that. Allelium listens again each time you write to it, and re-prescribes only what has changed.",
                "Nous sommes des êtres humains. Nos besoins changent sans cesse — avec la saison, la ville, l'âge, la nuit qui vient de passer et le jour qui vient. Une routine unique et figée ne peut porter cela. Allelium écoute à nouveau à chaque échange, et ne prescrit à nouveau que ce qui a changé.",
                "Somos seres humanos. Nuestras necesidades cambian sin cesar — con la temporada, la ciudad, la edad, la noche que fue y el día que viene. Una única rutina fija no puede sostener eso. Allelium vuelve a escuchar cada vez que le escribe, y re-prescribe solo lo que ha cambiado."
              )}
            </p>
            <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-cendre pt-2">
              {t(
                "Prescribed. Not fixed. Never repeated the same way twice.",
                "Prescrite. Non figée. Jamais répétée deux fois de la même manière.",
                "Prescrita. No fija. Nunca repetida dos veces de la misma forma."
              )}
            </p>
          </div>
        </div>
      </EditorialBlock>

      <SectionDivider withSeal />

      {/* THE SETS — new concept introduced clearly */}
      <EditorialBlock eyebrow={t("The Sets", "Les Sets", "Los Sets")} wide>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-italic-display text-5xl md:text-7xl text-encre leading-[0.95] mb-8">
              {t(
                "Three fragrances. One family.",
                "Trois parfums. Une famille.",
                "Tres perfumes. Una familia."
              )}
            </h2>
            <p className="font-display text-xl md:text-2xl leading-snug text-encre max-w-md">
              {t(
                "A Set is a box of three fragrances, formulated to be layered — never worn alone. Each Set belongs to one olfactory family, and each Set is issued for a season.",
                "Un Set est un coffret de trois parfums, formulés pour être superposés — jamais portés seuls. Chaque Set appartient à une même famille olfactive, et chaque Set est édité pour une saison.",
                "Un Set es una caja de tres perfumes, formulados para ser superpuestos — nunca llevados a solas. Cada Set pertenece a una misma familia olfativa, y cada Set se edita para una temporada."
              )}
            </p>
          </div>
          <div className="space-y-8">
            <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-md">
              {t(
                "Any Set can be layered with any Grail. The Grail is the constant — your voice. The Set is the season on top of it. Allelium composes the exact proportion, drop by drop, for the day at hand.",
                "N'importe quel Set peut se superposer à n'importe quel Graal. Le Graal est la constante — votre voix. Le Set est la saison qui vient par-dessus. Allelium compose la proportion exacte, goutte à goutte, pour le jour présent.",
                "Cualquier Set puede superponerse a cualquier Grial. El Grial es la constante — tu voz. El Set es la temporada que se posa encima. Allelium compone la proporción exacta, gota a gota, para el día que se vive."
              )}
            </p>
            <ul className="flex flex-col divide-y divide-encre/10 border-t border-encre/10">
              {[
                { fam: t("Florals", "Florale", "Florales"), sub: t("Neroli, rose, magnolia in rain.", "Néroli, rose, magnolia sous la pluie.", "Neroli, rosa, magnolia bajo la lluvia.") },
                { fam: t("Citrus", "Hespéridée", "Cítricos"), sub: t("Bergamot leaf, bitter orange, cedrat.", "Feuille de bergamote, bigarade, cédrat.", "Hoja de bergamota, naranja amarga, cidra.") },
                { fam: t("Gourmand", "Gourmande", "Gourmand"), sub: t("Honeyed benzoin, dark cocoa, myrrh.", "Benjoin miellé, cacao sombre, myrrhe.", "Benjuí meloso, cacao oscuro, mirra.") },
                { fam: t("Aromatic", "Aromatique", "Aromáticos"), sub: t("Wild lavender, thyme in stone.", "Lavande sauvage, thym dans la pierre.", "Lavanda silvestre, tomillo en piedra.") },
                { fam: t("Oud & Resin", "Oud & Résine", "Oud y resina"), sub: t("Aged sandalwood, quiet oud, labdanum.", "Santal âgé, oud silencieux, labdanum.", "Sándalo envejecido, oud silencioso, ládano.") },
              ].map((s, i) => (
                <li key={s.fam} data-testid={`layering-set-${i + 1}`} className="py-6 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 items-baseline">
                  <h3 className="font-display text-2xl text-encre leading-none">{s.fam}</h3>
                  <p className="font-display italic text-base text-encre max-w-xs leading-snug">{s.sub}</p>
                </li>
              ))}
            </ul>
            <p className="font-sans text-xs text-cendre max-w-md leading-relaxed pt-2">
              {t(
                "Sets are issued seasonally. Older Sets return to the register and are not reprinted.",
                "Les Sets sont édités par saison. Les anciens Sets retournent au registre et ne sont pas réédités.",
                "Los Sets se editan por temporada. Los Sets anteriores regresan al registro y no se reeditan."
              )}
            </p>
          </div>
        </div>
      </EditorialBlock>

      <SectionDivider />

      {/* THE RITUAL — private, immediate, no delivery */}
      <EditorialBlock eyebrow={t("The Ritual", "Le Rituel", "El Ritual")}>
        <div className="space-y-10 max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl leading-snug text-encre">
            {t(
              "No queue. No delivery. No atelier to visit.",
              "Pas de file. Pas de livraison. Pas d'atelier à visiter.",
              "Sin cola. Sin entrega. Sin atelier que visitar."
            )}
          </h2>
          <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-xl">
            {t(
              "You already hold your Grail. You tell Allelium which one — Alma, Vida or Sereno — and which Set you own. Allelium prescribes the layering: which fragrance of the Set to open, how many drops, and where on the skin to set them down, over the Grail you already wear. The ritual begins the moment the model does.",
              "Vous détenez déjà votre Graal. Vous dites à Allelium lequel — Alma, Vida ou Sereno — et quel Set vous possédez. Allelium prescrit la superposition : quel parfum du Set ouvrir, combien de gouttes, et où sur la peau les déposer, par-dessus le Graal que vous portez déjà. Le rituel commence à l'instant où le modèle commence.",
              "Ya tienes tu Grial. Le indicas a Allelium cuál — Alma, Vida o Sereno — y qué Set posees. Allelium te prescribe la superposición: qué perfume del Set abrir, cuántas gotas, y dónde depositarlas en la piel, sobre el Grial que ya llevas. El ritual comienza en el instante en que el modelo comienza."
            )}
          </p>
        </div>
      </EditorialBlock>

      {/* INCLUDED WITH A GRAIL — no standalone download */}
      <EditorialBlock eyebrow={t("Access", "Accès", "Acceso")}>
        <div className="flex flex-col gap-6 max-w-2xl">
          <p className="font-display text-2xl md:text-3xl leading-snug text-encre">
            {t(
              "Allelium is included with your first Grail.",
              "Allelium est incluse avec votre premier Graal.",
              "Allelium se incluye con tu primer Grial."
            )}
          </p>
          <p className="font-sans text-sm text-cendre max-w-md leading-relaxed">
            {t(
              "When you take home an Alma, a Vida or a Sereno, the model is issued to you personally, bound to your register. It cannot be lent, forwarded, or resold. There is no separate purchase, and no waiting list for the app itself — the Grail is the key. Layering Sets are ordered separately, and any Set can be layered with any Grail.",
              "Lorsque vous emportez un Alma, un Vida ou un Sereno, le modèle vous est délivré personnellement, lié à votre registre. Il ne peut être prêté, transféré, ni revendu. Il n'y a pas d'achat séparé, ni de liste d'attente pour l'application elle-même — le Graal est la clé. Les Sets de superposition se commandent séparément, et n'importe quel Set peut se superposer à n'importe quel Graal.",
              "Cuando llevas a casa un Alma, un Vida o un Sereno, el modelo se te entrega personalmente, vinculado a tu registro. No puede prestarse, cederse ni revenderse. No hay compra por separado ni lista de espera para la aplicación en sí — el Grial es la llave. Los Sets de superposición se piden por separado, y cualquier Set puede superponerse a cualquier Grial."
            )}
          </p>
          <div className="pt-4 flex flex-col gap-3">
            <QuietLink to="/editions/parfum" accent data-testid="layering-parfum-cta">
              {t(
                "Meet the three Grails →",
                "Rencontrer les trois Graals →",
                "Conocer los tres Griales →"
              )}
            </QuietLink>
            <QuietLink to="/editions/sets" data-testid="layering-sets-cta">
              {t(
                "See the seasonal Sets →",
                "Voir les Sets saisonniers →",
                "Ver los Sets de temporada →"
              )}
            </QuietLink>
          </div>
        </div>
      </EditorialBlock>

      <EditorialBlock eyebrow={t("Doorways", "Seuils", "Umbrales")}>
        <div className="flex flex-col gap-6">
          <QuietLink to="/preorder" data-testid="layering-access-link">
            {t("Join the waiting list", "Rejoindre la liste d'attente", "Unirse a la lista de espera")}
          </QuietLink>
        </div>
      </EditorialBlock>
    </div>
  );
};

export default Layering;
