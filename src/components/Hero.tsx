import { heroChips, links, site } from '../data/content';
import { useTypewriter } from '../hooks/useTypewriter';
import Button from './Button';
import Chip from './Chip';
import GlassStack from './GlassStack';
import Reveal from './Reveal';

export default function Hero() {
  const typed = useTypewriter(site.typed);
  return (
    <div className="hero" id="topo">
      <div className="wrap grid">
        <div>
          <Reveal>
          <span className="badge">
            <i aria-hidden="true" />
            Disponível para projetos
          </span>
          <div className="typing mono" aria-hidden="true">
            &gt; {typed}
            <span className="caret" />
          </div>
          </Reveal>
          <Reveal delay={80}>
          <h1>
            Código limpo.{' '}
            <br />
            <span className="grad">Interfaces</span> que acolhem.
          </h1>
          <p className="lead">{site.lead}</p>
          </Reveal>
          <Reveal delay={160}>
          <div className="cta">
            <Button href={links.instagram} variant="main" external>
              Quero um site para meu negócio
            </Button>
            <Button href={links.cv} variant="ghost" external>
              Currículo
            </Button>
            <Button href={links.github} variant="ghost" external>
              GitHub
            </Button>
          </div>
          <div className="chips">
            {heroChips.map((chip) => (
              <Chip key={chip}>{chip}</Chip>
            ))}
          </div>
          </Reveal>
        </div>
        <GlassStack avatarSrc="/meu-desenho-sem-fundo.webp" />
      </div>
    </div>
  );
}
