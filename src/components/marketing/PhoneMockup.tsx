import styles from "./PhoneMockup.module.css";

interface PhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
}

export function PhoneMockup({ src, alt, className }: PhoneMockupProps) {
  return (
    <div className={`${styles.frame} ${className ?? ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- capture d'écran statique de l'app, taille fixe, pas d'optimisation Next nécessaire */}
      <img className={styles.screen} src={src} alt={alt} />
    </div>
  );
}
