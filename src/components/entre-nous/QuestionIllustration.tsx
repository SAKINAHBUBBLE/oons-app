import type { ReactNode } from "react";
import type { QuestionIllustrationKind } from "@/data/question-screens";

function DefiIllustration() {
  return (
    <>
      <circle cx="100" cy="108" r="68" fill="#e4f1fc" opacity="0.6" />
      <path d="M18 152 L70 68 L112 152 Z" fill="#c5dcf5" opacity="0.9" />
      <path d="M88 152 L140 58 L190 152 Z" fill="#6dafea" opacity="0.85" />
      <path d="M52 152 L110 52 L168 152 Z" fill="#1873be" opacity="0.9" />
      <path d="M110 52 L128 84 L110 84 Z" fill="#c5dcf5" opacity="0.6" />
      <path d="M110 52 L110 20" stroke="#07536a" strokeWidth="3" strokeLinecap="round" />
      <path d="M110 20 L136 28 L110 36 Z" fill="#1873be" />
    </>
  );
}

function DouxIllustration() {
  const petals: { rotate: number; color: string }[] = [
    { rotate: 0, color: "#f5b6b2" },
    { rotate: -28, color: "#f7c5c1" },
    { rotate: 28, color: "#f8d6b3" },
    { rotate: -52, color: "#f9dfc4" },
    { rotate: 52, color: "#f9e5ad" },
  ];
  return (
    <>
      <circle cx="100" cy="115" r="70" fill="#f9dfc4" opacity="0.35" />
      {petals.map((petal, index) => (
        <path
          key={index}
          d="M100 148 C82 105 82 55 100 20 C118 55 118 105 100 148 Z"
          fill={petal.color}
          opacity="0.85"
          transform={`rotate(${petal.rotate} 100 148)`}
        />
      ))}
      <ellipse
        cx="52"
        cy="128"
        rx="17"
        ry="9"
        fill="#bfd5c6"
        opacity="0.85"
        transform="rotate(-32 52 128)"
      />
      <ellipse
        cx="148"
        cy="128"
        rx="17"
        ry="9"
        fill="#bfd5c6"
        opacity="0.85"
        transform="rotate(32 148 128)"
      />
      <g transform="translate(88, 6) scale(0.24)">
        <path
          d="M50 88 C8 60 8 24 34 14 C44 10 50 20 50 20 C50 20 56 10 66 14 C92 24 92 60 50 88 Z"
          fill="#ed6f70"
        />
      </g>
    </>
  );
}

function ProfondIllustration() {
  return (
    <>
      <circle cx="100" cy="90" r="78" fill="#eae2f5" opacity="0.5" />
      <path
        d="M0 152 C40 122 70 122 100 144 C130 122 160 122 200 152 L200 200 L0 200 Z"
        fill="#d8c9eb"
        opacity="0.85"
      />
      <path
        d="M0 172 C50 146 80 146 110 168 C140 146 170 146 200 172 L200 200 L0 200 Z"
        fill="#b39acf"
        opacity="0.9"
      />
      <path d="M0 190 C60 168 140 168 200 190 L200 200 L0 200 Z" fill="#7764a6" opacity="0.85" />
      <rect x="20" y="196" width="160" height="2.4" fill="#b39acf" opacity="0.4" />
      <path
        d="M118 38 C86 42 62 68 62 98 C62 128 86 154 118 158 C94 146 80 124 80 98 C80 72 94 50 118 38 Z"
        fill="#f5be62"
      />
      <path d="M150 34 L154 46 L166 50 L154 54 L150 66 L146 54 L134 50 L146 46 Z" fill="#f5be62" opacity="0.85" />
      <circle cx="48" cy="58" r="3" fill="#7764a6" opacity="0.55" />
      <circle cx="164" cy="80" r="2.4" fill="#7764a6" opacity="0.5" />
    </>
  );
}

function SpirituelIllustration() {
  return (
    <>
      <circle cx="100" cy="108" r="74" fill="#d8ead7" opacity="0.4" />
      <path
        d="M42 188 L42 112 C42 62 68 32 100 32 C132 32 158 62 158 112 L158 188 Z"
        fill="#a8cbaa"
        opacity="0.9"
      />
      <path
        d="M56 188 L56 114 C56 74 76 46 100 46 C124 46 144 74 144 114 L144 188 Z"
        fill="none"
        stroke="#fff9f2"
        strokeWidth="2.5"
        opacity="0.7"
      />
      <path
        d="M116 84 C96 86 82 100 82 116 C82 132 96 146 116 148 C102 140 92 128 92 116 C92 104 102 92 116 84 Z"
        fill="#f6be63"
      />
      <path d="M44 58 L47 66 L55 69 L47 72 L44 80 L41 72 L33 69 L41 66 Z" fill="#f6be63" opacity="0.85" />
      <circle cx="160" cy="54" r="3" fill="#f6be63" opacity="0.7" />
      <path d="M156 90 L158 96 L164 98 L158 100 L156 106 L154 100 L148 98 L154 96 Z" fill="#f6be63" opacity="0.6" />
    </>
  );
}

function DecaleIllustration() {
  return (
    <>
      <circle cx="100" cy="98" r="76" fill="#eee5f7" opacity="0.4" />
      <path
        d="M100 30 C144 30 176 56 176 92 C176 128 144 150 100 150 C90 150 81 148.8 73 146.4 L40 170 L48 132 C30 118 20 106 20 92 C20 56 56 30 100 30 Z"
        fill="#d9c8ee"
      />
      <path
        d="M70 84 C70 76 76 70 82 73 C88 76 88 89 81 92 C75 94 70 90 70 84 Z"
        fill="#67509f"
      />
      <path
        d="M118 84 C118 76 124 70 130 73 C136 76 136 89 129 92 C123 94 118 90 118 84 Z"
        fill="#67509f"
      />
      <path d="M76 108 C86 122 114 122 124 108" fill="none" stroke="#67509f" strokeWidth="4" strokeLinecap="round" />
      <circle cx="64" cy="104" r="7" fill="#f08aa4" opacity="0.6" />
      <circle cx="136" cy="104" r="7" fill="#f08aa4" opacity="0.6" />
      <path d="M28 40 L32 50 L42 54 L32 58 L28 68 L24 58 L14 54 L24 50 Z" fill="#f7be63" />
      <path d="M168 36 C162 30 156 34 158 42 C160 34 168 42 168 36 Z" fill="#ed6f70" />
      <circle cx="180" cy="120" r="4" fill="#8a70c4" opacity="0.6" />
      <circle cx="16" cy="132" r="3.2" fill="#8a70c4" opacity="0.5" />
    </>
  );
}

const ILLUSTRATIONS: Record<QuestionIllustrationKind, () => ReactNode> = {
  defi: DefiIllustration,
  doux: DouxIllustration,
  profond: ProfondIllustration,
  spirituel: SpirituelIllustration,
  decale: DecaleIllustration,
};

interface QuestionIllustrationProps {
  kind: QuestionIllustrationKind;
  size?: number;
}

export function QuestionIllustration({ kind, size = 150 }: QuestionIllustrationProps) {
  const Illustration = ILLUSTRATIONS[kind];
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} aria-hidden="true">
      <Illustration />
    </svg>
  );
}
