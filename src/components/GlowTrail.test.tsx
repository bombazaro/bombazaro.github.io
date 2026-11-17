import { render } from '@testing-library/react';
import { clearMedia, mockMedia } from '../test/media';
import GlowTrail from './GlowTrail';

afterEach(() => clearMedia());

test('GlowTrail_renders_nothing_for_reduced_motion', () => {
  mockMedia({ reduceMotion: true, finePointer: true });
  const { container } = render(<GlowTrail />);
  expect(container.querySelector('canvas')).toBeNull();
});

test('GlowTrail_renders_nothing_on_coarse_pointer', () => {
  mockMedia({ reduceMotion: false, finePointer: false });
  const { container } = render(<GlowTrail />);
  expect(container.querySelector('canvas')).toBeNull();
});

test('GlowTrail_canvas_is_aria_hidden_and_does_not_block_pointer_events', () => {
  mockMedia({ reduceMotion: false, finePointer: true });
  HTMLCanvasElement.prototype.getContext = (() => null) as unknown as typeof HTMLCanvasElement.prototype.getContext;
  const { container } = render(<GlowTrail />);
  const canvas = container.querySelector('canvas#trail') as HTMLCanvasElement;
  expect(canvas).not.toBeNull();
  expect(canvas).toHaveAttribute('aria-hidden', 'true');
  expect(canvas.className).toBe('trail');
});
