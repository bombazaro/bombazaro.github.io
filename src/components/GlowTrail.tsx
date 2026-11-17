import { useEffect, useRef } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../lib/motion';

type Point = { x: number; y: number; life: number };

export default function GlowTrail() {
  const enabled = hasFinePointer() && !prefersReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!enabled || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const points: Point[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    const onMove = (event: MouseEvent) => points.push({ x: event.clientX, y: event.clientY, life: 1 });
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('pointermove', onMove, { passive: true });

    let frame = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.life -= 0.045;
        if (p.life <= 0) {
          points.splice(i, 1);
          continue;
        }
        const radius = 16 * p.life + 4;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        gradient.addColorStop(0, `rgba(232,121,249,${0.5 * p.life})`);
        gradient.addColorStop(1, 'rgba(139,92,246,0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      document.removeEventListener('pointermove', onMove);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <canvas id="trail" className="trail" ref={canvasRef} aria-hidden="true" />;
}
