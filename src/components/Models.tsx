import { useCallback, useEffect, useRef, useState } from 'react';
import { siteModels } from '../data/content';
import { prefersReducedMotion } from '../lib/motion';
import Reveal from './Reveal';

function Chevron({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path d={dir === 'prev' ? 'M14.5 5.5L8 12l6.5 6.5' : 'M9.5 5.5L16 12l-6.5 6.5'} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Models() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState(0);

  const cards = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[];

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const start = el.scrollLeft <= 4;
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setAtStart(start);
    setAtEnd(end);
    const list = cards();
    if (!list.length) return;
    if (end) {
      setActive(list.length - 1);
      return;
    }
    let best = 0;
    list.forEach((li, i) => {
      if (Math.abs(li.offsetLeft - list[0].offsetLeft - el.scrollLeft) < Math.abs(list[best].offsetLeft - list[0].offsetLeft - el.scrollLeft)) best = i;
    });
    setActive(best);
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

  const behavior = (): ScrollBehavior => (prefersReducedMotion() ? 'auto' : 'smooth');

  const goTo = (i: number) => {
    const el = trackRef.current;
    const list = cards();
    if (!el || !list[i]) return;
    el.scrollTo({ left: list[i].offsetLeft - list[0].offsetLeft, behavior: behavior() });
  };

  const go = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const list = cards();
    const step = list.length > 1 ? list[1].offsetLeft - list[0].offsetLeft : el.clientWidth;
    const perView = Math.max(1, Math.floor((el.clientWidth + 1) / step));
    el.scrollBy({ left: dir * step * perView, behavior: behavior() });
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
              <p className="models-count">
                <span className="models-count-num">{String(active + 1).padStart(2, '0')}</span>
                <span className="models-count-sep"> / </span>
                {String(siteModels.length).padStart(2, '0')}
              </p>
              <p className="models-hint">Deslize ou use os botões para ver todos</p>
            </div>
            <div className={`models-stage${atStart ? '' : ' fade-l'}${atEnd ? '' : ' fade-r'}`}>
              <button type="button" className="models-btn prev" onClick={() => go(-1)} disabled={atStart} aria-label="Ver modelos anteriores">
                <Chevron dir="prev" />
              </button>
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
              <button type="button" className="models-btn next" onClick={() => go(1)} disabled={atEnd} aria-label="Ver próximos modelos">
                <Chevron dir="next" />
              </button>
            </div>
            <div className="models-dots">
              {siteModels.map((model, i) => (
                <button
                  type="button"
                  key={model.id}
                  className={`models-dot${i === active ? ' on' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`Ir para o modelo ${model.title}`}
                  aria-current={i === active ? 'true' : undefined}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
