import {
  ENTRE_NOUS_CATEGORIES,
  ENTRE_NOUS_QUESTIONS,
  type EntreNousCategoryId,
} from "@/data/entre-nous-questions";

export function pickRandomCategory(): EntreNousCategoryId {
  const index = Math.floor(Math.random() * ENTRE_NOUS_CATEGORIES.length);
  return ENTRE_NOUS_CATEGORIES[index].id;
}

const SEEN_STORAGE_PREFIX = "entre-nous-seen-";
const LAST_STORAGE_PREFIX = "entre-nous-last-";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage indisponible (navigation privée, quota...) : on continue sans persister.
  }
}

// Tire une question jamais vue dans cette catégorie depuis le dernier cycle complet
// (une fois toutes épuisées, le cycle recommence) et ne rejoue jamais la question
// affichée juste avant, même à la jonction entre deux cycles.
export function pickRandomQuestion(category: EntreNousCategoryId): string {
  const questions = ENTRE_NOUS_QUESTIONS[category];
  const seenKey = SEEN_STORAGE_PREFIX + category;
  const lastKey = LAST_STORAGE_PREFIX + category;

  let seen = new Set(readJson<number[]>(seenKey, []));
  const lastIndex = readJson<number | null>(lastKey, null);

  if (seen.size >= questions.length) {
    seen = new Set();
  }

  let available = questions.map((_, index) => index).filter((index) => !seen.has(index));
  if (available.length > 1 && lastIndex !== null) {
    available = available.filter((index) => index !== lastIndex);
  }

  const chosenIndex = available[Math.floor(Math.random() * available.length)];
  seen.add(chosenIndex);
  writeJson(seenKey, Array.from(seen));
  writeJson(lastKey, chosenIndex);

  return questions[chosenIndex];
}
