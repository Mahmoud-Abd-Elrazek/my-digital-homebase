
import { ArrowDown, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import AnimatedText from './AnimatedText';
import ProgrammingWallpaper from './ProgrammingWallpaper';
import { Button } from './ui/button';

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

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = 'https://github.com/Mahmoud-Abd-Elrazek/My-CV/raw/refs/heads/main/cv-main.docx';
    link.download = 'Mahmoud_Abderazek_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <ProgrammingWallpaper />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background/20"></div>
      </div>
      
      <div className="section-container relative z-10 flex flex-col items-center justify-center text-center">
        <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block py-1 px-3 mb-6 rounded-full bg-accent/10 border border-accent/20">
            <span className="text-sm font-medium text-accent">Welcome to my portfolio</span>
          </div>
        </div>
        
        <p 
          className={`max-w-2xl mx-auto text-lg text-foreground mb-12 transition-all duration-700 ease-out delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          I'm a passionate designer and developer focused on creating intuitive, elegant digital solutions that solve real problems.
        </p>
        
        <div 
          className={`transition-all duration-700 ease-out delay-400 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <Button 
            variant="default" 
            className="button-effect bg-accent hover:bg-accent/90 px-6"
            onClick={handleDownloadCV}
          >
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </Button>
        </div>
        
        <div 
          className={`transition-all duration-700 ease-out delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <button
            onClick={scrollToNext}
            className="button-effect mt-16 p-3 rounded-full border border-border/30 bg-secondary/30 hover:bg-secondary/50"
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
