"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { HomeBackdrop } from "@/components/home/HomeBackdrop";
import { PackCard } from "@/components/packs/PackCard";
import { PACKS } from "@/data/packs";
import styles from "./page.module.css";

const TOAST_DURATION_MS = 2200;

export default function PacksPage() {
  const [toast, setToast] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleLocked() {
    setToast(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setToast(false), TOAST_DURATION_MS);
  }

  return (
    <main className={styles.page}>
      <HomeBackdrop />
      <div className={styles.content}>
        <Image
          src="/logo.webp"
          alt="Oons"
          width={200}
          height={100}
          className={styles.logo}
          priority
        />
        <h1 className={styles.title}>Choisis ton pack</h1>

        <div className={styles.grid}>
          {PACKS.map((pack) => (
            <PackCard key={pack.id} pack={pack} onLocked={handleLocked} />
          ))}
        </div>
      </div>

      {toast && <div className={styles.toast}>Bientôt disponible</div>}
    </main>
  );
}
