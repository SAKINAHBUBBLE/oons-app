import type { ReactNode } from "react";
import type { EntreNousCategoryId } from "@/data/entre-nous-questions";

interface CategoryIconProps {
  kind: EntreNousCategoryId;
  accent: string;
  accentStrong: string;
  size?: number;
}

const HEART_PATH =
  "M50 88 C8 60 8 24 34 14 C44 10 50 20 50 20 C50 20 56 10 66 14 C92 24 92 60 50 88 Z";

// Profond : deux cœurs superposés, semi-transparents.
function Profond({ accent, accentStrong }: { accent: string; accentStrong: string }) {
  return (
    <>
      <path d={HEART_PATH} fill={accent} opacity="0.8" transform="translate(18.9,22.5) scale(0.55)" />
      <path d={HEART_PATH} fill={accentStrong} opacity="0.85" transform="translate(26.1,22.5) scale(0.55)" />
    </>
  );
}

// Douceur : petit fruit rond type abricot avec une feuille.
function Douceur({ accent, accentStrong }: { accent: string; accentStrong: string }) {
  return (
    <>
      <circle cx="45" cy="55" r="22" fill={accent} opacity="0.9" />
      <circle cx="62" cy="52" r="20" fill={accentStrong} opacity="0.5" />
      <path d="M53 30 L53 21" stroke={accentStrong} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M53 24 C53 18 60 15 66 17 C62 22 58 26 55 30 Z" fill={accentStrong} opacity="0.85" />
    </>
  );
}

// Défi : montagnes géométriques superposées et translucides, petit drapeau.
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

// Spirituel : croissant de lune seul, sans étoile (grand cercle + cercle
// "mordant" de la couleur de fond du segment pour créer le croissant).
function Spirituel({ accent }: { accent: string; accentStrong: string }) {
  return (
    <>
      <circle cx="50" cy="50" r="24" fill={accent} opacity="0.92" />
      <circle cx="61" cy="42" r="19" fill="var(--color-v2-wheel-spirituel-bg)" />
    </>
  );
}

// Décalé : deux ballons superposés, avec transparence.
function Decale({ accent, accentStrong }: { accent: string; accentStrong: string }) {
  return (
    <>
      <path d="M42 66 C40 74 46 80 50 84" fill="none" stroke={accentStrong} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M60 64 C62 72 56 80 50 84" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <ellipse cx="41" cy="42" rx="17" ry="20" fill={accent} opacity="0.8" transform="rotate(-8 41 42)" />
      <path d="M41 60 L37 66 L45 66 Z" fill={accent} opacity="0.8" />
      <ellipse cx="60" cy="40" rx="17" ry="20" fill={accentStrong} opacity="0.85" transform="rotate(8 60 40)" />
      <path d="M60 58 L56 64 L64 64 Z" fill={accentStrong} opacity="0.85" />
    </>
  );
}

const ICONS: Record<
  EntreNousCategoryId,
  (props: { accent: string; accentStrong: string }) => ReactNode
> = {
  profond: Profond,
  doux: Douceur,
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
