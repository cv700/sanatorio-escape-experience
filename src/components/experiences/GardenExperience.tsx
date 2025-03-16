
import { useRef, useEffect } from 'react';

interface GardenExperienceProps {
  isPlaying: boolean;
}

const GardenExperience = ({ isPlaying }: GardenExperienceProps) => {
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
    
    // Garden elements
    const skyColor = '#E0EED8';
    const groundColor = '#8BAD7C';
    
    // Flower types
    const flowerTypes = [
      { color: '#FF8080', size: 6 },  // Red
      { color: '#FFD485', size: 5 },  // Yellow
      { color: '#C3B1E1', size: 7 },  // Purple
      { color: '#FFBDDE', size: 5 }   // Pink
    ];
    
    // Create flowers
    const flowers: Flower[] = [];
    const flowerCount = 80;
    
    for (let i = 0; i < flowerCount; i++) {
      const type = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
      flowers.push({
        x: Math.random() * canvas.width,
        y: canvas.height - 100 + Math.random() * 50,
        size: type.size,
        color: type.color,
        stemHeight: 30 + Math.random() * 50,
        swayOffset: Math.random() * Math.PI * 2,
        swayAmount: 0.5 + Math.random() * 1.5
      });
    }
    
    // Butterflies
    const butterflies: Butterfly[] = [];
    const butterflyCount = 5;
    
    for (let i = 0; i < butterflyCount; i++) {
      butterflies.push({
        x: Math.random() * canvas.width,
        y: canvas.height / 2 + Math.random() * (canvas.height / 3),
        wingSpan: 8 + Math.random() * 5,
        color: flowerTypes[Math.floor(Math.random() * flowerTypes.length)].color,
        speed: 0.5 + Math.random() * 1.5,
        direction: Math.random() * Math.PI * 2,
        flapOffset: Math.random() * Math.PI * 2,
        flapSpeed: 0.1 + Math.random() * 0.2
      });
    }
    
    // Clouds
    const clouds: Cloud[] = [];
    const cloudCount = 4;
    
    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        x: Math.random() * canvas.width,
        y: 50 + Math.random() * 100,
        width: 60 + Math.random() * 100,
        height: 30 + Math.random() * 20,
        speed: 0.1 + Math.random() * 0.2
      });
    }
    
    // Time counter for animation
    let time = 0;
    
    // Draw sky and ground
    const drawBackground = () => {
      // Sky
      ctx.fillStyle = skyColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Sun
      const centerX = canvas.width * 0.75;
      const centerY = canvas.height * 0.2;
      const radius = 30;
      
      // Sun glow
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0, 
        centerX, centerY, radius * 3
      );
      gradient.addColorStop(0, 'rgba(255, 251, 224, 0.8)');
      gradient.addColorStop(0.5, 'rgba(255, 251, 224, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 251, 224, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Sun
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFBE0';
      ctx.fill();
      
      // Ground
      ctx.fillStyle = groundColor;
      const groundHeight = 100;
      ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
    };
    
    // Draw clouds
    const drawClouds = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      
      clouds.forEach(cloud => {
        // Update position
        cloud.x += cloud.speed * (isPlaying ? 1 : 0);
        if (cloud.x > canvas.width + cloud.width) {
          cloud.x = -cloud.width;
        }
        
        // Draw cloud as collection of circles
        const centerY = cloud.y;
        const numCircles = Math.floor(cloud.width / 20);
        
        for (let i = 0; i < numCircles; i++) {
          const circleX = cloud.x + i * 20;
          const circleY = centerY + Math.sin(i * 0.5) * 5;
          const radius = cloud.height / 2 - Math.abs(i - numCircles / 2) * 3;
          
          ctx.beginPath();
          ctx.arc(circleX, circleY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };
    
    // Draw flowers
    const drawFlowers = () => {
      flowers.forEach(flower => {
        // Calculate stem sway
        const stemSway = isPlaying ? Math.sin(time + flower.swayOffset) * flower.swayAmount : 0;
        
        // Draw stem
        ctx.beginPath();
        ctx.moveTo(flower.x, flower.y);
        ctx.lineTo(flower.x + stemSway, flower.y - flower.stemHeight);
        ctx.strokeStyle = '#4F7942';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Draw flower
        ctx.beginPath();
        ctx.arc(flower.x + stemSway, flower.y - flower.stemHeight, flower.size, 0, Math.PI * 2);
        ctx.fillStyle = flower.color;
        ctx.fill();
        
        // Draw flower center
        ctx.beginPath();
        ctx.arc(flower.x + stemSway, flower.y - flower.stemHeight, flower.size / 3, 0, Math.PI * 2);
        ctx.fillStyle = '#FFF7A5';
        ctx.fill();
      });
    };
    
    // Draw butterflies
    const drawButterflies = () => {
      butterflies.forEach(butterfly => {
        if (isPlaying) {
          // Update position based on direction
          butterfly.x += Math.cos(butterfly.direction) * butterfly.speed;
          butterfly.y += Math.sin(butterfly.direction) * butterfly.speed * 0.5;
          
          // Change direction occasionally or when near edge
          if (Math.random() < 0.01 || 
              butterfly.x < 20 || 
              butterfly.x > canvas.width - 20 || 
              butterfly.y < 20 || 
              butterfly.y > canvas.height - 20) {
            butterfly.direction += (Math.random() - 0.5) * 1;
          }
        }
        
        // Wing flap animation
        const wingFlap = Math.sin(time * butterfly.flapSpeed + butterfly.flapOffset);
        
        // Draw butterfly
        ctx.fillStyle = butterfly.color;
        
        // Left wing
        ctx.beginPath();
        ctx.ellipse(
          butterfly.x - butterfly.wingSpan * wingFlap, 
          butterfly.y, 
          butterfly.wingSpan, 
          butterfly.wingSpan * 0.6, 
          0, 0, Math.PI * 2
        );
        ctx.fill();
        
        // Right wing
        ctx.beginPath();
        ctx.ellipse(
          butterfly.x + butterfly.wingSpan * wingFlap, 
          butterfly.y, 
          butterfly.wingSpan, 
          butterfly.wingSpan * 0.6, 
          0, 0, Math.PI * 2
        );
        ctx.fill();
        
        // Body
        ctx.beginPath();
        ctx.ellipse(
          butterfly.x, 
          butterfly.y, 
          butterfly.wingSpan * 0.2, 
          butterfly.wingSpan * 0.6, 
          0, 0, Math.PI * 2
        );
        ctx.fillStyle = '#333';
        ctx.fill();
      });
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawBackground();
      drawClouds();
      drawFlowers();
      drawButterflies();
      
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
    <div className="relative w-full h-full bg-green-50">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="text-white text-center p-4">
            <p className="text-xl font-medium">Press Play to Start</p>
            <p className="text-sm mt-2 opacity-80">Experience the peaceful garden</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Type definitions
interface Flower {
  x: number;
  y: number;
  size: number;
  color: string;
  stemHeight: number;
  swayOffset: number;
  swayAmount: number;
}

interface Butterfly {
  x: number;
  y: number;
  wingSpan: number;
  color: string;
  speed: number;
  direction: number;
  flapOffset: number;
  flapSpeed: number;
}

interface Cloud {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

export default GardenExperience;
