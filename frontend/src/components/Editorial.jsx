import React from "react";
import { TrackedCaps } from "./TrackedCaps";

/**
 * Shared editorial primitives — vast negative space, one idea per screen.
 */

export const PageIntro = ({ eyebrow, title, essence, number }) => (
  <section
    className="min-h-[85vh] w-full flex items-end px-6 md:px-12 pb-16 md:pb-24 pt-24 md:pt-32"
    data-testid="page-intro"
  >
    <div className="mx-auto max-w-[1600px] w-full grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-3 flex flex-col gap-4">
        {number && <TrackedCaps>{number}</TrackedCaps>}
        {eyebrow && <TrackedCaps tone="ink">{eyebrow}</TrackedCaps>}
      </div>
      <div className="md:col-span-9">
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] text-encre max-w-[16ch]">
          {title}
        </h1>
        {essence && (
          <p className="mt-10 md:mt-16 font-display italic text-xl md:text-2xl text-encre max-w-2xl leading-snug">
            {essence}
          </p>
        )}
      </div>
    </div>
  </section>
);

export const EditorialBlock = ({
  children,
  eyebrow,
  className = "",
  wide = false,
}) => (
  <section
    className={`px-6 md:px-12 py-24 md:py-36 ${className}`}
    data-testid="editorial-block"
  >
    <div
      className={`mx-auto ${
        wide ? "max-w-[1600px]" : "max-w-[1200px]"
      } grid grid-cols-1 md:grid-cols-12 gap-8`}
    >
      {eyebrow && (
        <div className="md:col-span-3">
          <TrackedCaps>{eyebrow}</TrackedCaps>
        </div>
      )}
      <div className={eyebrow ? "md:col-span-9" : "md:col-span-12"}>
        {children}
      </div>
    </div>
  </section>
);

export const PullQuote = ({ children, source }) => (
  <blockquote className="my-24 md:my-32 max-w-4xl mx-auto text-center px-6">
    <p className="font-display italic text-2xl md:text-4xl leading-snug text-encre">
      &ldquo;{children}&rdquo;
    </p>
    {source && (
      <cite className="mt-6 block font-sans text-[10px] tracking-[0.32em] uppercase text-cendre not-italic">
        {source}
      </cite>
    )}
  </blockquote>
);

export const BoneImage = ({ description, src, alt, className = "", ratio = "aspect-[4/5]" }) => {
  if (src) {
    return (
      <figure className={`${ratio} w-full overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt || description}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ filter: "saturate(1.12) contrast(1.04)" }}
        />
      </figure>
    );
  }
  return (
    <figure
      className={`bone-placeholder ${ratio} w-full flex items-end p-6 md:p-8 ${className}`}
      role="img"
      aria-label={description}
    >
      <figcaption className="tracked">[Image · {description}]</figcaption>
    </figure>
  );
};

export const SectionDivider = ({ withSeal = false }) => (
  <div className="w-full py-20 md:py-28 flex items-center justify-center">
    {withSeal ? (
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--sang)" }}
        data-testid="sang-seal"
      />
    ) : (
      <span className="hairline-vertical" />
    )}
  </div>
);
