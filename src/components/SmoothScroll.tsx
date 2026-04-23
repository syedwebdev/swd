import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Mounts a global Lenis smooth-scroll instance and syncs it with GSAP's
 * ScrollTrigger so all scroll-driven animations (parallax, reveals, pinning)
 * stay perfectly in sync.
 *
 * Disabled automatically for users who prefer reduced motion.
 */
export const SmoothScroll = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    // Drive Lenis from GSAP's ticker for a single rAF loop
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger when Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // Expose for debugging / per-page anchor scrolling
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
};
