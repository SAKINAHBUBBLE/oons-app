export type PackStatus = "active" | "coming-soon";
export type PackIconKind = "coeur-feuilles" | "branche" | "lune-etoiles" | "soleil" | "lotus";

export interface PackColors {
  cardBg: string;
  cardBorder?: string;
  title: string;
  iconAccent: string;
  iconAccentStrong: string;
  halo: string;
}

export interface Pack {
  id: string;
  name: string;
  subtitle: string;
  status: PackStatus;
  href: string;
  icon: PackIconKind;
  colors: PackColors;
  featured?: boolean;
}

// Source unique des packs affichés sur l'écran de sélection.
// Ajouter un pack = ajouter une ligne ici, aucun autre fichier à toucher.
export const PACKS: Pack[] = [
  {
    id: "entre-nous",
    name: "Entre Nous",
    subtitle: "Des conversations qui font du bien.",
    status: "active",
    href: "/connexion",
    icon: "coeur-feuilles",
    colors: {
      cardBg: "var(--color-pack-rose-clair)",
      cardBorder: "var(--color-accent-coral)",
      title: "var(--color-pack-raspberry-strong)",
      iconAccent: "var(--color-raspberry)",
      iconAccentStrong: "var(--color-pack-raspberry-strong)",
      halo: "var(--color-accent-pink)",
    },
  },
  {
    id: "en-famille",
    name: "En Famille",
    subtitle: "Des moments pour se retrouver.",
    status: "coming-soon",
    href: "",
    icon: "branche",
    colors: {
      cardBg: "var(--color-pack-mint)",
      title: "var(--color-pack-sage-dark)",
      iconAccent: "var(--color-pack-sage)",
      iconAccentStrong: "var(--color-pack-sage-dark)",
      halo: "var(--color-blob-sage)",
    },
  },
  {
    id: "en-couple",
    name: "En Couple",
    subtitle: "Grandir ensemble au quotidien.",
    status: "coming-soon",
    href: "",
    icon: "lune-etoiles",
    colors: {
      cardBg: "var(--color-pack-lavande)",
      title: "var(--color-pack-violet-dark)",
      iconAccent: "var(--color-pack-violet)",
      iconAccentStrong: "var(--color-pack-violet-dark)",
      halo: "var(--color-blob-lavender)",
    },
  },
  {
    id: "solo",
    name: "Solo",
    subtitle: "Prendre soin de soi pas à pas.",
    status: "coming-soon",
    href: "",
    icon: "soleil",
    colors: {
      cardBg: "var(--color-pack-yellow-cream)",
      title: "var(--color-pack-orange-dark)",
      iconAccent: "var(--color-pack-orange)",
      iconAccentStrong: "var(--color-pack-orange-dark)",
      halo: "var(--color-blob-yellow)",
    },
  },
  {
    id: "pre-mariage",
    name: "Pré-mariage",
    subtitle: "Se préparer sereinement à cette belle étape.",
    status: "coming-soon",
    href: "",
    icon: "lotus",
    featured: true,
    colors: {
      cardBg: "var(--color-pack-blue-lilas)",
      title: "var(--color-pack-blue-dark)",
      iconAccent: "var(--color-pack-pervenche)",
      iconAccentStrong: "var(--color-pack-blue-dark)",
      halo: "var(--color-pack-blue-lilas)",
    },
  },
];
