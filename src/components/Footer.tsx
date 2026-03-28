import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';

const footerLinks = {
  tratamientos: [
    'Ácido Hialurónico',
    'Toxina Botulínica',
    'Hilos Tensores',
    'Mesoterapia',
    'Láser Corporal',
    'PRP & Exosomas',
  ],
  clinica: [
    'Sobre la Dra. Violeta',
    'Nuestra filosofía',
    'Tecnología',
    'Resultados',
    'Blog',
    'Trabaja con nosotros',
  ],
  legal: [
    'Aviso legal',
    'Política de privacidad',
    'Política de cookies',
    'Condiciones generales',
  ],
};

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        padding: 'var(--space-4xl) 5% var(--space-xl)',
        borderTop: '1px solid rgba(200, 165, 90, 0.08)',
        background: 'linear-gradient(180deg, transparent, rgba(18, 15, 12, 0.5))',
      }}
    >
      <div className="container">
        {/* Top section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: 'var(--space-2xl)',
            marginBottom: 'var(--space-3xl)',
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-lg)' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #c8a55a, #d4a48c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  fontFamily: 'var(--font-serif)',
                  color: '#0c0a08',
                }}
              >
                V
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '0.1em' }}>
                  DRA. VIOLETA
                </div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  Rodríguez Rodríguez
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.7, maxWidth: 350 }}>
              Medicina estética avanzada con un enfoque personalizado y resultados naturales.
              Tu belleza, nuestra ciencia.
            </p>
            <div className="divider" />
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              N.º Colegiado: 28XXXXXX
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: 'var(--space-lg)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Tratamientos
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {footerLinks.tratamientos.map((link) => (
                <li key={link}>
                  <a
                    href="#treatments"
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--color-text-muted)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: 'var(--space-lg)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Clínica
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {footerLinks.clinica.map((link) => (
                <li key={link}>
                  <a
                    href="#about"
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--color-text-muted)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                marginBottom: 'var(--space-lg)',
                fontFamily: 'var(--font-sans)',
              }}
            >
              Legal
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
              {footerLinks.legal.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--color-text-muted)',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 'var(--space-xl)',
            borderTop: '1px solid rgba(200, 165, 90, 0.06)',
          }}
        >
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            &copy; {new Date().getFullYear()} Dra. Violeta Rodríguez Rodríguez. Todos los derechos reservados.
            <Heart size={12} style={{ color: 'var(--color-primary)' }} />
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '1px solid rgba(200, 165, 90, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.3s ease',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            <ArrowUp size={18} style={{ color: 'var(--color-text-secondary)' }} />
          </motion.button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
