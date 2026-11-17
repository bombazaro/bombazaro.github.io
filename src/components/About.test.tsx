import { render, screen, within } from '@testing-library/react';
import About from './About';
import Marquee from './Marquee';

test('About_renders_three_timeline_entries_in_order', () => {
  render(<About />);
  const items = within(screen.getByRole('list', { name: 'Linha do tempo' })).getAllByRole('listitem');
  expect(items).toHaveLength(3);
  expect(items[0]).toHaveTextContent('Instrutor de Informática');
  expect(items[1]).toHaveTextContent('Intelbras');
  expect(items[2]).toHaveTextContent('IFSC São José');
});

test('timeline_is_an_ordered_list', () => {
  const { container } = render(<About />);
  expect(container.querySelector('ol')).not.toBeNull();
});

test('About_lists_four_tech_groups_with_expected_chips', () => {
  const { container } = render(<About />);
  const tech = within(container.querySelector('.tech') as HTMLElement); // the marquee repeats names on purpose
  ['Programação', 'Banco de dados', 'Ferramentas', 'Pessoal'].forEach((title) =>
    expect(tech.getByRole('heading', { level: 3, name: title })).toBeInTheDocument(),
  );
  ['Java', 'Spring Boot', 'React', 'SQL', 'Supabase / PostgreSQL', 'Git / GitHub'].forEach((chip) =>
    expect(tech.getByText(chip)).toBeInTheDocument(),
  );
});

test('apae_is_not_in_the_timeline', () => {
  render(<About />);
  expect(screen.queryByText(/APAE/)).not.toBeInTheDocument();
});

test('About_has_section_id_sobre_and_h2', () => {
  const { container } = render(<About />);
  expect(container.querySelector('section#sobre')).not.toBeNull();
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Estudo, ensino e construo.');
});

test('Marquee_is_hidden_from_assistive_tech', () => {
  const { container } = render(<Marquee items={['React', 'Java']} />);
  expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  expect(container.querySelectorAll('span')).toHaveLength(4);
});
