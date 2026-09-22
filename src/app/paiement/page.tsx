"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function PaiementPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      if (!response.ok) {
        throw new Error("La création de la session de paiement a échoué.");
      }
      const { url } = await response.json();
      window.location.href = url;
    } catch {
      setError("Une erreur est survenue. Réessaie dans un instant.");
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Accès premium Oons App</h1>
      <p className={styles.price}>9,99 €</p>
      <button
        type="button"
        className={styles.payButton}
        onClick={handlePay}
        disabled={loading}
      >
        {loading ? "Redirection..." : "Payer"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </main>
  );
}
