import { useEffect, useRef } from 'react';

/** Top-fixed scroll progress bar synced with Lenis/native scroll. */
export const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = barRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none bg-transparent">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-cyan via-primary to-magenta shadow-[0_0_12px_hsl(var(--cyan)/0.6)]"
        style={{ transform: 'scaleX(0)', willChange: 'transform' }}
      />
    </div>
  );
};
