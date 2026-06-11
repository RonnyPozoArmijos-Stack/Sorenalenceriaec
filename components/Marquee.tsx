import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

const marqueeItems = [
  "Elegancia Sin Límites",
  "Diseño Ecuatoriano",
  "Calidad Premium",
  "Sorena Lencería",
  "Lujo en tu Piel",
  "Empoderamiento Femenino",
  "Confección Artesanal",
];

const InfiniteMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile screens dynamically
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Link scroll progress of container relative to viewport boundary offset
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Premium physics mapping configuration
  const springConfig = { damping: 28, stiffness: 90 };

  // 1. Inclinación (rotateX): -8 deg to +8 deg across scroll (gentler -4 to +4 on mobile)
  const rawRotateX = useTransform(scrollYProgress, [0, 1], isMobile ? [-4, 4] : [-8, 8]);
  const rotateX = useSpring(rawRotateX, springConfig);

  // 2. Oscilación Vertical (y): Organic shifting vaivén as user scrolls (reduced on mobile to prevent clipping)
  const rawY = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], isMobile ? [-8, 5, -5, 8] : [-20, 12, -12, 20]);
  const y = useSpring(rawY, springConfig);

  // 3. Opacidad de Enfoque: 0.3 at viewport bounds, peaking to 1.0 at absolute center (gentler on mobile to maintain legibility)
  const rawOpacity = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0.5, 1.0, 0.5] : [0.3, 1.0, 0.3]);
  const opacity = useSpring(rawOpacity, springConfig);

  // 4. Escala de Enfoque: 0.92 at extrema bounds to 1.0 at the center (0.96 scale minimum on mobile)
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [0.96, 1.0, 0.96] : [0.92, 1.0, 0.92]);
  const scale = useSpring(rawScale, springConfig);

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-visible py-12 md:py-16 transition-colors duration-500"
      style={{ perspective: isMobile ? 1500 : 1000 }}
    >
      <motion.div
        style={{
          rotateX,
          y,
          opacity,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="w-full bg-rose-gold/5 dark:bg-white/5 border-y border-rose-gold/10 py-6 md:py-10 shadow-[0_15px_45px_rgba(0,0,0,0.02)] dark:shadow-none"
      >
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Duplicate items for infinite scroll effect */}
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={index} className="flex items-center mx-8" style={{ transformStyle: "preserve-3d" }}>
              <span className="text-xl md:text-3xl font-serif italic text-warm-charcoal/40 dark:text-soft-white/30 tracking-wider">
                {item}
              </span>
              <div className="ml-16 w-2 h-2 rounded-full bg-rose-gold opacity-40 shrink-0" />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InfiniteMarquee;
