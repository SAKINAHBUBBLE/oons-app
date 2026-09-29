"use client";

import { useRef, useState } from "react";

const TOAST_DURATION_MS = 2200;

// Petit toast "Bientôt disponible" réutilisé par les écrans avec des
// fonctionnalités pas encore branchées (réglages, aide, CGU...).
export function useLockedToast() {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    setVisible(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setVisible(false), TOAST_DURATION_MS);
  }

  return { visible, show };
}
