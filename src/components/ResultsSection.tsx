import { motion } from 'framer-motion';
import { TrendingUp, Clock, Shield, CheckCircle2 } from 'lucide-react';

const process = [
  {
    step: '01',
    title: 'Consulta personalizada',
    desc: 'Análisis facial 3D y diseño del plan de tratamiento adaptado a tu anatomía y objetivos.',
    icon: CheckCircle2,
  },
  {
    step: '02',
    title: 'Tratamiento de precisión',
    desc: 'Procedimiento con tecnología de última generación en un entorno médico seguro y confortable.',
    icon: Shield,
  },
  {
    step: '03',
    title: 'Recuperación mínima',
    desc: 'La mayoría de procedimientos permiten retomar tu rutina en 24-48 horas.',
    icon: Clock,
  },
  {
    step: '04',
    title: 'Resultados progresivos',
    desc: 'Seguimiento cercano para garantizar resultados naturales que mejoran con el tiempo.',
    icon: TrendingUp,
  },
];

const beforeAfter = [
  { area: 'Armonización facial', improvement: '95% satisfacción', sessions: '1-2 sesiones' },
  { area: 'Rejuvenecimiento', improvement: 'Hasta 10 años menos', sessions: '3-4 sesiones' },
  { area: 'Remodelación corporal', improvement: 'Hasta -4cm contorno', sessions: '2-4 sesiones' },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const ResultsSection: React.FC = () => {
  return (
    <section className="section" id="results" style={{ position: 'relative' }}>
      <div
        className="glow-orb glow-orb-accent animate-pulse-glow"
        style={{ width: 350, height: 350, top: '10%', left: '50%', transform: 'translateX(-50%)' }}
      />

      <div className="container">
        {/* Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 'var(--space-4xl)' }}>
          <span className="section-label" style={{ justifyContent: 'center' }}>Resultados</span>
          <h2 className="section-title" style={{ maxWidth: 650, margin: '0 auto var(--space-md)' }}>
            Un proceso diseñado para{' '}
            <span className="text-gradient">resultados excepcionales</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Cada etapa está cuidadosamente planificada para maximizar resultados y minimizar tiempo de
            recuperación.
          </p>
        </motion.div>

        {/* Process steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-md)', marginBottom: 'var(--space-4xl)' }}>
          {process.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                position: 'relative',
                textAlign: 'center',
                padding: 'var(--space-xl) var(--space-md)',
              }}
            >
              {/* Step number */}
              <div
                style={{
                  fontSize: '3rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 200,
                  background: 'linear-gradient(135deg, var(--color-accent-light), var(--color-accent))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: 'var(--space-md)',
                }}
              >
                {item.step}
              </div>

              {/* Icon */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'rgba(200, 165, 90, 0.08)',
                  border: '1px solid rgba(200, 165, 90, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-md)',
                }}
              >
                <item.icon size={20} style={{ color: 'var(--color-accent)' }} />
              </div>

              <h4
                style={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  fontFamily: 'var(--font-display)',
                  marginBottom: 'var(--space-sm)',
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </p>

              {/* Connector line */}
              {i < process.length - 1 && (
                <div
                  className="hide-mobile"
                  style={{
                    position: 'absolute',
                    top: '3.5rem',
                    right: '-10%',
                    width: '20%',
                    height: 1,
                    background: 'linear-gradient(90deg, var(--color-accent), transparent)',
                    opacity: 0.3,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Results metrics */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-panel"
          style={{
            padding: 'var(--space-2xl)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-xl)',
          }}
        >
          {beforeAfter.map((item, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                padding: 'var(--space-lg)',
                borderRight: i < beforeAfter.length - 1 ? '1px solid var(--color-glass-border)' : 'none',
              }}
            >
              <div
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent)',
                  marginBottom: 'var(--space-sm)',
                  fontWeight: 500,
                }}
              >
                {item.area}
              </div>
              <div
                className="stat-number"
                style={{ fontSize: '1.8rem', marginBottom: 'var(--space-xs)' }}
              >
                {item.improvement}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                {item.sessions}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #results .container > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          #results .container > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
          #results .glass-panel {
            grid-template-columns: 1fr !important;
          }
          #results .glass-panel > div {
            border-right: none !important;
            border-bottom: 1px solid var(--color-glass-border);
          }
          #results .glass-panel > div:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
};

export default ResultsSection;
