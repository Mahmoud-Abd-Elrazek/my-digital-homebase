
import { useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

const ProgrammingWallpaper = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix effect configuration
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    
    // Characters to display (coding-related)
    const chars = '{}[]()<>+-*/=;:,.ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&^!abcdefghijklmnopqrstuvwxyz';
    
    // Different color configurations based on theme
    const getColors = () => {
      if (theme === 'dark') {
        return {
          background: 'rgba(0, 0, 0, 0.05)',
          text: 'rgba(0, 150, 255, 0.8)',
          highlight: 'rgba(0, 200, 255, 1)'
        };
      } else {
        return {
          background: 'rgba(255, 255, 255, 0.05)',
          text: 'rgba(0, 100, 200, 0.5)',
          highlight: 'rgba(0, 120, 240, 0.8)'
        };
      }
    };
    
    // Animation function
    const draw = () => {
      const colors = getColors();
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Random character from the character set
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Vary the opacity based on the position
        const opacity = drops[i] / (canvas.height / fontSize) * 0.8;
        
        // Highlight some characters more than others
        if (Math.random() > 0.98) {
          ctx.fillStyle = colors.highlight;
        } else {
          ctx.fillStyle = colors.text;
        }
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Move the drop down
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full -z-10"
      aria-hidden="true"
    />
  );
};

export default ProgrammingWallpaper;
