
import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import AnimatedText from './AnimatedText';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Delay visibility for a smoother entrance
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const yOffset = -80;
      const y = aboutSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/40"></div>
      </div>
      
      <div className="section-container relative z-10 flex flex-col items-center justify-center text-center">
        <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block py-1 px-3 mb-6 rounded-full bg-accent/10 border border-accent/20">
            <span className="text-sm font-medium text-accent">Welcome to my portfolio</span>
          </div>
        </div>
        
        <div className="overflow-hidden mb-4">
          <h1 
            className={`text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-balance transition-all duration-700 ease-out delay-100 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          >
            <AnimatedText 
              text="Creating Meaningful" 
              className="inline-block" 
              delay={300}
            />
            <span className="block mt-1">
              <AnimatedText 
                text="Digital Experiences" 
                className="inline-block text-gradient" 
                delay={500}
              />
            </span>
          </h1>
        </div>
        
        <p 
          className={`max-w-2xl mx-auto text-lg text-muted-foreground mb-10 transition-all duration-700 ease-out delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          I'm a passionate designer and developer focused on creating intuitive, elegant digital solutions that solve real problems.
        </p>
        
        <div 
          className={`transition-all duration-700 ease-out delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <button
            onClick={scrollToNext}
            className="button-effect mt-10 p-3 rounded-full border border-border bg-secondary hover:bg-secondary/80"
            aria-label="Scroll down"
          >
            <ArrowDown className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Background elements */}
      <div className="hidden md:block absolute top-1/4 -right-16 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="hidden md:block absolute bottom-1/4 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
