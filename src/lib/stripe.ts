import Stripe from "stripe";

let stripeClient: Stripe | null = null;

// Initialisation paresseuse : évite de faire échouer `next build` quand
// STRIPE_SECRET_KEY n'est pas encore configurée, l'erreur ne surgit qu'au
// moment où une route appelle réellement Stripe.
export function getStripe(): Stripe {
  if (!stripeClient) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error(
        "STRIPE_SECRET_KEY est manquante. Ajoute-la dans .env.local (voir .env.local.example).",
      );
    }
    stripeClient = new Stripe(secretKey, { apiVersion: "2026-08-26.dahlia" });
  }
  return stripeClient;
}
