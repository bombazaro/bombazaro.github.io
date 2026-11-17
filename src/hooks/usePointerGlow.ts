import { useEffect } from 'react';

export function usePointerGlow(): void {
  useEffect(() => {
    const root = document.documentElement;

    function onMove(event: MouseEvent) {
      root.style.setProperty('--mx', `${event.clientX}px`);
      root.style.setProperty('--my', `${event.clientY}px`);
      const target = event.target as Element | null;
      const el = target?.closest?.('.glow, .btn') as HTMLElement | null;
      if (el) {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--x', `${event.clientX - rect.left}px`);
        el.style.setProperty('--y', `${event.clientY - rect.top}px`);
      }
    }

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);
}
