
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Briefcase, Calendar, School, ArrowRight } from 'lucide-react';
import { Separator } from './ui/separator';
import AnimatedText from './AnimatedText';

interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  isEducation?: boolean;
  isVisible: boolean;
  delay: number;
}

const TimelineItem = ({ title, company, period, description, isEducation = false, isVisible, delay }: TimelineItemProps) => {
  return (
    <div 
      className={cn(
        "relative pl-10 pb-10 transition-all duration-700 ease-out transform",
        isVisible ? `opacity-100 translate-y-0` : "opacity-0 translate-y-10",
        `delay-[${delay}ms]`
      )}
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border"></div>
      
      {/* Timeline dot */}
      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
        {isEducation ? (
          <School className="h-2 w-2 text-accent-foreground" />
        ) : (
          <Briefcase className="h-2 w-2 text-accent-foreground" />
        )}
      </div>
      
      <div className="mb-2 flex items-center text-sm text-muted-foreground">
        <Calendar className="mr-2 h-3 w-3" />
        <span>{period}</span>
      </div>
      
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-accent font-medium mb-3">{company}</p>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const ExperienceSection = () => {
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
  
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "TechInnovate Solutions",
      period: "Jan 2023 - Present",
      description: "Leading development of enterprise-level applications with React and Node.js. Implementing microservices architecture and improving system performance.",
      delay: 300
    },
    {
      title: "Frontend Developer",
      company: "Digital Creations Agency",
      period: "Jun 2021 - Dec 2022",
      description: "Developed responsive web applications using React, TypeScript and modern CSS frameworks. Collaborated with UX/UI designers to implement pixel-perfect interfaces.",
      delay: 500
    },
    {
      title: "Web Development Intern",
      company: "StartUp Incubator",
      period: "Jan 2021 - May 2021",
      description: "Assisted in developing web applications using JavaScript and CSS. Participated in code reviews and agile development processes.",
      delay: 700
    }
  ];
  
  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20 sm:py-32"
    >
      <div className="section-container">
        <div className="max-w-3xl mx-auto">
          <div 
            className={cn(
              "mb-12 transition-all duration-700 ease-out transform",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <h2 className="text-sm font-medium text-accent mb-3">MY JOURNEY</h2>
            <div className="flex items-center gap-3">
              <AnimatedText 
                text="Professional Experience" 
                className="inline-block text-3xl md:text-4xl font-bold" 
                delay={100}
              />
              <Separator className="flex-grow" />
            </div>
            <p className="text-muted-foreground mt-4">
              A timeline of my professional journey and key milestones since 2021.
            </p>
          </div>
          
          <div className="relative">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={index}
                title={exp.title}
                company={exp.company}
                period={exp.period}
                description={exp.description}
                isVisible={isVisible}
                delay={exp.delay}
              />
            ))}
            
            <div 
              className={cn(
                "relative pl-10 transition-all duration-700 ease-out transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                "delay-[900ms]"
              )}
            >
              <div className="flex items-center gap-2 text-accent font-medium">
                <span>See more</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
