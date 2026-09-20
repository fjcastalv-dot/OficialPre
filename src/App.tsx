import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import CatalogView from './components/CatalogView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import NotFoundView from './components/NotFoundView';
import ClubPREModal from './components/ClubPREModal';
import ProductDetailModal from './components/ProductDetailModal';
import FavoritesDrawer from './components/FavoritesDrawer';
import QuoteCartDrawer from './components/QuoteCartDrawer';
import WhatsAppWidget from './components/WhatsAppWidget';
import ScrollToTop from './components/ScrollToTop';
import CookieBanner from './components/CookieBanner';
import LegalDocsModal from './components/LegalDocsModal';
import RequerimientosModal from './components/RequerimientosModal';
import { ActiveTab, CartItem, Product } from './types';
import { PRODUCTS } from './data';
import { trackPageView, trackEvent } from './analytics';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isClubModalOpen, setIsClubModalOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'returns'>('privacy');
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);
  const [requirementsTab, setRequirementsTab] = useState<'bordado' | 'sublimado'>('bordado');
  const [filterCategory, setFilterCategory] = useState<string>('todos');

  // Enforce light theme across the site
  useEffect(() => {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    localStorage.setItem('pre_theme', 'light');
  }, []);

  // Load saved cart & favorites from localStorage
  useEffect(() => {
    const cachedCart = localStorage.getItem('pre_cart');
    if (cachedCart) {
      try {
        setCart(JSON.parse(cachedCart));
      } catch (e) {
        console.error('Error parsing cart from storage', e);
      }
    }

    const cachedFavs = localStorage.getItem('pre_favorites');
    if (cachedFavs) {
      try {
        setFavorites(JSON.parse(cachedFavs));
      } catch (e) {
        console.error('Error parsing favorites from storage', e);
      }
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('pre_cart', JSON.stringify(newCart));
  };

  // Save favorites to localStorage
  const saveFavorites = (newFavs: Product[]) => {
    setFavorites(newFavs);
    localStorage.setItem('pre_favorites', JSON.stringify(newFavs));
  };

  // ==========================================
  // URL ROUTING & HISTORY SYNCHRONIZATION
  // ==========================================
  const parseUrl = useCallback(() => {
    const hash = window.location.hash.replace(/^#\/?/, '').trim();

    if (!hash || hash === 'inicio') {
      return { tab: 'inicio' as ActiveTab, category: 'todos', product: null };
    }

    if (hash.startsWith('catalogo')) {
      const [pathPart, queryPart] = hash.split('?');
      const segments = pathPart.split('/').filter(Boolean);
      const prodCodeOrId = segments.length > 1 ? segments[1] : null;

      let matchedProduct: Product | null = null;
      if (prodCodeOrId) {
        matchedProduct =
          PRODUCTS.find(
            (p) =>
              p.id.toLowerCase() === prodCodeOrId.toLowerCase() ||
              p.code.toLowerCase() === prodCodeOrId.toLowerCase()
          ) || null;
      }

      let cat = 'todos';
      if (queryPart) {
        const params = new URLSearchParams(queryPart);
        if (params.has('categoria')) {
          cat = params.get('categoria')!;
        }
      }

      return { tab: 'catalogo' as ActiveTab, category: cat, product: matchedProduct };
    }

    if (hash === 'quienes-somos') {
      return { tab: 'quienes-somos' as ActiveTab, category: 'todos', product: null };
    }

    if (hash === 'contacto') {
      return { tab: 'contacto' as ActiveTab, category: 'todos', product: null };
    }

    if (hash === 'privacidad') {
      return { tab: 'inicio' as ActiveTab, category: 'todos', product: null, openPrivacy: true };
    }

    if (hash === 'terminos') {
      return { tab: 'inicio' as ActiveTab, category: 'todos', product: null, openTerms: true };
    }

    // Unrecognized route
    return { tab: '404' as ActiveTab, category: 'todos', product: null };
  }, []);

  // Sync on initial load and on popstate/hashchange
  useEffect(() => {
    const handleLocationChange = () => {
      const { tab, category, product, openPrivacy, openTerms } = parseUrl();
      setActiveTab(tab);
      if (category) setFilterCategory(category);
      if (product) setSelectedProduct(product);
      if (openPrivacy) {
        setLegalModalTab('privacy');
        setIsLegalModalOpen(true);
      }
      if (openTerms) {
        setLegalModalTab('terms');
        setIsLegalModalOpen(true);
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [parseUrl]);

  // Navigate function that updates both state and URL
  const navigateToTab = (tab: ActiveTab, category?: string) => {
    setActiveTab(tab);
    if (tab === 'inicio') {
      window.location.hash = '#inicio';
    } else if (tab === 'catalogo') {
      const cat = category || filterCategory;
      window.location.hash = cat && cat !== 'todos' ? `#catalogo?categoria=${cat}` : '#catalogo';
    } else if (tab === 'quienes-somos') {
      window.location.hash = '#quienes-somos';
    } else if (tab === 'contacto') {
      window.location.hash = '#contacto';
    } else if (tab === '404') {
      window.location.hash = '#404';
    }
  };

  // Dynamic Meta Titles and SEO per page
  useEffect(() => {
    let title = 'Uniformes PRE | Uniformes de Alto Rendimiento en Cancún';
    let desc = 'Uniformes de alto rendimiento en Cancún y la Riviera Maya. Confección certificada, bordados y sublimados de alta definición.';

    if (selectedProduct) {
      title = `${selectedProduct.name} | Uniformes PRE Cancún`;
      desc = selectedProduct.description;
    } else if (activeTab === 'inicio') {
      title = 'Uniformes PRE | Uniformes de Alto Rendimiento en Cancún y Riviera Maya';
      desc = 'Vistiendo al Caribe Mexicano con uniformes corporativos, hoteleros, médicos e industriales. Telas a prueba de sudor.';
    } else if (activeTab === 'catalogo') {
      title = `Catálogo de Uniformes ${filterCategory !== 'todos' ? `- ${filterCategory.toUpperCase()}` : ''} | Uniformes PRE`;
      desc = 'Explora nuestro catálogo mayorista de uniformes con tablas de precios con IVA y personalización de bordados.';
    } else if (activeTab === 'quienes-somos') {
      title = 'Quiénes Somos | 13 Años Vistiendo al Caribe Mexicano | Uniformes PRE';
      desc = 'Conoce nuestra historia, planta de confección y capacidad de maquila textil en Cancún, Quintana Roo.';
    } else if (activeTab === 'contacto') {
      title = 'Contacto y Sucursal Cancún | Uniformes PRE (Mega Soriana)';
      desc = 'Visítanos en Av. López Portillo o cotiza vía WhatsApp. Atención inmediata para empresas en Cancún y Riviera Maya.';
    } else if (activeTab === '404') {
      title = '404 Página no encontrada | Uniformes PRE';
      desc = 'La página o producto solicitado no se encuentra disponible.';
    }

    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }

    trackPageView(title, window.location.hash || '/');
  }, [activeTab, selectedProduct, filterCategory]);

  // Cart Management
  const handleAddToCart = (
    product: Product,
    quantity: number,
    size?: string,
    color?: string,
    hasChestEmbroidery?: boolean,
    hasBackEmbroidery?: boolean,
    corte?: string,
    manga?: string
  ) => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.size === size &&
        item.color === color &&
        item.corte === corte &&
        item.manga === manga &&
        Boolean(item.hasChestEmbroidery) === Boolean(hasChestEmbroidery) &&
        Boolean(item.hasBackEmbroidery) === Boolean(hasBackEmbroidery)
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      saveCart(updated);
    } else {
      saveCart([
        ...cart,
        {
          product,
          quantity,
          size,
          color,
          corte,
          manga,
          hasChestEmbroidery: Boolean(hasChestEmbroidery),
          hasBackEmbroidery: Boolean(hasBackEmbroidery),
        },
      ]);
    }

    trackEvent('add_to_cart', {
      product_id: product.id,
      name: product.name,
      quantity,
    });
  };

  const handleUpdateQuantity = (
    productId: string,
    quantity: number,
    size?: string,
    color?: string,
    hasChestEmbroidery?: boolean,
    hasBackEmbroidery?: boolean,
    corte?: string,
    manga?: string
  ) => {
    const updated = cart.map((item) => {
      if (
        item.product.id === productId &&
        item.size === size &&
        item.color === color &&
        item.corte === corte &&
        item.manga === manga &&
        Boolean(item.hasChestEmbroidery) === Boolean(hasChestEmbroidery) &&
        Boolean(item.hasBackEmbroidery) === Boolean(hasBackEmbroidery)
      ) {
        return { ...item, quantity };
      }
      return item;
    });
    saveCart(updated);
  };

  const handleRemoveItem = (
    productId: string,
    size?: string,
    color?: string,
    hasChestEmbroidery?: boolean,
    hasBackEmbroidery?: boolean,
    corte?: string,
    manga?: string
  ) => {
    const updated = cart.filter(
      (item) =>
        !(
          item.product.id === productId &&
          item.size === size &&
          item.color === color &&
          item.corte === corte &&
          item.manga === manga &&
          Boolean(item.hasChestEmbroidery) === Boolean(hasChestEmbroidery) &&
          Boolean(item.hasBackEmbroidery) === Boolean(hasBackEmbroidery)
        )
    );
    saveCart(updated);
    trackEvent('remove_from_cart', { product_id: productId });
  };

  const handleClearCart = () => {
    saveCart([]);
    trackEvent('clear_cart');
  };

  // Favorites Management
  const handleToggleFavorite = (product: Product) => {
    const isFav = favorites.some((fav) => fav.id === product.id);
    if (isFav) {
      saveFavorites(favorites.filter((fav) => fav.id !== product.id));
    } else {
      saveFavorites([...favorites, product]);
      trackEvent('toggle_favorite', { product_id: product.id, name: product.name });
    }
  };

  const handleRemoveFavorite = (product: Product) => {
    saveFavorites(favorites.filter((fav) => fav.id !== product.id));
  };

  // View Detail & URL updating
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    window.location.hash = `#catalogo/${product.id}`;
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
    if (window.location.hash.includes(selectedProduct?.id || '')) {
      window.location.hash = filterCategory !== 'todos' ? `#catalogo?categoria=${filterCategory}` : '#catalogo';
    }
  };

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-orange-600 selection:text-white">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={navigateToTab}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        favorites={favorites}
        setIsFavoritesOpen={setIsFavoritesOpen}
        theme={theme}
        setTheme={setTheme}
        setFilterCategory={(cat) => {
          setFilterCategory(cat);
          navigateToTab('catalogo', cat);
        }}
      />

      {/* Main View Router */}
      <main className="flex-1" id="main-content">
        {activeTab === 'inicio' && (
          <HomeView
            setActiveTab={navigateToTab}
            onViewProduct={handleViewProduct}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            setFilterCategory={(cat) => {
              setFilterCategory(cat);
              navigateToTab('catalogo', cat);
            }}
            theme={theme}
            onOpenRequirements={(tab = 'bordado') => {
              setRequirementsTab(tab);
              setIsRequirementsModalOpen(true);
            }}
          />
        )}

        {activeTab === 'catalogo' && (
          <CatalogView
            onViewProduct={handleViewProduct}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            filterCategory={filterCategory}
            setFilterCategory={(cat) => {
              setFilterCategory(cat);
              window.location.hash = cat !== 'todos' ? `#catalogo?categoria=${cat}` : '#catalogo';
            }}
          />
        )}

        {activeTab === 'quienes-somos' && (
          <AboutView setActiveTab={navigateToTab} />
        )}

        {activeTab === 'contacto' && (
          <ContactView theme={theme} />
        )}

        {activeTab === '404' && (
          <NotFoundView
            setActiveTab={navigateToTab}
            setFilterCategory={(cat) => {
              setFilterCategory(cat);
              navigateToTab('catalogo', cat);
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={navigateToTab}
        openClubModal={() => setIsClubModalOpen(true)}
      />

      {/* Scroll to Top Floating Button */}
      <ScrollToTop />

      {/* WhatsApp Floating Chat Bubble widget */}
      <WhatsAppWidget />

      {/* Cookie Consent Banner */}
      <CookieBanner
        onOpenPrivacy={() => {
          setLegalModalTab('privacy');
          setIsLegalModalOpen(true);
        }}
      />

      {/* ==========================================
          OVERLAYS & MODALS
          ========================================== */}
      
      {/* Club PRE Membership Modal */}
      <ClubPREModal
        isOpen={isClubModalOpen}
        onClose={() => setIsClubModalOpen(false)}
      />

      {/* Legal Documents Modal */}
      <LegalDocsModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
      />

      {/* Requirements Modal (Bordado & Sublimado) */}
      <RequerimientosModal
        isOpen={isRequirementsModalOpen}
        onClose={() => setIsRequirementsModalOpen(false)}
        initialTab={requirementsTab}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={handleCloseProductModal}
        onAddToCart={handleAddToCart}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Favorites Sidebar Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
        onAddToCart={handleAddToCart}
        onViewProduct={(product) => {
          setIsFavoritesOpen(false);
          handleViewProduct(product);
        }}
      />

      {/* Quote Cart Sidebar Drawer */}
      <QuoteCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
