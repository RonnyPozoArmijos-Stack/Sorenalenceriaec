import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onNavClick?: () => void;
}

const HEADER_OFFSET = 90; 

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
      <header className="fixed top-0 left-0 right-0 z-[6000] bg-ivory-light/95 dark:bg-rich-black/95 backdrop-blur-xl border-b border-rose-gold/10 transition-colors duration-500">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-24">
            
            <div className="flex-shrink-0 flex items-center z-[6100]">
              <a href="#inicio" onClick={(e) => handleScrollToSection(e, '#inicio')} className="group block">
                  <motion.img 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      src="https://res.cloudinary.com/dyqz0n0to/image/upload/v1765400323/sorena_lenceria_logo_-removebg-preview_gsbva3.png" 
                      alt="Sorena" 
                      className="h-16 md:h-24 w-auto object-contain dark:invert-0 invert opacity-90 transition-opacity"
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
                  {activeSection === item.href.substring(1) && (
                    <motion.span 
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-rose-gold"
                    />
                  )}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-4 z-[6100]">
              <div className="relative group flex flex-col items-center">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onToggleTheme} 
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-rose-gold transition-colors"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.button>
              </div>

              <div className="relative group flex flex-col items-center">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onOpenCart}
                  className={`relative p-2 transition-colors ${isCartAnimating ? 'text-rose-gold scale-125' : ''}`}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1 right-1 bg-rose-gold text-white text-[8px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-lg"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </motion.button>
              </div>

              <div className="relative group flex flex-col items-center lg:hidden">
                <button 
                  className="p-2 text-warm-charcoal dark:text-white" 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="h-16 md:h-24"></div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[5900] bg-ivory-light dark:bg-rich-black flex flex-col justify-center items-center md:hidden"
          >
            <div className="flex flex-col space-y-10 w-full max-w-xs text-center">
              {navItems.map((item, index) => (
                <motion.a 
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  onClick={(e) => handleScrollToSection(e, item.href)}
                  className="text-3xl font-serif italic text-warm-charcoal dark:text-white hover:text-rose-gold transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
