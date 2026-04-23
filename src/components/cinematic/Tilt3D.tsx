import { ReactNode, useRef } from 'react';

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  /** Max tilt angle in degrees. */
  max?: number;
  /** Lift on hover in pixels. */
  lift?: number;
  /** Add a moving glare highlight. */
  glare?: boolean;
}

/**
 * Mouse-tracked 3D tilt. Pure CSS transforms, no library.
 * Disabled automatically for coarse pointers.
 */
export const Tilt3D = ({ children, className, max = 10, lift = 8, glare = true }: Tilt3DProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -2 * max;
    const ry = (px - 0.5) * 2 * max;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-${lift}px)`;
    if (glareRef.current) {
      glareRef.current.style.opacity = '1';
      glareRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, hsl(var(--cyan) / 0.25), transparent 55%)`;
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
    if (glareRef.current) glareRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      style={{
        transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        position: 'relative',
      }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ opacity: 0, transition: 'opacity 0.3s ease', mixBlendMode: 'screen' }}
        />
      )}
    </div>
  );
};
