import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Droplets,
  Sun,
  Scissors,
  Syringe,
  Zap,
  Sparkles,
  Waves,
  Leaf,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import BentoTilt from './BentoTilt';
import AnimatedTitle from './AnimatedTitle';
import MagneticButton from './MagneticButton';

type Category = 'facial' | 'corporal' | 'regenerativo';

interface Treatment {
  icon: React.FC<{ size?: number; style?: React.CSSProperties }>;
  name: string;
  desc: string;
  tags: string[];
  category: Category;
}

const treatments: Treatment[] = [
  {
    icon: Syringe,
    name: 'Ácido Hialurónico',
    desc: 'Restauración volumétrica facial con técnicas de precisión milimétrica. Resultados naturales que respetan tu expresividad.',
    tags: ['Labios', 'Pómulos', 'Ojeras', 'Mentón'],
    category: 'facial',
  },
  {
    icon: Sparkles,
    name: 'Toxina Botulínica',
    desc: 'Suavizado de líneas de expresión manteniendo la naturalidad de tu rostro. Técnica baby botox para un efecto fresco.',
    tags: ['Frente', 'Entrecejo', 'Patas de gallo'],
    category: 'facial',
  },
  {
    icon: Droplets,
    name: 'Mesoterapia Facial',
    desc: 'Cóctel vitamínico personalizado inyectado en la dermis para una luminosidad y tersura incomparables.',
    tags: ['Hidratación', 'Luminosidad', 'Firmeza'],
    category: 'facial',
  },
  {
    icon: Sun,
    name: 'Hilos Tensores',
    desc: 'Efecto lifting sin cirugía mediante hilos PDO de última generación. Redefine el óvalo facial de forma progresiva.',
    tags: ['Lifting', 'Redefinición', 'Colágeno'],
    category: 'facial',
  },
  {
    icon: Zap,
    name: 'Láser Corporal',
    desc: 'Tecnología láser de alta precisión para remodelación corporal, eliminación de estrías y mejora de textura cutánea.',
    tags: ['Remodelación', 'Estrías', 'Textura'],
    category: 'corporal',
  },
  {
    icon: Waves,
    name: 'Radiofrecuencia',
    desc: 'Tratamiento no invasivo que estimula la producción de colágeno para una piel más firme y tersa.',
    tags: ['Flacidez', 'Celulitis', 'Reafirmante'],
    category: 'corporal',
  },
  {
    icon: Scissors,
    name: 'Criolipólisis',
    desc: 'Eliminación de grasa localizada mediante frío controlado. Sin cirugía, sin agujas, resultados definitivos.',
    tags: ['Abdomen', 'Flancos', 'Muslos'],
    category: 'corporal',
  },
  {
    icon: Leaf,
    name: 'PRP & Exosomas',
    desc: 'Medicina regenerativa con factores de crecimiento propios. Rejuvenecimiento profundo a nivel celular.',
    tags: ['Regeneración', 'Antienvejecimiento', 'Capilar'],
    category: 'regenerativo',
  },
];

const categories: { key: Category; label: string }[] = [
  { key: 'facial', label: 'Facial' },
  { key: 'corporal', label: 'Corporal' },
  { key: 'regenerativo', label: 'Regenerativo' },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const TreatmentsSection: React.FC = () => {
  const [active, setActive] = useState<Category>('facial');

  const filtered = treatments.filter((t) => t.category === active);

  return (
    <section className="section" id="treatments" style={{ position: 'relative' }}>
      <div
        className="glow-orb glow-orb-accent animate-pulse-glow"
        style={{ width: 500, height: 500, bottom: '-10%', left: '-10%' }}
      />

      <div className="container">
        {/* Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
          <span className="section-label" style={{ justifyContent: 'center' }}>Tratamientos</span>
          <AnimatedTitle
            text="Tecnología al servicio de tu belleza"
            tag="h2"
            className="section-title"
            style={{ maxWidth: 600, margin: '0 auto var(--space-md)', justifyContent: 'center' }}
          />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Cada tratamiento se adapta a tu anatomía y objetivos personales
            con protocolos de última generación.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-sm)',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.6rem 1.5rem',
                fontSize: '0.8rem',
                fontWeight: active === cat.key ? 600 : 400,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: 'var(--radius-full)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                border: 'none',
                cursor: 'pointer',
                background: active === cat.key
                  ? 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-dark) 100%)'
                  : 'transparent',
                color: active === cat.key
                  ? '#0c0a08'
                  : 'var(--color-text-secondary)',
                boxShadow: active === cat.key
                  ? '0 4px 20px var(--color-accent-glow)'
                  : 'none',
                outline: active === cat.key
                  ? 'none'
                  : '1px solid rgba(200, 165, 90, 0.15)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Treatment cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid-4"
          >
            {filtered.map((t, i) => (
              <BentoTilt key={t.name} tiltStrength={6}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card"
                style={{
                  padding: 'var(--space-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-md)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                }}
              >
                {/* Top gradient line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'linear-gradient(90deg, var(--color-accent), var(--color-primary))',
                    opacity: 0.5,
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(200, 165, 90, 0.08)',
                    border: '1px solid rgba(200, 165, 90, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <t.icon size={22} style={{ color: 'var(--color-accent)' }} />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.15rem',
                    fontWeight: 400,
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {t.name}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                    flex: 1,
                  }}
                >
                  {t.desc}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.68rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(200, 165, 90, 0.06)',
                        border: '1px solid rgba(200, 165, 90, 0.1)',
                        color: 'var(--color-text-muted)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.78rem',
                    color: 'var(--color-accent)',
                    marginTop: 'var(--space-xs)',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                  }}
                >
                  Más info <ChevronRight size={14} />
                </div>
              </motion.div>
              </BentoTilt>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: 'var(--space-3xl)' }}
        >
          <MagneticButton strength={0.3} radius={100}>
            <a href="#contact" className="btn btn-outline" style={{ gap: '0.5rem' }}>
              Ver todos los tratamientos <ArrowRight size={16} />
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default TreatmentsSection;
