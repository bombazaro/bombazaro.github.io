import { act, fireEvent, renderHook } from '@testing-library/react';
import { clearMedia, mockMedia } from '../test/media';
import { useScrollProgress } from './useScrollProgress';

afterEach(() => clearMedia());

function elementAt(top: number, height: number) {
  const el = document.createElement('div');
  el.getBoundingClientRect = () => ({ top, height, left: 0, width: 0, right: 0, bottom: top + height, x: 0, y: top, toJSON: () => ({}) });
  return { current: el };
}

test('useScrollProgress_is_1_when_reduced_motion', () => {
  mockMedia({ reduceMotion: true });
  const { result } = renderHook(() => useScrollProgress(elementAt(5000, 400)));
  expect(result.current).toBe(1);
});

test('useScrollProgress_clamps_between_0_and_1', () => {
  mockMedia({ reduceMotion: false });
  Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
  const farBelow = renderHook(() => useScrollProgress(elementAt(5000, 400)));
  expect(farBelow.result.current).toBe(0);
  const farAbove = elementAt(-5000, 400);
  const above = renderHook(() => useScrollProgress(farAbove));
  act(() => void fireEvent.scroll(window));
  expect(above.result.current).toBe(1);
});

test('useScrollProgress_is_proportional_in_the_middle', () => {
  mockMedia({ reduceMotion: false });
  Object.defineProperty(window, 'innerHeight', { value: 1000, configurable: true });
  // start line is 65% of the viewport (650). top=450, height=400 => (650-450)/400 = 0.5
  const { result } = renderHook(() => useScrollProgress(elementAt(450, 400)));
  act(() => void fireEvent.scroll(window));
  expect(result.current).toBeCloseTo(0.5, 2);
});
