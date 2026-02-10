import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './constants';
import { Product, CartItem, Size } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import History from './components/History';
import ProductGrid from './components/ProductGrid';
import CartModal from './components/CartModal';
import ProductDetailModal from './components/ProductDetailModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import { CheckCircle } from 'lucide-react';

function App() {
  const [products] = useState<Product[]>(PRODUCTS);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sorena_theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('sorena_theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('sorena_theme', 'light');
    }
  }, [isDarkMode]);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sorena_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('sorena_cart', JSON.stringify(cart));
  }, [cart]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{show: boolean, message: string}>({ show: false, message: '' });

  const handleAddToCart = (product: Product, size: Size) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.size === size)
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, size, qty: 1 }];
    });
    
    setToast({ show: true, message: `${product.title} añadido al carrito` });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleRemoveFromCart = (id: number, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const handleUpdateQty = (id: number, size: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id && item.size === size) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      });
    });
  };

  const closeAllModals = () => {
    setSelectedProduct(null);
    setIsCartOpen(false);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen flex flex-col bg-ivory-light dark:bg-rich-black text-warm-charcoal dark:text-soft-white font-sans selection:bg-rose-gold selection:text-white transition-colors duration-500">
      {/* Toast Notification */}
      <div className={`fixed top-28 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 transform ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
        <div className="bg-rose-gold text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/20 backdrop-blur-md">
          <CheckCircle className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{toast.message}</span>
        </div>
      </div>

      <Header 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onNavClick={closeAllModals}
      />
      
      <main className="flex-grow">
        <Hero />
        
        <div id="catalogo" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 md:scroll-mt-32">
          <ProductGrid 
            products={products}
            onAddToCart={handleAddToCart}
            onViewDetails={(product) => setSelectedProduct(product)}
          />
        </div>

        <History />
      </main>

      <Footer />
      
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQty}
      />

      <ProductDetailModal 
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
      
      <FloatingWhatsApp />
    </div>
  );
}

export default App;