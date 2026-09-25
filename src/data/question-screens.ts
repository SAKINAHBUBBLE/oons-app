import type { EntreNousCategoryId } from "./entre-nous-questions";

export type QuestionIllustrationKind = "defi" | "doux" | "profond" | "spirituel" | "decale";

export interface QuestionScreenPalette {
  blobs: [string, string, string, string];
  branch: string;
  accent: [string, string];
}

export interface QuestionScreenConfig {
  id: EntreNousCategoryId;
  title: string;
  titleColor: string;
  subtitleLines: [string, string];
  subtitleColor: string;
  illustration: QuestionIllustrationKind;
  palette: QuestionScreenPalette;
  sparse?: boolean;
}

// Un écran par catégorie de question, tous construits sur le même template
// QuestionScreen : seuls la palette, l'illustration, le titre, le sous-titre
// et les accents décoratifs changent d'une catégorie à l'autre.
export const QUESTION_SCREENS: Record<EntreNousCategoryId, QuestionScreenConfig> = {
  defi: {
    id: "defi",
    title: "Défi",
    titleColor: "#1873be",
    subtitleLines: ["UNE PETITE ACTION", "POUR AVANCER"],
    subtitleColor: "#3e8fcc",
    illustration: "defi",
    palette: {
      blobs: ["#e4f1fc", "#c5dcf5", "#c5dcf5", "#e4f1fc"],
      branch: "#07536a",
      accent: ["#6dafea", "#f5b84e"],
    },
  },
  doux: {
    id: "doux",
    title: "Doux",
    titleColor: "#d6536d",
    subtitleLines: ["UNE PAUSE BIENVEILLANTE", "POUR MOI"],
    subtitleColor: "#e56e82",
    illustration: "doux",
    palette: {
      blobs: ["#f7c5c1", "#f9e5ad", "#f8d6b3", "#f9dfc4"],
      branch: "#173b3b",
      accent: ["#ed6f70", "#bfd5c6"],
    },
  },
  profond: {
    id: "profond",
    title: "Profond",
    titleColor: "#65528f",
    subtitleLines: ["DES QUESTIONS POUR", "ALLER PLUS LOIN"],
    subtitleColor: "#8b74af",
    illustration: "profond",
    palette: {
      blobs: ["#eae2f5", "#d8c9eb", "#b39acf", "#eae2f5"],
      branch: "#07536a",
      accent: ["#7764a6", "#f5be62"],
    },
  },
  spirituel: {
    id: "spirituel",
    title: "Spirituel",
    titleColor: "#187354",
    subtitleLines: ["DES QUESTIONS POUR", "NOURRIR MON ÂME"],
    subtitleColor: "#6d9b7d",
    illustration: "spirituel",
    sparse: true,
    palette: {
      blobs: ["#d8ead7", "#a8cbaa", "#d8ead7", "#a8cbaa"],
      branch: "#187354",
      accent: ["#73a982", "#f6be63"],
    },
  },
  decale: {
    id: "decale",
    title: "Décalé",
    titleColor: "#67509f",
    subtitleLines: ["DES QUESTIONS POUR", "VOIR LA VIE AUTREMENT"],
    subtitleColor: "#8a70c4",
    illustration: "decale",
    palette: {
      blobs: ["#eee5f7", "#d9c8ee", "#b59bdd", "#eee5f7"],
      branch: "#67509f",
      accent: ["#f7be63", "#f08aa4"],
    },
  },
};
