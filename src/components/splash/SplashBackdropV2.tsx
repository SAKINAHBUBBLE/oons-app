import styles from "./SplashBackdropV2.module.css";

// Fond "Minimal Premium" de la nouvelle identité Oons : uniquement quatre
// grands aplats de couleur organiques, ancrés aux coins, partiellement hors
// cadre. Ce ne sont pas des illustrations ni des motifs — aucune feuille,
// fleur, cœur, étoile, trait ou petit élément décoratif ne doit être ajouté
// ici (c'est justement ce que cette nouvelle identité abandonne).
const BLOB_PATHS = {
  topLeft: "M0 0 H100 C82 20 88 38 68 52 C46 67 54 86 30 96 C14 103 0 96 0 78 Z",
  topRight: "M100 0 H0 C18 20 12 38 32 52 C54 67 46 86 70 96 C86 103 100 96 100 78 Z",
  bottomLeft: "M0 100 H100 C82 80 88 62 68 48 C46 33 54 14 30 4 C14 -3 0 4 0 22 Z",
  bottomRight: "M100 100 H0 C18 80 12 62 32 48 C54 33 46 14 70 4 C86 -3 100 4 100 22 Z",
} as const;

export function SplashBackdropV2() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <svg className={`${styles.blob} ${styles.topLeft}`} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d={BLOB_PATHS.topLeft} fill="var(--color-v2-blob-pink)" />
      </svg>
      <svg className={`${styles.blob} ${styles.topRight}`} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d={BLOB_PATHS.topRight} fill="var(--color-v2-blob-butter)" />
      </svg>
      <svg className={`${styles.blob} ${styles.bottomLeft}`} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d={BLOB_PATHS.bottomLeft} fill="var(--color-v2-blob-peach)" />
      </svg>
      <svg className={`${styles.blob} ${styles.bottomRight}`} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d={BLOB_PATHS.bottomRight} fill="var(--color-v2-blob-lavender)" />
      </svg>
    </div>
  );
}
