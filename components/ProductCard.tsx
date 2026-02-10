
import React, { useState, useEffect, useRef } from 'react';
import { Product, Size } from '../types';
import { Heart, Check, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: Size) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  const [mainLoaded, setMainLoaded] = useState(false);
  const [secondaryLoaded, setSecondaryLoaded] = useState(false);
  
  const mainImgRef = useRef<HTMLImageElement>(null);
  const secondaryImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (mainImgRef.current?.complete) setMainLoaded(true);
    if (secondaryImgRef.current?.complete) setSecondaryLoaded(true);
  }, []);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const availableSizes: Size[] = product.availableSizes || ['XS', 'S', 'M', 'L', 'XL'];
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
  }

  const hasSecondaryImg = product.secondaryImg && product.secondaryImg.trim() !== "";

  return (
    <div 
        className={`group flex flex-col h-full bg-transparent relative transition-all duration-700 ${!product.inStock ? 'opacity-80' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenedor de Imagen */}
      <div 
        className={`relative overflow-hidden w-full aspect-[3/4] mb-6 cursor-pointer rounded-[4px] border transition-all duration-700 
          ${isHovered ? 'shadow-[0_20px_50px_-15px_rgba(212,165,165,0.25)] border-rose-gold/20' : 'shadow-[0_10px_30px_-20px_rgba(0,0,0,0.1)] border-gray-100 dark:border-white/5'}
          ${!mainLoaded ? 'shimmer-bg bg-gray-100 dark:bg-luxury-gray' : 'bg-white dark:bg-luxury-gray/40'}`}
        onClick={() => onViewDetails(product)}
      >
        {/* Filtro Agotado */}
        {!product.inStock && (
          <div className="absolute inset-0 z-30 bg-rich-black/40 backdrop-grayscale-[0.5] flex items-center justify-center pointer-events-none">
            <span className="bg-rich-black/80 text-white text-[10px] font-bold uppercase tracking-[0.3em] px-6 py-2 border border-white/10 rounded-sm">
              Agotado
            </span>
          </div>
        )}

        {/* Feedback de acción */}
        {feedback && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/40 dark:bg-rich-black/40 backdrop-blur-sm animate-fade-in pointer-events-none">
            <div className="bg-rose-gold text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 shadow-2xl scale-110">
              <Check className="w-3.5 h-3.5" />
              {feedback}
            </div>
          </div>
        )}

        {/* Etiquetas Minimalistas */}
        {(product.tag || hasDiscount) && product.inStock && (
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
                <div className={`text-white text-[8px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] shadow-lg transition-all duration-500 backdrop-blur-md rounded-[2px] ${
                  product.tag === 'DESCUENTO' || hasDiscount 
                  ? 'bg-rose-gold/90' 
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
            className={`absolute top-4 right-4 z-20 p-2.5 rounded-full transition-all duration-500 border backdrop-blur-md shadow-sm hidden md:block
              ${isLiked 
                ? 'bg-rose-gold border-rose-gold text-white scale-110 shadow-rose-gold/30' 
                : 'bg-white/40 dark:bg-black/20 border-white/20 dark:border-white/5 text-warm-charcoal dark:text-soft-white hover:border-rose-gold/50 hover:text-rose-gold'}`}
        >
            <Heart 
                className={`w-3.5 h-3.5 transition-all duration-500 ${isLiked ? 'fill-current' : ''}`} 
            />
        </button>

        {/* Imágenes */}
        <img 
          ref={mainImgRef}
          src={product.img} 
          alt={product.title} 
          onLoad={() => setMainLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-[1200ms] cubic-bezier(0.2, 0.8, 0.2, 1) absolute top-0 left-0 
            ${isHovered ? 'scale-110 opacity-0' : 'scale-100 opacity-100'} 
            ${mainLoaded ? '' : 'opacity-0'}
            ${!product.inStock ? 'grayscale-[0.4]' : ''}
          `}
        />

        {hasSecondaryImg && (
            <img 
              ref={secondaryImgRef}
              src={product.secondaryImg} 
              alt={`${product.title} view 2`} 
              onLoad={() => setSecondaryLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-[1200ms] cubic-bezier(0.2, 0.8, 0.2, 1) absolute top-0 left-0
                ${isHovered ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}
                ${secondaryLoaded ? '' : 'opacity-0'}
                ${!product.inStock ? 'grayscale-[0.4]' : ''}
              `}
            />
        )}
        
        {/* Botón de Añadir (Solo Desktop) */}
        {product.inStock && (
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-700 hidden md:block">
              <div className="bg-white/80 dark:bg-black/60 backdrop-blur-xl p-4 rounded-[4px] border border-white/20 dark:border-white/5 shadow-2xl flex flex-col gap-3">
                   <div className="flex justify-center gap-2">
                      {availableSizes.map((size) => (
                          <button
                              key={size}
                              onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                              className={`w-8 h-8 flex items-center justify-center text-[9px] font-bold rounded-full border transition-all duration-500 ${
                                  selectedSize === size 
                                  ? 'bg-rose-gold text-white border-rose-gold' 
                                  : 'bg-transparent text-warm-charcoal dark:text-soft-white border-gray-200 dark:border-white/10 hover:border-rose-gold/40'
                              }`}
                          >
                              {size}
                          </button>
                      ))}
                  </div>
                  <button 
                      onClick={handleAddToCartClick}
                      className="w-full bg-warm-charcoal dark:bg-soft-white text-white dark:text-rich-black text-[8px] font-bold uppercase tracking-[0.3em] py-3.5 rounded-full hover:bg-rose-gold hover:text-white dark:hover:bg-rose-gold dark:hover:text-white transition-all duration-500 flex items-center justify-center gap-2"
                  >
                      <ShoppingCart className="w-3 h-3" /> Añadir
                  </button>
              </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col items-center px-2 space-y-2">
        <h3 
          className="font-serif text-[11px] md:text-sm text-warm-charcoal dark:text-soft-white font-medium group-hover:text-rose-gold transition-colors duration-500 cursor-pointer tracking-[0.2em] text-center uppercase truncate w-full" 
          onClick={() => onViewDetails(product)}
        >
            {product.title}
        </h3>
        <div className="flex justify-center items-center gap-3">
            {hasDiscount && (
                <span className="text-gray-400 dark:text-gray-600 font-light text-[9px] md:text-[11px] line-through opacity-40 italic tracking-tighter">
                    ${product.price.toFixed(0)}
                </span>
            )}
            <span className={`text-[11px] md:text-base tracking-[0.1em] font-sans font-light transition-colors duration-500 ${hasDiscount ? 'text-rose-gold' : 'text-warm-charcoal dark:text-gray-400'}`}>
                ${finalPrice.toFixed(2)}
            </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
