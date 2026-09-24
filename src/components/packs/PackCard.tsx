import Image from "next/image";
import Link from "next/link";
import type { Pack } from "@/data/packs";
import styles from "./PackCard.module.css";

interface PackCardProps {
  pack: Pack;
  onLocked: () => void;
}

function CardContent({ pack, locked }: { pack: Pack; locked: boolean }) {
  return (
    <>
      {locked && <span className={styles.badge}>À venir</span>}
      {pack.icon ? (
        <Image src={pack.icon} alt="" width={56} height={53} className={styles.icon} />
      ) : (
        <span className={styles.lockIcon} aria-hidden="true">
          🔒
        </span>
      )}
      <span className={styles.name}>{pack.name}</span>
    </>
  );
}

export function PackCard({ pack, onLocked }: PackCardProps) {
  if (pack.status === "coming-soon") {
    return (
      <button
        type="button"
        className={`${styles.card} ${styles.locked}`}
        onClick={onLocked}
      >
        <CardContent pack={pack} locked />
      </button>
    );
  }

  return (
    <Link href={pack.href} className={styles.card}>
      <CardContent pack={pack} locked={false} />
    </Link>
  );
}
