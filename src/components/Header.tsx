import { useEffect, useRef, useState } from 'react';
import { links } from '../data/content';

const sections = [
  { id: 'projetos', label: 'Projetos' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'contato', label: 'Contato' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
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
    <nav id="menu-mobile" className="mobile-menu" aria-label="Menu móvel" hidden={!open}>
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
