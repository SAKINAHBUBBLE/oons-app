import Link from "next/link";
import type { PackV2 } from "@/data/packs-v2";
import { PackIconV2 } from "./PackIconV2";
import styles from "./PackCardV2.module.css";

interface PackCardV2Props {
  pack: PackV2;
  onLocked: () => void;
}

function CardContent({ pack }: { pack: PackV2 }) {
  const locked = pack.status === "coming-soon";
  return (
    <>
      <PackIconV2
        kind={pack.icon}
        accent={pack.colors.iconAccent}
        accentStrong={pack.colors.iconAccentStrong}
      />
      <span className={styles.name} style={{ color: pack.colors.title }}>
        {pack.name}
      </span>
      <span className={styles.subtitle}>{pack.subtitle}</span>
      {locked ? (
        <span className={styles.badge}>Bientôt disponible</span>
      ) : (
        <span className={styles.cta}>
          Commencer <span aria-hidden="true">→</span>
        </span>
      )}
    </>
  );
}

export function PackCardV2({ pack, onLocked }: PackCardV2Props) {
  const style = { background: pack.colors.cardBg };

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
