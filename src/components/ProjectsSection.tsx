
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import BlurImage from './BlurImage';
import { ExternalLink, Github } from 'lucide-react';
import AnimatedText from './AnimatedText';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce website with a focus on user experience and performance.',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    tags: ['React', 'Tailwind CSS', 'Node.js'],
    links: {
      live: '#',
      github: '#',
    },
  },
  {
    title: 'Portfolio Website',
    description: 'Elegant portfolio website designed with minimalism and performance in mind.',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    tags: ['React', 'Framer Motion', 'Three.js'],
    links: {
      live: '#',
      github: '#',
    },
  },
  {
    title: 'Mobile Banking App',
    description: 'A user-friendly banking application focused on accessibility and security.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    tags: ['React Native', 'TypeScript', 'Firebase'],
    links: {
      live: '#',
      github: '#',
    },
  },
];

const ProjectsSection = () => {
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
  
  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 sm:py-32"
    >
      <div className="section-container">
        <div 
          className={cn(
            "max-w-2xl mx-auto text-center mb-16 transition-all duration-700 ease-out transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-sm font-medium text-accent mb-3">MY WORK</h2>
          <AnimatedText 
            text="Featured Projects" 
            className="text-3xl md:text-4xl font-bold mb-6" 
            delay={300}
          />
          <p className="text-muted-foreground">
            Explore a selection of my recent work showcasing my skills in design and development. Each project represents a unique challenge and solution.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className={cn(
                "group rounded-xl overflow-hidden border bg-card shadow-sm transition-all duration-500 ease-out transform hover:shadow-md hover:-translate-y-1",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                isVisible && `transition-delay-${index * 100}`
              )}
              style={{ 
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
              }}
            >
              <div className="aspect-video overflow-hidden">
                <BlurImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  containerClassName="w-full h-full"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <a 
                    href={project.links.live} 
                    className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                  
                  <a 
                    href={project.links.github} 
                    className="inline-flex items-center gap-1 text-sm font-medium hover:text-accent/80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    Source
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
