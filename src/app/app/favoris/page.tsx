"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SplashBackdropV2 } from "@/components/splash/SplashBackdropV2";
import { BottomNav } from "@/components/layout/BottomNav";
import { CategoryIcon } from "@/components/entre-nous/CategoryIcon";
import { HeartIcon } from "@/components/icons/HeartIcon";
import { SettingsGearIcon } from "@/components/icons/SettingsGearIcon";
import { ENTRE_NOUS_CATEGORIES, type EntreNousCategoryId } from "@/data/entre-nous-questions";
import { useFavorites } from "@/lib/favorites";
import { useAuthUser } from "@/lib/useAuthUser";
import styles from "./page.module.css";

type FilterId = "all" | EntreNousCategoryId;

export default function FavorisPage() {
  const router = useRouter();
  const user = useAuthUser();
  const { favorites, removeFavorite } = useFavorites();
  const [filter, setFilter] = useState<FilterId>("all");

  useEffect(() => {
    if (user === null) {
      router.replace("/connexion");
    }
  }, [user, router]);

  const visible = useMemo(
    () => (filter === "all" ? favorites : favorites.filter((favorite) => favorite.categoryId === filter)),
    [favorites, filter],
  );

  if (!user) {
    return null;
  }

  return (
    <main className={styles.page}>
      <SplashBackdropV2 />
      <div className={styles.content}>
        <div className={styles.topBar}>
          <Link href="/app/profil" className={styles.backButton} aria-label="Retour à mon espace">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
              <path
                d="M15 5 8 12l7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          {/* eslint-disable-next-line @next/next/no-img-element -- asset vectoriel maître unique */}
          <img className={styles.logo} src="/brand/oons-logo-primary.svg" alt="Oons" />
          <Link href="/app/parametres" className={styles.settingsButton} aria-label="Réglages">
            <SettingsGearIcon />
          </Link>
        </div>
        <h1 className={styles.title}>Mes favoris</h1>
        <p className={styles.subtitle}>Vos questions préférées, toujours à portée de main.</p>

        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyAura}>
              <svg viewBox="0 0 24 24" width="46" height="46" fill="none" aria-hidden="true">
                <path
                  d="M12 20.2s-7.2-4.4-9.8-8.7C.6 8 1.7 4.2 5 3c2.2-.9 4.4-.2 5.8 1.5C12.2 2.8 14.4 2.1 16.6 3c3.3 1.2 4.4 5 2.8 8.3C16.8 15.8 12 20.2 12 20.2z"
                  stroke="var(--color-v2-navy)"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className={styles.emptyTitle}>Pas encore de favoris</h2>
            <p className={styles.emptyText}>
              Les questions que tu souhaites garder précieusement apparaîtront ici.
            </p>
            <Link href="/app" className={styles.discoverButton}>
              Découvrir les questions
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.filters}>
              <button
                type="button"
                className={`${styles.filterAll} ${filter === "all" ? styles.filterAllActive : ""}`}
                onClick={() => setFilter("all")}
              >
                Toutes <span className={styles.filterCount}>{favorites.length}</span>
              </button>
              {ENTRE_NOUS_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  className={`${styles.filterChip} ${filter === category.id ? styles.filterChipActive : ""}`}
                  onClick={() => setFilter(category.id)}
                >
                  <span className={styles.filterDot} style={{ background: category.textColor }} aria-hidden="true" />
                  {category.label}
                </button>
              ))}
            </div>

            <div className={styles.list}>
              {visible.map((favorite) => {
                const category = ENTRE_NOUS_CATEGORIES.find((entry) => entry.id === favorite.categoryId)!;
                return (
                  <div key={favorite.id} className={styles.card}>
                    <div className={styles.iconCircle} style={{ background: category.wheelColor }}>
                      <CategoryIcon
                        kind={category.id}
                        accent={category.iconAccent}
                        accentStrong={category.iconAccentStrong}
                        size={34}
                      />
                    </div>
                    <div className={styles.cardBody}>
                      <span className={styles.badge} style={{ background: category.wheelColor, color: category.textColor }}>
                        {category.label}
                      </span>
                      <p className={styles.question}>{favorite.text}</p>
                    </div>
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => removeFavorite(favorite.id)}
                      aria-label="Retirer des favoris"
                    >
                      <HeartIcon filled size={22} />
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <BottomNav variant="compact" />
    </main>
  );
}
