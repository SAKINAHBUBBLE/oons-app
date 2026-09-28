"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SplashBackdrop } from "@/components/splash/SplashBackdrop";
import { OonsLogo } from "@/components/brand/OonsLogo";
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

  function handleLand(category: EntreNousCategoryId) {
    router.push(`/app/question/${category}`);
  }

  if (!user) {
    return null;
  }

  return (
    <main className={styles.page}>
      <SplashBackdrop />
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
          <OonsLogo size={56} showSlogan={false} />
          <button type="button" className={styles.settingsButton} aria-label="Réglages">
            <SettingsGearIcon />
          </button>
        </div>

        <p className={styles.packLabel}>Entre Nous</p>
        <h1 className={styles.title}>
          Et si on laissait
          <br />
          la roue choisir ?
        </h1>

        <svg className={styles.titleHeart} viewBox="0 0 100 100" width="22" height="22" aria-hidden="true">
          <path
            d="M50 88 C8 60 8 24 34 14 C44 10 50 20 50 20 C50 20 56 10 66 14 C92 24 92 60 50 88 Z"
            fill="none"
            stroke="var(--color-accent-coral)"
            strokeWidth="6"
          />
        </svg>

        <Wheel ref={wheelRef} onLand={handleLand} />
      </div>

      <BottomNav />
    </main>
  );
}
