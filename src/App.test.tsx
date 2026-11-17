import { render, screen } from '@testing-library/react';
import App from './App';

test('renders_main_heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Interfaces/);
});

test('page_order_is_hero_projetos_servicos_sobre_contato', () => {
  const { container } = render(<App />);
  const ids = Array.from(container.querySelectorAll('main > section')).map((s) => s.id);
  expect(ids).toEqual(['projetos', 'servicos', 'sobre', 'contato']);
});
