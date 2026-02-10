import React from 'react';

const History: React.FC = () => {
  return (
    <div id="historia" className="max-w-[1400px] mx-auto px-4 mb-24 relative z-10 scroll-mt-24 md:scroll-mt-32">
       <div className="bg-white/60 dark:bg-luxury-gray/50 backdrop-blur-md p-8 sm:p-20 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] dark:shadow-2xl border border-rose-gold/10 text-center max-w-4xl mx-auto animate-fade-in transition-colors duration-500">
          
          <div className="flex flex-col items-center">
            <h3 className="font-serif text-3xl sm:text-5xl mb-10 text-warm-charcoal dark:text-soft-white leading-tight transition-colors duration-500">
              Nuestra Historia
            </h3>
            
            <div className="text-gray-500 dark:text-gray-300 leading-relaxed space-y-8 text-base sm:text-xl font-light max-w-3xl transition-colors duration-500">
              <p>
                En Sorena Lencería seleccionamos piezas exclusivas que realzan la seguridad, sensualidad y estilo de cada mujer. Apostamos por una lencería moderna, sofisticada y cómoda, pensada para acompañarte en cada momento de tu día.
              </p>
              <p>
                Cada diseño combina delicadeza, tendencia y calidad, para que te sientas única desde el primer momento.
              </p>
              
              <div className="pt-10 flex justify-center">
                <div className="relative inline-block">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-px bg-rose-gold/40"></div>
                  <p className="font-serif text-rose-gold text-xl sm:text-2xl leading-relaxed italic px-4">
                    "Sorena es para mujeres auténticas, elegantes y seguras de sí mismas."
                  </p>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-px bg-rose-gold/40"></div>
                </div>
              </div>
            </div>
          </div>

       </div>
    </div>
  );
};

export default History;