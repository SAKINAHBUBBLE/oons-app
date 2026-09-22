"use client";

import { useState } from "react";
import Image from "next/image";
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

export default function EntreNousPage() {
  const [draw, setDraw] = useState<Draw | null>(null);

  function handleLand(category: EntreNousCategoryId) {
    setDraw({ category, question: pickRandomQuestion(category) });
  }

  const category = draw
    ? ENTRE_NOUS_CATEGORIES.find((c) => c.id === draw.category)
    : undefined;

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Roulette Entre Nous</h1>
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
    </main>
  );
}
