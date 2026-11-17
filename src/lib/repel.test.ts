import { repelOffset } from './repel';

test('pushes_directly_away_from_the_pointer', () => {
  const o = repelOffset({ x: 300, y: 300 }, { x: 250, y: 300 }, 200, 40);
  expect(o.x).toBeGreaterThan(0);
  expect(o.y).toBeCloseTo(0);
});

test('push_grows_as_the_pointer_gets_closer', () => {
  const far = repelOffset({ x: 300, y: 300 }, { x: 180, y: 300 }, 200, 40);
  const near = repelOffset({ x: 300, y: 300 }, { x: 280, y: 300 }, 200, 40);
  expect(near.x).toBeGreaterThan(far.x);
});

test('no_push_at_or_beyond_the_radius', () => {
  expect(repelOffset({ x: 300, y: 300 }, { x: 100, y: 300 }, 200, 40)).toEqual({ x: 0, y: 0 });
  expect(repelOffset({ x: 300, y: 300 }, { x: 900, y: 900 }, 200, 40)).toEqual({ x: 0, y: 0 });
});

test('never_pushes_further_than_the_maximum', () => {
  const o = repelOffset({ x: 300, y: 300 }, { x: 300, y: 300 }, 200, 40);
  expect(Math.hypot(o.x, o.y)).toBeLessThanOrEqual(40);
  expect(Number.isFinite(o.x) && Number.isFinite(o.y)).toBe(true);
});
