"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SplashBackdropV2 } from "@/components/splash/SplashBackdropV2";
import { useAuthUser } from "@/lib/useAuthUser";
import styles from "./page.module.css";

function HeartIcon() {
  return (
    <svg viewBox="0 0 100 100" width="30" height="30" aria-hidden="true">
      <path
        d="M50 82 C26 64 22 44 36 35 C44 30 50 36 50 41 C50 36 56 30 64 35 C78 44 74 64 50 82 Z"
        fill="none"
        stroke="var(--color-v2-coral)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TurnsIcon() {
  return (
    <svg viewBox="0 0 100 100" width="30" height="30" aria-hidden="true">
      <path
        d="M28 30 A28 28 0 0172 30"
        fill="none"
        stroke="var(--color-v2-navy)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path d="M66 22 L74 30 L64 34" fill="none" stroke="var(--color-v2-navy)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M72 70 A28 28 0 0128 70"
        fill="none"
        stroke="var(--color-v2-navy)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path d="M34 78 L26 70 L36 66" fill="none" stroke="var(--color-v2-navy)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="10" fill="none" stroke="var(--color-v2-navy)" strokeWidth="4.5" />
      <circle cx="36" cy="56" r="8" fill="none" stroke="var(--color-v2-navy)" strokeWidth="4" />
      <circle cx="64" cy="56" r="8" fill="none" stroke="var(--color-v2-navy)" strokeWidth="4" />
    </svg>
  );
}

function SkipIcon() {
  return (
    <svg viewBox="0 0 100 100" width="30" height="30" aria-hidden="true">
      <path d="M30 28 L58 50 L30 72 Z" fill="none" stroke="var(--color-v2-navy)" strokeWidth="5" strokeLinejoin="round" />
      <path d="M56 28 L84 50 L56 72 Z" fill="none" stroke="var(--color-v2-navy)" strokeWidth="5" strokeLinejoin="round" />
    </svg>
  );
}

const CARDS = [
  {
    icon: HeartIcon,
    auraClass: "auraRose",
    capsuleClass: "capsuleRose",
    label: "La Règle d'Or",
    title: "Bienveillance & Liberté",
    body: (
      <>
        Dans Oons, l&apos;écoute et le respect sont la priorité. Le but est de passer un moment
        chaleureux, authentique, sans jamais se sentir brusqué.
      </>
    ),
  },
  {
    icon: TurnsIcon,
    auraClass: "auraBlue",
    capsuleClass: "capsuleBlue",
    label: "Comment jouer ?",
    title: "Lorsqu'une carte est tirée,",
    body: <>les joueurs y répondent à tour de rôle.</>,
  },
  {
    icon: SkipIcon,
    auraClass: "auraYellow",
    capsuleClass: "capsuleYellow",
    label: "Passer une carte",
    title: null,
    body: (
      <>
        Si une question ou un <strong>défi</strong> ne vous inspire pas ou vous met mal à l&apos;aise,
        vous avez la liberté absolue de la passer pour tirer la suivante, sans aucune justification.
      </>
    ),
  },
];

export default function BienvenueJokerPage() {
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

        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Règle du Jeu</h1>
          <p className={styles.subtitle}>&amp; Esprit Oons</p>
        </div>

        <div className={styles.cards}>
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className={styles.card}>
                <div className={`${styles.aura} ${styles[card.auraClass]}`}>
                  <Icon />
                </div>
                <div className={styles.cardText}>
                  <span className={`${styles.capsule} ${styles[card.capsuleClass]}`}>{card.label}</span>
                  {card.title && <p className={styles.cardTitle}>{card.title}</p>}
                  <p className={styles.cardBody}>{card.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button type="button" className={styles.startButton} onClick={() => router.push("/app")}>
          C&apos;est parti !
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </main>
  );
}
