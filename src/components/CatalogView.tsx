import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Star, Heart, RefreshCcw, ArrowRight, Check, ChevronLeft, ChevronRight, SearchX, AlertCircle, Sparkles, CameraOff, X } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, CATEGORIES, getCategoryName, MANTELERIA_GALLERY, TAPICERIA_GALLERY } from '../data';
// @ts-ignore
import poloMarino from '../assets/images/polo_marino.webp';
// @ts-ignore
import unifromes02 from '../../imaganes/UNIFROMES-02.png';

// Helper to normalize strings (remove accents, lowercase, trim)
const normalizeSearchStr = (text: string): string =>
  (text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

// Extract clean words from text
const extractWords = (text: string): string[] =>
  normalizeSearchStr(text)
    .split(/[^a-z0-9]+/i)
    .filter(Boolean);

const RESTAURANTE_PRIORITY_ORDER: Record<string, number> = {
  // 1. Filipinas
  'filipina-gabardina-antifluido': 1,
  'filipina-cocina-mc-gab': 2,
  'filipina-cocina-ml-gab': 3,
  'filipina-cocina-ml-brooklyn': 4,
  // 2. Mandiles
  'mandiles-de-peto': 5,
  'mandiles-largos': 6,
  'mandil-corto': 7,
  // 3. Cofias / Gorros de cocina
  'gorros-de-cocina': 8,
  // 4. Zapatos de cocina
  'zapatos-alina': 9,
  'zapatos-pegaso': 10,
  'zapatos-cocina-big-apple': 11,
  // 5. Cazadoras y demás productos (ambas cazadoras en la misma página)
  'cazadora-manga-corta': 12,
  'cazadora-manga-larga': 13,
};

interface CatalogViewProps {
  onViewProduct: (product: Product) => void;
  favorites: Product[];
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, size?: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
}

export default function CatalogView({
  onViewProduct,
  favorites,
  onToggleFavorite,
  onAddToCart,
  filterCategory,
  setFilterCategory,
}: CatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [selectedLightboxImage, setSelectedLightboxImage] = useState<string | null>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      categoryScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const itemsPerPage = 6;

  // Reset page when category or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory, searchQuery]);

  // High-precision search filter algorithm
  const filteredProducts = useMemo(() => {
    const rawQuery = searchQuery.trim();
    const queryTokens = extractWords(rawQuery);

    return PRODUCTS.filter((product) => {
      // 1. Category match
      const matchesCategory =
        filterCategory === 'todos'
          ? true
          : filterCategory === 'top-ventas'
            ? !!(product.image && product.image.trim() !== '')
            : product.category === filterCategory;
      if (!matchesCategory) return false;

      // If no search query, return category match
      if (queryTokens.length === 0) return true;

      // Extract indexed fields for accurate matching
      const nameWords = extractWords(product.name);
      const codeNorm = normalizeSearchStr(product.code);
      const categoryNameWords = extractWords(getCategoryName(product.category));
      const colorWords = (product.colors || []).flatMap((c) => extractWords(c.name));
      const compWords = extractWords(product.composition || '');
      const descWords = extractWords(product.description || '');
      const featWords = (product.features || []).flatMap((f) => extractWords(f));

      // Check that EVERY search token matches a meaningful product attribute
      return queryTokens.every((token) => {
        // Direct code match (e.g., MED001, POL001)
        if (codeNorm.includes(token)) return true;

        // Category name match (e.g., "medico", "restaurante")
        if (categoryNameWords.some((w) => w === token || (token.length >= 4 && w.startsWith(token)))) {
          return true;
        }

        // Product Name match (exact word or prefix if token is >= 3 chars, e.g., "zapat" -> "zapatos")
        if (nameWords.some((w) => w === token || (token.length >= 3 && (w.startsWith(token) || token.startsWith(w))))) {
          return true;
        }

        // Color match (e.g., "azul", "marino", "blanco", "negro")
        if (colorWords.some((w) => w === token || (token.length >= 4 && w.startsWith(token)))) {
          return true;
        }

        // Composition / fabric match (e.g., "algodon", "poliester", "microfibra")
        if (compWords.some((w) => w === token)) {
          return true;
        }

        // Description / features: EXACT whole-word matching ONLY
        // (prevents substrings like "pene" matching "penetración" or "tila" matching "ventilación")
        if (descWords.some((w) => w === token)) {
          return true;
        }

        if (featWords.some((w) => w === token)) {
          return true;
        }

        return false;
      });
    }).sort((a, b) => {
      if (filterCategory === 'restaurante') {
        const orderA = RESTAURANTE_PRIORITY_ORDER[a.id] ?? 999;
        const orderB = RESTAURANTE_PRIORITY_ORDER[b.id] ?? 999;
        return orderA - orderB;
      }
      const aHasImg = a.image && a.image.trim() !== '' ? 1 : 0;
      const bHasImg = b.image && b.image.trim() !== '' ? 1 : 0;
      return bHasImg - aHasImg;
    });
  }, [searchQuery, filterCategory]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleQuickAdd = (product: Product) => {
    if (product.hasCorteSelection) {
      onViewProduct(product);
      return;
    }
    const size = product.id.includes('zapato') ? undefined : 'M';
    onAddToCart(product, 1, size);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  };

  return (
    <div className="space-y-12 pb-16 animate-fade-in" id="catalog-view">
      {/* ==========================================
          CATALOG HEADER
          ========================================== */}
      <section className="relative bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Background photo with 50% opacity and seamless blending */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src={unifromes02}
            alt="Fondo UNIFORMES PRE"
            className="w-full h-full object-cover object-center opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/20 to-slate-950" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wider">
            NUESTRO CATÁLOGO
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed">
            Uniformes que se adaptan a cada industria. Diseñamos y confeccionamos uniformes para empresas de todo México, combinando funcionalidad, imagen y calidad en cada prenda. Desde hotelería y gastronomía hasta corporativos, industria, retail y servicios.
          </p>
        </div>
      </section>

      {/* ==========================================
          FILTERS & SEARCH BAR
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm">
          {/* Category Chip List with Lateral Scrolling Controls */}
          <div className="relative flex-1 min-w-0 flex items-center gap-1.5 sm:gap-2">
            {/* Scroll Left Button */}
            <button
              type="button"
              onClick={() => scrollCategories('left')}
              className="p-1.5 sm:p-2 rounded-full bg-slate-950/80 hover:bg-orange-600 text-slate-400 hover:text-white border border-slate-800 hover:border-orange-500 transition-all cursor-pointer shrink-0 shadow-sm"
              aria-label="Desplazar categorías a la izquierda"
              title="Desplazar a la izquierda"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Scrollable Container with Custom Lateral Scrollbar */}
            <div
              ref={categoryScrollRef}
              className="flex items-center gap-2 overflow-x-auto horizontal-category-scrollbar py-2 px-1 scroll-smooth w-full"
              id="category-chips"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    filterCategory === cat.id
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 ring-1 ring-orange-400/50 scale-[1.02]'
                      : 'bg-slate-850 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/80 hover:border-slate-700'
                  }`}
                  id={`chip-${cat.id}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Scroll Right Button */}
            <button
              type="button"
              onClick={() => scrollCategories('right')}
              className="p-1.5 sm:p-2 rounded-full bg-slate-950/80 hover:bg-orange-600 text-slate-400 hover:text-white border border-slate-800 hover:border-orange-500 transition-all cursor-pointer shrink-0 shadow-sm"
              aria-label="Desplazar categorías a la derecha"
              title="Desplazar a la derecha"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar polo, chef, bota..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 pl-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
              id="catalog-search-input"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-white font-medium"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Search feedback */}
        {searchQuery.trim() && filteredProducts.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900/80 border border-slate-800 px-4 py-2.5 rounded-lg text-xs">
            <p className="text-slate-300">
              Mostrando <strong className="text-orange-400 font-bold">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'producto encontrado' : 'productos encontrados'} para <span className="text-white font-semibold">"{searchQuery}"</span>
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterCategory('todos');
              }}
              className="text-orange-400 hover:text-orange-300 font-medium inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RefreshCcw className="h-3 w-3" /> Limpiar búsqueda
            </button>
          </div>
        )}
      </section>

      {/* ==========================================
          PRODUCT GRID
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filterCategory === 'manteleria' ? (
          <div className="space-y-8 animate-fade-in" id="gallery-manteleria">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Trabajos Especiales de Mantelería</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-wider leading-tight">
                Cotice su mantelería personalizada, contamos con diversos modelos y telas a su disposición
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
                Confección de manteles, caminos de mesa, servilletas y cubresillas para hoteles, restaurantes y eventos exclusivos en Cancún y la Riviera Maya.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/529989370850?text=${encodeURIComponent('Hola, me gustaría cotizar mantelería personalizada con Uniformes PRE Cancún.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-600/30 cursor-pointer"
                >
                  <span>Cotizar Mantelería por WhatsApp</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {MANTELERIA_GALLERY.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedLightboxImage(imgUrl)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-orange-500 transition-all shadow-md cursor-pointer"
                >
                  <img
                    src={imgUrl}
                    alt={`Mantelería Personalizada ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Ver foto ampliada →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filterCategory === 'tapiceria' ? (
          <div className="space-y-8 animate-fade-in" id="gallery-tapiceria">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Servicio Profesional de Tapicería</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-wider leading-tight">
                Conoce nuestro trabajo de tapicería
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
                Retapizamos y restauramos tus muebles, renovamos y transformamos mobiliario para hoteles, restaurantes, oficinas y espacios comerciales, utilizando materiales de alta resistencia y acabados adaptados a cada proyecto.
              </p>
              <div className="pt-2">
                <a
                  href={`https://wa.me/529989370850?text=${encodeURIComponent('Hola, me gustaría cotizar un trabajo de tapicería con Uniformes PRE Cancún.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-600/30 cursor-pointer"
                >
                  <span>Cotizar Tapicería por WhatsApp</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {TAPICERIA_GALLERY.map((imgUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedLightboxImage(imgUrl)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 hover:border-orange-500 transition-all shadow-md cursor-pointer"
                >
                  <img
                    src={imgUrl}
                    alt={`Trabajo de Tapicería ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Ver foto ampliada →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-6 bg-slate-900/90 rounded-2xl border border-slate-800 max-w-2xl mx-auto space-y-6 shadow-xl animate-fade-in" id="no-products-notice">
            <div className="w-16 h-16 rounded-full bg-slate-800/90 border border-slate-700/80 flex items-center justify-center mx-auto text-orange-500 shadow-inner">
              <SearchX className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[11px] font-bold uppercase tracking-wider rounded-full">
                <AlertCircle className="h-3.5 w-3.5" />
                Sin coincidencias en catálogo
              </span>
              <h3
                className="font-bold text-white text-xl sm:text-2xl tracking-tight [font-family:Verdana,Geneva,sans-serif]"
                style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}
              >
                {searchQuery.trim()
                  ? `No se tiene ningún producto con el nombre "${searchQuery}"`
                  : 'No se encontraron productos en esta categoría'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                {searchQuery.trim()
                  ? 'No disponemos de uniformes, calzado o prendas que coincidan con este término. Revisa la búsqueda o prueba con una de las opciones sugeridas:'
                  : 'Prueba seleccionando otra categoría o limpiando los filtros para ver la colección completa.'}
              </p>
            </div>

            {/* Quick suggested searches */}
            {searchQuery.trim() && (
              <div className="space-y-2 pt-1">
                <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                  Búsquedas recomendadas:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
                  {[
                    { label: '🩺 Pijamas Médicas', term: 'pijama medica', cat: 'medico' },
                    { label: '👟 Zapatos Médicos', term: 'zapatos', cat: 'medico' },
                    { label: '👨‍🍳 Filipinas Chef', term: 'chef', cat: 'restaurante' },
                    { label: '👕 Playeras Polo', term: 'polo', cat: 'todos' },
                    { label: '🛡️ Botas Industriales', term: 'bota', cat: 'industrial' },
                    { label: '🧵 Mantelería', term: 'mantel', cat: 'manteleria' }
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setSearchQuery(item.term);
                        setFilterCategory(item.cat);
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-orange-600/20 text-slate-300 hover:text-orange-400 border border-slate-700 hover:border-orange-500/40 rounded-full text-xs font-medium transition-all cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterCategory('todos');
                }}
                className="inline-flex items-center gap-2 py-2.5 px-6 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-orange-600/25 hover:shadow-orange-600/40 cursor-pointer"
              >
                <RefreshCcw className="h-3.5 w-3.5" />
                Ver todo el catálogo
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filterCategory === 'top-ventas' && (
              <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-900 border border-orange-500/30 rounded-2xl flex items-center gap-4 animate-fade-in">
                <div className="p-3 bg-orange-600 text-white rounded-xl shadow-lg shadow-orange-600/30">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-orange-400">Modelos Destacados</span>
                  <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wide">SECCIÓN TOP VENTAS</h2>
                  <p className="text-xs text-slate-300">Colección de uniformes y prendas con catálogo fotográfico oficial disponible.</p>
                </div>
              </div>
            )}

            {filterCategory === 'todos' && !searchQuery.trim() && (
              <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-950/30 via-slate-900 to-slate-900 border border-orange-500/25 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-orange-600/20 text-orange-400 border border-orange-500/30 rounded-xl">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-orange-400">Colección Más Solicitada</span>
                    <h3 className="font-display text-lg sm:text-xl text-white tracking-wide">SECCIÓN TOP VENTAS</h3>
                    <p className="text-xs text-slate-300">Explora todos los modelos más vendidos con catálogo fotográfico completo.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setFilterCategory('top-ventas')}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-orange-600/20 cursor-pointer shrink-0"
                >
                  Ver Top Ventas →
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="product-catalog-grid">
            {paginatedProducts.map((product) => {
              const isFav = favorites.some((fav) => fav.id === product.id);
              const isAdded = addedProductId === product.id;

              return (
                <div
                  key={product.id}
                  className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-750 transition-all flex flex-col group relative"
                >
                  {/* Card Image Wrapper */}
                  <div 
                    onClick={() => onViewProduct(product)}
                    className="relative aspect-square overflow-hidden bg-slate-950 flex items-center justify-center cursor-pointer"
                  >
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          if (product.image && e.currentTarget.src !== product.image) {
                            e.currentTarget.src = product.image;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 p-6 text-center border border-slate-800/80">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400 mb-2.5 shadow-inner group-hover:border-orange-500/50 group-hover:text-orange-400 transition-colors">
                          <CameraOff className="w-6 h-6 stroke-[1.5]" />
                        </div>
                        <span className="text-xs font-semibold text-slate-300 tracking-wide font-sans">
                          Sin fotografía
                        </span>
                        <span className="text-[10px] text-slate-500 mt-0.5 max-w-[130px] leading-tight">
                          Disponible próximamente
                        </span>
                      </div>
                    )}

                    {/* Badge top-left */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                      {product.isNew && (
                        <span className="bg-orange-600 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow">
                          Nuevo
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="bg-amber-500 text-slate-950 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow">
                          Top Ventas
                        </span>
                      )}
                    </div>

                    {/* Favorites Circle toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product);
                      }}
                      className={`absolute top-4 right-4 p-2 rounded-full border shadow focus:outline-none transition-colors cursor-pointer z-10 ${
                        isFav
                          ? 'bg-orange-950/80 border-orange-500/50 text-orange-500'
                          : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:text-white'
                      }`}
                      aria-label="Agregar a favoritos"
                    >
                      <Heart className={`h-4.5 w-4.5 ${isFav ? 'fill-orange-500' : ''}`} />
                    </button>
                  </div>

                  {/* Info details */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-orange-500">
                          {getCategoryName(product.category)}
                        </span>
                      </div>
                      <h3
                        onClick={() => onViewProduct(product)}
                        className="font-bold text-white text-base truncate group-hover:text-orange-500 transition-colors cursor-pointer"
                        style={{ fontFamily: 'Verdana, sans-serif' }}
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Features checklist snippet */}
                    <div className="space-y-1 pt-1">
                      {product.features.slice(0, 2).map((feat, i) => (
                        <span key={i} className="block text-[10px] text-slate-500">
                          ✓ {feat}
                        </span>
                      ))}
                    </div>

                    {/* CTA Bottom Row */}
                    <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 mt-auto">
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] text-slate-500 font-mono">Desde:</span>
                        <span className="font-mono text-base font-bold text-white">
                          ${product.priceTiers ? (product.priceTiers['51+'] ?? product.priceTiers['300+'] ?? product.price).toFixed(2) : product.price.toFixed(2)}
                        </span>
                        <span className="text-[8px] text-slate-400 uppercase tracking-wider">Mayoreo Neto</span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => onViewProduct(product)}
                          className="py-2 px-3 rounded border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                        >
                          Ficha
                        </button>
                        <button
                          onClick={() => handleQuickAdd(product)}
                          disabled={isAdded}
                          className={`py-2 px-4 rounded font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-600 text-white'
                              : 'bg-orange-600 hover:bg-orange-700 text-white'
                          }`}
                        >
                          {isAdded ? '✓ LISTO' : 'COTIZAR'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        )}
      </section>

      {/* ==========================================
          PAGINATION CONTROLS
          ========================================== */}
      {filteredProducts.length > 0 && (
        <section className="flex items-center justify-center gap-2 sm:gap-4 max-w-7xl mx-auto px-4" id="pagination">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-2 min-w-[36px] rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-center font-bold"
            aria-label="Ir al inicio del catálogo"
            title="Ir a la primera página"
          >
            «
          </button>
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 min-w-[36px] rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-center"
            aria-label="Página anterior"
            title="Página anterior"
          >
            ←
          </button>
          <span className="text-xs text-slate-400 font-mono px-1">
            Página <strong className="text-white font-bold">{currentPage}</strong> de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 min-w-[36px] rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-center"
            aria-label="Página siguiente"
            title="Página siguiente"
          >
            →
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 min-w-[36px] rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-center font-bold"
            aria-label="Ir al final del catálogo"
            title="Ir a la última página"
          >
            »
          </button>
        </section>
      )}

      {/* Lightbox Modal for Gallery Photos */}
      {selectedLightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedLightboxImage(null)}
        >
          <button
            onClick={() => setSelectedLightboxImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-orange-600 transition-colors cursor-pointer border border-slate-700 z-10"
            aria-label="Cerrar imagen"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedLightboxImage}
              alt="Trabajo de confección PRE"
              className="w-full h-full max-h-[85vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
