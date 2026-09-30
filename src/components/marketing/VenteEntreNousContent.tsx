"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { CategoryIcon } from "@/components/entre-nous/CategoryIcon";
import { PhoneMockup } from "@/components/marketing/PhoneMockup";
import { HeroWheelPreview } from "@/components/marketing/HeroWheelPreview";
import { QuestionScreenPreview } from "@/components/marketing/QuestionScreenPreview";
import { PreviewCarousel } from "@/components/marketing/PreviewCarousel";
import { ENTRE_NOUS_CATEGORIES, type EntreNousCategoryId } from "@/data/entre-nous-questions";
import styles from "./VenteEntreNousContent.module.css";

// Étiquette l'emplacement du bouton d'achat cliqué, pour distinguer les CTA
// dans les statistiques (Vercel Analytics → onglet Events).
function trackCtaClick(location: string) {
  track("cta_click", { location });
}

const CATEGORY_BY_ID = Object.fromEntries(
  ENTRE_NOUS_CATEGORIES.map((category) => [category.id, category]),
) as Record<EntreNousCategoryId, (typeof ENTRE_NOUS_CATEGORIES)[number]>;

// Ordre d'affichage demandé pour la section "5 univers" (différent de l'ordre
// de définition des catégories, qui suit l'ordre des segments de la roue).
const UNIVERS_ORDER: EntreNousCategoryId[] = ["doux", "profond", "spirituel", "defi", "decale"];

const CATEGORY_DESCRIPTIONS: Record<EntreNousCategoryId, string> = {
  doux: "Pour accueillir les souvenirs, les émotions et les choses simples qui comptent.",
  profond: "Pour aller au-delà des conversations habituelles et mettre des mots sur ce qui nous habite.",
  spirituel: "Pour parler de foi, de gratitude, de notre lien à Allah et de ce que l'on souhaite cultiver intérieurement.",
  defi: "Pour transformer certaines réflexions en petits pas concrets.",
  decale: "Pour respirer, sourire et laisser aussi une place à la spontanéité.",
};

const STEPS = [
  {
    number: "1",
    title: "Lancez la roue",
    text: "Laissez-la vous guider vers l'un des cinq univers.",
  },
  {
    number: "2",
    title: "Découvrez la question",
    text: "Une question douce, profonde, spirituelle, un défi… ou parfois quelque chose de plus inattendu.",
  },
  {
    number: "3",
    title: "Prenez le temps d'échanger",
    text: "Chacune répond à son tour, écoute, partage ce qu'elle souhaite… et laisse la conversation suivre son chemin.",
  },
];

// Questions réellement tirées de la banque Entre Nous (pas de texte
// marketing inventé), sauf la question Spirituel : absente de la banque,
// conservée ici sur décision explicite de l'auteure du brief (voir résumé
// des écarts envoyé après cette implémentation).
const REAL_SCREEN_QUESTIONS: { categoryId: EntreNousCategoryId; text: string }[] = [
  {
    categoryId: "profond",
    text: "Quelle est la chose dont tu as le plus besoin en ce moment et que tu n'oses pas demander ?",
  },
  {
    categoryId: "spirituel",
    text: "Y a-t-il un verset, une invocation ou un rappel qui t'a portée dans une période difficile ?",
  },
  { categoryId: "decale", text: "Quel est le talent le plus inutile mais le plus impressionnant que tu possèdes ?" },
];

const BIENVEILLANCE_LIST = [
  "Il n'y a pas de bonne ou de mauvaise réponse.",
  "Pas de niveau d'intimité à atteindre.",
  "Une question ne vous inspire pas ? Passez-la.",
  "Vous préférez garder quelque chose pour vous ? Gardez-le.",
  "Chacune choisit ce qu'elle souhaite partager et avance à son rythme.",
];

const FAQ = [
  {
    q: "Entre Nous est-il une application ou un jeu physique ?",
    a: "Oons est une application web mobile. Aucun jeu physique à recevoir et rien à télécharger depuis un store : vous y accédez directement en ligne.",
  },
  {
    q: "Faut-il payer un abonnement ?",
    a: "Non. Entre Nous s'achète une seule fois. Il n'y a aucun abonnement mensuel.",
  },
  {
    q: "À combien peut-on jouer ?",
    a: "Entre Nous est fait pour être partagé. Vous pouvez jouer à deux comme à plusieurs.",
  },
  {
    q: "Peut-on passer une question ?",
    a: "Toujours. Si une question ou un défi ne vous inspire pas ou vous met mal à l'aise, passez simplement à la suivante. Sans justification.",
  },
];

export function VenteEntreNousContent() {
  return (
    <main className={styles.page}>
      {/* ---------- HERO ---------- */}
      <section className={styles.hero}>
        <div className={styles.heroBlobTop} aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 H100 C82 20 88 38 68 52 C46 67 54 86 30 96 C14 103 0 96 0 78 Z" fill="var(--color-v2-blob-pink)" />
          </svg>
        </div>
        <div className={styles.heroBlobTopRight} aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M100 0 H0 C18 20 12 38 32 52 C54 67 46 86 70 96 C86 103 100 96 100 78 Z" fill="var(--color-v2-blob-butter)" />
          </svg>
        </div>

        <div className={styles.topBar}>
          {/* eslint-disable-next-line @next/next/no-img-element -- asset vectoriel maître unique */}
          <img className={styles.topBarLogo} src="/brand/oons-logo-primary.svg" alt="Oons" />
          <Link href="/connexion" className={styles.loginLink}>
            Déjà client ? Se connecter →
          </Link>
        </div>

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            Pensé pour les femmes musulmanes. Pour la beauté d&apos;un moment partagé.
          </p>

          <h1 className={styles.heroTitle}>
            Et si une question ouvrait une conversation que vous n&apos;auriez jamais eue ?
          </h1>

          <p className={styles.heroLead}>
            Une roue. Une question. Puis une conversation qui prend son temps.
          </p>
          <p className={styles.heroText}>
            Entre Nous a été imaginé pour celles qui souhaitent partager un moment de qualité,
            nourrir leurs liens et laisser davantage de place aux échanges qui ont du sens.
          </p>
          <p className={styles.heroText}>
            Des questions riches, profondes et spirituelles, parfois plus légères, pour parler,
            écouter, réfléchir… et se retrouver autrement.
          </p>

          <div className={styles.heroPhone}>
            <PhoneMockup className={styles.heroPhoneFrame}>
              <HeroWheelPreview />
            </PhoneMockup>
          </div>

          <Link
            href="/connexion?mode=inscription"
            className={styles.ctaPrimary}
            onClick={() => trackCtaClick("hero")}
          >
            Découvrir Entre Nous →
          </Link>
          <p className={styles.heroSubtext}>
            + de 750 questions &amp; défis · 5 univers · Achat unique · Sans abonnement
          </p>
        </div>
      </section>

      {/* ---------- COMMENT ÇA MARCHE ---------- */}
      <section className={styles.section}>
        <p className={styles.eyebrow}>Parfois, il suffit d&apos;une question</p>
        <h2 className={styles.sectionTitle}>Les belles conversations ne se prévoient pas toujours.</h2>
        <p className={styles.sectionIntro}>
          Un café qui se prolonge. Un trajet partagé. Une soirée tranquille entre proches. Puis
          une question que personne n&apos;aurait pensé à poser.
        </p>
        <p className={styles.sectionIntro} style={{ marginTop: 10 }}>
          Oons crée simplement l&apos;occasion. La conversation vous appartient.
        </p>

        <div className={styles.steps}>
          {STEPS.map((step) => (
            <div key={step.number} className={styles.stepCard}>
              <span className={styles.stepNumber}>{step.number}</span>
              <div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaBlock}>
          <Link
            href="/connexion?mode=inscription"
            className={styles.ctaPrimary}
            onClick={() => trackCtaClick("apres-etapes")}
          >
            Commencer avec Entre Nous →
          </Link>
        </div>
      </section>

      {/* ---------- 5 UNIVERS ---------- */}
      <section className={styles.section}>
        <p className={styles.eyebrow}>5 univers · Une même roue</p>
        <h2 className={styles.sectionTitle}>Des conversations qui prennent le temps d&apos;aller quelque part.</h2>
        <p className={styles.sectionIntro}>
          Parfois douces. Parfois profondes. Parfois spirituelles. Certaines invitent à réfléchir
          ou à agir. D&apos;autres apportent cette touche de légèreté qui fait aussi la beauté
          d&apos;un moment partagé.
        </p>

        <div className={styles.categoryList} style={{ marginTop: 28 }}>
          {UNIVERS_ORDER.map((categoryId) => {
            const category = CATEGORY_BY_ID[categoryId];
            return (
              <div key={category.id} className={styles.categoryCard}>
                <div className={styles.categoryIconCircle} style={{ background: category.wheelColor }}>
                  <CategoryIcon
                    kind={category.id}
                    accent={category.iconAccent}
                    accentStrong={category.iconAccentStrong}
                    size={34}
                  />
                </div>
                <div>
                  <h3 className={styles.categoryName} style={{ color: category.textColor }}>
                    {category.label}
                  </h3>
                  <p className={styles.categoryText}>{CATEGORY_DESCRIPTIONS[category.id]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- APERÇU DE QUESTIONS ---------- */}
      <section className={styles.previewSection}>
        <h2 className={styles.sectionTitle}>Un aperçu des questions</h2>

        <PreviewCarousel
          slides={REAL_SCREEN_QUESTIONS.map((preview) => {
            const category = CATEGORY_BY_ID[preview.categoryId];
            return {
              id: preview.categoryId,
              ariaLabel: `Écran de question Oons, catégorie ${category.label} : ${preview.text}`,
              content: <QuestionScreenPreview categoryId={preview.categoryId} questionText={preview.text} />,
            };
          })}
        />

        <div className={styles.ctaBlock}>
          <Link
            href="/connexion?mode=inscription"
            className={styles.ctaSecondary}
            onClick={() => trackCtaClick("apercu-questions")}
          >
            Commencer avec Entre Nous →
          </Link>
        </div>
      </section>

      {/* ---------- VALEUR ---------- */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Plus qu&apos;occuper un moment, lui donner de la valeur.</h2>
        <p className={styles.sectionIntro}>
          Oons est né d&apos;une envie simple : créer un espace où les femmes musulmanes peuvent
          prendre le temps d&apos;échanger autrement.
        </p>
        <p className={styles.sectionIntro} style={{ marginTop: 10 }}>
          Parce que nos conversations peuvent parler de nos relations, de nos rêves, de nos
          difficultés et de nos souvenirs, mais aussi de nos liens à Allah et de ce qui nourrit
          notre cœur.
        </p>
        <p className={styles.sectionIntro} style={{ marginTop: 10 }}>
          Entre Nous laisse naturellement sa place à la profondeur, à la douceur et à la légèreté,
          dans un univers pensé pour être en accord avec vos valeurs.
        </p>

        <div className={styles.calloutBox}>
          <span className={styles.calloutRule} aria-hidden="true" />
          <p className={styles.calloutText}>
            Des conversations qui rapprochent. Des instants que l&apos;on garde.
          </p>
        </div>
      </section>

      {/* ---------- BIENVEILLANCE ---------- */}
      <section className={styles.section}>
        <p className={styles.eyebrow}>La bienveillance avant tout</p>
        <h2 className={styles.sectionTitle}>Oons invite. Il n&apos;impose jamais.</h2>

        <div className={styles.calloutBox}>
          <span className={styles.calloutRule} aria-hidden="true" />
          <p className={styles.calloutText}>
            Vous choisissez ce que vous partagez. Vous choisissez jusqu&apos;où vous allez.
          </p>
        </div>

        <ul className={styles.bulletList}>
          {BIENVEILLANCE_LIST.map((item) => (
            <li key={item} className={styles.bulletItem}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Quelques questions avant de commencer ?</h2>
        <div className={styles.faqList}>
          {FAQ.map((item) => (
            <div key={item.q} className={styles.faqItem}>
              <p className={styles.faqQuestion}>{item.q}</p>
              <p className={styles.faqAnswer}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- BLOC PRIX FINAL ---------- */}
      <section className={styles.sectionNarrow}>
        <div className={styles.priceBlock}>
          <p className={styles.priceBlockPack}>Entre Nous</p>
          <p className={styles.priceBlockTitle}>Plus de 750 occasions d&apos;avoir une conversation différente.</p>
          <p className={styles.priceBlockPrice}>19,90 €</p>
          <Link
            href="/connexion?mode=inscription"
            className={styles.ctaPrimaryOnNavy}
            onClick={() => trackCtaClick("prix-final")}
          >
            Commencer avec Entre Nous →
          </Link>
          <p className={styles.priceBlockSubtext}>Achat unique · Sans abonnement · Accès immédiat</p>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className={styles.footer}>
        <div className={styles.footerBlobLeft} aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 H100 C82 80 88 62 68 48 C46 33 54 14 30 4 C14 -3 0 4 0 22 Z" fill="var(--color-v2-blob-peach)" />
          </svg>
        </div>
        <div className={styles.footerBlobRight} aria-hidden="true">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M100 100 H0 C18 80 12 62 32 48 C54 33 46 14 70 4 C86 -3 100 4 100 22 Z" fill="var(--color-v2-blob-lavender)" />
          </svg>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element -- asset vectoriel maître unique ; version claire obtenue par filtre CSS (voir .footerLogo), pas de redessin */}
        <img className={styles.footerLogo} src="/brand/oons-logo-primary.svg" alt="Oons" />
        <p className={styles.footerSignature}>Vous êtes en noble compagnie.</p>
        <p className={styles.footerLegal}>Mentions légales · CGV · Confidentialité</p>
      </footer>

      {/* ---------- BARRE STICKY MOBILE ---------- */}
      <div className={styles.stickyBar}>
        <span className={styles.stickyPrice}>Entre Nous · 19,90 € · achat unique</span>
        <Link
          href="/connexion?mode=inscription"
          className={styles.stickyButton}
          onClick={() => trackCtaClick("sticky-bar")}
        >
          Commencer →
        </Link>
      </div>
    </main>
  );
}
