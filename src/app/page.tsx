"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { OonsLogo } from "@/components/brand/OonsLogo";
import { SplashBackdrop } from "@/components/splash/SplashBackdrop";
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
      <SplashBackdrop />
      <div className={styles.content}>
        <OonsLogo size={112} />
      </div>
    </main>
  );
}
