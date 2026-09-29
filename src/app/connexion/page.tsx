"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
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
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { getFirebaseAuth } from "@/lib/firebase";
import { useAuthUser } from "@/lib/useAuthUser";
import { SplashBackdropV2 } from "@/components/splash/SplashBackdropV2";
import { PackIconV2 } from "@/components/packs/PackIconV2";
import { SettingsGearIcon } from "@/components/icons/SettingsGearIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { PACKS_V2 } from "@/data/packs-v2";
import styles from "./page.module.css";

const ENTRE_NOUS = PACKS_V2.find((pack) => pack.id === "entre-nous")!;
const TOAST_DURATION_MS = 2200;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const ERROR_MESSAGES: Record<string, string> = {
  "auth/email-already-in-use": "Cet email est déjà utilisé.",
  "auth/weak-password": "Le mot de passe doit contenir au moins 8 caractères, avec une lettre et un chiffre.",
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

function PersonFieldIcon() {
  return (
    <svg className={styles.fieldIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 19.5c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EnvelopeFieldIcon() {
  return (
    <svg className={styles.fieldIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M3.5 6.5h17a1 1 0 011 1v9a1 1 0 01-1 1h-17a1 1 0 01-1-1v-9a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockFieldIcon() {
  return (
    <svg className={styles.fieldIcon} viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="9.5" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10.5V8a4 4 0 118 0v2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EyeToggleIcon({ visible }: { visible: boolean }) {
  return visible ? (
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
  );
}

export default function ConnexionPage() {
  const router = useRouter();
  const user = useAuthUser();
  const [isSignUp, setIsSignUp] = useState(false);
  const [mode, setMode] = useState<"form" | "forgot">("form");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [toast, setToast] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (user) {
      router.replace("/app");
    }
  }, [user, router]);

  function handleLocked() {
    setToast(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToast(false), TOAST_DURATION_MS);
  }

  function switchMode(nextIsSignUp: boolean) {
    setIsSignUp(nextIsSignUp);
    setError(null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (isSignUp) {
      if (!PASSWORD_PATTERN.test(password)) {
        setError("Le mot de passe doit contenir au moins 8 caractères, avec une lettre et un chiffre.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas.");
        return;
      }
      if (!acceptedTerms) {
        setError("Merci d'accepter les Conditions Générales d'Utilisation.");
        return;
      }
    }

    setLoading(true);
    try {
      const auth = getFirebaseAuth();
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      if (isSignUp) {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        if (firstName.trim()) {
          await updateProfile(credential.user, { displayName: firstName.trim() });
        }
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
      <SplashBackdropV2 />
      <div className={styles.content}>
        <div className={styles.topBar}>
          <Link href="/packs" className={styles.backButton} aria-label="Retour aux packs">
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
          <button
            type="button"
            className={styles.settingsButton}
            onClick={handleLocked}
            aria-label="Réglages"
          >
            <SettingsGearIcon />
          </button>
        </div>

        {mode === "form" ? (
          <>
            <PackIconV2
              kind={ENTRE_NOUS.icon}
              accent={ENTRE_NOUS.colors.iconAccent}
              accentStrong={ENTRE_NOUS.colors.iconAccentStrong}
              size={64}
            />
            <h1 className={styles.title}>{ENTRE_NOUS.name}</h1>
            <p className={styles.intro}>
              {isSignUp ? "Crée ton espace pour commencer." : "Connecte-toi pour accéder à ton espace."}
            </p>

            <div className={styles.card}>
              <div className={styles.tabs}>
                <button
                  type="button"
                  className={`${styles.tab} ${!isSignUp ? styles.tabActive : ""}`}
                  onClick={() => switchMode(false)}
                >
                  Connexion
                </button>
                <button
                  type="button"
                  className={`${styles.tab} ${isSignUp ? styles.tabActive : ""}`}
                  onClick={() => switchMode(true)}
                >
                  Inscription
                </button>
              </div>

              <form className={styles.form} onSubmit={handleSubmit}>
                {isSignUp && (
                  <div className={styles.field}>
                    <PersonFieldIcon />
                    <input
                      type="text"
                      required
                      placeholder="Prénom"
                      className={styles.input}
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      autoComplete="given-name"
                    />
                  </div>
                )}

                <div className={styles.field}>
                  <EnvelopeFieldIcon />
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
                  <LockFieldIcon />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={isSignUp ? 8 : 6}
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
                    <EyeToggleIcon visible={showPassword} />
                  </button>
                </div>
                {isSignUp && <p className={styles.hint}>8 caractères minimum, avec une lettre et un chiffre.</p>}

                {isSignUp && (
                  <div className={styles.field}>
                    <LockFieldIcon />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      minLength={8}
                      placeholder="Confirmer le mot de passe"
                      className={styles.input}
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className={styles.eyeToggle}
                      onClick={() => setShowConfirmPassword((previous) => !previous)}
                      aria-label={showConfirmPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      aria-pressed={showConfirmPassword}
                    >
                      <EyeToggleIcon visible={showConfirmPassword} />
                    </button>
                  </div>
                )}

                {isSignUp ? (
                  <label className={styles.terms}>
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(event) => setAcceptedTerms(event.target.checked)}
                      required
                    />
                    <span className={styles.checkbox} aria-hidden="true" />
                    <span>
                      J&apos;accepte les <span className={styles.termsLink}>Conditions Générales d&apos;Utilisation</span>{" "}
                      et la <span className={styles.termsLink}>Politique de confidentialité.</span>
                    </span>
                  </label>
                ) : (
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
                  </div>
                )}

                <button type="submit" className={styles.submitButton} disabled={loading}>
                  {loading ? "Un instant..." : isSignUp ? "Créer mon compte" : "Se connecter"}
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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

              {isSignUp && (
                <p className={styles.switchLink}>
                  Déjà un compte ?{" "}
                  <button type="button" className={styles.switchLinkButton} onClick={() => switchMode(false)}>
                    Se connecter
                  </button>
                </p>
              )}
            </div>
          </>
        ) : (
          <div className={styles.forgotCard}>
            {resetSent ? (
              <div className={styles.forgotPanel}>
                <div className={styles.forgotIconAura}>
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true">
                    <path
                      d="M3.5 6.5h17a1 1 0 011 1v9a1 1 0 01-1 1h-17a1 1 0 01-1-1v-9a1 1 0 011-1z"
                      stroke="var(--color-v2-navy)"
                      strokeWidth="1.6"
                    />
                    <path d="M3 7l9 6 9-6" stroke="var(--color-v2-navy)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className={styles.forgotTitle}>C&apos;est envoyé !</h2>
                <p className={styles.forgotText}>
                  Si un compte correspond à cette adresse, vous recevrez un e-mail contenant les
                  instructions pour réinitialiser votre mot de passe.
                </p>
                <button
                  type="button"
                  className={styles.submitButton}
                  onClick={() => {
                    setMode("form");
                    setResetSent(false);
                  }}
                >
                  Retour à la connexion
                </button>
              </div>
            ) : (
              <div className={styles.forgotPanel}>
                <h2 className={styles.forgotTitle}>Mot de passe oublié ?</h2>
                <p className={styles.forgotText}>
                  Pas de souci. Indiquez votre adresse e-mail et nous vous enverrons un lien pour
                  réinitialiser votre mot de passe.
                </p>
                <form className={styles.form} onSubmit={handleForgotPassword}>
                  <div className={styles.field}>
                    <EnvelopeFieldIcon />
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
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </form>
                <button
                  type="button"
                  className={styles.forgotLink}
                  onClick={() => {
                    setError(null);
                    setMode("form");
                  }}
                >
                  ← Retour à la connexion
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {toast && <div className={styles.toast}>Bientôt disponible</div>}
    </main>
  );
}
