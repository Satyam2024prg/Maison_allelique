import React, { useMemo } from "react";
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

const EditionSets = () => {
  const t = useT();

  const FAMILIES = [
    {
      key: "florals",
      n: "N° 01",
      family: t("Florals", "Florale", "Florales"),
      season: t("Winter → Spring", "Hiver → Printemps", "Invierno → Primavera"),
      notes: t(
        "Neroli petal, wet rose, magnolia opened by rain.",
        "Pétale de néroli, rose mouillée, magnolia ouvert par la pluie.",
        "Pétalo de neroli, rosa mojada, magnolia abierto por la lluvia."
      ),
      whisper: t(
        "For the day that speaks before the words arrive.",
        "Pour le jour qui parle avant les mots.",
        "Para el día que habla antes de las palabras."
      ),
      image: IMAGES.sets.families.florals,
    },
    {
      key: "citrus",
      n: "N° 02",
      family: t("Citrus", "Hespéridée", "Cítricos"),
      season: t("Spring → Summer", "Printemps → Été", "Primavera → Verano"),
      notes: t(
        "Bergamot leaf at dawn, bitter orange, cedrat rind.",
        "Feuille de bergamote à l'aube, bigarade, écorce de cédrat.",
        "Hoja de bergamota al alba, naranja amarga, corteza de cidra."
      ),
      whisper: t(
        "For the hour that turns the room lighter than it was.",
        "Pour l'heure qui allège la pièce.",
        "Para la hora que aligera la sala."
      ),
      image: IMAGES.sets.families.citrus,
    },
    {
      key: "gourmand",
      n: "N° 03",
      family: t("Gourmand", "Gourmande", "Gourmand"),
      season: t("Autumn → Winter", "Automne → Hiver", "Otoño → Invierno"),
      notes: t(
        "Honeyed benzoin, dark cocoa, myrrh warmed in the hand.",
        "Benjoin miellé, cacao sombre, myrrhe réchauffée dans la main.",
        "Benjuí meloso, cacao oscuro, mirra entibiada en la mano."
      ),
      whisper: t(
        "For the supper that is not in a hurry.",
        "Pour le souper qui n'est pas pressé.",
        "Para la cena que no tiene prisa."
      ),
      image: IMAGES.sets.families.gourmand,
    },
    {
      key: "aromatic",
      n: "N° 04",
      family: t("Aromatic", "Aromatique", "Aromáticos"),
      season: t("Summer", "Été", "Verano"),
      notes: t(
        "Wild lavender, thyme in stone, angelica after rain.",
        "Lavande sauvage, thym dans la pierre, angélique après la pluie.",
        "Lavanda silvestre, tomillo en piedra, angélica tras la lluvia."
      ),
      whisper: t(
        "For a hillside, and for coming back from it.",
        "Pour un versant, et pour en revenir.",
        "Para una ladera, y para regresar de ella."
      ),
      image: IMAGES.sets.families.aromatic,
    },
    {
      key: "oud",
      n: "N° 05",
      family: t("Oud & Resin", "Oud & Résine", "Oud y resina"),
      season: t("Winter", "Hiver", "Invierno"),
      notes: t(
        "Aged sandalwood, quiet oud, labdanum smoothed by time.",
        "Santal âgé, oud silencieux, labdanum adouci par le temps.",
        "Sándalo envejecido, oud silencioso, ládano suavizado por el tiempo."
      ),
      whisper: t(
        "For the room that keeps its own weather.",
        "Pour la pièce qui garde sa propre météo.",
        "Para la sala que guarda tu propio clima."
      ),
      image: IMAGES.sets.families.oud,
    },
  ];

  // ── SEO / GEO ─────────────────────────────────────────────────────────
  const seoTitle = t(
    "Sets · Seasonal layering fragrance sets · Maison Allélique",
    "Sets · Coffrets de superposition saisonniers · Maison Allélique",
    "Sets · Sets de superposición de temporada · Maison Allélique"
  );
  const seoDesc = t(
    "The Sets — boxes of three fragrances, formulated to be layered over any Maison Allélique Grail. Five olfactory families — Florals, Citrus, Gourmand, Aromatic, Oud & Resin — issued seasonally. Allelium prescribes the exact formula.",
    "Les Sets — coffrets de trois parfums, formulés pour se superposer à n'importe quel Graal de Maison Allélique. Cinq familles olfactives — Florale, Hespéridée, Gourmande, Aromatique, Oud & Résine — éditées par saison. Allelium prescrit la formule exacte.",
    "Los Sets — cajas de tres perfumes, formulados para superponerse a cualquier Grial de Maison Allélique. Cinco familias olfativas — Florales, Cítricos, Gourmand, Aromáticos, Oud y Resina — editadas por temporada. Allelium prescribe la fórmula exacta."
  );
  const seoKeywords = t(
    "layering perfume set, seasonal fragrance set, niche perfume layering, Maison Allélique Sets, florals set, citrus set, gourmand set, aromatic set, oud set, layering with Allelium",
    "coffret de superposition, coffret parfum saisonnier, superposition parfum de niche, Sets Maison Allélique, coffret floral, coffret hespéridé, coffret gourmand, superposition avec Allelium",
    "set de superposición, set de perfume estacional, superposición perfume de nicho, Sets Maison Allélique, set floral, set cítrico, set gourmand, superposición con Allelium"
  );
  const jsonLd = useMemo(
    () => [
      {
        "@context": "https://schema.org",
        "@type": "ProductGroup",
        "@id": "https://maisonallelique.ai/editions/sets#group",
        "name": "The Sets — Maison Allélique",
        "description":
          "Seasonal layering fragrance sets. Each Set contains three fragrances formulated in one olfactory family, meant to be layered — never worn alone — over any Maison Allélique Grail (Alma, Vida or Sereno). Allelium, the maison's private formulation system, prescribes the exact layering formula.",
        "brand": {
          "@type": "Brand",
          "@id": "https://maisonallelique.ai/#brand",
          "name": "Maison Allélique",
          "url": "https://maisonallelique.ai",
        },
        "hasVariant": FAMILIES.map((f, i) => ({
          "@type": "Product",
          "@id": `https://maisonallelique.ai/editions/sets#${f.key}`,
          "position": i + 1,
          "name": `Set · ${f.key.charAt(0).toUpperCase() + f.key.slice(1)} — Maison Allélique`,
          "category": "Layering perfume set (3-fragrance box)",
          "brand": {
            "@type": "Brand",
            "@id": "https://maisonallelique.ai/#brand",
            "name": "Maison Allélique",
            "url": "https://maisonallelique.ai",
          },
          "image": `https://maisonallelique.ai${f.image}`,
          "description": `A three-fragrance layering set in the ${f.key} olfactive family, composed to be layered over any Maison Allélique Grail. Allelium prescribes the exact ratio for the mood, occasion and season.`,
          "offers": {
            "@type": "Offer",
            "url": "https://maisonallelique.ai/preorder",
            "availability": "https://schema.org/PreOrder",
            "priceCurrency": "EUR",
            "seller": { "@id": "https://maisonallelique.ai/#brand" },
          },
          "isRelatedTo": {
            "@type": "SoftwareApplication",
            "@id": "https://maisonallelique.ai/layering#allelium",
          },
        })),
      },
    ],
    []
  );

  return (
    <div data-testid="edition-sets-page">
      <Head title={seoTitle} description={seoDesc} keywords={seoKeywords} jsonLd={jsonLd} />

      <PageIntro
        number="N° 04"
        eyebrow={t("Editions · Sets", "Éditions · Sets", "Ediciones · Sets")}
        title={
          <>
            {t("Three fragrances.", "Trois parfums.", "Tres perfumes.")}
            <br />
            {t("One", "Une", "Una")}{" "}
            <span className="font-italic-display">
              {t("season", "saison", "temporada")}
            </span>
            .
          </>
        }
        essence={t(
          "Sets are boxes of three fragrances, formulated to be layered — never worn alone. Any Set can be layered with any Grail. Allelium prescribes the exact formula.",
          "Les Sets sont des coffrets de trois parfums, formulés pour être superposés — jamais portés seuls. N'importe quel Set peut se superposer à n'importe quel Graal. Allelium prescrit la formule exacte.",
          "Los Sets son cajas de tres perfumes, formulados para ser superpuestos — nunca llevados a solas. Cualquier Set puede superponerse a cualquier Grial. Allelium prescribe la fórmula exacta."
        )}
      />

      <BoneImage
        description="A trio of layering flacons in atelier light."
        src={IMAGES.sets.still}
        alt={IMAGES.sets.alt}
        ratio="aspect-[16/9]"
        className="max-w-[1400px] mx-auto"
      />

      <EditorialBlock eyebrow={t("The Thesis", "La Thèse", "La Tesis")}>
        <p className="font-display text-2xl md:text-3xl leading-snug max-w-3xl text-encre">
          {t(
            "Your Grail is your voice. A Set is the season on top of it.",
            "Votre Graal est votre voix. Un Set est la saison qui vient par-dessus.",
            "Tu Grial es tu voz. Un Set es la temporada que se posa encima."
          )}
        </p>
        <p className="mt-10 font-sans text-sm md:text-base text-cendre leading-relaxed max-w-xl">
          {t(
            "A Set never travels alone. It exists to layer with a Grail — Alma, Vida or Sereno — and to be prescribed by Allelium, drop by drop, for the day at hand. Sets are issued seasonally and, once retired, are not reprinted.",
            "Un Set ne voyage jamais seul. Il existe pour se superposer à un Graal — Alma, Vida ou Sereno — et pour être prescrit par Allelium, goutte à goutte, pour le jour présent. Les Sets sont édités par saison ; retirés, ils ne sont pas réédités.",
            "Un Set nunca viaja solo. Existe para superponerse a un Grial — Alma, Vida o Sereno — y para ser prescrito por Allelium, gota a gota, para el día que se vive. Los Sets se editan por temporada; retirados, no se reeditan."
          )}
        </p>
      </EditorialBlock>

      <PullQuote>
        {t(
          "Never worn alone. Never worn the same way twice.",
          "Jamais porté seul. Jamais porté deux fois de la même manière.",
          "Nunca llevado a solas. Nunca llevado dos veces de la misma forma."
        )}
      </PullQuote>

      <SectionDivider withSeal />

      <EditorialBlock eyebrow={t("The Families", "Les Familles", "Las Familias")} wide>
        <p className="font-display italic text-xl md:text-2xl text-cendre max-w-2xl leading-snug mb-16">
          {t(
            "Five olfactory families. One at a time. Each issued for its season.",
            "Cinq familles olfactives. Une à la fois. Chacune éditée pour sa saison.",
            "Cinco familias olfativas. Una a la vez. Cada una editada para tu temporada."
          )}
        </p>
        <ul className="flex flex-col divide-y divide-encre/10 border-t border-encre/10 border-b">
          {FAMILIES.map((f, i) => (
            <li
              key={f.key}
              data-testid={`sets-family-${f.key}`}
              className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              <div className="md:col-span-2">
                <TrackedCaps>{f.n}</TrackedCaps>
                <p className="mt-3 font-sans text-[10px] tracking-[0.28em] uppercase text-cendre">
                  {f.season}
                </p>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-4xl md:text-5xl text-encre leading-none">
                  <span className="font-italic-display">{f.family}</span>
                </h3>
                <p className="mt-4 tracked text-cendre">
                  {t("Three fragrances", "Trois parfums", "Tres perfumes")}
                </p>
              </div>
              <div className="md:col-span-3 aspect-[3/4] overflow-hidden">
                <img
                  src={f.image}
                  alt={`Set — ${f.family}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ filter: "saturate(1.12) contrast(1.04) brightness(1.0)" }}
                />
              </div>
              <div className="md:col-span-3 space-y-4">
                <p className="font-display italic text-lg text-encre leading-snug">
                  {f.notes}
                </p>
                <p className="font-sans text-sm text-cendre leading-relaxed">
                  {f.whisper}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-10 font-sans text-xs text-cendre max-w-md leading-relaxed">
          {t(
            "The families rotate. The current season is written in the register.",
            "Les familles tournent. La saison en cours est inscrite au registre.",
            "Las familias rotan. La temporada actual se inscribe en el registro."
          )}
        </p>
      </EditorialBlock>

      <SectionDivider />

      <EditorialBlock eyebrow={t("The Ritual", "Le Rituel", "El Ritual")}>
        <div className="space-y-10 max-w-3xl">
          <p className="font-display text-2xl md:text-3xl leading-snug text-encre">
            {t(
              "Grail first. Then the Set. Allelium in between.",
              "Le Graal d'abord. Puis le Set. Allelium entre les deux.",
              "El Grial primero. Después el Set. Allelium en medio."
            )}
          </p>
          <p className="font-sans text-sm md:text-base text-cendre leading-relaxed max-w-xl">
            {t(
              "You wear your Grail as you always do. You tell Allelium which Set you have. Allelium prescribes: which of its three fragrances to open, how many drops, and where on the skin to set them down — over the Grail already there. The composition is finished when the model says nothing more.",
              "Vous portez votre Graal comme d'habitude. Vous dites à Allelium quel Set vous avez. Allelium prescrit : lequel de ses trois parfums ouvrir, combien de gouttes, et où sur la peau les déposer — par-dessus le Graal déjà là. La composition est finie quand le modèle ne dit plus rien.",
              "Llevas tu Grial como siempre. Le indicas a Allelium qué Set posees. Allelium prescribe: cuál de sus tres perfumes abrir, cuántas gotas y dónde depositarlas en la piel — sobre el Grial que ya está allí. La composición termina cuando el modelo no dice nada más."
            )}
          </p>
        </div>
      </EditorialBlock>

      <EditorialBlock eyebrow={t("Waiting list", "Liste d'attente", "Lista de espera")}>
        <div className="flex flex-col gap-6 max-w-2xl">
          <p className="font-display text-2xl md:text-3xl leading-snug text-encre">
            {t(
              "Sets are reserved separately from the Grail.",
              "Les Sets se réservent séparément du Graal.",
              "Los Sets se reservan por separado del Grial."
            )}
          </p>
          <p className="font-sans text-sm text-cendre max-w-md leading-relaxed">
            {t(
              "A Grail is a one-time introduction to the maison. A Set is a seasonal companion. You may keep one Grail for a decade and still refresh your signature every quarter with a new Set.",
              "Un Graal est une introduction unique à la maison. Un Set est un compagnon de saison. Vous pouvez garder un Graal pendant dix ans et renouveler tout de même votre signature à chaque trimestre avec un nouveau Set.",
              "Un Grial es una presentación única a la maison. Un Set es un compañero de temporada. Puedes conservar un Grial durante una década y aun así renovar tu firma cada trimestre con un nuevo Set."
            )}
          </p>
          <div className="pt-4">
            <QuietLink to="/preorder" accent data-testid="sets-access-cta">
              {t("Join the waiting list — Grail & first Set", "Rejoindre la liste d'attente — Graal & premier Set", "Unirse a la lista de espera — Grial y primer Set")} →
            </QuietLink>
          </div>
        </div>
      </EditorialBlock>

      <EditorialBlock eyebrow={t("Doorways", "Seuils", "Umbrales")}>
        <div className="flex flex-col gap-6">
          <QuietLink to="/editions/parfum" data-testid="sets-parfum-link">
            {t("Meet the Grails first", "Rencontrer d'abord les Graals", "Conocer primero los Griales")}
          </QuietLink>
          <QuietLink to="/layering" data-testid="sets-layering-link">
            {t("Understand Allelium", "Comprendre Allelium", "Entender Allelium")}
          </QuietLink>
        </div>
      </EditorialBlock>
    </div>
  );
};

export default EditionSets;
