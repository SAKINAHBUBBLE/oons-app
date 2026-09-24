import Link from "next/link";
import styles from "../page.module.css";

export default function PaiementSuccesPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Paiement réussi</h1>
      <p className={styles.price}>Merci ! Ton accès premium est activé.</p>
      <Link href="/packs" className={styles.payButton}>
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
