import styles from "./PoemContent.module.css";

// Texte verrouillé : à reproduire mot pour mot, sans reformulation ni coupe.
const STANZAS = [
  ["Déposez les masques et les filtres,", "Préparez-vous à voyager", "du rire aux larmes."],
  ["Ici, chaque émotion est une promesse,", "Un instant de grâce qui rapproche", "et qui lie."],
  ["Installez-vous sans réserve :", "Vous êtes en noble compagnie."],
];

interface PoemContentProps {
  ctaLabel: string;
  onCta: () => void;
}

export function PoemContent({ ctaLabel, onCta }: PoemContentProps) {
  return (
    <div className={styles.content}>
      {/* eslint-disable-next-line @next/next/no-img-element -- asset vectoriel maître unique */}
      <img className={styles.logo} src="/brand/oons-logo-primary.svg" alt="Oons" />

      <div className={styles.poem}>
        {STANZAS.map((stanza, index) => (
          <div key={index} className={styles.stanzaGroup}>
            {index > 0 && <span className={styles.separator} aria-hidden="true" />}
            <p className={styles.stanza}>
              {stanza.map((line, lineIndex) => (
                <span key={lineIndex} className={styles.line}>
                  {line}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>

      <h1 className={styles.title}>
        Bienvenue chez <span className={styles.titleAccent}>Oons.</span>
      </h1>

      <button type="button" className={styles.enterButton} onClick={onCta}>
        {ctaLabel}
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
