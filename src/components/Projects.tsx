import { projects } from '../data/content';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section id="projetos">
      <div className="wrap">
        <div className="eyebrow mono">Projetos</div>
        <h2>
          Coisas que eu <span className="grad">construí</span> e estão no ar.
        </h2>
        <p className="sub">Dois projetos meus e um feito em equipe. Cada um tem o site para usar e o código para ler.</p>
        <div className="projects">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
