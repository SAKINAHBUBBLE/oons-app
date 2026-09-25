import type { QuestionScreenPalette } from "@/data/question-screens";
import styles from "./QuestionBackdrop.module.css";

const HEART_PATH =
  "M50 88 C8 60 8 24 34 14 C44 10 50 20 50 20 C50 20 56 10 66 14 C92 24 92 60 50 88 Z";
const DASH_PATH = "M50 6 L58 6 C62 6 62 12 58 60 C56 78 44 78 42 60 C38 12 38 6 42 6 Z";

function LeafBranch({ color, trait, leaves = 4 }: { color: string; trait: string; leaves?: number }) {
  return (
    <g fill="none" stroke={trait} strokeWidth="3" strokeLinecap="round">
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
            fill={color}
            stroke="none"
            transform={`rotate(${side * 35} ${cx + side * 10} ${cy})`}
          />
        );
      })}
    </g>
  );
}

interface QuestionBackdropProps {
  palette: QuestionScreenPalette;
  sparse?: boolean;
}

export function QuestionBackdrop({ palette, sparse = false }: QuestionBackdropProps) {
  const [blobTL, blobTR, blobBL, blobBR] = palette.blobs;
  const [accentA, accentB] = palette.accent;

  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.blob} style={{ top: "-6%", left: "-10%", width: "50%", height: "32%", background: blobTL, opacity: sparse ? 0.6 : 1 }} />
      <div className={styles.blob} style={{ top: "-4%", right: "-10%", width: "38%", height: "28%", background: blobTR, opacity: sparse ? 0.6 : 1 }} />
      <div className={styles.blob} style={{ bottom: "-3%", left: "-8%", width: "46%", height: "20%", background: blobBL, opacity: sparse ? 0.6 : 1 }} />
      <div className={styles.blob} style={{ bottom: "-4%", right: "-10%", width: "42%", height: "20%", background: blobBR, opacity: sparse ? 0.6 : 1 }} />

      <svg className={styles.branch} style={{ top: "8%", right: "10%", width: 30, height: 30, opacity: sparse ? 0.5 : 0.85 }} viewBox="0 0 100 100">
        <LeafBranch color={accentA} trait={palette.branch} leaves={2} />
      </svg>
      {!sparse && (
        <svg className={styles.branch} style={{ bottom: "2%", left: "3%", width: 64, height: 64 }} viewBox="0 0 100 100">
          <LeafBranch color={accentA} trait={palette.branch} leaves={4} />
        </svg>
      )}

      {!sparse && (
        <>
          <svg className={styles.shape} style={{ top: "16%", left: "8%", width: 18, height: 18 }} viewBox="0 0 100 100">
            <path d={HEART_PATH} fill={accentB} />
          </svg>
          <svg className={styles.shape} style={{ top: "22%", right: "8%", width: 14, height: 14, transform: "rotate(15deg)" }} viewBox="0 0 100 100">
            <path d={DASH_PATH} fill={accentA} />
          </svg>
          <svg className={styles.shape} style={{ bottom: "20%", right: "12%", width: 16, height: 16 }} viewBox="0 0 100 100">
            <path d={HEART_PATH} fill={accentA} />
          </svg>
          <svg className={styles.shape} style={{ bottom: "26%", left: "10%", width: 12, height: 12, transform: "rotate(-20deg)" }} viewBox="0 0 100 100">
            <path d={DASH_PATH} fill={accentB} />
          </svg>
        </>
      )}
    </div>
  );
}
