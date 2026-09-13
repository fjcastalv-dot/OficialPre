import { X, Heart, ShoppingCart, Trash2, ArrowRight, CameraOff } from 'lucide-react';
import { Product } from '../types';
import { getCategoryName } from '../data';
// @ts-ignore
import poloMarino from '../assets/images/polo_marino.webp';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Product[];
  onRemoveFavorite: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, size?: string) => void;
  onViewProduct: (product: Product) => void;
}

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onAddToCart,
  onViewProduct,
}: FavoritesDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="favorites-drawer">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 text-slate-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-orange-500">
              <Heart className="h-5 w-5 fill-orange-500" />
              <h3 className="font-display text-2xl text-white tracking-wider">Mis Favoritos</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {favorites.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center h-full space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-full border border-slate-800 text-slate-500 text-4xl">
                  ❤️
                </div>
                <div>
                  <h4 className="font-semibold text-white">Tu lista está vacía</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto">
                    Explora el catálogo y guarda los uniformes que te interesan.
                  </p>
                </div>
              </div>
            ) : (
              favorites.map((product) => (
                <div
                  key={product.id}
                  className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex gap-3 relative hover:border-slate-700 transition-all group"
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded bg-slate-900 border border-slate-800 shrink-0"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        if (product.image && e.currentTarget.src !== product.image) {
                          e.currentTarget.src = product.image;
                        }
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                      <CameraOff className="w-6 h-6 stroke-[1.5]" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4
                      className="font-bold text-white text-xs truncate leading-tight"
                      style={{ fontFamily: 'Verdana, sans-serif' }}
                    >
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">
                      {getCategoryName(product.category)}
                    </p>
                    <span className="text-xs font-mono text-orange-500 font-semibold block mt-1">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    {/* Delete Icon */}
                    <button
                      onClick={() => onRemoveFavorite(product)}
                      className="p-1 text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
                      title="Eliminar de favoritos"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    {/* Actions */}
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => onViewProduct(product)}
                        className="text-[10px] font-semibold text-slate-400 hover:text-white hover:underline active:scale-95 transition-all cursor-pointer"
                      >
                        Ver más
                      </button>
                      <button
                        onClick={() => onAddToCart(product, 1, 'M')}
                        className="p-1.5 rounded bg-orange-600 hover:bg-orange-700 active:scale-90 text-white transition-all cursor-pointer"
                        title="Agregar a cotización"
                      >
                        <ShoppingCart className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {favorites.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950 space-y-4">
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                Seguir explorando <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
