import { useEffect, useRef, useState } from 'react';
import { links } from '../data/content';

const sections = [
  { id: 'projetos', label: 'Projetos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'contato', label: 'Contato' },
];

const DESKTOP_MIN_WIDTH = 860;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The mobile menu only exists below 861 px: close it when the window becomes wide.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > DESKTOP_MIN_WIDTH) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // While the menu is open: focus moves into it, Tab stays inside it, and the page behind is inert.
  useEffect(() => {
    if (!open) return;
    const behind = Array.from(document.querySelectorAll<HTMLElement>('main, footer'));
    behind.forEach((el) => el.setAttribute('inert', ''));
    const links = Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a') ?? []);
    links[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || links.length === 0) return;
      const last = links[links.length - 1];
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        burgerRef.current?.focus();
      } else if (event.shiftKey && document.activeElement === burgerRef.current) {
        event.preventDefault();
        last.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      behind.forEach((el) => el.removeAttribute('inert'));
    };
  }, [open]);

  // Keep track of which sections are in the reading band; no section in the band means no active link.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        const current = [...sections].reverse().find((s) => visible.has(s.id));
        setActive(current?.id ?? '');
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="wrap nav">
          <a className="logo" href="#topo">
            Bernardo<span>.dev</span>
          </a>
          <nav className="links" aria-label="Principal">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'active' : ''} aria-current={active === s.id ? 'true' : undefined}>
                {s.label}
              </a>
            ))}
            <a className="cv" href={links.cv} target="_blank" rel="noopener noreferrer">
              Currículo
            </a>
          </nav>
          <button
            ref={burgerRef}
            className="burger"
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </header>
      <nav id="menu-mobile" ref={menuRef} className="mobile-menu" aria-label="Menu móvel" hidden={!open}>
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)}>
            {s.label}
          </a>
        ))}
        <a href={links.cv} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
          Currículo
        </a>
      </nav>
    </>
  );
}
