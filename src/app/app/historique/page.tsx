"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SplashBackdrop } from "@/components/splash/SplashBackdrop";
import { BottomNav } from "@/components/layout/BottomNav";
import { useAuthUser } from "@/lib/useAuthUser";
import styles from "../page.module.css";
import stubStyles from "../stub.module.css";

export default function HistoriquePage() {
  const router = useRouter();
  const user = useAuthUser();

  useEffect(() => {
    if (user === null) {
      router.replace("/connexion");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <main className={styles.page}>
      <SplashBackdrop />
      <div className={stubStyles.stubContent}>
        <h1 className={stubStyles.stubTitle}>Historique</h1>
        <p className={stubStyles.stubText}>
          Bientôt, retrouve ici les questions que la roue t&apos;a déjà proposées.
        </p>
      </div>
      <BottomNav />
    </main>
  );
}
