// Généré paramétriquement (boucle sur 8 dents espacées de 45°) plutôt que
// dessiné à la main : garantit une symétrie parfaite (l'ancien tracé manuel
// présentait une dent déformée/asymétrique).
const TOOTH_ANGLES = Array.from({ length: 8 }, (_, index) => index * 45);

export function SettingsGearIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
      {TOOTH_ANGLES.map((angle) => (
        <rect
          key={angle}
          x="10.8"
          y="2.1"
          width="2.4"
          height="2.6"
          rx="0.9"
          fill="currentColor"
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </svg>
  );
}
