import { type CSSProperties, useState } from 'react';
import type { Project } from '../data/content';
import Button from './Button';
import Chip from './Chip';

export default function ProjectCard({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false);
  const { title, badge, summary, note, backend, stack, image, actions } = project;

  return (
    <article className="glow pcard">
      <div className="shot" style={image ? ({ '--shot': `url(${image.src})` } as CSSProperties) : undefined}>
        {image && !imageFailed ? (
          <img
            src={image.src}
            alt={image.alt}
            width={1200}
            height={675}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="shot-fallback" aria-hidden="true">
            {title}
          </div>
        )}
        {badge && <span className="pill shot-badge">{badge}</span>}
      </div>
      <div className="body">
        <h3>{title}</h3>
        <p>{summary}</p>
        {note && <div className="note-sm">{note}</div>}
        <p className="backend">
          <span className="mono tag-be">Back-end</span>
          {backend}
        </p>
        <div className="chips">
          {stack.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </div>
        <div className="acts">
          {actions.map((action) => (
            <Button key={action.href} href={action.href} variant={action.variant} external>
              {action.label}
            </Button>
          ))}
        </div>
      </div>
    </article>
  );
}
