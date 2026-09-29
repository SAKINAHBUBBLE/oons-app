import type { ReactNode } from "react";
import type { PackIconKindV2 } from "@/data/packs-v2";

interface PackIconV2Props {
  kind: PackIconKindV2;
  accent: string;
  accentStrong: string;
  size?: number;
}

function EntreNous({ accent, accentStrong }: { accent: string; accentStrong: string }) {
  return (
    <>
      <path
        d="M20 34 C20 24 29 16 42 16 C55 16 64 24 64 34 C64 44 55 52 42 52 C38 52 34.5 51.3 31.5 50 L22 54 L25 45 C21.8 41.7 20 38 20 34 Z"
        fill={accent}
      />
      <path
        d="M80 52 C80 43.5 72.5 36.5 62 36.5 C51.5 36.5 44 43.5 44 52 C44 60.5 51.5 67.5 62 67.5 C65.2 67.5 68.2 66.9 70.8 65.8 L78.5 69.5 L76 62 C78.7 59.2 80 55.8 80 52 Z"
        fill={accentStrong}
      />
    </>
  );
}

function EnFamille({ accent, accentStrong }: { accent: string; accentStrong: string }) {
  return (
    <>
      <path d="M50 18 L82 42 L82 82 L18 82 L18 42 Z" fill={accent} />
      <circle cx="50" cy="48" r="6.5" fill={accentStrong} />
      <path d="M40 82 C40 71.5 44.5 66 50 66 C55.5 66 60 71.5 60 82 Z" fill={accentStrong} />
      <circle cx="30" cy="56" r="5.5" fill={accentStrong} />
      <path d="M21.5 82 C21.5 73 25.5 68.5 30 68.5 C34.5 68.5 38.5 73 38.5 82 Z" fill={accentStrong} />
      <circle cx="70" cy="56" r="5.5" fill={accentStrong} />
      <path d="M61.5 82 C61.5 73 65.5 68.5 70 68.5 C74.5 68.5 78.5 73 78.5 82 Z" fill={accentStrong} />
    </>
  );
}

function EnCouple({ accent, accentStrong }: { accent: string; accentStrong: string }) {
  return (
    <>
      <path
        d="M40 20 C24 22 16 36 20 52 C23 64 32 74 44 78 C36 68 32 56 36 44 C39 34 46 26 40 20 Z"
        fill={accent}
      />
      <path
        d="M60 20 C76 22 84 36 80 52 C77 64 68 74 56 78 C64 68 68 56 64 44 C61 34 54 26 60 20 Z"
        fill={accentStrong}
      />
    </>
  );
}

function Solo({ accent }: { accent: string; accentStrong: string }) {
  return (
    <>
      <circle cx="50" cy="30" r="11" fill={accent} />
      <path
        d="M50 46 C64 46 74 58 74 76 C74 79 71.5 81 68.5 81 L31.5 81 C28.5 81 26 79 26 76 C26 58 36 46 50 46 Z"
        fill={accent}
      />
    </>
  );
}

function PreMariage({ accent, accentStrong }: { accent: string; accentStrong: string }) {
  return (
    <>
      <path
        d="M32 82 C22 82 18 74 18 62 C18 44 24 26 34 18 C36.5 30 34 42 38 52 C41 60 44 68 40 82 Z"
        fill={accent}
      />
      <path
        d="M68 82 C78 82 82 74 82 62 C82 44 76 26 66 18 C63.5 30 66 42 62 52 C59 60 56 68 60 82 Z"
        fill={accentStrong}
      />
      <circle cx="50" cy="26" r="5" fill={accentStrong} />
    </>
  );
}

const ICONS: Record<
  PackIconKindV2,
  (props: { accent: string; accentStrong: string }) => ReactNode
> = {
  "entre-nous": EntreNous,
  "en-famille": EnFamille,
  "en-couple": EnCouple,
  solo: Solo,
  "pre-mariage": PreMariage,
};

export function PackIconV2({ kind, accent, accentStrong, size = 52 }: PackIconV2Props) {
  const IconShape = ICONS[kind];
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <IconShape accent={accent} accentStrong={accentStrong} />
    </svg>
  );
}
