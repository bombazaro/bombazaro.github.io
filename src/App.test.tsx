import { render, screen } from '@testing-library/react';
import App from './App';

test('renders_main_heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Interfaces/);
});

test('page_order_is_hero_projetos_servicos_modelos_sobre_contato', () => {
  const { container } = render(<App />);
  const ids = Array.from(container.querySelectorAll('main > section')).map((s) => s.id);
  expect(ids).toEqual(['projetos', 'servicos', 'modelos', 'sobre', 'contato']);
});

test('main_can_receive_focus_from_the_skip_link_in_older_browsers', () => {
  const { container } = render(<App />);
  expect(container.querySelector('main#conteudo')).toHaveAttribute('tabindex', '-1');
});
