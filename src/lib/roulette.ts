import {
  ENTRE_NOUS_CATEGORIES,
  ENTRE_NOUS_QUESTIONS,
  type EntreNousCategoryId,
} from "@/data/entre-nous-questions";

export function pickRandomCategory(): EntreNousCategoryId {
  const index = Math.floor(Math.random() * ENTRE_NOUS_CATEGORIES.length);
  return ENTRE_NOUS_CATEGORIES[index].id;
}

export function pickRandomQuestion(category: EntreNousCategoryId): string {
  const questions = ENTRE_NOUS_QUESTIONS[category];
  const index = Math.floor(Math.random() * questions.length);
  return questions[index];
}
