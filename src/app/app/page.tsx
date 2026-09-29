"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SettingsGearIcon } from "@/components/icons/SettingsGearIcon";
import { BottomNav } from "@/components/layout/BottomNav";
import { Wheel, type WheelHandle } from "@/components/roulette/Wheel";
import type { EntreNousCategoryId } from "@/data/entre-nous-questions";
import { useAuthUser } from "@/lib/useAuthUser";
import styles from "./page.module.css";

export default function AppHome() {
  const router = useRouter();
  const user = useAuthUser();
  const wheelRef = useRef<WheelHandle>(null);

  useEffect(() => {
    if (user === null) {
      router.replace("/connexion");
    }
  }, [user, router]);

  useEffect(() => {
    // Tant que l'utilisateur n'est pas résolu, la roue n'est pas encore montée
    // (voir le "if (!user) return null" plus bas) : on ne consomme le drapeau
    // qu'une fois prêt, pour ne pas le perdre pendant la résolution de l'auth.
    if (!user) return;
    let shouldAutospin = false;
    try {
      shouldAutospin = window.sessionStorage.getItem("oons-autospin") === "1";
      if (shouldAutospin) window.sessionStorage.removeItem("oons-autospin");
    } catch {
      // sessionStorage indisponible : pas de spin automatique, sans impact critique.
    }
    if (shouldAutospin) {
      wheelRef.current?.spin();
    }
  }, [user]);

  function handleLand(category: EntreNousCategoryId) {
    router.push(`/app/question/${category}`);
  }

  if (!user) {
    return null;
  }

  return (
    <main className={styles.page}>
      <div className={styles.v2Blob} data-position="top-left" />
      <div className={styles.v2Blob} data-position="top-right" />
      <div className={styles.v2Blob} data-position="bottom-left" />
      <div className={styles.v2Blob} data-position="bottom-right" />
      <div className={styles.content}>
        <div className={styles.topBar}>
          <Link href="/packs" className={styles.backButton} aria-label="Retour aux packs">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
              <path
                d="M15 5 8 12l7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          {/* eslint-disable-next-line @next/next/no-img-element -- asset recadré depuis l'image de référence, pas d'optimisation Next nécessaire pour un petit logo statique */}
          <img className={styles.headerLogo} src="/brand/oons-logo-primary.svg" alt="Oons" />
          <button type="button" className={styles.settingsButton} aria-label="Réglages">
            <SettingsGearIcon />
          </button>
        </div>

        <h1 className={styles.title}>
          Et si on laissait
          <br />
          la roue choisir ?
        </h1>

        <Wheel ref={wheelRef} onLand={handleLand} />
      </div>

      <BottomNav />
    </main>
  );
}
