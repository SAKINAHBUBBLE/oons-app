import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export function Header() {
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
