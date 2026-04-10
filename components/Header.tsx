import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNavClick?: () => void;
}

const HEADER_OFFSET = 110;

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  onOpenCart, 
  isDarkMode,
  onToggleTheme,
  onNavClick
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    if (cartCount > 0) {
      setIsCartAnimating(true);
      const timer = setTimeout(() => setIsCartAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let timeoutId: number;
    const handleScroll = () => {
      if (timeoutId) return;
      
      timeoutId = window.setTimeout(() => {
        const sections = ['inicio', 'catalogo', 'historia', 'contacto'];
        const scrollPosition = window.scrollY + HEADER_OFFSET + 50;

        for (const id of sections) {
          const element = document.getElementById(id);
          if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
        timeoutId = 0;
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (onNavClick) onNavClick();
    setIsMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      setTimeout(() => {
        const offsetPosition = element.offsetTop - (window.innerWidth < 768 ? 80 : HEADER_OFFSET);
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }, 50);
    }
  };

  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Colección', href: '#catalogo' },
    { label: 'Historia', href: '#historia' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[6000] bg-ivory-light/80 dark:bg-rich-black/90 backdrop-blur-md border-b border-rose-gold/10 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-28">
            
            <div className="flex-shrink-0 flex items-center z-50">
              <a href="#inicio" onClick={(e) => handleScrollToSection(e, '#inicio')} className="block">
                  <img 
                      src="https://res.cloudinary.com/dyqz0n0to/image/upload/v1765400323/sorena_lenceria_logo_-removebg-preview_gsbva3.png" 
                      alt="Sorena" 
                      className="h-16 md:h-24 w-auto object-contain dark:invert-0 invert opacity-90 hover:opacity-100 transition-opacity"
                  />
              </a>
            </div>

            <nav className="hidden lg:flex space-x-10 text-[10px] font-bold tracking-[0.4em] uppercase">
              {navItems.map((item) => (
                <a 
                  key={item.label}
                  href={item.href} 
                  onClick={(e) => handleScrollToSection(e, item.href)}
                  className={`relative py-2 transition-colors ${activeSection === item.href.substring(1) ? 'text-rose-gold' : 'text-gray-500 dark:text-gray-400 hover:text-rose-gold'}`}
                >
                  {item.label}
                  {activeSection === item.href.substring(1) && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-rose-gold"></span>}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-4 z-50">
              <button onClick={onToggleTheme} className="p-2 text-gray-500 dark:text-gray-400 hover:text-rose-gold transition-all hover:scale-110">
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button 
                onClick={onOpenCart}
                className={`relative p-2 transition-all ${isCartAnimating ? 'scale-125' : 'scale-100'}`}
              >
                <ShoppingBag className={`w-5 h-5 ${isCartAnimating ? 'text-rose-gold' : 'text-gray-500 dark:text-gray-400'}`} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-rose-gold text-white text-[8px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-lg">
                    {cartCount}
                  </span>
                )}
              </button>

              <button className="lg:hidden p-2 text-warm-charcoal dark:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="h-20 md:h-28"></div>

      <div className={`fixed inset-0 z-[5900] bg-ivory-light dark:bg-rich-black transition-all duration-500 md:hidden flex flex-col justify-center items-center ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col space-y-10 w-full max-w-xs text-center">
            {navItems.map((item) => (
              <a 
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollToSection(e, item.href)}
                className="text-3xl font-serif italic text-warm-charcoal dark:text-white hover:text-rose-gold transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
      </div>
    </>
  );
};

export default Header;