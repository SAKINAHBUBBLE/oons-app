export type PackStatus = "active" | "coming-soon";

export interface Pack {
  id: string;
  name: string;
  icon: string | null;
  status: PackStatus;
  href: string;
}

// Source unique des packs affichés sur l'écran de sélection.
// Ajouter un pack = ajouter une ligne ici, aucun autre fichier à toucher.
export const PACKS: Pack[] = [
  {
    id: "entre-nous",
    name: "Entre Nous",
    icon: "/icons/categories/profonde.png",
    status: "active",
    href: "/connexion",
  },
  { id: "en-famille", name: "En Famille", icon: null, status: "coming-soon", href: "" },
  { id: "en-couple", name: "En Couple", icon: null, status: "coming-soon", href: "" },
  { id: "pre-mariage", name: "Pré-Mariage", icon: null, status: "coming-soon", href: "" },
  { id: "solo", name: "Solo", icon: null, status: "coming-soon", href: "" },
];
