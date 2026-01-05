import './index.css';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Home Sections
import HeroSection from './components/home/HeroSection';
import AboutSection from './components/home/AboutSection';
import ServicesSection from './components/home/ServicesSection';
import NewsSection from './components/home/NewsSection';
import CTASection from './components/home/CTASection';

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <NewsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default App;
