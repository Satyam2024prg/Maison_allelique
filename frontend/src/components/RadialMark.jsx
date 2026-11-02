import React from "react";

/**
 * Maison Allélique — the official living-system mark.
 *
 * Hand-drawn quality: a wobbly double oval (not a geometric circle), eight
 * rays emanating from a bold central node at slightly irregular angles and
 * lengths, terminated by small nodes of varying size. Reads as a biological
 * diagram — mycelium node, synaptic cluster — never a corporate icon.
 *
 * Coordinate space: 0..100. All rays originate exactly from the centre so
 * they still feel "sent from one source" — the irregularity lives in the
 * angle/length/dot-size, not in the origin.
 *
 * The two ring paths are drawn as bezier ellipses with intentional offsets
 * so the outline reads as sketched by a hand, not plotted by a machine.
 */

// Ray descriptor: angle in degrees (0 = straight up, clockwise), radial length,
// and the terminal-dot radius. Tuned to match the reference sketch.
const RAYS = [
  { deg:   0, len: 27.5, dot: 2.2 }, // top — longest, prominent
  { deg:  46, len: 17.5, dot: 1.9 }, // upper-right
  { deg:  95, len: 22.0, dot: 2.1 }, // right (below 3 o'clock slightly)
  { deg: 138, len: 21.0, dot: 2.1 }, // lower-right
  { deg: 178, len: 20.5, dot: 1.7 }, // bottom
  { deg: 216, len: 15.5, dot: 1.9 }, // lower-left
  { deg: 262, len: 22.0, dot: 2.0 }, // left
  { deg: 312, len: 17.5, dot: 1.9 }, // upper-left
];

const toXY = (cx, cy, deg, len) => {
  // 0° = up. Convert to standard math angle: -90° from screen X-axis.
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + len * Math.cos(rad), y: cy + len * Math.sin(rad) };
};

export const RadialMark = ({
  size = 28,
  stroke = "currentColor",
  animate = false,
  className = "",
  ...rest
}) => {
  const cx = 50;
  const cy = 51;      // pushed 1 unit down — the outer ring hugs the top less
  const centralNode = 2.6;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`${animate ? "radial-breath" : ""} ${className}`}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      <g
        fill="none"
        stroke={stroke}
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Outer oval — hand-drawn wobble. Slightly taller than wide, tilted
            a fraction of a degree, with bezier control points offset so the
            perimeter never lands exactly where a compass would put it. */}
        <path
          d="
            M 50 8.5
            C 74.5 8.5, 91.0 25.5, 91.5 50.5
            C 92.0 74.0, 74.5 92.0, 50.5 92.5
            C 26.5 92.8, 9.5 75.0, 9.0 51.0
            C 8.8 26.5, 25.5 8.8, 50 8.5
            Z
          "
        />
        {/* Inner oval — tilted the other way, slightly smaller, offset from
            the outer so the two lines never sit at a uniform distance. */}
        <path
          d="
            M 50 12.5
            C 71.5 12.8, 87.5 27.0, 88.0 50.5
            C 88.5 72.5, 72.0 88.5, 50.5 88.8
            C 29.0 89.0, 13.5 74.0, 13.0 51.5
            C 12.7 28.0, 28.5 12.5, 50 12.5
            Z
          "
        />

        {/* Rays — each line originates at the centre and terminates just short
            of the inner oval. Angle + length are hand-tuned per ray. */}
        {RAYS.map((r, i) => {
          const end = toXY(cx, cy, r.deg, r.len);
          return (
            <g key={i}>
              <line
                x1={cx}
                y1={cy}
                x2={end.x}
                y2={end.y}
                strokeWidth="0.85"
              />
              <circle
                cx={end.x}
                cy={end.y}
                r={r.dot}
                fill={stroke}
                stroke="none"
              />
            </g>
          );
        })}

        {/* Central node — bold, the source. */}
        <circle
          cx={cx}
          cy={cy}
          r={centralNode}
          fill={stroke}
          stroke="none"
        />
      </g>
    </svg>
  );
};

export default RadialMark;
