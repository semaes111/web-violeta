import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  className?: string;
  style?: React.CSSProperties;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  distance?: number;
  stagger?: number;
  children: React.ReactNode;
}

/**
 * ScrollReveal — GSAP-powered scroll-triggered entrance animations
 * Inspired by jayant-portfolio fadeIn + stagger pattern
 */
const ScrollReveal = ({
  children,
  className = '',
  style,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 60,
  stagger = 0,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const dirMap = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
    };

    const { x, y } = dirMap[direction];
    const targets = stagger > 0 ? ref.current.children : ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, {
        opacity: 0,
        x,
        y,
      }, {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        stagger: stagger > 0 ? stagger : 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [direction, delay, duration, distance, stagger]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

export default ScrollReveal;
