import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div id="inicio" className="relative overflow-hidden mb-12 min-h-[90vh] flex flex-col justify-center scroll-mt-24 md:scroll-mt-32">
      
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 w-full h-[120%]"
        style={{
            backgroundImage: 'url("https://res.cloudinary.com/dyqz0n0to/image/upload/v1765427808/WhatsApp_Image_2025-12-02_at_4.03.29_PM_2_flftmz.jpg")', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.85, 
            filter: 'contrast(1) brightness(1.05)', 
            transform: `translateY(${offset * 0.3}px)` 
        }}
      />
      
      {/* LUXURY GRADIENT OVERLAYS */}
      <div className="absolute inset-0 bg-gradient-to-b from-ivory-light/30 via-ivory-light/60 dark:via-rich-black/50 to-ivory-light dark:to-rich-black transition-colors duration-500" />
      
      {/* Subtle Golden Radial Highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,165,165,0.15),transparent_60%)]" />

      {/* Content */}
      <div className="max-w-5xl mx-auto text-center px-4 py-16 sm:py-24 relative z-10 mt-10 animate-fade-in-up">
        <span className="text-rose-gold uppercase tracking-[0.4em] text-xs font-bold mb-6 block drop-shadow-sm opacity-90">
            Exclusividad y Detalle
        </span>
        <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl text-warm-charcoal dark:text-soft-white mb-8 leading-tight drop-shadow-sm dark:drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] font-light italic transition-colors duration-500">
          Sorena Lencería
        </h1>
        <p className="font-serif text-lg sm:text-2xl text-warm-charcoal/80 dark:text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide drop-shadow-sm italic transition-colors duration-500">
          Donde la elegancia se encuentra con tu piel. Descubre una colección diseñada para resaltar tu esencia más auténtica.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a 
            href="#catalogo"
            onClick={handleScrollToCatalog}
            className="px-14 py-5 bg-rose-gold text-white border border-rose-gold/10 font-sans font-bold rounded-full hover:bg-rose-gold-dark transition-all transform hover:-translate-y-1 shadow-[0_15px_35px_rgba(212,165,165,0.3)] tracking-[0.3em] text-[10px] uppercase cursor-pointer"
          >
            Explorar Colección
          </a>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-40">
          <div className="w-[1px] h-12 bg-gradient-to-b from-rose-gold to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;