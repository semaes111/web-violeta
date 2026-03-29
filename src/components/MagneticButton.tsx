import { useRef, useCallback, type PropsWithChildren } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
  radius?: number;
}

/**
 * MagneticButton — Elements attract toward cursor within radius
 * Inspired by jayant-portfolio useMagnetic hook
 */
const MagneticButton = ({
  children,
  className = '',
  style,
  strength = 0.35,
  radius = 120,
}: PropsWithChildren<MagneticButtonProps>) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const dist = Math.sqrt(distX * distX + distY * distY);

    if (dist < radius) {
      const pull = (1 - dist / radius) * strength;
      gsap.to(ref.current, {
        x: distX * pull,
        y: distY * pull,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, [strength, radius]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    });
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, display: 'inline-block', willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default MagneticButton;
