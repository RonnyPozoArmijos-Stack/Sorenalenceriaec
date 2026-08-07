import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Size } from '../types';
import { Heart, Check, ShoppingCart } from 'lucide-react';
import { getOptimizedImageUrl } from '../lib/cloudinary';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: Size) => void;
  onViewDetails: (product: Product) => void;
  activeSizeFilter?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails, activeSizeFilter }) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const [mainLoaded, setMainLoaded] = useState(false);
  const mainImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (mainImgRef.current?.complete) setMainLoaded(true);
  }, []);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const availableSizes: Size[] = product.availableSizes || [];
  const outOfStockSizes: Size[] = product.outOfStockSizes || [];
  const allSizes: Size[] = Array.from(new Set([...availableSizes, ...outOfStockSizes])).sort((a, b) => {
    const order: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'Única'];
    return order.indexOf(a) - order.indexOf(b);
  });

  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
  const finalPrice = hasDiscount 
    ? product.price * (1 - (product.discountPercentage! / 100)) 
    : product.price;

  const triggerFeedback = (msg: string) => {
    setFeedback(msg);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;
    
    if(!selectedSize) {
      if (availableSizes.length === 1) {
        onAddToCart(product, availableSizes[0]);
        triggerFeedback("Añadido");
      } else {
        onViewDetails(product);
      }
    } else {
      onAddToCart(product, selectedSize);
      triggerFeedback("Añadido");
    }
  };

  const isOutOfStockInFilter = activeSizeFilter !== 'all' && 
                               activeSizeFilter && 
                               outOfStockSizes.includes(activeSizeFilter as Size);
  
  const showAgotado = !product.inStock || isOutOfStockInFilter;

  return (
    <div 
      className={`group flex flex-col h-full bg-transparent relative transition-all duration-300 ${showAgotado ? 'opacity-80' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenedor de Imagen Limpio (Sin efectos 3D ni imagen secundaria) */}
      <div 
        className="relative w-full aspect-[3/4] mb-4 cursor-pointer overflow-hidden rounded-[4px] border border-gray-100 dark:border-white/10 bg-white dark:bg-luxury-gray/40 shadow-sm transition-all duration-300 hover:shadow-md"
        onClick={() => onViewDetails(product)}
      >
        {/* Placeholder mientras carga */}
        {!mainLoaded && (
          <div className="absolute inset-0 shimmer-bg bg-gray-100 dark:bg-luxury-gray" />
        )}

        {/* Filtro Agotado */}
        {showAgotado && (
          <div className="absolute inset-0 z-30 bg-rich-black/40 backdrop-grayscale-[0.5] flex items-center justify-center pointer-events-none">
            <span className="bg-rich-black/80 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-6 py-2 border border-white/10 rounded-sm">
              Agotado
            </span>
          </div>
        )}

        {/* Feedback de acción */}
        <AnimatePresence>
          {feedback && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="absolute inset-0 z-40 flex items-center justify-center bg-white/50 dark:bg-rich-black/50 backdrop-blur-sm pointer-events-none"
            >
              <div className="bg-rose-gold text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg">
                <Check className="w-3.5 h-3.5" />
                {feedback}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Badge 'MAS VENDIDO' */}
        {product.tag === 'MAS VENDIDO' && product.inStock && (
          <div className="absolute top-3 left-3 z-20 pointer-events-none">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[3px] border bg-warm-charcoal/90 text-rose-gold border-rose-gold/30 shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-rose-gold"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-gold"></span>
              </span>
              <span className="font-sans text-[8px] font-extrabold uppercase tracking-[0.2em]">
                Bestseller
              </span>
            </div>
          </div>
        )}

        {/* Etiquetas Varias o Descuento */}
        {((product.tag !== 'NUEVO' && product.tag !== 'MAS VENDIDO' && product.tag) || hasDiscount) && product.inStock && (
          <div className="absolute top-3 left-3 z-20">
            <div className={`text-white text-[8px] font-bold px-2.5 py-1 uppercase tracking-[0.2em] shadow-sm rounded-[2px] ${
              product.tag === 'DESCUENTO' || hasDiscount 
                ? 'bg-rose-gold' 
                : 'bg-warm-charcoal/80 dark:bg-black/60'
            }`}>
              {product.tag === 'DESCUENTO' || (hasDiscount && !product.tag) 
                ? `-${product.discountPercentage}%` 
                : product.tag}
            </div>
          </div>
        )}

        {/* Botón Favoritos */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
          className={`absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-300 border shadow-sm hidden md:block
            ${isLiked 
              ? 'bg-rose-gold border-rose-gold text-white scale-105' 
              : 'bg-white/70 dark:bg-black/40 border-white/30 text-warm-charcoal dark:text-soft-white hover:border-rose-gold hover:text-rose-gold'}`}
        >
          <Heart className={`w-3.5 h-3.5 transition-colors ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* ÚNICA IMAGEN PRINCIPAL (Sin zoom 3D exagerado ni imagen secundaria) */}
        <img 
          ref={mainImgRef}
          src={getOptimizedImageUrl(product.img, { width: 600 })} 
          alt={product.title} 
          loading="lazy"
          decoding="async"
          onLoad={() => setMainLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105
            ${mainLoaded ? 'opacity-100' : 'opacity-0'}
            ${!product.inStock ? 'grayscale-[0.4]' : ''}
          `}
        />
        
        {/* Panel de Añadir en Desktop (Aparece suavemente en Hover) */}
        {product.inStock && (
          <div className={`absolute inset-x-0 bottom-0 p-3 z-30 hidden md:block transition-all duration-300 transform ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 pointer-events-none'}`}>
            <div className="bg-white/95 dark:bg-black/90 backdrop-blur-md p-3 rounded-[4px] border border-gray-100 dark:border-white/10 shadow-lg flex flex-col gap-2.5">
              <div className="flex justify-center gap-1.5">
                {allSizes.map((size, index) => {
                  const isSizeOutOfStock = outOfStockSizes.includes(size);
                  return (
                    <button
                      key={`${size}-${index}`}
                      disabled={isSizeOutOfStock}
                      onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                      className={`w-7 h-7 flex items-center justify-center text-[9px] font-bold rounded-full border transition-all ${
                        isSizeOutOfStock
                          ? 'opacity-30 border-gray-200 text-gray-300 cursor-not-allowed'
                          : selectedSize === size 
                            ? 'bg-rose-gold text-white border-rose-gold' 
                            : 'bg-transparent text-warm-charcoal dark:text-soft-white border-gray-200 dark:border-white/10 hover:border-rose-gold'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              <button 
                onClick={handleAddToCartClick}
                className="w-full bg-warm-charcoal dark:bg-soft-white text-white dark:text-rich-black text-[8px] font-bold uppercase tracking-[0.25em] py-2.5 rounded-full hover:bg-rose-gold hover:text-white dark:hover:bg-rose-gold dark:hover:text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingCart className="w-3 h-3" /> Añadir
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Info del producto */}
      <div className="flex flex-col items-center px-1 space-y-1.5">
        <h3 
          className="font-serif text-[12px] md:text-sm text-warm-charcoal dark:text-soft-white font-medium group-hover:text-rose-gold transition-colors duration-300 cursor-pointer tracking-[0.15em] text-center uppercase truncate w-full" 
          onClick={() => onViewDetails(product)}
        >
          {product.title}
        </h3>
        <div className="flex justify-center items-center gap-2.5">
          {hasDiscount && (
            <span className="text-gray-400 dark:text-gray-600 font-light text-[9px] md:text-[11px] line-through opacity-50 italic">
              ${product.price.toFixed(0)}
            </span>
          )}
          <span className={`text-[11px] md:text-sm tracking-[0.1em] font-sans font-medium ${hasDiscount ? 'text-rose-gold' : 'text-warm-charcoal dark:text-gray-300'}`}>
            ${finalPrice.toFixed(2)}
          </span>
        </div>

        {/* Selección Rápida Móvil */}
        {product.inStock && (
          <div className="md:hidden flex flex-col items-center gap-1.5 pt-1 w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center gap-1 flex-wrap">
              {allSizes.map((size, index) => {
                const isSizeOutOfStock = outOfStockSizes.includes(size);
                return (
                  <button
                    key={`mob-size-${size}-${index}`}
                    disabled={isSizeOutOfStock}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSize(size);
                    }}
                    className={`w-6 h-6 flex items-center justify-center text-[8px] font-bold rounded-full border transition-all ${
                      isSizeOutOfStock
                        ? 'opacity-30 border-gray-200 text-gray-300 cursor-not-allowed'
                        : selectedSize === size
                          ? 'bg-rose-gold text-white border-rose-gold shadow-sm'
                          : 'bg-white/80 dark:bg-black/20 text-warm-charcoal dark:text-soft-white border-gray-200 dark:border-white/10'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
            <button
              onClick={handleAddToCartClick}
              className="w-full bg-warm-charcoal dark:bg-soft-white text-white dark:text-rich-black text-[8px] font-bold uppercase tracking-[0.2em] py-2 rounded-full hover:bg-rose-gold hover:text-white transition-all flex items-center justify-center gap-1 shadow-sm active:scale-95"
            >
              <ShoppingCart className="w-2.5 h-2.5" /> Añadir
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
