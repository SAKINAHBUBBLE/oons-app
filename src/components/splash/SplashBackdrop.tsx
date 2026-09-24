import styles from "./SplashBackdrop.module.css";

type ShapeKind = "heart" | "dot" | "dash" | "flower" | "sparkle";

interface Shape {
  kind: ShapeKind;
  color: string;
  size: number;
  rotate: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

const HEART_PATH =
  "M50 88 C8 60 8 24 34 14 C44 10 50 20 50 20 C50 20 56 10 66 14 C92 24 92 60 50 88 Z";
const DASH_PATH = "M50 6 L58 6 C62 6 62 12 58 60 C56 78 44 78 42 60 C38 12 38 6 42 6 Z";
const SPARKLE_PATH =
  "M50 8 C53 34 60 44 88 50 C60 56 53 66 50 92 C47 66 40 56 12 50 C40 44 47 34 50 8 Z";

// Fleur simple à 6 pétales avec cœur doré, tracée comme un motif fait main.
function Flower({ color }: { color: string }) {
  const petals = Array.from({ length: 6 }, (_, index) => index * 60);
  return (
    <>
      {petals.map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="28"
          rx="11"
          ry="18"
          fill={color}
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="9" fill="var(--color-accent-gold)" />
    </>
  );
}

// Petite branche feuillue tracée au trait, dans l'esprit "dessiné à la main".
function LeafBranch({ leaves = 4 }: { leaves?: number }) {
  return (
    <g fill="none" stroke="var(--color-petrol-strong)" strokeWidth="3" strokeLinecap="round">
      <path d="M50 95 C48 70 42 45 30 15" />
      {Array.from({ length: leaves }, (_, index) => {
        const t = (index + 1) / (leaves + 1);
        const cx = 50 - t * 20;
        const cy = 95 - t * 80;
        const side = index % 2 === 0 ? 1 : -1;
        return (
          <ellipse
            key={index}
            cx={cx + side * 10}
            cy={cy}
            rx="13"
            ry="7"
            fill="var(--color-blob-sage)"
            stroke="none"
            transform={`rotate(${side * 35} ${cx + side * 10} ${cy})`}
          />
        );
      })}
    </g>
  );
}

const SHAPES: Shape[] = [
  { kind: "heart", color: "var(--color-accent-coral)", size: 26, rotate: -15, top: "17%", left: "24%" },
  { kind: "dot", color: "var(--color-accent-gold)", size: 9, rotate: 0, top: "22%", left: "12%" },
  { kind: "dot", color: "var(--color-accent-gold)", size: 7, rotate: 0, top: "24%", left: "14%" },

  { kind: "heart", color: "var(--color-accent-pink)", size: 12, rotate: 15, top: "21%", right: "11%" },
  { kind: "heart", color: "var(--color-accent-pink)", size: 9, rotate: 25, top: "23%", right: "9%" },

  { kind: "sparkle", color: "var(--color-petrol-strong)", size: 26, rotate: 8, top: "63%", left: "8%" },
  { kind: "heart", color: "var(--color-accent-gold)", size: 20, rotate: 10, top: "61%", right: "8%" },

  { kind: "flower", color: "var(--color-accent-pink)", size: 44, rotate: 0, top: "72%", right: "13%" },
  { kind: "heart", color: "var(--color-accent-coral)", size: 22, rotate: -8, top: "78%", left: "35%" },
  { kind: "heart", color: "var(--color-accent-gold)", size: 18, rotate: -10, top: "87%", left: "48%" },
];

export function SplashBackdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={`${styles.blob} ${styles.blobTopLeft}`} />
      <div className={`${styles.blob} ${styles.blobTopRight}`} />
      <div className={`${styles.blob} ${styles.blobBottomLeft}`} />
      <div className={`${styles.blob} ${styles.blobBottomRight}`} />

      <svg className={styles.branch} style={{ top: "9%", right: "15%", width: 38, height: 38 }} viewBox="0 0 100 100">
        <LeafBranch leaves={2} />
      </svg>
      <svg className={styles.branch} style={{ bottom: "1%", left: "3%", width: 84, height: 84 }} viewBox="0 0 100 100">
        <LeafBranch leaves={5} />
      </svg>

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
            transform: `rotate(${shape.rotate}deg)`,
          }}
        >
          {shape.kind === "dot" && <circle cx="50" cy="50" r="40" fill={shape.color} />}
          {shape.kind === "heart" && <path d={HEART_PATH} fill={shape.color} />}
          {shape.kind === "dash" && <path d={DASH_PATH} fill={shape.color} />}
          {shape.kind === "sparkle" && <path d={SPARKLE_PATH} fill={shape.color} />}
          {shape.kind === "flower" && <Flower color={shape.color} />}
        </svg>
      ))}
    </div>
  );
}
