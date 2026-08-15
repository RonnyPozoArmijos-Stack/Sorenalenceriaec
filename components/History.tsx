import React from 'react';
import { motion } from 'motion/react';
import { Package, ShieldAlert, Clock, Tag, CreditCard, Truck, Sparkles, Heart } from 'lucide-react';

const History: React.FC = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 mb-24 relative z-10">
      {/* Sección Historia */}
      <section id="historia" className="scroll-mt-24 md:scroll-mt-32 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-luxury-gray/70 backdrop-blur-xl p-8 sm:p-16 md:p-20 rounded-3xl shadow-2xl border border-rose-gold/15 text-center max-w-5xl mx-auto"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2.5 text-rose-gold mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs uppercase tracking-[0.35em] font-extrabold font-mono">Esencia & Pasión</span>
            </div>
            
            <motion.h3 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-serif text-4xl sm:text-6xl mb-8 text-soft-white leading-tight font-light italic"
            >
              Nuestra Historia
            </motion.h3>
            
            <div className="text-gray-200 leading-relaxed space-y-6 text-lg sm:text-2xl font-light max-w-3xl">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                En <span className="text-rose-gold font-medium">Sorena Lencería</span> seleccionamos piezas exclusivas que realzan la seguridad, sensualidad y estilo de cada mujer. Apostamos por una lencería moderna, sofisticada y cómoda, pensada para acompañarte en cada momento de tu día.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-base sm:text-xl text-gray-300 font-serif italic"
              >
                Cada diseño combina delicadeza, tendencia y calidad, para que te sientas única y radiante desde el primer momento.
              </motion.p>

              {/* Misión y Visión Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 pb-4 text-left history-card-container">
                {/* Misión Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 shadow-lg transition-all duration-300 hover:border-rose-gold/30 hover:shadow-2xl history-card"
                >
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-gold/15 flex items-center justify-center text-rose-gold shrink-0">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-2xl sm:text-3xl text-soft-white italic font-medium">Misión</h4>
                  </div>
                  <p className="text-base sm:text-lg text-gray-200 font-serif leading-relaxed italic">
                    "Empoderar a las mujeres a través de lencería elegante, cómoda y sofisticada, diseñada para resaltar su belleza, seguridad y feminidad en cada etapa de su vida."
                  </p>
                </motion.div>

                {/* Visión Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 shadow-lg transition-all duration-300 hover:border-rose-gold/30 hover:shadow-2xl history-card"
                >
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-gold/15 flex items-center justify-center text-rose-gold shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-2xl sm:text-3xl text-soft-white italic font-medium">Visión</h4>
                  </div>
                  <p className="text-base sm:text-lg text-gray-200 font-serif leading-relaxed italic">
                    "Convertirnos en una marca de lencería reconocida por su elegancia, calidad y estilo, inspirando a las mujeres a sentirse seguras, auténticas y poderosas mediante prendas que combinan sensualidad, comodidad y sofisticación."
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Sección Políticas de Venta (Independiente y con scroll directo garantizado) */}
      <section id="politicas" className="scroll-mt-24 md:scroll-mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-luxury-gray/70 backdrop-blur-xl p-8 sm:p-16 md:p-20 rounded-3xl shadow-2xl border border-rose-gold/15 max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-rose-gold mb-3">
              <span className="w-8 h-[2px] bg-rose-gold inline-block rounded-full"></span>
              <span className="text-xs uppercase tracking-[0.35em] font-extrabold font-mono">Garantía & Confianza</span>
              <span className="w-8 h-[2px] bg-rose-gold inline-block rounded-full"></span>
            </div>
            <h3 className="font-serif text-4xl sm:text-6xl text-soft-white font-light italic mb-4">
              Políticas de Venta
            </h3>
            <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto font-light">
              Conoce nuestras condiciones de compra, entregas y garantías diseñadas para brindarte total seguridad.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 policies-container">
            {/* Política 1 */}
            <div className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-md transition-all duration-300 hover:border-rose-gold/30 hover:bg-white/[0.07] policy-item">
              <div className="w-12 h-12 rounded-xl bg-rose-gold/15 text-rose-gold flex items-center justify-center shrink-0 mt-0.5">
                <Package className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h5 className="font-sans font-bold text-soft-white text-base sm:text-lg">
                  Disponibilidad de Stock
                </h5>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-light">
                  Todos nuestros productos y modelos exclusivos se entregan y despachan según la disponibilidad de stock vigente al momento de la orden.
                </p>
              </div>
            </div>

            {/* Política 2 */}
            <div className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-md transition-all duration-300 hover:border-rose-gold/30 hover:bg-white/[0.07] policy-item">
              <div className="w-12 h-12 rounded-xl bg-rose-gold/15 text-rose-gold flex items-center justify-center shrink-0 mt-0.5">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h5 className="font-sans font-bold text-soft-white text-base sm:text-lg">
                  Higiene y Salud
                </h5>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-light">
                  Por estrictas razones de higiene y salud íntima, no se realizan cambios ni devoluciones de prendas íntimas una vez recibidas.
                </p>
              </div>
            </div>

            {/* Política 3 */}
            <div className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-md transition-all duration-300 hover:border-rose-gold/30 hover:bg-white/[0.07] policy-item">
              <div className="w-12 h-12 rounded-xl bg-rose-gold/15 text-rose-gold flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h5 className="font-sans font-bold text-soft-white text-base sm:text-lg">
                  Garantía por Defecto
                </h5>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-light">
                  Se aceptan cambios únicamente por defectos de fábrica comprobados, notificándolo dentro de las primeras 24 horas posteriores a la entrega.
                </p>
              </div>
            </div>

            {/* Política 4 */}
            <div className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-md transition-all duration-300 hover:border-rose-gold/30 hover:bg-white/[0.07] policy-item">
              <div className="w-12 h-12 rounded-xl bg-rose-gold/15 text-rose-gold flex items-center justify-center shrink-0 mt-0.5">
                <Tag className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h5 className="font-sans font-bold text-soft-white text-base sm:text-lg">
                  Estado de las Prendas
                </h5>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-light">
                  Para cualquier consulta o validación, los productos deben conservar sus etiquetas originales intactas y encontrarse completamente sin uso.
                </p>
              </div>
            </div>

            {/* Política 5 */}
            <div className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-md transition-all duration-300 hover:border-rose-gold/30 hover:bg-white/[0.07] policy-item">
              <div className="w-12 h-12 rounded-xl bg-rose-gold/15 text-rose-gold flex items-center justify-center shrink-0 mt-0.5">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h5 className="font-sans font-bold text-soft-white text-base sm:text-lg">
                  Procesamiento y Pagos
                </h5>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-light">
                  Los pedidos se preparan y despachan de inmediato una vez confirmado el comprobante de pago o transferencia bancaria.
                </p>
              </div>
            </div>

            {/* Política 6 */}
            <div className="flex items-start gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-md transition-all duration-300 hover:border-rose-gold/30 hover:bg-white/[0.07] policy-item">
              <div className="w-12 h-12 rounded-xl bg-rose-gold/15 text-rose-gold flex items-center justify-center shrink-0 mt-0.5">
                <Truck className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h5 className="font-sans font-bold text-soft-white text-base sm:text-lg">
                  Envíos a Todo Ecuador
                </h5>
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed font-light">
                  Los envíos se realizan vía Servientrega o Tramaco con un tiempo estimado de 24 a 48 horas laborables, con seguimiento directo.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-white/10 text-center">
            <p className="font-serif text-rose-gold text-2xl sm:text-3xl leading-relaxed italic px-4">
              "Sorena es para mujeres auténticas, elegantes y seguras de sí mismas."
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default History;
