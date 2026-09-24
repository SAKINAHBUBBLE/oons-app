"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { HomeBackdrop } from "@/components/home/HomeBackdrop";
import { Wheel, type WheelHandle } from "@/components/roulette/Wheel";
import { QuestionCard } from "@/components/roulette/QuestionCard";
import {
  ENTRE_NOUS_CATEGORIES,
  type EntreNousCategoryId,
} from "@/data/entre-nous-questions";
import { pickRandomQuestion } from "@/lib/roulette";
import { getFirebaseAuth } from "@/lib/firebase";
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

        <Wheel ref={wheelRef} onLand={handleLand} />

        {draw && category && (
          <QuestionCard
            category={category}
            question={draw.question}
            onClose={() => setDraw(null)}
            onNext={handleNext}
          />
        )}

        <p className={styles.tagline}>Une même âme, trois univers possibles. ♡</p>

        <Link href="/paiement" className={styles.secondaryButton}>
          Accès premium
        </Link>

        <button
          type="button"
          className={styles.signOutButton}
          onClick={() => signOut(getFirebaseAuth())}
        >
          Se déconnecter
        </button>
      </div>
    </main>
  );
}
