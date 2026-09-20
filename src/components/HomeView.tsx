import { useState, useRef } from 'react';
import { Sparkles, Shirt, Utensils, Briefcase, ShieldAlert, Footprints, ArrowRight, Star, Heart, Check, HelpCircle, GraduationCap, Stethoscope, CameraOff, Lightbulb, Award, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import { ActiveTab, Product } from '../types';
import { PRODUCTS, TESTIMONIALS, getCategoryName } from '../data';
// @ts-ignore
import aPruebaDeSudorImg from '../assets/images/a_prueba_de_sudor.jpg';
// @ts-ignore
import bentoEmbroideryImg from '../assets/images/bordado_service.jpg';
// @ts-ignore
import luxuryTableclothImg from '../assets/images/manteleria_service.jpg';
// @ts-ignore
import bulkCapabilityImg from '../assets/images/capacidad_industrial_service.jpg';
// @ts-ignore
import textileSamplesBgImg from '../assets/images/telas_service.jpg';
// @ts-ignore
import poloMarino from '../assets/images/polo_marino.webp';
import { A_PRUEBA_DE_SUDOR_URL } from '../../imaganes/Imagenes inicio/A prueba de sudor';
import { BORDADO_URL } from '../../imaganes/Imagenes inicio/Bordado';
import { TELAS_URL } from '../../imaganes/Imagenes inicio/Telas';
import { MANTELERIA_URL } from '../../imaganes/Imagenes inicio/Manteleria';
import { CAPACIDAD_INDUSTRIAL_URL } from '../../imaganes/Imagenes inicio/Capacidad industrial';
import RequerimientosModal from './RequerimientosModal';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onViewProduct: (product: Product) => void;
  favorites: Product[];
  onToggleFavorite: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, size?: string) => void;
  setFilterCategory: (category: string) => void;
  theme?: 'light' | 'dark';
}

export default function HomeView({
  setActiveTab,
  onViewProduct,
  favorites,
  onToggleFavorite,
  onAddToCart,
  setFilterCategory,
  theme,
}: HomeViewProps) {
  const [isHotelVideoMuted, setIsHotelVideoMuted] = useState(true);
  const [isRequirementsModalOpen, setIsRequirementsModalOpen] = useState(false);
  const [requirementsTab, setRequirementsTab] = useState<'bordado' | 'sublimado'>('bordado');
  const hotelVideoRef = useRef<HTMLVideoElement>(null);

  const toggleHotelVideoMute = () => {
    if (hotelVideoRef.current) {
      hotelVideoRef.current.muted = !hotelVideoRef.current.muted;
      setIsHotelVideoMuted(hotelVideoRef.current.muted);
    }
  };

  // Get best sellers
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 3);

  const categories = [
    { id: 'restaurante', name: 'Restaurante', icon: Utensils, color: 'from-amber-600/30 to-amber-950/40' },
    { id: 'hoteleria', name: 'Hotelería', icon: Sparkles, color: 'from-emerald-600/30 to-emerald-950/40' },
    { id: 'medico', name: 'Médico', icon: Stethoscope, color: 'from-cyan-600/30 to-cyan-950/40' },
    { id: 'ejecutivo', name: 'Ejecutivo', icon: Briefcase, color: 'from-blue-600/30 to-blue-950/40' },
    { id: 'industrial', name: 'Industria', icon: ShieldAlert, color: 'from-red-600/30 to-red-950/40' },
  ];

  const handleCategoryClick = (catId: string) => {
    setFilterCategory(catId);
    setActiveTab('catalogo');
  };

  return (
    <div className="space-y-14 sm:space-y-16 pb-16 animate-fade-in" id="home-view">
      {/* ==========================================
          HERO BANNER
          ========================================== */}
      <section className="relative bg-slate-900 overflow-hidden min-h-[calc(100vh-190px)] min-h-[calc(100dvh-190px)] flex items-center">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={aPruebaDeSudorImg || A_PRUEBA_DE_SUDOR_URL}
            alt="Tejido A Prueba de Sudor"
            className="w-full h-full object-cover object-left md:object-center opacity-95 transition-opacity duration-300"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => {
              if (e.currentTarget.src !== A_PRUEBA_DE_SUDOR_URL) {
                e.currentTarget.src = A_PRUEBA_DE_SUDOR_URL;
              }
            }}
          />
          {/* Balanced overlay allowing the fire on the left to show clearly while highlighting the text in the center */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-white/30" />
        </div>

        {/* Content Block */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-left">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-500/30 text-orange-600 text-[11px] font-bold uppercase tracking-widest mb-4 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Innovación Textil Riviera Maya</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-6xl sm:text-7xl md:text-8xl tracking-wider text-[#0a1128] leading-none"
          >
            A PRUEBA. <br />
            <span className="text-orange-600">DE MANCHAS.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-lg text-sm sm:text-base text-[#0f2452] font-medium font-sans leading-relaxed"
          >
            Filipina con tecnología de repelencia a líquidos y aceite vegetal, ligera, versátil, resistente, transpirable y de fácil cuidado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={() => {
                const filipina = PRODUCTS.find((p) => p.id === 'filipina-gabardina-antifluido') || PRODUCTS.find((p) => p.category === 'restaurante');
                setFilterCategory('restaurante');
                setActiveTab('catalogo');
                if (filipina) {
                  onViewProduct(filipina);
                }
              }}
              className="py-3.5 px-8 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg shadow-orange-600/25 hover:shadow-orange-600/40 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 group"
              id="hero-buy-btn"
            >
              <span>Comprar</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={() => {
                setFilterCategory('restaurante');
                setActiveTab('catalogo');
              }}
              className="py-3.5 px-8 rounded-xl border border-slate-300/80 bg-slate-100/90 hover:bg-white text-slate-800 font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm hover:shadow hover:-translate-y-0.5 active:scale-95"
              id="hero-learn-btn"
            >
              Ver Catálogo
            </button>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          COMPRA POR CATEGORÍAS
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-white tracking-wider">
            COMPRA POR CATEGORÍAS
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Todo lo que tu empresa necesita para vestir a su equipo, en un solo lugar.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 max-w-6xl mx-auto" id="categories-grid">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isLight = theme === 'light';
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={
                  isLight
                    ? "w-[calc(50%-0.625rem)] sm:w-44 md:w-48 lg:w-44 xl:w-52 py-8 px-4 rounded-2xl bg-brand-navy hover:bg-[#000547] border border-brand-navy/80 hover:border-brand-orange text-white transition-all text-center flex flex-col items-center justify-between gap-5 cursor-pointer group shadow-xl hover:shadow-2xl hover:-translate-y-1.5 duration-300 min-h-[220px]"
                    : "w-[calc(50%-0.625rem)] sm:w-44 md:w-48 lg:w-44 xl:w-52 py-8 px-4 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-orange-500/60 text-slate-200 hover:text-white transition-all text-center flex flex-col items-center justify-between gap-5 cursor-pointer group shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1.5 duration-300 min-h-[220px]"
                }
                id={`cat-card-${cat.id}`}
              >
                <div
                  className={
                    isLight
                      ? "w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-brand-orange text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/30"
                      : "w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-slate-950 text-orange-500 border border-orange-500/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner group-hover:border-orange-500/60"
                  }
                >
                  <IconComponent className="h-9 w-9 sm:h-10 sm:w-10 stroke-[2.2]" />
                </div>
                
                <div className="w-full">
                  <span className="font-display text-2xl sm:text-3xl text-white tracking-wider uppercase block">
                    {cat.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs uppercase tracking-[0.2em] font-semibold text-slate-400 mt-6 mb-8" id="categories-hint">
          Seleccione una categoría
        </p>
      </section>

      {/* ==========================================
          NUESTROS SERVICIOS (Bento Grid)
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8 sm:pt-12">
        <div className="text-center space-y-2">
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wider">
            NUESTROS SERVICIOS ESPECIALIZADOS
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Soluciones textiles a la medida de tu empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main big box: Embroidery / Sublimation */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row h-full">
            <div className="md:w-1/2 relative h-48 md:h-auto min-h-[220px] bg-slate-950">
              <img
                src={bentoEmbroideryImg || BORDADO_URL}
                alt="Bordados de Alta Definición"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (e.currentTarget.src !== BORDADO_URL) {
                    e.currentTarget.src = BORDADO_URL;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
            </div>
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] text-orange-500 uppercase tracking-widest font-bold">Personalización</span>
                <h3 className="font-display text-3xl text-white tracking-wider mt-2">
                  Bordados & Sublimados de Alta Definición
                </h3>
                <p className="text-xs text-slate-400 mt-2 font-sans leading-relaxed">
                  Personalizamos cada prenda con tecnología computarizada para lograr acabados precisos, colores definidos y una imagen corporativa impecable.
                </p>
              </div>
              <button
                onClick={() => {
                  setRequirementsTab('bordado');
                  setIsRequirementsModalOpen(true);
                }}
                className="py-2.5 px-5 rounded border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider self-start transition-all cursor-pointer flex items-center gap-1.5"
              >
                Conoce los requerimientos <ArrowRight className="h-3.5 w-3.5 text-orange-500" />
              </button>
            </div>
          </div>

          {/* Side Box 1: Design Advisory */}
          <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-slate-700 transition-all relative overflow-hidden flex flex-col justify-between space-y-6 h-full">
            <img
              src={textileSamplesBgImg || TELAS_URL}
              alt="Asesoría en Cambios de Imagen Corporativa"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (e.currentTarget.src !== TELAS_URL) {
                  e.currentTarget.src = TELAS_URL;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            
            <div className="relative z-10 space-y-4">
              <div className="h-12 w-12 rounded-full bg-slate-950/80 border border-orange-500/30 flex items-center justify-center text-orange-500 shadow-inner">
                <Lightbulb className="h-6 w-6 stroke-[2]" />
              </div>
              <h3 className="font-display text-3xl text-white tracking-wider">
                ASESORÍA EN CAMBIOS DE IMAGEN CORPORATIVA
              </h3>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Diseñamos el uniforme ideal para tu empresa. Escuchamos lo que tu empresa necesita y te acompañamos para encontrar la mejor solución. Te recomendamos materiales, colores, cortes y diseños que se adapten a tu marca, operación y equipo, combinando identidad, funcionalidad y comodidad.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('contacto')}
              className="relative z-10 py-2.5 px-5 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider self-start transition-all cursor-pointer flex items-center gap-1.5"
            >
              Cotizar asesoría gratis <ArrowRight className="h-3.5 w-3.5 text-orange-500" />
            </button>
          </div>

          {/* Lower Box: Textiles que visten tus espacios */}
          <div
            className="lg:col-span-12 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all flex flex-col md:flex-row h-full"
            style={{ gridColumn: '1 / -1' }}
          >
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] text-orange-500 uppercase tracking-widest font-bold">Línea Hotelera</span>
                <h3 className="font-display text-3xl text-white tracking-wider">
                  TEXTILES QUE VISTEN TUS ESPACIOS
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Creamos manteles, fundas, cojines y otros textiles personalizados para hoteles, restaurantes, eventos y empresas. Te acompañamos en la selección de materiales, colores y acabados.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('contacto')}
                className="py-2.5 px-5 rounded border border-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider self-start transition-colors cursor-pointer"
              >
                Cotizar Mantelería
              </button>
            </div>
            <div className="md:w-1/2 relative min-h-[260px] md:min-h-[300px] bg-slate-950 overflow-hidden group">
              <video
                ref={hotelVideoRef}
                src="./videos/linea_hotelera_tienda.mp4"
                autoPlay
                loop
                muted={isHotelVideoMuted}
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              <button
                onClick={toggleHotelVideoMute}
                type="button"
                aria-label={isHotelVideoMuted ? "Activar sonido" : "Silenciar video"}
                title={isHotelVideoMuted ? "Activar sonido" : "Silenciar video"}
                className="absolute bottom-3 right-3 z-10 flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 hover:bg-slate-800 border border-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              >
                {isHotelVideoMuted ? (
                  <>
                    <VolumeX className="h-4 w-4 text-orange-400" />
                    <span className="text-[11px] font-sans font-medium text-slate-200">Activar sonido</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4 text-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-sans font-medium text-emerald-300">Silenciar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          BEST SELLERS
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wider">
              NUESTROS BEST SELLERS
            </h2>
            <p className="text-xs text-slate-400 max-w-md">
              Los favoritos de nuestros clientes.
            </p>
          </div>
          <button
            onClick={() => {
              setFilterCategory('todos');
              setActiveTab('catalogo');
            }}
            className="py-2.5 px-6 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-orange-500/40 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
          >
            Ver todos los productos <ArrowRight className="h-3.5 w-3.5 text-orange-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestSellers.map((product) => {
            const isFav = favorites.some((fav) => fav.id === product.id);
            return (
              <div
                key={product.id}
                className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all flex flex-col group relative"
              >
                {/* Image */}
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
                      <span className="text-[10px] text-slate-500 mt-0.5">Disponible próximamente</span>
                    </div>
                  )}
                  {/* Overlay buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(product);
                      }}
                      className={`p-2 rounded-full border shadow focus:outline-none cursor-pointer transition-colors z-10 ${
                        isFav
                          ? 'bg-orange-950/80 border-orange-500/50 text-orange-500'
                          : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:text-white'
                      }`}
                      aria-label="Guardar favorito"
                    >
                      <Heart className={`h-4.5 w-4.5 ${isFav ? 'fill-orange-500' : ''}`} />
                    </button>
                  </div>

                  <span className="absolute bottom-4 left-4 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow">
                    Best Seller
                  </span>
                </div>

                {/* Info */}
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

                  <div className="flex items-center justify-between border-t border-slate-800/80 pt-4 mt-auto">
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] text-slate-500 font-mono">Desde:</span>
                      <span className="font-mono text-base font-bold text-white">
                        ${product.priceTiers ? (product.priceTiers['51+'] ?? product.priceTiers['300+'] ?? product.price).toFixed(2) : product.price.toFixed(2)}
                      </span>
                      <span className="text-[8px] text-slate-400 uppercase tracking-wider">Mayoreo Neto</span>
                    </div>
                    <button
                      onClick={() => onViewProduct(product)}
                      className="py-1.5 px-4 rounded bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      COTIZAR
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==========================================
          ASYMMETRIC CTA
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 h-64 w-64 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 text-left max-w-xl">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-wide leading-none">
              ¿LISTO PARA VESTIR <br />A TU EQUIPO?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              <span className="block font-semibold text-white mb-1">Hablemos de lo que tu empresa necesita.</span>
              Solicita nuestro catálogo digital y descubre las soluciones que tenemos para tu industria. Si estás en nuestra zona de atención, también podemos coordinar una visita de un ejecutivo con muestras de telas, opciones de personalización y propuestas para tu equipo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
            <a
              href={`https://wa.me/529989370850?text=${encodeURIComponent('Hola Uniformes PRE, me gustaría solicitar su catálogo digital y conocer las opciones para mi empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-8 rounded bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer shadow-lg shadow-orange-950/40 text-center inline-block"
            >
              SOLICITAR CATÁLOGO
            </a>
            <a
              href={`https://wa.me/529989370850?text=${encodeURIComponent('Hola Uniformes PRE, me gustaría hablar con un ejecutivo para coordinar una visita con muestras y asesoría para mi equipo.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-8 rounded border border-slate-700 hover:bg-slate-800 hover:border-slate-500 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer text-center inline-block"
            >
              HABLAR CON UN EJECUTIVO
            </a>
          </div>
        </div>
      </section>

      {/* ==========================================
          GOOGLE REVIEWS / OPINIONES DE CLIENTES
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10" id="google-reviews-section">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 shadow-sm">
            <span className="flex items-center text-amber-400 font-bold">
              ★ 5.0
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">Reseñas en Google Maps</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-bold">
              100% Calificación 5 Estrellas
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wider">
            OPINIONES REALES EN GOOGLE
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Uniformes PRE • SM 92 Mz 57, 58, 59 y 60, MEGA Soriana López Portillo, Local 7, Cancún, Q.R.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-5 hover:border-slate-700 transition-all shadow-sm group text-left"
            >
              <div className="space-y-4">
                {/* Header: User avatar + name + date */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-bold flex items-center justify-center text-sm shadow-sm shrink-0">
                    {testimonial.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs sm:text-sm text-white truncate" style={{ fontFamily: 'Verdana, sans-serif' }}>
                      {testimonial.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 block">
                      {testimonial.date || 'Hace 8 semanas'} • Reseña verificada
                    </span>
                  </div>
                  {/* Google G icon */}
                  <div className="shrink-0 text-slate-500">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  </div>
                </div>

                {/* 5 Stars */}
                <div className="flex space-x-1 text-amber-400">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>

                {/* Review comment */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  "{testimonial.text}"
                </p>
              </div>

              {/* Owner Response Box */}
              {testimonial.ownerResponse && (
                <div className="mt-2 pt-3 border-t border-slate-800/80 bg-slate-950/60 -mx-2 -mb-2 p-3 rounded-xl border border-slate-800/60 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    <span>Respuesta de {testimonial.ownerResponse.author}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 italic leading-relaxed pl-3 border-l-2 border-orange-500/40">
                    "{testimonial.ownerResponse.text}"
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Floating Modal for Bordados and Sublimados Requirements */}
      <RequerimientosModal
        isOpen={isRequirementsModalOpen}
        onClose={() => setIsRequirementsModalOpen(false)}
        initialTab={requirementsTab}
      />
    </div>
  );
}
