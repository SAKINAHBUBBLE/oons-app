"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import {
  ENTRE_NOUS_CATEGORIES,
  WHEEL_SEGMENTS,
  type EntreNousCategoryId,
} from "@/data/entre-nous-questions";
import { CategoryIcon } from "@/components/entre-nous/CategoryIcon";
import styles from "./Wheel.module.css";

const CATEGORY_BY_ID = Object.fromEntries(
  ENTRE_NOUS_CATEGORIES.map((category) => [category.id, category]),
) as Record<EntreNousCategoryId, (typeof ENTRE_NOUS_CATEGORIES)[number]>;

const SEGMENT_ANGLE = 360 / WHEEL_SEGMENTS.length;
const EXTRA_SPINS = 5;
// Marge de sécurité pour que le tirage aléatoire dans le segment ne s'approche
// jamais du bord voisin (et donc du pointeur).
const JITTER_RANGE = SEGMENT_ANGLE * 0.3;

const WHEEL_BACKGROUND = `conic-gradient(${WHEEL_SEGMENTS.map(
  (categoryId, index) =>
    `${CATEGORY_BY_ID[categoryId].wheelColor} ${index * SEGMENT_ANGLE}deg ${(index + 1) * SEGMENT_ANGLE}deg`,
).join(", ")})`;

interface WheelProps {
  onLand: (categoryId: EntreNousCategoryId) => void;
  disabled?: boolean;
}

export interface WheelHandle {
  spin: () => void;
}

export const Wheel = forwardRef<WheelHandle, WheelProps>(function Wheel(
  { onLand, disabled },
  ref,
) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  function handleSpin() {
    if (spinning || disabled) return;

    // Le même index pilote à la fois la rotation ET la catégorie renvoyée :
    // le segment sur lequel la roue s'arrête visuellement détermine toujours,
    // par construction, la catégorie de la question tirée.
    const targetIndex = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const centerAngle = targetIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
    const jitter = (Math.random() * 2 - 1) * JITTER_RANGE;
    const targetMod = (360 - (centerAngle + jitter) + 360) % 360;
    const currentMod = ((rotation % 360) + 360) % 360;
    const delta = (targetMod - currentMod + 360) % 360;

    setSpinning(true);
    setRotation((previous) => previous + EXTRA_SPINS * 360 + delta);

    window.setTimeout(() => {
      setSpinning(false);
      onLand(WHEEL_SEGMENTS[targetIndex]);
    }, 3500);
  }

  useImperativeHandle(ref, () => ({ spin: handleSpin }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.pointer} />
      <div className={styles.wheelContainer}>
        <div
          className={styles.wheel}
          style={{ background: WHEEL_BACKGROUND, transform: `rotate(${rotation}deg)` }}
        >
          {WHEEL_SEGMENTS.map((categoryId, index) => {
            const category = CATEGORY_BY_ID[categoryId];
            const centerAngle = index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
            const stripRotation = centerAngle - 90;
            return (
              <div
                key={index}
                className={styles.segmentSlot}
                style={{ transform: `rotate(${stripRotation}deg)` }}
              >
                <div
                  className={styles.segmentContent}
                  style={{
                    transform: `translate(-50%, -50%) rotate(${-(stripRotation + rotation)}deg)`,
                  }}
                >
                  <CategoryIcon
                    kind={category.id}
                    accent={category.iconAccent}
                    accentStrong={category.iconAccentStrong}
                    size={30}
                  />
                  <span className={styles.segmentLabel} style={{ color: category.textColor }}>
                    {category.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.hub}>
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
            <path
              d="M12 21s-6.7-4.35-9.3-8.28C.6 9.98 1.6 6.4 4.6 5.1c2-.86 4.1-.2 5.4 1.4 1.3-1.6 3.4-2.26 5.4-1.4 3 1.3 4 4.88 1.9 7.62C18.7 16.65 12 21 12 21z"
              fill="var(--color-raspberry)"
            />
          </svg>
        </div>
      </div>
      <button
        type="button"
        className={styles.spinButton}
        onClick={handleSpin}
        disabled={spinning || disabled}
      >
        {spinning ? "La roue tourne..." : "Lancer la roue"}
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
          <path
            d="M4 12a8 8 0 0113.66-5.66M20 12a8 8 0 01-13.66 5.66"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M17 4v3.5h-3.5M7 20v-3.5h3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
});
