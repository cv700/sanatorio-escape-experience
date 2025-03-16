
import { useRef, useEffect } from 'react';

interface MeditationExperienceProps {
  isPlaying: boolean;
}

const MeditationExperience = ({ isPlaying }: MeditationExperienceProps) => {
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
    
    // Background colors
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#2D2D2D');
    bgGradient.addColorStop(1, '#1A1A1A');
    
    // Meditation circles
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(canvas.width, canvas.height) * 0.4;
    
    // Particles for ambient effect
    const particles: Particle[] = [];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * maxRadius;
      const angle = Math.random() * Math.PI * 2;
      
      particles.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        radius: Math.random() * 3 + 1,
        color: getParticleColor(Math.random()),
        orbit: radius,
        angle: angle,
        speed: 0.001 + Math.random() * 0.002,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }
    
    // Color function for particles
    function getParticleColor(value: number): string {
      if (value < 0.25) return 'rgba(255, 255, 255, 0.5)';
      if (value < 0.5) return 'rgba(173, 216, 230, 0.5)';
      if (value < 0.75) return 'rgba(147, 112, 219, 0.5)';
      return 'rgba(188, 143, 143, 0.5)';
    }
    
    // Breathing animation variables
    let breathPhase = 0;
    const breathInDuration = 4; // seconds
    const holdDuration = 4; // seconds
    const breathOutDuration = 4; // seconds
    const pauseDuration = 2; // seconds
    const totalCycleDuration = breathInDuration + holdDuration + breathOutDuration + pauseDuration;
    let cycleTime = 0;
    
    // Mandala configuration
    const mandala = {
      rings: 5,
      elementsPerRing: 8,
      rotation: 0
    };
    
    // Time counter for animation
    let time = 0;
    
    // Draw background
    const drawBackground = () => {
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    // Draw breathing circle
    const drawBreathingCircle = () => {
      // Calculate breath phase
      if (isPlaying) {
        cycleTime = (cycleTime + 0.01) % totalCycleDuration;
      }
      
      // Determine current breathing phase
      if (cycleTime < breathInDuration) {
        // Breathing in - expand
        breathPhase = cycleTime / breathInDuration;
      } else if (cycleTime < breathInDuration + holdDuration) {
        // Holding breath - stay expanded
        breathPhase = 1;
      } else if (cycleTime < breathInDuration + holdDuration + breathOutDuration) {
        // Breathing out - contract
        const breathOutProgress = (cycleTime - breathInDuration - holdDuration) / breathOutDuration;
        breathPhase = 1 - breathOutProgress;
      } else {
        // Pause before next cycle - stay contracted
        breathPhase = 0;
      }
      
      // Draw guidance text
      ctx.textAlign = 'center';
      ctx.font = '16px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      
      if (cycleTime < breathInDuration) {
        ctx.fillText('Breathe In', centerX, centerY + maxRadius + 30);
      } else if (cycleTime < breathInDuration + holdDuration) {
        ctx.fillText('Hold', centerX, centerY + maxRadius + 30);
      } else if (cycleTime < breathInDuration + holdDuration + breathOutDuration) {
        ctx.fillText('Breathe Out', centerX, centerY + maxRadius + 30);
      } else {
        ctx.fillText('Pause', centerX, centerY + maxRadius + 30);
      }
      
      // Draw the main breathing circle
      const currentRadius = maxRadius * 0.3 + (maxRadius * 0.5 * breathPhase);
      
      // Glow effect
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, currentRadius * 0.8,
        centerX, centerY, currentRadius * 1.5
      );
      glowGradient.addColorStop(0, 'rgba(147, 112, 219, 0.8)');
      glowGradient.addColorStop(0.5, 'rgba(147, 112, 219, 0.3)');
      glowGradient.addColorStop(1, 'rgba(147, 112, 219, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
      
      // Main circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, currentRadius, 0, Math.PI * 2);
      
      const circleGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, currentRadius
      );
      circleGradient.addColorStop(0, 'rgba(188, 143, 143, 0.7)');
      circleGradient.addColorStop(1, 'rgba(147, 112, 219, 0.7)');
      
      ctx.fillStyle = circleGradient;
      ctx.fill();
    };
    
    // Draw mandala pattern
    const drawMandala = () => {
      // Update rotation if playing
      if (isPlaying) {
        mandala.rotation += 0.001;
      }
      
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(mandala.rotation);
      
      // Draw each ring
      for (let ring = 0; ring < mandala.rings; ring++) {
        const ringRadius = (maxRadius * 0.2) + (ring * maxRadius * 0.1);
        const elementsInRing = mandala.elementsPerRing * (ring + 1);
        
        // Draw elements in the ring
        for (let i = 0; i < elementsInRing; i++) {
          const angle = (i / elementsInRing) * Math.PI * 2;
          const x = ringRadius * Math.cos(angle);
          const y = ringRadius * Math.sin(angle);
          
          // Petal shape with oscillation
          const petalSize = (maxRadius * 0.03) * (1 + 0.2 * Math.sin(time * 0.5 + ring));
          const petalLength = (maxRadius * 0.08) * (1 + 0.1 * Math.sin(time * 0.3 + ring + i));
          
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle + Math.PI / 2);
          
          // Draw petal
          ctx.beginPath();
          ctx.ellipse(0, 0, petalSize, petalLength, 0, 0, Math.PI * 2);
          
          // Color based on ring
          const opacity = 0.3 + 0.1 * Math.sin(time + ring + i);
          if (ring % 3 === 0) {
            ctx.fillStyle = `rgba(173, 216, 230, ${opacity})`;
          } else if (ring % 3 === 1) {
            ctx.fillStyle = `rgba(147, 112, 219, ${opacity})`;
          } else {
            ctx.fillStyle = `rgba(188, 143, 143, ${opacity})`;
          }
          
          ctx.fill();
          ctx.restore();
        }
      }
      
      ctx.restore();
    };
    
    // Update and draw particles
    const updateParticles = () => {
      particles.forEach(p => {
        if (isPlaying) {
          // Update position in orbit
          p.angle += p.speed;
          
          // Occasionally adjust orbit
          if (Math.random() < 0.01) {
            p.orbit = Math.max(0, Math.min(maxRadius, p.orbit + (Math.random() - 0.5) * 5));
          }
        }
        
        p.x = centerX + p.orbit * Math.cos(p.angle);
        p.y = centerY + p.orbit * Math.sin(p.angle);
        
        // Pulse size
        const pulse = isPlaying ? 0.5 + 0.5 * Math.sin(time * p.pulseSpeed + p.pulseOffset) : 1;
        const currentRadius = p.radius * pulse;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawBackground();
      drawMandala();
      drawBreathingCircle();
      updateParticles();
      
      // Only update time if playing
      if (isPlaying) {
        time += 0.01;
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
    <div className="relative w-full h-full bg-gray-900">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="text-white text-center p-4">
            <p className="text-xl font-medium">Press Play to Start</p>
            <p className="text-sm mt-2 opacity-80">Begin your meditation session</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Type definitions
interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  orbit: number;
  angle: number;
  speed: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export default MeditationExperience;
