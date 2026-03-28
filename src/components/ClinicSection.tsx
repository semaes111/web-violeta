import { motion } from 'framer-motion';
import { MapPin, Wifi, ShieldCheck, Sparkles, Monitor, Leaf } from 'lucide-react';

const features = [
  { icon: Monitor, title: 'Tecnología de última generación', desc: 'Equipamiento médico certificado CE y FDA.' },
  { icon: ShieldCheck, title: 'Máxima seguridad', desc: 'Protocolos hospitalarios de esterilización.' },
  { icon: Sparkles, title: 'Ambiente premium', desc: 'Espacios diseñados para tu confort y privacidad.' },
  { icon: Leaf, title: 'Cosmecéutica avanzada', desc: 'Productos medical-grade exclusivos.' },
  { icon: Wifi, title: 'Consulta virtual', desc: 'Primera valoración online sin compromiso.' },
  { icon: MapPin, title: 'Ubicación privilegiada', desc: 'Centro de la ciudad, fácil acceso y parking.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const ClinicSection: React.FC = () => {
  return (
    <section className="section" id="clinic" style={{ position: 'relative' }}>
      <div
        className="glow-orb glow-orb-accent animate-pulse-glow"
        style={{ width: 400, height: 400, bottom: '20%', left: '30%' }}
      />

      <div className="container">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <span className="section-label" style={{ justifyContent: 'center' }}>La clínica</span>
          <h2 className="section-title" style={{ maxWidth: 600, margin: '0 auto var(--space-md)' }}>
            Un espacio concebido para la{' '}
            <span className="text-gradient">excelencia médica</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Cada detalle ha sido pensado para que tu experiencia sea impecable desde el momento en que cruzas la puerta.
          </p>
        </motion.div>

        {/* Clinic image placeholder + features */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2xl)', alignItems: 'center' }}>
          {/* Left — Clinic visual */}
          <motion.div {...fadeUp} transition={{ duration: 0.7 }}>
            <div
              className="glass-panel"
              style={{
                aspectRatio: '4/3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(200,165,90,0.04), rgba(212,164,140,0.03))',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-accent), var(--color-primary))',
                    margin: '0 auto var(--space-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 32px rgba(200, 165, 90, 0.15)',
                  }}
                >
                  <Sparkles size={32} style={{ color: '#0c0a08' }} />
                </div>
                <h3
                  className="text-serif"
                  style={{
                    fontSize: '1.5rem',
                    fontStyle: 'italic',
                    color: 'var(--color-primary-light)',
                    marginBottom: 'var(--space-sm)',
                  }}
                >
                  Clínica Dra. Violeta
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Donde la ciencia y la belleza convergen
                </p>
              </div>

              {/* Decorative elements */}
              <div
                style={{
                  position: 'absolute',
                  width: 200,
                  height: 200,
                  border: '1px solid rgba(200,165,90,0.06)',
                  borderRadius: '50%',
                  top: '10%',
                  left: '-5%',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  width: 150,
                  height: 150,
                  border: '1px solid rgba(212,164,140,0.06)',
                  borderRadius: '50%',
                  bottom: '5%',
                  right: '-3%',
                }}
              />
            </div>
          </motion.div>

          {/* Right — Features grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="glass-card"
                style={{ padding: 'var(--space-lg)' }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(200, 165, 90, 0.08)',
                    border: '1px solid rgba(200, 165, 90, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 'var(--space-sm)',
                  }}
                >
                  <f.icon size={17} style={{ color: 'var(--color-accent)' }} />
                </div>
                <h4
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    marginBottom: 'var(--space-xs)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {f.title}
                </h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #clinic .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ClinicSection;
