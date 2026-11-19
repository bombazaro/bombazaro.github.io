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

test('menu_has_modelos_between_servicos_and_sobre', () => {
  render(<Header />);
  const hrefs = Array.from(document.querySelectorAll('header nav a')).map((a) => a.getAttribute('href'));
  expect(hrefs.indexOf('#modelos')).toBeGreaterThan(hrefs.indexOf('#servicos'));
  expect(hrefs.indexOf('#modelos')).toBeLessThan(hrefs.indexOf('#sobre'));
});

function mockObserver() {
  const instances: { cb: IntersectionObserverCallback }[] = [];
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(cb: IntersectionObserverCallback) {
        instances.push({ cb });
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  return instances;
}
const entry = (id: string, isIntersecting: boolean) =>
  ({ target: document.getElementById(id)!, isIntersecting }) as unknown as IntersectionObserverEntry;

test('active_link_clears_when_no_section_is_in_view_again', () => {
  const ids = ['projetos', 'servicos', 'sobre', 'contato'];
  ids.forEach((id) => document.body.insertAdjacentHTML('beforeend', `<section id="${id}"></section>`));
  const io = mockObserver();
  render(<Header />);
  const sobre = () => screen.getAllByRole('link', { name: 'Sobre' })[0];
  act(() => io[0].cb([entry('sobre', true)], {} as IntersectionObserver));
  expect(sobre()).toHaveAttribute('aria-current', 'true');
  act(() => io[0].cb([entry('sobre', false)], {} as IntersectionObserver));
  expect(sobre()).not.toHaveAttribute('aria-current');
  ids.forEach((id) => document.getElementById(id)?.remove());
  vi.unstubAllGlobals();
});

test('open_menu_moves_focus_in_traps_tab_and_blocks_the_page_behind', async () => {
  document.body.insertAdjacentHTML('beforeend', '<main id="conteudo"></main><footer id="rodape"></footer>');
  render(<Header />);
  await userEvent.click(burger());
  expect(document.querySelector('main')).toHaveAttribute('inert');
  expect(document.querySelector('footer')).toHaveAttribute('inert');
  const links = Array.from(document.querySelectorAll<HTMLElement>('#menu-mobile a'));
  expect(links[0]).toHaveFocus();
  links[links.length - 1].focus();
  await userEvent.tab();
  expect(burger()).toHaveFocus();
  await userEvent.tab({ shift: true });
  expect(links[links.length - 1]).toHaveFocus();
  await userEvent.click(burger());
  expect(document.querySelector('main')).not.toHaveAttribute('inert');
  expect(document.querySelector('footer')).not.toHaveAttribute('inert');
  document.querySelector('main')?.remove();
  document.querySelector('footer')?.remove();
});

test('menu_closes_by_itself_when_the_window_becomes_wide', async () => {
  render(<Header />);
  await userEvent.click(burger());
  expect(burger()).toHaveAttribute('aria-expanded', 'true');
  act(() => {
    Object.defineProperty(window, 'innerWidth', { value: 1280, configurable: true });
    fireEvent(window, new Event('resize'));
  });
  expect(burger()).toHaveAttribute('aria-expanded', 'false');
});
