import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Star } from 'lucide-react';

const stats = [
  { number: '15+', label: 'Años experiencia' },
  { number: '8.000+', label: 'Pacientes felices' },
  { number: '98%', label: 'Satisfacción' },
  { number: '25+', label: 'Tratamientos' },
];

const HeroSection: React.FC = () => {
  return (
    <section className="section" id="home" style={{ position: 'relative', overflow: 'hidden' }}>
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

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: 720 }}
          >
            <h1
              style={{
                fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                fontWeight: 200,
                lineHeight: 1.05,
                marginBottom: 'var(--space-lg)',
              }}
            >
              El arte de{' '}
              <span className="text-gradient" style={{ fontWeight: 300 }}>
                realzar
              </span>
              <br />
              tu belleza{' '}
              <span
                className="text-serif"
                style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-primary-light)' }}
              >
                natural
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
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

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}
          >
            <a href="#contact" className="btn btn-accent">
              <Star size={15} />
              Reserva tu consulta
            </a>
            <a href="#treatments" className="btn btn-outline">
              Descubrir tratamientos
            </a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
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
        transition={{ delay: 2 }}
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
