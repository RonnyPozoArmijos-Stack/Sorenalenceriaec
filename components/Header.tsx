import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Home, Sparkles, Heart, FileText, MapPin } from 'lucide-react';
import { ExpandableTabs } from './ui/expandable-tabs';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavClick?: () => void;
}

const HEADER_OFFSET = 90; 

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  onOpenCart, 
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

        const sections = ['contacto', 'politicas', 'historia', 'catalogo'];
        const scrollPosition = window.scrollY + HEADER_OFFSET + 140;

        for (const id of sections) {
          const element = document.getElementById(id);
          if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset;
            if (scrollPosition >= top) {
              setActiveSection(id);
              break;
            }
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

  const scrollToSection = (targetId: string) => {
    if (onNavClick) onNavClick();
    setIsMobileMenuOpen(false);

    if (targetId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -(window.innerWidth < 768 ? 85 : HEADER_OFFSET);
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navTabs = [
    { title: 'Inicio', icon: Home },
    { title: 'Colección', icon: Sparkles },
    { title: 'Historia', icon: Heart },
    { title: 'Políticas', icon: FileText },
    { title: 'Encuéntranos', icon: MapPin },
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
    scrollToSection(targetMap[index]);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[6000] bg-rich-black/75 backdrop-blur-md border-b border-rose-gold/15 transition-colors duration-300">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            
            {/* Logo sin el EC */}
            <div className="flex-shrink-0 flex items-center z-[6100]">
              <a 
                href="#inicio" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('inicio');
                }} 
                className="group flex items-center py-1"
              >
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  src="https://res.cloudinary.com/dyqz0n0to/image/upload/v1765400323/sorena_lenceria_logo_-removebg-preview_gsbva3.png" 
                  alt="Sorena Lencería" 
                  className="h-16 sm:h-18 md:h-22 w-auto object-contain drop-shadow-[0_2px_12px_rgba(212,165,165,0.25)] opacity-95 transition-all"
                />
              </a>
            </div>

            {/* Desktop Expandable Navigation Tabs */}
            <nav className="hidden lg:flex items-center">
              <ExpandableTabs 
                tabs={navTabs} 
                selectedIndex={getSelectedIndex()} 
                onChange={handleTabChange}
                activeColor="text-rose-gold"
                className="bg-transparent border-white/10"
              />
            </nav>

            {/* Desktop Cart Action Button */}
            <div className="flex items-center space-x-2 sm:space-x-4 z-[6100]">
              <div className="hidden lg:flex">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenCart}
                  className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-soft-white hover:text-rose-gold transition-all duration-300 shadow-sm ${isCartAnimating ? 'border-rose-gold/60 bg-rose-gold/10' : ''}`}
                  aria-label="Abrir carrito"
                >
                  <div className="relative">
                    <ShoppingBag className="w-5 h-5 text-rose-gold" />
                    {cartCount > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-rose-gold text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-lg"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </div>
                  <span className="text-xs uppercase tracking-widest font-semibold font-sans">
                    Bolsa {cartCount > 0 ? `(${cartCount})` : ''}
                  </span>
                </motion.button>
              </div>

              {/* Mobile quick action: Shopping Bag button only */}
              <div className="flex lg:hidden items-center space-x-2">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onOpenCart}
                  className={`relative p-2 text-soft-white hover:text-rose-gold transition-colors ${isCartAnimating ? 'text-rose-gold scale-125' : ''}`}
                  aria-label="Abrir carrito"
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

              {/* Mobile Hamburger toggle */}
              <div className="relative group flex flex-col items-center lg:hidden">
                <button 
                  className="p-2 text-white" 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Menú principal"
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="h-[92px] md:h-[128px]"></div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[5900] bg-rich-black/95 backdrop-blur-2xl flex flex-col justify-center items-center lg:hidden"
          >
            <div className="flex flex-col items-center justify-center space-y-10 w-full max-w-sm px-6 text-center">
              <div className="space-y-2">
                <h3 className="font-serif italic text-4xl text-rose-gold font-light">Sorena Lencería</h3>
                <p className="text-xs tracking-[0.3em] font-mono text-gray-400 uppercase">Menú de Navegación</p>
              </div>

              <div className="w-full flex-col space-y-6 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-3 w-full">
                  <ExpandableTabs 
                    tabs={navTabs} 
                    selectedIndex={getSelectedIndex()} 
                    onChange={(idx) => {
                      handleTabChange(idx);
                    }}
                    activeColor="text-rose-gold"
                    className="border-white/15 shadow-2xl p-3 bg-black/60 backdrop-blur-md"
                  />
                </div>

                <div className="w-full pt-2">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenCart();
                    }}
                    className="w-full py-4 rounded-2xl bg-rose-gold text-white font-bold uppercase tracking-[0.25em] text-xs shadow-xl flex items-center justify-center gap-3 hover:bg-rose-gold-dark transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Ver Carrito {cartCount > 0 ? `(${cartCount})` : ''}</span>
                  </button>
                </div>
              </div>

              <div className="w-16 h-px bg-rose-gold/30"></div>

              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs tracking-[0.35em] uppercase text-gray-400 hover:text-rose-gold transition-colors font-bold"
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
