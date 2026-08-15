import React from 'react';
import { Home, Sparkles, FileText, ShoppingBag, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

interface MobileBottomNavProps {
  cartCount: number;
  onOpenCart: () => void;
}

const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartCount,
  onOpenCart
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToPolicies = () => {
    const el = document.getElementById('politicas');
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const msg = "Hola, quisiera consultar sobre los productos disponibles en Sorena Lencería. 🌸";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-[5000] md:hidden bg-rich-black/95 backdrop-blur-xl border-t border-rose-gold/15 px-2 py-2.5 shadow-[0_-8px_25px_rgba(0,0,0,0.5)] flex items-center justify-around">
      <button
        onClick={scrollToTop}
        className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-rose-gold transition-colors py-1 px-1.5"
      >
        <Home className="w-5 h-5" />
        <span className="text-[9px] font-bold uppercase tracking-wider">Inicio</span>
      </button>

      <button
        onClick={scrollToCatalog}
        className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-rose-gold transition-colors py-1 px-1.5"
      >
        <Sparkles className="w-5 h-5 text-rose-gold" />
        <span className="text-[9px] font-bold uppercase tracking-wider">Catálogo</span>
      </button>

      <button
        onClick={scrollToPolicies}
        className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-rose-gold transition-colors py-1 px-1.5"
      >
        <FileText className="w-5 h-5 text-rose-gold" />
        <span className="text-[9px] font-bold uppercase tracking-wider">Políticas</span>
      </button>

      <button
        onClick={onOpenCart}
        className="relative flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-rose-gold transition-colors py-1 px-1.5"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-rose-gold" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-rose-gold text-white text-[8px] font-extrabold w-4 h-4 flex items-center justify-center rounded-full border border-black animate-pulse">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider">Bolsa</span>
      </button>

      <button
        onClick={openWhatsApp}
        className="flex flex-col items-center justify-center gap-1 text-[#25D366] hover:opacity-80 transition-opacity py-1 px-1.5"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-[9px] font-bold uppercase tracking-wider">WhatsApp</span>
      </button>
    </nav>
  );
};

export default MobileBottomNav;
