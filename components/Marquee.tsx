import React from 'react';
import { motion } from 'motion/react';

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
  return (
    <div className="relative w-full overflow-hidden py-6 md:py-10 transition-colors duration-500">
      <div className="w-full bg-rose-gold/5 dark:bg-white/5 border-y border-rose-gold/10 py-4 md:py-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] dark:shadow-none">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ willChange: "transform" }}
        >
          {/* Duplicate items for smooth infinite scroll effect */}
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={index} className="flex items-center mx-6 md:mx-10">
              <span className="text-lg md:text-2xl font-serif italic text-warm-charcoal/60 dark:text-soft-white/60 tracking-wider">
                {item}
              </span>
              <div className="ml-12 md:ml-16 w-2 h-2 rounded-full bg-rose-gold opacity-50 shrink-0" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfiniteMarquee;
