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
