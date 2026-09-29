"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { CategoryIcon } from "@/components/entre-nous/CategoryIcon";
import { PhoneMockup } from "@/components/marketing/PhoneMockup";
import { HeroWheelPreview } from "@/components/marketing/HeroWheelPreview";
import { ENTRE_NOUS_CATEGORIES } from "@/data/entre-nous-questions";
import styles from "./VenteEntreNousContent.module.css";

// Étiquette l'emplacement du bouton d'achat cliqué, pour distinguer les CTA
// dans les statistiques (Vercel Analytics → onglet Events).
function trackCtaClick(location: string) {
  track("cta_click", { location });
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  profond: "Pour les conversations qui vont chercher plus loin que la surface.",
  doux: "De petites questions qui font du bien, sans pression.",
  defi: "De petites actions à faire ensemble, tout de suite.",
  decale: "Pour rire, s'étonner, voir les choses autrement.",
  spirituel: "Des questions qui nourrissent l'âme et le lien à soi.",
};

const STEPS = [
  {
    number: "1",
    title: "Lancez la roue",
    text: "D'un geste, la roue choisit pour vous — cinq univers, dix segments, un seul tirage.",
  },
  {
    number: "2",
    title: "Découvrez la question",
    text: "Une question ou un petit défi apparaît, pensé pour ouvrir la conversation, jamais pour la forcer.",
  },
  {
    number: "3",
    title: "Échangez à tour de rôle",
    text: "Chacun répond à son rythme. Libre à vous de passer une question à tout moment.",
  },
];

const GALLERY = [
  { src: "/marketing/screen-douceur.png", alt: "Écran Oons, catégorie Douceur", caption: "Douceur" },
  { src: "/marketing/screen-defi.png", alt: "Écran Oons, catégorie Défi", caption: "Défi" },
  { src: "/marketing/screen-decale.png", alt: "Écran Oons, catégorie Décalé", caption: "Décalé" },
];

const FAQ = [
  {
    q: "Est-ce une application ou un jeu physique ?",
    a: "Entre Nous est une application web, accessible directement depuis votre navigateur — aucun matériel à acheter, aucune app à télécharger.",
  },
  {
    q: "Faut-il payer un abonnement ?",
    a: "Non. L'accès à Entre Nous est un achat unique, valable à vie — pas d'abonnement, pas de renouvellement automatique.",
  },
  {
    q: "À combien peut-on jouer ?",
    a: "À deux, comme à plusieurs — la roue s'adapte à toutes les configurations, autour d'un café ou d'un dîner.",
  },
  {
    q: "Puis-je passer une question qui me met mal à l'aise ?",
    a: "Oui, à tout moment et sans justification. Oons invite, il n'impose jamais.",
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

        <Link href="/connexion" className={styles.loginLink}>
          Déjà client ? Se connecter →
        </Link>

        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Application web mobile · Accès immédiat</p>

          {/* eslint-disable-next-line @next/next/no-img-element -- asset vectoriel maître unique */}
          <img className={styles.heroLogo} src="/brand/oons-logo-primary.svg" alt="Oons" />
          <p className={styles.packLabel}>Entre Nous</p>

          <h1 className={styles.heroTitle}>Vos meilleurs moments commencent ici.</h1>

          <p className={styles.heroLead}>
            Une roue. Une question. Et personne ne sait vraiment où la conversation va vous
            emmener.
          </p>
          <p className={styles.heroText}>
            Entre Nous transforme un moment ordinaire — un café, un trajet, un dimanche sans
            programme — en une vraie conversation, portée par cinq univers et plus de 750
            questions et défis.
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
            Plus de 750 questions &amp; défis · 5 univers · achat unique · sans abonnement
          </p>
        </div>
      </section>

      {/* ---------- COMMENT ÇA MARCHE ---------- */}
      <section className={styles.section}>
        <p className={styles.sectionIntro}>
          Un café qui s&apos;éternise. Un trajet en voiture. Un dimanche sans programme. Ce sont
          souvent ces moments-là, ni prévus ni préparés, qui donnent les meilleures conversations
          — encore faut-il savoir par où commencer.
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
            Découvrir Entre Nous →
          </Link>
        </div>

        <div className={styles.wheelShowcase}>
          <PhoneMockup src="/marketing/screen-roue.png" alt="Écran de la roue Oons, application Entre Nous" />
        </div>

        <div className={styles.quoteBlock}>
          <p className={styles.quoteText}>
            Une seule question peut ouvrir autant de conversations qu&apos;il y a de personnes
            autour de vous.
          </p>
        </div>

        <div className={styles.ctaBlock}>
          <Link
            href="/connexion?mode=inscription"
            className={styles.ctaPrimary}
            onClick={() => trackCtaClick("comment-ca-marche")}
          >
            Découvrir Entre Nous →
          </Link>
          <p className={styles.priceReminder}>19,90 € · achat unique · sans abonnement</p>
        </div>
      </section>

      {/* ---------- 5 UNIVERS ---------- */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Du rire aux larmes... et parfois l&apos;inverse.</h2>

        <div className={styles.categoryList}>
          {ENTRE_NOUS_CATEGORIES.map((category) => (
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
          ))}
        </div>

        <div className={styles.gallery}>
          {GALLERY.map((item) => (
            <div key={item.caption} className={styles.galleryItem}>
              <PhoneMockup src={item.src} alt={item.alt} />
              <span className={styles.galleryCaption}>{item.caption}</span>
            </div>
          ))}
        </div>

        <div className={styles.ctaBlock}>
          <Link
            href="/connexion?mode=inscription"
            className={styles.ctaSecondary}
            onClick={() => trackCtaClick("univers")}
          >
            Voir les 5 univers en jeu →
          </Link>
        </div>
      </section>

      {/* ---------- RÉASSURANCE ---------- */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Oons invite. Il n&apos;impose jamais.</h2>
        <p className={styles.sectionIntro}>
          Chaque question peut être passée, sans justification, à tout moment. Il n&apos;y a pas
          de bonne réponse, ni de mauvaise — seulement ce que vous avez envie de partager, au
          rythme qui vous convient.
        </p>
        <p className={styles.reassuranceStrong}>
          Vous choisissez ce que vous partagez. Vous choisissez jusqu&apos;où vous allez.
        </p>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Questions fréquentes</h2>
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
          <p className={styles.priceBlockPrice}>19,90 €</p>
          <p className={styles.priceBlockSubtext}>
            Achat unique · Sans abonnement · Accès à vie instantané
          </p>
          <Link
            href="/connexion?mode=inscription"
            className={styles.ctaPrimaryOnNavy}
            onClick={() => trackCtaClick("prix-final")}
          >
            Commencer maintenant →
          </Link>
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

        {/* eslint-disable-next-line @next/next/no-img-element -- asset vectoriel maître unique */}
        <img className={styles.footerLogo} src="/brand/oons-logo-primary.svg" alt="Oons" />
        <p className={styles.footerQuote}>
          Ne faites pas que passer le temps. Faites-en un souvenir.
        </p>
        <p className={styles.footerSignature}>Vous êtes en noble compagnie.</p>
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
