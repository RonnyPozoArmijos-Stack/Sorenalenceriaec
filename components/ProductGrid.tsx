import React, { useState, useMemo, useEffect } from 'react';
import { Product, Size } from '../types';
import ProductCard from './ProductCard';
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product, size: Size) => void;
  onViewDetails: (product: Product) => void;
}

const ITEMS_PER_PAGE = 12;

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, onViewDetails }) => {
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (sizeFilter !== 'all') {
      result = result.filter(p => p.availableSizes?.includes(sizeFilter as Size));
    }
    return result;
  }, [products, sizeFilter]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [sizeFilter]);

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

  const sizes: Size[] = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <div className="mb-32">
      <div className="text-center mb-16 animate-fade-in px-4">
        <h2 className="font-serif text-4xl md:text-7xl text-warm-charcoal dark:text-soft-white mb-6 font-light italic leading-tight transition-colors duration-500">Nuestra Colección</h2>
        <div className="w-16 h-px bg-rose-gold/20 mx-auto"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-0 mb-16 flex flex-col md:flex-row justify-between items-center gap-8 border-y border-gray-100 dark:border-white/5 py-8 transition-colors duration-500">
        <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-2 text-gray-500">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Filtrar:</span>
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
        <div className="h-px w-8 bg-rose-gold/20 hidden md:block"></div>
        <span className="text-[9px] text-gray-500 font-bold tracking-[0.3em] uppercase opacity-70 italic">{filteredProducts.length} Modelos Disponibles</span>
      </div>

      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16 max-w-7xl mx-auto px-4 transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        {currentProducts.map((product) => (
          <div key={product.id} className="animate-fade-in">
            <ProductCard product={product} onAddToCart={onAddToCart} onViewDetails={onViewDetails} />
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
    </div>
  );
};

export default ProductGrid;