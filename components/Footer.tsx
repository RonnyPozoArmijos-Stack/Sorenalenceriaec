
import React from 'react';
import { Instagram, MapPin, Heart } from 'lucide-react';

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
  return (
    <footer id="contacto" className="bg-white dark:bg-rich-black text-luxury-gray dark:text-soft-white pt-24 pb-12 relative overflow-hidden scroll-mt-32 transition-colors duration-500">
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-gold/20 to-transparent"></div>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        
        {/* Header Minimalista */}
        <div className="text-center mb-20 animate-fade-in">
            <h2 className="font-serif text-4xl md:text-5xl font-light italic mb-2 tracking-tight text-rich-black dark:text-white">
              Encuéntranos <span className="text-rose-gold">&</span> Conecta
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-0 border-y border-gray-100 dark:border-white/5 py-20">
            
            {/* UBICACIÓN CENTRADA */}
            <div className="flex flex-col items-center text-center space-y-8 md:border-r md:border-gray-100 dark:md:border-white/5 md:px-12">
                <div className="flex items-center gap-3 text-rose-gold">
                    <MapPin className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Ubicación</span>
                </div>
                <div className="space-y-6">
                    <p className="font-serif text-2xl md:text-3xl text-rich-black dark:text-white font-light italic leading-tight">
                        La Libertad, <br />Santa Elena
                    </p>
                    <div className="space-y-2">
                      <p className="text-gray-500 dark:text-gray-400 text-[11px] font-light uppercase tracking-widest leading-relaxed">
                        Visítanos en nuestra <br />
                        <span className="text-rich-black dark:text-white font-bold tracking-widest">TIENDA MULTIMARCA JOBMAR</span>
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-center gap-4">
                      <a 
                        href="https://maps.app.goo.gl/3v1zETta6m7bWgRT6" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block text-[10px] uppercase tracking-[0.5em] text-rose-gold hover:text-rich-black dark:hover:text-white border-b border-rose-gold/20 hover:border-rich-black dark:hover:border-white transition-all w-fit"
                      >
                        Ver mapa completo
                      </a>
                      
                      {/* Horario debajo del mapa, centrado */}
                      <div className="pt-4 space-y-1.5 opacity-80">
                          <p className="text-[10px] text-gray-500 dark:text-gray-500 uppercase tracking-[0.3em] font-bold">Lunes a Domingo</p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-400 uppercase tracking-[0.3em] italic font-light">09:00 — 18:00</p>
                      </div>
                    </div>
                </div>
            </div>

            {/* SÍGUENOS CENTRADO */}
            <div className="flex flex-col items-center text-center space-y-8 md:px-12">
                <div className="flex items-center gap-3 text-rose-gold">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Síguenos</span>
                    <Heart className="w-3.5 h-3.5" />
                </div>
                
                <div className="flex flex-col items-center gap-10 w-full h-full justify-center">
                    {/* Iconos de Redes Sociales */}
                    <div className="flex gap-10">
                      <a 
                        href="https://www.instagram.com/sorenalenceria.ec/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-4 transition-transform duration-500 hover:-translate-y-1"
                      >
                          <div className="w-14 h-14 rounded-full border border-gray-100 dark:border-white/10 flex items-center justify-center group-hover:border-rose-gold group-hover:bg-rose-gold/5 transition-all">
                              <Instagram className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-rose-gold" />
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 dark:text-gray-600 font-bold group-hover:text-rose-gold transition-colors">Instagram</span>
                      </a>
                      <a 
                        href="https://www.tiktok.com/@sorenalenceria.ec" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-4 transition-transform duration-500 hover:-translate-y-1"
                      >
                          <div className="w-14 h-14 rounded-full border border-gray-100 dark:border-white/10 flex items-center justify-center group-hover:border-rose-gold group-hover:bg-rose-gold/5 transition-all">
                              <TikTokIcon className="w-6 h-6 text-gray-400 dark:text-gray-500 group-hover:text-rose-gold" />
                          </div>
                          <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 dark:text-gray-600 font-bold group-hover:text-rose-gold transition-colors">TikTok</span>
                      </a>
                    </div>
                </div>
            </div>

        </div>

        {/* Footer info secundaria */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
            <p className="text-[9px] uppercase tracking-[0.5em] text-gray-400 dark:text-gray-500">
              &copy; {new Date().getFullYear()} Sorena Lencería &bull; Ecuador
            </p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-gold/40"></div>
              <p className="text-[9px] uppercase tracking-[0.5em] text-gray-400 dark:text-gray-500">
                Lujo y Elegancia
              </p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
