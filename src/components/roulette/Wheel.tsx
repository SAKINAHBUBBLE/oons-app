"use client";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  ENTRE_NOUS_CATEGORIES,
  WHEEL_SEGMENTS,
  type EntreNousCategoryId,
} from "@/data/entre-nous-questions";
import { CategoryIcon } from "@/components/entre-nous/CategoryIcon";
import { computeTickDelaysMs } from "./wheelTickSchedule";
import { isSoundEnabled, setSoundEnabled, scheduleWheelTicks, scheduleWheelStop } from "@/lib/wheelSound";
import styles from "./Wheel.module.css";

const CATEGORY_BY_ID = Object.fromEntries(
  ENTRE_NOUS_CATEGORIES.map((category) => [category.id, category]),
) as Record<EntreNousCategoryId, (typeof ENTRE_NOUS_CATEGORIES)[number]>;

const SEGMENT_ANGLE = 360 / WHEEL_SEGMENTS.length;
const EXTRA_SPINS = 5;
const SPIN_DURATION_MS = 3500;
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
  // Valeur par défaut alignée sur le rendu serveur ; corrigée juste après le
  // montage (localStorage n'existe pas côté serveur).
  const [soundEnabled, setSoundEnabledState] = useState(true);

  useEffect(() => {
    setSoundEnabledState(isSoundEnabled());
  }, []);

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
    const totalRotation = EXTRA_SPINS * 360 + delta;

    setSpinning(true);
    setRotation((previous) => previous + totalRotation);

    const tickDelays = computeTickDelaysMs(totalRotation, SPIN_DURATION_MS, SEGMENT_ANGLE);
    scheduleWheelTicks(tickDelays);
    scheduleWheelStop(SPIN_DURATION_MS);

    window.setTimeout(() => {
      setSpinning(false);
      onLand(WHEEL_SEGMENTS[targetIndex]);
    }, SPIN_DURATION_MS);
  }

  function toggleSound() {
    const next = !soundEnabled;
    setSoundEnabledState(next);
    setSoundEnabled(next);
  }

  useImperativeHandle(ref, () => ({ spin: handleSpin }));

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.soundToggle}
        onClick={toggleSound}
        aria-label={soundEnabled ? "Couper le son de la roue" : "Activer le son de la roue"}
        aria-pressed={!soundEnabled}
      >
        {soundEnabled ? (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
            <path
              d="M16.5 8.5a5 5 0 010 7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M19 6a8.5 8.5 0 010 12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" />
            <path
              d="M16 9l5 6M21 9l-5 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
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
