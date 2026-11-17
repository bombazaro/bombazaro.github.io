import { fireEvent, render, screen, within } from '@testing-library/react';
import Projects from './Projects';

const card = (name: RegExp | string) => screen.getByRole('heading', { level: 3, name }).closest('article') as HTMLElement;

test('renders_three_project_cards_in_order', () => {
  render(<Projects />);
  const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
  expect(titles[0]).toMatch(/Padaria Bombazaro's/);
  expect(titles[1]).toMatch(/Fluxus/);
  expect(titles[2]).toMatch(/Livrum/);
  expect(screen.getAllByRole('article')).toHaveLength(3);
});

test('padaria_card_is_featured_and_has_ver_site_and_codigo', () => {
  render(<Projects />);
  const padaria = card(/Padaria/);
  expect(padaria).toHaveClass('big');
  expect(within(padaria).getByRole('link', { name: /Ver site/ })).toHaveAttribute('href', 'https://padariabombazaros.netlify.app');
  expect(within(padaria).getByRole('link', { name: 'Código' })).toHaveAttribute('href', 'https://github.com/bombazaro/padaria-bombazaros');
});

test('fluxus_card_has_three_actions_web_apk_code', () => {
  render(<Projects />);
  const links = within(card('Fluxus')).getAllByRole('link');
  expect(links.map((l) => l.textContent)).toEqual(['Abrir na web ↗', 'Baixar APK', 'Código']);
});

test('livrum_card_shows_em_equipe_badge_and_honest_note', () => {
  render(<Projects />);
  const livrum = card(/Livrum/);
  expect(within(livrum).getByText('em equipe')).toBeInTheDocument();
  expect(within(livrum).getByText(/reescrita em Python pelo colega/)).toBeInTheDocument();
  expect(within(livrum).getByText(/83 commits/)).toBeInTheDocument();
});

test('every_action_link_opens_in_new_tab_with_noopener', () => {
  render(<Projects />);
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(7);
  links.forEach((l) => {
    expect(l).toHaveAttribute('target', '_blank');
    expect(l).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

test('broken_image_falls_back_to_title_block_and_keeps_text', () => {
  render(<Projects />);
  const padaria = card(/Padaria/);
  fireEvent.error(within(padaria).getByRole('img'));
  expect(within(padaria).queryByRole('img')).not.toBeInTheDocument();
  expect(within(padaria).getByRole('heading', { level: 3 })).toBeVisible();
  expect(padaria.querySelector('.shot-fallback')).not.toBeNull();
  expect(within(padaria).getByText(/Site de uma padaria real/)).toBeInTheDocument();
});

test('project_without_image_uses_fallback_block_from_the_start', () => {
  render(<Projects />);
  expect(card(/Livrum/).querySelector('.shot-fallback')).not.toBeNull();
});

test('images_have_dimensions_and_lazy_loading_to_avoid_layout_jump', () => {
  render(<Projects />);
  screen.getAllByRole('img').forEach((img) => {
    expect(img).toHaveAttribute('width');
    expect(img).toHaveAttribute('height');
    expect(img).toHaveAttribute('loading', 'lazy');
  });
});

test('section_has_id_projetos_and_h2', () => {
  const { container } = render(<Projects />);
  expect(container.querySelector('section#projetos')).not.toBeNull();
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Coisas que eu construí e estão no ar.');
});
