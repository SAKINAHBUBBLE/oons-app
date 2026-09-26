import type { ReactNode } from "react";
import type { PackIconKind } from "@/data/packs";

interface PackIconProps {
  kind: PackIconKind;
  accent: string;
  accentStrong: string;
  halo: string;
  size?: number;
}

function CoeurFeuilles({ accent }: { accent: string; accentStrong: string }) {
  return (
    <path
      d="M50 80 C26 62 22 42 36 33 C44 28 50 34 50 39 C50 34 56 28 64 33 C78 42 74 62 50 80 Z"
      fill={accent}
    />
  );
}

function Branche({ accent, accentStrong }: { accent: string; accentStrong: string }) {
  const leaves = [
    { x: 50, y: 30, rx: 8, ry: 16, rotate: 0, color: accentStrong },
    { x: 34, y: 40, rx: 8, ry: 15, rotate: -35, color: accent },
    { x: 66, y: 40, rx: 8, ry: 15, rotate: 35, color: accent },
    { x: 24, y: 55, rx: 7, ry: 13, rotate: -55, color: accentStrong },
    { x: 76, y: 55, rx: 7, ry: 13, rotate: 55, color: accentStrong },
  ];
  return (
    <>
      <path
        d="M50 82 C50 65 50 45 50 26"
        fill="none"
        stroke="var(--color-petrol-strong)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {leaves.map((leaf, index) => (
        <ellipse
          key={index}
          cx={leaf.x}
          cy={leaf.y}
          rx={leaf.rx}
          ry={leaf.ry}
          fill={leaf.color}
          transform={`rotate(${leaf.rotate} ${leaf.x} ${leaf.y})`}
        />
      ))}
    </>
  );
}

function LuneEtoiles({ accent }: { accent: string; accentStrong: string }) {
  return (
    <>
      <path
        d="M66 22 C44 24 28 40 28 60 C28 80 44 96 65 98 C48 90 37 76 37 58 C37 40 48 26 66 22 Z"
        fill={accent}
      />
      <path d="M78 32 L82 40 L90 44 L82 48 L78 56 L74 48 L66 44 L74 40 Z" fill={accent} opacity="0.85" />
      <path d="M84 58 L86 63 L91 65 L86 67 L84 72 L82 67 L77 65 L82 63 Z" fill={accent} opacity="0.7" />
    </>
  );
}

function Soleil({ accent }: { accent: string; accentStrong: string }) {
  const rays = Array.from({ length: 8 }, (_, index) => index * 45);
  return (
    <>
      {rays.map((angle, index) => (
        <rect
          key={angle}
          x="47"
          y="10"
          width="6"
          height={index % 2 === 0 ? 14 : 10}
          rx="3"
          fill={accent}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="17" fill={accent} />
    </>
  );
}

function Lotus({ accent, accentStrong }: { accent: string; accentStrong: string }) {
  const petals = [
    { rotate: 0, color: accentStrong },
    { rotate: -22, color: accent },
    { rotate: 22, color: accent },
    { rotate: -44, color: accentStrong },
    { rotate: 44, color: accentStrong },
  ];
  return (
    <>
      {petals.map((petal, index) => (
        <path
          key={index}
          d="M50 78 C46 55 46 34 50 20 C54 34 54 55 50 78 Z"
          fill={petal.color}
          transform={`rotate(${petal.rotate} 50 78)`}
        />
      ))}
    </>
  );
}

const ICONS: Record<
  PackIconKind,
  (props: { accent: string; accentStrong: string }) => ReactNode
> = {
  "coeur-feuilles": CoeurFeuilles,
  branche: Branche,
  "lune-etoiles": LuneEtoiles,
  soleil: Soleil,
  lotus: Lotus,
};

export function PackIcon({ kind, accent, accentStrong, halo, size = 64 }: PackIconProps) {
  const IconShape = ICONS[kind];
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <circle cx="50" cy="52" r="38" fill={halo} opacity="0.55" />
      <IconShape accent={accent} accentStrong={accentStrong} />
    </svg>
  );
}
