import React, { useState, useEffect } from 'react';
import { X, Ruler, FileText, CheckCircle2, Sparkles, Layers, Video, MessageSquare, ZoomIn, Info } from 'lucide-react';

interface RequerimientosModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'bordado' | 'sublimado';
}

export default function RequerimientosModal({
  isOpen,
  onClose,
  initialTab = 'bordado'
}: RequerimientosModalProps) {
  const [activeTab, setActiveTab] = useState<'bordado' | 'sublimado'>(initialTab);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setPreviewImage(null);
    }
  }, [isOpen, initialTab]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (previewImage) {
          setPreviewImage(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, previewImage]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in"
      id="requerimientos-modal"
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Main Modal Card */}
      <div
        id="requerimientos-modal-card"
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 text-slate-100"
        style={{
          maxHeight: 'calc(100vh - 32px)',
          maxHeight: 'calc(100dvh - 32px)',
          height: '90vh',
          height: '90dvh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Modal Top Header */}
        <div className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20">
                ESPECIFICACIONES TÉCNICAS
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-white tracking-wider mt-1">
              Requerimientos de Personalización
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-950/60 px-4 sm:px-6 pt-3 pb-2 border-b border-slate-800/80 flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('bordado')}
            type="button"
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer border ${
              activeTab === 'bordado'
                ? 'bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/20'
                : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Bordado Industrial</span>
          </button>

          <button
            onClick={() => setActiveTab('sublimado')}
            type="button"
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer border ${
              activeTab === 'sublimado'
                ? 'bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/20'
                : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Sublimado Full Print</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div
          id="requerimientos-modal-body"
          className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8 custom-scrollbar"
          style={{
            minHeight: 0,
            flex: '1 1 0%',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {activeTab === 'bordado' && (
            <div className="space-y-8 animate-fade-in">
              {/* Introduction Banner */}
              <div className="bg-gradient-to-r from-orange-500/10 via-slate-800/50 to-slate-900 border border-orange-500/20 rounded-xl p-5 sm:p-6">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest">
                  ALTA DEFINICIÓN COMPUTARIZADA
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide mt-1">
                  REQUERIMIENTOS PARA BORDADOS
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed font-sans">
                  Personaliza el uniforme de tu <span className="text-orange-400 font-bold">Marca, Negocio, Hotel, Restaurante o Inmobiliaria</span> con puntada de máxima densidad, hilos de alta resistencia y calibración milimétrica.
                </p>
              </div>

              {/* Video Section */}
              <div className="bg-slate-950/80 rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-white">
                  <Video className="w-5 h-5 text-orange-500" />
                  <h4 className="font-display text-lg tracking-wider">Video de Demostración: Bordado en Proceso</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Conoce nuestra tecnología computarizada de bordado industrial multicabezal operando en taller.
                </p>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/KVtucXUntoY?rel=0"
                    title="Video demostrativo de Bordados Uniformes PRE"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Section 1: Medidas */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Ruler className="w-5 h-5 text-orange-500" />
                  <h4 className="font-display text-xl text-white tracking-wider">
                    Medidas para el Bordado
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/60">
                    <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Pecho</span>
                    <p className="text-xl font-bold text-white mt-1">8 cm base</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Medida estándar recomendada para colocación en pecho izquierdo o centrado.
                    </p>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/60">
                    <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Mangas o Gorras</span>
                    <p className="text-xl font-bold text-white mt-1">6 cm base</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Dimensión óptima para laterales de manga, viseras o frentes de gorra.
                    </p>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/60">
                    <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Letras Pequeñas</span>
                    <p className="text-xl font-bold text-white mt-1">0.6 cm mínimo</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Altura mínima requerida por letra para asegurar nitidez y legibilidad del hilo.
                    </p>
                  </div>
                </div>

                {/* Diagrams */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div
                    onClick={() => setPreviewImage('https://uniformespre.com/wp-content/uploads/2024/02/logo-pecho-1.png')}
                    className="group relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-orange-500/50 transition-all cursor-pointer p-4 flex flex-col items-center"
                  >
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Guía Visual de Medidas: Pecho
                    </span>
                    <div className="relative w-full h-48 sm:h-56 flex items-center justify-center bg-slate-900/60 rounded-lg overflow-hidden">
                      <img
                        src="https://uniformespre.com/wp-content/uploads/2024/02/logo-pecho-1.png"
                        alt="Medidas de bordado en pecho"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-lg bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg">
                          <ZoomIn className="w-3.5 h-3.5" /> Ampliar imagen
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setPreviewImage('https://uniformespre.com/wp-content/uploads/2024/02/logo-pecho.png')}
                    className="group relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-orange-500/50 transition-all cursor-pointer p-4 flex flex-col items-center"
                  >
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Proporciones y Posicionamiento
                    </span>
                    <div className="relative w-full h-48 sm:h-56 flex items-center justify-center bg-slate-900/60 rounded-lg overflow-hidden">
                      <img
                        src="https://uniformespre.com/wp-content/uploads/2024/02/logo-pecho.png"
                        alt="Posición estándar de bordado"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-3 py-1.5 rounded-lg bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg">
                          <ZoomIn className="w-3.5 h-3.5" /> Ampliar imagen
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Requisitos de la imagen & Avisos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Formatos */}
                <div className="bg-slate-800/40 rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-white">
                    <FileText className="w-5 h-5 text-orange-500" />
                    <h4 className="font-display text-lg tracking-wider">Requisitos de la Imagen</h4>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Se necesita una imagen de <strong>buena o media calidad</strong> para digitalizar y ponchar el logo.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Formatos de archivo aceptados: <strong>PNG, JPG, TIF, EPS, PDF</strong> (o vectores en AI/CDR).</span>
                    </li>
                  </ul>
                </div>

                {/* Avisos */}
                <div className="bg-slate-800/40 rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-white">
                    <Info className="w-5 h-5 text-orange-500" />
                    <h4 className="font-display text-lg tracking-wider">Condiciones y Muestras</h4>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span><strong>Pedido mínimo:</strong> A partir de <strong>12 piezas</strong> se bordará si eres cliente nuevo.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span>El diseñador(a) adaptará las proporciones a las medidas de prenda si es necesario.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span>Se enviarán <strong>fotos de muestras</strong> del bordado al cliente para autorización previa antes del tiraje final.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 3: Galería de Trabajos Realizados */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="font-display text-xl text-white tracking-wider">
                    Marcas con su Bordado Corporativo
                  </h4>
                  <span className="text-xs text-slate-400">Haz clic en cualquier imagen para ampliar</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {[
                    'https://uniformespre.com/wp-content/uploads/2024/07/1-6.png',
                    'https://uniformespre.com/wp-content/uploads/2024/07/2-5.png',
                    'https://uniformespre.com/wp-content/uploads/2024/07/3-6.png',
                    'https://uniformespre.com/wp-content/uploads/2024/07/4-3.png',
                    'https://uniformespre.com/wp-content/uploads/2024/07/5-1.png'
                  ].map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setPreviewImage(imgUrl)}
                      className="group relative aspect-square bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-orange-500 cursor-pointer transition-all"
                    >
                      <img
                        src={imgUrl}
                        alt={`Muestra de bordado ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sublimado' && (
            <div className="space-y-8 animate-fade-in">
              {/* Introduction Banner */}
              <div className="bg-gradient-to-r from-orange-500/10 via-slate-800/50 to-slate-900 border border-orange-500/20 rounded-xl p-5 sm:p-6">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest">
                  TRANSFERENCIA TÉRMICA INDELEBLE
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide mt-1">
                  REQUERIMIENTOS PARA SUBLIMADOS
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed font-sans">
                  Destaca tu <span className="text-orange-400 font-bold">Marca, Negocio, Hotel, Restaurante o Inmobiliaria</span> con sublimación full-print de colores vivos que nunca se despintan ni se agrietan.
                </p>
              </div>

              {/* Video Section */}
              <div className="bg-slate-950/80 rounded-2xl p-4 sm:p-6 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-white">
                  <Video className="w-5 h-5 text-orange-500" />
                  <h4 className="font-display text-lg tracking-wider">Video de Demostración: Sublimado Full-Print</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Mira la transferencia de calor y calandrado de alta definición aplicada sobre telas deportivas y hoteleras.
                </p>
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/l5RnGg9u7NA?rel=0"
                    title="Video demostrativo de Sublimados Uniformes PRE"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Section 1: Medidas */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Ruler className="w-5 h-5 text-orange-500" />
                  <h4 className="font-display text-xl text-white tracking-wider">
                    Medidas para el Diseño Full Print
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/60">
                    <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Ancho Máximo</span>
                    <p className="text-xl font-bold text-white mt-1">150 cm</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Área máxima de ancho de impresión textil por rollo continuo.
                    </p>
                  </div>

                  <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/60">
                    <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">Largo Mínimo</span>
                    <p className="text-xl font-bold text-white mt-1">500 cm (5 metros)</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Longitud mínima requerida para tiraje de tela en rollo full print.
                    </p>
                  </div>
                </div>

                {/* Diagrams */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {[
                    {
                      url: 'https://uniformespre.com/wp-content/uploads/2024/02/logo-pecho-5-1.png',
                      title: 'Área Full Print'
                    },
                    {
                      url: 'https://uniformespre.com/wp-content/uploads/2024/02/logo-pecho-7.png',
                      title: 'Distribución y Patrón'
                    },
                    {
                      url: 'https://uniformespre.com/wp-content/uploads/2024/02/logo-pecho-6.png',
                      title: 'Detalle de Cortes'
                    }
                  ].map((diag, idx) => (
                    <div
                      key={idx}
                      onClick={() => setPreviewImage(diag.url)}
                      className="group relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-orange-500/50 transition-all cursor-pointer p-4 flex flex-col items-center"
                    >
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                        {diag.title}
                      </span>
                      <div className="relative w-full h-44 flex items-center justify-center bg-slate-900/60 rounded-lg overflow-hidden">
                        <img
                          src={diag.url}
                          alt={diag.title}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-2.5 py-1 rounded bg-orange-500 text-white font-bold text-[11px] flex items-center gap-1 shadow-lg">
                            <ZoomIn className="w-3 h-3" /> Ampliar
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Requisitos de Diseño & Condiciones */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Requisitos del Diseño */}
                <div className="bg-slate-800/40 rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-white">
                    <FileText className="w-5 h-5 text-orange-500" />
                    <h4 className="font-display text-lg tracking-wider">Requisitos de la Imagen o Diseño</h4>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Se necesita una imagen de <strong>muy buena calidad</strong> o archivos en <strong>vectores</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Formatos de imagen aceptados: <strong>PNG, JPG, TIF, EPS, PDF</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Formatos de diseño vectorial: <strong>CDR, AI, PDF, PNG, EPS, JPG</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Si tienes un diseño preparado, por favor especificar si está en modo <strong>CMYK</strong> o <strong>RGB</strong>.</span>
                    </li>
                  </ul>
                </div>

                {/* Condiciones */}
                <div className="bg-slate-800/40 rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-white">
                    <Info className="w-5 h-5 text-orange-500" />
                    <h4 className="font-display text-lg tracking-wider">Telas y Mínimos de Producción</h4>
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span><strong>Composición textil:</strong> Solo en telas que sean <strong>100% Poliéster</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span><strong>Tela en rollo:</strong> Para tela full print lo mínimo son <strong>5 metros</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span><strong>Prendas confeccionadas:</strong> Para diseño por uniforme, el pedido mínimo son <strong>12 piezas</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span>El diseñador(a) ajustará el diseño a las medidas de prenda requeridas.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span>Se enviarán fotos de <strong>muestras del sublimado</strong> para validación del cliente antes del tiraje completo.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 3: Galería de Sublimados Realizados */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="font-display text-xl text-white tracking-wider">
                    Marcas con Sublimados de Alta Definición
                  </h4>
                  <span className="text-xs text-slate-400">Haz clic en cualquier imagen para ampliar</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {[
                    'https://uniformespre.com/wp-content/uploads/2024/02/15f6a6eba4021348509334dc9141c8c3.jpg',
                    'https://uniformespre.com/wp-content/uploads/2024/02/sublimado4.png',
                    'https://uniformespre.com/wp-content/uploads/2024/02/images.jpg',
                    'https://uniformespre.com/wp-content/uploads/2024/02/images-3.jpg',
                    'https://uniformespre.com/wp-content/uploads/2024/02/TelaSublimado.jpg',
                    'https://uniformespre.com/wp-content/uploads/2024/02/estampados-textiles-serigrafia-sublimacion-vinilos-transfer-17359-MLA20135700007_072014-F.jpg',
                    'https://uniformespre.com/wp-content/uploads/2024/02/images-1.jpg',
                    'https://uniformespre.com/wp-content/uploads/2024/02/sublimado2.png',
                    'https://uniformespre.com/wp-content/uploads/2024/02/sublimado1.png',
                    'https://uniformespre.com/wp-content/uploads/2024/02/sublimado3.png'
                  ].map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setPreviewImage(imgUrl)}
                      className="group relative aspect-square bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-orange-500 cursor-pointer transition-all"
                    >
                      <img
                        src={imgUrl}
                        alt={`Muestra de sublimado ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Direct Help Banner */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h5 className="font-display text-lg text-white tracking-wide">
                ¿Deseas enviar tus archivos para validación o cotizar tu pedido?
              </h5>
              <p className="text-xs text-slate-400">
                Nuestros diseñadores revisan tu logotipo en minutos sin compromiso.
              </p>
            </div>
            <a
              href={`https://wa.me/529983470490?text=${encodeURIComponent(
                activeTab === 'bordado'
                  ? 'Hola, me gustaría cotizar uniformes con bordado personalizado y validar mi logotipo.'
                  : 'Hola, me gustaría cotizar uniformes con sublimado full print y enviar mi diseño para revisión.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-emerald-900/30 whitespace-nowrap cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Consultar en WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-3xl max-h-[85vh] p-2 bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl flex flex-col items-center">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewImage}
              alt="Vista ampliada"
              className="max-h-[80vh] max-w-full object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
