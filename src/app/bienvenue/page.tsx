"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { OonsLogo } from "@/components/brand/OonsLogo";
import { SplashBackdrop } from "@/components/splash/SplashBackdrop";
import { useAuthUser } from "@/lib/useAuthUser";
import styles from "./page.module.css";

const POEM_LINES = [
  "Déposez les masques et les filtres.",
  "Préparez-vous à voyager du rire aux larmes.",
  "Ici, chaque émotion est une promesse,",
  "un instant de grâce qui rapproche et qui lie.",
  "Installez-vous sans réserve.",
  "Vous êtes en noble compagnie.",
  "Bienvenue chez Oons.",
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
      <SplashBackdrop />
      <div className={styles.content}>
        <OonsLogo size={88} />

        <p className={styles.poem}>
          {POEM_LINES.map((line, index) => (
            <span key={index} className={styles.poemLine}>
              {line}
            </span>
          ))}
        </p>

        <button type="button" className={styles.continueButton} onClick={() => router.push("/bienvenue/joker")}>
          Continuer
        </button>
      </div>
    </main>
  );
}
