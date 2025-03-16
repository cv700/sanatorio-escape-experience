
import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';

const Ambience = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  
  // References to animation frames for cleanup
  const animationRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    // Animation properties
    const particles: Particle[] = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(173, 201, 221, ${Math.random() * 0.5 + 0.1})`,
        velocity: {
          x: Math.random() * 0.5 - 0.25,
          y: Math.random() * 0.5 - 0.25
        }
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Only animate if playing
      if (isPlaying) {
        // Draw and update particles
        particles.forEach(particle => {
          // Update position
          particle.x += particle.velocity.x;
          particle.y += particle.velocity.y;
          
          // Boundary check with wrapping
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        });
        
        // Connect particles that are close to each other
        particles.forEach((p1, i) => {
          particles.slice(i + 1).forEach(p2 => {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(173, 201, 221, ${0.1 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });
        });
      } else {
        // Subtle static display when paused
        particles.forEach(particle => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        });
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };
  
  return (
    <section id="wellness" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sanatorio-beige to-sanatorio-cream z-0"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium tracking-widest uppercase text-sanatorio-deepBlue opacity-90">
            Ambient Therapy
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-display font-medium">Mindful Relaxation</h2>
          <p className="mt-4 text-lg text-sanatorio-charcoal/80 max-w-xl mx-auto leading-relaxed">
            Experience the peaceful ambience of San Otorio through visual meditation and ambient soundscapes.
          </p>
        </div>
        
        <div className="glass-panel p-8 md:p-12 max-w-4xl mx-auto rounded-xl shadow-md animate-fade-up">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <canvas 
              ref={canvasRef} 
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-sanatorio-blue/20 to-sanatorio-deepBlue/10"
            ></canvas>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="font-display text-xl text-sanatorio-charcoal/80">Coastal Ambience</span>
                <p className="text-sm mt-2 text-sanatorio-charcoal/60">
                  {isPlaying ? "Visualizing sound waves" : "Press play to begin"}
                </p>
              </div>
            </div>
            
            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/30 to-transparent backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <button 
                  onClick={togglePlay}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/70 backdrop-blur-sm shadow-sm hover:bg-white transition-all-300"
                >
                  {isPlaying ? 
                    <Pause className="w-5 h-5 text-sanatorio-charcoal" /> : 
                    <Play className="w-5 h-5 text-sanatorio-charcoal ml-0.5" />
                  }
                </button>
                
                <div className="flex items-center space-x-3 w-1/2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1 bg-white/50 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sanatorio-deepBlue"
                  />
                  <button 
                    onClick={toggleMute}
                    className="p-2 rounded-full hover:bg-white/30 transition-all-300"
                  >
                    {isMuted ? 
                      <VolumeX className="w-4 h-4 text-sanatorio-charcoal" /> : 
                      <Volume2 className="w-4 h-4 text-sanatorio-charcoal" />
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Morning Waves", "Afternoon Breeze", "Evening Calm", "Night Meditation"].map((preset, index) => (
              <button 
                key={index}
                className="glass-panel p-3 rounded-lg text-center transition-all-300 hover:shadow-md"
              >
                <span className="text-sm font-medium text-sanatorio-charcoal">{preset}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-sanatorio-charcoal/70 max-w-lg mx-auto">
            San Otorio's virtual experiences are designed to help reduce stress and promote mindfulness through careful application of visual and auditory stimuli.
          </p>
          <button className="mt-6 glass-panel px-8 py-3 rounded-full transition-all-300 hover:shadow-md text-sanatorio-charcoal font-medium">
            Learn About Sound Therapy
          </button>
        </div>
      </div>
    </section>
  );
};

// Type definition for particle
interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: {
    x: number;
    y: number;
  };
}

export default Ambience;
