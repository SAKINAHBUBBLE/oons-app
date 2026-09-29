import type { ReactNode } from "react";
import styles from "./PhoneMockup.module.css";

interface PhoneMockupProps {
  src?: string;
  alt?: string;
  className?: string;
  // Contenu construit en code (ex. la roue) plutôt qu'une capture d'écran :
  // remplace `src`/`alt` quand fourni.
  children?: ReactNode;
}

export function PhoneMockup({ src, alt, className, children }: PhoneMockupProps) {
  return (
    <div className={`${styles.frame} ${className ?? ""}`}>
      {children ? (
        <div className={styles.screen}>{children}</div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- capture d'écran statique de l'app, taille fixe, pas d'optimisation Next nécessaire
        <img className={styles.screen} src={src} alt={alt ?? ""} />
      )}
    </div>
  );
}
