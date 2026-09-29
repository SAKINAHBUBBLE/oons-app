"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { VenteEntreNousContent } from "@/components/marketing/VenteEntreNousContent";
import { useAuthUser } from "@/lib/useAuthUser";

// La racine est la page de vente publique "Entre Nous" pour tout visiteur non
// connecté. Un utilisateur déjà connecté ne doit jamais la voir : il est
// renvoyé directement vers l'écran de choix des packs.
export default function RootPage() {
  const router = useRouter();
  const user = useAuthUser();

  useEffect(() => {
    if (user) {
      router.replace("/packs");
    }
  }, [user, router]);

  // État de résolution de l'authentification pas encore connu : on n'affiche
  // rien plutôt que de flasher la page de vente avant une redirection.
  if (user === undefined || user) {
    return null;
  }

  return <VenteEntreNousContent />;
}
