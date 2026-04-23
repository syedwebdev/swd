import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Animation direction. Defaults to 'up'. */
  direction?: Direction;
  /** Delay in seconds. */
  delay?: number;
  /** Duration in seconds. */
  duration?: number;
  /** Stagger child elements (uses immediate children). */
  stagger?: number;
  /** Distance of motion in pixels. */
  distance?: number;
  /** When true, the animation only plays once. */
  once?: boolean;
  as?: 'div' | 'section' | 'span' | 'li' | 'article';
}

const fromVars = (dir: Direction, distance: number) => {
  switch (dir) {
    case 'up':
      return { y: distance, opacity: 0 };
    case 'down':
      return { y: -distance, opacity: 0 };
    case 'left':
      return { x: distance, opacity: 0 };
    case 'right':
      return { x: -distance, opacity: 0 };
    case 'zoom':
      return { scale: 0.85, opacity: 0 };
    case 'fade':
    default:
      return { opacity: 0 };
  }
};

/**
 * Cinematic scroll reveal powered by GSAP + ScrollTrigger.
 * Respects prefers-reduced-motion.
 */
export const Reveal = ({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.9,
  stagger,
  distance = 60,
  once = true,
  as = 'div',
}: RevealProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { clearProps: 'all' });
      return;
    }

    const targets: Element[] = stagger ? Array.from(el.children) : [el];
    const from = fromVars(direction, distance);

    gsap.set(targets, from);

    const tween = gsap.to(targets, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
      stagger: stagger ?? 0,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction, delay, duration, stagger, distance, once]);

  const Tag = as as keyof JSX.IntrinsicElements;
  // @ts-expect-error - ref typing is generic across tags
  return <Tag ref={ref} className={className}>{children}</Tag>;
};
