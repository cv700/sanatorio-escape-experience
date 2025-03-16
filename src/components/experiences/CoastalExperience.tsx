
import { useRef, useEffect } from 'react';

interface CoastalExperienceProps {
  isPlaying: boolean;
}

const CoastalExperience = ({ isPlaying }: CoastalExperienceProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    
    // Set canvas dimensions
    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Wave parameters
    const waves = [
      { y: canvas.height * 0.6, amplitude: 15, frequency: 0.02, speed: 0.05, color: 'rgba(92, 136, 160, 0.4)' },
      { y: canvas.height * 0.65, amplitude: 20, frequency: 0.03, speed: 0.07, color: 'rgba(92, 136, 160, 0.3)' },
      { y: canvas.height * 0.7, amplitude: 25, frequency: 0.01, speed: 0.03, color: 'rgba(92, 136, 160, 0.5)' },
      { y: canvas.height * 0.75, amplitude: 30, frequency: 0.02, speed: 0.04, color: 'rgba(173, 201, 221, 0.4)' },
      { y: canvas.height * 0.8, amplitude: 35, frequency: 0.015, speed: 0.06, color: 'rgba(173, 201, 221, 0.5)' }
    ];
    
    // Particles for water spray effect
    const particles: Particle[] = [];
    const particleCount = 50;
    
    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height - Math.random() * 150,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: -Math.random() * 1 - 1,
        alpha: Math.random() * 0.5 + 0.2,
        life: Math.random() * 100 + 50
      });
    }
    
    // Time counter for wave animation
    let time = 0;
    
    // Draw background with gradient
    const drawBackground = () => {
      // Sky gradient
      const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.6);
      skyGradient.addColorStop(0, '#88C1E3');
      skyGradient.addColorStop(1, '#B8D9F0');
      
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);
      
      // Sun
      ctx.beginPath();
      ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 40, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 253, 184, 0.8)';
      ctx.fill();
      
      // Sun glow
      const sunGlow = ctx.createRadialGradient(
        canvas.width * 0.8, canvas.height * 0.2, 40,
        canvas.width * 0.8, canvas.height * 0.2, 100
      );
      sunGlow.addColorStop(0, 'rgba(255, 253, 184, 0.4)');
      sunGlow.addColorStop(1, 'rgba(255, 253, 184, 0)');
      
      ctx.beginPath();
      ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 100, 0, Math.PI * 2);
      ctx.fillStyle = sunGlow;
      ctx.fill();
      
      // Water base
      const waterGradient = ctx.createLinearGradient(0, canvas.height * 0.6, 0, canvas.height);
      waterGradient.addColorStop(0, '#5C88A0');
      waterGradient.addColorStop(1, '#ADC9DD');
      
      ctx.fillStyle = waterGradient;
      ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);
    };
    
    // Draw waves
    const drawWaves = () => {
      waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);
        
        for (let x = 0; x < canvas.width; x++) {
          const dx = x * wave.frequency;
          const y = wave.y + Math.sin(dx + time * wave.speed) * wave.amplitude;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        ctx.fillStyle = wave.color;
        ctx.fill();
      });
    };
    
    // Update and draw particles
    const updateParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;
        
        // Reset particles that are dead or out of bounds
        if (p.life <= 0 || p.y < canvas.height / 2 || p.x < 0 || p.x > canvas.width) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height - Math.random() * 50;
          p.speedX = Math.random() * 2 - 1;
          p.speedY = -Math.random() * 1 - 1;
          p.alpha = Math.random() * 0.5 + 0.2;
          p.life = Math.random() * 100 + 50;
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Only animate if playing
      if (isPlaying) {
        time += 0.01;
        
        drawBackground();
        drawWaves();
        updateParticles();
      } else {
        // Static display when paused
        drawBackground();
        drawWaves();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);
  
  return (
    <div className="relative w-full h-full bg-blue-100">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="text-white text-center p-4">
            <p className="text-xl font-medium">Press Play to Start</p>
            <p className="text-sm mt-2 opacity-80">Experience the calming coastal waves</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Type definition for spray particles
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  life: number;
}

export default CoastalExperience;
