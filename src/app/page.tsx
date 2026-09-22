"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HomeBackdrop } from "@/components/home/HomeBackdrop";
import { Wheel } from "@/components/roulette/Wheel";
import {
  ENTRE_NOUS_CATEGORIES,
  type EntreNousCategoryId,
} from "@/data/entre-nous-questions";
import { pickRandomQuestion } from "@/lib/roulette";
import styles from "./page.module.css";

interface Draw {
  category: EntreNousCategoryId;
  question: string;
}

export default function Home() {
  const [draw, setDraw] = useState<Draw | null>(null);

  function handleLand(category: EntreNousCategoryId) {
    setDraw({ category, question: pickRandomQuestion(category) });
  }

  const category = draw
    ? ENTRE_NOUS_CATEGORIES.find((c) => c.id === draw.category)
    : undefined;

  return (
    <main className={styles.page}>
      <HomeBackdrop />
      <div className={styles.content}>
        <Image
          src="/logo.webp"
          alt="Oons"
          width={240}
          height={120}
          className={styles.logo}
          priority
        />
        <p className={styles.slogan}>Explore · Ressens · Avance</p>
        <p className={styles.subtitle}>Petites questions, grands déclics.</p>

        <Wheel onLand={handleLand} />

        {draw && category && (
          <div className={styles.result}>
            <Image
              src={category.icon}
              alt={category.label}
              width={140}
              height={131}
              className={styles.badge}
            />
            <p className={styles.question}>{draw.question}</p>
          </div>
        )}

        <p className={styles.tagline}>Une même âme, trois univers possibles. ♡</p>

        <Link href="/paiement" className={styles.secondaryButton}>
          Accès premium
        </Link>
      </div>
    </main>
  );
}
