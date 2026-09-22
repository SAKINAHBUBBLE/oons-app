"use client";

import { useState } from "react";
import { Wheel } from "@/components/roulette/Wheel";
import { QuestionCard } from "@/components/roulette/QuestionCard";
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
        <QuestionCard
          category={category}
          question={draw.question}
          onClose={() => setDraw(null)}
        />
      )}
    </main>
  );
}
