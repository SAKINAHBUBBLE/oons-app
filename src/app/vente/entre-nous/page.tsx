import { redirect } from "next/navigation";

// La page de vente vit désormais à la racine "/" (voir src/app/page.tsx) ;
// cette URL reste en place comme simple redirection au cas où elle aurait
// déjà été partagée.
export default function VenteEntreNousRedirect() {
  redirect("/");
}
