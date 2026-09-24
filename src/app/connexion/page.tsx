"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { getFirebaseAuth } from "@/lib/firebase";
import { useAuthUser } from "@/lib/useAuthUser";
import styles from "./page.module.css";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

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
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.replace("/app");
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
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.replace("/app");
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
      setGoogleLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          {isSignUp ? "Créer un compte" : "Se connecter"}
        </h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
          <div className={styles.passwordField}>
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
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                  <path
                    d="M3 3l18 18M10.58 10.58a2 2 0 002.83 2.83M9.36 5.36A9.77 9.77 0 0112 5c5 0 9 4 10 7-.31.94-.9 2-1.71 3M6.53 6.53C4.6 7.86 3.14 9.7 2 12c1 3 5 7 10 7 1.25 0 2.42-.25 3.47-.7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
                  <path
                    d="M2 12c1-3 5-7 10-7s9 4 10 7c-1 3-5 7-10 7s-9-4-10-7z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              )}
            </button>
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
          <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6 29.6 4 24 4c-7.6 0-14.1 4.3-17.7 10.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4C29.6 35.4 26.9 36.4 24 36.4c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.9 39.6 16.4 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.6 5.4C41.4 35.5 44 30.1 44 24c0-1.3-.1-2.7-.4-3.5z"
            />
          </svg>
          {googleLoading ? "Un instant..." : "Continuer avec Google"}
        </button>

        <button
          type="button"
          className={styles.toggle}
          onClick={() => {
            setIsSignUp((previous) => !previous);
            setError(null);
          }}
        >
          {isSignUp ? "Déjà un compte ? Se connecter" : "Pas encore de compte ? S'inscrire"}
        </button>
      </div>
    </main>
  );
}
