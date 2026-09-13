import { useState, useEffect, useRef } from 'react';
// @ts-ignore
import brandLogo from '../assets/images/logo_pre.png';
import { LOGO_PRE_URL } from '../../imaganes/Imagenes inicio/Logo';
import { ShoppingCart, Heart, Menu, X, Sun, Moon } from 'lucide-react';
import { ActiveTab, CartItem, Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  favorites: Product[];
  setIsFavoritesOpen: (open: boolean) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  setFilterCategory?: (category: string) => void;
}

const PROMO_MESSAGES = [
  "COTIZACIÓN EN MENOS DE 24 HORAS",
  "10% DE DESCUENTO EN TU PRIMERA COMPRA",
  "EN COMPRAS MAYORES A $2,000 MXN ENVÍO GRATIS",
];

export default function Header({
  activeTab,
  setActiveTab,
  cart,
  setIsCartOpen,
  favorites,
  setIsFavoritesOpen,
  theme,
  setTheme,
  setFilterCategory,
}: HeaderProps) {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isVisible, setIsVisible] = useState(true);
  const [promoIndex, setPromoIndex] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % PROMO_MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY <= 40) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            // Scrolling down
            setIsVisible(false);
          } else if (currentScrollY < lastScrollY.current) {
            // Scrolling up
            setIsVisible(true);
          }
          
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // Instant mouse tracking: if the cursor is near the top (<= 90px), immediately show header
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 90) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'quienes-somos', label: 'Quiénes Somos' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <>
      <motion.header 
        initial={false}
        animate={{ 
          y: isVisible ? 0 : -140,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ 
          duration: 0.2,
          ease: [0.16, 1, 0.3, 1]
        }}
        className="sticky top-0 z-40 w-full bg-brand-navy text-white border-b border-brand-navy/30 shadow-md will-change-transform"
        onMouseEnter={() => setIsVisible(true)}
      >
      {/* Top Banner */}
      <div className="bg-orange-600 text-white text-[11px] sm:text-xs py-1.5 px-4 text-center font-bold tracking-wider uppercase flex items-center justify-center gap-2 overflow-hidden h-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={promoIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-2"
          >
            <span>⚡ {PROMO_MESSAGES[promoIndex]}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo */}
          <button
            type="button"
            onClick={() => setActiveTab('inicio')}
            className="flex items-center justify-center focus:outline-none cursor-pointer h-full py-1.5 shrink-0 transition-transform active:scale-95"
            id="header-logo-btn"
            aria-label="Ir a inicio de Uniformes PRE"
          >
            <img
              src={brandLogo || LOGO_PRE_URL}
              alt="Uniformes PRE - Uniformes de Alto Rendimiento"
              className="h-14 sm:h-20 md:h-22 max-h-[84px] w-auto object-contain transition-transform duration-200 hover:scale-105"
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (e.currentTarget.src !== LOGO_PRE_URL) {
                  e.currentTarget.src = LOGO_PRE_URL;
                }
              }}
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1.5 lg:space-x-3" id="desktop-nav" aria-label="Navegación principal">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 text-xs lg:text-sm font-bold uppercase tracking-wider rounded-lg cursor-pointer transition-all duration-150 select-none active:scale-95 ${
                    isActive
                      ? 'text-white border-2 border-white/90 bg-white/10 shadow-sm'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">

            {/* Favorites Button */}
            <button
              type="button"
              onClick={() => setIsFavoritesOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-white/15 text-white/85 hover:text-orange-400 transition-colors focus:outline-none cursor-pointer active:scale-90"
              aria-label="Ver lista de favoritos"
              id="favorites-toggle-btn"
              title="Mis favoritos guardados"
            >
              <Heart className={`h-5 sm:h-6 w-5 sm:w-6 transition-transform group-hover:scale-110 ${favorites.length > 0 ? 'fill-orange-500 text-orange-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-bold text-white ring-2 ring-brand-navy">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:p-2.5 rounded-full hover:bg-white/15 text-white/85 hover:text-orange-400 transition-colors focus:outline-none cursor-pointer active:scale-90"
              aria-label="Ver cotización actual"
              id="cart-toggle-btn"
              title="Mi cotización"
            >
              <ShoppingCart className="h-5 sm:h-6 w-5 sm:w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white ring-2 ring-brand-navy animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <MobileNavMenu
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                navItems={navItems}
                setIsCartOpen={setIsCartOpen}
                setIsFavoritesOpen={setIsFavoritesOpen}
                cartCount={cartCount}
                favoritesCount={favorites.length}
                setFilterCategory={setFilterCategory}
                theme={theme}
                setTheme={setTheme}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.header>
    </>
  );
}

// Enhanced Mobile Navigation Drawer
interface MobileNavMenuProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  navItems: { id: ActiveTab; label: string }[];
  setIsCartOpen: (open: boolean) => void;
  setIsFavoritesOpen: (open: boolean) => void;
  cartCount: number;
  favoritesCount: number;
  setFilterCategory?: (category: string) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

function MobileNavMenu({
  activeTab,
  setActiveTab,
  navItems,
  setIsCartOpen,
  setIsFavoritesOpen,
  cartCount,
  favoritesCount,
  setFilterCategory,
  theme,
  setTheme,
}: MobileNavMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const categories = [
    { id: 'hoteleria', label: 'Hotelería' },
    { id: 'restaurante', label: 'Restaurante' },
    { id: 'medico', label: 'Médico' },
    { id: 'ejecutivo', label: 'Ejecutivo' },
    { id: 'industrial', label: 'Industria' },
  ];

  const handleCategoryClick = (catId: string) => {
    if (setFilterCategory) setFilterCategory(catId);
    setActiveTab('catalogo');
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer active:scale-95"
        aria-label="Abrir menú de navegación móvil"
        aria-expanded={isOpen}
        id="mobile-menu-toggle"
      >
        {isOpen ? <X className="h-6 w-6 text-orange-400" /> : <Menu className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 cursor-pointer"
            />

            {/* Slide Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-brand-navy border-l border-white/15 z-50 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto text-white"
              id="mobile-drawer-panel"
            >
              <div className="space-y-6">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="font-display text-2xl tracking-wider text-white">
                    UNIFORMES <span className="text-orange-500">PRE</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
                    aria-label="Cerrar menú"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Primary Nav Links */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold block mb-2 px-2">
                    Navegación
                  </span>
                  {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-between ${
                          isActive
                            ? 'bg-orange-600 text-white shadow-md'
                            : 'text-white/85 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && <span className="text-xs">●</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Quick Categories list */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold block px-2">
                    Catálogos Rápidos
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleCategoryClick(cat.id)}
                        className="p-2.5 rounded-lg bg-white/5 hover:bg-white/15 text-left text-xs text-white/80 hover:text-white font-medium transition-colors cursor-pointer border border-white/5"
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shortcuts for Cart and Favorites */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold block px-2">
                    Mi Lista
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        setIsCartOpen(true);
                      }}
                      className="flex-1 p-3 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <ShoppingCart className="h-4 w-4 text-orange-400" />
                      <span>Cotización ({cartCount})</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        setIsFavoritesOpen(true);
                      }}
                      className="flex-1 p-3 rounded-xl bg-white/10 hover:bg-white/15 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <Heart className="h-4 w-4 text-orange-400" />
                      <span>Favoritos ({favoritesCount})</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom footer in drawer */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <a
                  href="https://wa.me/529989370850"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                >
                  WhatsApp: 998 937 0850
                </a>
                <p className="text-[10px] text-center text-white/70 leading-relaxed">
                  SM 92 MEGA Soriana López Portillo, Cancún, Q.R. <br />
                  Tel: 998 937 0850 • 998 341 5683
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

