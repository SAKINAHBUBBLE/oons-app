import { QUESTION_SCREENS } from "@/data/question-screens";
import { CategoryIcon } from "@/components/entre-nous/CategoryIcon";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { SettingsGearIcon } from "@/components/icons/SettingsGearIcon";
import type { EntreNousCategoryId } from "@/data/entre-nous-questions";
import styles from "./QuestionScreenPreview.module.css";

const NAV_TABS = [
  {
    label: "Accueil",
    active: true,
    path: "M4 11.5 12 4l8 7.5V20a1 1 0 01-1 1h-4.5a.5.5 0 01-.5-.5V15a1 1 0 00-1-1h-2a1 1 0 00-1 1v5.5a.5.5 0 01-.5.5H5a1 1 0 01-1-1z",
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

interface QuestionScreenPreviewProps {
  categoryId: EntreNousCategoryId;
  questionText: string;
}

// Reconstruit l'écran de question réel (même config par catégorie que
// QuestionScreen, mêmes pictogrammes et couleurs) en version statique et
// réduite, pour l'aperçu de la page de vente — QuestionScreen lui-même ne
// peut pas s'afficher ici : il exige un compte connecté et occupe le plein
// écran (barre de navigation propre à l'app, redirection si déconnecté).
export function QuestionScreenPreview({ categoryId, questionText }: QuestionScreenPreviewProps) {
  const config = QUESTION_SCREENS[categoryId];

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
        <span className={styles.iconButton} data-side="right" aria-hidden="true">
          <SettingsGearIcon size={13} />
        </span>
      </div>

      <p className={styles.packLabel}>Entre Nous</p>

      <div className={styles.aura} style={{ background: config.auraBg }}>
        <CategoryIcon kind={categoryId} accent={config.iconAccent} accentStrong={config.iconAccentStrong} size={40} />
      </div>

      <h3 className={styles.title} style={{ color: config.color }}>
        {config.title}
      </h3>
      <p className={styles.subtitle} style={{ color: config.color }}>
        {config.baselineLines.map((line, index) => (
          <span key={line}>
            {line}
            {index < config.baselineLines.length - 1 && <br />}
          </span>
        ))}
      </p>

      <div className={styles.card}>
        <span className={styles.heart} aria-hidden="true">
          <HeartIcon filled={false} size={14} />
        </span>
        <p className={styles.question}>{questionText}</p>
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
