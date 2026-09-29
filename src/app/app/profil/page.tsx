"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { SplashBackdropV2 } from "@/components/splash/SplashBackdropV2";
import { BottomNav } from "@/components/layout/BottomNav";
import { SettingsGearIcon } from "@/components/icons/SettingsGearIcon";
import { getFirebaseAuth } from "@/lib/firebase";
import { useAuthUser } from "@/lib/useAuthUser";
import { useFavorites } from "@/lib/favorites";
import { useLockedToast } from "@/lib/useLockedToast";
import styles from "./page.module.css";

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5.5 19.5c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10.5V8a4 4 0 118 0v2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
      <rect x="3.5" y="6" width="17" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
      <path d="M6 10.5a6 6 0 0112 0c0 3.6 1 5 1.6 5.8H4.4C5 15.5 6 14.1 6 10.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 004 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.8 12h16.4M12 3.8c2.3 2.2 3.5 5.1 3.5 8.2s-1.2 6-3.5 8.2c-2.3-2.2-3.5-5.1-3.5-8.2s1.2-6 3.5-8.2z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.5 9.3a2.5 2.5 0 114 2c-.9.7-1.5 1.2-1.5 2.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
      <path d="M6 3.5h9l3 3v14a1 1 0 01-1 1H6a1 1 0 01-1-1v-16a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.5 12.5h7M8.5 16h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
      <path d="M12 3.5l7 2.6v5.3c0 4.6-3 7.9-7 9.1-4-1.2-7-4.5-7-9.1V6.1l7-2.6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true">
      <path d="M9 4H6a1 1 0 00-1 1v14a1 1 0 001 1h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M13 8l4 4-4 4M17 12H9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface AccountRow {
  icon: () => ReactNode;
  label: string;
  href?: string;
}

export default function ProfilPage() {
  const router = useRouter();
  const user = useAuthUser();
  const { favorites } = useFavorites();
  const { visible: toastVisible, show: showToast } = useLockedToast();

  useEffect(() => {
    if (user === null) {
      router.replace("/connexion");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const firstName = user.displayName?.trim() || user.email?.split("@")[0] || "";
  const initial = (firstName || "?").charAt(0).toUpperCase();

  const accountRows: AccountRow[] = [
    { icon: PersonIcon, label: "Informations personnelles" },
    { icon: LockIcon, label: "Modifier le mot de passe" },
    { icon: CardIcon, label: "Mes achats et packs", href: "/paiement" },
    { icon: BellIcon, label: "Notifications" },
    { icon: GlobeIcon, label: "Langue" },
  ];

  const helpRows: AccountRow[] = [
    { icon: HelpIcon, label: "Aide & contact" },
    { icon: DocIcon, label: "CGV et mentions légales" },
    { icon: ShieldIcon, label: "Politique de confidentialité" },
  ];

  return (
    <main className={styles.page}>
      <SplashBackdropV2 />
      <div className={styles.content}>
        <div className={styles.topBar}>
          {/* eslint-disable-next-line @next/next/no-img-element -- asset vectoriel maître unique */}
          <img className={styles.logo} src="/brand/oons-logo-primary.svg" alt="Oons" />
          <Link href="/app/parametres" className={styles.settingsButton} aria-label="Paramètres">
            <SettingsGearIcon />
          </Link>
        </div>

        <h1 className={styles.title}>Mon espace</h1>
        <p className={styles.subtitle}>Bienvenue, {firstName}.</p>

        <div className={styles.identityCard}>
          <div className={styles.avatar}>{initial}</div>
          <div className={styles.identityText}>
            <span className={styles.name}>{firstName}</span>
            {user.email && <span className={styles.email}>{user.email}</span>}
          </div>
          <button type="button" className={styles.editButton} onClick={showToast}>
            Modifier
          </button>
        </div>

        <h2 className={styles.sectionTitle}>Mon Oons</h2>
        <div className={styles.shortcuts}>
          <Link href="/app/favoris" className={styles.shortcut} style={{ background: "var(--color-v2-pack-rose-bg)" }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
              <path
                d="M12 20.2s-7.2-4.4-9.8-8.7C.6 8 1.7 4.2 5 3c2.2-.9 4.4-.2 5.8 1.5C12.2 2.8 14.4 2.1 16.6 3c3.3 1.2 4.4 5 2.8 8.3C16.8 15.8 12 20.2 12 20.2z"
                stroke="var(--color-v2-coral)"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
            </svg>
            <span>Mes favoris{favorites.length > 0 ? ` (${favorites.length})` : ""}</span>
          </Link>
          <Link href="/app/historique" className={styles.shortcut} style={{ background: "var(--color-v2-pack-violet-bg)" }}>
            <svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true">
              <path d="M12 7v5l3.5 2" stroke="var(--color-v2-icon-decale-b)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.5 9A7.5 7.5 0 1112 19.5" stroke="var(--color-v2-icon-decale-b)" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M4.5 9V4.5M4.5 9H9" stroke="var(--color-v2-icon-decale-b)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Mon historique</span>
          </Link>
          <Link href="/packs" className={styles.shortcut} style={{ background: "var(--color-v2-pack-yellow-bg)" }}>
            <svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true">
              <rect x="4" y="9" width="16" height="10" rx="2" stroke="var(--color-v2-card-yellow-text)" strokeWidth="1.7" />
              <path d="M4 9l8-5 8 5" stroke="var(--color-v2-card-yellow-text)" strokeWidth="1.7" strokeLinejoin="round" />
            </svg>
            <span>Mes packs</span>
          </Link>
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitleInCard}>Mon compte</h2>
          {accountRows.map((row) => (
            <RowButton key={row.label} row={row} onLocked={showToast} />
          ))}
        </div>

        <div className={styles.card}>
          {helpRows.map((row) => (
            <RowButton key={row.label} row={row} onLocked={showToast} />
          ))}
        </div>

        <button
          type="button"
          className={styles.signOutButton}
          onClick={() => signOut(getFirebaseAuth())}
        >
          <LogoutIcon />
          Se déconnecter
        </button>
      </div>

      {toastVisible && <div className={styles.toast}>Bientôt disponible</div>}

      <BottomNav variant="compact" />
    </main>
  );
}

function RowButton({ row, onLocked }: { row: AccountRow; onLocked: () => void }) {
  const Icon = row.icon;
  const content = (
    <>
      <Icon />
      <span className={styles.rowLabel}>{row.label}</span>
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </>
  );

  if (row.href) {
    return (
      <Link href={row.href} className={styles.row}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={styles.row} onClick={onLocked}>
      {content}
    </button>
  );
}
