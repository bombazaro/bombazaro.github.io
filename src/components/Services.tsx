import Button from './Button';
import Reveal from './Reveal';
import { links, quoteMessage, services } from '../data/content';
import { whatsappUrl } from '../lib/links';

export default function Services() {
  return (
    <section id="servicos">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow mono">Serviços</div>
          <h2>
            Sites simples que <span className="grad">funcionam</span>.
          </h2>
          <p className="sub">Atendo pequenos e grandes negócios. Você conta o que precisa e eu cuido do resto.</p>
        </Reveal>
        <div className="services">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 90}>
              <div className="glow service">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="services-cta">
            <Button href={whatsappUrl('48984555696', quoteMessage)} variant="main" external>
              Pedir orçamento
            </Button>
            <Button href={links.instagram} variant="ghost" external>
              Ver o Instagram
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
