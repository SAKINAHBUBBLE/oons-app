import type { EntreNousCategory } from "@/data/entre-nous-questions";
import { CategoryIcon } from "@/components/entre-nous/CategoryIcon";
import styles from "./QuestionCard.module.css";

interface QuestionCardProps {
  category: EntreNousCategory;
  question: string;
  onClose: () => void;
  onNext: () => void;
}

export function QuestionCard({ category, question, onClose, onNext }: QuestionCardProps) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.card}
        style={{ backgroundColor: category.wheelColor }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Fermer"
        >
          ×
        </button>
        <CategoryIcon
          kind={category.id}
          accent={category.iconAccent}
          accentStrong={category.iconAccentStrong}
          size={72}
        />
        <p className={styles.categoryName} style={{ color: category.textColor }}>
          {category.label}
        </p>
        <p className={styles.question}>{question}</p>
        <button type="button" className={styles.nextButton} onClick={onNext}>
          Question suivante
        </button>
      </div>
    </div>
  );
}
