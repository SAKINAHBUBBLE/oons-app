"use client";

import { useRef, useState } from "react";
import { SplashBackdropV2 } from "@/components/splash/SplashBackdropV2";
import { PackCardV2 } from "@/components/packs/PackCardV2";
import { SettingsGearIcon } from "@/components/icons/SettingsGearIcon";
import { PACKS_V2 } from "@/data/packs-v2";
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
      <SplashBackdropV2 />
      <div className={styles.content}>
        <div className={styles.topBar}>
          {/* eslint-disable-next-line @next/next/no-img-element -- asset vectoriel maître unique */}
          <img className={styles.logo} src="/brand/oons-logo-primary.svg" alt="Oons" />
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
          {PACKS_V2.map((pack) => (
            <PackCardV2 key={pack.id} pack={pack} onLocked={handleLocked} />
          ))}
        </div>
      </div>

      {toast && <div className={styles.toast}>Bientôt disponible</div>}
    </main>
  );
}
