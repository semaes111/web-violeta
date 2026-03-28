import { motion } from 'framer-motion';
import { Award, GraduationCap, Heart, ShieldCheck } from 'lucide-react';

const credentials = [
  {
    icon: GraduationCap,
    title: 'Formación de élite',
    desc: 'Licenciada en Medicina por la Universidad Complutense. Máster en Medicina Estética y Antienvejecimiento.',
  },
  {
    icon: Award,
    title: 'Reconocimiento internacional',
    desc: 'Miembro de la Sociedad Española de Medicina Estética y la European Academy of Facial Aesthetics.',
  },
  {
    icon: ShieldCheck,
    title: 'Certificaciones avanzadas',
    desc: 'Formación continua en las técnicas más innovadoras: hilos tensores, ácido hialurónico, láser y regeneración celular.',
  },
  {
    icon: Heart,
    title: 'Filosofía centrada en ti',
    desc: 'Cada tratamiento se diseña a medida, respetando tu anatomía facial única y tus objetivos personales.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
};

const AboutSection: React.FC = () => {
  return (
    <section className="section" id="about" style={{ position: 'relative' }}>
      <div
        className="glow-orb glow-orb-primary animate-pulse-glow"
        style={{ width: 400, height: 400, top: '20%', right: '-5%' }}
      />

      <div className="container">
        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4xl)', alignItems: 'center' }}>
          {/* Left — Image area */}
          <motion.div {...fadeUp} transition={{ duration: 0.8 }}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '3/4',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-bg-card) 100%)',
                border: '1px solid var(--color-glass-border)',
              }}
            >
              {/* Placeholder for doctor photo */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-lg)',
                  background: 'linear-gradient(180deg, rgba(200,165,90,0.06) 0%, rgba(212,164,140,0.04) 100%)',
                }}
              >
                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-accent), var(--color-primary))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 300,
                    color: '#0c0a08',
                    boxShadow: '0 8px 32px rgba(200, 165, 90, 0.2)',
                  }}
                >
                  VR
                </div>
                <div style={{ textAlign: 'center', padding: '0 2rem' }}>
                  <p
                    className="text-serif"
                    style={{
                      fontSize: '1.5rem',
                      fontStyle: 'italic',
                      color: 'var(--color-primary-light)',
                      lineHeight: 1.5,
                    }}
                  >
                    "La verdadera belleza es aquella que surge cuando te sientes en armonía contigo misma"
                  </p>
                  <div className="divider-ornate" style={{ margin: '1.5rem auto' }} />
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
                    Dra. Violeta Rodríguez Rodríguez
                  </p>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div
                style={{
                  position: 'absolute',
                  top: -1,
                  right: -1,
                  width: 80,
                  height: 80,
                  borderTop: '2px solid var(--color-accent)',
                  borderRight: '2px solid var(--color-accent)',
                  borderRadius: '0 var(--radius-xl) 0 0',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: -1,
                  left: -1,
                  width: 80,
                  height: 80,
                  borderBottom: '2px solid var(--color-primary)',
                  borderLeft: '2px solid var(--color-primary)',
                  borderRadius: '0 0 0 var(--radius-xl)',
                }}
              />
            </div>
          </motion.div>

          {/* Right — Content */}
          <div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
              <span className="section-label">Sobre la doctora</span>
              <h2 className="section-title">
                Ciencia, arte y<br />
                <span className="text-gradient">dedicación</span>
              </h2>
              <p className="section-subtitle" style={{ marginBottom: 'var(--space-2xl)' }}>
                Con más de 15 años de experiencia, la Dra. Violeta Rodríguez Rodríguez es referente en
                medicina estética avanzada. Su enfoque integra las técnicas más innovadoras con un profundo
                respeto por la armonía facial y corporal de cada paciente.
              </p>
            </motion.div>

            {/* Credentials grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
              {credentials.map((cred, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="glass-card"
                  style={{ padding: 'var(--space-lg)' }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(200, 165, 90, 0.08)',
                      border: '1px solid rgba(200, 165, 90, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 'var(--space-sm)',
                    }}
                  >
                    <cred.icon
                      size={18}
                      style={{ color: 'var(--color-accent)' }}
                    />
                  </div>
                  <h4
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      marginBottom: 'var(--space-xs)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {cred.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.6,
                    }}
                  >
                    {cred.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about .container > div {
            grid-template-columns: 1fr !important;
            gap: var(--space-2xl) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
