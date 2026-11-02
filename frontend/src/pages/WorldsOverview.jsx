import React from "react";
import { Link } from "react-router-dom";
import { PageIntro, EditorialBlock } from "@/components/Editorial";
import { TrackedCaps } from "@/components/TrackedCaps";
import { Head } from "@/components/Head";
import IMAGES from "@/data/images";

const WORLDS = [
  {
    key: "host",
    n: "N° 01",
    title: "The Host",
    essence: "The pour is short. A quarter cup means stay.",
    to: "/worlds/host",
    image: IMAGES.host.hero,
    alt: IMAGES.host.hero_alt,
    focus: "Ritual · Generosity · Presence",
  },
  {
    key: "master",
    n: "N° 02",
    title: "The Master",
    essence: "The form is not designed. It is grown.",
    to: "/worlds/master",
    image: IMAGES.master.hero,
    alt: IMAGES.master.hero_alt,
    focus: "Material · Mastery · Impermanence",
  },
  {
    key: "observer",
    n: "N° 03",
    title: "The Observer",
    essence: "Nature creates. We recognise.",
    to: "/worlds/observer",
    image: IMAGES.observer.hero,
    alt: IMAGES.observer.hero_alt,
    focus: "Restraint · Recognition · Silence",
  },
];

const WorldsOverview = () => {
  return (
    <div data-testid="worlds-page">
      <Head
        title="The Three Worlds"
        description="One house, three lenses. The Host, The Master, The Observer."
      />
      <PageIntro
        number="N° 03"
        eyebrow="The Three Worlds"
        title={
          <>
            One house.
            <br />
            Three <span className="font-italic-display">lenses</span>.
          </>
        }
        essence="A single grammar spoken in three temperaments — the Gulf host, the Japanese master, the Chinese observer."
      />

      <section className="w-full">
        {WORLDS.map((w, i) => (
          <Link
            key={w.key}
            to={w.to}
            data-testid={`world-panel-${w.key}`}
            className="group relative block w-full h-[85vh] md:h-[90vh] overflow-hidden"
          >
            <img
              src={w.image}
              alt={w.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1600 ease-out group-hover:scale-[1.02]"
              style={{
                filter: "saturate(1.15) contrast(1.05) brightness(1.0)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(244,241,234,0) 35%, rgba(244,241,234,0.75) 100%)",
              }}
            />
            <div className="relative z-10 h-full w-full px-6 md:px-12 py-14 md:py-20 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <TrackedCaps tone="ink">{w.n}</TrackedCaps>
                <TrackedCaps>{w.focus}</TrackedCaps>
              </div>
              <div>
                <h2 className="font-display text-5xl sm:text-7xl md:text-8xl text-encre leading-[0.95]">
                  {w.title}
                </h2>
                <p className="mt-6 md:mt-8 font-display italic text-lg md:text-2xl text-encre max-w-2xl">
                  {w.essence}
                </p>
                <span className="mt-10 inline-block font-sans text-[10px] tracking-[0.32em] uppercase text-encre border-b border-transparent group-hover:border-encre transition-colors duration-700 pb-1">
                  Enter →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <EditorialBlock eyebrow="A note">
        <p className="font-display italic text-xl md:text-2xl text-encre max-w-2xl leading-snug">
          The worlds share one bone, one ink. Only the light changes.
        </p>
      </EditorialBlock>
    </div>
  );
};

export default WorldsOverview;
