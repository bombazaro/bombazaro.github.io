import { useCallback, useEffect, useRef, useState } from 'react';
import { siteModels } from '../data/content';
import { prefersReducedMotion } from '../lib/motion';
import Reveal from './Reveal';

function Chevron({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Models() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const go = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <section id="modelos">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow mono">Modelos</div>
          <h2>
            Veja como pode ficar o <span className="grad">seu site</span>.
          </h2>
          <p className="sub">
            Modelos de demonstração que criei para cada tipo de negócio. Nome, horário e endereço são de exemplo: no
            seu, entram os seus dados.
          </p>
        </Reveal>
        <Reveal>
          <div className="models-carousel" role="region" aria-roledescription="carrossel" aria-label="Modelos de site">
            <div className="models-head">
              <p className="models-count mono">{siteModels.length} modelos</p>
              <div className="models-nav">
                <button type="button" className="models-btn" onClick={() => go(-1)} disabled={atStart} aria-label="Ver modelos anteriores">
                  <Chevron dir="prev" />
                </button>
                <button type="button" className="models-btn" onClick={() => go(1)} disabled={atEnd} aria-label="Ver próximos modelos">
                  <Chevron dir="next" />
                </button>
              </div>
            </div>
            <ul className="models" ref={trackRef}>
              {siteModels.map((model) => (
                <li key={model.id}>
                  <a className="glow mcard" href={model.href} target="_blank" rel="noopener noreferrer">
                    <div className="shot">
                      <img src={model.image.src} alt={model.image.alt} width={800} height={500} loading="lazy" />
                    </div>
                    <h3>{model.title}</h3>
                    <span className="mcard-link">Ver modelo</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
