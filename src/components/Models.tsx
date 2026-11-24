import { type KeyboardEvent, type MouseEvent, type PointerEvent, useRef, useState } from 'react';
import { siteModels } from '../data/content';
import Reveal from './Reveal';

function Chevron({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
      <path d={dir === 'prev' ? 'M14.5 5.5L8 12l6.5 6.5' : 'M9.5 5.5L16 12l-6.5 6.5'} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const total = siteModels.length;
const wrap = (i: number) => (i + total) % total;

/** distância circular do cartão até o ativo: -2, -1, 0, 1, 2... */
function offsetOf(i: number, active: number) {
  let o = i - active;
  if (o > total / 2) o -= total;
  if (o < -total / 2) o += total;
  return o;
}

export default function Models() {
  const [active, setActive] = useState(0);
  const startX = useRef<number | null>(null);
  const swiped = useRef(false);

  const go = (dir: 1 | -1) => setActive((a) => wrap(a + dir));

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
  };
  const onDown = (e: PointerEvent) => { startX.current = e.clientX; swiped.current = false; };
  const onUp = (e: PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) { swiped.current = true; go(dx < 0 ? 1 : -1); }
  };
  const onCardClick = (e: MouseEvent, i: number) => {
    if (swiped.current) { e.preventDefault(); swiped.current = false; return; }
    if (i !== active) { e.preventDefault(); setActive(i); }
  };

  const current = siteModels[active];

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
          <div className="spot" role="region" aria-roledescription="carrossel" aria-label="Modelos de site" tabIndex={0} onKeyDown={onKey}>
            <div className="spot-stage" onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => (startX.current = null)}>
              <ul className="spot-track">
                {siteModels.map((model, i) => {
                  const o = offsetOf(i, active);
                  const pos = o === 0 ? 'is-on' : Math.abs(o) === 1 ? (o < 0 ? 'is-l' : 'is-r') : o < 0 ? 'is-ll' : 'is-rr';
                  return (
                    <li key={model.id} className={`spot-item ${pos}`} aria-current={o === 0 ? 'true' : undefined}>
                      <a
                        className="spot-card"
                        href={model.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={o === 0 ? 0 : -1}
                        draggable={false}
                        onClick={(e) => onCardClick(e, i)}
                      >
                        <div className="spot-bar" aria-hidden="true">
                          <span className="spot-dots"><i /><i /><i /></span>
                          <span className="spot-url">{model.href.replace('https://', '').replace(/\/$/, '')}</span>
                        </div>
                        <div className="spot-shot">
                          <img src={model.image.src} alt={model.image.alt} width={800} height={500} loading="lazy" draggable={false} />
                        </div>
                        <h3 className="spot-title">{model.title}</h3>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <button type="button" className="spot-btn prev" onClick={() => go(-1)} aria-label="Ver modelo anterior">
                <Chevron dir="prev" />
              </button>
              <button type="button" className="spot-btn next" onClick={() => go(1)} aria-label="Ver próximo modelo">
                <Chevron dir="next" />
              </button>
            </div>

            <div className="spot-info" aria-live="polite">
              <p className="spot-count mono">
                <span>{String(active + 1).padStart(2, '0')}</span> / {String(total).padStart(2, '0')}
              </p>
              <p className="spot-name">{current.title}</p>
              <a className="spot-open" href={current.href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
                Abrir modelo
              </a>
            </div>

            <div className="spot-tabs" role="group" aria-label="Escolher o tipo de negócio">
              {siteModels.map((model, i) => (
                <button
                  type="button"
                  key={model.id}
                  className={`spot-tab${i === active ? ' on' : ''}`}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                >
                  {model.title}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
