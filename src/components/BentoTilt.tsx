import { type PropsWithChildren, useRef, useState } from 'react';

interface BentoTiltProps {
  className?: string;
  style?: React.CSSProperties;
  tiltStrength?: number;
}

/**
 * BentoTilt — Mouse-follow 3D perspective tilt effect
 * Inspired by game-website Features component
 */
const BentoTilt = ({
  children,
  className = '',
  style,
  tiltStrength = 5,
}: PropsWithChildren<BentoTiltProps>) => {
  const [transformStyle, setTransformStyle] = useState('');
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * tiltStrength;
    const tiltY = (relativeX - 0.5) * -tiltStrength;
    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`
    );
  };

  const handleMouseLeave = () => {
    setTransformStyle('');
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: transformStyle,
        transition: transformStyle ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

export default BentoTilt;
