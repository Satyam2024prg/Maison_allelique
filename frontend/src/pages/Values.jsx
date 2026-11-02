import React from "react";
import { PageIntro, EditorialBlock, SectionDivider } from "@/components/Editorial";
import { TrackedCaps } from "@/components/TrackedCaps";
import { QuietLink } from "@/components/QuietLink";
import { Head } from "@/components/Head";
import { useT } from "@/i18n/LocaleContext";

const Values = () => {
  const t = useT();

  const VALUES = [
    {
      n: "N° 01",
      title: t("Singularity", "Singularité", "Singularidad"),
      line: t(
        "One signature per biology. Composed once. Not repeated.",
        "Une signature par biologie. Composée une seule fois. Jamais reproduite.",
        "Una firma por biología. Compuesta una sola vez. Jamás reproducida."
      ),
    },
    {
      n: "N° 02",
      title: t("Provenance", "Provenance", "Procedencia"),
      line: t(
        "Every ingredient named. Every hand named. Every step dated.",
        "Chaque ingrédient nommé. Chaque main nommée. Chaque étape datée.",
        "Cada ingrediente nombrado. Cada mano nombrada. Cada paso fechado."
      ),
    },
    {
      n: "N° 03",
      title: t("Bio-responsive", "Bio-responsive", "Bio-responsive"),
      line: t(
        "The formula listens. It adjusts to the person, not the trend.",
        "La formule écoute. Elle s'ajuste à la personne, non à la mode.",
        "La fórmula escucha. Se ajusta a la persona, no a la moda."
      ),
    },
    {
      n: "N° 04",
      title: t("Silence", "Silence", "Silencio"),
      line: t(
        "The object should speak. The maison keeps its voice low.",
        "L'objet doit parler. La maison garde la voix basse.",
        "El objeto debe hablar. La maison mantiene la voz baja."
      ),
    },
  ];

  const TRAITS = [
    {
      n: "N° 01",
      title: t("Ritualistic", "Ritualiste", "Ritualista"),
      line: t(
        "We arrive to the object. We do not consume it.",
        "Nous venons à l'objet. Nous ne le consommons pas.",
        "Venimos al objeto. No lo consumimos."
      ),
    },
    {
      n: "N° 02",
      title: t("Precise", "Précise", "Precisa"),
      line: t(
        "One word. One line. One measure. No more.",
        "Un mot. Une ligne. Une mesure. Pas davantage.",
        "Una palabra. Una línea. Una medida. Nada más."
      ),
    },
    {
      n: "N° 03",
      title: t("Unhurried", "Sans hâte", "Sin prisa"),
      line: t(
        "We reply personally, in our own time.",
        "Nous répondons personnellement, à notre rythme.",
        "Respondemos personalmente, a nuestro propio ritmo."
      ),
    },
    {
      n: "N° 04",
      title: t("Intimate", "Intime", "Íntima"),
      line: t(
        "The register is small on purpose.",
        "Le registre est petit à dessein.",
        "El registro es pequeño a propósito."
      ),
    },
  ];

  return (
    <div data-testid="values-page">
      <Head
        title={t("Values & Personality", "Valeurs & Personnalité", "Valores y Carácter")}
        description={t(
          "Four values — Singularity, Provenance, Bio-responsive, Silence. A manifesto, not a feature list.",
          "Quatre valeurs — Singularité, Provenance, Bio-responsive, Silence. Un manifeste, non une liste de fonctions.",
          "Cuatro valores — Singularidad, Procedencia, Bio-responsive, Silencio. Un manifiesto, no una lista de funciones."
        )}
      />
      <PageIntro
        number="N° 02"
        eyebrow={t("Values & Personality", "Valeurs & Personnalité", "Valores y Carácter")}
        title={
          <>
            {t("Four values.", "Quatre valeurs.", "Cuatro valores.")}
            <br />
            {t("Four", "Quatre", "Cuatro")}{" "}
            <span className="font-italic-display">
              {t("temperaments", "tempéraments", "temperamentos")}
            </span>
            .
          </>
        }
        essence={t(
          "A manifesto, not a feature list.",
          "Un manifeste, non une liste de fonctions.",
          "Un manifiesto, no una lista de funciones."
        )}
      />

      <EditorialBlock eyebrow={t("Values", "Valeurs", "Valores")} wide>
        <ul className="flex flex-col divide-y divide-encre/10">
          {VALUES.map((v, i) => (
            <li
              key={v.title}
              data-testid={`value-${i + 1}`}
              className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-6"
            >
              <div className="md:col-span-2">
                <TrackedCaps>{v.n}</TrackedCaps>
              </div>
              <div className="md:col-span-6">
                <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1] text-encre">
                  {v.title}
                </h2>
              </div>
              <div className="md:col-span-4">
                <p className="font-display italic text-lg md:text-xl text-encre max-w-md leading-snug">
                  {v.line}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </EditorialBlock>

      <SectionDivider withSeal />

      <EditorialBlock eyebrow={t("Personality", "Personnalité", "Carácter")} wide>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {TRAITS.map((tt, i) => (
            <li key={tt.title} data-testid={`trait-${i + 1}`} className="flex flex-col gap-4">
              <TrackedCaps>{tt.n}</TrackedCaps>
              <h3 className="font-display text-3xl md:text-5xl leading-[1] text-encre">
                {tt.title}
              </h3>
              <p className="font-sans text-sm text-cendre max-w-xs leading-relaxed">
                {tt.line}
              </p>
            </li>
          ))}
        </ul>
      </EditorialBlock>

      <EditorialBlock eyebrow={t("Doorway", "Seuil", "Umbral")}>
        <QuietLink to="/maison" data-testid="values-maison-link">
          {t("Return to the maison", "Retour à la maison", "Volver a la maison")}
        </QuietLink>
      </EditorialBlock>
    </div>
  );
};

export default Values;
