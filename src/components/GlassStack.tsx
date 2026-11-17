import { useEffect, useRef, useState } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../lib/motion';

const baseRotation: Record<string, string> = { codecard: ' rotate(3deg)', fluxcard: ' rotate(-4deg)' };

export default function GlassStack({ avatarSrc }: { avatarSrc?: string }) {
  const stackRef = useRef<HTMLDivElement>(null);
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const onMove = (event: MouseEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      stackRef.current?.querySelectorAll<HTMLElement>('.layer').forEach((layer) => {
        const depth = Number(layer.dataset.depth);
        const rotation = baseRotation[layer.dataset.kind ?? ''] ?? '';
        layer.style.transform = `translate(${-nx * depth}px, ${-ny * depth}px)${rotation}`;
      });
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);

  const showAvatar = avatarSrc && !avatarFailed;

  return (
    <div className="stack" ref={stackRef}>
      <div className="layer avatar" data-depth="30">
        {showAvatar ? (
          <img src={avatarSrc} alt="Desenho do Bernardo" width={190} height={190} onError={() => setAvatarFailed(true)} />
        ) : (
          <div className="avatar-placeholder">seu desenho<br />entra aqui</div>
        )}
      </div>
      <div className="layer glass codecard mono" data-depth="22" data-kind="codecard" aria-hidden="true">
        <span className="c">{'// bernardo.ts'}</span>
        <br />
        <span className="k">const</span> bernardo = {'{'}
        <br />
        &nbsp;&nbsp;papel: <span className="s">"Full Stack"</span>,
        <br />
        &nbsp;&nbsp;usa: [<span className="s">"React"</span>, <span className="s">"Java"</span>,
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="s">"SQL"</span>],
        <br />
        &nbsp;&nbsp;local: <span className="s">"Palhoça/SC"</span>,
        <br />
        {'};'}
      </div>
      <div className="layer glass fluxcard" data-depth="34" data-kind="fluxcard">
        <img src="/projetos/fluxus-inicio.webp" alt="Tela inicial do app Fluxus" width={195} height={150} loading="lazy" />
        <b>Fluxus</b>
        <small>app Android + web</small>
      </div>
    </div>
  );
}
