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

// Formes de fond organiques et irrégulières (pas de simples "blobs" ronds) :
// chaque forme reste rattachée à son coin par deux bords droits, et seul le
// bord intérieur ondule, comme un aplat peint à la main.
const BLOB_PATHS = {
  topLeft: "M0 0 H100 C86 16 90 32 74 44 C56 58 62 76 42 87 C24 97 8 91 0 76 Z",
  topRight: "M100 0 H0 C14 16 10 32 26 44 C44 58 38 76 58 87 C76 97 92 91 100 76 Z",
  bottomLeft: "M0 100 H100 C86 84 90 68 74 56 C56 42 62 24 42 13 C24 3 8 9 0 24 Z",
  bottomRight: "M100 100 H0 C14 84 10 68 26 56 C44 42 38 24 58 13 C76 3 92 9 100 24 Z",
} as const;

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
      <svg className={`${styles.blob} ${styles.blobTopLeft}`} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d={BLOB_PATHS.topLeft} fill="var(--color-accent-pink)" />
      </svg>
      <svg className={`${styles.blob} ${styles.blobTopRight}`} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d={BLOB_PATHS.topRight} fill="var(--color-blob-yellow)" />
      </svg>
      <svg className={`${styles.blob} ${styles.blobBottomLeft}`} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d={BLOB_PATHS.bottomLeft} fill="var(--color-blob-peach)" />
      </svg>
      <svg className={`${styles.blob} ${styles.blobBottomRight}`} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d={BLOB_PATHS.bottomRight} fill="var(--color-blob-lavender)" />
      </svg>

      <svg className={styles.branch} style={{ top: "6%", right: "8%", width: 78, height: 78 }} viewBox="0 0 100 100">
        <LeafBranch leaves={2} />
      </svg>
      <svg className={styles.branch} style={{ bottom: "-2%", left: "-2%", width: 150, height: 150 }} viewBox="0 0 100 100">
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
