import type { CSSProperties, ReactNode } from "react";
import styles from "./PhoneMockup.module.css";

interface PhoneMockupProps {
  src?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  // Équivalent du texte alternatif quand l'écran est construit en composants
  // (pas une image) : décrit l'ensemble pour les lecteurs d'écran, qui
  // ignorent alors le détail du contenu (rendu `aria-hidden`) pour ne pas
  // fragmenter la description en dizaines de petits éléments.
  ariaLabel?: string;
  // Contenu construit en code (ex. la roue) plutôt qu'une capture d'écran :
  // remplace `src`/`alt` quand fourni.
  children?: ReactNode;
}

export function PhoneMockup({ src, alt, className, style, ariaLabel, children }: PhoneMockupProps) {
  return (
    <div
      className={`${styles.frame} ${className ?? ""}`}
      style={style}
      role={children && ariaLabel ? "img" : undefined}
      aria-label={children ? ariaLabel : undefined}
    >
      {children ? (
        <div className={styles.screen} aria-hidden={ariaLabel ? true : undefined}>
          {children}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- capture d'écran statique de l'app, taille fixe, pas d'optimisation Next nécessaire
        <img className={styles.screen} src={src} alt={alt ?? ""} />
      )}
    </div>
  );
}
