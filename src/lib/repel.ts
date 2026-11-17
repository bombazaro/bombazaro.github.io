export type Point = { x: number; y: number };

/**
 * How far an element centred at `center` should move to run away from `pointer`.
 * Zero at or beyond `radius`; grows smoothly up to `maxPush` as the pointer gets closer.
 */
export function repelOffset(center: Point, pointer: Point, radius: number, maxPush: number): Point {
  const dx = center.x - pointer.x;
  const dy = center.y - pointer.y;
  const distance = Math.hypot(dx, dy);
  if (distance >= radius) return { x: 0, y: 0 };
  const strength = (1 - distance / radius) ** 2;
  // Pointer exactly on the centre has no direction: push straight up.
  const ux = distance === 0 ? 0 : dx / distance;
  const uy = distance === 0 ? -1 : dy / distance;
  return { x: ux * strength * maxPush, y: uy * strength * maxPush };
}
