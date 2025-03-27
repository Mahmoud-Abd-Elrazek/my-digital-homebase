
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
          text: [
            'rgba(0, 180, 255, 0.8)',   // Bright blue
            'rgba(0, 220, 255, 0.7)',   // Cyan blue
            'rgba(80, 150, 255, 0.75)', // Soft blue
            'rgba(140, 120, 245, 0.8)', // Purple
            'rgba(155, 135, 245, 0.7)', // Light purple
          ],
          highlight: [
            'rgba(0, 230, 255, 1)',     // Bright cyan
            'rgba(155, 135, 245, 1)',   // Vivid purple
            'rgba(249, 115, 22, 0.9)',  // Orange accent
            'rgba(0, 255, 200, 1)',     // Teal
          ]
        };
      } else {
        return {
          background: 'rgba(255, 255, 255, 0.05)',
          text: [
            'rgba(0, 120, 220, 0.5)',   // Medium blue
            'rgba(0, 165, 233, 0.45)',  // Ocean blue
            'rgba(126, 105, 171, 0.5)', // Medium purple
            'rgba(139, 92, 246, 0.4)',  // Vivid purple
          ],
          highlight: [
            'rgba(0, 120, 240, 0.9)',   // Deep blue
            'rgba(126, 105, 171, 0.8)', // Medium purple
            'rgba(139, 92, 246, 0.85)', // Vivid purple
            'rgba(249, 115, 22, 0.7)',  // Orange accent
          ]
        };
      }
    };
    
    // Animation function
    const draw = () => {
      const colors = getColors();
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = `${fontSize}px monospace`;
      
      // Create layers of characters for depth effect
      for (let i = 0; i < drops.length; i++) {
        // Random character from the character set
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Vary the color based on position
        const colorIndex = Math.floor(Math.random() * colors.text.length);
        
        // Add highlight effect for some characters
        if (Math.random() > 0.97) {
          const highlightIndex = Math.floor(Math.random() * colors.highlight.length);
          ctx.fillStyle = colors.highlight[highlightIndex];
          // Make some characters slightly larger for emphasis
          ctx.font = `bold ${fontSize + 2}px monospace`;
        } else {
          ctx.fillStyle = colors.text[colorIndex];
          ctx.font = `${fontSize}px monospace`;
        }
        
        // Add subtle vertical movement with varying speeds
        const speed = Math.random() > 0.98 ? 2 : 1;
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Randomize reset point for more natural look
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
        
        // Move the drop down
        drops[i] += speed;
      }
      
      // Add occasional horizontal 'bursts' of characters
      if (Math.random() > 0.99) {
        const burstY = Math.random() * canvas.height;
        const burstLength = Math.floor(Math.random() * 20) + 5;
        const burstX = Math.random() * canvas.width;
        const highlightIndex = Math.floor(Math.random() * colors.highlight.length);
        
        ctx.fillStyle = colors.highlight[highlightIndex];
        for (let i = 0; i < burstLength; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, burstX + i * fontSize, burstY);
        }
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
