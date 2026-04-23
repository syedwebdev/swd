import { ReactNode, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  children: string;
  className?: string;
  /** Delay before the animation starts (seconds). */
  delay?: number;
  /** Per-letter stagger (seconds). */
  stagger?: number;
  /** Animation duration per letter (seconds). */
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

/**
 * Cinematic per-letter reveal: letters slide up from below + fade in.
 * Whitespace is preserved; whole words don't wrap-break mid-letter.
 */
export const SplitText = ({
  children,
  className,
  delay = 0,
  stagger = 0.035,
  duration = 0.9,
  as = 'span',
}: SplitTextProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const letters = el.querySelectorAll<HTMLElement>('[data-letter]');
    if (!letters.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(letters, { y: 0, opacity: 1, rotateX: 0 });
      return;
    }

    gsap.set(letters, { yPercent: 110, opacity: 0, rotateX: -60 });
    const tween = gsap.to(letters, {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      duration,
      delay,
      ease: 'power4.out',
      stagger,
    });
    return () => {
      tween.kill();
    };
  }, [children, delay, stagger, duration]);

  const words = children.split(' ');
  const Tag = as as keyof JSX.IntrinsicElements;

  return (
    // @ts-expect-error - ref typing is generic across tags
    <Tag ref={ref} className={className} style={{ perspective: 800 }}>
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-block whitespace-nowrap"
          style={{ overflow: 'hidden', paddingBottom: '0.15em', marginBottom: '-0.15em' }}
        >
          {Array.from(word).map((ch, ci) => (
            <span
              key={ci}
              data-letter
              className="inline-block"
              style={{ willChange: 'transform, opacity' }}
            >
              {ch}
            </span>
          ))}
          {wi < words.length - 1 && <span data-letter className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
};
