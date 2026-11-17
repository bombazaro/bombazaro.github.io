import { render, screen } from '@testing-library/react';
import App from './App';

test('renders_main_heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Interfaces/);
});
