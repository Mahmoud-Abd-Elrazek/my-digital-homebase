
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import BlurImage from './BlurImage';
import { Code, Globe, UserRound } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const skills = [
    { name: 'UI/UX Design', icon: <UserRound className="h-6 w-6" /> },
    { name: 'Web Development', icon: <Code className="h-6 w-6" /> },
    { name: 'Brand Strategy', icon: <Globe className="h-6 w-6" /> },
  ];
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 sm:py-32 bg-secondary/50 "
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div 
            className={cn(
              "relative transition-all duration-1000 ease-out transform",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}
          >
            <div className="relative z-10 aspect-square rounded-2xl overflow-hidden">
              <BlurImage
                src="https://scontent.fcai20-1.fna.fbcdn.net/v/t39.30808-6/477087917_552077724531641_8310418652078223006_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=9qa2jT2nEqIQ7kNvgEKXGUA&_nc_oc=Admh-Fl8cVXa_cQlKCrRlB__kt0v8hfWPQIgT8BONC5XNP9l8lUdkDYRT1Ec2XBtsBY&_nc_zt=23&_nc_ht=scontent.fcai20-1.fna&_nc_gid=lKMxklqDgltB6kvuTeQ-8g&oh=00_AYEe4y8qDYXpzcKx2nSRsTnYBFVkYO4lXspZLKbM7zCJBg&oe=67EACB98"
                alt="Portrait"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>
            <div className="absolute top-8 -left-8 w-full h-full border-2 border-accent rounded-2xl -z-10"></div>
            <div className="absolute -bottom-8 -right-8 w-full h-full bg-accent/5 rounded-2xl -z-20"></div>
          </div>
          
          <div>
            <div 
              className={cn(
                "transition-all duration-700 ease-out delay-300 transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              <h2 className="text-sm font-medium text-accent mb-3">ABOUT ME</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Passionate creator with an eye for detail</h3>
              <p className="text-muted-foreground mb-8">
                I'm a multidisciplinary designer and developer with over 5 years of experience creating beautiful, functional digital products. My approach combines aesthetic sensibility with technical expertise to build solutions that not only look good but perform excellently.
              </p>
            </div>
            
            <div 
              className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ease-out delay-500 transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              )}
            >
              {skills.map((skill, index) => (
                <div 
                  key={skill.name}
                  className="glass-panel p-6 rounded-xl flex flex-col items-center text-center bg-[#6f6f6f45]"
                >
                  <div className="p-3 bg-accent/10 rounded-lg mb-4 text-accent">
                    {skill.icon}
                  </div>
                  <h4 className="font-medium mb-2">{skill.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Expert level knowledge and years of hands-on experience.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
