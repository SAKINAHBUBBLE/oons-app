import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const REQUIRED_ENV_VARS = {
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} as const;

const firebaseConfig = {
  apiKey: REQUIRED_ENV_VARS.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: REQUIRED_ENV_VARS.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: REQUIRED_ENV_VARS.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: REQUIRED_ENV_VARS.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REQUIRED_ENV_VARS.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: REQUIRED_ENV_VARS.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getMissingEnvVars(): string[] {
  return Object.entries(REQUIRED_ENV_VARS)
    .filter(([, value]) => !value)
    .map(([key]) => key);
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export function isFirebaseConfigured(): boolean {
  return getMissingEnvVars().length === 0;
}

// Initialisation paresseuse : ne lit les variables d'environnement qu'au premier
// usage réel (côté navigateur), pour ne jamais faire échouer `next build`.
export function getFirebaseAuth(): Auth {
  if (!auth) {
    const missing = getMissingEnvVars();
    if (missing.length > 0) {
      throw new Error(
        `Configuration Firebase incomplète. Variable(s) manquante(s) : ${missing.join(", ")}. ` +
          "Vérifie .env.local en local, ou les Environment Variables (scope Production) chez ton hébergeur — un nouveau déploiement est nécessaire après les avoir ajoutées.",
      );
    }
    app = getApps()[0] ?? initializeApp(firebaseConfig);
    auth = getAuth(app);
  }
  return auth;
}
