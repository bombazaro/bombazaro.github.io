import { projects } from '../data/content';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';

export default function Projects() {
  return (
    <section id="projetos">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow mono">Projetos</div>
          <h2>
            Coisas que eu <span className="grad">construí</span> e estão no ar.
          </h2>
          <p className="sub">Dois projetos meus e um feito em equipe. Cada um tem o site para usar e o código para ler.</p>
        </Reveal>
        <div className="projects">
          {projects.map((project, i) => (
            <Reveal key={project.id} className={project.featured ? 'big' : ''} delay={i * 90}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
