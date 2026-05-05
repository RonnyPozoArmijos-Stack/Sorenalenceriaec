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
    <div className="relative w-full overflow-hidden bg-rose-gold/5 dark:bg-white/5 border-y border-rose-gold/10 py-6 md:py-10 transition-colors duration-500">
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
          <div key={index} className="flex items-center mx-8">
            <span className="text-xl md:text-3xl font-serif italic text-warm-charcoal/40 dark:text-soft-white/20 tracking-wider">
              {item}
            </span>
            <div className="ml-16 w-2 h-2 rounded-full bg-rose-gold opacity-30" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteMarquee;
