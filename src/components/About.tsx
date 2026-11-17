import { marqueeItems, site, techGroups, timeline } from '../data/content';
import Marquee from './Marquee';
import Reveal from './Reveal';
import TechGroups from './TechGroups';
import Timeline from './Timeline';

export default function About() {
  return (
    <section id="sobre">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow mono">Sobre</div>
          <h2>
            Estudo, ensino e <span className="grad">construo</span>.
          </h2>
        </Reveal>
        <div className="about">
          <div>
            <Reveal>
              <p>{site.about}</p>
            </Reveal>
            <Reveal delay={100}>
              <Timeline items={timeline} />
            </Reveal>
          </div>
          <Reveal delay={160}>
            <TechGroups groups={techGroups} />
          </Reveal>
        </div>
        <Marquee items={marqueeItems} />
      </div>
    </section>
  );
}
