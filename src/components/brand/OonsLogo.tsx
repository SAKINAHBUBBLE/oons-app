import styles from "./OonsLogo.module.css";

interface OonsLogoProps {
  /** Taille du logo en pixels (correspond à la hauteur du mot "Oons"). */
  size?: number;
  /** Affiche le slogan "En noble compagnie" sous le mot-symbole. */
  showSlogan?: boolean;
  /** Affiche les petits traits d'accentuation dispersés autour du mot-symbole. */
  showAccents?: boolean;
  /** Mot-symbole en crème (pour un fond foncé/saturé, ex. icône PWA). */
  inverted?: boolean;
  /** Force la couleur du mot-symbole (et du slogan), ex. pour l'icône PWA. */
  wordmarkColor?: string;
  className?: string;
}

export function OonsLogo({
  size = 96,
  showSlogan = true,
  showAccents = true,
  inverted = false,
  wordmarkColor,
  className,
}: OonsLogoProps) {
  return (
    <div
      className={[styles.wrap, inverted ? styles.inverted : "", className].filter(Boolean).join(" ")}
      style={{ fontSize: size }}
    >
      <div className={styles.wordmarkRow}>
        <span className={styles.wordmark} style={wordmarkColor ? { color: wordmarkColor } : undefined}>
          Oons
        </span>
        <svg className={styles.heart} viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 21s-6.7-4.35-9.3-8.28C.6 9.98 1.6 6.4 4.6 5.1c2-.86 4.1-.2 5.4 1.4 1.3-1.6 3.4-2.26 5.4-1.4 3 1.3 4 4.88 1.9 7.62C18.7 16.65 12 21 12 21z"
            fill="var(--color-accent-pink)"
          />
        </svg>
        {showAccents && (
          <>
            <span className={styles.dashCommaTop} aria-hidden="true" />
            <span className={styles.dashRightLong} aria-hidden="true" />
            <span className={styles.dashRightShort} aria-hidden="true" />
          </>
        )}
      </div>

      {showSlogan && (
        <div className={styles.sloganWrap}>
          {showAccents && (
            <>
              <span className={styles.dashSloganLeft} aria-hidden="true" />
              <span className={styles.dashSloganLeftSmall} aria-hidden="true" />
            </>
          )}
          <span className={styles.slogan}>En noble compagnie</span>
          <svg className={styles.underline} viewBox="0 0 120 16" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M2 10 C 30 -2, 90 -2, 118 8"
              fill="none"
              stroke="var(--color-accent-gold)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
