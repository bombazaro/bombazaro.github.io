import { act, render, screen } from '@testing-library/react';
import { clearMedia, mockMedia } from '../test/media';
import Reveal from './Reveal';

type Callback = (entries: Array<{ isIntersecting: boolean; target: Element }>) => void;
let trigger: Callback | null = null;
const original = window.IntersectionObserver;

class FakeObserver {
  constructor(cb: Callback) {
    trigger = cb;
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

afterEach(() => {
  window.IntersectionObserver = original;
  trigger = null;
  clearMedia();
});

test('Reveal_is_visible_immediately_without_IntersectionObserver', () => {
  mockMedia({ reduceMotion: false });
  // @ts-expect-error simulate an old browser
  delete window.IntersectionObserver;
  render(<Reveal><p>conteúdo</p></Reveal>);
  expect(screen.getByText('conteúdo').parentElement).toHaveClass('in');
});

test('Reveal_is_visible_immediately_with_reduced_motion', () => {
  mockMedia({ reduceMotion: true });
  window.IntersectionObserver = FakeObserver as unknown as typeof IntersectionObserver;
  render(<Reveal><p>conteúdo</p></Reveal>);
  expect(screen.getByText('conteúdo').parentElement).toHaveClass('in');
});

test('Reveal_adds_in_class_when_observer_reports_intersection', () => {
  mockMedia({ reduceMotion: false });
  window.IntersectionObserver = FakeObserver as unknown as typeof IntersectionObserver;
  render(<Reveal><p>conteúdo</p></Reveal>);
  const wrapper = screen.getByText('conteúdo').parentElement!;
  expect(wrapper).toHaveClass('rv');
  expect(wrapper).not.toHaveClass('in');
  act(() => trigger!([{ isIntersecting: true, target: wrapper }]));
  expect(wrapper).toHaveClass('in');
});

test('Reveal_applies_delay_as_transition_delay', () => {
  mockMedia({ reduceMotion: false });
  window.IntersectionObserver = FakeObserver as unknown as typeof IntersectionObserver;
  render(<Reveal delay={140}><p>conteúdo</p></Reveal>);
  expect(screen.getByText('conteúdo').parentElement!.getAttribute('style')).toMatch(/transition-delay:\s*140ms/);
});

test('Reveal_keeps_extra_class_names', () => {
  mockMedia({ reduceMotion: true });
  render(<Reveal className="big"><p>x</p></Reveal>);
  expect(screen.getByText('x').parentElement).toHaveClass('big', 'rv');
});
