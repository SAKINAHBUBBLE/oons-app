"use client";

// Marque qu'un compte vient d'être créé et doit voir le poème + les règles
// du jeu au tout premier lancer de roue (pas à l'inscription elle-même).
const STORAGE_KEY = "oons-needs-onboarding";

export function markOnboardingNeeded() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // localStorage indisponible : l'onboarding sera simplement ignoré, sans impact critique.
  }
}

export function peekOnboardingNeeded(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function clearOnboardingNeeded() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage indisponible : rien à nettoyer.
  }
}
