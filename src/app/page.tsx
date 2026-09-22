import Image from "next/image";
import Link from "next/link";
import { HomeBackdrop } from "@/components/home/HomeBackdrop";
import { ENTRE_NOUS_CATEGORIES } from "@/data/entre-nous-questions";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <HomeBackdrop />
      <div className={styles.content}>
        <Image
          src="/logo.webp"
          alt="Oons"
          width={240}
          height={120}
          className={styles.logo}
          priority
        />
        <p className={styles.tagline}>Une même âme, trois univers possibles. ♡</p>

        <p className={styles.slogan}>Explore · Ressens · Avance</p>
        <p className={styles.subtitle}>Petites questions, grands déclics.</p>

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
      </div>
    </main>
  );
}
