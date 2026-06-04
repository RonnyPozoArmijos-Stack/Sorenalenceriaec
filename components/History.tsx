import React from 'react';
import { motion } from 'motion/react';
import { Package, ShieldAlert, Clock, Tag, CreditCard, Truck } from 'lucide-react';

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

              {/* Misión y Visión Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 pb-4 text-left">
                {/* Misión Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="p-6 sm:p-8 rounded-2xl bg-ivory-light/50 dark:bg-black/35 border border-rose-gold/10 hover:border-rose-gold/30 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-6 bg-rose-gold rounded-full"></div>
                    <h4 className="font-serif text-xl sm:text-2xl text-warm-charcoal dark:text-soft-white italic font-medium">Misión</h4>
                  </div>
                  <p className="text-[13px] sm:text-[14.5px] text-gray-500 dark:text-gray-300 font-serif leading-relaxed italic">
                    "Empoderar a las mujeres a través de lencería elegante, cómoda y sofisticada, diseñada para resaltar su belleza, seguridad y feminidad en cada etapa de su vida."
                  </p>
                </motion.div>

                {/* Visión Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="p-6 sm:p-8 rounded-2xl bg-ivory-light/50 dark:bg-black/35 border border-rose-gold/10 hover:border-rose-gold/30 shadow-[0_4px_20px_rgba(0,0,0,0.01)] transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-6 bg-rose-gold rounded-full"></div>
                    <h4 className="font-serif text-xl sm:text-2xl text-warm-charcoal dark:text-soft-white italic font-medium">Visión</h4>
                  </div>
                  <p className="text-[13px] sm:text-[14.5px] text-gray-500 dark:text-gray-300 font-serif leading-relaxed italic">
                    "Convertirnos en una marca de lencería reconocida por su elegancia, calidad y estilo, inspirando a las mujeres a sentirse seguras, auténticas y poderosas mediante prendas que combinan sensualidad, comodidad y sofisticación."
                  </p>
                </motion.div>
              </div>

              {/* Políticas de Venta Section */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mt-14 p-6 sm:p-10 rounded-2xl bg-ivory-light/30 dark:bg-black/25 border border-rose-gold/10 text-left transition-all duration-500 shadow-[0_10px_35px_rgba(0,0,0,0.01)]"
              >
                <div className="flex items-center gap-3 mb-8 justify-center sm:justify-start">
                  <div className="w-1.5 h-6 bg-rose-gold rounded-full"></div>
                  <h4 className="font-serif text-2xl text-warm-charcoal dark:text-soft-white italic font-medium">Políticas de Venta</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-[13px] sm:text-[14px]">
                  <div className="flex items-start gap-3.5 bg-white/40 dark:bg-white/5 p-4 rounded-xl border border-gray-100/30 dark:border-white/5 shadow-sm transition-all duration-300 hover:border-rose-gold/25">
                    <div className="text-rose-gold p-2 bg-rose-gold/5 rounded-lg shrink-0">
                      <Package className="w-4 h-4" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-300 font-serif leading-relaxed">
                      Los productos se entregan según disponibilidad de stock.
                    </p>
                  </div>

                  <div className="flex items-start gap-3.5 bg-white/40 dark:bg-white/5 p-4 rounded-xl border border-gray-100/30 dark:border-white/5 shadow-sm transition-all duration-300 hover:border-rose-gold/25">
                    <div className="text-rose-gold p-2 bg-rose-gold/5 rounded-lg shrink-0">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-300 font-serif leading-relaxed">
                      No se realizan cambios ni devoluciones por prendas íntimas por razones de higiene.
                    </p>
                  </div>

                  <div className="flex items-start gap-3.5 bg-white/40 dark:bg-white/5 p-4 rounded-xl border border-gray-100/30 dark:border-white/5 shadow-sm transition-all duration-300 hover:border-rose-gold/25">
                    <div className="text-rose-gold p-2 bg-rose-gold/5 rounded-lg shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-300 font-serif leading-relaxed">
                      Se aceptan cambios únicamente por defectos de fábrica dentro de las 24 horas posteriores a la entrega.
                    </p>
                  </div>

                  <div className="flex items-start gap-3.5 bg-white/40 dark:bg-white/5 p-4 rounded-xl border border-gray-100/30 dark:border-white/5 shadow-sm transition-all duration-300 hover:border-rose-gold/25">
                    <div className="text-rose-gold p-2 bg-rose-gold/5 rounded-lg shrink-0">
                      <Tag className="w-4 h-4" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-300 font-serif leading-relaxed">
                      Los productos deben conservar etiquetas y estar sin uso.
                    </p>
                  </div>

                  <div className="flex items-start gap-3.5 bg-white/40 dark:bg-white/5 p-4 rounded-xl border border-gray-100/30 dark:border-white/5 shadow-sm transition-all duration-300 hover:border-rose-gold/25">
                    <div className="text-rose-gold p-2 bg-rose-gold/5 rounded-lg shrink-0">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-300 font-serif leading-relaxed">
                      Los pedidos se procesan una vez confirmado el pago.
                    </p>
                  </div>

                  <div className="flex items-start gap-3.5 bg-white/40 dark:bg-white/5 p-4 rounded-xl border border-gray-100/30 dark:border-white/5 shadow-sm transition-all duration-300 hover:border-rose-gold/25">
                    <div className="text-rose-gold p-2 bg-rose-gold/5 rounded-lg shrink-0">
                      <Truck className="w-4 h-4" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-300 font-serif leading-relaxed">
                      Los envíos tienen un tiempo estimado previamente informado al cliente.
                    </p>
                  </div>
                </div>
              </motion.div>
              
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