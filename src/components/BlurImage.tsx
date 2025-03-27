
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

const BlurImage = ({ src, alt, className, containerClassName, priority = false }: BlurImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(priority ? src : '');

  useEffect(() => {
    if (!priority) {
      // Create new image object
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setCurrentSrc(src);
        setIsLoading(false);
      };
    } else {
      setIsLoading(false);
    }
  }, [src, priority]);

  return (
    <div className={cn('overflow-hidden relative', containerClassName)}>
      <img
        src={currentSrc}
        alt={alt}
        className={cn(
          'transition-all duration-500',
          isLoading ? 'scale-[1.01] blur-md' : 'scale-100 blur-0',
          className
        )}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse" />
      )}
    </div>
  );
};

export default BlurImage;
