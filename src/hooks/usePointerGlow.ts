import { useEffect } from 'react';

export function usePointerGlow(): void {
  useEffect(() => {
    const root = document.documentElement;
    let latest: MouseEvent | null = null;
    let frame = 0;

    // Many pointermove events can arrive per frame; apply only the newest one, once per frame.
    function apply() {
      frame = 0;
      const event = latest;
      latest = null;
      if (!event) return;
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

    function onMove(event: MouseEvent) {
      latest = event;
      if (!frame) frame = requestAnimationFrame(apply);
    }

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}
