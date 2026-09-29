"use client";

import { useCallback, useEffect, useState } from "react";
import type { EntreNousCategoryId } from "@/data/entre-nous-questions";

export interface FavoriteQuestion {
  id: string;
  categoryId: EntreNousCategoryId;
  text: string;
  addedAt: number;
}

const STORAGE_KEY = "oons-favorites";
const EVENT_NAME = "oons-favorites-changed";

export function makeFavoriteId(categoryId: EntreNousCategoryId, text: string): string {
  return `${categoryId}::${text}`;
}

function readFavorites(): FavoriteQuestion[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FavoriteQuestion[]) : [];
  } catch {
    return [];
  }
}

function writeFavorites(favorites: FavoriteQuestion[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch {
    // localStorage indisponible (navigation privée, quota...) : le favori ne sera simplement pas persisté.
  }
}

// Favoris stockés localement (pas de collection Firestore dédiée) : identifiés
// par catégorie + texte de la question, qui est stable d'une session à l'autre.
export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteQuestion[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture localStorage, indisponible au rendu serveur
    setFavorites(readFavorites());
    function handleChange() {
      setFavorites(readFavorites());
    }
    window.addEventListener(EVENT_NAME, handleChange);
    window.addEventListener("storage", handleChange);
    return () => {
      window.removeEventListener(EVENT_NAME, handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  const isFavorite = useCallback(
    (categoryId: EntreNousCategoryId, text: string) =>
      favorites.some((favorite) => favorite.id === makeFavoriteId(categoryId, text)),
    [favorites],
  );

  const toggleFavorite = useCallback((categoryId: EntreNousCategoryId, text: string) => {
    const id = makeFavoriteId(categoryId, text);
    const current = readFavorites();
    const exists = current.some((favorite) => favorite.id === id);
    const next = exists
      ? current.filter((favorite) => favorite.id !== id)
      : [...current, { id, categoryId, text, addedAt: Date.now() }];
    writeFavorites(next);
  }, []);

  const removeFavorite = useCallback((id: string) => {
    writeFavorites(readFavorites().filter((favorite) => favorite.id !== id));
  }, []);

  return { favorites, isFavorite, toggleFavorite, removeFavorite };
}
