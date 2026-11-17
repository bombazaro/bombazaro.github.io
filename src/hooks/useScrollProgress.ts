import { type RefObject, useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

export function useScrollProgress(ref: RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(() => (prefersReducedMotion() ? 1 : 0));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const raw = height > 0 ? (window.innerHeight * 0.65 - top) / height : 0;
      setProgress(Math.min(Math.max(raw, 0), 1));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ref]);

  return progress;
}
