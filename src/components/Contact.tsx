import { contactLabels, links } from '../data/content';
import Button from './Button';
import Reveal from './Reveal';

export default function Contact() {
  return (
    <section id="contato">
      <div className="wrap">
        <Reveal>
        <div className="glow contact">
          <div className="eyebrow mono">Contato</div>
          <h2>
            Vamos tirar seu negócio <span className="grad">do papel</span>?
          </h2>
          <p>
            Faço sites para pequenos e grandes negócios. Me chame no WhatsApp ou no Instagram e conte o que você
            precisa. Também aceito conversar sobre vagas.
          </p>
          <div className="cta">
            <Button href={links.whatsapp} variant="main" external>
              {contactLabels.whatsapp}
            </Button>
            <Button href={links.instagram} variant="ghost" external>
              {contactLabels.instagram}
            </Button>
            <Button href={links.email} variant="ghost">
              E-mail
            </Button>
            <Button href={links.linkedin} variant="ghost" external>
              LinkedIn
            </Button>
            <Button href={links.github} variant="ghost" external>
              GitHub
            </Button>
            <Button href={links.cv} variant="ghost" external>
              Currículo
            </Button>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
