"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { SplashBackdrop } from "@/components/splash/SplashBackdrop";
import { BottomNav } from "@/components/layout/BottomNav";
import { getFirebaseAuth } from "@/lib/firebase";
import { useAuthUser } from "@/lib/useAuthUser";
import styles from "../page.module.css";
import stubStyles from "../stub.module.css";

export default function ProfilPage() {
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
        <h1 className={stubStyles.stubTitle}>Profil</h1>
        {user.email && <p className={stubStyles.stubText}>{user.email}</p>}

        <Link href="/paiement" className={stubStyles.premiumLink}>
          Accès premium
        </Link>

        <button
          type="button"
          className={stubStyles.signOutButton}
          onClick={() => signOut(getFirebaseAuth())}
        >
          Se déconnecter
        </button>
      </div>
      <BottomNav />
    </main>
  );
}
