import { ENTRE_NOUS_CATEGORIES, WHEEL_SEGMENTS, type EntreNousCategoryId } from "@/data/entre-nous-questions";
import { CategoryIcon } from "@/components/entre-nous/CategoryIcon";
// Réutilise les styles de la vraie roue (mêmes couleurs, mêmes pictogrammes) :
// un import du même module CSS depuis un autre composant donne les mêmes
// classes générées, sans dupliquer la feuille de style.
import wheelStyles from "@/components/roulette/Wheel.module.css";
import styles from "./HeroWheelPreview.module.css";

const CATEGORY_BY_ID = Object.fromEntries(
  ENTRE_NOUS_CATEGORIES.map((category) => [category.id, category]),
) as Record<EntreNousCategoryId, (typeof ENTRE_NOUS_CATEGORIES)[number]>;

const SEGMENT_ANGLE = 360 / WHEEL_SEGMENTS.length;

const WHEEL_BACKGROUND = `conic-gradient(${WHEEL_SEGMENTS.map(
  (categoryId, index) =>
    `${CATEGORY_BY_ID[categoryId].wheelColor} ${index * SEGMENT_ANGLE}deg ${(index + 1) * SEGMENT_ANGLE}deg`,
).join(", ")})`;

// Catégorie mise en avant sous la flèche : "Douceur", avec une vraie question
// de la banque, pour illustrer fidèlement ce que montre l'app.
const FEATURED_CATEGORY: EntreNousCategoryId = "doux";
const FEATURED_INDEX = WHEEL_SEGMENTS.findIndex((id) => id === FEATURED_CATEGORY);
const FEATURED_ROTATION = (360 - (FEATURED_INDEX * SEGMENT_ANGLE + SEGMENT_ANGLE / 2) + 360) % 360;
const FEATURED_QUESTION = "Quel souvenir de nous deux te fait encore sourire rien que d'y penser ?";

export function HeroWheelPreview() {
  const featured = CATEGORY_BY_ID[FEATURED_CATEGORY];

  return (
    <div className={styles.wrapper}>
      <div className={wheelStyles.pointer} />
      <div className={styles.wheelContainer}>
        <div
          className={wheelStyles.wheel}
          style={{
            background: WHEEL_BACKGROUND,
            transform: `rotate(${FEATURED_ROTATION}deg)`,
            transition: "none",
          }}
        >
          {WHEEL_SEGMENTS.map((categoryId, index) => {
            const category = CATEGORY_BY_ID[categoryId];
            const centerAngle = index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2;
            const stripRotation = centerAngle - 90;
            return (
              <div
                key={index}
                className={wheelStyles.segmentSlot}
                style={{ transform: `rotate(${stripRotation}deg)` }}
              >
                <div
                  className={wheelStyles.segmentContent}
                  style={{
                    transform: `translate(-50%, -50%) rotate(${-(stripRotation + FEATURED_ROTATION)}deg)`,
                  }}
                >
                  <CategoryIcon
                    kind={category.id}
                    accent={category.iconAccent}
                    accentStrong={category.iconAccentStrong}
                    size={22}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className={wheelStyles.hub}>
          {/* eslint-disable-next-line @next/next/no-img-element -- asset vectoriel maître unique */}
          <img className={wheelStyles.hubLogo} src="/brand/oons-logo-primary.svg" alt="" />
        </div>
      </div>

      <div className={styles.questionCard} style={{ background: featured.wheelColor }}>
        <span className={styles.badge} style={{ color: featured.textColor }}>
          {featured.label}
        </span>
        <p className={styles.questionText}>{FEATURED_QUESTION}</p>
      </div>
    </div>
  );
}
