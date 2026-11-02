import React from "react";
import {
  PageIntro,
  EditorialBlock,
  PullQuote,
  BoneImage,
  SectionDivider,
} from "@/components/Editorial";
import { TrackedCaps } from "@/components/TrackedCaps";
import { QuietLink } from "@/components/QuietLink";
import { Head } from "@/components/Head";
import { useT } from "@/i18n/LocaleContext";
import IMAGES from "@/data/images";

const EditionParfum = () => {
  const t = useT();

  const GRAILS = [
    {
      n: "N° 01",
      name: "Alma",
      voice: t("Recognition", "Reconnaissance", "Reconocimiento"),
      line: t("I know you.", "Je te connais.", "Te conozco."),
      body: t(
        "Alma is the scent of recognition — the moment two souls meet and something in each one knows the other. It is not worn to attract; it is worn to be known. The bond it speaks is older than reason and takes every form: the lovers who recognise each other across a room, the mother and child before language, the friends who meet and feel they have always known. Alma is the warmth one soul smells on another and answers to.",
        "Alma est le parfum de la reconnaissance — l'instant où deux âmes se rencontrent et que quelque chose en chacune reconnaît l'autre. Il ne se porte pas pour séduire ; il se porte pour être reconnu. Le lien qu'il parle est plus ancien que la raison et prend toutes les formes : les amants qui se reconnaissent à travers une pièce, la mère et l'enfant avant le langage, les amis qui se retrouvent et sentent qu'ils se sont toujours connus. Alma est la chaleur qu'une âme sent sur une autre et à laquelle elle répond.",
        "Alma es el aroma del reconocimiento — el instante en que dos almas se encuentran y algo en cada una reconoce a la otra. No se lleva para atraer; se lleva para ser reconocido. El vínculo del que habla es más antiguo que la razón y toma todas las formas: los amantes que se reconocen a través de una sala, la madre y el hijo antes del lenguaje, los amigos que se reencuentran y sienten que siempre se han conocido. Alma es la calidez que un alma huele en otra y a la que responde."
      ),
      notes: {
        top: t(
          "The Skin Accord — orris butter, ambrette seed, soft clean musk. Warm human skin, the smell of nearness.",
          "L'accord Peau — beurre d'iris, graine d'ambrette, musc doux et propre. La peau humaine chaude, l'odeur de la proximité.",
          "El acorde Piel — mantequilla de orris, semilla de ambrette, almizcle suave y limpio. La piel humana cálida, el olor de la cercanía."
        ),
        heart: t(
          "The Tenderness Accord — a milky lactone, heliotrope, almond blossom. The primal comfort of being held.",
          "L'accord Tendresse — une lactone laiteuse, héliotrope, fleur d'amandier. Le réconfort primal de l'étreinte.",
          "El acorde Ternura — una lactona lechosa, heliotropo, flor de almendro. El consuelo primigenio del abrazo."
        ),
        base: t(
          "The Embrace Accord — creamy sandalwood, benzoin, dry labdanum. The warmth that lasts after the embrace.",
          "L'accord Étreinte — santal crémeux, benjoin, labdanum sec. La chaleur qui demeure après l'étreinte.",
          "El acorde Abrazo — sándalo cremoso, benjuí, ládano seco. La calidez que permanece tras el abrazo."
        ),
      },
      image: IMAGES.register.alma,
      alt: "Alma — Concept 02A. The embracing arch, the doorway through which two come to know each other.",
    },
    {
      n: "N° 02",
      name: "Vida",
      voice: t("The waking world", "Le monde qui s'éveille", "El mundo que despierta"),
      line: t("I am alive.", "Je suis vivante.", "Estoy viva."),
      body: t(
        "Vida is the scent of a forest the moment after rain — light breaking through wet leaves, wind moving the canopy, the earth breathing out, birdsong returning to the branches. It is life responding: the whole forest waking at once, green and luminous and alive. Not one plant but the living network entire — the rain, the light, the moving air, the breathing ground.",
        "Vida est le parfum d'une forêt à l'instant qui suit la pluie — la lumière qui traverse les feuilles mouillées, le vent qui remue la canopée, la terre qui expire, les oiseaux qui reviennent aux branches. C'est la vie qui répond : la forêt entière qui s'éveille d'un seul coup, verte et lumineuse et vivante. Pas une plante mais tout le réseau vivant — la pluie, la lumière, l'air en mouvement, le sol qui respire.",
        "Vida es el aroma de un bosque en el instante posterior a la lluvia — la luz atravesando las hojas mojadas, el viento agitando la copa, la tierra exhalando, el canto de los pájaros regresando a las ramas. Es la vida respondiendo: el bosque entero despertando de golpe, verde y luminoso y vivo. No una planta sino la red viva entera — la lluvia, la luz, el aire en movimiento, el suelo que respira."
      ),
      notes: {
        top: t(
          "The Rain Accord — petrichor, violet leaf absolute, galbanum. Wet earth and leaf, the moment the rain stops.",
          "L'accord Pluie — pétrichor, absolu de feuille de violette, galbanum. Terre et feuille mouillées, l'instant où la pluie cesse.",
          "El acorde Lluvia — petricor, absoluto de hoja de violeta, gálbano. Tierra y hoja mojadas, el instante en que cesa la lluvia."
        ),
        heart: t(
          "The Light Accord — fig leaf and fruit, green magnolia, mastic. Sunlight through wet leaves, sap rising.",
          "L'accord Lumière — feuille et fruit de figue, magnolia vert, mastic. Le soleil à travers les feuilles mouillées, la sève qui monte.",
          "El acorde Luz — hoja y fruto de higo, magnolia verde, almáciga. Sol a través de las hojas mojadas, la savia que sube."
        ),
        base: t(
          "The Living-Floor Accord — rooty vetiver, oakmoss, damp wood, luminous musk. The breathing forest floor, never settled.",
          "L'accord Sol Vivant — vétiver rooty, mousse de chêne, bois humide, musc lumineux. Le sol de la forêt qui respire, jamais posé.",
          "El acorde Suelo Vivo — vetiver de raíz, musgo de roble, madera húmeda, almizcle luminoso. El suelo del bosque respirando, nunca quieto."
        ),
      },
      image: IMAGES.register.vida,
      alt: "Vida — Concept 02B. The rising wave, all upward momentum, the forest lifting after the storm.",
    },
    {
      n: "N° 03",
      name: "Sereno",
      voice: t("Lasting calm", "Calme durable", "Calma duradera"),
      line: t("Stay.", "Reste.", "Quédate."),
      body: t(
        "When the world feels sharp and fast, Sereno is peace that lasts. It is the calm worn against a hard day — soft where the world is sharp, slow where the world is quick, enduring where everything else is fleeting. Not a moment of stillness but a stillness that stays: the deep, quiet calm you carry into the noise, and that holds. Warm quiet, not cold clarity — the refuge you carry and that does not leave.",
        "Quand le monde devient tranchant et pressé, Sereno est la paix qui demeure. C'est le calme que l'on porte contre un jour dur — doux là où le monde est tranchant, lent là où le monde est vif, durable là où tout le reste s'efface. Non un instant de calme mais un calme qui reste : la quiétude profonde que l'on porte dans le bruit, et qui tient. Silence chaud, non clarté froide — le refuge que l'on porte et qui ne part pas.",
        "Cuando el mundo se vuelve afilado y rápido, Sereno es la paz que permanece. Es la calma que se lleva contra un día duro — suave donde el mundo es afilado, lento donde el mundo es rápido, duradero donde todo lo demás es fugaz. No un instante de quietud sino una quietud que se queda: la calma profunda que uno lleva en el ruido, y que sostiene. Silencio cálido, no claridad fría — el refugio que uno lleva y que no se va."
      ),
      notes: {
        top: t(
          "The Clear-Air Accord — soft bergamot, cardamom, a breath of clean air. Spacious, unhurried, unbroken.",
          "L'accord Air Clair — bergamote douce, cardamome, un souffle d'air propre. Spacieux, sans hâte, sans rupture.",
          "El acorde Aire Claro — bergamota suave, cardamomo, un aliento de aire limpio. Espacioso, sin prisa, sin fisura."
        ),
        heart: t(
          "The Stillness Accord — luminous frankincense, iris, pale tea, blond wood. Quiet made breathable.",
          "L'accord Quiétude — encens lumineux, iris, thé pâle, bois blond. La quiétude devenue respirable.",
          "El acorde Quietud — incienso luminoso, iris, té pálido, madera rubia. La quietud vuelta respirable."
        ),
        base: t(
          "The Lasting-Calm Accord — soft sandalwood, benzoin, transparent musk, woody amber. A warm calm that does not fade.",
          "L'accord Calme Durable — santal doux, benjoin, musc transparent, ambre boisé. Un calme chaud qui ne s'estompe pas.",
          "El acorde Calma Duradera — sándalo suave, benjuí, almizcle transparente, ámbar amaderado. Una calma cálida que no se desvanece."
        ),
      },
      image: IMAGES.register.sereno,
      alt: "Sereno — Concept 02C. The still broken circle — two halves in equilibrium.",
      sang: true,
    },
  ];

  return (
    <div data-testid="edition-parfum-page">
      <Head
        title={t("Parfum · The Grail Perfume", "Parfum · Le Parfum Graal", "Perfume · El Perfume Grial")}
        description={t(
          "Alma, Vida, Sereno — the three living Grail perfumes of Maison Allélique. Niche perfumes composed once, per collector, and layered by Allelium into a bespoke signature no one else will wear.",
          "Alma, Vida, Sereno — les trois parfums Graal vivants de Maison Allélique. Parfums de niche composés une seule fois, par collectionneur, et superposés par Allelium en une signature sur mesure que personne d'autre ne portera.",
          "Alma, Vida, Sereno — los tres perfumes Grial vivos de Maison Allélique. Perfumes de nicho compuestos una sola vez, por coleccionista, y superpuestos por Allelium en una firma a medida que nadie más llevará."
        )}
        keywords={t(
          "Alma perfume, Vida perfume, Sereno perfume, niche perfume Paris, bespoke fragrance, Maison Allélique Grail perfumes, fragrance layering, Allelium, haute parfumerie, parfum sur mesure",
          "parfum Alma, parfum Vida, parfum Sereno, parfum de niche Paris, parfum sur mesure, parfums Graal Maison Allélique, superposition de parfums, Allelium, haute parfumerie",
          "perfume Alma, perfume Vida, perfume Sereno, perfume de nicho París, perfume a medida, perfumes Grial Maison Allélique, superposición de perfumes, Allelium, alta perfumería"
        )}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": "https://maisonallelique.ai/editions/parfum#list",
            "name": "The Grail Perfume — Maison Allélique",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "item": { "@id": "https://maisonallelique.ai/editions/parfum#alma" } },
              { "@type": "ListItem", "position": 2, "item": { "@id": "https://maisonallelique.ai/editions/parfum#vida" } },
              { "@type": "ListItem", "position": 3, "item": { "@id": "https://maisonallelique.ai/editions/parfum#sereno" } },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "@id": "https://maisonallelique.ai/editions/parfum#alma",
            "name": "Alma — Grail Perfume by Maison Allélique",
            "category": "Niche perfume",
            "brand": {
              "@type": "Brand",
              "@id": "https://maisonallelique.ai/#brand",
              "name": "Maison Allélique",
              "url": "https://maisonallelique.ai",
            },
            "image": "https://maisonallelique.ai/brief/register-alma.jpg",
            "description":
              "Alma — Recognition. The scent of warmth one soul smells on another and answers to. Skin Accord (orris, ambrette, soft musk) · Tenderness Accord (milky lactone, heliotrope, almond blossom) · Embrace Accord (sandalwood, benzoin, dry labdanum). Composed once per collector; layered by Allelium into a bespoke signature.",
            "offers": {
              "@type": "Offer",
              "url": "https://maisonallelique.ai/preorder",
              "availability": "https://schema.org/PreOrder",
              "priceCurrency": "EUR",
              "seller": { "@id": "https://maisonallelique.ai/#brand" },
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "@id": "https://maisonallelique.ai/editions/parfum#vida",
            "name": "Vida — Grail Perfume by Maison Allélique",
            "category": "Niche perfume",
            "brand": {
              "@type": "Brand",
              "@id": "https://maisonallelique.ai/#brand",
              "name": "Maison Allélique",
              "url": "https://maisonallelique.ai",
            },
            "image": "https://maisonallelique.ai/brief/register-vida.jpg",
            "description":
              "Vida — The waking world. A forest the moment after rain, the whole living network entire. Rain Accord (petrichor, violet leaf, galbanum) · Light Accord (fig leaf, green magnolia, mastic) · Living-Floor Accord (rooty vetiver, oakmoss, damp wood).",
            "offers": {
              "@type": "Offer",
              "url": "https://maisonallelique.ai/preorder",
              "availability": "https://schema.org/PreOrder",
              "priceCurrency": "EUR",
              "seller": { "@id": "https://maisonallelique.ai/#brand" },
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "@id": "https://maisonallelique.ai/editions/parfum#sereno",
            "name": "Sereno — Grail Perfume by Maison Allélique",
            "category": "Niche perfume",
            "brand": {
              "@type": "Brand",
              "@id": "https://maisonallelique.ai/#brand",
              "name": "Maison Allélique",
              "url": "https://maisonallelique.ai",
            },
            "image": "https://maisonallelique.ai/brief/register-sereno.jpg",
            "description":
              "Sereno — Lasting calm. Not a moment of stillness but a stillness that stays. Clear-Air Accord (soft bergamot, cardamom) · Stillness Accord (luminous frankincense, iris, pale tea, blond wood) · Lasting-Calm Accord (soft sandalwood, benzoin, transparent musk).",
            "offers": {
              "@type": "Offer",
              "url": "https://maisonallelique.ai/preorder",
              "availability": "https://schema.org/PreOrder",
              "priceCurrency": "EUR",
              "seller": { "@id": "https://maisonallelique.ai/#brand" },
            },
          },
        ]}
      />

      <PageIntro
        number="N° 01"
        eyebrow={t("Editions · Parfum", "Éditions · Parfum", "Ediciones · Perfume")}
        title={
          <>
            {t("Three", "Trois", "Tres")}{" "}
            <span className="font-italic-display">{t("beings", "êtres", "seres")}</span>.
            <br />
            {t("One planet, spoken in silence.", "Une planète, parlée en silence.", "Un planeta, hablado en silencio.")}
          </>
        }
        essence={t(
          "The Grail perfumes are not fragrances. They are living relics — the Silent Biome given breath, and worn.",
          "Les parfums Graal ne sont pas des parfums. Ce sont des reliques vivantes — le Biome Silencieux fait souffle, et porté.",
          "Los perfumes Grial no son fragancias. Son reliquias vivas — el Biome Silencioso hecho aliento, y llevado."
        )}
      />

      <BoneImage
        description={IMAGES.parfum.alt}
        src={IMAGES.parfum.still}
        alt={IMAGES.parfum.alt}
        ratio="aspect-[16/9]"
        className="max-w-[1400px] mx-auto"
      />

      <EditorialBlock eyebrow={t("The Grail Perfume", "Le Parfum Graal", "El Perfume Grial")}>
        <p className="font-display text-2xl md:text-3xl leading-snug max-w-3xl text-encre">
          {t(
            "Each Grail perfume is a voice of the Silent Biome. It is composed once for one person, held in a register, and never repeated.",
            "Chaque parfum Graal est une voix du Biome Silencieux. Il est composé une seule fois pour une seule personne, inscrit à un registre, et jamais répété.",
            "Cada perfume Grial es una voz del Biome Silencioso. Se compone una sola vez para una sola persona, se conserva en un registro y jamás se repite."
          )}
        </p>
      </EditorialBlock>

      <PullQuote>
        {t(
          "The Grail perfumes are not fragrances. They are beings with emotional essences.",
          "Les parfums Graal ne sont pas des parfums. Ce sont des êtres dotés d'essences émotionnelles.",
          "Los perfumes Grial no son fragancias. Son seres con esencias emocionales."
        )}
      </PullQuote>

      {GRAILS.map((g, i) => (
        <section
          key={g.name}
          className="px-6 md:px-12 py-24 md:py-32"
          data-testid={`grail-${g.name.toLowerCase()}`}
        >
          <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">
            <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <BoneImage
                description={g.alt}
                src={g.image}
                alt={g.alt}
                ratio="aspect-[4/5]"
              />
            </div>
            <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1" : ""} space-y-8`}>
              <div className="flex items-center gap-4">
                <TrackedCaps tone={g.sang ? "sang" : "cendre"}>{g.n}</TrackedCaps>
                <TrackedCaps>{g.voice}</TrackedCaps>
              </div>
              <h3 className="font-italic-display text-6xl md:text-7xl lg:text-8xl text-encre leading-none">
                {g.name}
              </h3>
              <p className="font-display italic text-2xl md:text-3xl text-encre">
                &ldquo;{g.line}&rdquo;
              </p>
              <p className="font-display text-xl md:text-2xl leading-snug text-encre max-w-xl">
                {g.body}
              </p>
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 border-t border-encre/10">
                <div>
                  <dt className="tracked mb-3">{t("Tête", "Tête", "Salida")}</dt>
                  <dd className="font-display text-base text-encre leading-snug">
                    {g.notes.top}
                  </dd>
                </div>
                <div>
                  <dt className="tracked mb-3">{t("Cœur", "Cœur", "Corazón")}</dt>
                  <dd className="font-display text-base text-encre leading-snug">
                    {g.notes.heart}
                  </dd>
                </div>
                <div>
                  <dt className="tracked mb-3">{t("Fond", "Fond", "Fondo")}</dt>
                  <dd className="font-display text-base text-encre leading-snug">
                    {g.notes.base}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      ))}

      <SectionDivider withSeal />

      <EditorialBlock eyebrow={t("A note on personalisation", "Une note sur la personnalisation", "Una nota sobre la personalización")}>
        <p className="font-display italic text-xl md:text-2xl text-encre max-w-2xl leading-snug">
          {t(
            "Each Grail is retuned to the person who receives it. We do not describe how. That belongs to the room in which it is composed.",
            "Chaque Graal est réaccordé à la personne qui le reçoit. Nous ne disons pas comment. Cela appartient à la pièce où il est composé.",
            "Cada Grial se reafina para la persona que lo recibe. No decimos cómo. Eso pertenece a la sala en la que se compone."
          )}
        </p>
      </EditorialBlock>

      <EditorialBlock eyebrow={t("Doorway", "Seuil", "Umbral")}>
        <div className="flex flex-col gap-6">
          <QuietLink to="/preorder" accent data-testid="parfum-preorder-link">
            {t("Join the waiting list", "Rejoindre la liste d'attente", "Unirse a la lista de espera")}
          </QuietLink>
          <QuietLink to="/editions/skincare" data-testid="parfum-skincare-link">
            {t("Next: Skincare", "Suivant : Soin", "Siguiente: Cuidado")}
          </QuietLink>
        </div>
      </EditorialBlock>
    </div>
  );
};

export default EditionParfum;
