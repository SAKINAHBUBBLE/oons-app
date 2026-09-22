"use client";

import { useState } from "react";
import { ENTRE_NOUS_CATEGORIES } from "@/data/entre-nous-questions";
import type { EntreNousCategoryId } from "@/data/entre-nous-questions";
import styles from "./Wheel.module.css";

const SEGMENT_ANGLE = 360 / ENTRE_NOUS_CATEGORIES.length;
const EXTRA_SPINS = 5;
// Marge de sécurité pour que le tirage aléatoire dans le segment ne s'approche
// jamais du bord voisin (et donc du pointeur).
const JITTER_RANGE = SEGMENT_ANGLE * 0.3;

const WHEEL_BACKGROUND = `conic-gradient(${ENTRE_NOUS_CATEGORIES.map(
  (category, index) =>
    `${category.color} ${index * SEGMENT_ANGLE}deg ${(index + 1) * SEGMENT_ANGLE}deg`,
).join(", ")})`;

interface WheelProps {
  onLand: (categoryId: EntreNousCategoryId) => void;
  disabled?: boolean;
}

export function Wheel({ onLand, disabled }: WheelProps) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  function handleSpin() {
    if (spinning || disabled) return;

    const targetIndex = Math.floor(Math.random() * ENTRE_NOUS_CATEGORIES.length);
    const centerAngle = targetIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const jitter = (Math.random() * 2 - 1) * JITTER_RANGE;
    const targetMod = (360 - (centerAngle + jitter) + 360) % 360;
    const currentMod = ((rotation % 360) + 360) % 360;
    const delta = (targetMod - currentMod + 360) % 360;

    setSpinning(true);
    setRotation((previous) => previous + EXTRA_SPINS * 360 + delta);

    window.setTimeout(() => {
      setSpinning(false);
      onLand(ENTRE_NOUS_CATEGORIES[targetIndex].id);
    }, 3500);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.pointer} />
      <div className={styles.wheelContainer}>
        <div
          className={styles.wheel}
          style={{ background: WHEEL_BACKGROUND, transform: `rotate(${rotation}deg)` }}
        >
          {ENTRE_NOUS_CATEGORIES.map((category, index) => (
            <div
              key={category.id}
              className={styles.label}
              style={{
                transform: `rotate(${index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2}deg)`,
              }}
            >
              {category.label}
            </div>
          ))}
        </div>
        <div className={styles.hub} />
      </div>
      <button
        type="button"
        className={styles.spinButton}
        onClick={handleSpin}
        disabled={spinning || disabled}
      >
        {spinning ? "La roue tourne..." : "Faire tourner la roue"}
      </button>
    </div>
  );
}
