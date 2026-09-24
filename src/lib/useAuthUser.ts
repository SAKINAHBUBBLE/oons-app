"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";

// undefined = état pas encore connu (premier rendu), null = déconnectée.
export function useAuthUser(): User | null | undefined {
  const [user, setUser] = useState<User | null | undefined>(() =>
    isFirebaseConfigured() ? undefined : null,
  );

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), setUser);
    return unsubscribe;
  }, []);

  return user;
}
