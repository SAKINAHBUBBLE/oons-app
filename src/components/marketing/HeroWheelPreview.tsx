import { ENTRE_NOUS_CATEGORIES, type EntreNousCategoryId } from "@/data/entre-nous-questions";
import { StaticWheelGraphic } from "@/components/marketing/StaticWheelGraphic";
import styles from "./HeroWheelPreview.module.css";

const CATEGORY_BY_ID = Object.fromEntries(
  ENTRE_NOUS_CATEGORIES.map((category) => [category.id, category]),
) as Record<EntreNousCategoryId, (typeof ENTRE_NOUS_CATEGORIES)[number]>;

// Catégorie mise en avant sous la flèche : "Douceur", avec une vraie question
// de la banque, pour illustrer fidèlement ce que montre l'app.
const FEATURED_CATEGORY: EntreNousCategoryId = "doux";
const FEATURED_QUESTION = "Quel souvenir de nous deux te fait encore sourire rien que d'y penser ?";

export function HeroWheelPreview() {
  const featured = CATEGORY_BY_ID[FEATURED_CATEGORY];

  return (
    <div className={styles.wrapper}>
      <div className={styles.wheelSlot}>
        <StaticWheelGraphic featuredCategory={FEATURED_CATEGORY} size={148} />
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
