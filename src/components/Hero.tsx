
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  // Digital retreat phrases
  const phrases = [
    'a digital sanctuary',
    'a mindful escape',
    'a virtual retreat',
    'a place of renewal'
  ];

  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    // Mark as loaded for animations
    setLoaded(true);

    // Change phrase every 5 seconds
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        const nextIndex = (phrases.indexOf(currentPhrase) + 1) % phrases.length;
        setCurrentPhrase(phrases[nextIndex]);
        setIsChanging(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPhrase]);

  return (
    <section id="top" className="min-h-screen w-full relative overflow-hidden">
      {/* Content */}
      <div className="section-container flex flex-col justify-center items-center h-screen text-center relative z-10">
        <div className={`transition-all-500 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-sm md:text-base font-medium tracking-widest uppercase text-sanatorio-neon">
            San Otorio
          </span>
        </div>
        
        <h1 className={`mt-4 text-4xl md:text-7xl font-display font-medium max-w-4xl leading-tight transition-all-500 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-100 text-sanatorio-mint`}>
          A virtual California wellness retreat experience
        </h1>
        
        <div 
          className={`mt-6 h-8 overflow-hidden transition-all-500 transform ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } delay-200`}
        >
          <p 
            className={`text-lg md:text-xl text-sanatorio-greenLight transition-all-300 transform ${
              isChanging ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
            }`}
          >
            {currentPhrase}
          </p>
        </div>
        
        <a
          href="#experience"
          className={`mt-12 flex flex-col items-center transition-all-500 transform ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } delay-300 hover:translate-y-1 transition-all-300`}
        >
          <span className="text-sm text-sanatorio-mint/60 mb-2">Discover</span>
          <ChevronDown className="animate-pulse-gentle text-sanatorio-mint/60" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
