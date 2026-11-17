import { useEffect, useRef, useState } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../lib/motion';
import { repelOffset } from '../lib/repel';

const baseRotation: Record<string, string> = { codecard: ' rotate(3deg)', fluxcard: ' rotate(-4deg)' };

export default function GlassStack({ avatarSrc }: { avatarSrc?: string }) {
  const stackRef = useRef<HTMLDivElement>(null);
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const layers = Array.from(stackRef.current?.querySelectorAll<HTMLElement>('.layer') ?? []);
    const offsets = new Map<HTMLElement, { x: number; y: number }>(layers.map((layer) => [layer, { x: 0, y: 0 }]));
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;

    // The layers run away from the pointer when it comes close; all layout reads happen once per frame.
    const apply = () => {
      frame = 0;
      layers.forEach((layer) => {
        const current = offsets.get(layer)!;
        let next = { x: 0, y: 0 };
        if (pointer) {
          const rect = layer.getBoundingClientRect();
          // The rect already includes the current offset; remove it to get the resting centre.
          const center = { x: rect.left + rect.width / 2 - current.x, y: rect.top + rect.height / 2 - current.y };
          const radius = Math.max(rect.width, rect.height) / 2 + 130;
          next = repelOffset(center, pointer, radius, Number(layer.dataset.depth));
        }
        offsets.set(layer, next);
        const rotation = baseRotation[layer.dataset.kind ?? ''] ?? '';
        layer.style.transform = `translate(${next.x.toFixed(1)}px, ${next.y.toFixed(1)}px)${rotation}`;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onMove = (event: MouseEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const onLeave = () => {
      pointer = null;
      schedule();
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const showAvatar = avatarSrc && !avatarFailed;

  return (
    <div className="stack" ref={stackRef}>
      <div className="layer avatar" data-depth="40">
        {showAvatar ? (
          <img src={avatarSrc} alt="Desenho do Bernardo" width={190} height={190} onError={() => setAvatarFailed(true)} />
        ) : (
          <div className="avatar-placeholder">seu desenho<br />entra aqui</div>
        )}
      </div>
      <div className="layer glass codecard mono" data-depth="55" data-kind="codecard" aria-hidden="true">
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
      <div className="layer glass fluxcard" data-depth="60" data-kind="fluxcard">
        <img src="/projetos/fluxus-inicio.webp" alt="Tela inicial do app Fluxus" width={195} height={150} loading="lazy" />
        <b>Fluxus</b>
        <small>app Android + web</small>
      </div>
    </div>
  );
}
