/**
 * Large, elegant line icons — drawn on a 48px grid with hairline strokes
 * so they read as engraved marks rather than UI glyphs.
 */

type IconProps = { className?: string };

const shared = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Influence — concentric rings radiating from a centre of gravity. */
export function InfluenceIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className} aria-hidden>
      <circle cx="24" cy="24" r="3.5" />
      <circle cx="24" cy="24" r="10" opacity="0.62" />
      <circle cx="24" cy="24" r="17" opacity="0.34" />
      <path d="M24 7V2M24 46v-5M7 24H2M46 24h-5" opacity="0.5" />
    </svg>
  );
}

/** Audacity — an ascending vector breaking through a horizon. */
export function AudacityIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className} aria-hidden>
      <path d="M4 38h40" opacity="0.34" />
      <path d="M9 33L21 21l7 7L41 9" />
      <path d="M32 9h9v9" />
      <path d="M9 44h14" opacity="0.34" />
    </svg>
  );
}

/** Legacy — a column standing on a foundation, weight carried through time. */
export function LegacyIcon({ className }: IconProps) {
  return (
    <svg {...shared} className={className} aria-hidden>
      <path d="M6 16L24 6l18 10" />
      <path d="M8 41h32" />
      <path d="M4 45h40" opacity="0.34" />
      <path d="M14 21v20M24 21v20M34 21v20" opacity="0.72" />
      <path d="M8 21h32" opacity="0.5" />
    </svg>
  );
}
