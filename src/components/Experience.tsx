
import { useState, useRef, useEffect } from 'react';
import { Sun, Waves, Wind, Volume2, VolumeX } from 'lucide-react';
import CoastalExperience from './experiences/CoastalExperience';
import GardenExperience from './experiences/GardenExperience';
import MeditationExperience from './experiences/MeditationExperience';
import { Button } from './ui/button';

const Experience = () => {
  const [activeMode, setActiveMode] = useState('coastal');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio file mapping for each experience
  const audioFiles = {
    coastal: '/audio/coastal-waves.mp3',
    garden: '/audio/garden-ambience.mp3',
    meditation: '/audio/meditation-bells.mp3'
  };

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

  // Handle audio setup and changes
  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    // Update audio source when mode changes
    const audioElement = audioRef.current;
    audioElement.src = audioFiles[activeMode as keyof typeof audioFiles] || '';
    audioElement.loop = true;
    audioElement.volume = isMuted ? 0 : volume;

    // Play/pause based on state
    if (isPlaying && !isMuted) {
      const playPromise = audioElement.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Audio playback failed:", error);
        });
      }
    } else {
      audioElement.pause();
    }

    // Cleanup function
    return () => {
      audioElement.pause();
    };
  }, [activeMode, isPlaying, isMuted, volume]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume : 0;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current && !isMuted) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleModeChange = (mode: string) => {
    setActiveMode(mode);
    // Reset play state when changing modes
    setIsPlaying(false);
    // Small delay before allowing play again
    setTimeout(() => {
      if (!isMuted) setIsPlaying(true);
    }, 300);
  };

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
              onClick={() => handleModeChange(exp.id)}
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
                {experiences.find(e => e.id === activeMode)?.title} Experience
              </h3>
              <p className="mt-4 text-sanatorio-charcoal/80 leading-relaxed">
                {experiences.find(e => e.id === activeMode)?.description}
              </p>
              
              {/* Audio controls */}
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={togglePlay}
                    className="glass-panel hover:shadow-md p-3 rounded-full transition-all-300"
                  >
                    {isPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sanatorio-charcoal">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sanatorio-charcoal">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    )}
                  </button>
                  
                  <button
                    onClick={toggleMute}
                    className="glass-panel hover:shadow-md p-3 rounded-full transition-all-300"
                  >
                    {isMuted ? <VolumeX size={20} className="text-sanatorio-charcoal" /> : <Volume2 size={20} className="text-sanatorio-charcoal" />}
                  </button>
                  
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full h-2 bg-sanatorio-charcoal/20 rounded-full appearance-none cursor-pointer"
                      disabled={isMuted}
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={togglePlay}
                  >
                    {isPlaying ? "Pause Experience" : "Start Experience"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-gray-200/30 animate-fade-in">
              {activeMode === 'coastal' && <CoastalExperience isPlaying={isPlaying} />}
              {activeMode === 'garden' && <GardenExperience isPlaying={isPlaying} />}
              {activeMode === 'meditation' && <MeditationExperience isPlaying={isPlaying} />}
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
