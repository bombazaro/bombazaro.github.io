import { render, screen, within } from '@testing-library/react';
import { services } from '../data/content';
import Services from './Services';

test('Services_is_a_section_with_id_servicos_and_an_h2', () => {
  const { container } = render(<Services />);
  expect(container.querySelector('section#servicos')).not.toBeNull();
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/funcionam/i);
});

test('Services_lists_the_three_offers_as_h3', () => {
  render(<Services />);
  const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
  expect(titles).toEqual(services.map((s) => s.title));
});

test('Services_cta_opens_whatsapp_with_a_prefilled_message_without_showing_the_number', () => {
  const { container } = render(<Services />);
  const cta = screen.getByRole('link', { name: 'Pedir orçamento' });
  const href = cta.getAttribute('href')!;
  expect(href.startsWith('https://wa.me/5548984555696?text=')).toBe(true);
  expect(decodeURIComponent(href)).toMatch(/orçamento/i);
  expect(cta).toHaveAttribute('target', '_blank');
  expect(container.textContent).not.toMatch(/98455|\(48\)/);
});

test('Services_items_are_inside_the_section', () => {
  const { container } = render(<Services />);
  expect(within(container.querySelector('section') as HTMLElement).getAllByRole('heading', { level: 3 })).toHaveLength(3);
});
