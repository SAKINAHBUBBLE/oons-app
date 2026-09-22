import Image from "next/image";
import Link from "next/link";
import { ENTRE_NOUS_CATEGORIES } from "@/data/entre-nous-questions";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Oons</h1>
      <div className={styles.categories}>
        {ENTRE_NOUS_CATEGORIES.map((category) => (
          <Image
            key={category.id}
            src={category.icon}
            alt={category.label}
            width={64}
            height={60}
            className={styles.categoryIcon}
          />
        ))}
      </div>
      <div className={styles.actions}>
        <Link href="/entre-nous" className={styles.primaryButton}>
          Roulette Entre Nous
        </Link>
        <Link href="/paiement" className={styles.secondaryButton}>
          Accès premium
        </Link>
      </div>
    </main>
  );
}
