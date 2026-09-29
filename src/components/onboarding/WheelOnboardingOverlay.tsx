"use client";

import { SplashBackdropV2 } from "@/components/splash/SplashBackdropV2";
import { PoemContent } from "./PoemContent";
import { RulesContent } from "./RulesContent";
import styles from "./WheelOnboardingOverlay.module.css";

interface WheelOnboardingOverlayProps {
  step: "poem" | "rules";
  onNext: () => void;
  onFinish: () => void;
}

// Affiché par-dessus l'écran de la roue (pas une page à part) au tout premier
// clic sur "Lancer la roue" d'un compte réellement neuf : poème puis règles,
// avant que le vrai tirage ne se déclenche.
export function WheelOnboardingOverlay({ step, onNext, onFinish }: WheelOnboardingOverlayProps) {
  return (
    <div className={styles.overlay}>
      <SplashBackdropV2 />
      {step === "poem" ? (
        <PoemContent ctaLabel="Entrer chez Oons" onCta={onNext} />
      ) : (
        <RulesContent ctaLabel="C'est parti !" onCta={onFinish} />
      )}
    </div>
  );
}
