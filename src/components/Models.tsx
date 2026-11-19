import { siteModels } from '../data/content';
import Reveal from './Reveal';

export default function Models() {
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
        <ul className="models">
          {siteModels.map((model, i) => (
            <li key={model.id}>
              <Reveal delay={(i % 3) * 90}>
                <a className="glow mcard" href={model.href} target="_blank" rel="noopener noreferrer">
                  <div className="shot">
                    <img src={model.image.src} alt={model.image.alt} width={800} height={500} loading="lazy" />
                  </div>
                  <h3>{model.title}</h3>
                  <span className="mcard-link">Ver modelo</span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
