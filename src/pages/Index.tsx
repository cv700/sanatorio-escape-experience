
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import MapComponent from '../components/Map';
import Ambience from '../components/Ambience';
import Footer from '../components/Footer';

const Index = () => {
  const [error, setError] = useState<Error | null>(null);
  
  // Smooth scrolling for anchor links
  useEffect(() => {
    try {
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a');
        
        if (!anchor) return;
        
        const href = anchor.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
          });
        }
      };

      document.addEventListener('click', handleAnchorClick);
      
      return () => {
        document.removeEventListener('click', handleAnchorClick);
      };
    } catch (err) {
      console.error('Error in smooth scroll effect:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-sanatorio-darkGreen flex items-center justify-center">
        <div className="glass-panel p-8 max-w-md text-center">
          <h2 className="text-2xl font-display text-sanatorio-neon mb-4">
            SYSTEM MALFUNCTION
          </h2>
          <p className="text-sanatorio-mint/80">
            Virtual retreat system experiencing temporary errors. Please reconnect.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 glass-panel px-6 py-2 rounded-full transition-all-300 hover:shadow-md text-sanatorio-neon font-medium border border-sanatorio-neon/50"
          >
            RECONNECT
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sanatorio-darkGreen relative">
      {/* Background image container - will be used for looping background */}
      <div className="fixed inset-0 z-0 lofi-bg bg-digital-gradient bg-lofi-noise">
        {/* Digital scanlines effect */}
        <div className="absolute inset-0 digital-scanline animate-scan"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <Experience />
        <MapComponent />
        <Ambience />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
