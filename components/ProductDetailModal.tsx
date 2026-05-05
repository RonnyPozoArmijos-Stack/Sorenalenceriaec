
import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, ChevronLeft, ChevronRight, ShoppingBag, ChevronDown, AlertCircle, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Size } from '../types';
import { PHONE_NUMBER } from '../constants';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product, size: Size) => void;
  onOpenCart: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  product, 
  onAddToCart,
  onOpenCart
}) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImgLoading, setIsImgLoading] = useState(true);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setSelectedSize(null);
      setIsImgLoading(true);
      setAddedFeedback(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!product) return null;

  const images = [product.img];
  if (product.secondaryImg && product.secondaryImg.trim() !== "") images.push(product.secondaryImg);
  if (product.tertiaryImg && product.tertiaryImg.trim() !== "") images.push(product.tertiaryImg);

  const availableSizes: Size[] = product.availableSizes || [];
  const outOfStockSizes: Size[] = product.outOfStockSizes || [];
  const allSizes: Size[] = [...availableSizes, ...outOfStockSizes].sort((a, b) => {
    const order: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'Única'];
    return order.indexOf(a) - order.indexOf(b);
  });

  const finalPrice = product.discountPercentage 
    ? product.price * (1 - (product.discountPercentage / 100)) 
    : product.price;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    if (!selectedSize) {
        if(availableSizes.length === 1) {
             onAddToCart(product, availableSizes[0]);
             setAddedFeedback(true);
             setTimeout(() => setAddedFeedback(false), 2000);
             return;
        }
        return;
    }
    onAddToCart(product, selectedSize);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleScrollImage = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const newIndex = Math.round(container.scrollLeft / container.offsetWidth);
    if (newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex);
    }
  };

  const scrollToImage = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const width = container.offsetWidth;
      container.scrollTo({
        left: width * index,
        behavior: 'smooth'
      });
      setCurrentImageIndex(index);
    }
  };

  const goToNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (images.length <= 1) return;
    const nextIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    scrollToImage(nextIndex);
  };

  const goToPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (images.length <= 1) return;
    const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    scrollToImage(prevIndex);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[8000] flex items-center justify-center p-0 md:p-6 lg:p-12 overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-warm-charcoal/30 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-6xl bg-white dark:bg-luxury-gray h-full md:h-[85vh] md:rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden"
          >
            {/* Botón Cerrar Móvil */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-3 bg-white/10 backdrop-blur-md text-white md:hidden rounded-full border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gallery Section */}
            <div className="w-full md:w-3/5 h-[60vh] md:h-full bg-gray-50 dark:bg-black/20 relative group">
              <div 
                ref={scrollContainerRef}
                onScroll={handleScrollImage}
                className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
              >
                {images.map((img, idx) => (
                  <div key={idx} className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-4 md:p-6">
                    <img 
                      src={img} 
                      className="max-w-full max-h-full object-contain select-none transition-opacity duration-500" 
                      alt={product.title} 
                    />
                  </div>
                ))}
              </div>
              
              {/* Gallery Controls */}
              {images.length > 1 && (
                <>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {images.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => scrollToImage(i)}
                        className={`h-1 rounded-full transition-all duration-500 ${currentImageIndex === i ? 'w-10 bg-rose-gold' : 'w-2 bg-gray-300 dark:bg-gray-700'}`}
                      />
                    ))}
                  </div>
                  
                  {/* Prev Button */}
                  <button 
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-full text-warm-charcoal dark:text-white hover:bg-rose-gold hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Next Button */}
                  <button 
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-full text-warm-charcoal dark:text-white hover:bg-rose-gold hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Info Section */}
            <div className="w-full md:w-2/5 flex flex-col h-full overflow-y-auto px-6 md:px-10 py-8 no-scrollbar">
              <div className="space-y-6 flex-1">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-rose-gold font-bold block mb-2">{product.category}</span>
                  <h2 className="text-4xl md:text-5xl font-serif text-warm-charcoal dark:text-soft-white italic">{product.title}</h2>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-sans font-light">${finalPrice.toFixed(2)}</span>
                  {product.discountPercentage && (
                    <span className="text-lg text-gray-400 line-through">${product.price.toFixed(2)}</span>
                  )}
                </div>

                <p className="text-gray-500 dark:text-gray-400 font-serif italic text-lg leading-relaxed">
                  {product.description || "Diseño exclusivo de Sorena Lencería. Elegancia y sofisticación en cada detalle."}
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Seleccionar Talla</span>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {allSizes.map((size) => {
                      const isOutOfStock = outOfStockSizes.includes(size);
                      return (
                        <button
                          key={size}
                          disabled={isOutOfStock}
                          onClick={() => setSelectedSize(size === selectedSize ? null : size)}
                          className={`w-14 h-14 rounded-full border text-[11px] font-bold transition-all ${
                            isOutOfStock 
                            ? 'opacity-20 cursor-not-allowed border-gray-100' 
                            : selectedSize === size 
                              ? 'bg-rose-gold text-white border-rose-gold shadow-lg scale-110' 
                              : 'border-gray-100 dark:border-white/10 text-gray-400 hover:border-rose-gold hover:text-rose-gold'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-10 space-y-4 mt-auto">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl transition-all flex items-center justify-center gap-3 ${
                    product.inStock 
                    ? addedFeedback ? 'bg-green-500 text-white' : 'bg-rose-gold text-white hover:bg-rose-gold-dark'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {addedFeedback ? (
                    <><Check className="w-4 h-4" /> ¡Añadido!</>
                  ) : (
                    <><ShoppingBag className="w-4 h-4" /> Añadir a la bolsa</>
                  )}
                </motion.button>
                {product.inStock && (
                  <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const size = selectedSize || (availableSizes.length === 1 ? availableSizes[0] : null);
                        if (!size) {
                          return;
                        }
                        onAddToCart(product, size);
                        onClose();
                        setTimeout(() => onOpenCart(), 300);
                      }}
                      className="w-full bg-rich-black dark:bg-soft-white text-white dark:text-rich-black py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] hover:opacity-90 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl"
                  >
                      Comprar Ahora
                  </motion.button>
                )}
                <button
                  onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}`, "_blank")}
                  className="w-full flex items-center justify-center gap-3 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-rose-gold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Consultar detalles
                </button>
              </div>
            </div>

            {/* Desktop Close */}
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 hidden md:block text-gray-300 hover:text-rose-gold transition-all hover:rotate-90"
            >
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductDetailModal;
