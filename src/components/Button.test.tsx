import { render, screen } from '@testing-library/react';
import Button from './Button';

test('Button_variant_class', () => {
  render(<Button href="#a" variant="main">Principal</Button>);
  expect(screen.getByRole('link', { name: 'Principal' })).toHaveClass('btn', 'btn-main');
  render(<Button href="#b" variant="ghost">Secundário</Button>);
  expect(screen.getByRole('link', { name: 'Secundário' })).toHaveClass('btn', 'btn-ghost');
});

test('Button_external_has_rel_noopener', () => {
  render(<Button href="https://example.com" variant="main" external>Fora</Button>);
  const link = screen.getByRole('link', { name: 'Fora' });
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});

test('Button_internal_has_no_target', () => {
  render(<Button href="#x" variant="ghost">Dentro</Button>);
  expect(screen.getByRole('link', { name: 'Dentro' })).not.toHaveAttribute('target');
});
