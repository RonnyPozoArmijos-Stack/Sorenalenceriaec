import React from 'react';
import { motion } from 'motion/react';
import { Instagram, MapPin, Heart, ArrowUpRight } from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
  </svg>
);

const Footer: React.FC = () => {
  const scrollToPolicies = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('politicas');
    if (el) {
      const yOffset = -(window.innerWidth < 768 ? 85 : 100);
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <footer id="contacto" className="bg-rich-black text-soft-white pt-24 pb-16 relative overflow-hidden scroll-mt-32 border-t border-rose-gold/15">
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-gold/30 to-transparent"></div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        
        {/* Header Minimalista */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
            <h2 className="font-serif text-4xl md:text-6xl font-light italic mb-3 tracking-tight text-white">
              Encuéntranos <span className="text-rose-gold">&</span> Conecta
            </h2>
            <p className="text-sm sm:text-base text-gray-400 font-light tracking-wider">
              Atención personalizada y asesoría en cada detalle
            </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 border-y border-white/10 py-16">
            
            {/* UBICACIÓN CENTRADA */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center space-y-6 md:border-r md:border-white/10 md:px-12"
            >
                <div className="flex items-center gap-2.5 text-rose-gold">
                    <MapPin className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-[0.35em] font-extrabold font-mono">Ubicación Física</span>
                </div>
                <div className="space-y-4">
                    <p className="font-serif text-3xl md:text-4xl text-white font-light italic leading-tight">
                        La Libertad, <br />Santa Elena
                    </p>
                    <div className="space-y-1.5">
                      <p className="text-gray-300 text-xs sm:text-sm font-medium uppercase tracking-widest leading-relaxed">
                        Visítanos en nuestra tienda multimarca: <br />
                        <span className="text-rose-gold font-bold text-sm sm:text-base tracking-widest">TIENDA MULTIMARCA JOBMAR</span>
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-4 pt-2">
                      <a 
                        href="https://maps.app.goo.gl/3v1zETta6m7bWgRT6" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] font-bold text-rose-gold hover:text-white border-b border-rose-gold/40 hover:border-white pb-1 transition-all"
                      >
                        <span>Ver mapa en Google Maps</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                      
                      {/* Horario debajo del mapa, centrado */}
                      <div className="pt-3 space-y-1">
                          <p className="text-xs text-gray-300 uppercase tracking-[0.25em] font-bold">Lunes a Domingo</p>
                          <p className="text-sm text-gray-400 uppercase tracking-[0.25em] italic font-light">09:00 — 18:00</p>
                      </div>
                    </div>
                </div>
            </motion.div>

            {/* SÍGUENOS CENTRADO */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center space-y-6 md:px-12"
            >
                <div className="flex items-center gap-2.5 text-rose-gold">
                    <span className="text-xs uppercase tracking-[0.35em] font-extrabold font-mono">Comunidad Sorena</span>
                    <Heart className="w-4 h-4" />
                </div>
                
                <div className="flex flex-col items-center gap-8 w-full h-full justify-center">
                    <p className="text-base sm:text-lg text-gray-200 font-serif italic max-w-sm">
                      Síguenos para lanzamientos exclusivos, tips de cuidado y novedades.
                    </p>

                    {/* Iconos de Redes Sociales */}
                    <div className="flex gap-8">
                      <motion.a 
                        whileHover={{ y: -5, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://www.instagram.com/sorenalenceria.ec/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-3 transition-transform duration-500"
                      >
                          <div className="w-16 h-16 rounded-full border border-white/15 bg-white/5 flex items-center justify-center group-hover:border-rose-gold group-hover:bg-rose-gold/15 transition-all shadow-lg">
                              <Instagram className="w-7 h-7 text-gray-300 group-hover:text-rose-gold" />
                          </div>
                          <span className="text-xs uppercase tracking-[0.35em] text-gray-300 font-bold group-hover:text-rose-gold transition-colors">Instagram</span>
                      </motion.a>
                      <motion.a 
                        whileHover={{ y: -5, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="https://www.tiktok.com/@sorenalenceria.ec" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-3 transition-transform duration-500"
                      >
                          <div className="w-16 h-16 rounded-full border border-white/15 bg-white/5 flex items-center justify-center group-hover:border-rose-gold group-hover:bg-rose-gold/15 transition-all shadow-lg">
                              <TikTokIcon className="w-7 h-7 text-gray-300 group-hover:text-rose-gold" />
                          </div>
                          <span className="text-xs uppercase tracking-[0.35em] text-gray-300 font-bold group-hover:text-rose-gold transition-colors">TikTok</span>
                      </motion.a>
                    </div>
                </div>
            </motion.div>

        </div>

        {/* Footer info secundaria */}
        <div className="mt-14 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs uppercase tracking-[0.35em] text-gray-400 text-center md:text-left leading-relaxed">
              &copy; {new Date().getFullYear()} Sorena Lencería &bull; Ecuador &bull; Diseño Ecuatoriano
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={scrollToPolicies}
                className="text-xs uppercase tracking-[0.35em] text-rose-gold hover:text-white font-bold transition-colors border-b border-rose-gold/40 hover:border-white pb-0.5"
              >
                Políticas de Venta
              </button>
              <div className="w-1.5 h-1.5 rounded-full bg-rose-gold/60"></div>
              <p className="text-xs uppercase tracking-[0.35em] text-gray-400 font-medium">
                Lujo y Elegancia
              </p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
