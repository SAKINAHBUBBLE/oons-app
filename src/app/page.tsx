import { redirect } from "next/navigation";

// L'ancien écran de démarrage (logo animé, 2,4s) faisait double emploi avec
// l'écran Packs qui suit immédiatement — un seul "écran d'accueil" suffit.
export default function RootPage() {
  redirect("/packs");
}
