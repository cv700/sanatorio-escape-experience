
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ExternalLink, HeartPulse, AlertTriangle } from 'lucide-react';

const History = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-sanatorio-darkGreen relative">
      {/* Background elements */}
      <div className="fixed inset-0 z-0 lofi-bg bg-digital-gradient bg-lofi-noise">
        <div className="absolute inset-0 digital-scanline animate-scan"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />

        <main className="pt-24 pb-16">
          <div className="section-container">
            {/* Hero section */}
            <div className={`mb-16 transition-all-500 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="text-sm md:text-base font-medium tracking-widest uppercase text-sanatorio-neon">Historical Context</span>
              <h1 className="mt-4 text-3xl md:text-5xl font-display font-medium leading-tight text-sanatorio-mint">
                The History of Sanatoria & Tuberculosis
              </h1>
              <p className="mt-6 text-lg text-sanatorio-greenLight/80 max-w-3xl">
                A look at the past, present, and future of tuberculosis treatment and how sanatoria shaped modern medicine and architecture.
              </p>
            </div>

            {/* Historical timeline */}
            <section className={`mb-16 glass-panel p-6 md:p-8 transition-all-500 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-100`}>
              <h2 className="text-2xl font-display text-sanatorio-neon mb-6">The Rise of Sanatoria (1850s-1950s)</h2>
              
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3 glass-panel aspect-video bg-sanatorio-darkGreen flex items-center justify-center">
                    <p className="text-sm text-sanatorio-neon/50 italic">Historical sanatorium image placeholder</p>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl text-sanatorio-mint mb-3">The "Fresh Air" Cure</h3>
                    <p className="text-sanatorio-mint/80 leading-relaxed">
                      In the mid-19th century, tuberculosis (TB) was responsible for nearly one in four deaths in Europe and America. With no antibiotics yet available, physicians began creating specialized hospitals called sanatoria, designed around the belief that rest, good nutrition, and fresh mountain or seaside air could help the body fight TB.
                    </p>
                    <p className="mt-3 text-sanatorio-mint/80 leading-relaxed">
                      Dr. Hermann Brehmer opened the first sanatorium in Görbersdorf, Germany (now Poland) in 1854, establishing a model that would be replicated worldwide. These institutions typically featured large sunlit porches where patients could recline for hours in all weather conditions, breathing in the supposedly therapeutic air.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-2/3">
                    <h3 className="text-xl text-sanatorio-mint mb-3">California's Sanatorium Movement</h3>
                    <p className="text-sanatorio-mint/80 leading-relaxed">
                      California became a favored location for sanatoria due to its mild climate and abundant sunshine. The Pottenger Sanatorium in Monrovia (1903) and Barlow Sanatorium in Los Angeles (1902) were among the most prominent. Thousands of "health seekers" migrated to California, profoundly influencing the state's growth and architectural development.
                    </p>
                    <p className="mt-3 text-sanatorio-mint/80 leading-relaxed">
                      The sanatorium movement helped establish California's reputation as a place of health and renewal—a cultural association that persists in wellness tourism today, including our virtual San Otorio retreat.
                    </p>
                  </div>
                  <div className="md:w-1/3 glass-panel aspect-video bg-sanatorio-darkGreen flex items-center justify-center">
                    <p className="text-sm text-sanatorio-neon/50 italic">California sanatorium image placeholder</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Modern TB Crisis */}
            <section className={`mb-16 glass-panel p-6 md:p-8 transition-all-500 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-200`}>
              <div className="mb-6 flex items-center">
                <AlertTriangle className="text-sanatorio-neon mr-3" />
                <h2 className="text-2xl font-display text-sanatorio-neon">Tuberculosis Today: A Modern Crisis</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-black/30 p-5 rounded-lg border border-sanatorio-neon/20">
                  <h3 className="text-xl text-sanatorio-mint mb-3">The Ongoing Epidemic</h3>
                  <p className="text-sanatorio-mint/80 leading-relaxed">
                    Despite the development of antibiotics in the mid-20th century, tuberculosis remains one of the world's deadliest infectious diseases. In 2022, approximately 10.6 million people fell ill with TB, and 1.3 million died—making it the second leading infectious killer after COVID-19.
                  </p>
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="glass-panel p-4 text-center">
                      <p className="text-2xl font-display text-sanatorio-neon">10.6M</p>
                      <p className="text-xs text-sanatorio-mint/70 mt-1">New TB cases annually</p>
                    </div>
                    <div className="glass-panel p-4 text-center">
                      <p className="text-2xl font-display text-sanatorio-neon">1.3M</p>
                      <p className="text-xs text-sanatorio-mint/70 mt-1">Deaths each year</p>
                    </div>
                    <div className="glass-panel p-4 text-center">
                      <p className="text-2xl font-display text-sanatorio-neon">30+</p>
                      <p className="text-xs text-sanatorio-mint/70 mt-1">High burden countries</p>
                    </div>
                    <div className="glass-panel p-4 text-center">
                      <p className="text-2xl font-display text-sanatorio-neon">1/4</p>
                      <p className="text-xs text-sanatorio-mint/70 mt-1">Of world population infected</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl text-sanatorio-mint mb-3">TB as an Index of Inequality</h3>
                  <p className="text-sanatorio-mint/80 leading-relaxed">
                    Today, TB functions as an "index of human misery"—disproportionately affecting those living in poverty, malnutrition, and overcrowded conditions. Over 98% of TB deaths occur in low and middle-income countries, with economic, social, and healthcare inequalities driving the epidemic.
                  </p>
                  <p className="mt-3 text-sanatorio-mint/80 leading-relaxed">
                    Drug-resistant TB strains have emerged as a particular threat, requiring longer, more toxic, and more expensive treatment regimens. The convergence of TB with HIV creates additional challenges, as each disease accelerates the progression of the other.
                  </p>
                </div>
              </div>
            </section>

            {/* Call to action */}
            <section className={`glass-panel p-6 md:p-8 transition-all-500 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} delay-300`}>
              <h2 className="text-2xl font-display text-sanatorio-neon mb-6 flex items-center">
                <HeartPulse className="mr-3" /> Take Action
              </h2>
              
              <div className="space-y-6">
                <p className="text-sanatorio-mint/80 leading-relaxed">
                  While our virtual retreat offers a space for digital wellness, we also recognize our connection to the real history of sanatoria and the ongoing struggle against tuberculosis. Here's how you can help address this continuing global health crisis:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass-panel p-5">
                    <h3 className="text-xl text-sanatorio-mint mb-3">Support TB Research & Treatment</h3>
                    <p className="text-sanatorio-mint/80 leading-relaxed">
                      Organizations like the Stop TB Partnership and TB Alliance are working to develop new treatments and improve access to care worldwide.
                    </p>
                    <Button variant="outline" className="mt-4 border-sanatorio-neon/50 text-sanatorio-neon flex items-center gap-2">
                      Learn More <ExternalLink size={16} />
                    </Button>
                  </div>
                  
                  <div className="glass-panel p-5">
                    <h3 className="text-xl text-sanatorio-mint mb-3">Advocate for Health Equity</h3>
                    <p className="text-sanatorio-mint/80 leading-relaxed">
                      Support policies that address the social determinants of health and improve access to healthcare for vulnerable populations.
                    </p>
                    <Button variant="outline" className="mt-4 border-sanatorio-neon/50 text-sanatorio-neon flex items-center gap-2">
                      Get Involved <ExternalLink size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-sanatorio-mint/60 text-sm italic">
                    "The fight against tuberculosis has always been more than just a battle against a bacterium; it is a fight for human dignity, equality, and the right to health."
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default History;
