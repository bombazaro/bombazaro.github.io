import { fireEvent, render, screen } from '@testing-library/react';
import { clearMedia, mockMedia } from '../test/media';
import GlassStack from './GlassStack';
import Hero from './Hero';

beforeEach(() => mockMedia({ reduceMotion: true }));
afterEach(() => clearMedia());

test('Hero_has_single_h1_with_headline', () => {
  render(<Hero />);
  const headings = screen.getAllByRole('heading', { level: 1 });
  expect(headings).toHaveLength(1);
  expect(headings[0]).toHaveTextContent('Código limpo. Interfaces que acolhem.');
});

test('Hero_primary_cta_goes_to_instagram_in_new_tab', () => {
  render(<Hero />);
  const cta = screen.getByRole('link', { name: /Quero um site para meu negócio/ });
  expect(cta).toHaveAttribute('href', 'https://instagram.com/bombazaro.sites');
  expect(cta).toHaveAttribute('target', '_blank');
  expect(cta).toHaveClass('btn-main');
});

test('Hero_has_separate_curriculo_and_github_buttons', () => {
  render(<Hero />);
  const cv = screen.getByRole('link', { name: 'Currículo' });
  expect(cv.getAttribute('href')).toMatch(/\/curriculo-bernardo-bombazaro\.pdf$/);
  expect(cv).toHaveAttribute('target', '_blank');
  expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/bombazaro');
});

test('topo_anchor_is_the_hero_wrapper_so_the_logo_link_shows_the_whole_hero', () => {
  render(<Hero />);
  const top = document.getElementById('topo')!;
  const h1 = screen.getByRole('heading', { level: 1 });
  expect(top).not.toBe(h1);
  expect(top).toContainElement(h1);
});

test('Hero_badge_text_is_disponivel_para_projetos', () => {
  render(<Hero />);
  expect(screen.getByText('Disponível para projetos')).toBeInTheDocument();
});

test('Hero_typed_line_is_complete_with_reduced_motion', () => {
  const { container } = render(<Hero />);
  expect(container.querySelector('.typing')).toHaveTextContent('olá, eu sou o Bernardo');
});

test('Hero_shows_the_drawing_and_the_role_chips', () => {
  render(<Hero />);
  expect(screen.getByAltText('Desenho do Bernardo')).toHaveAttribute('src', '/meu-desenho-sem-fundo.webp');
  expect(screen.getByText('Spring Boot')).toBeInTheDocument();
});

test('GlassStack_shows_placeholder_without_avatar_and_image_with_avatar', () => {
  const { unmount } = render(<GlassStack />);
  expect(screen.getByText(/seu desenho/)).toBeInTheDocument();
  expect(screen.queryByAltText('Desenho do Bernardo')).not.toBeInTheDocument();
  unmount();
  render(<GlassStack avatarSrc="/x.webp" />);
  expect(screen.getByAltText('Desenho do Bernardo')).toBeInTheDocument();
});

test('GlassStack_falls_back_to_placeholder_when_image_fails', () => {
  render(<GlassStack avatarSrc="/quebrada.webp" />);
  fireEvent.error(screen.getByAltText('Desenho do Bernardo'));
  expect(screen.queryByAltText('Desenho do Bernardo')).not.toBeInTheDocument();
  expect(screen.getByText(/seu desenho/)).toBeInTheDocument();
});

test('GlassStack_does_not_move_layers_when_reduced_motion', () => {
  const { container } = render(<GlassStack />);
  fireEvent(document, new MouseEvent('pointermove', { clientX: 10, clientY: 10 }));
  container.querySelectorAll<HTMLElement>('.layer').forEach((l) => expect(l.style.transform).toBe(''));
});

test('GlassStack_does_not_move_layers_on_touch_devices', () => {
  mockMedia({ reduceMotion: false, finePointer: false });
  const { container } = render(<GlassStack />);
  fireEvent(document, new MouseEvent('pointermove', { clientX: 10, clientY: 10 }));
  container.querySelectorAll<HTMLElement>('.layer').forEach((l) => expect(l.style.transform).toBe(''));
});

function stubFrames() {
  const queue: FrameRequestCallback[] = [];
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => queue.push(cb));
  vi.stubGlobal('cancelAnimationFrame', () => {});
  return () => queue.splice(0).forEach((cb) => cb(0));
}

function placeLayers(container: HTMLElement, cx: number, cy: number) {
  container.querySelectorAll<HTMLElement>('.layer').forEach((layer) => {
    layer.getBoundingClientRect = () =>
      ({ left: cx - 50, top: cy - 50, width: 100, height: 100, right: cx + 50, bottom: cy + 50, x: cx - 50, y: cy - 50, toJSON: () => ({}) }) as DOMRect;
  });
}

const offsetX = (el: HTMLElement) => Number(/translate\((-?[\d.]+)px/.exec(el.style.transform)![1]);

test('layers_run_away_from_a_pointer_that_comes_close', () => {
  mockMedia({ reduceMotion: false, finePointer: true });
  const flush = stubFrames();
  const { container } = render(<GlassStack avatarSrc="/a.webp" />);
  placeLayers(container, 300, 300);
  fireEvent(document, new MouseEvent('pointermove', { clientX: 250, clientY: 300, bubbles: true }));
  flush();
  const avatar = container.querySelector('.avatar') as HTMLElement;
  expect(offsetX(avatar)).toBeGreaterThan(8);
  vi.unstubAllGlobals();
});

test('layers_stay_still_when_the_pointer_is_far_away', () => {
  mockMedia({ reduceMotion: false, finePointer: true });
  const flush = stubFrames();
  const { container } = render(<GlassStack avatarSrc="/a.webp" />);
  placeLayers(container, 300, 300);
  fireEvent(document, new MouseEvent('pointermove', { clientX: 1200, clientY: 700, bubbles: true }));
  flush();
  container.querySelectorAll<HTMLElement>('.layer').forEach((l) => expect(offsetX(l)).toBe(0));
  vi.unstubAllGlobals();
});

test('layers_return_home_when_the_pointer_leaves_the_page', () => {
  mockMedia({ reduceMotion: false, finePointer: true });
  const flush = stubFrames();
  const { container } = render(<GlassStack avatarSrc="/a.webp" />);
  placeLayers(container, 300, 300);
  fireEvent(document, new MouseEvent('pointermove', { clientX: 250, clientY: 300, bubbles: true }));
  flush();
  fireEvent(document.documentElement, new MouseEvent('pointerleave'));
  flush();
  container.querySelectorAll<HTMLElement>('.layer').forEach((l) => expect(offsetX(l)).toBe(0));
  vi.unstubAllGlobals();
});
