# Statut du projet Oons

_Dernière mise à jour : 11 octobre 2026_

> Ce fichier se mémorise où en est le projet, pour reprendre facilement après une pause.
> À mettre à jour à la fin de chaque séance de travail.

## ✅ Fait

- Page de vente "Entre Nous" : structure complète du brief, plusieurs boutons d'achat variés, barre collante en bas, lien "Déjà client ? Se connecter", vrais écrans de l'app dans l'aperçu des questions.
- Connexion / inscription : email + mot de passe, Google, mot de passe oublié (Firebase Auth).
- La roue : équilibrée (2 segments par catégorie sur 10), son, animation, écran d'accueil (poème + règles) à la première utilisation.
- Écran des favoris : fonctionnel (ajout/suppression, filtres par catégorie), mais stocké uniquement sur l'appareil (pas lié au compte — voir "Limites connues").
- Banque de questions : ~730 questions réparties sur 5 catégories (doux, profond, défi, décalé, spirituel).
- Icône de l'app, splash screen, manifest PWA.
- Statistiques (Vercel Analytics) : suivi des clics CTA, inscriptions, paiements.
- Protection temporaire du site par mot de passe (en attendant la fin du projet) — codée, à activer côté Vercel.

## 🟡 Commencé mais pas fini

- **Paiement Stripe** : la page de paiement et le bouton fonctionnent (crée une session Stripe à 19,90 €), mais rien ne relie encore ce paiement à un accès réel dans l'app (voir bug critique ci-dessous).
- **Page "Paramètres" / "Mon compte"** : structure présente, mais la plupart des réglages (langue, mode sombre, modifier infos, supprimer compte, aide & contact) affichent juste "Bientôt disponible".
- **Autres packs** ("En Famille", "En Couple", "Solo", "Pré-mariage") : visibles sur l'écran de sélection mais marqués "Bientôt disponible" — contenu non créé.

## ⬜ Pas commencé

- **Historique des questions** : la page existe mais affiche "Bientôt disponible", aucune question n'est encore enregistrée.
- **Mentions légales / CGV / Politique de confidentialité** : aucune page n'existe. Indispensable avant d'accepter de vrais paiements.
- Mode sombre, changement de langue, suppression de compte, modification des infos personnelles.

## 🔴 Bloqué / bug connu

1. **Le paiement ne débloque rien (le plus important).**
   Aujourd'hui, n'importe qui qui crée un compte gratuit peut utiliser toute l'app (la roue, les questions) sans jamais payer. La page de paiement existe à part, mais rien ne vérifie "cette personne a-t-elle payé ?" avant de donner accès. Tant que ce n'est pas corrigé, l'app ne peut pas réellement faire payer les utilisatrices.
2. **Pas de pages légales** (CGV, confidentialité) — risque juridique si de vrais paiements commencent.
3. Les favoris ne sont sauvegardés que sur l'appareil utilisé (pas sur le compte) — pas un bug à proprement parler, mais une limite à connaître : si l'utilisatrice change de téléphone, elle perd ses favoris.

## 💳 Stripe et le prix

- Le prix est codé en dur à **19,90 €** à un seul endroit (`src/app/api/checkout/route.ts`) et affiché identiquement sur la page de vente et la page de paiement — pas d'incohérence trouvée dans le code.
- **Mode Stripe** : impossible à vérifier depuis cette session pour la version en ligne (oons.fr) — la vraie clé Stripe est stockée dans les réglages Vercel, pas dans le code. En local (fichier de config de développement), la clé est en mode **test**.
  → À vérifier toi-même sur vercel.com (Settings → Environment Variables → `STRIPE_SECRET_KEY`) : si elle commence par `sk_test_`, c'est le mode test (aucun vrai paiement) ; si elle commence par `sk_live_`, c'est le mode réel.

## ➡️ Prochaine action recommandée (une seule)

**Relier le paiement Stripe à un vrai accès dans l'app**, pour qu'un compte non payant ne puisse plus utiliser la roue librement. C'est le seul point qui empêche aujourd'hui de lancer réellement les ventes.
