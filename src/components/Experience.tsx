
import { useState } from 'react';
import { Sun, Waves, Wind } from 'lucide-react';

const Experience = () => {
  const [activeMode, setActiveMode] = useState('coastal');

  const experiences = [
    {
      id: 'coastal',
      icon: <Waves className="w-6 h-6" />,
      title: 'Coastal',
      description: 'Experience the soothing rhythm of ocean waves with gentle coastal breezes and warm sunshine.',
      color: 'bg-sanatorio-blue/20 text-sanatorio-deepBlue',
      activeColor: 'bg-sanatorio-blue text-white'
    },
    {
      id: 'garden',
      icon: <Sun className="w-6 h-6" />,
      title: 'Garden',
      description: 'Immerse yourself in a tranquil garden setting with gentle birdsong and rustling leaves.',
      color: 'bg-sanatorio-sage/20 text-sanatorio-charcoal',
      activeColor: 'bg-sanatorio-sage text-sanatorio-charcoal'
    },
    {
      id: 'meditation',
      icon: <Wind className="w-6 h-6" />,
      title: 'Meditation',
      description: 'Enter a calm, focused state with ambient sounds designed for deep meditation and mindfulness.',
      color: 'bg-sanatorio-stone/20 text-sanatorio-charcoal',
      activeColor: 'bg-sanatorio-stone text-sanatorio-charcoal'
    }
  ];

  return (
    <section id="experience" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sanatorio-beige to-sanatorio-cream z-0"></div>
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-medium tracking-widest uppercase text-sanatorio-deepBlue opacity-90">
            Immersive Experience
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-display font-medium">Choose Your Ambience</h2>
          <p className="mt-4 text-lg text-sanatorio-charcoal/80 max-w-xl mx-auto leading-relaxed">
            Customize your virtual retreat experience with different ambient settings that transport you to California's most serene environments.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {experiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setActiveMode(exp.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all-300 ${
                activeMode === exp.id ? exp.activeColor : exp.color
              }`}
            >
              {exp.icon}
              <span className="font-medium">{exp.title}</span>
            </button>
          ))}
        </div>

        {/* Experience Display */}
        <div className="mt-16 glass-panel p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-display text-sanatorio-charcoal">
                {experiences.find(e => e.id === activeMode)?.title} Mode
              </h3>
              <p className="mt-4 text-sanatorio-charcoal/80 leading-relaxed">
                {experiences.find(e => e.id === activeMode)?.description}
              </p>
              <div className="mt-6 flex gap-4">
                <button className="glass-panel hover:shadow-md px-5 py-2 rounded-full transition-all-300 text-sm font-medium text-sanatorio-charcoal">
                  Start Experience
                </button>
                <button className="px-5 py-2 rounded-full transition-all-300 text-sm font-medium text-sanatorio-charcoal hover:text-sanatorio-deepBlue">
                  Learn More
                </button>
              </div>
            </div>

            <div className={`aspect-[4/3] rounded-xl overflow-hidden shadow-lg transition-all-500 animate-pulse-gentle`}>
              {activeMode === 'coastal' && (
                <div className="w-full h-full bg-sanatorio-blue/30 flex items-center justify-center relative">
                  <div className="absolute inset-0 animate-wave opacity-30" 
                    style={{ 
                      background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23ADC9DD' opacity='.5' class='shape-fill'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' fill='%235C88A0' opacity='.3' class='shape-fill'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundSize: "200% 100%", 
                      backgroundRepeat: "repeat-x"
                    }}
                  />
                  <span className="text-white font-medium text-shadow-sm">Visualizer Coming Soon</span>
                </div>
              )}
              
              {activeMode === 'garden' && (
                <div className="w-full h-full bg-sanatorio-sage/30 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-sanatorio-sage/10 to-sanatorio-sage/40"></div>
                  <span className="text-sanatorio-charcoal font-medium text-shadow-sm relative z-10">Visualizer Coming Soon</span>
                </div>
              )}
              
              {activeMode === 'meditation' && (
                <div className="w-full h-full bg-sanatorio-stone/30 flex items-center justify-center">
                  <div className="absolute inset-0 animate-breathe opacity-30 bg-gradient-to-br from-sanatorio-stone/10 to-sanatorio-stone/40"></div>
                  <span className="text-sanatorio-charcoal font-medium text-shadow-sm relative z-10">Visualizer Coming Soon</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Ambient Sounds",
              description: "Experience authentic California coastal, garden, and meditation soundscapes."
            },
            {
              title: "Visual Meditation",
              description: "Gentle animations designed to promote focus and reduce stress."
            },
            {
              title: "Timed Sessions",
              description: "Schedule your virtual retreat with customizable session lengths."
            }
          ].map((feature, index) => (
            <div key={index} className="glass-panel p-6 rounded-xl transition-all-300 hover:shadow-md animate-fade-up" style={{ animationDelay: `${index * 100 + 300}ms` }}>
              <h3 className="text-xl font-display text-sanatorio-charcoal">{feature.title}</h3>
              <p className="mt-3 text-sanatorio-charcoal/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
