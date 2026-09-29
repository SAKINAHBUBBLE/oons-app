"use client";

import { useEffect, useState } from "react";
import { SplashBackdropV2 } from "@/components/splash/SplashBackdropV2";
import styles from "./AppLaunchSplash.module.css";

// Durée totale d'affichage avant que le fondu de sortie ne commence, et durée
// de ce fondu (doit rester cohérent avec la transition CSS du `.overlay`).
const HOLD_MS = 1900;
const FADE_MS = 400;

type Phase = "hidden" | "visible" | "fading";

function isStandalone(): boolean {
  const navigatorWithIOSFlag = window.navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia("(display-mode: standalone)").matches || navigatorWithIOSFlag.standalone === true
  );
}

export function AppLaunchSplash() {
  // "hidden" par défaut (y compris au tout premier rendu client) : on ne
  // sait si l'app tourne en mode installé qu'après le montage, et on ne veut
  // jamais afficher ce splash à un visiteur arrivant sur oons.fr depuis un
  // navigateur classique.
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    if (!isStandalone()) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect -- mode standalone détectable uniquement côté client, indisponible au rendu serveur
    setPhase("visible");
    const fadeTimer = window.setTimeout(() => setPhase("fading"), HOLD_MS);
    const hideTimer = window.setTimeout(() => setPhase("hidden"), HOLD_MS + FADE_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (phase === "hidden") {
    return null;
  }

  return (
    <div className={styles.overlay} data-fading={phase === "fading"} aria-hidden="true">
      <SplashBackdropV2 />
      {/* eslint-disable-next-line @next/next/no-img-element -- asset vectoriel maître unique, préchargé via <link rel="preload"> dans le layout */}
      <img className={styles.logo} src="/brand/oons-logo-primary.svg" alt="" />
    </div>
  );
}
