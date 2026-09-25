"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./BottomNav.module.css";

const TABS = [
  {
    href: "/app",
    label: "Accueil",
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
        <path
          d="M4 11.5 12 4l8 7.5V20a1 1 0 01-1 1h-4.5a.5.5 0 01-.5-.5V15a1 1 0 00-1-1h-2a1 1 0 00-1 1v5.5a.5.5 0 01-.5.5H5a1 1 0 01-1-1z"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/app/favoris",
    label: "Favoris",
    icon: () => (
      <svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true">
        <path
          d="M12 20s-7.2-4.4-9.8-8.7C.6 8 1.7 4.2 5 3c2.2-.9 4.4-.2 5.8 1.5C12.2 2.8 14.4 2.1 16.6 3c3.3 1.2 4.4 5 2.8 8.3C16.8 15.6 12 20 12 20z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/app/profil",
    label: "Profil",
    icon: () => (
      <svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true">
        <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M4.5 20c1.2-3.6 4.2-5.5 7.5-5.5s6.3 1.9 7.5 5.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`${styles.tab} ${active ? styles.active : ""}`}
          >
            {tab.icon(active)}
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
