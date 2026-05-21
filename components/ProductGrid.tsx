import React, { useState, useMemo, useEffect } from 'react';
import { Product, Size } from '../types';
import ProductCard from './ProductCard';
import ThreeProductBox from './ThreeProductBox';
import { ChevronLeft, ChevronRight, SlidersHorizontal, X, Sparkles, LayoutGrid, HardDrive, ShoppingBag, Check } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, size: Size) => void;
  onViewDetails: (product: Product) => void;
  hideFilters?: boolean;
}

const ITEMS_PER_PAGE = 12;

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, onViewDetails, hideFilters = false }) => {
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'boutique3D'>('grid');
  
  // 3D Studio Active Model state
  const [activeBoxProduct, setActiveBoxProduct] = useState<Product | null>(null);
  const [selected3DSize, setSelected3DSize] = useState<Size | null>(null);
  const [cartFeedback, setCartFeedback] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    if (sizeFilter !== 'all') {
      result = result.filter(p => 
        p.availableSizes?.includes(sizeFilter as Size) || 
        p.outOfStockSizes?.includes(sizeFilter as Size)
      );
      // Sort available products first
      result.sort((a, b) => {
        const aAvailable = a.inStock && a.availableSizes?.includes(sizeFilter as Size);
        const bAvailable = b.inStock && b.availableSizes?.includes(sizeFilter as Size);
        if (aAvailable === bAvailable) return 0;
        return aAvailable ? -1 : 1;
      });
    }
    return result;
  }, [products, sizeFilter]);

  const availableCount = useMemo(() => {
    return filteredProducts.filter(p => p.inStock).length;
  }, [filteredProducts]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  
  // Align active product when filtered products shift
  useEffect(() => {
    if (filteredProducts.length > 0) {
      setActiveBoxProduct(filteredProducts[0]);
    } else {
      setActiveBoxProduct(null);
    }
    setCurrentPage(1);
  }, [sizeFilter, filteredProducts]);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      const element = document.getElementById('catalogo');
      if (element) {
        window.scrollTo({ top: element.offsetTop - 120, behavior: 'smooth' });
      }
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200); 
  };

  const handle3DAddToCart = () => {
    if (!activeBoxProduct) return;
    const size = selected3DSize || (activeBoxProduct.availableSizes && activeBoxProduct.availableSizes[0]) || 'Única';
    onAddToCart(activeBoxProduct, size as Size);
    setCartFeedback(true);
    setTimeout(() => setCartFeedback(false), 2000);
  };

  const sizes: Size[] = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="mb-32">
      {!hideFilters && (
        <div className="max-w-7xl mx-auto px-4 lg:px-0 mb-8 flex flex-col gap-6 border-y border-gray-100 dark:border-white/5 py-6 transition-colors duration-500">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Tallas:</span>
                </div>
                <div className="flex gap-2 items-center overflow-x-auto no-scrollbar pb-1">
                    <button 
                      onClick={() => setSizeFilter('all')} 
                      className={`px-5 py-2 rounded-full text-[9px] font-bold border transition-all duration-500 tracking-widest flex items-center gap-2 ${sizeFilter === 'all' ? 'bg-warm-charcoal text-white dark:bg-soft-white dark:text-rich-black border-transparent shadow-lg' : 'text-gray-500 border-gray-100 dark:border-white/10 hover:border-rose-gold/40'}`}
                    >
                      TODAS
                    </button>
                    {sizes.map(size => (
                        <button 
                          key={size} 
                          onClick={() => setSizeFilter(size)} 
                          className={`w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-full text-[9px] font-bold border transition-all duration-500 tracking-tighter ${sizeFilter === size ? 'bg-rose-gold text-white border-rose-gold shadow-lg scale-110' : 'text-gray-500 border-gray-100 dark:border-white/10 hover:border-rose-gold/40'}`}
                        >
                          {size}
                        </button>
                    ))}
                    
                    {sizeFilter !== 'all' && (
                      <button 
                        onClick={() => setSizeFilter('all')}
                        className="ml-4 flex items-center gap-2 text-rose-gold hover:text-warm-charcoal dark:hover:text-white transition-colors group"
                        title="Limpiar filtros"
                      >
                        <div className="p-2 rounded-full border border-rose-gold/30 group-hover:bg-rose-gold group-hover:text-white transition-all">
                          <X className="w-3 h-3" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-widest hidden sm:inline">Limpiar</span>
                      </button>
                    )}
                </div>
            </div>

            {/* Toggle View Mode */}
            <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-full border border-gray-200/50 dark:border-white/5 items-center gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-5 py-2.5 rounded-full text-[9px] font-bold tracking-widest uppercase transition-all duration-500 flex items-center gap-1.5 ${
                  viewMode === 'grid' 
                    ? 'bg-warm-charcoal text-white dark:bg-soft-white dark:text-rich-black shadow-md' 
                    : 'text-gray-400 hover:text-rose-gold dark:hover:text-soft-white'
                }`}
              >
                <LayoutGrid className="w-3 h-3" />
                Catálogo
              </button>
              <button
                onClick={() => {
                  setViewMode('boutique3D');
                  if (filteredProducts.length > 0 && !activeBoxProduct) {
                    setActiveBoxProduct(filteredProducts[0]);
                  }
                }}
                className={`px-5 py-2.5 rounded-full text-[9px] font-bold tracking-widest uppercase transition-all duration-500 flex items-center gap-2 ${
                  viewMode === 'boutique3D' 
                    ? 'bg-rose-gold text-white shadow-lg' 
                    : 'text-gray-400 hover:text-rose-gold dark:hover:text-soft-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFE090] animate-pulse" />
                Boutique 3D WebGL
              </button>
            </div>

            <div className="h-px w-8 bg-rose-gold/20 hidden md:block"></div>
            <span className="text-[9px] text-gray-500 font-bold tracking-[0.3em] uppercase opacity-70 italic">{availableCount} Modelos Disponibles</span>
          </div>
        </div>
      )}

      {/* RENDER GRID MODE */}
      {viewMode === 'grid' && (
        <>
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16 max-w-7xl mx-auto px-4 transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            {currentProducts.map((product) => (
              <div key={product.id} className="animate-fade-in">
                <ProductCard 
                  product={product} 
                  onAddToCart={onAddToCart} 
                  onViewDetails={onViewDetails} 
                  activeSizeFilter={sizeFilter}
                />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-24 flex justify-center items-center gap-8">
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
                className="p-4 rounded-full border border-gray-100 dark:border-white/5 disabled:opacity-5 text-rose-gold hover:bg-rose-gold hover:text-white transition-all shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-500 mb-1">Página</span>
                <span className="font-serif italic text-2xl text-warm-charcoal dark:text-soft-white">{currentPage} <span className="text-sm opacity-30 mx-2">de</span> {totalPages}</span>
              </div>
              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages} 
                className="p-4 rounded-full border border-gray-100 dark:border-white/5 disabled:opacity-5 text-rose-gold hover:bg-rose-gold hover:text-white transition-all shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}

      {/* RENDER IMMERSIVE 3D BOUTIQUE MODE */}
      {viewMode === 'boutique3D' && activeBoxProduct && (
        <div className="max-w-7xl mx-auto px-4 lg:px-0">
          <div className="bg-gradient-to-b from-white to-gray-50/50 dark:from-luxury-gray/40 dark:to-rich-black/10 rounded-3xl p-6 md:p-10 border border-gray-100 dark:border-white/5 shadow-2xl flex flex-col lg:flex-row gap-10 items-stretch">
            
            {/* Left: Real-time 3D webGL canvas */}
            <div className="w-full lg:w-3/5 flex flex-col justify-between">
              <div className="mb-4">
                <h3 className="font-serif italic text-2xl md:text-3xl dark:text-white mb-2">Visor Tridimensional de Empaque</h3>
                <p className="text-xs text-gray-400 font-mono">MODELADO PROCEDURAL PREMIUM DE CAJA DE BOUTIQUE • ALTA RESOLUCIÓN DE LÁBEL</p>
              </div>

              {/* ThreeProductBox container */}
              <div className="w-full bg-white dark:bg-black/20 rounded-2xl p-4 border border-rose-gold/10 shadow-inner">
                <ThreeProductBox 
                  key={activeBoxProduct.id}
                  product={activeBoxProduct}
                  isDark={true}
                  height={380}
                />
              </div>
            </div>

            {/* Right: Technical Card and Description panel */}
            <div className="w-full lg:w-2/5 flex flex-col justify-between py-2 border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-white/5 lg:pl-10">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.4em] text-rose-gold font-bold block mb-2">{activeBoxProduct.category}</span>
                  <h2 className="text-3xl md:text-4xl font-serif text-warm-charcoal dark:text-soft-white italic leading-tight">{activeBoxProduct.title}</h2>
                  <div className="w-12 h-px bg-rose-gold/30 mt-4"></div>
                </div>

                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-sans font-light">${activeBoxProduct.price.toFixed(2)} USD</span>
                  {activeBoxProduct.discountPercentage && (
                    <span className="text-base text-gray-400 line-through">${activeBoxProduct.price.toFixed(2)}</span>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-ivory-light dark:bg-white/5 border border-rose-gold/5 space-y-3">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#B58585] font-bold block">EXPERIENCIA FÍSICA BOUTIQUE:</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-serif italic">
                    "Cada conjunto se acuna a mano en un lecho de papel de seda perfumado, sellado con un nodo dorado en una caja rígida premium de Sorena. La caja cuenta con detalles de sello de lacre, certificación analógica que contrasta con el diseño digital y código de barras único para su re-escaneo e inventario."
                  </p>
                </div>

                {/* Size select */}
                <div className="space-y-3">
                  <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400 block">Seleccione talla para empaque:</span>
                  <div className="flex gap-2">
                    {activeBoxProduct.availableSizes?.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelected3DSize(size)}
                        className={`w-11 h-11 rounded-full border text-[10px] font-bold transition-all ${
                          selected3DSize === size || (!selected3DSize && activeBoxProduct.availableSizes?.[0] === size)
                            ? 'bg-rose-gold text-white border-rose-gold shadow-md'
                            : 'border-gray-200 dark:border-white/10 text-gray-500 hover:border-rose-gold hover:text-rose-gold'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                    {(!activeBoxProduct.availableSizes || activeBoxProduct.availableSizes.length === 0) && (
                      <span className="text-xs text-gray-400 font-bold italic">Talla Única</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 space-y-3">
                <button
                  onClick={handle3DAddToCart}
                  disabled={!activeBoxProduct.inStock}
                  className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl transition-all flex items-center justify-center gap-3 ${
                    activeBoxProduct.inStock 
                      ? cartFeedback ? 'bg-green-500 text-white' : 'bg-rose-gold text-white hover:bg-rose-gold-dark'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {cartFeedback ? (
                    <><Check className="w-4 h-4" /> ¡Empaque Añadido!</>
                  ) : (
                    <><ShoppingBag className="w-4 h-4" /> Comprar con Servicio de Regalo</>
                  )}
                </button>
                <button
                  onClick={() => onViewDetails(activeBoxProduct!)}
                  className="w-full text-center text-[10px] font-bold uppercase tracking-[0.2em] py-3 text-gray-400 hover:text-rose-gold border border-gray-100 dark:border-white/5 rounded-2xl hover:bg-rose-gold/5 transition-all"
                >
                  Ver Detalles Generales & Galería Completa
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Selector of products below */}
          <div className="mt-14 space-y-4">
            <h4 className="text-[10px] tracking-[0.4em] font-bold text-gray-400 dark:text-gray-500 uppercase">SELECCIONAR OTRO EMPAQUE DE BOUTIQUE:</h4>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {filteredProducts.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => {
                    setActiveBoxProduct(p);
                    setSelected3DSize(null);
                  }}
                  className={`flex-shrink-0 w-36 cursor-pointer p-3 rounded-2xl border transition-all duration-500 flex flex-col items-center gap-3 bg-white dark:bg-luxury-gray/20 hover:scale-105 select-none ${
                    activeBoxProduct.id === p.id 
                      ? 'border-rose-gold bg-rose-gold/5 scale-105 shadow-[0_10px_20px_-5px_rgba(212,165,165,0.3)]' 
                      : 'border-gray-100 dark:border-white/5 opacity-80'
                  }`}
                >
                  {/* Miniature Package Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-100 dark:border-white/15 bg-gray-50 relative">
                    <img 
                      src={p.img} 
                      alt={p.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent"></div>
                    <div className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[7px] font-mono text-[#D4A5A5] font-bold">
                      COD-{p.id}
                    </div>
                  </div>
                  <div className="text-center w-full">
                    <p className="text-[10px] font-bold uppercase tracking-wider truncate dark:text-white">{p.title}</p>
                    <p className="text-[9px] text-rose-gold font-light mt-0.5">${p.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;