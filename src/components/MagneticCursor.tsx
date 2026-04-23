import { useEffect, useRef, useState } from 'react';

const MAGNET_SELECTOR = 'a, button, [role="button"], input[type="submit"], .magnetic';
const MAGNET_RADIUS = 80;
const MAGNET_STRENGTH = 0.35;

export const MagneticCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Disable on touch / coarse pointer devices
    const mq = window.matchMedia('(pointer: fine)');
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let frame = 0;
    let hovered: HTMLElement | null = null;

    const handleMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Find nearest interactive element within radius
      const els = document.querySelectorAll<HTMLElement>(MAGNET_SELECTOR);
      let closest: { el: HTMLElement; dist: number; cx: number; cy: number } | null = null;
      els.forEach((el) => {
        if (el.offsetParent === null) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const dist = Math.hypot(dx, dy);
        const reach = Math.max(r.width, r.height) / 2 + MAGNET_RADIUS;
        if (dist < reach && (!closest || dist < closest.dist)) {
          closest = { el, dist, cx, cy };
        }
      });

      // Reset previously magnetized element
      if (hovered && hovered !== closest?.el) {
        hovered.style.transform = '';
        hovered.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
        hovered = null;
      }

      if (closest) {
        const { el, cx, cy } = closest;
        const pullX = (mouseX - cx) * MAGNET_STRENGTH;
        const pullY = (mouseY - cy) * MAGNET_STRENGTH;
        el.style.transition = 'transform 0.15s ease-out';
        el.style.transform = `translate(${pullX}px, ${pullY}px)`;
        hovered = el;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }
      if (ringRef.current) {
        const scale = hovered ? 1.8 : 1;
        ringRef.current.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0) scale(${scale})`;
        ringRef.current.style.opacity = hovered ? '0.9' : '0.5';
      }
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(frame);
      if (hovered) hovered.style.transform = '';
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border border-cyan/70 mix-blend-difference"
        style={{ transition: 'opacity 0.2s ease-out, border-color 0.2s' }}
        aria-hidden
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_hsl(var(--cyan))]"
        aria-hidden
      />
    </>
  );
};
