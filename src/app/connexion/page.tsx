"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
          <input
            type="password"
            required
            minLength={6}
            placeholder="Mot de passe"
            className={styles.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={isSignUp ? "new-password" : "current-password"}
          />
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Un instant..." : isSignUp ? "Créer mon compte" : "Se connecter"}
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

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

        {/* Diagnostic temporaire — à retirer une fois le problème de clé API résolu. */}
        <p className={styles.debug}>
          apiKey lue : &quot;{process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "(vide)"}&quot; (
          {process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.length ?? 0} caractères)
          <br />
          authDomain lue : &quot;{process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "(vide)"}&quot;
          <br />
          projectId lue : &quot;{process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "(vide)"}&quot;
        </p>
      </div>
    </main>
  );
}
