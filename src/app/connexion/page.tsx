"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  getAdditionalUserInfo,
  GoogleAuthProvider,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { getFirebaseAuth } from "@/lib/firebase";
import { useAuthUser } from "@/lib/useAuthUser";
import { OonsLogo } from "@/components/brand/OonsLogo";
import { SplashBackdrop } from "@/components/splash/SplashBackdrop";
import { PackIcon } from "@/components/packs/PackIcon";
import { SettingsGearIcon } from "@/components/icons/SettingsGearIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { PACKS } from "@/data/packs";
import styles from "./page.module.css";

const ENTRE_NOUS = PACKS.find((pack) => pack.id === "entre-nous")!;

const ERROR_MESSAGES: Record<string, string> = {
  "auth/email-already-in-use": "Cet email est déjà utilisé.",
  "auth/weak-password": "Le mot de passe doit contenir au moins 6 caractères.",
  "auth/invalid-email": "Adresse email invalide.",
  "auth/invalid-credential": "Email ou mot de passe incorrect.",
  "auth/wrong-password": "Email ou mot de passe incorrect.",
  "auth/user-not-found": "Email ou mot de passe incorrect.",
  "auth/too-many-requests": "Trop de tentatives. Réessaie dans un instant.",
  "auth/unauthorized-domain":
    "Ce domaine n'est pas autorisé côté Firebase. Ajoute-le dans Firebase Console → Authentication → Settings → Authorized domains.",
  "auth/popup-closed-by-user": "Connexion annulée.",
  "auth/cancelled-popup-request": "Connexion annulée.",
  "auth/popup-blocked":
    "La fenêtre de connexion Google a été bloquée par le navigateur. Autorise les popups pour ce site.",
  "auth/operation-not-allowed":
    "La connexion Google n'est pas encore activée côté Firebase. Active-la dans Firebase Console → Authentication → Sign-in method → Google.",
};

function getErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    return ERROR_MESSAGES[error.code] ?? "Une erreur est survenue. Réessaie.";
  }
  if (error instanceof Error) {
    // Nos propres erreurs (ex. configuration Firebase manquante) portent déjà
    // un message clair et actionnable : on l'affiche tel quel.
    return error.message;
  }
  return "Une erreur est survenue. Réessaie.";
}

export default function ConnexionPage() {
  const router = useRouter();
  const user = useAuthUser();
  const [isSignUp, setIsSignUp] = useState(false);
  const [mode, setMode] = useState<"form" | "forgot">("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/app");
    }
  }, [user, router]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const auth = getFirebaseAuth();
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        // Une inscription est par définition une toute première connexion :
        // on passe par les écrans de bienvenue avant la roue.
        router.replace("/bienvenue");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        router.replace("/app");
      }
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setError(null);
    setGoogleLoading(true);
    try {
      const auth = getFirebaseAuth();
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      const isNewUser = getAdditionalUserInfo(credential)?.isNewUser ?? false;
      router.replace(isNewUser ? "/bienvenue" : "/app");
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
      setGoogleLoading(false);
    }
  }

  async function handleForgotPassword(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setResetLoading(true);
    try {
      const auth = getFirebaseAuth();
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <SplashBackdrop />
      <div className={styles.content}>
        <div className={styles.topBar}>
          <Link href="/packs" className={styles.backButton} aria-label="Retour aux packs">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
              <path
                d="M15 5 8 12l7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <OonsLogo size={64} showSlogan={false} />
          <button
            type="button"
            className={styles.settingsButton}
            aria-label="Réglages"
          >
            <SettingsGearIcon />
          </button>
        </div>

        <PackIcon
          kind={ENTRE_NOUS.icon}
          accent={ENTRE_NOUS.colors.iconAccent}
          accentStrong={ENTRE_NOUS.colors.iconAccentStrong}
          halo={ENTRE_NOUS.colors.halo}
          size={92}
        />
        <h1 className={styles.title} style={{ color: ENTRE_NOUS.colors.title }}>
          {ENTRE_NOUS.name}
        </h1>
        <p className={styles.intro}>
          Connecte-toi pour accéder
          <br />à ton espace.
        </p>

        <div className={styles.card}>
          {mode === "form" ? (
            <>
              <div className={styles.tabs}>
                <button
                  type="button"
                  className={`${styles.tab} ${!isSignUp ? styles.tabActive : ""}`}
                  onClick={() => {
                    setIsSignUp(false);
                    setError(null);
                  }}
                >
                  Connexion
                </button>
                <button
                  type="button"
                  className={`${styles.tab} ${isSignUp ? styles.tabActive : ""}`}
                  onClick={() => {
                    setIsSignUp(true);
                    setError(null);
                  }}
                >
                  Inscription
                </button>
              </div>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <svg className={styles.fieldIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                    <path
                      d="M3.5 6.5h17a1 1 0 011 1v9a1 1 0 01-1 1h-17a1 1 0 01-1-1v-9a1 1 0 011-1z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input
                    type="email"
                    required
                    placeholder="Adresse e-mail"
                    className={styles.input}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                  />
                </div>

                <div className={styles.field}>
                  <svg className={styles.fieldIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                    <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 10.5V8a4 4 0 118 0v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    placeholder="Mot de passe"
                    className={styles.input}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                  />
                  <button
                    type="button"
                    className={styles.eyeToggle}
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                        <path
                          d="M3 3l18 18M10.58 10.58a2 2 0 002.83 2.83M9.36 5.36A9.77 9.77 0 0112 5c5 0 9 4 10 7-.31.94-.9 2-1.71 3M6.53 6.53C4.6 7.86 3.14 9.7 2 12c1 3 5 7 10 7 1.25 0 2.42-.25 3.47-.7"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                        <path
                          d="M2 12c1-3 5-7 10-7s9 4 10 7c-1 3-5 7-10 7s-9-4-10-7z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    )}
                  </button>
                </div>

                <div className={styles.optionsRow}>
                  <label className={styles.remember}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                    />
                    <span className={styles.checkbox} aria-hidden="true" />
                    Se souvenir de moi
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      className={styles.forgotLink}
                      onClick={() => {
                        setError(null);
                        setResetSent(false);
                        setMode("forgot");
                      }}
                    >
                      Mot de passe oublié ?
                    </button>
                  )}
                </div>

                <button type="submit" className={styles.submitButton} disabled={loading}>
                  {loading ? "Un instant..." : isSignUp ? "Créer mon compte" : "Se connecter"}
                </button>
              </form>

              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.divider}>
                <span>ou</span>
              </div>

              <button
                type="button"
                className={styles.googleButton}
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
              >
                <GoogleIcon />
                {googleLoading ? "Un instant..." : "Continuer avec Google"}
              </button>
            </>
          ) : (
            <div className={styles.forgotPanel}>
              <h2 className={styles.forgotTitle}>Réinitialiser le mot de passe</h2>
              {resetSent ? (
                <>
                  <p className={styles.forgotText}>
                    Si un compte existe avec cet email, un lien de réinitialisation vient de
                    lui être envoyé.
                  </p>
                  <button
                    type="button"
                    className={styles.submitButton}
                    onClick={() => setMode("form")}
                  >
                    Retour à la connexion
                  </button>
                </>
              ) : (
                <form className={styles.form} onSubmit={handleForgotPassword}>
                  <div className={styles.field}>
                    <svg className={styles.fieldIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                      <path
                        d="M3.5 6.5h17a1 1 0 011 1v9a1 1 0 01-1 1h-17a1 1 0 01-1-1v-9a1 1 0 011-1z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input
                      type="email"
                      required
                      placeholder="Adresse e-mail"
                      className={styles.input}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  {error && <p className={styles.error}>{error}</p>}
                  <button type="submit" className={styles.submitButton} disabled={resetLoading}>
                    {resetLoading ? "Un instant..." : "Envoyer le lien"}
                  </button>
                  <button
                    type="button"
                    className={styles.forgotLink}
                    onClick={() => {
                      setError(null);
                      setMode("form");
                    }}
                  >
                    Retour à la connexion
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
