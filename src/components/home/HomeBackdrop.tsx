import styles from "./HomeBackdrop.module.css";

type ShapeKind = "dot" | "leaf" | "heart" | "sparkle";

interface Shape {
  kind: ShapeKind;
  color: string;
  size: number;
  rotate: number;
  opacity: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

const SHAPE_PATHS: Record<Exclude<ShapeKind, "dot">, string> = {
  leaf: "M50 8 C82 20 90 52 50 92 C10 52 18 20 50 8 Z",
  heart: "M50 88 C8 60 8 24 34 14 C44 10 50 20 50 20 C50 20 56 10 66 14 C92 24 92 60 50 88 Z",
  sparkle: "M50 4 C53 34 66 47 96 50 C66 53 53 66 50 96 C47 66 34 53 4 50 C34 47 47 34 50 4 Z",
};

// Motifs clés de la charte : sparkle/étoile, cœur, feuille, petits points (pas d'arc-en-ciel, pas de blob).
const SHAPES: Shape[] = [
  { kind: "dot", color: "var(--color-mint)", size: 20, rotate: 0, opacity: 0.7, top: "3%", left: "5%" },
  { kind: "leaf", color: "var(--color-mint)", size: 44, rotate: -15, opacity: 0.8, top: "9%", left: "13%" },
  { kind: "dot", color: "var(--color-defi)", size: 14, rotate: 0, opacity: 0.6, top: "17%", left: "4%" },

  { kind: "dot", color: "var(--color-profonde)", size: 18, rotate: 0, opacity: 0.7, top: "4%", right: "7%" },
  { kind: "sparkle", color: "var(--color-douce)", size: 38, rotate: 10, opacity: 0.85, top: "11%", right: "15%" },
  { kind: "dot", color: "var(--color-spirituelle)", size: 12, rotate: 0, opacity: 0.6, top: "20%", right: "5%" },

  { kind: "heart", color: "var(--color-profonde)", size: 46, rotate: -8, opacity: 0.85, bottom: "8%", left: "9%" },
  { kind: "dot", color: "var(--color-ludique)", size: 16, rotate: 0, opacity: 0.6, bottom: "17%", left: "4%" },
  { kind: "dot", color: "var(--color-defi)", size: 12, rotate: 0, opacity: 0.5, bottom: "3%", left: "17%" },

  { kind: "leaf", color: "var(--color-spirituelle)", size: 40, rotate: 100, opacity: 0.75, bottom: "6%", right: "8%" },
  { kind: "sparkle", color: "var(--color-defi)", size: 32, rotate: -10, opacity: 0.75, bottom: "18%", right: "17%" },
  { kind: "dot", color: "var(--color-mint)", size: 14, rotate: 0, opacity: 0.6, bottom: "2%", right: "24%" },
];

export function HomeBackdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={`${styles.wash} ${styles.washTopLeft}`} />
      <div className={`${styles.wash} ${styles.washBottomRight}`} />
      {SHAPES.map((shape, index) => (
        <svg
          key={index}
          className={styles.shape}
          width={shape.size}
          height={shape.size}
          viewBox="0 0 100 100"
          style={{
            top: shape.top,
            bottom: shape.bottom,
            left: shape.left,
            right: shape.right,
            opacity: shape.opacity,
            transform: `rotate(${shape.rotate}deg)`,
          }}
        >
          {shape.kind === "dot" ? (
            <circle cx="50" cy="50" r="42" fill={shape.color} />
          ) : (
            <path d={SHAPE_PATHS[shape.kind]} fill={shape.color} />
          )}
        </svg>
      ))}
    </div>
  );
}
