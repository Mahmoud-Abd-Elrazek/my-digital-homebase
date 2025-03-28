
// import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: 'https://www.facebook.com/profile.php?id=100091882538202', label: 'Facebook' },
    { icon: <Twitter className="h-5 w-5" />, href: 'https://x.com/MahmoudAbderaz4', label: 'Twitter' },
    { icon: <Github className="h-5 w-5" />, href: 'https://github.com/Mahmoud-Abd-Elrazek', label: 'GitHub' },
    { icon: <Linkedin className="h-5 w-5" />, href: 'https://www.linkedin.com/in/mahmoud-abderazek-b0786a253/', label: 'LinkedIn' },
    { icon: <Instagram className="h-5 w-5" />, href: 'https://www.instagram.com/mahmoud.abdelrazek.5477/', label: 'Instagram' },
    { icon: <Youtube className="h-5 w-5" />, href: 'https://www.youtube.com/@m_abrazeg', label: 'YouTube' },
  ];
  
  return (
    <footer className="bg-muted/30 border-t py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-xl font-display font-bold">
              m_abrazeg
            </a>
            <p className="mt-2 text-sm text-muted-foreground">
              Designed and built with attention to detail
            </p>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
