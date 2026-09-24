import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey);
}

// Initialisation paresseuse : ne lit les variables d'environnement qu'au premier
// usage réel (côté navigateur), pour ne jamais faire échouer `next build`.
export function getFirebaseAuth(): Auth {
  if (!auth) {
    if (!firebaseConfig.apiKey) {
      throw new Error(
        "Configuration Firebase manquante. Vérifie les variables NEXT_PUBLIC_FIREBASE_* (.env.local en local, ou les Environment Variables du projet chez ton hébergeur en production — un redéploiement est nécessaire après les avoir ajoutées).",
      );
    }
    app = getApps()[0] ?? initializeApp(firebaseConfig);
    auth = getAuth(app);
  }
  return auth;
}
