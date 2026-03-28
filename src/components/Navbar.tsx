import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Inicio', href: '#home' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Tratamientos', href: '#treatments' },
  { label: 'Resultados', href: '#results' },
  { label: 'Testimonios', href: '#testimonials' },
  { label: 'Clínica', href: '#clinic' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '0.6rem 5%' : '1.25rem 5%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          background: scrolled ? 'rgba(12, 10, 8, 0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px) saturate(1.3)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.3)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(200, 165, 90, 0.08)'
            : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #c8a55a 0%, #d4a48c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              fontWeight: 500,
              fontFamily: 'var(--font-serif)',
              color: '#0c0a08',
              boxShadow: '0 2px 12px rgba(200, 165, 90, 0.2)',
            }}
          >
            V
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: '1.05rem',
              letterSpacing: '0.12em',
              lineHeight: 1.2,
              color: 'var(--color-text)',
            }}>
              DRA. VIOLETA
            </div>
            <div style={{
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
            }}>
              Medicina Estética
            </div>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <ul style={{ display: 'flex', gap: '2rem', margin: 0, alignItems: 'center' }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    fontWeight: 400,
                    color: activeSection === link.href.slice(1)
                      ? 'var(--color-accent-light)'
                      : 'var(--color-text-secondary)',
                    transition: 'color 0.3s ease',
                    position: 'relative',
                    paddingBottom: '4px',
                  }}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="nav-indicator"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 1,
                        background: 'linear-gradient(90deg, var(--color-accent), transparent)',
                        borderRadius: 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-accent" style={{ fontSize: '0.7rem', padding: '0.65rem 1.5rem' }}>
            <Phone size={13} />
            Reservar cita
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="hide-desktop"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text)',
            padding: '0.5rem',
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                zIndex: 98,
                backdropFilter: 'blur(4px)',
              }}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '85%',
                maxWidth: 380,
                background: 'rgba(18, 15, 12, 0.96)',
                backdropFilter: 'blur(30px)',
                zIndex: 99,
                padding: '6rem 2rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                borderLeft: '1px solid rgba(200, 165, 90, 0.08)',
              }}
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  style={{
                    fontSize: '1.5rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 300,
                    padding: '0.75rem 0',
                    color: activeSection === link.href.slice(1) ? 'var(--color-accent-light)' : 'var(--color-text)',
                    borderBottom: '1px solid rgba(200, 165, 90, 0.06)',
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ marginTop: 'auto' }}
              >
                <a href="#contact" onClick={closeMobile} className="btn btn-accent" style={{ width: '100%', justifyContent: 'center' }}>
                  <Phone size={16} />
                  Reservar cita
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
