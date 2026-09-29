"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SplashBackdropV2 } from "@/components/splash/SplashBackdropV2";
import { BottomNav } from "@/components/layout/BottomNav";
import { SettingsGearIcon } from "@/components/icons/SettingsGearIcon";
import { useAuthUser } from "@/lib/useAuthUser";
import styles from "./page.module.css";

export default function HistoriquePage() {
  const router = useRouter();
  const user = useAuthUser();

  useEffect(() => {
    if (user === null) {
      router.replace("/connexion");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <main className={styles.page}>
      <SplashBackdropV2 />
      <div className={styles.content}>
        <div className={styles.topBar}>
          <Link href="/app/profil" className={styles.backButton} aria-label="Retour à mon espace">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
              <path
                d="M15 5 8 12l7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          {/* eslint-disable-next-line @next/next/no-img-element -- asset vectoriel maître unique */}
          <img className={styles.logo} src="/brand/oons-logo-primary.svg" alt="Oons" />
          <Link href="/app/parametres" className={styles.settingsButton} aria-label="Réglages">
            <SettingsGearIcon />
          </Link>
        </div>

        <h1 className={styles.title}>Mon historique</h1>
        <p className={styles.subtitle}>Les questions que la roue t&apos;a déjà proposées.</p>

        <div className={styles.empty}>
          <div className={styles.emptyAura}>
            <svg viewBox="0 0 24 24" width="46" height="46" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="var(--color-v2-navy)" strokeWidth="1.6" />
              <path d="M12 7v5l3.5 2" stroke="var(--color-v2-navy)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className={styles.emptyTitle}>Bientôt disponible</h2>
          <p className={styles.emptyText}>
            Retrouve ici, très prochainement, toutes les questions que la roue t&apos;a déjà proposées.
          </p>
          <Link href="/app" className={styles.discoverButton}>
            Retour à la roue
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <BottomNav variant="compact" />
    </main>
  );
}
