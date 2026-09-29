"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SplashBackdropV2 } from "@/components/splash/SplashBackdropV2";
import { RulesContent } from "@/components/onboarding/RulesContent";
import { useAuthUser } from "@/lib/useAuthUser";
import styles from "./page.module.css";

// Route conservée comme page "Règle du Jeu" consultable à tout moment (via le
// petit bouton info de l'écran de la roue) — ce n'est plus une étape forcée de
// l'inscription : ça, c'est désormais géré par WheelOnboardingOverlay.
export default function ReglesDuJeuPage() {
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

      <RulesContent ctaLabel="Fermer" onCta={() => router.push("/app")} />
    </main>
  );
}
