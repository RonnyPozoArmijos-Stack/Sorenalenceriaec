
import React, { useEffect } from 'react';
import { X, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[]; // Adaptado de 'cart' para compatibilidad con App.tsx
  onRemove: (id: number, size: string) => void; // Adaptado de 'onRemoveItem'
  onUpdateQuantity: (id: number, size: string, delta: number) => void; // Adaptado de 'onUpdateQty'
}

const CartModal: React.FC<CartModalProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQuantity 
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const total = items.reduce((acc, item) => {
    const price = item.discountPercentage 
      ? item.price * (1 - item.discountPercentage / 100)
      : item.price;
    return acc + (price * item.qty);
  }, 0);

  const handleCheckout = () => {
    if (items.length === 0) return;
    let message = "Hola, quiero realizar mi pedido en Sorena Lencería:\n\n";
    items.forEach(item => {
      const price = item.discountPercentage 
        ? item.price * (1 - item.discountPercentage / 100)
        : item.price;
      message += `*${item.title}*\n- Talla: ${item.size}\n- Cantidad: x${item.qty}\n- Subtotal: $${(price * item.qty).toFixed(2)}\n\n`;
    });
    message += `*TOTAL A PAGAR: $${total.toFixed(2)}*`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[7000] flex justify-end">
      {/* Backdrop con desvanecimiento suave */}
      <div className="absolute inset-0 bg-rich-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      {/* Panel con deslizamiento fluido */}
      <div className="relative w-full max-w-md bg-white dark:bg-luxury-gray shadow-2xl flex flex-col h-full animate-slide-in-right border-l border-rose-gold/10">
        
        <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-rose-gold" />
            <h2 className="text-xl font-serif font-bold dark:text-white uppercase tracking-wider">Mi Bolsa</h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-rose-gold transition-all hover:rotate-90 outline-none"
            aria-label="Cerrar bolsa"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <ShoppingBag className="w-12 h-12 mb-4 text-gray-300" />
              <p className="font-serif italic text-lg dark:text-white">Tu bolsa está vacía</p>
              <button onClick={onClose} className="mt-4 text-rose-gold text-xs font-bold uppercase tracking-widest hover:underline">Continuar comprando</button>
            </div>
          ) : (
            items.map((item) => {
              const price = item.discountPercentage 
                ? item.price * (1 - item.discountPercentage / 100)
                : item.price;
              return (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 group animate-fade-in">
                  <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5">
                    <img src={item.img} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div>
                      <h3 className="font-serif italic text-lg dark:text-white">{item.title}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400">Talla {item.size}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 dark:border-white/10 rounded-full overflow-hidden">
                        <button onClick={() => onUpdateQuantity(item.id, item.size, -1)} className="px-3 py-1 hover:bg-rose-gold/10 transition-colors dark:text-white">-</button>
                        <span className="px-3 text-xs font-bold w-8 text-center dark:text-white">{item.qty}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.size, 1)} className="px-3 py-1 hover:bg-rose-gold/10 transition-colors dark:text-white">+</button>
                      </div>
                      <button onClick={() => onRemove(item.id, item.size)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right py-1">
                    <p className="font-sans font-medium dark:text-white">${(price * item.qty).toFixed(2)}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 border-t border-gray-100 dark:border-white/5 space-y-6 bg-ivory-light dark:bg-black/20">
            <div className="flex justify-between items-end">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold">Total Estimado</span>
              <span className="text-3xl font-serif text-rose-gold">${total.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCheckout}
                className="w-full bg-rose-gold text-white py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-rose-gold-dark shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                Pedir por WhatsApp
              </button>
              <button 
                onClick={onClose}
                className="w-full text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] py-2 hover:text-warm-charcoal dark:hover:text-white transition-colors"
              >
                Cerrar bolsa y seguir viendo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
