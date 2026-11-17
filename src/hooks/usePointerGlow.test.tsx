import { renderHook } from '@testing-library/react';
import { usePointerGlow } from './usePointerGlow';

let queue: FrameRequestCallback[] = [];
const flush = () => {
  const run = queue;
  queue = [];
  run.forEach((cb) => cb(0));
};

beforeEach(() => {
  queue = [];
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => queue.push(cb));
  vi.stubGlobal('cancelAnimationFrame', () => {});
});

function move(target: Element | Document, x: number, y: number) {
  target.dispatchEvent(new MouseEvent('pointermove', { clientX: x, clientY: y, bubbles: true }));
}

afterEach(() => {
  vi.unstubAllGlobals();
  document.documentElement.removeAttribute('style');
  document.body.innerHTML = '';
});

test('usePointerGlow_sets_root_vars_on_pointermove', () => {
  renderHook(() => usePointerGlow());
  move(document, 120, 80);
  flush();
  const style = document.documentElement.style;
  expect(style.getPropertyValue('--mx')).toBe('120px');
  expect(style.getPropertyValue('--my')).toBe('80px');
});

test('usePointerGlow_sets_element_vars_inside_glow_card', () => {
  document.body.innerHTML = '<div class="glow"><p id="inner">oi</p></div>';
  const card = document.querySelector('.glow') as HTMLElement;
  card.getBoundingClientRect = () => ({ left: 100, top: 50, width: 200, height: 100, right: 300, bottom: 150, x: 100, y: 50, toJSON: () => ({}) });
  renderHook(() => usePointerGlow());
  move(document.getElementById('inner')!, 130, 90);
  flush();
  expect(card.style.getPropertyValue('--x')).toBe('30px');
  expect(card.style.getPropertyValue('--y')).toBe('40px');
});

test('usePointerGlow_sets_element_vars_inside_btn', () => {
  document.body.innerHTML = '<a class="btn" href="#"><span id="label">x</span></a>';
  const btn = document.querySelector('.btn') as HTMLElement;
  btn.getBoundingClientRect = () => ({ left: 10, top: 10, width: 80, height: 30, right: 90, bottom: 40, x: 10, y: 10, toJSON: () => ({}) });
  renderHook(() => usePointerGlow());
  move(document.getElementById('label')!, 25, 20);
  flush();
  expect(btn.style.getPropertyValue('--x')).toBe('15px');
});

test('usePointerGlow_removes_listener_on_unmount', () => {
  const { unmount } = renderHook(() => usePointerGlow());
  unmount();
  move(document, 300, 300);
  flush();
  expect(document.documentElement.style.getPropertyValue('--mx')).toBe('');
});

test('usePointerGlow_batches_many_moves_into_one_frame_and_reads_layout_once', () => {
  document.body.innerHTML = '<div class="glow"><p id="inner">oi</p></div>';
  const card = document.querySelector('.glow') as HTMLElement;
  const rect = vi.fn(() => ({ left: 0, top: 0, width: 100, height: 100, right: 100, bottom: 100, x: 0, y: 0, toJSON: () => ({}) }));
  card.getBoundingClientRect = rect;
  renderHook(() => usePointerGlow());
  const inner = document.getElementById('inner')!;
  move(inner, 10, 10);
  move(inner, 20, 20);
  move(inner, 30, 40);
  expect(queue).toHaveLength(1);
  flush();
  expect(rect).toHaveBeenCalledTimes(1);
  expect(document.documentElement.style.getPropertyValue('--mx')).toBe('30px');
  expect(card.style.getPropertyValue('--y')).toBe('40px');
});
