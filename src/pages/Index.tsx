
import { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import MapComponent from '../components/Map';
import Ambience from '../components/Ambience';
import Footer from '../components/Footer';

const Index = () => {
  // Smooth scrolling for anchor links
  useEffect(() => {
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
  }, []);

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
