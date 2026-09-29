"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SplashBackdropV2 } from "@/components/splash/SplashBackdropV2";
import { useAuthUser } from "@/lib/useAuthUser";
import styles from "./page.module.css";

// Texte verrouillé : à reproduire mot pour mot, sans reformulation ni coupe.
const STANZAS = [
  ["Déposez les masques et les filtres,", "Préparez-vous à voyager", "du rire aux larmes."],
  ["Ici, chaque émotion est une promesse,", "Un instant de grâce qui rapproche", "et qui lie."],
  ["Installez-vous sans réserve :", "Vous êtes en noble compagnie."],
];

export default function BienvenuePage() {
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
      <button
        type="button"
        className={styles.closeButton}
        onClick={() => router.push("/app")}
        aria-label="Fermer"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <div className={styles.content}>
        {/* eslint-disable-next-line @next/next/no-img-element -- asset vectoriel maître unique */}
        <img className={styles.logo} src="/brand/oons-logo-primary.svg" alt="Oons" />

        <div className={styles.poem}>
          {STANZAS.map((stanza, index) => (
            <div key={index} className={styles.stanzaGroup}>
              {index > 0 && <span className={styles.separator} aria-hidden="true" />}
              <p className={styles.stanza}>
                {stanza.map((line, lineIndex) => (
                  <span key={lineIndex} className={styles.line}>
                    {line}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>

        <h1 className={styles.title}>
          Bienvenue chez <span className={styles.titleAccent}>Oons.</span>
        </h1>

        <button type="button" className={styles.enterButton} onClick={() => router.push("/bienvenue/joker")}>
          Entrer chez Oons
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </main>
  );
}
