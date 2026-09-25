"use client";

import { useRef, useState } from "react";
import { OonsLogo } from "@/components/brand/OonsLogo";
import { SplashBackdrop } from "@/components/splash/SplashBackdrop";
import { PackCard } from "@/components/packs/PackCard";
import { SettingsGearIcon } from "@/components/icons/SettingsGearIcon";
import { PACKS } from "@/data/packs";
import styles from "./page.module.css";

const TOAST_DURATION_MS = 2200;

export default function PacksPage() {
  const [toast, setToast] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleLocked() {
    setToast(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setToast(false), TOAST_DURATION_MS);
  }

  return (
    <main className={styles.page}>
      <SplashBackdrop />
      <div className={styles.content}>
        <div className={styles.topBar}>
          <OonsLogo size={56} showSlogan={false} />
          <button
            type="button"
            className={styles.settingsButton}
            onClick={handleLocked}
            aria-label="Réglages"
          >
            <SettingsGearIcon />
          </button>
        </div>

        <h1 className={styles.title}>On commence par quoi ?</h1>
        <p className={styles.subtitle}>Des univers pour se rapprocher.</p>

        <div className={styles.grid}>
          {PACKS.map((pack) => (
            <PackCard key={pack.id} pack={pack} onLocked={handleLocked} />
          ))}
        </div>
      </div>

      {toast && <div className={styles.toast}>Bientôt disponible</div>}
    </main>
  );
}
