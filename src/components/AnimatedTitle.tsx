import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  tag?: 'h1' | 'h2' | 'h3';
  staggerDelay?: number;
}

/**
 * AnimatedTitle — 3D word reveal on scroll
 * Inspired by game-website AnimatedTitle: translate3d + rotateY + rotateX
 */
const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  className = '',
  style,
  tag: Tag = 'h2',
  staggerDelay = 0.03,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '100 bottom',
          end: 'center bottom',
          toggleActions: 'play none none reverse',
        },
      }).to('.animated-word', {
        opacity: 1,
        transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)',
        ease: 'power2.inOut',
        stagger: staggerDelay,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [staggerDelay]);

  const lines = text.split('\n');

  return (
    <div ref={containerRef} className={`animated-title ${className}`} style={style}>
      {lines.map((line, lineIdx) => (
        <Tag
          key={lineIdx}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.3em',
            justifyContent: 'flex-start',
          }}
        >
          {line.split(' ').map((word, wordIdx) => (
            <span
              key={`${lineIdx}-${wordIdx}`}
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </Tag>
      ))}
    </div>
  );
};

export default AnimatedTitle;
