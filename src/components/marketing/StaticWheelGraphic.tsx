import { ENTRE_NOUS_CATEGORIES, WHEEL_SEGMENTS, type EntreNousCategoryId } from "@/data/entre-nous-questions";
import { CategoryIcon } from "@/components/entre-nous/CategoryIcon";
// Réutilise les styles de la vraie roue (mêmes couleurs, mêmes pictogrammes) :
// un import du même module CSS depuis un autre composant donne les mêmes
// classes générées, sans dupliquer la feuille de style.
import wheelStyles from "@/components/roulette/Wheel.module.css";
import styles from "./StaticWheelGraphic.module.css";

const CATEGORY_BY_ID = Object.fromEntries(
  ENTRE_NOUS_CATEGORIES.map((category) => [category.id, category]),
) as Record<EntreNousCategoryId, (typeof ENTRE_NOUS_CATEGORIES)[number]>;

const SEGMENT_ANGLE = 360 / WHEEL_SEGMENTS.length;

const WHEEL_BACKGROUND = `conic-gradient(${WHEEL_SEGMENTS.map(
  (categoryId, index) =>
    `${CATEGORY_BY_ID[categoryId].wheelColor} ${index * SEGMENT_ANGLE}deg ${(index + 1) * SEGMENT_ANGLE}deg`,
).join(", ")})`;

interface StaticWheelGraphicProps {
  // Catégorie dont le segment doit se retrouver aligné sous la flèche.
  featuredCategory: EntreNousCategoryId;
  // Diamètre de la roue en px ; la flèche et le moyeu s'adaptent avec elle.
  size: number;
}

// Roue non interactive (pas de spin, pas de son) : reproduit exactement la
// géométrie de la vraie roue pour un seul segment fixe, utilisée dans les
// mockups marketing (hero, aperçu des écrans réels).
export function StaticWheelGraphic({ featuredCategory, size }: StaticWheelGraphicProps) {
  const featuredIndex = WHEEL_SEGMENTS.findIndex((id) => id === featuredCategory);
  const rotation = (360 - (featuredIndex * SEGMENT_ANGLE + SEGMENT_ANGLE / 2) + 360) % 360;
  const iconSize = Math.round(size * 0.148);

  return (
    <>
      <div className={wheelStyles.pointer} />
      <div className={styles.wheelContainer} style={{ width: size, height: size }}>
        <div
          className={wheelStyles.wheel}
          style={{
            background: WHEEL_BACKGROUND,
            transform: `rotate(${rotation}deg)`,
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
                    transform: `translate(-50%, -50%) rotate(${-(stripRotation + rotation)}deg)`,
                  }}
                >
                  <CategoryIcon
                    kind={category.id}
                    accent={category.iconAccent}
                    accentStrong={category.iconAccentStrong}
                    size={iconSize}
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
    </>
  );
}
