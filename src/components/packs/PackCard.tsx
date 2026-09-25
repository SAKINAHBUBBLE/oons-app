import Link from "next/link";
import type { Pack } from "@/data/packs";
import { PackIcon } from "./PackIcon";
import styles from "./PackCard.module.css";

interface PackCardProps {
  pack: Pack;
  onLocked: () => void;
}

function CardContent({ pack }: { pack: Pack }) {
  const locked = pack.status === "coming-soon";
  return (
    <>
      <PackIcon
        kind={pack.icon}
        accent={pack.colors.iconAccent}
        accentStrong={pack.colors.iconAccentStrong}
        halo={pack.colors.halo}
      />
      {locked && <span className={styles.badge}>Bientôt disponible</span>}
      <span className={styles.name} style={{ color: pack.colors.title }}>
        {pack.name}
      </span>
      <span className={styles.subtitle}>{pack.subtitle}</span>
      {!locked && (
        <span className={styles.cta}>
          Commencer <span aria-hidden="true">→</span>
        </span>
      )}
    </>
  );
}

export function PackCard({ pack, onLocked }: PackCardProps) {
  const style = {
    background: pack.colors.cardBg,
    borderColor: pack.colors.cardBorder ?? "transparent",
  };

  if (pack.status === "coming-soon") {
    return (
      <button
        type="button"
        className={`${styles.card} ${pack.featured ? styles.featured : ""}`}
        style={style}
        onClick={onLocked}
      >
        <CardContent pack={pack} />
      </button>
    );
  }

  return (
    <Link
      href={pack.href}
      className={`${styles.card} ${styles.active} ${pack.featured ? styles.featured : ""}`}
      style={style}
    >
      <CardContent pack={pack} />
    </Link>
  );
}
