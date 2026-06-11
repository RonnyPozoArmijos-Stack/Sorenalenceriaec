import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { PRODUCTS } from './constants';
import { Product, CartItem, Size } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import InfiniteMarquee from './components/Marquee';
import History from './components/History';
import ProductGrid from './components/ProductGrid';
import CartModal from './components/CartModal';
import ProductDetailModal from './components/ProductDetailModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { EcuadorSoccerBall } from './components/EcuadorSoccerBall';
import Footer from './components/Footer';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';

function App() {
  const [products] = useState<Product[]>(PRODUCTS);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sorena_theme');
    return saved ? saved === 'dark' : false;
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Antigravity drift 1 (Left top)
    gsap.to('.antigravity-orb-1', {
      y: '160px',
      x: '60px',
      rotate: 35,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      }
    });

    // Antigravity drift 2 (Right middle)
    gsap.to('.antigravity-orb-2', {
      y: '-220px',
      x: '-90px',
      rotate: -45,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.6,
      }
    });

    // Antigravity drift 3 (Left bottom)
    gsap.to('.antigravity-orb-3', {
      y: '-130px',
      x: '120px',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.9,
      }
    });

    gsap.fromTo('.collection-title', 
      { opacity: 0, y: 30, scale: 0.98 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 1.2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.collection-title',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.history-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.25,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.history-card-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.policy-item',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.policies-container',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

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
    
    // Tricolor Copa 2026 Confetti (Ecuador colors: yellow, blue, red)
    try {
      confetti({
        particleCount: 85,
        spread: 65,
        origin: { y: 0.75 },
        colors: ['#FFD700', '#003893', '#CE1126', '#F4C430'],
        gravity: 1.1,
        scalar: 0.9,
      });
    } catch (e) {
      console.error('Error triggering confetti:', e);
    }
    
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
    <div className="min-h-screen flex flex-col bg-ivory-light dark:bg-rich-black text-warm-charcoal dark:text-soft-white font-sans selection:bg-rose-gold selection:text-white transition-colors duration-500 overflow-x-hidden relative">
      {/* Scroll-Scrub Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-rose-gold via-rose-gold-dark to-yellow-110 z-[9500] origin-left w-full scroll-progress-bar shadow-[0_2px_12px_rgba(212,165,165,0.6)]" />

      {/* Floating Antigravity Luxury Orbs in Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[22%] left-[-15%] w-[45vw] h-[45vw] max-w-[500px] rounded-full bg-gradient-to-tr from-rose-gold/10 to-transparent blur-[90px] dark:from-rose-gold/5 antigravity-orb-1"></div>
        <div className="absolute top-[58%] right-[-15%] w-[40vw] h-[40vw] max-w-[450px] rounded-full bg-gradient-to-bl from-rose-gold/8 to-transparent blur-[110px] dark:from-rose-gold/3 antigravity-orb-2"></div>
        <div className="absolute bottom-[8%] left-[8%] w-[35vw] h-[35vw] max-w-[400px] rounded-full bg-gradient-to-br from-yellow-200/5 to-transparent blur-[95px] dark:from-rose-gold/4 antigravity-orb-3"></div>
      </div>

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
        
        <InfiniteMarquee />
        
        <motion.div 
          id="catalogo" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24 md:scroll-mt-32"
        >
          <div className="text-center mb-16 px-4">
            <h2 className="font-serif text-4xl md:text-7xl text-warm-charcoal dark:text-soft-white mb-6 font-light italic leading-tight transition-colors duration-500 collection-title">Nuestra Colección</h2>
            <div className="w-16 h-px bg-rose-gold/20 mx-auto"></div>
          </div>
          <ProductGrid 
            products={products}
            onAddToCart={handleAddToCart}
            onViewDetails={(product) => setSelectedProduct(product)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <History />
        </motion.div>
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
        onOpenCart={() => setIsCartOpen(true)}
      />
      
      <FloatingWhatsApp />
      <EcuadorSoccerBall />

      {/* Mobile Floating Cart Button (Thumb-friendly) */}
      <div className="fixed bottom-24 right-6 z-[4000] md:hidden">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCartOpen(true)}
          className="relative bg-rose-gold text-white p-5 rounded-full shadow-[0_15px_30px_-5px_rgba(183,110,121,0.4)] border border-white/20"
        >
          <ShoppingBag className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-warm-charcoal dark:bg-soft-white text-white dark:text-rich-black text-[9px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-rose-gold transition-all duration-300">
              {cartCount}
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
}

export default App;