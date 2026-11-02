import React from "react";
import { Link } from "react-router-dom";
import { PageIntro, EditorialBlock, SectionDivider } from "@/components/Editorial";
import { TrackedCaps } from "@/components/TrackedCaps";
import { QuietLink } from "@/components/QuietLink";
import { Head } from "@/components/Head";
import { useT } from "@/i18n/LocaleContext";
import IMAGES from "@/data/images";

const EditionsOverview = () => {
  const t = useT();
  const FORMS = [
    {
      key: "parfum",
      n: "N° 01",
      title: t("Parfum", "Parfum", "Perfume"),
      line: t(
        "The three Grails — Alma, Vida, Sereno. Worn alone as your voice.",
        "Les trois Graals — Alma, Vida, Sereno. Portés seuls, comme votre voix.",
        "Los tres Griales — Alma, Vida, Sereno. Llevados a solas, como tu voz."
      ),
      to: "/editions/parfum",
      image: IMAGES.parfum.still,
      alt: IMAGES.parfum.alt,
    },
    {
      key: "sets",
      n: "N° 02",
      title: t("Sets", "Sets", "Sets"),
      line: t(
        "Three fragrances, one season. Formulated to layer over any Grail.",
        "Trois parfums, une saison. Formulés pour se superposer à n'importe quel Graal.",
        "Tres perfumes, una temporada. Formulados para superponerse a cualquier Grial."
      ),
      to: "/editions/sets",
      image: IMAGES.sets.still,
      alt: IMAGES.sets.alt,
    },
    {
      key: "skincare",
      n: "N° 03",
      title: t("Skincare", "Soin", "Cuidado"),
      line: t(
        "Bio-responsive. It listens to the skin it is given.",
        "Bio-responsif. Il écoute la peau qui lui est donnée.",
        "Bio-responsive. Escucha la piel que se le entrega."
      ),
      to: "/editions/skincare",
      image: IMAGES.skincare.still,
      alt: IMAGES.skincare.alt,
    },
    {
      key: "ecosystem",
      n: "N° 04",
      title: t("Objects", "Objets", "Objetos"),
      line: t(
        "Art pieces — the house of our Grails, where the ceremony happens.",
        "Pièces d'art — l'écrin de nos Graals, là où la cérémonie a lieu.",
        "Piezas de arte — la casa de nuestros Griales, donde sucede la ceremonia."
      ),
      to: "/editions/ecosystem",
      image: IMAGES.ecosystem.still,
      alt: IMAGES.ecosystem.alt,
    },
  ];
  return (
    <div data-testid="editions-page">
      <Head
        title={t("Editions", "Éditions", "Ediciones")}
        description={t(
          "One collection in four forms. Parfum · Sets · Skincare · Objects. Numbered, named, never repeated.",
          "Une collection en quatre formes. Parfum · Sets · Soin · Objets. Numérotée, nommée, jamais répétée.",
          "Una colección en cuatro formas. Perfume · Sets · Cuidado · Objetos. Numerada, nombrada, jamás repetida."
        )}
      />
      <PageIntro
        number="N° 04"
        eyebrow="Editions"
        title={
          <>
            One collection
            <br />
            in four <span className="font-italic-display">forms</span>.
          </>
        }
        essence="Éditions Vivantes. Numbered, named, never repeated."
      />

      <EditorialBlock eyebrow="A note">
        <p className="font-display italic text-xl md:text-2xl text-encre max-w-2xl leading-snug">
          There are no prices here. There is a register, and an invitation.
        </p>
      </EditorialBlock>

      <section
        className="w-full"
        aria-label="Three forms of the collection"
        data-testid="editions-three-forms"
      >
        {FORMS.map((f, i) => (
          <Link
            key={f.key}
            to={f.to}
            data-testid={`edition-panel-${f.key}`}
            className="group block w-full border-t border-encre/10 last:border-b hover:bg-encre/[0.015] transition-colors duration-700"
          >
            <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-14 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-2">
                <TrackedCaps>{f.n}</TrackedCaps>
              </div>
              <div className="md:col-span-5">
                <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-encre leading-[1] group-hover:opacity-80 transition-opacity duration-700">
                  {f.title}
                </h2>
                <p className="mt-4 font-display italic text-lg text-cendre max-w-md">
                  {f.line}
                </p>
              </div>
              <div className="md:col-span-4">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={f.image}
                    alt={f.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1600 ease-out group-hover:scale-[1.02]"
                    style={{ filter: "saturate(1.15) contrast(1.05) brightness(1.0)" }}
                  />
                </div>
              </div>
              <div className="md:col-span-1 flex md:justify-end">
                <span className="font-sans text-[10px] tracking-[0.32em] uppercase text-encre border-b border-transparent group-hover:border-encre transition-colors duration-700 pb-1">
                  Enter →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <SectionDivider withSeal />

      <EditorialBlock eyebrow="Doorways">
        <div className="flex flex-col gap-6">
          <QuietLink to="/preorder" accent data-testid="editions-access-link">
            Join the waiting list
          </QuietLink>
        </div>
      </EditorialBlock>
    </div>
  );
};

export default EditionsOverview;
