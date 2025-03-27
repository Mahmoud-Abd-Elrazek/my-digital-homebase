
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  threshold?: number;
}

const AnimatedText = ({ 
  text, 
  className, 
  once = true, 
  delay = 0,
  threshold = 0.1
}: AnimatedTextProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const options = {
      root: null,
      rootMargin: '0px',
      threshold,
    };
    
    const animate = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-text-reveal');
          }, delay);
          
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          entry.target.classList.remove('animate-text-reveal');
        }
      });
    };
    
    const observer = new IntersectionObserver(animate, options);
    observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [once, delay, threshold]);
  
  return (
    <div 
      ref={elementRef} 
      className={cn('overflow-hidden', className)}
    >
      <div className="transform translate-y-full opacity-0">
        {text}
      </div>
    </div>
  );
};

export default AnimatedText;
