"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { OonsLogo } from "@/components/brand/OonsLogo";
import { SettingsGearIcon } from "@/components/icons/SettingsGearIcon";
import { BottomNav } from "@/components/layout/BottomNav";
import { QuestionBackdrop } from "@/components/entre-nous/QuestionBackdrop";
import { QuestionIllustration } from "@/components/entre-nous/QuestionIllustration";
import { QUESTION_SCREENS } from "@/data/question-screens";
import type { EntreNousCategoryId } from "@/data/entre-nous-questions";
import { pickRandomQuestion } from "@/lib/roulette";
import { useAuthUser } from "@/lib/useAuthUser";
import styles from "./QuestionScreen.module.css";

interface QuestionScreenProps {
  categoryId: EntreNousCategoryId;
}

export function QuestionScreen({ categoryId }: QuestionScreenProps) {
  const router = useRouter();
  const user = useAuthUser();
  const config = QUESTION_SCREENS[categoryId];
  // Tirée uniquement côté client (Math.random + localStorage) : impossible à
  // calculer côté serveur sans provoquer un écart d'hydratation, donc on
  // rend `null` au premier passage puis on tire la question après le montage.
  const [question, setQuestion] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- valeur non déterministe (aléa + localStorage), volontairement absente du rendu serveur
    setQuestion(pickRandomQuestion(categoryId));
  }, [categoryId]);

  useEffect(() => {
    if (user === null) {
      router.replace("/connexion");
    }
  }, [user, router]);

  if (!user || question === null) {
    return null;
  }

  return (
    <main className={styles.page}>
      <QuestionBackdrop palette={config.palette} sparse={config.sparse} />
      <div className={styles.content}>
        <div className={styles.topBar}>
          <Link href="/app" className={styles.backButton} aria-label="Retour à la roue">
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

        <QuestionIllustration kind={config.illustration} size={150} />

        <h1 className={styles.title} style={{ color: config.titleColor }}>
          {config.title}
        </h1>
        <p className={styles.subtitle} style={{ color: config.subtitleColor }}>
          {config.subtitleLines[0]}
          <br />
          {config.subtitleLines[1]}
        </p>

        <div className={styles.card}>
          <p className={styles.question}>{question}</p>
          <span className={styles.ornament} style={{ color: config.palette.accent[0] }} aria-hidden="true">
            ✦
          </span>
        </div>

        <button
          type="button"
          className={styles.passButton}
          onClick={() => setQuestion(pickRandomQuestion(categoryId))}
        >
          Passer cette question
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
            <path
              d="M4 12a8 8 0 0113.66-5.66M20 12a8 8 0 01-13.66 5.66"
              stroke="var(--color-raspberry)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M17 4v3.5h-3.5M7 20v-3.5h3.5"
              stroke="var(--color-raspberry)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <BottomNav />
    </main>
  );
}
