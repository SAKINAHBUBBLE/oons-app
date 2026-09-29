"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SplashBackdropV2 } from "@/components/splash/SplashBackdropV2";
import { SettingsGearIcon } from "@/components/icons/SettingsGearIcon";
import { BottomNav } from "@/components/layout/BottomNav";
import { CategoryIcon } from "@/components/entre-nous/CategoryIcon";
import { QuestionTimer } from "@/components/entre-nous/QuestionTimer";
import { QUESTION_SCREENS } from "@/data/question-screens";
import type { EntreNousCategoryId } from "@/data/entre-nous-questions";
import { pickRandomQuestion, type NormalizedQuestion } from "@/lib/roulette";
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
  const [question, setQuestion] = useState<NormalizedQuestion | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- valeur non déterministe (aléa + localStorage), volontairement absente du rendu serveur
    setQuestion(pickRandomQuestion(categoryId));
  }, [categoryId]);

  function handlePass() {
    // "Passer cette question" relance vraiment la roue (avec son animation),
    // exactement comme depuis l'écran d'accueil : on repart sur /app avec un
    // indicateur qui déclenche le spin automatiquement à l'arrivée.
    try {
      window.sessionStorage.setItem("oons-autospin", "1");
    } catch {
      // sessionStorage indisponible (navigation privée, quota...) : le spin
      // automatique sera simplement ignoré, sans impact critique.
    }
    router.push("/app");
  }

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
      <SplashBackdropV2 />
      <div className={styles.content}>
        <div className={styles.topBar}>
          <Link href="/app" className={styles.backButton} aria-label="Retour à la roue">
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
          <button type="button" className={styles.settingsButton} aria-label="Réglages">
            <SettingsGearIcon />
          </button>
        </div>

        <p className={styles.packLabel}>Entre Nous</p>

        <div className={styles.heroAura} style={{ background: config.auraBg }}>
          <CategoryIcon
            kind={categoryId}
            accent={config.iconAccent}
            accentStrong={config.iconAccentStrong}
            size={110}
          />
        </div>

        <h1 className={styles.title} style={{ color: config.color }}>
          {config.title}
        </h1>
        <p className={styles.subtitle} style={{ color: config.color }}>
          {config.baselineLines.map((line, index) => (
            <span key={index}>
              {line}
              {index < config.baselineLines.length - 1 && <br />}
            </span>
          ))}
        </p>

        <div className={styles.card}>
          <p className={styles.question}>{question.text}</p>
          {question.hasTimerSupport && (
            <QuestionTimer key={question.text} seconds={question.defaultTimerSeconds ?? 45} />
          )}
        </div>

        <button type="button" className={styles.passButton} onClick={handlePass}>
          Passer cette question
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
            <path
              d="M4 12a8 8 0 0113.66-5.66M20 12a8 8 0 01-13.66 5.66"
              stroke="var(--color-v2-coral)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M17 4v3.5h-3.5M7 20v-3.5h3.5"
              stroke="var(--color-v2-coral)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <BottomNav variant="compact" />
    </main>
  );
}
