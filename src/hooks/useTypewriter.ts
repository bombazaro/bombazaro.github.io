import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

export function useTypewriter(text: string, speedMs = 70): string {
  const [count, setCount] = useState(() => (prefersReducedMotion() ? text.length : 0));

  useEffect(() => {
    if (count >= text.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), speedMs);
    return () => clearTimeout(id);
  }, [count, text, speedMs]);

  return text.slice(0, count);
}
