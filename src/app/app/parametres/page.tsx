"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { SplashBackdropV2 } from "@/components/splash/SplashBackdropV2";
import { getFirebaseAuth } from "@/lib/firebase";
import { useAuthUser } from "@/lib/useAuthUser";
import { useLockedToast } from "@/lib/useLockedToast";
import styles from "./page.module.css";

const NOTIFICATIONS_STORAGE_KEY = "oons-pref-notifications";

function readNotificationsPref(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    return raw === null ? true : raw === "1";
  } catch {
    return true;
  }
}

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

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
      <path d="M4 7h16M9.5 7V5a1 1 0 011-1h3a1 1 0 011 1v2M6.5 7l1 13a1 1 0 001 1h7a1 1 0 001-1l1-13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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

export default function ParametresPage() {
  const router = useRouter();
  const user = useAuthUser();
  const { visible: toastVisible, show: showToast } = useLockedToast();
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture localStorage, indisponible au rendu serveur
    setNotifications(readNotificationsPref());
  }, []);

  useEffect(() => {
    if (user === null) {
      router.replace("/connexion");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  function toggleNotifications() {
    setNotifications((previous) => {
      const next = !previous;
      try {
        window.localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, next ? "1" : "0");
      } catch {
        // localStorage indisponible : la préférence ne sera simplement pas mémorisée.
      }
      return next;
    });
  }

  return (
    <main className={styles.page}>
      <SplashBackdropV2 />
      <div className={styles.content}>
        <div className={styles.topBar}>
          <Link href="/app/profil" className={styles.backButton} aria-label="Retour au profil">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
              <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          {/* eslint-disable-next-line @next/next/no-img-element -- asset vectoriel maître unique */}
          <img className={styles.logo} src="/brand/oons-logo-primary.svg" alt="Oons" />
        </div>

        <h1 className={styles.title}>Paramètres</h1>
        <p className={styles.subtitle}>Personnalisez votre expérience chez Oons.</p>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Préférences de l&apos;app</h2>
          <div className={styles.row}>
            <BellIcon />
            <span className={styles.rowLabel}>Notifications</span>
            <button
              type="button"
              className={`${styles.toggle} ${notifications ? styles.toggleOn : ""}`}
              role="switch"
              aria-checked={notifications}
              aria-label="Notifications"
              onClick={toggleNotifications}
            >
              <span className={styles.toggleKnob} />
            </button>
          </div>
          <LockedRow icon={GlobeIcon} label="Langue" value="Français" onClick={showToast} />
          <div className={styles.row}>
            <MoonIcon />
            <span className={styles.rowLabel}>Mode sombre</span>
            <button
              type="button"
              className={styles.toggle}
              role="switch"
              aria-checked={false}
              aria-label="Mode sombre"
              onClick={showToast}
            >
              <span className={styles.toggleKnob} />
            </button>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Mon compte</h2>
          <LockedRow icon={PersonIcon} label="Informations personnelles" onClick={showToast} />
          <LockedRow icon={LockIcon} label="Modifier le mot de passe" onClick={showToast} />
          <Link href="/paiement" className={styles.row}>
            <CardIcon />
            <span className={styles.rowLabel}>Mes achats et packs</span>
            <ChevronIcon />
          </Link>
          <LockedRow icon={TrashIcon} label="Supprimer mon compte" onClick={showToast} />
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Aide &amp; informations</h2>
          <LockedRow icon={HelpIcon} label="Aide & contact" onClick={showToast} />
          <LockedRow icon={DocIcon} label="Conditions générales de vente" onClick={showToast} />
          <LockedRow icon={ShieldIcon} label="Politique de confidentialité" onClick={showToast} />
        </div>

        <button type="button" className={styles.signOutButton} onClick={() => signOut(getFirebaseAuth())}>
          <LogoutIcon />
          Se déconnecter
        </button>
      </div>

      {toastVisible && <div className={styles.toast}>Bientôt disponible</div>}
    </main>
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

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="none" aria-hidden="true">
      <path d="M20 14.5A8.5 8.5 0 019.5 4a8.5 8.5 0 1010.5 10.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockedRow({
  icon: Icon,
  label,
  value,
  onClick,
}: {
  icon: () => ReactNode;
  label: string;
  value?: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className={styles.row} onClick={onClick}>
      <Icon />
      <span className={styles.rowLabel}>{label}</span>
      {value && <span className={styles.rowValue}>{value}</span>}
      <ChevronIcon />
    </button>
  );
}
