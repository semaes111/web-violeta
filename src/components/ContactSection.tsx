import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Instagram,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

const contactInfo = [
  { icon: Phone, label: 'Teléfono', value: '+34 912 345 678', href: 'tel:+34912345678' },
  { icon: Mail, label: 'Email', value: 'info@dravioleta.es', href: 'mailto:info@dravioleta.es' },
  { icon: MapPin, label: 'Dirección', value: 'Calle Serrano 42, Madrid', href: '#' },
  { icon: Clock, label: 'Horario', value: 'L-V: 9:00 - 20:00', href: '#' },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const ContactSection: React.FC = () => {
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.9rem 1.2rem',
    background: 'rgba(30, 25, 20, 0.6)',
    border: '1px solid rgba(200, 165, 90, 0.1)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text)',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-sans)',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  };

  return (
    <section className="section" id="contact" style={{ position: 'relative' }}>
      <div
        className="glow-orb glow-orb-accent animate-pulse-glow"
        style={{ width: 400, height: 400, top: '10%', left: '-5%' }}
      />
      <div
        className="glow-orb glow-orb-primary animate-pulse-glow"
        style={{ width: 350, height: 350, bottom: '10%', right: '-5%', animationDelay: '1.5s' }}
      />

      <div className="container">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <span className="section-label" style={{ justifyContent: 'center' }}>Contacto</span>
          <h2 className="section-title" style={{ maxWidth: 550, margin: '0 auto var(--space-md)' }}>
            Da el primer paso hacia tu{' '}
            <span className="text-gradient">transformación</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Agenda tu consulta personalizada y comencemos a diseñar juntas el resultado que deseas.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2xl)' }}>
          {/* Left — Form */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
            <form onSubmit={handleSubmit}>
              <div
                className="glass-panel"
                style={{ padding: 'var(--space-2xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}
              >
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 400,
                    fontFamily: 'var(--font-display)',
                    marginBottom: 'var(--space-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Calendar size={20} style={{ color: 'var(--color-accent)' }} />
                  Solicita tu cita
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                  <input
                    type="text"
                    placeholder="Nombre"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-glow)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(200, 165, 90, 0.1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Apellidos"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-accent)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-glow)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(200, 165, 90, 0.1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-glow)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(200, 165, 90, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />

                <input
                  type="tel"
                  placeholder="Teléfono"
                  style={inputStyle}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-glow)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(200, 165, 90, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />

                <select
                  style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                  defaultValue=""
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-glow)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(200, 165, 90, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <option value="" disabled>Tratamiento de interés</option>
                  <option value="facial">Tratamiento facial</option>
                  <option value="corporal">Tratamiento corporal</option>
                  <option value="regenerativo">Medicina regenerativa</option>
                  <option value="consulta">Consulta general</option>
                </select>

                <textarea
                  placeholder="Cuéntanos más sobre lo que buscas..."
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-accent-glow)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(200, 165, 90, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />

                {formSent ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.9rem',
                      color: 'var(--color-success)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <CheckCircle2 size={18} />
                    Solicitud enviada correctamente
                  </div>
                ) : (
                  <button type="submit" className="btn btn-accent" style={{ width: '100%', justifyContent: 'center' }}>
                    <Send size={16} />
                    Enviar solicitud
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          {/* Right — Contact info */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', height: '100%' }}>
              {contactInfo.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  className="glass-card"
                  style={{
                    padding: 'var(--space-lg) var(--space-xl)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-lg)',
                    textDecoration: 'none',
                  }}
                >
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
                      flexShrink: 0,
                    }}
                  >
                    <c.icon size={20} style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.68rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.18em',
                        color: 'var(--color-text-muted)',
                        marginBottom: '0.15rem',
                      }}
                    >
                      {c.label}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 400 }}>{c.value}</div>
                  </div>
                </a>
              ))}

              {/* Social CTA */}
              <div
                className="glass-panel"
                style={{
                  padding: 'var(--space-xl)',
                  textAlign: 'center',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-md)',
                }}
              >
                <Instagram size={28} style={{ color: 'var(--color-accent)' }} />
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                    @dravioletarodriguez
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    Síguenos para tips de belleza y novedades
                  </div>
                </div>
                <button className="btn btn-outline" style={{ fontSize: '0.72rem', padding: '0.6rem 1.5rem' }}>
                  <Instagram size={14} />
                  Seguir en Instagram
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
