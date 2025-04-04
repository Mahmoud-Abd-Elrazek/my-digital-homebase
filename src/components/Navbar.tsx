
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Lock } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = true }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80; // Navbar height + some padding
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  
  const links = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'MY JOURNEY', id: 'experience' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];
  
  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || !transparent || isMobileMenuOpen
          ? 'bg-background/80 backdrop-blur-lg border-b'
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#home" className="flex items-center">
            <span className="text-xl font-display font-bold text-foreground">
              m_abrazeg
            </span>
          </a>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="nav-link text-sm font-medium"
              >
                {link.name}
              </button>
            ))}
            <Link 
              to="/login" 
              className="text-sm font-medium flex items-center gap-1 px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              <Lock size={16} />
              Admin
            </Link>
            <ThemeToggle />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden absolute top-16 left-0 right-0 bg-background/90 backdrop-blur-lg border-b',
          isMobileMenuOpen ? 'block' : 'hidden'
        )}
      >
        <div className="container mx-auto px-4 pt-2 pb-4 space-y-1">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="block w-full text-left px-4 py-3 text-sm font-medium hover:bg-secondary rounded-md"
            >
              {link.name}
            </button>
          ))}
          <Link 
            to="/login" 
            className="block w-full text-left px-4 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-md mt-2 flex items-center gap-2"
          >
            <Lock size={16} />
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
