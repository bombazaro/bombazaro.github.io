import { render, screen } from '@testing-library/react';
import Contact from './Contact';
import { PRIVATE } from '../test/private';
import Footer from './Footer';

test('contact_has_six_links_with_exact_hrefs', () => {
  render(<Contact />);
  const hrefs = screen.getAllByRole('link').map((a) => a.getAttribute('href'));
  expect(hrefs).toEqual([
    'https://wa.me/5548984555696',
    'https://instagram.com/bombazaro.sites',
    'mailto:bombazarobernardo@gmail.com',
    'https://www.linkedin.com/in/bernardo-silva-bombazaro-855b65276',
    'https://github.com/bombazaro',
    '/curriculo-bernardo-bombazaro.pdf',
  ]);
});

test('whatsapp_is_primary_button_and_hides_the_number_in_the_label', () => {
  render(<Contact />);
  const wa = screen.getByRole('link', { name: 'WhatsApp' });
  expect(wa).toHaveClass('btn-main');
});

test('instagram_label_is_just_the_name', () => {
  render(<Contact />);
  expect(screen.getByRole('link', { name: 'Instagram' })).toBeInTheDocument();
});

test('external_contact_links_open_in_new_tab', () => {
  render(<Contact />);
  screen.getAllByRole('link').forEach((a) => {
    if (a.getAttribute('href')!.startsWith('mailto:')) {
      expect(a).not.toHaveAttribute('target');
    } else {
      expect(a).toHaveAttribute('target', '_blank');
      expect(a).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});

test('contact_section_has_id_and_heading', () => {
  const { container } = render(<Contact />);
  expect(container.querySelector('section#contato')).not.toBeNull();
  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Vamos tirar seu negócio do papel?');
});

test('footer_shows_only_city_and_state', () => {
  render(<Footer />);
  const footer = screen.getByRole('contentinfo');
  expect(footer).toHaveTextContent('© 2026 Bernardo Silva Bombazaro · Palhoça/SC');
  expect(footer).not.toHaveTextContent(PRIVATE);
});
