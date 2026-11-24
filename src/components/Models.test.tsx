import { render, screen, within } from '@testing-library/react';
import { siteModels } from '../data/content';
import Models from './Models';

test('Models_is_a_section_with_id_modelos_and_an_h2', () => {
  const { container } = render(<Models />);
  expect(container.querySelector('section#modelos')).not.toBeNull();
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/seu site/i);
});

test('Models_shows_every_model_in_order', () => {
  render(<Models />);
  const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
  expect(titles).toEqual(['Barbearia', 'Salão de beleza', 'Padaria', 'Pet shop', 'Oficina', 'Restaurante', 'Relojoaria e joalheria', 'Academia', 'Consultório odontológico', 'Serviços de manutenção']);
});

test('every_model_card_opens_its_published_demo_in_a_new_tab', () => {
  render(<Models />);
  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(siteModels.length);
  links.forEach((link) => {
    expect(link.getAttribute('href')).toMatch(/^https:\/\/bombazaro-[a-z]+\.pages\.dev\/$/);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link.getAttribute('rel')).toContain('noopener');
  });
});

test('every_model_card_has_a_screenshot_with_alt_text', () => {
  render(<Models />);
  screen.getAllByRole('link').forEach((link) => {
    const img = within(link).getByRole('img');
    expect(img.getAttribute('alt')).toMatch(/^Página inicial do modelo de site para /);
    expect(img.getAttribute('src')).toMatch(/\/modelos\/[a-z]+\.webp$/);
  });
});

test('Models_carousel_has_labelled_prev_and_next_buttons_and_type_tabs', () => {
  render(<Models />);
  expect(screen.getByRole('region', { name: 'Modelos de site' })).not.toBeNull();
  expect(screen.getByRole('button', { name: 'Ver modelo anterior' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Ver próximo modelo' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Barbearia' })).toHaveAttribute('aria-pressed', 'true');
});

test('Models_next_button_moves_to_the_next_model', async () => {
  const { container } = render(<Models />);
  screen.getByRole('button', { name: 'Ver próximo modelo' }).click();
  expect(await screen.findByRole('button', { name: siteModels[1].title, pressed: true })).toBeInTheDocument();
  expect(container.querySelectorAll('.spot-item.is-on')).toHaveLength(1);
});
