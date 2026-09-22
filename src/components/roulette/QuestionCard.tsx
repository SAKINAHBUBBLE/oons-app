import Image from "next/image";
import type { EntreNousCategory } from "@/data/entre-nous-questions";
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
        style={{ backgroundColor: category.color }}
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
        <Image
          src={category.icon}
          alt={category.label}
          width={84}
          height={79}
          className={styles.badge}
        />
        <p className={styles.question}>{question}</p>
        <button type="button" className={styles.nextButton} onClick={onNext}>
          Question suivante
        </button>
      </div>
    </div>
  );
}
