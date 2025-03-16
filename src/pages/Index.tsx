
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
      <div className="min-h-screen bg-sanatorio-beige flex items-center justify-center">
        <div className="glass-panel p-8 max-w-md text-center">
          <h2 className="text-2xl font-display text-sanatorio-charcoal mb-4">
            We're experiencing a moment of tranquility
          </h2>
          <p className="text-sanatorio-charcoal/80">
            Our virtual retreat is taking a short break. Please refresh the page or try again later.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 glass-panel px-6 py-2 rounded-full transition-all-300 hover:shadow-md text-sanatorio-charcoal font-medium"
          >
            Reconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sanatorio-beige">
      <Header />
      <Hero />
      <Experience />
      <MapComponent />
      <Ambience />
      <Footer />
    </div>
  );
};

export default Index;
