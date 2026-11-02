import React from "react";
import { Link } from "react-router-dom";
import { Head } from "@/components/Head";
import { TrackedCaps } from "@/components/TrackedCaps";
import { SectionDivider } from "@/components/Editorial";

/**
 * ArticleLayout — a shared editorial layout for /journal/* pages.
 * Injects Article + BreadcrumbList JSON-LD, canonical, OG, keywords.
 *
 * Props:
 *  - slug (string)
 *  - title (string, plain — no JSX)
 *  - eyebrow (string)
 *  - deck (string)   ← short lede paragraph directly under H1
 *  - datePublished (ISO date)
 *  - keywords (string, comma-separated)
 *  - description (string, meta description)
 *  - metaKeywords (string)
 *  - children (article body)
 */
export const ArticleLayout = ({
  slug,
  title,
  eyebrow,
  deck,
  datePublished,
  description,
  keywords,
  children,
}) => {
  const url = `https://maisonallelique.ai/journal/${slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title,
    description,
    keywords,
    inLanguage: "en",
    datePublished,
    dateModified: datePublished,
    author: {
      "@type": "Organization",
      name: "Maison Allélique",
      url: "https://maisonallelique.ai",
    },
    publisher: {
      "@type": "Organization",
      name: "Maison Allélique",
      url: "https://maisonallelique.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://maisonallelique.ai/logo.svg",
      },
    },
    mainEntityOfPage: url,
    isPartOf: { "@id": "https://maisonallelique.ai/journal#page" },
  };

  return (
    <article data-testid={`article-${slug}`}>
      <Head
        title={`${title} — Journal`}
        description={description}
        keywords={keywords}
        jsonLd={articleSchema}
      />

      <header className="px-6 md:px-12 pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-8 flex items-center gap-6 flex-wrap">
            <Link
              to="/journal"
              className="font-sans text-[10px] tracking-[0.32em] uppercase text-cendre hover:text-encre transition-colors"
              data-testid={`article-${slug}-journal-back`}
            >
              ← Journal
            </Link>
            <TrackedCaps>{eyebrow}</TrackedCaps>
            <span className="font-sans text-[10px] tracking-[0.32em] uppercase text-cendre">
              {new Date(datePublished).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <h1 className="font-italic-display text-4xl md:text-5xl lg:text-6xl text-encre leading-[1.02]">
            {title}
          </h1>
          {deck ? (
            <p className="mt-8 font-display text-lg md:text-2xl text-cendre leading-snug max-w-3xl">
              {deck}
            </p>
          ) : null}
        </div>
      </header>

      <SectionDivider />

      {/* Body */}
      <div
        className="px-6 md:px-12 py-12 md:py-16 [&_h2]:font-italic-display [&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:text-encre [&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:leading-tight [&_p]:font-display [&_p]:text-lg [&_p]:text-encre [&_p]:leading-relaxed [&_p]:mb-6 [&_p]:max-w-[68ch] [&_ul]:font-display [&_ul]:text-lg [&_ul]:text-encre [&_ul]:leading-relaxed [&_ul]:mb-6 [&_ul]:pl-6 [&_ul]:max-w-[68ch] [&_li]:list-disc [&_li]:mb-2 [&_a]:text-sang [&_a]:underline [&_a]:decoration-sang/40 hover:[&_a]:decoration-sang [&_blockquote]:font-italic-display [&_blockquote]:text-xl md:[&_blockquote]:text-2xl [&_blockquote]:text-encre [&_blockquote]:leading-snug [&_blockquote]:border-l-2 [&_blockquote]:border-encre [&_blockquote]:pl-6 [&_blockquote]:my-10 [&_blockquote]:max-w-[60ch]"
      >
        <div className="mx-auto max-w-[900px]">{children}</div>
      </div>

      <SectionDivider withSeal />

      {/* CTA + internal links */}
      <section className="px-6 md:px-12 py-16 md:py-24 bg-encre text-os">
        <div className="mx-auto max-w-[900px]">
          <h2 className="font-italic-display text-3xl md:text-4xl text-os leading-tight max-w-[22ch]">
            Begin with the formula that belongs to who you are today.
          </h2>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            <Link
              to="/allelium"
              className="font-sans text-[11px] tracking-[0.32em] uppercase text-os border-b border-os pb-1 hover:opacity-70"
              data-testid={`article-${slug}-link-allelium`}
            >
              Discover Allelium →
            </Link>
            <Link
              to="/personalized-skincare"
              className="font-sans text-[11px] tracking-[0.32em] uppercase text-os border-b border-os pb-1 hover:opacity-70"
              data-testid={`article-${slug}-link-skincare`}
            >
              Personalized skincare →
            </Link>
            <Link
              to="/personalized-fragrance"
              className="font-sans text-[11px] tracking-[0.32em] uppercase text-os border-b border-os pb-1 hover:opacity-70"
              data-testid={`article-${slug}-link-fragrance`}
            >
              Personalized fragrance →
            </Link>
          </div>
          <div className="mt-10">
            <Link
              to="/preorder"
              data-testid={`article-${slug}-cta-access`}
              className="inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.32em] uppercase px-8 py-4 border text-os border-os hover:bg-os hover:text-encre transition-all duration-500"
            >
              Request Private Access →
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
};

export default ArticleLayout;
