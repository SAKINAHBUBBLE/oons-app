"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SplashBackdrop } from "@/components/splash/SplashBackdrop";
import { OonsLogo } from "@/components/brand/OonsLogo";
import { SettingsGearIcon } from "@/components/icons/SettingsGearIcon";
import { BottomNav } from "@/components/layout/BottomNav";
import { Wheel, type WheelHandle } from "@/components/roulette/Wheel";
import { QuestionCard } from "@/components/roulette/QuestionCard";
import {
  ENTRE_NOUS_CATEGORIES,
  type EntreNousCategoryId,
} from "@/data/entre-nous-questions";
import { pickRandomQuestion } from "@/lib/roulette";
import { useAuthUser } from "@/lib/useAuthUser";
import styles from "./page.module.css";

interface Draw {
  category: EntreNousCategoryId;
  question: string;
}

export default function AppHome() {
  const router = useRouter();
  const user = useAuthUser();
  const [draw, setDraw] = useState<Draw | null>(null);
  const wheelRef = useRef<WheelHandle>(null);

  useEffect(() => {
    if (user === null) {
      router.replace("/connexion");
    }
  }, [user, router]);

  function handleLand(category: EntreNousCategoryId) {
    setDraw({ category, question: pickRandomQuestion(category) });
  }

  function handleNext() {
    setDraw(null);
    wheelRef.current?.spin();
  }

  if (!user) {
    return null;
  }

  const category = draw
    ? ENTRE_NOUS_CATEGORIES.find((c) => c.id === draw.category)
    : undefined;

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

        <svg className={styles.titleHeart} viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            d="M12 20s-6.2-4-8.6-7.6C1.5 9.6 2.5 6.5 5.2 5.4c1.9-.8 3.8-.2 5 1.3 1.2-1.5 3.1-2.1 5-1.3 2.7 1.1 3.7 4.2 2.2 6.9C18.2 16 12 20 12 20z"
            fill="none"
            stroke="var(--color-accent-coral)"
            strokeWidth="1.6"
          />
        </svg>

        <Wheel ref={wheelRef} onLand={handleLand} />

        {draw && category && (
          <QuestionCard
            category={category}
            question={draw.question}
            onClose={() => setDraw(null)}
            onNext={handleNext}
          />
        )}
      </div>

      <BottomNav />
    </main>
  );
}
