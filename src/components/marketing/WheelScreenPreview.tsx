import { SettingsGearIcon } from "@/components/icons/SettingsGearIcon";
import { InfoIcon } from "@/components/icons/InfoIcon";
import { StaticWheelGraphic } from "@/components/marketing/StaticWheelGraphic";
import type { EntreNousCategoryId } from "@/data/entre-nous-questions";
import styles from "./WheelScreenPreview.module.css";

const NAV_TABS = [
  {
    label: "Accueil",
    active: true,
    path: "M4 11.5 12 4l8 7.5V20a1 1 0 01-1 1h-4.5a.5.5 0 01-.5-.5V15a1 1 0 00-1-1h-2a1 1 0 00-1 1v5.5a.5.5 0 01-.5.5H5a1 1 0 01-1-1z",
  },
  {
    label: "Historique",
    active: false,
    path: "M12 7v5l3.5 2M4.5 9A7.5 7.5 0 1112 19.5M4.5 9V4.5M4.5 9H9",
  },
  {
    label: "Favoris",
    active: false,
    path: "M12 20s-7.2-4.4-9.8-8.7C.6 8 1.7 4.2 5 3c2.2-.9 4.4-.2 5.8 1.5C12.2 2.8 14.4 2.1 16.6 3c3.3 1.2 4.4 5 2.8 8.3C16.8 15.6 12 20 12 20z",
  },
  {
    label: "Profil",
    active: false,
    path: "M4.5 20c1.2-3.6 4.2-5.5 7.5-5.5s6.3 1.9 7.5 5.5",
    circle: true,
  },
];

interface WheelScreenPreviewProps {
  featuredCategory: EntreNousCategoryId;
}

// Reconstruit l'écran d'accueil (la roue) réel en version statique et
// réduite pour l'aperçu de la page de vente — AppHome lui-même exige un
// compte connecté et ne peut pas s'afficher ici.
export function WheelScreenPreview({ featuredCategory }: WheelScreenPreviewProps) {
  return (
    <div className={styles.previewScreen}>
      <div className={styles.topBar}>
        <span className={styles.iconButton} data-side="left" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
            <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element -- asset vectoriel maître unique */}
        <img className={styles.logo} src="/brand/oons-logo-primary.svg" alt="" />
        <span className={styles.iconButton} data-side="right-inner" aria-hidden="true">
          <InfoIcon size={13} />
        </span>
        <span className={styles.iconButton} data-side="right" aria-hidden="true">
          <SettingsGearIcon size={13} />
        </span>
      </div>

      <h3 className={styles.title}>
        Et si on laissait
        <br />
        la roue choisir ?
      </h3>

      <div className={styles.wheelSlot}>
        <StaticWheelGraphic featuredCategory={featuredCategory} size={168} />
      </div>

      <nav className={styles.bottomNav} aria-hidden="true">
        {NAV_TABS.map((tab) => (
          <span key={tab.label} className={styles.navTab} data-active={tab.active}>
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none">
              {tab.circle && <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />}
              <path
                d={tab.path}
                fill={!tab.circle && tab.active ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            <span className={styles.navLabel}>{tab.label}</span>
          </span>
        ))}
      </nav>
    </div>
  );
}
