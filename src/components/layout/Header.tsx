"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <header className={styles.header}>
      <Link href="/" aria-label="Accueil Oons">
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
