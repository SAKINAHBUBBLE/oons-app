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

// Mémorise les dernières catégories tirées (au-delà d'une seule session, via
// localStorage) pour éviter de retomber trop souvent sur la même catégorie :
// un vrai tirage uniforme donne l'impression d'être "pas équilibré".
const RECENT_HISTORY_KEY = "oons-wheel-recent-categories";
const RECENT_HISTORY_SIZE = 2;

function getRecentCategories(): EntreNousCategoryId[] {
  try {
    const raw = window.localStorage.getItem(RECENT_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as EntreNousCategoryId[]) : [];
  } catch {
    return [];
  }
}

function pushRecentCategory(categoryId: EntreNousCategoryId) {
  try {
    const history = [categoryId, ...getRecentCategories()].slice(0, RECENT_HISTORY_SIZE);
    window.localStorage.setItem(RECENT_HISTORY_KEY, JSON.stringify(history));
  } catch {
    // localStorage indisponible : l'alternance sera juste moins lissée, sans impact critique.
  }
}

const WHEEL_BACKGROUND = `conic-gradient(${WHEEL_SEGMENTS.map(
  (categoryId, index) =>
    `${CATEGORY_BY_ID[categoryId].wheelColor} ${index * SEGMENT_ANGLE}deg ${(index + 1) * SEGMENT_ANGLE}deg`,
).join(", ")})`;

interface WheelProps {
  onLand: (categoryId: EntreNousCategoryId) => void;
  disabled?: boolean;
  // Appelé juste avant de faire tourner la roue ; si la fonction renvoie
  // false, le tirage est annulé (utilisé pour intercaler le poème/les règles
  // au tout premier lancer d'un compte neuf).
  onSpinAttempt?: () => boolean;
}

export interface WheelHandle {
  spin: () => void;
}

export const Wheel = forwardRef<WheelHandle, WheelProps>(function Wheel(
  { onLand, disabled, onSpinAttempt },
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
    if (onSpinAttempt && !onSpinAttempt()) return;

    // Le même index pilote à la fois la rotation ET la catégorie renvoyée :
    // le segment sur lequel la roue s'arrête visuellement détermine toujours,
    // par construction, la catégorie de la question tirée. On exclut les
    // catégories tirées récemment pour mieux alterner (voir RECENT_HISTORY_*).
    const recentCategories = getRecentCategories();
    const eligibleIndexes = WHEEL_SEGMENTS.map((_, index) => index).filter(
      (index) => !recentCategories.includes(WHEEL_SEGMENTS[index]),
    );
    const pool = eligibleIndexes.length > 0 ? eligibleIndexes : WHEEL_SEGMENTS.map((_, index) => index);
    const targetIndex = pool[Math.floor(Math.random() * pool.length)];
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
      pushRecentCategory(WHEEL_SEGMENTS[targetIndex]);
      onLand(WHEEL_SEGMENTS[targetIndex]);
    }, SPIN_DURATION_MS);
  }

  function toggleSound() {
    const next = !soundEnabled;
    setSoundEnabledState(next);
    setSoundEnabled(next);
  }

  useImperativeHandle(ref, () => ({
    spin: () => {
      // Déclenché juste après une navigation (retour depuis une question, ou
      // fin d'onboarding) : si on lance le spin dès le montage, il arrive
      // parfois que le premier changement de `transform` soit fusionné avec
      // le tout premier paint (aucune image "de départ" à 0deg n'a encore
      // été affichée), et la transition CSS ne s'anime alors pas — le son
      // joue mais la roue saute directement à sa position finale. Un double
      // requestAnimationFrame garantit qu'au moins un paint a bien eu lieu
      // avant de modifier la rotation, pour que la transition s'anime à coup sûr.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          handleSpin();
        });
      });
    },
  }));

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
                    size={38}
                  />
                  <span className={styles.segmentLabel} style={{ color: category.textColor }}>
                    {category.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className={styles.hub}
          onClick={handleSpin}
          disabled={spinning || disabled}
          aria-label="Lancer la roue"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- asset recadré depuis l'image de référence, pas d'optimisation Next nécessaire pour un petit logo statique */}
          <img className={styles.hubLogo} src="/brand/oons-logo-primary.svg" alt="" />
        </button>
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
