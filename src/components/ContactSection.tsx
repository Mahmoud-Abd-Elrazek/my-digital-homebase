
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
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
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      toast.success("Thank you for your message! I'll get back to you soon.");
    }, 1500);
  };
  
  const contactInfo = [
    { 
      icon: <Mail className="h-5 w-5" />, 
      label: 'Email', 
      value: 'hello@example.com',
      href: 'mailto:hello@example.com' 
    },
    { 
      icon: <Phone className="h-5 w-5" />, 
      label: 'Phone', 
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567' 
    },
    { 
      icon: <MapPin className="h-5 w-5" />, 
      label: 'Location', 
      value: 'San Francisco, CA',
      href: '#' 
    },
  ];
  
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 sm:py-32 bg-secondary/50"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div 
            className={cn(
              "transition-all duration-700 ease-out transform",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <h2 className="text-sm font-medium text-accent mb-3">CONTACT</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Let's work together</h3>
            <p className="text-muted-foreground mb-10">
              Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing together.
            </p>
            
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <a 
                  key={item.label}
                  href={item.href}
                  className="flex items-start space-x-4 group"
                >
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">{item.label}</h4>
                    <p className="font-medium group-hover:text-accent transition-colors">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div 
            className={cn(
              "transition-all duration-700 ease-out delay-300 transform",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="glass-panel p-8 rounded-xl space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    required
                    className="w-full min-h-[150px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full button-effect bg-accent hover:bg-accent/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <Send className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
