import React from 'react';
import { motion } from 'motion/react';

const History: React.FC = () => {
  return (
    <div id="historia" className="max-w-[1400px] mx-auto px-4 mb-24 relative z-10 scroll-mt-24 md:scroll-mt-32">
       <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-white/60 dark:bg-luxury-gray/50 backdrop-blur-md p-8 sm:p-20 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] dark:shadow-2xl border border-rose-gold/10 text-center max-w-4xl mx-auto transition-colors duration-500"
       >
          
          <div className="flex flex-col items-center">
            <motion.h3 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-serif text-3xl sm:text-5xl mb-10 text-warm-charcoal dark:text-soft-white leading-tight transition-colors duration-500"
            >
              Nuestra Historia
            </motion.h3>
            
            <div className="text-gray-500 dark:text-gray-300 leading-relaxed space-y-8 text-base sm:text-xl font-light max-w-3xl transition-colors duration-500">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                En Sorena Lencería seleccionamos piezas exclusivas que realzan la seguridad, sensualidad y estilo de cada mujer. Apostamos por una lencería moderna, sofisticada y cómoda, pensada para acompañarte en cada momento de tu día.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Cada diseño combina delicadeza, tendencia y calidad, para que te sientas única desde el primer momento.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.8 }}
                className="pt-10 flex justify-center"
              >
                <div className="relative inline-block">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-px bg-rose-gold/40"></div>
                  <p className="font-serif text-rose-gold text-xl sm:text-2xl leading-relaxed italic px-4">
                    "Sorena es para mujeres auténticas, elegantes y seguras de sí mismas."
                  </p>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-px bg-rose-gold/40"></div>
                </div>
              </motion.div>
            </div>
          </div>

       </motion.div>
    </div>
  );
};

export default History;