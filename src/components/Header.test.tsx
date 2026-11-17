import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import SkipLink from './SkipLink';

const burger = () => screen.getByRole('button', { name: /menu/i });

test('burger_toggles_menu_and_aria_expanded', async () => {
  render(<Header />);
  expect(burger()).toHaveAttribute('aria-expanded', 'false');
  expect(document.getElementById('menu-mobile')).toHaveAttribute('hidden');
  await userEvent.click(burger());
  expect(burger()).toHaveAttribute('aria-expanded', 'true');
  expect(burger()).toHaveAttribute('aria-controls', 'menu-mobile');
  expect(document.getElementById('menu-mobile')).not.toHaveAttribute('hidden');
  await userEvent.click(burger());
  expect(burger()).toHaveAttribute('aria-expanded', 'false');
});

test('escape_closes_menu_and_returns_focus_to_burger', async () => {
  render(<Header />);
  await userEvent.click(burger());
  const firstLink = document.querySelector('#menu-mobile a') as HTMLElement;
  firstLink.focus();
  await userEvent.keyboard('{Escape}');
  expect(burger()).toHaveAttribute('aria-expanded', 'false');
  expect(burger()).toHaveFocus();
});

test('clicking_a_menu_link_closes_menu', async () => {
  render(<Header />);
  await userEvent.click(burger());
  await userEvent.click(document.querySelector('#menu-mobile a[href="#sobre"]') as HTMLElement);
  expect(burger()).toHaveAttribute('aria-expanded', 'false');
});

test('adds_scrolled_class_after_scrolling_past_30px', () => {
  render(<Header />);
  const header = screen.getByRole('banner');
  expect(header).not.toHaveClass('scrolled');
  act(() => {
    Object.defineProperty(window, 'scrollY', { value: 40, configurable: true });
    fireEvent.scroll(window);
  });
  expect(header).toHaveClass('scrolled');
  act(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    fireEvent.scroll(window);
  });
  expect(header).not.toHaveClass('scrolled');
});

test('desktop_nav_has_the_three_sections', () => {
  render(<Header />);
  const nav = screen.getByRole('navigation', { name: 'Principal' });
  const hrefs = Array.from(nav.querySelectorAll('a')).map((a) => a.getAttribute('href'));
  expect(hrefs).toEqual(expect.arrayContaining(['#projetos', '#sobre', '#contato']));
});

test('curriculo_link_points_to_pdf_in_public', () => {
  render(<Header />);
  const cv = screen.getAllByRole('link', { name: 'Currículo' })[0];
  expect(cv.getAttribute('href')).toMatch(/\/curriculo-bernardo-bombazaro\.pdf$/);
  expect(cv).not.toHaveAttribute('download');
  expect(cv).toHaveAttribute('target', '_blank');
});

test('skip_link_targets_main_content', () => {
  render(<SkipLink />);
  const link = screen.getByRole('link', { name: 'Pular para o conteúdo' });
  expect(link).toHaveAttribute('href', '#conteudo');
});

test('mobile_menu_is_not_inside_the_header_so_backdrop_filter_cannot_trap_it', () => {
  render(<Header />);
  const menu = document.getElementById('menu-mobile')!;
  expect(menu.closest('header')).toBeNull();
  expect(menu.tagName).toBe('NAV');
});

test('menu_has_servicos_between_projetos_and_sobre', () => {
  render(<Header />);
  const hrefs = Array.from(document.querySelectorAll('header nav a')).map((a) => a.getAttribute('href'));
  expect(hrefs.indexOf('#servicos')).toBeGreaterThan(hrefs.indexOf('#projetos'));
  expect(hrefs.indexOf('#servicos')).toBeLessThan(hrefs.indexOf('#sobre'));
});
