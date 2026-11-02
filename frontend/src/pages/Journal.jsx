import React from "react";
import { Link } from "react-router-dom";
import { Head } from "@/components/Head";
import { TrackedCaps } from "@/components/TrackedCaps";
import { SectionDivider } from "@/components/Editorial";
import { ARTICLES } from "@/data/articles";

const Journal = () => {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://maisonallelique.ai/journal#page",
    name: "Maison Allélique — Journal",
    description:
      "Editorial notes on personal formulation, personalized skincare and fragrance, Parisian apothecary, and the language of a life that changes.",
    url: "https://maisonallelique.ai/journal",
    publisher: {
      "@type": "Organization",
      "@id": "https://maisonallelique.ai/#brand",
      name: "Maison Allélique",
    },
    blogPost: ARTICLES.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.excerpt,
      datePublished: a.date,
      url: `https://maisonallelique.ai/journal/${a.slug}`,
    })),
  };

  return (
    <div data-testid="journal-page">
      <Head
        title="Journal — Editorial notes on personal formulation, skincare and fragrance"
        description="Editorial notes from Maison Allélique on personal formulation, personalized skincare, personalized fragrance, the Parisian apothecary, and the beauty of a life that changes."
        keywords="Maison Allélique journal, personal formulation blog, personalized skincare articles, personalized fragrance articles, luxury beauty editorial, Parisian apothecary journal"
        jsonLd={blogSchema}
      />

      <header className="px-6 md:px-12 pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-3">
            <TrackedCaps>Journal</TrackedCaps>
          </div>
          <div className="md:col-span-9">
            <h1 className="font-italic-display text-4xl md:text-6xl lg:text-7xl text-encre leading-[0.98] max-w-[22ch]">
              Editorial notes from the Maison.
            </h1>
            <p className="mt-10 font-display text-lg md:text-xl text-cendre leading-snug max-w-2xl">
              On personal formulation, personalized skincare and fragrance, the Parisian apothecary,
              and the beauty of a life that changes.
            </p>
          </div>
        </div>
      </header>

      <SectionDivider />

      <section className="px-6 md:px-12 py-12 md:py-20">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
          {ARTICLES.map((a, i) => (
            <Link
              to={`/journal/${a.slug}`}
              key={a.slug}
              data-testid={`journal-card-${a.slug}`}
              className="group block border-t border-encre/15 pt-8 hover:border-encre transition-colors duration-500"
            >
              <div className="flex items-center gap-4 text-cendre">
                <span className="font-sans text-[10px] tracking-[0.4em] uppercase">
                  N° {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-[10px] tracking-[0.32em] uppercase">
                  {new Date(a.date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h2 className="mt-5 font-italic-display text-2xl md:text-3xl text-encre leading-tight group-hover:text-sang transition-colors duration-500">
                {a.title}
              </h2>
              <p className="mt-4 font-sans text-sm text-cendre leading-relaxed max-w-[46ch]">
                {a.excerpt}
              </p>
              <span className="mt-5 inline-block font-sans text-[10px] tracking-[0.32em] uppercase text-encre border-b border-encre pb-0.5">
                Read →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Journal;
