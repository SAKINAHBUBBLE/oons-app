import Link from "next/link";
import styles from "../page.module.css";

export default function PaiementAnnulePage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Paiement annulé</h1>
      <p className={styles.price}>Aucun montant n&apos;a été débité.</p>
      <Link href="/paiement">Réessayer</Link>
    </main>
  );
}
