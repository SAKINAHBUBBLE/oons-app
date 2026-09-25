"use client";

import { useRef, useState } from "react";
import { OonsLogo } from "@/components/brand/OonsLogo";
import { SplashBackdrop } from "@/components/splash/SplashBackdrop";
import { PackCard } from "@/components/packs/PackCard";
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
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
              <path
                d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M19.4 13.5a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V19.5a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H4.5a2 2 0 110-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H10.5a1.65 1.65 0 001-1.51V4.5a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V10.5a1.65 1.65 0 001.51 1H19.5a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
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
