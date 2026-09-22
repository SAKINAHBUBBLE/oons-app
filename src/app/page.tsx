import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Oons App</h1>
      <Link href="/entre-nous" className={styles.link}>
        Roulette Entre Nous
      </Link>
      <Link href="/paiement" className={styles.link}>
        Accès premium
      </Link>
    </main>
  );
}
