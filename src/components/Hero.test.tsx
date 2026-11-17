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

test('Hero_secondary_cta_goes_to_github', () => {
  render(<Hero />);
  expect(screen.getByRole('link', { name: 'Currículo e GitHub' })).toHaveAttribute('href', 'https://github.com/bombazaro');
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

test('GlassStack_moves_layers_with_fine_pointer', () => {
  mockMedia({ reduceMotion: false, finePointer: true });
  const { container } = render(<GlassStack />);
  fireEvent(document, new MouseEvent('pointermove', { clientX: 10, clientY: 10 }));
  const layers = container.querySelectorAll<HTMLElement>('.layer');
  expect(layers.length).toBe(3);
  layers.forEach((l) => expect(l.style.transform).toMatch(/translate\(/));
});

test('GlassStack_does_not_move_layers_on_touch_devices', () => {
  mockMedia({ reduceMotion: false, finePointer: false });
  const { container } = render(<GlassStack />);
  fireEvent(document, new MouseEvent('pointermove', { clientX: 10, clientY: 10 }));
  container.querySelectorAll<HTMLElement>('.layer').forEach((l) => expect(l.style.transform).toBe(''));
});
