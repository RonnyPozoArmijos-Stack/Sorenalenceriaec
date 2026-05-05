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
        const headerOffset = 110; 
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
              backgroundImage: 'url("https://res.cloudinary.com/dyqz0n0to/image/upload/v1765427808/WhatsApp_Image_2025-12-02_at_4.03.29_PM_2_flftmz.jpg")', 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.85, 
              filter: 'contrast(1) brightness(1.05)', 
          }}
        />
      </motion.div>
      
      {/* LUXURY GRADIENT OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory-light/30 via-ivory-light/60 dark:via-rich-black/50 to-ivory-light dark:to-rich-black transition-colors duration-500" />
      
      {/* Subtle Golden Radial Highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,165,165,0.15),transparent_60%)]" />

      {/* Content */}
      <motion.div 
        style={{ y: contentY, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto text-center px-4 py-16 sm:py-24 relative z-10 mt-10"
      >
        <motion.span 
          variants={itemVariants}
          className="text-rose-gold uppercase tracking-[0.4em] text-xs font-bold mb-6 block drop-shadow-sm opacity-90"
        >
            Exclusividad y Detalle
        </motion.span>
        
        <motion.h1 
          variants={itemVariants}
          className="font-serif text-6xl sm:text-7xl md:text-8xl text-warm-charcoal dark:text-soft-white mb-8 leading-tight drop-shadow-sm dark:drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] font-light italic transition-colors duration-500"
        >
          Sorena Lencería
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="font-serif text-lg sm:text-2xl text-warm-charcoal/80 dark:text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-sm italic transition-colors duration-500"
        >
          Donde la elegancia se encuentra con tu piel. Descubre una colección diseñada para resaltar tu esencia más auténtica.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <motion.a 
            href="#catalogo"
            onClick={handleScrollToCatalog}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(212,165,165,0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="px-14 py-5 bg-rose-gold text-white border border-rose-gold/10 font-sans font-bold rounded-full transition-all shadow-[0_15px_35px_rgba(212,165,165,0.3)] tracking-[0.3em] text-[10px] uppercase cursor-pointer"
          >
            Explorar Colección
          </motion.a>
        </motion.div>
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
