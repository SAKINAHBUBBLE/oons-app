// Calcule les instants (en ms) auxquels la roue franchit chaque limite de
// segment pendant l'animation, en suivant EXACTEMENT la même easing CSS que
// la rotation visuelle (voir Wheel.module.css : cubic-bezier(0.17, 0.89, 0.25, 1)
// sur 3.5s). Les clics résultants ralentissent donc naturellement avec la
// roue, sans minutage codé en dur.

function cubicBezierY(x1: number, y1: number, x2: number, y2: number, x: number): number {
  function bezierComponent(t: number, p1: number, p2: number): number {
    const inverse = 1 - t;
    return 3 * inverse * inverse * t * p1 + 3 * inverse * t * t * p2 + t * t * t;
  }

  let low = 0;
  let high = 1;
  let t = x;
  for (let i = 0; i < 20; i++) {
    const guessX = bezierComponent(t, x1, x2);
    if (Math.abs(guessX - x) < 1e-4) break;
    if (guessX < x) {
      low = t;
    } else {
      high = t;
    }
    t = (low + high) / 2;
  }
  return bezierComponent(t, y1, y2);
}

export function computeTickDelaysMs(
  totalRotationDeg: number,
  durationMs: number,
  segmentAngleDeg: number,
): number[] {
  const boundaryCount = Math.floor(totalRotationDeg / segmentAngleDeg);
  if (boundaryCount <= 0) return [];

  const targetFractions = Array.from(
    { length: boundaryCount },
    (_, index) => ((index + 1) * segmentAngleDeg) / totalRotationDeg,
  );

  const delays: number[] = [];
  const samples = 600;
  let prevT = 0;
  let prevProgress = 0;
  let boundaryIndex = 0;

  for (let sample = 1; sample <= samples; sample++) {
    const t = sample / samples;
    const progress = cubicBezierY(0.17, 0.89, 0.25, 1, t);

    while (
      boundaryIndex < targetFractions.length &&
      targetFractions[boundaryIndex] >= prevProgress &&
      targetFractions[boundaryIndex] <= progress
    ) {
      const fraction = targetFractions[boundaryIndex];
      const ratio = progress === prevProgress ? 0 : (fraction - prevProgress) / (progress - prevProgress);
      const time = prevT + ratio * (t - prevT);
      delays.push(time * durationMs);
      boundaryIndex++;
    }

    prevT = t;
    prevProgress = progress;
  }

  return delays;
}
