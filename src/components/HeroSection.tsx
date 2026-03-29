import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: '15+', label: 'Años experiencia' },
  { number: '8.000+', label: 'Pacientes felices' },
  { number: '98%', label: 'Satisfacción' },
  { number: '25+', label: 'Tratamientos' },
];

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const ctx = gsap.context(() => {
      // 3D word reveal for main heading
      const words = headingRef.current!.querySelectorAll('.hero-word');
      gsap.fromTo(words, {
        opacity: 0,
        transform: 'translate3d(10px, 51px, -60px) rotateY(60deg) rotateX(-40deg)',
      }, {
        opacity: 1,
        transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)',
        ease: 'power2.inOut',
        stagger: 0.06,
        delay: 0.5,
        duration: 1,
      });

      // Scroll-linked clip-path morph on hero section
      if (sectionRef.current) {
        gsap.to(sectionRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          opacity: 0.3,
          y: -80,
          scale: 0.95,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section"
      id="home"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Ambient glows */}
      <div
        className="glow-orb glow-orb-accent animate-pulse-glow"
        style={{ width: 600, height: 600, top: '-15%', left: '-15%' }}
      />
      <div
        className="glow-orb glow-orb-primary animate-pulse-glow"
        style={{ width: 400, height: 400, bottom: '10%', right: '15%', animationDelay: '2s' }}
      />

      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              className="glass-panel"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.5rem 1.2rem',
                fontSize: '0.7rem',
                color: 'var(--color-accent)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 500,
              }}
            >
              <Sparkles size={13} />
              Excelencia en medicina estética
            </div>
          </motion.div>

          {/* Main heading — 3D word reveal */}
          <div ref={headingRef} style={{ maxWidth: 720, perspective: '1000px' }}>
            <h1
              style={{
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: 200,
                lineHeight: 1.05,
                marginBottom: 'var(--space-lg)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.25em',
              }}
            >
              <span className="hero-word" style={{ opacity: 0 }}>El</span>
              <span className="hero-word" style={{ opacity: 0 }}>arte</span>
              <span className="hero-word" style={{ opacity: 0 }}>de</span>
              <span
                className="hero-word text-gradient"
                style={{ fontWeight: 300, opacity: 0 }}
              >
                realzar
              </span>
              <br style={{ flexBasis: '100%', height: 0 }} />
              <span className="hero-word" style={{ opacity: 0 }}>tu</span>
              <span className="hero-word" style={{ opacity: 0 }}>belleza</span>
              <span
                className="hero-word text-serif"
                style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-primary-light)', opacity: 0 }}
              >
                natural
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{
              fontSize: '1.15rem',
              color: 'var(--color-text-secondary)',
              maxWidth: 520,
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            La Dra. Violeta Rodr&iacute;guez combina ciencia m&eacute;dica de vanguardia con sensibilidad
            art&iacute;stica para resultados que respetan tu esencia y elevan tu confianza.
          </motion.p>

          {/* CTA Buttons — Magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}
          >
            <MagneticButton strength={0.3} radius={100}>
              <a href="#contact" className="btn btn-accent btn-glow">
                <Star size={15} />
                Reserva tu consulta
              </a>
            </MagneticButton>
            <MagneticButton strength={0.25} radius={80}>
              <a href="#treatments" className="btn btn-outline">
                Descubrir tratamientos
              </a>
            </MagneticButton>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="glass-panel"
            style={{
              display: 'inline-flex',
              gap: 0,
              padding: 0,
              marginTop: 'var(--space-2xl)',
              maxWidth: 'fit-content',
              overflow: 'hidden',
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: 'var(--space-lg) var(--space-xl)',
                  borderRight: i < stats.length - 1 ? '1px solid var(--color-glass-border)' : 'none',
                  textAlign: 'center',
                  minWidth: 120,
                }}
              >
                <div className="stat-number" style={{ fontSize: '2rem' }}>{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} style={{ color: 'var(--color-accent)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
