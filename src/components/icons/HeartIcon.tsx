export function HeartIcon({ filled, size = 20 }: { filled: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        d="M12 20.2s-7.2-4.4-9.8-8.7C.6 8 1.7 4.2 5 3c2.2-.9 4.4-.2 5.8 1.5C12.2 2.8 14.4 2.1 16.6 3c3.3 1.2 4.4 5 2.8 8.3C16.8 15.8 12 20.2 12 20.2z"
        fill={filled ? "var(--color-v2-coral)" : "none"}
        stroke="var(--color-v2-coral)"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
