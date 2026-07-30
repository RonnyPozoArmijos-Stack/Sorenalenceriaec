import React from 'react';
import { motion } from 'motion/react';
import { Package, ShieldAlert, Clock, Tag, CreditCard, Truck } from 'lucide-react';

const Policies: React.FC = () => {
  const policyItems = [
    {
      icon: Package,
      text: "Los productos se entregan según disponibilidad de stock."
    },
    {
      icon: ShieldAlert,
      text: "No se realizan cambios ni devoluciones por prendas íntimas por razones de higiene."
    },
    {
      icon: Clock,
      text: "Se aceptan cambios únicamente por defectos de fábrica dentro de las 24 horas posteriores a la entrega."
    },
    {
      icon: Tag,
      text: "Los productos deben conservar etiquetas y estar sin uso."
    },
    {
      icon: CreditCard,
      text: "Los pedidos se procesan una vez confirmado el pago."
    },
    {
      icon: Truck,
      text: "Los envíos tienen un tiempo estimado previamente informado al cliente."
    }
  ];

  return (
    <section id="politicas" className="max-w-[1400px] mx-auto px-4 mb-24 relative z-10 scroll-mt-24 md:scroll-mt-32">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-white/60 dark:bg-luxury-gray/50 backdrop-blur-md p-8 sm:p-14 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] dark:shadow-2xl border border-rose-gold/10 max-w-4xl mx-auto transition-colors duration-500"
      >
        <div className="text-center mb-10">
          <motion.h3 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif text-3xl sm:text-5xl text-warm-charcoal dark:text-soft-white italic font-light mb-4"
          >
            Políticas de Venta
          </motion.h3>
          <div className="w-12 h-px bg-rose-gold/30 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-[13px] sm:text-[14px]">
          {policyItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.6 }}
                className="flex items-start gap-3.5 bg-white/40 dark:bg-white/5 p-4 sm:p-5 rounded-2xl border border-gray-100/30 dark:border-white/5 shadow-sm transition-all duration-300 hover:border-rose-gold/30 hover:shadow-md"
              >
                <div className="text-rose-gold p-2.5 bg-rose-gold/10 rounded-xl shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-serif leading-relaxed pt-0.5">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Policies;
