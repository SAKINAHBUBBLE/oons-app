"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { PhoneMockup } from "@/components/marketing/PhoneMockup";
import styles from "./PreviewCarousel.module.css";

export interface CarouselSlide {
  id: string;
  ariaLabel: string;
  content: ReactNode;
}

interface PreviewCarouselProps {
  slides: CarouselSlide[];
  // Largeur fixe d'un cadre de téléphone (px), utilisée pour calculer quelle
  // carte est active au scroll sur mobile (le pas = largeur + espace).
  frameWidth?: number;
}

const GAP = 16;

function LazySlide({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return <div ref={ref}>{visible ? children : <div className={styles.placeholder} />}</div>;
}

// Carrousel horizontal à glisser (avec points) sur mobile, écrans côte à
// côte sur tablette/ordinateur (voir le point de rupture dans le CSS).
// Chaque carte est chargée en différé (montée seulement quand elle
// approche du viewport) pour ne pas alourdir le chargement initial.
export function PreviewCarousel({ slides, frameWidth = 220 }: PreviewCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const step = frameWidth + GAP;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    function handleScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!track) return;
        const index = Math.round(track.scrollLeft / step);
        setActiveIndex(Math.max(0, Math.min(slides.length - 1, index)));
      });
    }
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, [step, slides.length]);

  function scrollToSlide(index: number) {
    trackRef.current?.scrollTo({ left: index * step, behavior: "smooth" });
  }

  return (
    <div>
      <div className={styles.track} ref={trackRef}>
        {slides.map((slide) => (
          <div key={slide.id} className={styles.slideWrapper} style={{ width: frameWidth }}>
            <PhoneMockup
              style={{ width: frameWidth }}
              // Équivalent du texte alternatif pour un aperçu construit en
              // composants (pas une image) : décrit l'écran pour les lecteurs d'écran.
              ariaLabel={slide.ariaLabel}
            >
              <LazySlide>{slide.content}</LazySlide>
            </PhoneMockup>
          </div>
        ))}
      </div>

      <div className={styles.dots}>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={styles.dot}
            data-active={index === activeIndex}
            aria-label={`Voir l'écran ${index + 1} sur ${slides.length}`}
            onClick={() => scrollToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
