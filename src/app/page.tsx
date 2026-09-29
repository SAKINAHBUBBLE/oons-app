"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SplashBackdropV2 } from "@/components/splash/SplashBackdropV2";
import styles from "./page.module.css";

const SPLASH_DURATION_MS = 2400;

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      router.replace("/packs");
    }, SPLASH_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [router]);

  return (
    <main className={styles.page}>
      <SplashBackdropV2 />
      <div className={styles.content}>
        {/* eslint-disable-next-line @next/next/no-img-element -- asset vectoriel maître unique, pas d'optimisation Next nécessaire */}
        <img className={styles.logo} src="/brand/oons-logo-primary.svg" alt="Oons" />
      </div>
    </main>
  );
}
