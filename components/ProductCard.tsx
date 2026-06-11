
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Product, Size } from '../types';
import { Heart, Check, ShoppingCart } from 'lucide-react';

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
  const [secondaryLoaded, setSecondaryLoaded] = useState(false);
  
  const mainImgRef = useRef<HTMLImageElement>(null);
  const secondaryImgRef = useRef<HTMLImageElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // Detect mobile screens dynamically
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Motion values to track dynamic mouse/touch coordinates smoothness
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Friction and spring physics configuration for high-end feel
  const springConfig = { damping: 20, stiffness: 160 };

  // Smooth transforms from -0.5/0.5 cursor grid map to rotations (reduced from +/- 14.5 to +/- 8 on mobile to avoid overflows)
  const rotateXSpring = useSpring(useTransform(mouseY, (yVal) => yVal * (isMobile ? -16 : -29)), springConfig);
  const rotateYSpring = useSpring(useTransform(mouseX, (xVal) => xVal * (isMobile ? 16 : 29)), springConfig);

  // Parallax background border rotation with lesser intensity (+/- 4 degrees max on mobile, +/- 7 on desktop)
  const borderRotateX = useSpring(useTransform(mouseY, (yVal) => yVal * (isMobile ? -8 : -14)), springConfig);
  const borderRotateY = useSpring(useTransform(mouseX, (xVal) => xVal * (isMobile ? 8 : 14)), springConfig);

  // Smooth springs for hover/touch animations (scale 1.02 and lesser z-axis on mobile to prevent blocking/clipping)
  const scaleSpring = useSpring(isHovered ? (isMobile ? 1.02 : 1.05) : 1, springConfig);
  const zTranslationSpring = useSpring(isHovered ? (isMobile ? 10 : 30) : 0, springConfig);

  // 3D Parallax image layers translation offsets (creates real 3D depth, moving opposite to tilt)
  const imgTranslateX = useTransform(mouseX, [-0.5, 0.5], [isMobile ? '6px' : '14px', isMobile ? '-6px' : '-14px']);
  const imgTranslateY = useTransform(mouseY, [-0.5, 0.5], [isMobile ? '6px' : '14px', isMobile ? '-6px' : '-14px']);
  const imgTranslateXSpring = useSpring(imgTranslateX, springConfig);
  const imgTranslateYSpring = useSpring(imgTranslateY, springConfig);

  // Interactive Glare highlights state
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [glareOpacity, setGlareOpacity] = useState(0);

  // Gyroscope / Accelerometer tilting for ultimate mobile 3D interaction!
  useEffect(() => {
    if (!isMobile) return;

    let initialBeta: number | null = null;
    let initialGamma: number | null = null;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;

      if (initialBeta === null) initialBeta = e.beta;
      if (initialGamma === null) initialGamma = e.gamma;

      const deltaBeta = e.beta - initialBeta;
      const deltaGamma = e.gamma - initialGamma;

      const maxTilt = 12;
      const clamp = (val: number, max: number) => Math.max(-max, Math.min(max, val));

      const normalizedX = (clamp(deltaGamma, maxTilt) / maxTilt) * 0.5;
      const normalizedY = (clamp(deltaBeta, maxTilt) / maxTilt) * 0.5;

      mouseX.set(normalizedX);
      mouseY.set(normalizedY);

      const gX = 50 + (normalizedX * 100);
      const gY = 50 + (normalizedY * 100);
      setGlareX(gX);
      setGlareY(gY);
      setGlareOpacity(0.35);
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [isMobile]);

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
  }

  const hasSecondaryImg = product.secondaryImg && product.secondaryImg.trim() !== "";

  const isOutOfStockInFilter = activeSizeFilter !== 'all' && 
                               activeSizeFilter && 
                               outOfStockSizes.includes(activeSizeFilter as Size);
  
  const showAgotado = !product.inStock || isOutOfStockInFilter;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardContainerRef.current) return;
    const card = cardContainerRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position of cursor relative to element
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;
    
    // Normalize coordinates around absolute center (range: -0.5 to 0.5)
    const normalizedX = (xPos / width) - 0.5;
    const normalizedY = (yPos / height) - 0.5;
    
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
    
    // Set gradient percentage highlights
    const gX = (xPos / width) * 100;
    const gY = (yPos / height) * 100;
    setGlareX(gX);
    setGlareY(gY);
    setGlareOpacity(0.45);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardContainerRef.current) return;
    const card = cardContainerRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const touch = e.touches[0];
    if (!touch) return;
    
    // Position of touch relative to element
    const xPos = touch.clientX - rect.left;
    const yPos = touch.clientY - rect.top;
    
    // Normalize coordinates around absolute center (range: -0.5 to 0.5) and bound them nicely
    const normalizedX = Math.max(-0.5, Math.min(0.5, (xPos / width) - 0.5));
    const normalizedY = Math.max(-0.5, Math.min(0.5, (yPos / height) - 0.5));
    
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
    
    // Set gradient percentage highlights for touch
    const gX = Math.max(0, Math.min(100, (xPos / width) * 100));
    const gY = Math.max(0, Math.min(100, (yPos / height) * 100));
    setGlareX(gX);
    setGlareY(gY);
    setGlareOpacity(0.4);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset rotations smoothly
    mouseX.set(0);
    mouseY.set(0);
    setGlareOpacity(0);
  };

  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    // Reset rotations smoothly
    mouseX.set(0);
    mouseY.set(0);
    setGlareOpacity(0);
  };

  return (
    <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={isMobile ? undefined : { y: -8 }}
        className={`group flex flex-col h-full bg-transparent relative transition-all duration-700 ${showAgotado ? 'opacity-80' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        style={{ touchAction: 'pan-y' }}
    >
      {/* 3D Perspective Nesting Environment Wrapper (Higher perspective on mobile for flatter, safer projection) */}
      <div className="relative w-full aspect-[3/4] mb-6 cursor-pointer" style={{ perspective: isMobile ? '1600px' : '1000px' }}>
        {/* Capa de borde decorativo absoluto (Parallax de fondo) posicionado detrás */}
        <motion.div
          style={{
            rotateX: borderRotateX,
            rotateY: borderRotateY,
            scale: scaleSpring,
            transformStyle: 'preserve-3d',
            zIndex: 0
          }}
          className={`absolute inset-0 rounded-[4px] border-2 border-rose-gold/25 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Master Card Frame with smooth Spring mechanics */}
        <motion.div 
          ref={cardContainerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className={`relative overflow-hidden w-full h-full rounded-[4px] border transition-all duration-[400ms] ease-out z-10
            ${isHovered ? 'shadow-[0_45px_90px_-20px_rgba(212,165,165,0.4)] border-rose-gold/20' : 'shadow-[0_10px_30px_-20px_rgba(0,0,0,0.1)] border-gray-100 dark:border-white/5'}
            ${!mainLoaded ? 'shimmer-bg bg-gray-100 dark:bg-luxury-gray' : 'bg-white dark:bg-luxury-gray/40'}`}
          onClick={() => onViewDetails(product)}
          style={{
            rotateX: rotateXSpring,
            rotateY: rotateYSpring,
            scale: scaleSpring,
            z: zTranslationSpring,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Capa de Brillo Holográfico 3D Dinámico */}
          <div 
            className="absolute inset-0 pointer-events-none z-20 mix-blend-color-dodge transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(212,165,165,0.15) 50%, transparent 80%)`,
              opacity: glareOpacity,
            }}
          />

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
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="absolute inset-0 z-40 flex items-center justify-center bg-white/40 dark:bg-rich-black/40 backdrop-blur-sm pointer-events-none"
              >
                <div className="bg-rose-gold text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 shadow-2xl">
                  <Check className="w-3.5 h-3.5" />
                  {feedback}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Custom Floating 3D Badge for 'MAS VENDIDO' */}
          {product.tag === 'MAS VENDIDO' && product.inStock && (
            <motion.div
              style={{
                transform: isHovered 
                  ? `translateZ(${isMobile ? '35px' : '55px'}) translateY(-4px)`
                  : `translateZ(${isMobile ? '12px' : '22px'})`,
                transformStyle: 'preserve-3d',
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="absolute top-4 left-4 z-30 pointer-events-none"
            >
              <div 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] border backdrop-blur-md shadow-[0_12px_24px_-8px_rgba(0,0,0,0.3)] transition-all duration-500 bg-gradient-to-r from-warm-charcoal/95 to-black/85 border-rose-gold/30 text-rose-gold"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Visual indicator dot */}
                <span 
                  className="relative flex h-2 w-2 mr-0.5"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-rose-gold"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-gold"></span>
                </span>
                
                <span 
                  className="font-sans text-[8px] sm:text-[9px] font-extrabold uppercase tracking-[0.25em] leading-none"
                  style={{ transform: 'translateZ(8px)' }}
                >
                  Bestseller
                </span>
              </div>
            </motion.div>
          )}

          {/* Etiquetas Minimalistas (Discounts and miscellaneous tags) */}
          {((product.tag !== 'NUEVO' && product.tag !== 'MAS VENDIDO' && product.tag) || hasDiscount) && product.inStock && (
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

          {/* Imágenes con posicionamiento 3D interactivo real (Parallax flotante) */}
          <motion.img 
            ref={mainImgRef}
            src={product.img} 
            alt={product.title} 
            onLoad={() => setMainLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-[800ms] absolute top-0 left-0 
              ${isHovered ? 'opacity-0' : 'opacity-100'} 
              ${mainLoaded ? '' : 'opacity-0'}
              ${!product.inStock ? 'grayscale-[0.4]' : ''}
            `}
            style={{
              x: imgTranslateXSpring,
              y: imgTranslateYSpring,
              z: '25px', // Higher z-depth layer for 3D preservation
              transformStyle: 'preserve-3d',
              scale: isHovered ? 1.08 : 1.02, // slightly larger base to allow overflow parallax room without edges
            }}
            transition={{ duration: 0.4 }}
          />

          {hasSecondaryImg && (
              <motion.img 
                ref={secondaryImgRef}
                src={product.secondaryImg} 
                alt={`${product.title} view 2`} 
                onLoad={() => setSecondaryLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-[800ms] absolute top-0 left-0
                  ${isHovered ? 'opacity-100' : 'opacity-0'}
                  ${secondaryLoaded ? '' : 'opacity-0'}
                  ${!product.inStock ? 'grayscale-[0.4]' : ''}
                `}
                style={{
                  x: imgTranslateXSpring,
                  y: imgTranslateYSpring,
                  z: '35px', // Floating overlay layer
                  transformStyle: 'preserve-3d',
                  scale: isHovered ? 1.02 : 1.08,
                }}
                transition={{ duration: 0.4 }}
              />
          )}
          
          {/* Botón de Añadir (Solo Desktop) */}
          {product.inStock && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              className="absolute inset-x-0 bottom-0 p-4 z-40 hidden md:block"
            >
                <div className="bg-white/90 dark:bg-black/80 backdrop-blur-xl p-4 rounded-[4px] border border-white/20 dark:border-white/5 shadow-2xl flex flex-col gap-3">
                     <div className="flex justify-center gap-2">
                        {allSizes.map((size, index) => {
                            const isSizeOutOfStock = outOfStockSizes.includes(size);
                            return (
                                <button
                                    key={`${size}-${index}`}
                                    disabled={isSizeOutOfStock}
                                    onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                                    className={`w-8 h-8 flex items-center justify-center text-[9px] font-bold rounded-full border transition-all duration-500 ${
                                        isSizeOutOfStock
                                        ? 'opacity-30 border-gray-200 text-gray-300 cursor-not-allowed'
                                        : selectedSize === size 
                                          ? 'bg-rose-gold text-white border-rose-gold' 
                                          : 'bg-transparent text-warm-charcoal dark:text-soft-white border-gray-200 dark:border-white/10 hover:border-rose-gold/40'
                                    }`}
                                >
                                    {size}
                                </button>
                            );
                        })}
                    </div>
                    <button 
                        onClick={handleAddToCartClick}
                        className="w-full bg-warm-charcoal dark:bg-soft-white text-white dark:text-rich-black text-[8px] font-bold uppercase tracking-[0.3em] py-3.5 rounded-full hover:bg-rose-gold hover:text-white dark:hover:bg-rose-gold dark:hover:text-white transition-all duration-500 flex items-center justify-center gap-2"
                    >
                        <ShoppingCart className="w-3 h-3" /> Añadir
                    </button>
                </div>
            </motion.div>
          )}
        </motion.div>
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
    </motion.div>
  );
};

export default ProductCard;
