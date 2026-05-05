
import React, { useEffect } from 'react';
import { X, Trash2, MessageCircle, ShoppingBag, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number, size: string) => void;
  onUpdateQuantity: (id: number, size: string, delta: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQuantity 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[7000] flex justify-end overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-warm-charcoal/20 backdrop-blur-sm"
          />

          {/* Side Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
            className="relative w-full max-w-md bg-ivory-light dark:bg-luxury-gray shadow-[0_0_50px_rgba(0,0,0,0.2)] flex flex-col h-full border-l border-rose-gold/10"
          >
            
            <div className="flex items-center justify-between px-8 py-8 border-b border-rose-gold/5">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ShoppingBag className="w-6 h-6 text-rose-gold" />
                  {items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-gold text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                      {items.length}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-serif italic dark:text-white tracking-tight">Mi Bolsa</h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 text-gray-400 hover:text-rose-gold transition-all hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 custom-scrollbar">
              <AnimatePresence mode="popLayout" initial={false}>
                {items.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20"
                  >
                    <ShoppingBag className="w-16 h-16 mb-6 text-rose-gold/20" />
                    <p className="font-serif italic text-xl dark:text-white opacity-60">Tu bolsa está esperando ser llenada</p>
                    <button 
                      onClick={onClose} 
                      className="mt-8 px-8 py-4 bg-rose-gold/10 text-rose-gold text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-rose-gold hover:text-white transition-all"
                    >
                      Explorar Colección
                    </button>
                  </motion.div>
                ) : (
                  items.map((item) => {
                    const price = item.discountPercentage 
                      ? item.price * (1 - item.discountPercentage / 100)
                      : item.price;
                    return (
                      <motion.div 
                        key={`${item.id}-${item.size}`} 
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 50 }}
                        className="flex gap-6 group"
                      >
                        <div className="h-28 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-white dark:bg-black/20 border border-rose-gold/5 shadow-sm group-hover:shadow-md transition-shadow">
                          <img src={item.img} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <div className="flex flex-1 flex-col justify-between py-1">
                          <div className="space-y-1">
                            <h3 className="font-serif italic text-lg dark:text-white group-hover:text-rose-gold transition-colors">{item.title}</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-[9px] px-2 py-0.5 bg-rose-gold/5 text-rose-gold font-bold uppercase tracking-widest rounded-full">Talla {item.size}</span>
                                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">${price.toFixed(2)} ud.</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center bg-white dark:bg-black/20 rounded-full border border-rose-gold/5 p-1">
                              <button 
                                onClick={() => onUpdateQuantity(item.id, item.size, -1)} 
                                className="p-1.5 hover:text-rose-gold transition-colors dark:text-gray-400"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 text-xs font-bold w-6 text-center dark:text-white">{item.qty}</span>
                              <button 
                                onClick={() => onUpdateQuantity(item.id, item.size, 1)} 
                                className="p-1.5 hover:text-rose-gold transition-colors dark:text-gray-400"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <button 
                              onClick={() => onRemove(item.id, item.size)} 
                              className="p-2 text-gray-300 hover:text-rose-gold hover:bg-rose-gold/5 rounded-full transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right py-1">
                          <p className="font-sans font-medium dark:text-white text-lg tracking-tight">${(price * item.qty).toFixed(2)}</p>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>

            {items.length > 0 && (
              <div className="p-8 space-y-6 bg-white dark:bg-black/10 border-t border-rose-gold/5">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold mb-1">Total del pedido</p>
                    <p className="text-[8px] text-rose-gold/60 font-bold uppercase tracking-widest">Incluye selección exclusiva</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-serif italic text-warm-charcoal dark:text-white tracking-tighter">${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-rose-gold text-white py-6 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-rose-gold-dark shadow-[0_15px_30px_-5px_rgba(183,110,121,0.4)] transition-all flex items-center justify-center gap-3"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Confirmar por WhatsApp
                  </motion.button>
                  <button 
                    onClick={onClose}
                    className="w-full text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] py-2 hover:text-rose-gold transition-colors"
                  >
                    Seguir explorando
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;
