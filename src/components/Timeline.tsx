import { useRef } from 'react';
import type { TimelineItem } from '../data/content';
import { useScrollProgress } from '../hooks/useScrollProgress';

export default function Timeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(ref);
  return (
    <div className="timeline" ref={ref}>
      <div className="fill" aria-hidden="true" style={{ height: `${progress * 100}%` }} />
      <ol aria-label="Linha do tempo">
        {items.map((item) => (
          <li key={item.title} className="glow tl">
            <span className="dot" aria-hidden="true" />
            <span className="when mono">{item.when}</span>
            <b>{item.title}</b>
            <span className="o">{item.place}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
