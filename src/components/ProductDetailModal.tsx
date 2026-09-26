import React, { useState, useEffect } from 'react';
import { X, Heart, Star, ShoppingCart, Shield, Sparkles, Check, CheckCircle, ChevronLeft, ChevronRight, CameraOff } from 'lucide-react';
import { Product } from '../types';
import { getProductTierPrice, getChestEmbroideryPrice, getBackEmbroideryPrice, formatCurrency } from '../utils';
import { getCategoryName } from '../data';
import { trackEvent } from '../analytics';
// @ts-ignore
import modalImageOverride from '../assets/images/regenerated_image_1784173326790.png';
// @ts-ignore
import poloBlanco from '../assets/images/polo_blanco.webp';
// @ts-ignore
import poloCarbon from '../assets/images/polo_carbon.webp';
// @ts-ignore
import poloLimon from '../assets/images/polo_limon.webp';
// @ts-ignore
import poloMarino from '../assets/images/polo_marino.webp';
// @ts-ignore
import poloNaranja from '../assets/images/polo_naranja.webp';
// @ts-ignore
import poloRojo from '../assets/images/polo_rojo.webp';
// @ts-ignore
import poloTurquesa from '../assets/images/polo_turquesa.webp';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    size?: string,
    color?: string,
    hasChestEmbroidery?: boolean,
    hasBackEmbroidery?: boolean,
    corte?: string,
    manga?: string
  ) => void;
  favorites: Product[];
  onToggleFavorite: (product: Product) => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  favorites,
  onToggleFavorite,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [selectedCorte, setSelectedCorte] = useState('Dama');
  const [selectedManga, setSelectedManga] = useState<'Manga Corta' | 'Manga Larga'>('Manga Corta');
  const [hasChestEmbroidery, setHasChestEmbroidery] = useState(false);
  const [hasBackEmbroidery, setHasBackEmbroidery] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      setQuantity(1);
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M');
      const initialColor = (() => {
        const list = (product.damaColors && product.damaColors.length > 0)
          ? product.damaColors
          : (product.colors || []);
        if (list.length === 0) return '';
        const withImg = list.find((c) => {
          if (product.id.startsWith('polo-dryfit')) {
            const n = c.name.toLowerCase();
            return n.includes('blanco') || n.includes('negro') || n.includes('marino') || n.includes('gris') || n.includes('oxford') || n.includes('carbón') || n.includes('carbon') || n.includes('naranja') || n.includes('rojo') || n.includes('verde agua') || n.includes('turquesa');
          }
          return !!c.image || (c.gallery && c.gallery.length > 0);
        });
        return withImg ? withImg.name : list[0].name;
      })();
      setSelectedColor(initialColor);
      setGalleryIndex(0);
      setSelectedCorte('Dama');
      setSelectedManga('Manga Corta');
      setHasChestEmbroidery(false);
      setHasBackEmbroidery(false);
      setSuccessMsg(false);
      trackEvent('view_item', { product_id: product.id, name: product.name, code: product.code });
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const isFavorite = favorites.some((fav) => fav.id === product.id);
  const showSizeSelector = product.sizes && product.sizes.length > 0 && product.sizes[0] !== 'Unitalla';
  const isShoe =
    product.id.startsWith('zapatos-') ||
    product.id.startsWith('bota-') ||
    product.id.startsWith('tenis-') ||
    product.code === 'ALINA' ||
    product.code === 'PEGASO' ||
    product.code.startsWith('BTC') ||
    product.name.toLowerCase().includes('zapato') ||
    product.name.toLowerCase().includes('bota') ||
    product.name.toLowerCase().includes('calzado') ||
    product.name.toLowerCase().includes('tenis');

  // Dynamic calculations based on utility helpers
  const displayQuantity = Math.max(1, quantity);
  const unitPrice = getProductTierPrice(product, displayQuantity);
  const chestEmbroideryPrice = !isShoe && hasChestEmbroidery ? getChestEmbroideryPrice(displayQuantity) : 0;
  const backEmbroideryPrice = !isShoe && hasBackEmbroidery ? getBackEmbroideryPrice(displayQuantity) : 0;
  const finalUnitPrice = unitPrice + chestEmbroideryPrice + backEmbroideryPrice;
  const totalPrice = finalUnitPrice * quantity;

  const handleAdd = () => {
    const finalQty = Math.max(1, quantity);
    onAddToCart(
      product,
      finalQty,
      showSizeSelector ? selectedSize : (product.sizes?.[0] || 'Unitalla'),
      selectedColor || undefined,
      !isShoe && hasChestEmbroidery,
      !isShoe && hasBackEmbroidery,
      (product.hasCorteSelection || product.id === 'polo-dryfit-caballero-dama') ? selectedCorte : undefined,
      product.hasMangaSelection ? selectedManga : undefined
    );
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      onClose();
    }, 1500);
  };

  const getColorFilter = (colorName: string): string => {
    const name = colorName.toLowerCase();
    if (name.includes('blanco')) {
      return 'saturate(0) brightness(1.65) contrast(0.95)';
    }
    if (name.includes('carbón') || name.includes('carbon') || name.includes('charcoal') || name.includes('negro') || name.includes('gris oscuro')) {
      return 'saturate(0) brightness(0.35) contrast(1.15)';
    }
    if (name.includes('rojo')) {
      return 'hue-rotate(200deg) saturate(1.6) brightness(0.75)';
    }
    if (name.includes('marino') || name.includes('navy') || name.includes('azul marino')) {
      return 'brightness(0.28) saturate(1.25)';
    }
    if (name.includes('naranja')) {
      return 'hue-rotate(235deg) saturate(1.8) brightness(1.05)';
    }
    if (name.includes('limón') || name.includes('limon') || name.includes('lime') || name.includes('verde limón') || name.includes('verde limon')) {
      return 'hue-rotate(130deg) saturate(2.4) brightness(1.15)';
    }
    if (name.includes('verde')) {
      return 'hue-rotate(105deg) saturate(1.3) brightness(0.85)';
    }
    if (name.includes('turquesa') || name.includes('turquoise') || name.includes('teal')) {
      return 'hue-rotate(300deg) saturate(1.55) brightness(1.02)';
    }
    if (name.includes('francia') || name.includes('azul francia')) {
      return 'none';
    }
    if (name.includes('gris')) {
      return 'saturate(0) brightness(0.8)';
    }
    return 'none';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" id="product-detail-modal">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col md:flex-row max-h-[95vh] md:max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer border border-slate-800"
          aria-label="Cerrar detalles de producto"
          id="close-detail-modal-btn"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Column: Product Image & Badges & Gallery */}
        <div className="w-full md:w-1/2 relative bg-slate-950 flex flex-col justify-between p-4 sm:p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-800">
          {(() => {
            const activeGallery: string[] = (() => {
              // 1. Dama corte gallery override if selected
              if (selectedCorte === 'Dama' && product.damaColors && product.damaColors.length > 0) {
                const damaObj = product.damaColors.find(
                  (c) => c.name.toLowerCase() === selectedColor.toLowerCase()
                ) || product.damaColors[0];
                if (damaObj?.gallery && damaObj.gallery.length > 0) {
                  return damaObj.gallery.filter(Boolean);
                }
                if (damaObj?.image) {
                  return [damaObj.image];
                }
              }

              // 2. Color-specific object
              const colorObj = product.colors?.find(
                (c) => c.name.toLowerCase() === selectedColor.toLowerCase()
              );
              if (colorObj?.gallery && colorObj.gallery.length > 0) {
                return colorObj.gallery.filter(Boolean);
              }

              // 3. Polo Dry-Fit specific assets
              if (product.id.startsWith('polo-dryfit')) {
                const name = selectedColor.toLowerCase();
                if (name.includes('blanco')) return [poloBlanco];
                if (name.includes('negro')) return ['https://res.cloudinary.com/boofzznx/image/upload/v1790452434/POLO_NEGRA_MC.png'];
                if (name.includes('oxford') || name.includes('carbón') || name.includes('carbon') || name.includes('gris')) return [poloCarbon];
                if (name.includes('marino')) return [poloMarino];
                if (name.includes('naranja')) return [poloNaranja];
                if (name.includes('rojo')) return [poloRojo];
                if (name.includes('verde agua') || name.includes('turquesa')) return [poloTurquesa];
                if (colorObj?.image) return [colorObj.image];
                return [];
              }

              if (colorObj?.image) {
                return [colorObj.image];
              }

              // If the product has colors configured, but this color has no photo:
              if (product.colors && product.colors.length > 0) {
                return [];
              }

              if (product.gallery && product.gallery.length > 0) {
                return product.gallery.filter(Boolean);
              }

              return product.image ? [product.image] : [];
            })();

            const currentDisplayImage = (activeGallery[galleryIndex] || activeGallery[0] || (product.colors && product.colors.length > 0 ? '' : product.image) || '').trim();
            const hasMultipleImages = activeGallery.length > 1;

            return (
              <div className="flex flex-col h-full justify-between gap-4">
                {/* Main Image Container */}
                <div className="relative w-full flex-1 flex items-center justify-center min-h-[300px] sm:min-h-[380px] bg-slate-900/40 rounded-xl overflow-hidden border border-slate-800/60">
                  {currentDisplayImage ? (
                    <img
                      key={currentDisplayImage}
                      src={currentDisplayImage}
                      alt={`${product.name} - ${selectedColor}`}
                      className={`w-full h-80 sm:h-96 md:h-[460px] ${
                        product.id === 'gorra-gabardina' || product.id === 'mandiles-largos'
                          ? 'object-contain p-3'
                          : 'object-cover object-top'
                      } rounded-xl shadow-inner transition-all duration-300`}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        if (product.image && e.currentTarget.src !== product.image) {
                          e.currentTarget.src = product.image;
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-80 sm:h-96 md:h-[460px] flex flex-col items-center justify-center bg-white rounded-xl p-8 text-center border border-slate-200 shadow-sm">
                      <div className="w-16 h-16 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 mb-3 shadow-inner">
                        <CameraOff className="w-8 h-8 stroke-[1.5]" />
                      </div>
                      <span className="text-sm font-bold text-[#00086B] tracking-wide font-sans">
                        Sin fotografía
                      </span>
                      <span className="text-xs text-slate-500 mt-1 max-w-[160px] leading-tight">
                        Disponible próximamente
                      </span>
                    </div>
                  )}

                  {/* Badges */}
                  {(product.isNew || product.isBestSeller) && (
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-orange-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-lg self-start">
                          NUEVO
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow-lg self-start">
                          BEST SELLER
                        </span>
                      )}
                    </div>
                  )}

                  {/* Navigation Arrows for Multiple Images */}
                  {hasMultipleImages && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setGalleryIndex((prev) => (prev > 0 ? prev - 1 : activeGallery.length - 1))
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 hover:bg-orange-600 text-white border border-slate-800 hover:border-orange-500 transition-all cursor-pointer shadow-lg z-10"
                        aria-label="Foto anterior"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setGalleryIndex((prev) => (prev < activeGallery.length - 1 ? prev + 1 : 0))
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 hover:bg-orange-600 text-white border border-slate-800 hover:border-orange-500 transition-all cursor-pointer shadow-lg z-10"
                        aria-label="Siguiente foto"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Photo Index Counter */}
                      <div className="absolute bottom-3 right-3 bg-slate-950/85 backdrop-blur border border-slate-800 text-slate-200 text-[10px] font-mono font-medium px-2.5 py-1 rounded-full z-10 shadow">
                        {galleryIndex + 1} / {activeGallery.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Horizontal Scroll Gallery Strip (Active only when selected color has multiple photos, e.g. Blanco) */}
                {hasMultipleImages && (
                  <div className="w-full pt-1">
                    <div className="flex items-center justify-between mb-1.5 px-0.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        Galería {selectedColor} ({activeGallery.length} fotos)
                      </span>
                      <span className="text-[9px] text-orange-400 font-medium">
                        Desliza a la derecha →
                      </span>
                    </div>

                    <div className="flex gap-2.5 overflow-x-auto pb-1.5 pt-0.5 px-0.5 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 snap-x snap-mandatory">
                      {activeGallery.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setGalleryIndex(idx)}
                          className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer snap-start ${
                            galleryIndex === idx
                              ? 'border-orange-500 ring-2 ring-orange-500/30 scale-105 shadow-md opacity-100'
                              : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`Miniatura ${idx + 1}`}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute bottom-1 right-1 bg-slate-950/85 text-white text-[8px] font-mono px-1 rounded">
                            {idx + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>

        {/* Right Column: Detailed Configurations & Price Calculator */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between text-slate-200">
          <div className="space-y-6">
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-orange-500 font-bold uppercase tracking-widest">
                Categoría: {getCategoryName(product.category).toUpperCase()}
              </span>
              <div className="flex items-center space-x-1 text-xs text-slate-400">
                <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span className="text-white font-semibold">{product.rating || 4.7}</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold">Garantizado</span>
              </div>
            </div>

            {/* Title & Material */}
            <div>
              <h3 className="font-display text-4xl text-white tracking-wide leading-none">
                {product.name}
              </h3>
              {product.composition && (
                <p className="text-[10px] uppercase font-mono text-slate-400 tracking-wider mt-1.5">
                  Composición: <span className="text-orange-500">{product.composition}</span>
                </p>
              )}
            </div>

            {/* Live Pricing Tiers Table */}
            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-3">
              <div className="flex items-baseline justify-between border-b border-slate-800 pb-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold">
                  TABLA DE PRECIOS OFICIALES
                </span>
                {(hasChestEmbroidery || hasBackEmbroidery) && (
                  <span className="text-[9px] text-orange-400 font-semibold">• INCLUYE BORDADO EN TABLA</span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className={`p-2 rounded border transition-colors ${quantity <= 12 ? 'bg-orange-950/30 border-orange-500 text-white shadow-sm' : 'bg-slate-900/40 border-slate-800/50 text-slate-400'}`}>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 mb-1 font-sans font-semibold">1 a 12 Pzas</span>
                  <span className="font-semibold text-white">
                    ${((product.priceTiers['1-12'] ?? product.priceTiers['1-6'] ?? product.price) + (!isShoe && hasChestEmbroidery ? 45 : 0) + (!isShoe && hasBackEmbroidery ? 80 : 0)).toFixed(2)}
                  </span>
                  {(hasChestEmbroidery || hasBackEmbroidery) && (
                    <span className="block text-[8px] text-slate-500 mt-0.5">
                      Base: ${(product.priceTiers['1-12'] ?? product.priceTiers['1-6'] ?? product.price).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className={`p-2 rounded border transition-colors ${quantity >= 13 && quantity <= 50 ? 'bg-orange-950/30 border-orange-500 text-white shadow-sm' : 'bg-slate-900/40 border-slate-800/50 text-slate-400'}`}>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 mb-1 font-sans font-semibold">13 a 50 Pzas</span>
                  <span className="font-semibold text-white">
                    ${((product.priceTiers['13-50'] ?? product.priceTiers['12-99'] ?? product.price * 0.95) + (!isShoe && hasChestEmbroidery ? 38 : 0) + (!isShoe && hasBackEmbroidery ? 72 : 0)).toFixed(2)}
                  </span>
                  {(hasChestEmbroidery || hasBackEmbroidery) && (
                    <span className="block text-[8px] text-slate-500 mt-0.5">
                      Base: ${(product.priceTiers['13-50'] ?? product.priceTiers['12-99'] ?? product.price * 0.95).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className={`p-2 rounded border transition-colors ${quantity >= 51 ? 'bg-orange-950/30 border-orange-500 text-white shadow-sm' : 'bg-slate-900/40 border-slate-800/50 text-slate-400'}`}>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 mb-1 font-sans font-semibold">51+ Pzas</span>
                  <span className="font-semibold text-emerald-400">
                    ${((product.priceTiers['51+'] ?? product.priceTiers['300+'] ?? product.price * 0.9) + (!isShoe && hasChestEmbroidery ? 33 : 0) + (!isShoe && hasBackEmbroidery ? 65 : 0)).toFixed(2)}
                  </span>
                  {(hasChestEmbroidery || hasBackEmbroidery) && (
                    <span className="block text-[8px] text-slate-500 mt-0.5">
                      Base: ${(product.priceTiers['51+'] ?? product.priceTiers['300+'] ?? product.price * 0.9).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-[9px] text-slate-400 flex items-center justify-between border-t border-slate-800/60 pt-2 font-sans">
                <span>
                  {hasChestEmbroidery || hasBackEmbroidery
                    ? 'Precios netos con IVA y bordados incluidos.'
                    : 'Precios con IVA incluido.'}
                </span>
                {!isShoe && (
                  <span className="text-orange-400 font-medium">
                    {hasChestEmbroidery || hasBackEmbroidery
                      ? `Bordados activos: ${hasChestEmbroidery ? `Pecho +$${getChestEmbroideryPrice(quantity)}` : ''} ${hasBackEmbroidery ? `Espalda +$${getBackEmbroideryPrice(quantity)}` : ''}`
                      : 'Bordado opcional: Pecho desde $33 | Espalda desde $65'}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {product.description}
            </p>

            {/* Configurations Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-800/60">
              {/* Color Selector */}
              {(() => {
                const availableColors = (selectedCorte === 'Dama' && product.damaColors && product.damaColors.length > 0)
                  ? product.damaColors
                  : (product.colors || []);

                if (availableColors.length === 0) return null;

                return (
                  <div className="space-y-2">
                    <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                      Color disponible: <span className="text-white font-mono">{selectedColor}</span>
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {availableColors.map((col) => (
                        <div key={col.name} className="relative group">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedColor(col.name);
                              setGalleryIndex(0);
                            }}
                            className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center p-[2px] ${
                              selectedColor === col.name
                                ? 'border-orange-500 scale-110 shadow-lg shadow-orange-500/20'
                                : 'border-slate-800 hover:border-slate-600 hover:scale-105'
                            }`}
                          >
                            <span
                              className="h-full w-full rounded-full border border-white/10 flex items-center justify-center shadow-inner"
                              style={{ backgroundColor: col.hex }}
                            >
                              {selectedColor === col.name && (
                                <Check className={`h-4 w-4 ${
                                  col.name.toLowerCase().includes('blanc') || col.name.toLowerCase().includes('canario') ? 'text-slate-950' : 'text-white'
                                }`} />
                              )}
                            </span>
                          </button>
                          
                          {/* Custom Floating Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-50">
                            <div className="bg-slate-900 border border-slate-800 text-white text-[11px] font-sans px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap flex flex-col items-center relative">
                              <span className="font-semibold text-slate-100">{col.name}</span>
                              {/* Downward Arrow */}
                              <div className="w-2 h-2 bg-slate-900 border-r border-b border-slate-800 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Corte Selector (Caballero / Dama) */}
              {(product.hasCorteSelection || product.id === 'polo-dryfit-caballero-dama') && (
                <div className="space-y-2">
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Seleccionar Corte:
                  </span>
                  <div className="relative flex items-center p-1 bg-slate-950 border border-slate-800 rounded-xl w-full max-w-[240px] h-9">
                    {/* Sliding indicator */}
                    <div 
                      className={`absolute inset-y-1 rounded-lg bg-orange-600 border border-orange-500 shadow-md transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        selectedCorte === 'Dama' 
                          ? 'left-1 right-[calc(50%)]' 
                          : 'left-[calc(50%)] right-1'
                      }`}
                    />
                    
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCorte('Dama');
                        setGalleryIndex(0);
                        if (product.damaColors && product.damaColors.length > 0) {
                          const match = product.damaColors.find(c => 
                            c.name.toLowerCase() === selectedColor.toLowerCase() ||
                            (c.name.toLowerCase().startsWith('negr') && selectedColor.toLowerCase().startsWith('negr')) ||
                            (c.name.toLowerCase().startsWith('blanc') && selectedColor.toLowerCase().startsWith('blanc')) ||
                            (c.name.toLowerCase().includes('oxford') && (selectedColor.toLowerCase().includes('carbón') || selectedColor.toLowerCase().includes('carbon') || selectedColor.toLowerCase().includes('gris')))
                          );
                          if (match) setSelectedColor(match.name);
                          else setSelectedColor(product.damaColors[0].name);
                        }
                      }}
                      className={`relative z-10 w-1/2 h-full flex items-center justify-center text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                        selectedCorte === 'Dama' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Dama
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCorte('Caballero');
                        setGalleryIndex(0);
                        if (product.colors && product.colors.length > 0) {
                          const match = product.colors.find(c => 
                            c.name.toLowerCase() === selectedColor.toLowerCase() ||
                            (c.name.toLowerCase().startsWith('negr') && selectedColor.toLowerCase().startsWith('negr')) ||
                            (c.name.toLowerCase().startsWith('blanc') && selectedColor.toLowerCase().startsWith('blanc')) ||
                            (c.name.toLowerCase().includes('carbón') && selectedColor.toLowerCase().includes('oxford')) ||
                            (c.name.toLowerCase().includes('gris') && selectedColor.toLowerCase().includes('gris'))
                          );
                          if (match) setSelectedColor(match.name);
                          else setSelectedColor(product.colors[0].name);
                        }
                      }}
                      className={`relative z-10 w-1/2 h-full flex items-center justify-center text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                        selectedCorte === 'Caballero' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Caballero
                    </button>
                  </div>
                </div>
              )}

              {/* Manga Selector (Manga Corta / Manga Larga) */}
              {product.hasMangaSelection && (
                <div className="space-y-2">
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Seleccionar Manga:
                  </span>
                  <div className="relative flex items-center p-1 bg-slate-950 border border-slate-800 rounded-xl w-full max-w-[240px] h-9">
                    {/* Sliding indicator */}
                    <div 
                      className={`absolute inset-y-1 rounded-lg bg-orange-600 border border-orange-500 shadow-md transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        selectedManga === 'Manga Larga' 
                          ? 'left-[calc(50%)] right-1' 
                          : 'left-1 right-[calc(50%)]'
                      }`}
                    />
                    
                    <button
                      type="button"
                      onClick={() => setSelectedManga('Manga Corta')}
                      className={`relative z-10 w-1/2 h-full flex items-center justify-center text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                        selectedManga === 'Manga Corta' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Manga Corta
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setSelectedManga('Manga Larga')}
                      className={`relative z-10 w-1/2 h-full flex items-center justify-center text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                        selectedManga === 'Manga Larga' ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Manga Larga
                    </button>
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {showSizeSelector && (
                <div className="space-y-2">
                  <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                    Seleccionar Talla:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes?.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-8 px-3 rounded flex items-center justify-center font-mono text-xs font-semibold uppercase transition-all border cursor-pointer ${
                          selectedSize === size
                            ? 'bg-orange-600 border-orange-500 text-white shadow-md'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Personalization Options (Bordados) - Only for garments, not footwear/shoes */}
            {!isShoe && (
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-3">
                <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold border-b border-slate-800/60 pb-1.5">
                  PERSONALIZACIÓN (Bordado Industrial)
                </span>

                <div className="space-y-2">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={hasChestEmbroidery}
                      onChange={(e) => setHasChestEmbroidery(e.target.checked)}
                      className="h-4 w-4 mt-0.5 rounded border-slate-800 bg-slate-900 text-orange-600 focus:ring-orange-500 cursor-pointer"
                    />
                    <div className="text-xs text-left flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-200 font-semibold">Bordado en Pecho</span>
                        <span className="font-mono text-orange-400 font-bold">
                          +{formatCurrency(getChestEmbroideryPrice(quantity))}/pz
                        </span>
                      </div>
                      <span className="block text-[10px] text-slate-400 mt-0.5">
                        Adiciona logotipo al frente. Escala: $45 (1-12 pz) · $38 (13-50 pz) · $33 (51+ pz).
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={hasBackEmbroidery}
                      onChange={(e) => setHasBackEmbroidery(e.target.checked)}
                      className="h-4 w-4 mt-0.5 rounded border-slate-800 bg-slate-900 text-orange-600 focus:ring-orange-500 cursor-pointer"
                    />
                    <div className="text-xs text-left flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-200 font-semibold">Bordado en Espalda</span>
                        <span className="font-mono text-orange-400 font-bold">
                          +{formatCurrency(getBackEmbroideryPrice(quantity))}/pz
                        </span>
                      </div>
                      <span className="block text-[10px] text-slate-400 mt-0.5">
                        Adiciona diseño o nombre en espalda. Escala: $80 (1-12 pz) · $72 (13-50 pz) · $65 (51+ pz).
                      </span>
                    </div>
                  </label>
                </div>

                <p className="text-[9px] text-slate-500 font-sans leading-tight">
                  * El bordado requiere ponchado. Si ya cuenta con ponchado, la entrega es de 48 a 72 hrs. De lo contrario, se entrega de 5 a 7 días hábiles.
                </p>
              </div>
            )}
          </div>

          {/* Action Row & Live Total Calculator */}
          <div className="mt-6 border-t border-slate-800 pt-5 space-y-4">
            <div className="flex items-center justify-between text-left">
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-slate-500">Precio Unitario Estimado</span>
                <span className="text-lg font-mono font-bold text-white">
                  {formatCurrency(finalUnitPrice)}
                </span>
                {(hasChestEmbroidery || hasBackEmbroidery) && (
                  <span className="block text-[9px] text-orange-400 font-mono">
                    Prenda: {formatCurrency(unitPrice)}
                    {hasChestEmbroidery && ` + Pecho: ${formatCurrency(getChestEmbroideryPrice(quantity))}`}
                    {hasBackEmbroidery && ` + Espalda: ${formatCurrency(getBackEmbroideryPrice(quantity))}`}
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="block text-[9px] uppercase tracking-widest text-slate-500">Subtotal de Renglón</span>
                <span className="text-2xl font-mono font-bold text-orange-500">
                  {formatCurrency(totalPrice)}
                </span>
                <span className="block text-[8px] text-slate-500">IVA incluido</span>
              </div>
            </div>

            {successMsg ? (
              <div className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 p-3.5 rounded-lg text-center text-xs font-semibold animate-pulse flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                ✓ ¡Configuración agregada a la lista de cotización!
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {/* Quantity Selector */}
                <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg h-11 px-2 shrink-0">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer text-lg font-bold"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={quantity === 0 ? '' : quantity}
                    onChange={(e) => {
                      const cleanValue = e.target.value.replace(/\D/g, '');
                      setQuantity(cleanValue === '' ? 0 : parseInt(cleanValue, 10));
                    }}
                    onBlur={() => {
                      if (quantity < 1) {
                        setQuantity(1);
                      }
                    }}
                    className="w-12 bg-transparent border-0 text-center font-mono text-sm text-white focus:outline-none focus:ring-0 font-bold p-0"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer text-lg font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Quote button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 h-11 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-orange-950/25 hover:shadow-orange-600/30 hover:-translate-y-0.5 active:scale-95"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Agregar a Cotización ({Math.max(1, quantity)} pz)
                </button>

                {/* Favorite Toggle Button */}
                <button
                  type="button"
                  onClick={() => onToggleFavorite(product)}
                  className={`h-11 w-11 rounded-xl border border-slate-700 flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0 active:scale-90 ${
                    isFavorite
                      ? 'bg-orange-950/50 border-orange-500/50 text-orange-500 shadow-sm'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white hover:-translate-y-0.5'
                  }`}
                  aria-label="Agregar a favoritos"
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-orange-500' : ''}`} />
                </button>
              </div>
            )}
            <p className="text-[10px] text-center text-slate-500 leading-tight">
              ⚡ Al rebasar las 12 piezas, el sistema aplica el descuento de escala mayorista automáticamente en su cotización.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
