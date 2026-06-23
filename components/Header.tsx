import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Sun, Moon, Home, Sparkles, Heart, FileText, MapPin } from 'lucide-react';
import { ExpandableTabs } from './ui/expandable-tabs';

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
        if (window.scrollY < 150) {
          setActiveSection('inicio');
          timeoutId = 0;
          return;
        }

        const sections = ['catalogo', 'historia', 'politicas', 'contacto'];
        const scrollPosition = window.scrollY + HEADER_OFFSET + 120;

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
        const offsetPosition = targetId === 'inicio' ? 0 : element.offsetTop - (window.innerWidth < 768 ? 80 : HEADER_OFFSET);
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }, 50);
    }
  };

  const navTabs = [
    { title: 'Inicio', icon: Home },
    { title: 'Colección', icon: Sparkles },
    { title: 'Historia', icon: Heart },
    { title: 'Políticas', icon: FileText },
    { title: 'Encuéntranos', icon: MapPin },
  ];

  const controlTabs = [
    { title: isDarkMode ? 'Modo Claro' : 'Modo Oscuro', icon: isDarkMode ? Sun : Moon },
    { title: `Carrito${cartCount > 0 ? ` (${cartCount})` : ''}`, icon: ShoppingBag }
  ];

  const getSelectedIndex = () => {
    switch (activeSection) {
      case 'inicio': return 0;
      case 'catalogo': return 1;
      case 'historia': return 2;
      case 'politicas': return 3;
      case 'contacto': return 4;
      default: return null;
    }
  };

  const handleTabChange = (index: number | null) => {
    if (index === null) return;
    const targetMap = ['inicio', 'catalogo', 'historia', 'politicas', 'contacto'];
    const targetId = targetMap[index];
    if (targetId === 'inicio') {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      setTimeout(() => {
        const offsetPosition = element.offsetTop - (window.innerWidth < 768 ? 80 : HEADER_OFFSET);
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }, 50);
    }
  };

  const handleControlTabChange = (index: number | null) => {
    if (index === null) return;
    if (index === 0) {
      onToggleTheme();
    } else if (index === 1) {
      onOpenCart();
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[6000] bg-ivory-light/95 dark:bg-rich-black/95 backdrop-blur-xl border-b border-rose-gold/10 transition-colors duration-500">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-24">
            
            <div className="flex-shrink-0 flex items-center z-[6100]">
              <a href="#inicio" onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} className="group flex items-center">
                  <motion.img 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      src="https://res.cloudinary.com/dyqz0n0to/image/upload/v1765400323/sorena_lenceria_logo_-removebg-preview_gsbva3.png" 
                      alt="Sorena" 
                      className="h-16 md:h-24 w-auto object-contain dark:invert-0 invert opacity-90 transition-opacity"
                  />
                  <motion.span 
                    animate={{ opacity: [0.5, 1, 0.5], y: [-1, 1, -1] }} 
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    className="text-lg md:text-xl relative -left-1 select-none pointer-events-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                  >
                    🇪🇨
                  </motion.span>
              </a>
            </div>

            {/* Desktop Expandable Navigation Tabs */}
            <nav className="hidden lg:flex items-center">
              <ExpandableTabs 
                tabs={navTabs} 
                selectedIndex={getSelectedIndex()} 
                onChange={handleTabChange}
                activeColor="text-rose-gold"
                className="bg-transparent border-rose-gold/10 dark:border-white/10"
              />
            </nav>

            {/* Desktop Control Tabs (Theme & Cart) / Mobile default actions */}
            <div className="flex items-center space-x-2 sm:space-x-4 z-[6100]">
              <div className="hidden lg:flex">
                <ExpandableTabs 
                  tabs={controlTabs} 
                  selectedIndex={null} 
                  onChange={handleControlTabChange}
                  activeColor="text-rose-gold"
                  className="bg-transparent border-rose-gold/10 dark:border-white/10"
                />
              </div>

              {/* Mobile quick actions (always accessible) */}
              <div className="flex lg:hidden items-center space-x-2">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onToggleTheme} 
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-rose-gold transition-colors"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.button>

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
      <div className="h-[92px] md:h-[128px]"></div>

      {/* Mobile Drawer Menu featuring full-fledged ExpandableTabs */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[5900] bg-ivory-light/95 dark:bg-rich-black/95 flex flex-col justify-center items-center lg:hidden"
          >
            <div className="flex flex-col items-center justify-center space-y-10 w-full max-w-sm px-6 text-center">
              <div className="space-y-2">
                <h3 className="font-serif italic text-3xl text-rose-gold font-light">Sorena Lencería</h3>
                <p className="text-[10px] tracking-[0.3em] font-mono text-gray-400 dark:text-gray-500 uppercase">Menú Interactivo</p>
              </div>

              <div className="w-full flex-col space-y-6 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-2 w-full">
                  <p className="text-[10.5px] uppercase tracking-wider text-rose-gold font-bold font-mono">Navegación</p>
                  <ExpandableTabs 
                    tabs={navTabs} 
                    selectedIndex={getSelectedIndex()} 
                    onChange={(idx) => {
                      handleTabChange(idx);
                      setIsMobileMenuOpen(false);
                    }}
                    activeColor="text-rose-gold"
                    className="border-rose-gold/25 dark:border-white/10 shadow-xl p-2.5 bg-white/40 dark:bg-black/40 backdrop-blur-md"
                  />
                </div>

                <div className="flex flex-col items-center space-y-2 w-full">
                  <p className="text-[10.5px] uppercase tracking-wider text-rose-gold font-bold font-mono">Controles</p>
                  <ExpandableTabs 
                    tabs={controlTabs} 
                    selectedIndex={null} 
                    onChange={(idx) => {
                      handleControlTabChange(idx);
                      if (idx === 1) {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    activeColor="text-rose-gold"
                    className="border-rose-gold/25 dark:border-white/10 shadow-xl p-2.5 bg-white/40 dark:bg-black/40 backdrop-blur-md"
                  />
                </div>
              </div>

              <div className="w-16 h-px bg-rose-gold/20"></div>

              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[10px] tracking-[0.4em] uppercase text-gray-400 hover:text-rose-gold transition-colors font-bold"
              >
                Cerrar Menú
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
