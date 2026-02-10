
import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, ChevronLeft, ChevronRight, ShoppingCart, ChevronDown, AlertCircle } from 'lucide-react';
import { Product, Size } from '../types';
import { PHONE_NUMBER } from '../constants';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product, size: Size) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  product, 
  onAddToCart 
}) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImgLoading, setIsImgLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const detailsContainerRef = useRef<HTMLDivElement>(null);
  const firstImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setSelectedSize(null);
      setIsImgLoading(true);
      document.body.style.overflow = 'hidden';

      window.history.pushState({ modal: 'product-detail' }, '');
      const handlePopState = () => onClose();
      window.addEventListener('popstate', handlePopState);
      
      setTimeout(() => {
        if (firstImgRef.current?.complete) {
          setIsImgLoading(false);
        }
      }, 50);

      return () => {
        window.removeEventListener('popstate', handlePopState);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose]);

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

  const handleManualClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onClose();
    if (window.history.state?.modal === 'product-detail') {
      window.history.back();
    }
  };

  if (!isOpen || !product) return null;

  const images = [product.img];
  if (product.secondaryImg && product.secondaryImg.trim() !== "") {
    images.push(product.secondaryImg);
  }

  const availableSizes: Size[] = product.availableSizes || ['XS', 'S', 'M', 'L', 'XL'];
  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const finalPrice = hasDiscount 
    ? product.price * (1 - (product.discountPercentage! / 100)) 
    : product.price;

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

  const handleScrollImage = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const newIndex = Math.round(container.scrollLeft / container.offsetWidth);
    if (newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex);
    }
  };

  const handleWheelOnImage = (e: React.WheelEvent) => {
    if (window.innerWidth >= 768 && detailsContainerRef.current) {
      detailsContainerRef.current.scrollTop += e.deltaY;
    }
  };

  const handleAddToCart = () => {
    if (!product.inStock) return;
    if (!selectedSize) {
        if(availableSizes.length === 1) {
             onAddToCart(product, availableSizes[0]);
             return;
        }
        alert("Por favor selecciona una talla");
        return;
    }
    onAddToCart(product, selectedSize);
  };

  const handleBuyWhatsapp = () => {
    if (!product.inStock) {
        const message = `Hola, ¿este producto volverá a estar disponible?:\n\n*${product.title}*`;
        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
        return;
    }

    const sizeToBuy = selectedSize || (availableSizes.length === 1 ? availableSizes[0] : null);
    if (!sizeToBuy) {
        alert("Por favor selecciona una talla");
        return;
    }
    const message = `Hola, me interesa este producto:\n\n*${product.title}*\n- Talla: ${sizeToBuy}\n- Precio: $${finalPrice.toFixed(2)}\n\n¿Más información?`;
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-[5500] bg-white/70 dark:bg-rich-black/85 backdrop-blur-xl md:backdrop-blur-md flex flex-col items-center justify-start md:justify-center overflow-y-auto transition-all duration-500 animate-fade-in pt-20 md:pt-0 no-scrollbar">
      
      {/* Botón X Flotante para Móvil (Se mantiene arriba) */}
      <button 
        onClick={handleManualClose}
        className="fixed top-24 right-6 md:hidden z-[5600] p-4 bg-white/90 dark:bg-luxury-gray/90 text-warm-charcoal dark:text-soft-white rounded-full border border-warm-charcoal/10 dark:border-white/10 shadow-2xl active:scale-90"
        aria-label="Cerrar detalles"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative w-full max-w-7xl mx-auto flex flex-col md:flex-row bg-white dark:bg-luxury-gray md:rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] h-auto md:h-[85vh] md:max-h-[900px] overflow-visible md:overflow-hidden border-t md:border border-gray-100 dark:border-white/5 transition-colors duration-600 mb-10 md:mb-0 no-scrollbar">
        
        {/* Lado Imagen */}
        <div 
          onWheel={handleWheelOnImage}
          className={`relative w-full md:w-1/2 min-h-[70vh] md:h-full flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 dark:border-white/5 overflow-hidden transition-colors duration-600
            ${isImgLoading ? 'shimmer-bg bg-gray-100 dark:bg-black/60' : 'bg-white dark:bg-black/40'}`}
        >
          <div 
            ref={scrollContainerRef}
            onScroll={handleScrollImage}
            className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth"
          >
            {images.map((img, idx) => (
              <div key={idx} className="w-full h-full flex-shrink-0 snap-center flex items-center justify-center p-4 md:p-16">
                <img 
                  ref={idx === 0 ? firstImgRef : null}
                  src={img} 
                  alt={`${product.title} - Vista ${idx + 1}`} 
                  onLoad={() => idx === 0 && setIsImgLoading(false)}
                  className={`max-w-full max-h-full object-contain pointer-events-none select-none transition-opacity duration-700 ${isImgLoading ? 'opacity-0' : 'opacity-100'} ${!product.inStock ? 'grayscale-[0.5]' : ''}`}
                />
              </div>
            ))}
          </div>

          <div className="absolute bottom-12 md:hidden flex flex-col items-center animate-bounce opacity-40 pointer-events-none">
             <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-warm-charcoal dark:text-soft-white mb-2">Detalles</span>
             <ChevronDown className="w-4 h-4 text-rose-gold" />
          </div>

          {images.length > 1 && (
            <>
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
                {images.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => scrollToImage(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${currentImageIndex === i ? 'w-10 bg-rose-gold' : 'w-3 bg-gray-300 dark:bg-gray-700'}`}
                  />
                ))}
              </div>
              <button onClick={goToPrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-full text-warm-charcoal dark:text-white hover:bg-rose-gold transition-all z-30 shadow-lg">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/70 dark:bg-black/40 backdrop-blur-md rounded-full text-warm-charcoal dark:text-white hover:bg-rose-gold transition-all z-30 shadow-lg">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Lado Información */}
        <div 
          ref={detailsContainerRef}
          className="w-full md:w-1/2 flex flex-col md:h-full overflow-visible md:overflow-y-auto bg-white dark:bg-luxury-gray transition-colors duration-600 relative desktop-scroll-area"
        >
          <div className="p-8 md:p-12 lg:p-16 space-y-10 flex-1">
            <div className="space-y-4">
              {/* Contenedor Categoría + Botón X (Vista Escritorio) */}
              <div className="flex items-center justify-between gap-4">
                 <div className="flex items-center gap-3 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-rose-gold font-bold">
                        {product.category}
                    </p>
                    <div className="h-px flex-1 bg-rose-gold/20"></div>
                 </div>
                 
                 {/* Botón X Integrado al lado de "CONJUNTO" solo en Escritorio */}
                 <button 
                   onClick={handleManualClose}
                   className="hidden md:flex p-2 text-gray-400 hover:text-rose-gold transition-all hover:rotate-90"
                   aria-label="Cerrar detalles"
                 >
                   <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="flex items-center gap-4">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-warm-charcoal dark:text-soft-white italic font-light leading-tight tracking-tight transition-colors duration-600 pr-4">
                  {product.title}
                </h2>
                {!product.inStock && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-[9px] font-bold uppercase tracking-widest border border-red-200 dark:border-red-900/50">
                    <AlertCircle className="w-3 h-3" /> Agotado
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-baseline gap-5 py-8 border-y border-gray-100 dark:border-white/5 transition-colors duration-600">
              <span className="text-4xl md:text-5xl font-sans font-light tracking-tighter text-warm-charcoal dark:text-soft-white transition-colors duration-600">
                ${finalPrice.toFixed(2)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-gray-400 line-through opacity-40 font-light italic transition-colors duration-600">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="space-y-5">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Detalles de la Prenda</h4>
              <p className="font-serif text-gray-500 dark:text-gray-400 text-lg md:text-xl leading-relaxed italic border-l-2 border-rose-gold/20 pl-6 py-2 transition-colors duration-600">
                {product.description || "Diseño exclusivo de Sorena Lencería. Cada pieza es seleccionada para ofrecerte la máxima elegancia y confort, utilizando materiales premium que abrazan tu silueta."}
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">Talla Disponible</span>
                {selectedSize && (
                  <span className="text-[10px] text-rose-gold font-bold uppercase tracking-widest animate-fade-in">Talla {selectedSize}</span>
                )}
              </div>
              <div className="flex gap-4 flex-wrap">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    disabled={!product.inStock}
                    onClick={() => setSelectedSize(prev => prev === size ? null : size)}
                    className={`h-14 w-14 flex items-center justify-center rounded-full border text-[11px] font-bold transition-all duration-500 ${
                      !product.inStock 
                      ? 'opacity-40 border-gray-100 text-gray-300 cursor-not-allowed'
                      : selectedSize === size 
                        ? 'bg-rose-gold text-white border-rose-gold shadow-lg scale-110' 
                        : 'border-gray-100 dark:border-white/10 text-gray-400 dark:text-gray-500 hover:border-rose-gold hover:text-rose-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 space-y-4">
              {product.inStock ? (
                <>
                  <button
                      onClick={handleAddToCart}
                      className="w-full bg-rose-gold text-white py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-rose-gold-dark transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95 group"
                  >
                      <ShoppingCart className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> 
                      Añadir a la bolsa
                  </button>
                  <button
                      onClick={handleBuyWhatsapp}
                      className="w-full border border-gray-100 dark:border-white/10 text-warm-charcoal dark:text-soft-white py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-ivory-light dark:hover:bg-white/5 transition-all flex items-center justify-center gap-4 active:scale-95"
                  >
                      <MessageCircle className="w-5 h-5 text-green-500" /> 
                      Pedir por WhatsApp
                  </button>
                </>
              ) : (
                <button
                    onClick={handleBuyWhatsapp}
                    className="w-full bg-warm-charcoal dark:bg-soft-white text-white dark:text-rich-black py-6 rounded-full font-bold uppercase tracking-[0.3em] text-[11px] transition-all flex items-center justify-center gap-4 shadow-xl active:scale-95"
                >
                    <MessageCircle className="w-5 h-5 text-green-500" /> 
                    Consultar Disponibilidad
                </button>
              )}
            </div>
            
            <div className="h-16"></div>
          </div>
          
          <div className="hidden md:block sticky bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white dark:from-luxury-gray to-transparent pointer-events-none opacity-40"></div>
        </div>
      </div>
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @media (min-width: 768px) {
          .desktop-scroll-area::-webkit-scrollbar {
            display: block !important;
            width: 6px;
          }
          .desktop-scroll-area::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.02);
            border-radius: 10px;
          }
          .desktop-scroll-area::-webkit-scrollbar-thumb {
            background-color: #b76e79;
            border-radius: 10px;
            border: 1px solid transparent;
            background-clip: content-box;
          }
          .desktop-scroll-area::-webkit-scrollbar-thumb:hover {
            background-color: #a65d68;
          }
          .desktop-scroll-area {
            scrollbar-width: thin;
            scrollbar-color: #b76e79 transparent;
            scroll-behavior: smooth;
          }
        }

        @media (max-width: 767px) {
          .desktop-scroll-area {
            overflow-y: visible !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailModal;
