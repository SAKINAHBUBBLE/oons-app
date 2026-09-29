export type PackStatusV2 = "active" | "coming-soon";
export type PackIconKindV2 = "entre-nous" | "en-famille" | "en-couple" | "solo" | "pre-mariage";

export interface PackColorsV2 {
  cardBg: string;
  title: string;
  iconAccent: string;
  iconAccentStrong: string;
}

export interface PackV2 {
  id: string;
  name: string;
  subtitle: string;
  status: PackStatusV2;
  href: string;
  icon: PackIconKindV2;
  colors: PackColorsV2;
  featured?: boolean;
}

// Source unique des packs affichés sur l'écran de sélection V2 ("On commence par quoi ?").
// Seul "Entre Nous" est actif ; tous les autres affichent toujours "Bientôt disponible".
export const PACKS_V2: PackV2[] = [
  {
    id: "entre-nous",
    name: "Entre Nous",
    subtitle: "Des conversations qui font du bien.",
    status: "active",
    // /packs n'est désormais accessible qu'aux utilisateurs connectés (voir
    // src/app/packs/page.tsx) : "Commencer" mène donc directement à la roue.
    href: "/app",
    icon: "entre-nous",
    colors: {
      cardBg: "var(--color-v2-pack-rose-bg)",
      title: "var(--color-v2-navy)",
      iconAccent: "var(--color-v2-coral)",
      iconAccentStrong: "var(--color-v2-coral-strong)",
    },
  },
  {
    id: "en-famille",
    name: "En Famille",
    subtitle: "Des moments pour se retrouver.",
    status: "coming-soon",
    href: "",
    icon: "en-famille",
    colors: {
      cardBg: "var(--color-v2-pack-green-bg)",
      title: "var(--color-v2-navy)",
      iconAccent: "var(--color-v2-pack-green-text)",
      iconAccentStrong: "var(--color-v2-navy)",
    },
  },
  {
    id: "en-couple",
    name: "En Couple",
    subtitle: "Grandir ensemble au quotidien.",
    status: "coming-soon",
    href: "",
    icon: "en-couple",
    colors: {
      cardBg: "var(--color-v2-pack-violet-bg)",
      title: "var(--color-v2-navy)",
      iconAccent: "var(--color-v2-icon-decale-a)",
      iconAccentStrong: "var(--color-v2-icon-decale-b)",
    },
  },
  {
    id: "solo",
    name: "Solo",
    subtitle: "Prendre soin de soi pas à pas.",
    status: "coming-soon",
    href: "",
    icon: "solo",
    colors: {
      cardBg: "var(--color-v2-pack-yellow-bg)",
      title: "var(--color-v2-navy)",
      iconAccent: "var(--color-v2-card-yellow-text)",
      iconAccentStrong: "var(--color-v2-card-yellow-text)",
    },
  },
  {
    id: "pre-mariage",
    name: "Pré-mariage",
    subtitle: "Se préparer sereinement à cette belle étape.",
    status: "coming-soon",
    href: "",
    icon: "pre-mariage",
    featured: true,
    colors: {
      cardBg: "var(--color-v2-pack-blue-bg)",
      title: "var(--color-v2-navy)",
      iconAccent: "var(--color-v2-wheel-defi-text)",
      iconAccentStrong: "var(--color-v2-navy)",
    },
  },
];
