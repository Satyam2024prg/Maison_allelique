import React from "react";
import {
  PageIntro,
  EditorialBlock,
  PullQuote,
  SectionDivider,
} from "@/components/Editorial";
import { TrackedCaps } from "@/components/TrackedCaps";
import { QuietLink } from "@/components/QuietLink";
import { Head } from "@/components/Head";
import { useT } from "@/i18n/LocaleContext";
import IMAGES from "@/data/images";

const EditionSkincare = () => {
  const t = useT();

  const RITUAL = [
    {
      n: "N° 01",
      label: t("The pour", "La verse", "El vertido"),
      line: t(
        "A small measure into the palm. It should not run.",
        "Une petite mesure au creux de la main. Elle ne doit pas couler.",
        "Una pequeña medida en el hueco de la mano. No debe correr."
      ),
    },
    {
      n: "N° 02",
      label: t("The pause", "La pause", "La pausa"),
      line: t(
        "A held breath. Sixty slow seconds.",
        "Un souffle retenu. Soixante secondes lentes.",
        "Un aliento contenido. Sesenta segundos lentos."
      ),
    },
    {
      n: "N° 03",
      label: t("The listen", "L'écoute", "La escucha"),
      line: t(
        "The formula reads the skin. It does not command it.",
        "La formule lit la peau. Elle ne la commande pas.",
        "La fórmula lee la piel. No la manda."
      ),
    },
    {
      n: "N° 04",
      label: t("The set-down", "Le dépôt", "El reposo"),
      line: t(
        "The vessel returns to its plinth. Silence.",
        "L'objet retourne à son socle. Silence.",
        "El recipiente vuelve a su pedestal. Silencio."
      ),
    },
  ];

  return (
    <div data-testid="edition-skincare-page">
      <Head
        title={t(
          "Skincare · Personalized Formulas by Maison Allélique",
          "Soin · Formules personnalisées par Maison Allélique",
          "Cuidado · Fórmulas personalizadas por Maison Allélique"
        )}
        description={t(
          "Bio-responsive skincare formulas by Maison Allélique. Blended at home under Allelium's prescription according to your skin metrics, hydration, sensitivity, rhythm, and season.",
          "Formules de soin bio-responsive de Maison Allélique. Composées chez vous sous la prescription d'Allelium selon vos indicateurs cutanés, hydratation, sensibilité, rythme et saison.",
          "Fórmulas de cuidado bio-responsive de Maison Allélique. Compuestas en casa bajo la prescripción de Allelium según tus métricas de piel, hidratación, sensibilidad, ritmo y estación."
        )}
        keywords={t(
          "personalized skincare Paris, bio-responsive skincare, Maison Allélique skincare, Allelium skincare, personalized skincare formula, custom skincare routine, luxury personalized skincare",
          "soin personnalisé Paris, soin bio-responsive, soin Maison Allélique, soin Allelium, formule de soin personnalisée, routine de soin sur mesure, soin de luxe personnalisé",
          "cuidado personalizado París, cuidado bio-responsive, cuidado Maison Allélique, cuidado Allelium, fórmula de cuidado personalizada, rutina de cuidado a medida, cuidado de lujo personalizado"
        )}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            "@id": "https://maisonallelique.ai/editions/skincare#collection",
            "name": "Maison Allélique — Personalized Skincare Formulas",
            "category": "Personalized skincare / bio-responsive skincare",
            "brand": {
              "@type": "Brand",
              "@id": "https://maisonallelique.ai/#brand",
              "name": "Maison Allélique",
              "url": "https://maisonallelique.ai",
            },
            "image": "https://maisonallelique.ai/brief/skincare-portrait.jpg",
            "description":
              "Bio-responsive skincare formulas from Maison Allélique. Each ritual is composed at home under Allelium's prescription, adapted to your skin metrics, season, sensitivity, hydration, and rhythm. Not a fixed routine — a formula that evolves with you.",
            "isRelatedTo": {
              "@type": "SoftwareApplication",
              "@id": "https://maisonallelique.ai/layering#allelium",
            },
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
        number="N° 02"
        eyebrow={t("Editions · Skincare", "Éditions · Soin", "Ediciones · Cuidado")}
        title={
          <>
            {t("A formula", "Une formule", "Una fórmula")}
            <br />
            {t("that", "qui", "que")}{" "}
            <span className="font-italic-display">
              {t("listens", "écoute", "escucha")}
            </span>
            .
          </>
        }
        essence={t(
          "Bio-responsive skincare. Named, sourced, certified. It arrives to the skin, not to the market.",
          "Un soin bio-responsive. Nommé, sourcé, certifié. Il vient à la peau, non au marché.",
          "Un cuidado bio-responsive. Nombrado, procedente, certificado. Llega a la piel, no al mercado."
        )}
      />

      <figure className="max-w-[1400px] mx-auto aspect-[16/9] w-full overflow-hidden">
        <img
          src={IMAGES.skincare.still}
          alt={IMAGES.skincare.alt}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ filter: "saturate(0.88) contrast(1.02) brightness(1.0)" }}
        />
      </figure>

      <EditorialBlock eyebrow={t("Method", "Méthode", "Método")}>
        <p className="font-display text-2xl md:text-3xl leading-snug max-w-3xl text-encre">
          {t(
            "A formula is bio-responsive when it agrees to be corrected by the skin it meets. Ours is trained on",
            "Une formule est bio-responsive lorsqu'elle accepte d'être corrigée par la peau qu'elle rencontre. La nôtre est entraînée à la",
            "Una fórmula es bio-responsive cuando acepta ser corregida por la piel que encuentra. La nuestra está entrenada en el"
          )}{" "}
          <span className="font-italic-display">
            {t("recognition", "reconnaissance", "reconocimiento")}
          </span>
          , {t("not conquest.", "non à la conquête.", "no en la conquista.")}
        </p>
      </EditorialBlock>

      <PullQuote>
        {t(
          "The luxury is the attention you feel without seeing the effort behind it.",
          "Le luxe est l'attention que l'on ressent sans voir l'effort qui la porte.",
          "El lujo es la atención que se siente sin ver el esfuerzo que la sostiene."
        )}
      </PullQuote>

      <EditorialBlock eyebrow={t("Ritual", "Rituel", "Ritual")} wide>
        <ol className="flex flex-col divide-y divide-encre/10">
          {RITUAL.map((r, i) => (
            <li
              key={r.n}
              data-testid={`skincare-step-${i + 1}`}
              className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline"
            >
              <div className="md:col-span-2">
                <TrackedCaps>{r.n}</TrackedCaps>
              </div>
              <div className="md:col-span-3">
                <h3 className="font-display text-3xl md:text-4xl text-encre leading-none">
                  {r.label}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="font-display italic text-lg md:text-xl text-encre max-w-md">
                  {r.line}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </EditorialBlock>

      <SectionDivider />

      <EditorialBlock eyebrow={t("Provenance in one line", "La provenance en une ligne", "La procedencia en una línea")}>
        <p className="font-display text-2xl md:text-3xl leading-snug max-w-3xl text-encre">
          {t(
            "Every ingredient is named. Every hand is named. Every step is dated.",
            "Chaque ingrédient est nommé. Chaque main est nommée. Chaque étape est datée.",
            "Cada ingrediente está nombrado. Cada mano está nombrada. Cada paso está fechado."
          )}
        </p>
        <div className="mt-10">
          <QuietLink to="/layering" data-testid="skincare-layering-link">
            {t("Compose your own — the private model", "Composer le vôtre — le modèle privé", "Componer el suyo — el modelo privado")}
          </QuietLink>
        </div>
      </EditorialBlock>

      <EditorialBlock eyebrow={t("Doorway", "Seuil", "Umbral")}>
        <QuietLink to="/preorder" accent data-testid="skincare-access-link">
          {t("Join the waiting list", "Rejoindre la liste d'attente", "Unirse a la lista de espera")}
        </QuietLink>
      </EditorialBlock>
    </div>
  );
};

export default EditionSkincare;
