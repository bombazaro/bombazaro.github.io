import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import * as matchers from 'vitest-axe/matchers';
import App from './App';
import { clearMedia, mockMedia } from './test/media';
import { ARROWS, DASHES } from './test/dashes';

expect.extend(matchers);

beforeEach(() => mockMedia({ reduceMotion: true, finePointer: false }));
afterEach(() => clearMedia());

test('App_has_no_axe_violations', async () => {
  const { container } = render(<App />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('App_has_exactly_one_h1_and_landmarks', () => {
  render(<App />);
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getAllByRole('main')).toHaveLength(1);
  expect(screen.getAllByRole('banner')).toHaveLength(1);
  expect(screen.getAllByRole('contentinfo')).toHaveLength(1);
  expect(screen.getByRole('navigation', { name: 'Principal' })).toBeInTheDocument();
});

test('all_images_have_alt_text', () => {
  const { container } = render(<App />);
  container.querySelectorAll('img').forEach((img) => expect(img.getAttribute('alt')).toBeTruthy());
});

test('heading_levels_never_skip', () => {
  const { container } = render(<App />);
  const levels = Array.from(container.querySelectorAll('h1,h2,h3')).map((h) => Number(h.tagName[1]));
  levels.reduce((prev, level) => {
    expect(level - prev).toBeLessThanOrEqual(1);
    return level;
  }, 0);
});

test('skip_link_is_the_first_focusable_element', () => {
  const { container } = render(<App />);
  const first = container.querySelector('a, button') as HTMLElement;
  expect(first).toHaveTextContent('Pular para o conteúdo');
});

test('whole_page_has_no_dash_characters', () => {
  const { container } = render(<App />);
  expect(container.textContent).not.toMatch(DASHES);
});

test('whole_page_has_no_arrow_characters', () => {
  const { container } = render(<App />);
  expect(container.textContent).not.toMatch(ARROWS);
});

test('page_never_shows_the_phone_number_or_instagram_handle_as_text', () => {
  const { container } = render(<App />);
  expect(container.textContent).not.toMatch(/98455|984555696|\(48\)|bombazaro\.sites|@bombazaro/i);
});
