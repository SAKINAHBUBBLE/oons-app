"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();

  // Seuls les écrans de paiement utilisent encore ce petit logo de nav :
  // toutes les autres pages affichent désormais leur propre grand logo en
  // hero (splash, packs, connexion, roue, questions, bienvenue...), où ce
  // logo ferait doublon.
  if (!pathname.startsWith("/paiement")) {
    return null;
  }

  return (
    <header className={styles.header}>
      <Link href="/packs" aria-label="Accueil Oons">
        <Image
          src="/logo.webp"
          alt="Oons"
          width={160}
          height={80}
          className={styles.logo}
          priority
        />
      </Link>
    </header>
  );
}
