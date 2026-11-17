import { marqueeItems, site, techGroups, timeline } from '../data/content';
import Marquee from './Marquee';
import TechGroups from './TechGroups';
import Timeline from './Timeline';

export default function About() {
  return (
    <section id="sobre">
      <div className="wrap">
        <div className="eyebrow mono">Sobre</div>
        <h2>
          Estudo, ensino e <span className="grad">construo</span>.
        </h2>
        <div className="about">
          <div>
            <p>{site.about}</p>
            <Timeline items={timeline} />
          </div>
          <TechGroups groups={techGroups} />
        </div>
        <Marquee items={marqueeItems} />
      </div>
    </section>
  );
}
