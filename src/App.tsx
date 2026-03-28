import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TreatmentsSection from './components/TreatmentsSection';
import ResultsSection from './components/ResultsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ClinicSection from './components/ClinicSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-wrapper">
      {/* Fixed 3D background */}
      <Hero3D />

      {/* Navigation */}
      <Navbar />

      {/* Page sections */}
      <main>
        <HeroSection />
        <AboutSection />
        <TreatmentsSection />
        <ResultsSection />
        <TestimonialsSection />
        <ClinicSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
