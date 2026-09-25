"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { OonsLogo } from "@/components/brand/OonsLogo";
import { SplashBackdrop } from "@/components/splash/SplashBackdrop";
import { useAuthUser } from "@/lib/useAuthUser";
import styles from "./page.module.css";

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
      <SplashBackdrop />
      <div className={styles.content}>
        <OonsLogo size={72} showSlogan={false} />

        <h1 className={styles.title}>Votre confort est la règle.</h1>
        <p className={styles.text}>
          Vous disposez de Jokers.
          <br />
          Utilisez-les sans justification, en toute liberté.
        </p>

        <button type="button" className={styles.continueButton} onClick={() => router.push("/app")}>
          Découvrir Oons
        </button>
      </div>
    </main>
  );
}
