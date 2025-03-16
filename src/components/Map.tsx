
import { useEffect, useRef, useState } from 'react';

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  
  // This simulates a map without requiring an API key
  useEffect(() => {
    if (!mapRef.current) return;
    
    try {
      const ctx = setupCanvas();
      if (!ctx) return;
      
      // Draw the simulated map
      drawSimulatedMap(ctx);
      
      // Add animation
      animateWater(ctx);
    } catch (error) {
      console.error("Error rendering map:", error);
      setHasError(true);
    }
  }, []);
  
  const setupCanvas = () => {
    if (!mapRef.current) return null;
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = mapRef.current.clientWidth;
    canvas.height = mapRef.current.clientHeight;
    canvas.style.borderRadius = '12px';
    
    // Clear any existing canvas
    mapRef.current.innerHTML = '';
    mapRef.current.appendChild(canvas);
    
    // Get context
    return canvas.getContext('2d');
  };
  
  const drawSimulatedMap = (ctx: CanvasRenderingContext2D) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Background (ocean)
    ctx.fillStyle = '#ADC9DD';
    ctx.fillRect(0, 0, width, height);
    
    // Land mass
    ctx.fillStyle = '#D7D4CD';
    ctx.beginPath();
    ctx.moveTo(width * 0.7, 0);
    ctx.lineTo(width, 0);
    ctx.lineTo(width, height);
    ctx.lineTo(width * 0.5, height);
    ctx.lineTo(width * 0.4, height * 0.7);
    ctx.lineTo(width * 0.5, height * 0.5);
    ctx.lineTo(width * 0.6, height * 0.3);
    ctx.lineTo(width * 0.7, height * 0.1);
    ctx.closePath();
    ctx.fill();
    
    // Coastline detail
    ctx.strokeStyle = '#C1AEA0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width * 0.7, 0);
    ctx.lineTo(width * 0.7, height * 0.1);
    ctx.lineTo(width * 0.6, height * 0.3);
    ctx.lineTo(width * 0.5, height * 0.5);
    ctx.lineTo(width * 0.4, height * 0.7);
    ctx.lineTo(width * 0.5, height);
    ctx.stroke();
    
    // San Otorio location
    const locationX = width * 0.55;
    const locationY = height * 0.4;
    
    // Location pin
    drawLocationPin(ctx, locationX, locationY);
  };
  
  const drawLocationPin = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    // Pin shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.arc(x + 2, y + 2, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Pin base
    ctx.fillStyle = '#5C88A0';
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Pin inner
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Ripple effect for pin
    drawRippleEffect(ctx, x, y);
    
    // Location name
    ctx.fillStyle = '#3A3A3A';
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('San Otorio', x, y - 20);
  };
  
  const drawRippleEffect = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const maxRadius = 20;
    let currentRadius = 0;
    
    const animate = () => {
      // Clear previous ripple
      ctx.clearRect(x - maxRadius - 2, y - maxRadius - 2, maxRadius * 2 + 4, maxRadius * 2 + 4);
      
      // Redraw map portion that was cleared
      drawSimulatedMap(ctx);
      
      // Draw new ripple
      ctx.strokeStyle = 'rgba(92, 136, 160, ' + (1 - currentRadius / maxRadius) + ')';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, currentRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      // Increase radius
      currentRadius += 0.5;
      
      // Reset animation when reaches max radius
      if (currentRadius > maxRadius) {
        currentRadius = 0;
      }
      
      // Continue animation
      requestAnimationFrame(animate);
    };
    
    animate();
  };
  
  const animateWater = (ctx: CanvasRenderingContext2D) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    let offset = 0;
    
    const animate = () => {
      // Only animate water portion
      ctx.clearRect(0, 0, width * 0.7, height);
      
      // Redraw water with wave effect
      ctx.fillStyle = '#ADC9DD';
      ctx.fillRect(0, 0, width * 0.7, height);
      
      // Draw some wave lines
      for (let i = 0; i < 5; i++) {
        const y = (height / 5) * i + offset;
        
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        // Wavy line
        for (let x = 0; x < width * 0.7; x += 10) {
          const waveHeight = Math.sin((x + offset) / 30) * 5;
          const point = y + waveHeight;
          
          if (x === 0) {
            ctx.moveTo(x, point);
          } else {
            ctx.lineTo(x, point);
          }
        }
        
        ctx.stroke();
      }
      
      // Move waves
      offset += 0.5;
      if (offset > 100) offset = 0;
      
      // Continue animation
      requestAnimationFrame(animate);
    };
    
    animate();
  };

  if (hasError) {
    return (
      <section id="location" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sanatorio-cream to-sanatorio-beige z-0"></div>
        <div className="section-container relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-medium tracking-widest uppercase text-sanatorio-deepBlue opacity-90">
              Virtual Location
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-display font-medium">Visit San Otorio</h2>
            <p className="mt-4 text-lg text-sanatorio-charcoal/80 max-w-xl mx-auto leading-relaxed">
              Nestled along California's breathtaking coastline, San Otorio offers a serene retreat from everyday life.
            </p>
          </div>
          <div className="glass-panel p-8 text-center">
            <p className="text-sanatorio-charcoal">Our interactive map visualization is taking a moment to load.</p>
            <p className="mt-2 text-sanatorio-charcoal/70">Please enjoy the other aspects of your virtual retreat experience.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="location" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sanatorio-cream to-sanatorio-beige z-0"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium tracking-widest uppercase text-sanatorio-deepBlue opacity-90">
            Virtual Location
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-display font-medium">Visit San Otorio</h2>
          <p className="mt-4 text-lg text-sanatorio-charcoal/80 max-w-xl mx-auto leading-relaxed">
            Nestled along California's breathtaking coastline, San Otorio offers a serene retreat from everyday life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up order-2 md:order-1">
            <h3 className="text-2xl font-display text-sanatorio-charcoal">A Coastal Haven</h3>
            <p className="mt-4 leading-relaxed text-sanatorio-charcoal/80">
              San Otorio is a fictional coastal wellness retreat inspired by California's most beautiful sanctuaries. It represents the perfect balance of natural beauty, timeless design, and healing energy.
            </p>
            <p className="mt-4 leading-relaxed text-sanatorio-charcoal/80">
              While you can't physically visit this place, our virtual experience brings the essence of San Otorio directly to you - wherever you are.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="glass-panel px-5 py-3 rounded-lg">
                <span className="text-sm font-medium text-sanatorio-charcoal/70">Climate</span>
                <p className="font-medium">Mediterranean</p>
              </div>
              <div className="glass-panel px-5 py-3 rounded-lg">
                <span className="text-sm font-medium text-sanatorio-charcoal/70">Season</span>
                <p className="font-medium">Eternal Spring</p>
              </div>
              <div className="glass-panel px-5 py-3 rounded-lg">
                <span className="text-sm font-medium text-sanatorio-charcoal/70">Terrain</span>
                <p className="font-medium">Coastal Cliffs</p>
              </div>
            </div>
          </div>

          <div ref={mapRef} className="h-[300px] md:h-[400px] rounded-xl shadow-lg animate-fade-up animate-delay-200 order-1 md:order-2">
            {/* Canvas will be inserted here */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapComponent;
