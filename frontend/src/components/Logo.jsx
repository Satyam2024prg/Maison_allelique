import React from "react";
import { RadialMark } from "./RadialMark";

/**
 * Maison Allélique — official brand lockup.
 *
 * Composition (per the Visual Strategy brief, p.12):
 *   • "Maison"       — small serif roman, above the baseline of "Allélique"
 *   • "Allélique"    — larger, italic display serif, dominant
 *   • ÉDITIONS VIVANTES — tiny sans caps subtitle, wide tracking
 *   • Radial starburst mark to the left (double concentric rings, central dot,
 *     eight rays with terminal nodes) — from ./RadialMark
 *
 * Variants:
 *   • horizontal (default) — mark + stacked wordmark side-by-side. Header use.
 *   • stacked              — mark centred above wordmark. Access / Appointment.
 *   • wordmark             — text only, no mark. Print / small header on mobile.
 *   • mark                 — mark only. Favicon-scale.
 *
 * Colour: inherits `currentColor` (default `text-encre`); wrap in `text-os` for
 * a reversed lockup on dark surfaces.
 */
/**
 * Internal — renders just the stacked wordmark (no radial). Defined at module
 * scope so React doesn't remount it on every parent render.
 */
const Wordmark = ({ scale, showSubtitle }) => (
  <span className="inline-flex flex-col leading-[1] text-current select-none">
    <span
      className={`font-sans ${scale.maison} tracking-[0.34em] uppercase text-current/95`}
    >
      Maison
    </span>
    <span
      className={`font-display italic ${scale.allelique} leading-[0.95] mt-0.5 -ml-[0.05em]`}
    >
      Allélique
    </span>
    {showSubtitle && (
      <span
        className={`font-sans ${scale.subtitle} tracking-[0.42em] uppercase text-cendre mt-1.5`}
      >
        Éditions Vivantes
      </span>
    )}
  </span>
);

export const Logo = ({
  variant = "horizontal",
  showSubtitle = true,
  size = "md", // "sm" | "md" | "lg" — governs both mark diameter and text size
  animate = false,
  className = "",
  testid = "brand-logo",
}) => {
  const scale = {
    sm: { mark: 20, maison: "text-[9px]", allelique: "text-[15px]", subtitle: "text-[7px]", gap: "gap-2.5" },
    md: { mark: 30, maison: "text-[11px]", allelique: "text-[20px]", subtitle: "text-[8px]", gap: "gap-3.5" },
    lg: { mark: 44, maison: "text-[14px]", allelique: "text-[30px]", subtitle: "text-[10px]", gap: "gap-5" },
  }[size];

  if (variant === "mark") {
    return (
      <RadialMark
        size={scale.mark}
        animate={animate}
        className={className}
        data-testid={testid}
      />
    );
  }

  if (variant === "wordmark") {
    return (
      <span className={`inline-flex ${className}`} data-testid={testid}>
        <Wordmark scale={scale} showSubtitle={showSubtitle} />
      </span>
    );
  }

  if (variant === "stacked") {
    return (
      <span
        className={`inline-flex flex-col items-center ${scale.gap} ${className}`}
        data-testid={testid}
      >
        <RadialMark size={scale.mark} animate={animate} />
        <Wordmark scale={scale} showSubtitle={showSubtitle} />
      </span>
    );
  }

  // horizontal (default)
  return (
    <span
      className={`inline-flex items-center ${scale.gap} ${className}`}
      data-testid={testid}
    >
      <RadialMark size={scale.mark} animate={animate} />
      <Wordmark scale={scale} showSubtitle={showSubtitle} />
    </span>
  );
};

export default Logo;
