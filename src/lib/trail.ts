export type TrailPoint = { x: number; y: number; life: number };

/** Adds a point unless it is too close to the previous one; keeps only the newest `max` points. */
export function addTrailPoint(points: TrailPoint[], x: number, y: number, max = 40, minDistance = 6): boolean {
  const last = points[points.length - 1];
  if (last && Math.hypot(x - last.x, y - last.y) < minDistance) return false;
  points.push({ x, y, life: 1 });
  if (points.length > max) points.splice(0, points.length - max);
  return true;
}
