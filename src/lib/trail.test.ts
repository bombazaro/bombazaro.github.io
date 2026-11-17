import { type TrailPoint, addTrailPoint } from './trail';

test('addTrailPoint_ignores_points_closer_than_the_minimum_distance', () => {
  const points: TrailPoint[] = [];
  expect(addTrailPoint(points, 10, 10)).toBe(true);
  expect(addTrailPoint(points, 12, 11)).toBe(false);
  expect(points).toHaveLength(1);
  expect(addTrailPoint(points, 30, 10)).toBe(true);
  expect(points).toHaveLength(2);
});

test('addTrailPoint_caps_the_number_of_points_dropping_the_oldest', () => {
  const points: TrailPoint[] = [];
  for (let i = 0; i < 200; i++) addTrailPoint(points, i * 20, 0, 40);
  expect(points).toHaveLength(40);
  expect(points[0].x).toBe(160 * 20);
  expect(points[39].x).toBe(199 * 20);
});

test('addTrailPoint_new_points_start_with_full_life', () => {
  const points: TrailPoint[] = [];
  addTrailPoint(points, 5, 5);
  expect(points[0]).toEqual({ x: 5, y: 5, life: 1 });
});
