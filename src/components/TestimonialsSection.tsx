import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  age: number;
  treatment: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'María García L.',
    age: 42,
    treatment: 'Armonización facial',
    text: 'La Dra. Violeta entendió exactamente lo que buscaba. El resultado es increíblemente natural, nadie nota que me he hecho algo pero todos me dicen que me ven radiante. Su profesionalidad y cercanía te hacen sentir en las mejores manos.',
    rating: 5,
  },
  {
    name: 'Carmen Díaz P.',
    age: 35,
    treatment: 'Ácido hialurónico labios',
    text: 'Tenía mucho miedo al resultado artificial, pero la Dra. Rodríguez me explicó todo el proceso con total transparencia. Mis labios se ven preciosos y completamente naturales. La experiencia en su clínica es excepcional.',
    rating: 5,
  },
  {
    name: 'Laura Martínez R.',
    age: 50,
    treatment: 'Hilos tensores + PRP',
    text: 'Después de probar varias clínicas, encontré en la Dra. Violeta lo que buscaba: un enfoque integral y personalizado. El tratamiento combinado de hilos y PRP ha rejuvenecido mi rostro de forma espectacular.',
    rating: 5,
  },
  {
    name: 'Ana Belén Torres',
    age: 38,
    treatment: 'Mesoterapia facial',
    text: 'Mi piel ha cambiado por completo. La luminosidad y textura que he conseguido con las sesiones de mesoterapia son impresionantes. La doctora personaliza cada cóctel según las necesidades de tu piel.',
    rating: 5,
  },
  {
    name: 'Patricia Ruiz M.',
    age: 45,
    treatment: 'Botox preventivo',
    text: 'Llevo 3 años confiando en la Dra. Violeta para mi botox preventivo. Siempre mantengo mi expresividad y el resultado es un rostro descansado y fresco. Su técnica es impecable.',
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="section-compact" id="testimonials" style={{ position: 'relative', padding: 'var(--space-5xl) 5%' }}>
      <div
        className="glow-orb glow-orb-primary animate-pulse-glow"
        style={{ width: 400, height: 400, top: '50%', right: '-5%', transform: 'translateY(-50%)' }}
      />

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}
        >
          <span className="section-label" style={{ justifyContent: 'center' }}>Testimonios</span>
          <h2 className="section-title">
            Lo que dicen <span className="text-gradient">nuestras pacientes</span>
          </h2>
        </motion.div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ maxWidth: 800, margin: '0 auto' }}
        >
          <div
            className="glass-panel"
            style={{
              padding: 'var(--space-3xl)',
              position: 'relative',
              textAlign: 'center',
            }}
          >
            {/* Quote icon */}
            <Quote
              size={40}
              style={{
                color: 'var(--color-accent)',
                opacity: 0.15,
                position: 'absolute',
                top: 'var(--space-xl)',
                left: 'var(--space-xl)',
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.3rem', marginBottom: 'var(--space-lg)' }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#c8a55a" style={{ color: '#c8a55a' }} />
                  ))}
                </div>

                {/* Text */}
                <p
                  className="text-serif"
                  style={{
                    fontSize: '1.3rem',
                    fontStyle: 'italic',
                    lineHeight: 1.8,
                    color: 'var(--color-text)',
                    marginBottom: 'var(--space-xl)',
                  }}
                >
                  "{t.text}"
                </p>

                <div className="divider-ornate" style={{ margin: 'var(--space-lg) auto' }} />

                {/* Author */}
                <div>
                  <div style={{ fontWeight: 500, fontSize: '1rem', letterSpacing: '0.02em' }}>{t.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    {t.age} años &mdash; {t.treatment}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'var(--space-lg)',
                marginTop: 'var(--space-xl)',
              }}
            >
              <button
                onClick={prev}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '1px solid rgba(200, 165, 90, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={18} style={{ color: 'var(--color-text-secondary)' }} />
              </button>

              {/* Dots */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    style={{
                      width: i === current ? 24 : 8,
                      height: 8,
                      borderRadius: 'var(--radius-full)',
                      background: i === current
                        ? 'linear-gradient(90deg, var(--color-accent), var(--color-primary))'
                        : 'var(--color-surface)',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '1px solid rgba(200, 165, 90, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={18} style={{ color: 'var(--color-text-secondary)' }} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
