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

  const heroVideoUrl = 'https://res.cloudinary.com/dyqz0n0to/video/upload/v1787326000/heroscrub_neqfmt.mp4';
  const heroPosterUrl = getOptimizedImageUrl(
    'https://res.cloudinary.com/dyqz0n0to/image/upload/v1785444160/ChatGPT_Image_30_jul_2026_03_41_34_p.m._b2vpa2.png', 
    { width: 1400, quality: 'auto', format: 'auto' }
  );

  return (
    <div 
      id="inicio" 
      className="relative overflow-hidden mb-4 md:mb-8 min-h-[85vh] sm:min-h-[92vh] flex flex-col justify-center items-center sm:items-start scroll-mt-20 md:scroll-mt-24"
    >
      {/* Background Video Container with Hardware Acceleration */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-rich-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={heroPosterUrl}
          className="w-full h-full object-cover object-[82%_top] sm:object-[70%_top] md:object-[center_top] transition-all duration-700"
          style={{ filter: 'brightness(1.08) contrast(1.04)' }}
        >
          <source src={heroVideoUrl} type="video/mp4" />
          Tu navegador no soporta videos en formato MP4.
        </video>
      </div>
      
      {/* CRYSTAL CLEAR GRADIENT OVERLAYS (Ultra translucent so the video is vivid and bright) */}
      <div className="absolute inset-0 bg-rich-black/15 md:bg-gradient-to-r md:from-rich-black/65 md:via-rich-black/15 md:to-transparent pointer-events-none" />
      
      {/* Subtle Golden Radial Highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,165,165,0.1),transparent_60%)] pointer-events-none" />

      {/* Content Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl w-full mx-auto text-center sm:text-left px-5 sm:px-12 md:px-16 lg:px-20 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-16 relative z-10"
      >
        <div className="max-w-2xl mx-auto sm:mx-0 bg-transparent p-0 border-none shadow-none flex flex-col items-center sm:items-start">
          <motion.div variants={itemVariants} className="flex items-center justify-center sm:justify-start gap-3 mb-2.5 sm:mb-4">
            <span className="w-8 h-[2px] bg-rose-gold rounded-full inline-block"></span>
            <span className="text-rose-gold uppercase tracking-[0.35em] text-xs sm:text-sm font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] hero-tag">
              Exclusividad & Elegancia
            </span>
            <span className="w-8 h-[2px] bg-rose-gold rounded-full inline-block sm:hidden"></span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="font-serif text-4xl sm:text-7xl md:text-8xl mb-3 sm:mb-6 leading-[1.1] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] font-light italic hero-title"
          >
            <span className="text-soft-white font-serif">Sorena </span>
            <span className="bg-gradient-to-r from-[#E8A5B8] via-[#E6B0BE] to-[#D4A5A5] bg-clip-text text-transparent font-normal not-italic drop-shadow-sm">
              Lencería
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="font-serif text-base sm:text-2xl text-gray-100 mb-6 sm:mb-10 leading-relaxed font-light tracking-wide italic hero-desc drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] max-w-xl mx-auto sm:mx-0"
          >
            Donde la elegancia se encuentra con tu piel. Descubre una colección diseñada para resaltar tu esencia más auténtica.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-5 justify-center sm:justify-start items-center w-full sm:w-auto">
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
