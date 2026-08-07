import React from 'react';
import { motion } from 'motion/react';
import { getOptimizedImageUrl } from '../lib/cloudinary';

const Hero: React.FC = () => {
  const handleScrollToCatalog = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('catalogo');
    if (element) {
        const headerOffset = 90; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  const heroImageUrl = getOptimizedImageUrl(
    'https://res.cloudinary.com/dyqz0n0to/image/upload/v1785444160/ChatGPT_Image_30_jul_2026_03_41_34_p.m._b2vpa2.png', 
    { width: 1400, quality: 'auto', format: 'auto' }
  );

  return (
    <div 
      id="inicio" 
      className="relative overflow-hidden mb-8 md:mb-12 min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-end sm:justify-center scroll-mt-24 md:scroll-mt-32 pb-8 sm:pb-0"
    >
      {/* Background Image Container with Hardware Acceleration */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-[center_top_15%] sm:bg-center transition-all duration-500"
          style={{
            backgroundImage: `url("${heroImageUrl}")`, 
            opacity: 0.95, 
            filter: 'contrast(1.02) brightness(1.02)', 
          }}
        />
      </div>
      
      {/* LUXURY GRADIENT OVERLAYS */}
      {/* Mobile: Gradient from bottom to top so the cover photo is 100% visible at top/middle. Desktop: Gradient left to right */}
      <div className="absolute inset-0 bg-gradient-to-t from-ivory-light via-ivory-light/50 to-transparent/10 md:bg-gradient-to-r md:from-ivory-light/90 md:via-ivory-light/40 md:to-transparent dark:from-rich-black dark:via-rich-black/60 dark:to-transparent/10 md:dark:from-rich-black/90 md:dark:via-rich-black/40 transition-colors duration-500 pointer-events-none" />
      
      {/* Subtle Golden Radial Highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,165,165,0.25),transparent_60%)] pointer-events-none" />

      {/* Content Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl w-full mx-auto text-left px-4 sm:px-12 md:px-16 lg:px-20 py-6 sm:py-24 relative z-10 mt-12 sm:mt-4"
      >
        <div className="max-w-2xl bg-white/40 dark:bg-black/40 md:bg-transparent md:dark:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 sm:p-8 md:p-0 rounded-2xl border border-white/30 dark:border-white/10 md:border-none shadow-sm md:shadow-none">
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="w-8 h-[2px] bg-rose-gold rounded-full inline-block"></span>
            <span className="text-rose-gold uppercase tracking-[0.35em] text-xs sm:text-sm font-extrabold drop-shadow-sm hero-tag">
              Exclusividad & Elegancia
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="font-serif text-4xl sm:text-7xl md:text-8xl mb-4 sm:mb-6 leading-[1.05] drop-shadow-sm dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] font-light italic transition-colors duration-500 hero-title"
          >
            <span className="text-warm-charcoal dark:text-soft-white font-serif">Sorena </span>
            <span className="bg-gradient-to-r from-[#E8A5B8] via-[#C0788A] to-[#D4A5A5] bg-clip-text text-transparent font-normal not-italic">
              Lencería
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="font-serif text-base sm:text-2xl text-warm-charcoal/90 dark:text-gray-100 mb-6 sm:mb-10 leading-relaxed font-light tracking-wide italic transition-colors duration-500 hero-desc drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Donde la elegancia se encuentra con tu piel. Descubre una colección diseñada para resaltar tu esencia más auténtica.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-5 justify-start items-center">
            <motion.a 
              href="#catalogo"
              onClick={handleScrollToCatalog}
              whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(212,165,165,0.45)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto text-center px-8 sm:px-12 py-3.5 sm:py-5 bg-gradient-to-r from-rose-gold via-[#C0788A] to-rose-gold text-white font-sans font-bold rounded-full transition-all shadow-[0_15px_35px_rgba(212,165,165,0.35)] tracking-[0.25em] text-xs uppercase cursor-pointer hero-btn flex items-center justify-center gap-3"
            >
              Explorar Colección
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 hidden sm:block"
      >
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-[1px] h-10 sm:h-12 bg-gradient-to-b from-rose-gold to-transparent"
          ></motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
