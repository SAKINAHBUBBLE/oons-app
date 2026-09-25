import type { ReactNode } from "react";
import type { EntreNousCategoryId } from "@/data/entre-nous-questions";

interface CategoryIconProps {
  kind: EntreNousCategoryId;
  accent: string;
  accentStrong: string;
  size?: number;
}

function Profond({ accent, accentStrong }: { accent: string; accentStrong: string }) {
  return (
    <>
      <circle cx="40" cy="52" r="26" fill={accentStrong} opacity="0.65" />
      <circle cx="60" cy="52" r="26" fill={accent} opacity="0.65" />
      <circle cx="50" cy="36" r="16" fill={accentStrong} opacity="0.5" />
    </>
  );
}

function Doux({ accent, accentStrong }: { accent: string; accentStrong: string }) {
  return (
    <>
      <path
        d="M50 24 C68 24 76 40 68 56 C60 72 40 74 32 60 C24 46 32 24 50 24 Z"
        fill={accent}
        opacity="0.85"
      />
      <path
        d="M64 32 C72 32 76 40 72 46 C68 52 58 50 56 44 C54 38 58 32 64 32 Z"
        fill={accentStrong}
        opacity="0.6"
      />
      <circle cx="76" cy="30" r="4" fill={accentStrong} opacity="0.7" />
    </>
  );
}

function Defi({ accent, accentStrong }: { accent: string; accentStrong: string }) {
  return (
    <>
      <path d="M20 74 L42 34 L58 62 L48 62 L42 50 L32 74 Z" fill={accentStrong} opacity="0.55" />
      <path d="M34 74 L58 30 L82 74 Z" fill={accent} opacity="0.85" />
      <path d="M58 30 L70 52 L58 52 Z" fill={accentStrong} opacity="0.4" />
      <path d="M58 30 L58 16" stroke={accentStrong} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M58 16 L68 20 L58 24 Z" fill={accentStrong} />
    </>
  );
}

function Spirituel({ accent, accentStrong }: { accent: string; accentStrong: string }) {
  const leaves = [
    { rotate: -18, color: accentStrong },
    { rotate: 0, color: accent },
    { rotate: 18, color: accentStrong },
  ];
  return (
    <>
      {leaves.map((leaf, index) => (
        <ellipse
          key={index}
          cx="50"
          cy="46"
          rx="13"
          ry="26"
          fill={leaf.color}
          opacity="0.7"
          transform={`rotate(${leaf.rotate} 50 68)`}
        />
      ))}
      <circle cx="72" cy="34" r="3.5" fill={accentStrong} opacity="0.6" />
    </>
  );
}

function Decale({ accent, accentStrong }: { accent: string; accentStrong: string }) {
  return (
    <>
      <path
        d="M50 22 C68 22 80 33 80 47 C80 61 68 71 50 71 C46 71 42.5 70.5 39.5 69.5 L28 78 L31 64 C24 58.5 20 53.5 20 47 C20 33 32 22 50 22 Z"
        fill={accent}
      />
      <path d="M38 44 C38 41 40.5 39 43 40 C45 41 45 46 42 47 C39.5 47.5 38 46 38 44 Z" fill={accentStrong} />
      <path d="M58 44 C58 41 60.5 39 63 40 C65 41 65 46 62 47 C59.5 47.5 58 46 58 44 Z" fill={accentStrong} />
      <path
        d="M40 54 C44 60 56 60 60 54"
        fill="none"
        stroke={accentStrong}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="34" cy="52" r="4" fill={accentStrong} opacity="0.35" />
      <circle cx="66" cy="52" r="4" fill={accentStrong} opacity="0.35" />
    </>
  );
}

const ICONS: Record<
  EntreNousCategoryId,
  (props: { accent: string; accentStrong: string }) => ReactNode
> = {
  profond: Profond,
  doux: Doux,
  defi: Defi,
  decale: Decale,
  spirituel: Spirituel,
};

export function CategoryIcon({ kind, accent, accentStrong, size = 56 }: CategoryIconProps) {
  const IconShape = ICONS[kind];
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <IconShape accent={accent} accentStrong={accentStrong} />
    </svg>
  );
}
