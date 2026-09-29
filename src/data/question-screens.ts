import type { EntreNousCategoryId } from "./entre-nous-questions";

export interface QuestionScreenConfig {
  id: EntreNousCategoryId;
  title: string;
  color: string;
  baselineLines: string[];
  auraBg: string;
  iconAccent: string;
  iconAccentStrong: string;
}

// Un écran par catégorie de question, tous construits sur le même template
// QuestionScreen : seuls la couleur de catégorie, le pictogramme (via
// CategoryIcon, partagé avec la Roue), le titre, la baseline et la question
// changent d'une catégorie à l'autre — même architecture stricte partout.
export const QUESTION_SCREENS: Record<EntreNousCategoryId, QuestionScreenConfig> = {
  defi: {
    id: "defi",
    title: "Défi",
    color: "var(--color-v2-wheel-defi-text)",
    baselineLines: ["UNE PETITE ACTION", "POUR AVANCER"],
    auraBg: "var(--color-v2-wheel-defi-bg)",
    iconAccent: "var(--color-v2-icon-defi-a)",
    iconAccentStrong: "var(--color-v2-icon-defi-b)",
  },
  doux: {
    id: "doux",
    title: "Douceur",
    color: "var(--color-v2-wheel-douceur-text)",
    // Baseline raccourcie (annotation Asma) : on retire "pour moi".
    baselineLines: ["UNE PAUSE BIENVEILLANTE"],
    auraBg: "var(--color-v2-wheel-douceur-bg)",
    iconAccent: "var(--color-v2-icon-douceur-a)",
    iconAccentStrong: "var(--color-v2-icon-douceur-b)",
  },
  profond: {
    id: "profond",
    title: "Profond",
    color: "var(--color-v2-wheel-profond-text)",
    baselineLines: ["DES QUESTIONS POUR", "ALLER PLUS LOIN"],
    auraBg: "var(--color-v2-wheel-profond-bg)",
    iconAccent: "var(--color-v2-icon-profond-a)",
    iconAccentStrong: "var(--color-v2-icon-profond-b)",
  },
  spirituel: {
    id: "spirituel",
    title: "Spirituel",
    color: "var(--color-v2-wheel-spirituel-text)",
    baselineLines: ["DES QUESTIONS POUR", "NOURRIR MON ÂME"],
    auraBg: "var(--color-v2-wheel-spirituel-bg)",
    iconAccent: "var(--color-v2-icon-spirituel)",
    iconAccentStrong: "var(--color-v2-icon-spirituel)",
  },
  decale: {
    id: "decale",
    title: "Décalé",
    color: "var(--color-v2-wheel-decale-text)",
    baselineLines: ["DES QUESTIONS POUR", "RIRE UN PEU"],
    auraBg: "var(--color-v2-wheel-decale-bg)",
    iconAccent: "var(--color-v2-icon-decale-a)",
    iconAccentStrong: "var(--color-v2-icon-decale-b)",
  },
};
