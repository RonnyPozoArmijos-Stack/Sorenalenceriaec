import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "100px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <div 
      id="inicio" 
      ref={containerRef}
      className="relative overflow-hidden mb-12 min-h-[90vh] flex flex-col justify-center scroll-mt-24 md:scroll-mt-32"
    >

      
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-x-0 -top-20 h-[120%]"
      >
        <div 
          className="w-full h-full"
          style={{
              backgroundImage: 'url("https://res.cloudinary.com/dyqz0n0to/image/upload/v1785444160/ChatGPT_Image_30_jul_2026_03_41_34_p.m._b2vpa2.png")', 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.85, 
              filter: 'contrast(1) brightness(1.05)', 
          }}
        />
      </motion.div>
      
      {/* LUXURY GRADIENT OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-r from-ivory-light/90 via-ivory-light/60 md:via-ivory-light/30 to-transparent dark:from-rich-black/90 dark:via-rich-black/60 dark:to-transparent transition-colors duration-500" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ivory-light dark:to-rich-black" />
      
      {/* Subtle Golden Radial Highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,165,165,0.25),transparent_60%)]" />

      {/* Content */}
      <motion.div 
        style={{ y: contentY, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl w-full mx-auto text-left px-6 sm:px-12 md:px-16 lg:px-20 py-12 sm:py-24 relative z-10 mt-4"
      >
        <div className="max-w-2xl">
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-rose-gold rounded-full inline-block"></span>
            <span className="text-rose-gold uppercase tracking-[0.35em] text-xs sm:text-sm font-extrabold drop-shadow-sm hero-tag">
              Exclusividad & Elegancia
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="font-serif text-5xl sm:text-7xl md:text-8xl mb-6 leading-[1.05] drop-shadow-sm dark:drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] font-light italic transition-colors duration-500 hero-title"
          >
            <span className="text-warm-charcoal dark:text-soft-white font-serif">Sorena </span>
            <span className="bg-gradient-to-r from-[#E8A5B8] via-[#C0788A] to-[#D4A5A5] bg-clip-text text-transparent font-normal not-italic">
              Lencería
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="font-serif text-lg sm:text-2xl text-warm-charcoal/90 dark:text-gray-100 mb-10 leading-relaxed font-light tracking-wide italic transition-colors duration-500 hero-desc drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            Donde la elegancia se encuentra con tu piel. Descubre una colección diseñada para resaltar tu esencia más auténtica.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-wrap gap-5 justify-start items-center">
            <motion.a 
              href="#catalogo"
              onClick={handleScrollToCatalog}
              whileHover={{ scale: 1.04, boxShadow: "0 20px 40px rgba(212,165,165,0.45)" }}
              whileTap={{ scale: 0.98 }}
              className="px-10 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-rose-gold via-[#C0788A] to-rose-gold text-white font-sans font-bold rounded-full transition-all shadow-[0_15px_35px_rgba(212,165,165,0.35)] tracking-[0.25em] text-xs uppercase cursor-pointer hero-btn flex items-center gap-3"
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
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-[1px] h-12 bg-gradient-to-b from-rose-gold to-transparent"
          ></motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
