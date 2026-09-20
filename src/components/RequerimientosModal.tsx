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

  // Lock background scroll completely when modal is open
  useEffect(() => {
    if (isOpen) {
      const origOverflow = document.body.style.overflow;
      const origOverscroll = document.body.style.overscrollBehavior;
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';
      document.body.classList.add('modal-open');

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (previewImage) {
            setPreviewImage(null);
          } else {
            onClose();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = origOverflow;
        document.body.style.overscrollBehavior = origOverscroll;
        document.body.classList.remove('modal-open');
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose, previewImage]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      id="requerimientos-modal"
      className="animate-fade-in"
      onClick={handleBackdropClick}
      onWheel={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        inset: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        height: '100dvh',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overscrollBehavior: 'contain'
      }}
    >
      {/* Main Modal Card */}
      <div
        id="requerimientos-modal-card"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '896px',
          maxHeight: 'calc(100vh - 32px)',
          maxHeight: 'calc(100dvh - 32px)',
          height: '88vh',
          height: '88dvh',
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          border: '1px solid #334155',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          overscrollBehavior: 'contain'
        }}
      >
        {/* Top-right prominent Close Button (X) */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Cerrar pestaña emergente"
          title="Cerrar (Esc)"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 50,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#1e293b',
            border: '1px solid #475569',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ef4444';
            e.currentTarget.style.borderColor = '#ef4444';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1e293b';
            e.currentTarget.style.borderColor = '#475569';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X style={{ width: '20px', height: '20px' }} strokeWidth={2.5} />
        </button>

        {/* Modal Header */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            backgroundColor: '#020617',
            borderBottom: '1px solid #1e293b',
            padding: '16px 24px',
            paddingRight: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  backgroundColor: 'rgba(249, 115, 22, 0.15)',
                  color: '#fb923c',
                  border: '1px solid rgba(249, 115, 22, 0.3)'
                }}
              >
                ESPECIFICACIONES TÉCNICAS
              </span>
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: '24px',
                color: '#ffffff',
                letterSpacing: '0.05em',
                marginTop: '4px',
                marginRight: '16px'
              }}
            >
              Requerimientos de Personalización
            </h2>
          </div>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            backgroundColor: '#020617',
            padding: '12px 24px',
            borderBottom: '1px solid #1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexShrink: 0
          }}
        >
          <button
            onClick={() => setActiveTab('bordado')}
            type="button"
            style={{
              flex: 1,
              maxWidth: '240px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
              cursor: 'pointer',
              border: activeTab === 'bordado' ? '1px solid #fb923c' : '1px solid #334155',
              backgroundColor: activeTab === 'bordado' ? '#f97316' : '#1e293b',
              color: activeTab === 'bordado' ? '#ffffff' : '#94a3b8',
              boxShadow: activeTab === 'bordado' ? '0 10px 15px -3px rgba(249, 115, 22, 0.3)' : 'none'
            }}
          >
            <Sparkles style={{ width: '16px', height: '16px' }} />
            <span>Bordado Industrial</span>
          </button>

          <button
            onClick={() => setActiveTab('sublimado')}
            type="button"
            style={{
              flex: 1,
              maxWidth: '240px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              transition: 'all 0.2s',
              cursor: 'pointer',
              border: activeTab === 'sublimado' ? '1px solid #fb923c' : '1px solid #334155',
              backgroundColor: activeTab === 'sublimado' ? '#f97316' : '#1e293b',
              color: activeTab === 'sublimado' ? '#ffffff' : '#94a3b8',
              boxShadow: activeTab === 'sublimado' ? '0 10px 15px -3px rgba(249, 115, 22, 0.3)' : 'none'
            }}
          >
            <Layers style={{ width: '16px', height: '16px' }} />
            <span>Sublimado Full Print</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div
          id="requerimientos-modal-body"
          className="custom-scrollbar"
          style={{
            flex: '1 1 0%',
            minHeight: 0,
            overflowY: 'auto',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            padding: '24px'
          }}
        >
          {activeTab === 'bordado' && (
            <div className="space-y-8 animate-fade-in">
              {/* Introduction Banner */}
              <div
                style={{
                  backgroundColor: '#1e293b',
                  border: '1px solid rgba(249, 115, 22, 0.25)',
                  borderRadius: '12px',
                  padding: '20px'
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#fb923c', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  ALTA DEFINICIÓN COMPUTARIZADA
                </span>
                <h3 className="font-display" style={{ fontSize: '24px', color: '#ffffff', marginTop: '4px', letterSpacing: '0.03em' }}>
                  REQUERIMIENTOS PARA BORDADOS
                </h3>
                <p style={{ fontSize: '14px', color: '#cbd5e1', marginTop: '8px', lineHeight: '1.6' }}>
                  Personaliza el uniforme de tu <strong style={{ color: '#fb923c' }}>Marca, Negocio, Hotel, Restaurante o Inmobiliaria</strong> con puntada de máxima densidad, hilos de alta resistencia y calibración milimétrica.
                </p>
              </div>

              {/* Video Section */}
              <div
                style={{
                  backgroundColor: '#020617',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid #1e293b'
                }}
                className="space-y-3"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                  <Video style={{ width: '20px', height: '20px', color: '#f97316' }} />
                  <h4 className="font-display" style={{ fontSize: '18px', letterSpacing: '0.05em' }}>
                    Video de Demostración: Bordado en Proceso
                  </h4>
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Conoce nuestra tecnología computarizada de bordado industrial multicabezal operando en taller Cancún.
                </p>
                <div
                  className="relative w-full aspect-video rounded-xl overflow-hidden shadow-inner"
                  style={{ backgroundColor: '#000000', border: '1px solid #1e293b' }}
                >
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
                  <Ruler style={{ width: '20px', height: '20px', color: '#f97316' }} />
                  <h4 className="font-display" style={{ fontSize: '20px', color: '#ffffff', letterSpacing: '0.05em' }}>
                    Medidas para el Bordado
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '16px', border: '1px solid #334155' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#fb923c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pecho</span>
                    <p style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>8 cm base</p>
                    <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                      Medida estándar recomendada para colocación en pecho izquierdo o centrado.
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '16px', border: '1px solid #334155' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#fb923c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mangas o Gorras</span>
                    <p style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>6 cm base</p>
                    <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                      Dimensión óptima para laterales de manga, viseras o frentes de gorra.
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '16px', border: '1px solid #334155' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#fb923c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Letras Pequeñas</span>
                    <p style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>0.6 cm mínimo</p>
                    <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                      Altura mínima requerida por letra para asegurar nitidez y legibilidad del hilo.
                    </p>
                  </div>
                </div>

                {/* Diagrams */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div
                    onClick={() => setPreviewImage('https://uniformespre.com/wp-content/uploads/2024/02/logo-pecho-1.png')}
                    className="group relative rounded-xl overflow-hidden transition-all cursor-pointer p-4 flex flex-col items-center"
                    style={{ backgroundColor: '#020617', border: '1px solid #334155' }}
                  >
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                      Guía Visual de Medidas: Pecho
                    </span>
                    <div className="relative w-full h-48 sm:h-56 flex items-center justify-center rounded-lg overflow-hidden" style={{ backgroundColor: '#0f172a' }}>
                      <img
                        src="https://uniformespre.com/wp-content/uploads/2024/02/logo-pecho-1.png"
                        alt="Medidas de bordado en pecho"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#f97316', color: '#ffffff', fontWeight: 700, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <ZoomIn style={{ width: '14px', height: '14px' }} /> Ampliar imagen
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setPreviewImage('https://uniformespre.com/wp-content/uploads/2024/02/logo-pecho.png')}
                    className="group relative rounded-xl overflow-hidden transition-all cursor-pointer p-4 flex flex-col items-center"
                    style={{ backgroundColor: '#020617', border: '1px solid #334155' }}
                  >
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                      Proporciones y Posicionamiento
                    </span>
                    <div className="relative w-full h-48 sm:h-56 flex items-center justify-center rounded-lg overflow-hidden" style={{ backgroundColor: '#0f172a' }}>
                      <img
                        src="https://uniformespre.com/wp-content/uploads/2024/02/logo-pecho.png"
                        alt="Posición estándar de bordado"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#f97316', color: '#ffffff', fontWeight: 700, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <ZoomIn style={{ width: '14px', height: '14px' }} /> Ampliar imagen
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Requisitos de la imagen & Avisos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Formatos */}
                <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '20px', border: '1px solid #334155' }} className="space-y-4">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                    <FileText style={{ width: '20px', height: '20px', color: '#f97316' }} />
                    <h4 className="font-display" style={{ fontSize: '18px', letterSpacing: '0.05em' }}>Requisitos de la Imagen</h4>
                  </div>
                  <ul className="space-y-3" style={{ fontSize: '13px', color: '#cbd5e1' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#34d399', flexShrink: 0, marginTop: '2px' }} />
                      <span>Se necesita una imagen de <strong>buena o media calidad</strong> para digitalizar y ponchar el logo.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#34d399', flexShrink: 0, marginTop: '2px' }} />
                      <span>Formatos de archivo aceptados: <strong>PNG, JPG, TIF, EPS, PDF</strong> (o vectores en AI/CDR).</span>
                    </li>
                  </ul>
                </div>

                {/* Avisos */}
                <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '20px', border: '1px solid #334155' }} className="space-y-4">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                    <Info style={{ width: '20px', height: '20px', color: '#f97316' }} />
                    <h4 className="font-display" style={{ fontSize: '18px', letterSpacing: '0.05em' }}>Condiciones y Muestras</h4>
                  </div>
                  <ul className="space-y-3" style={{ fontSize: '13px', color: '#cbd5e1' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#fb923c', flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Pedido mínimo:</strong> A partir de <strong>12 piezas</strong> se bordará si eres cliente nuevo.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#fb923c', flexShrink: 0, marginTop: '2px' }} />
                      <span>El diseñador(a) adaptará las proporciones a las medidas de prenda si es necesario.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#fb923c', flexShrink: 0, marginTop: '2px' }} />
                      <span>Se enviarán <strong>fotos de muestras</strong> del bordado al cliente para autorización previa antes del tiraje final.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 3: Galería de Trabajos Realizados */}
              <div className="space-y-4">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
                  <h4 className="font-display" style={{ fontSize: '20px', color: '#ffffff', letterSpacing: '0.05em' }}>
                    Marcas con su Bordado Corporativo
                  </h4>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Haz clic en cualquier imagen para ampliar</span>
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
                      className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all"
                      style={{ backgroundColor: '#020617', border: '1px solid #334155' }}
                    >
                      <img
                        src={imgUrl}
                        alt={`Muestra de bordado ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn style={{ width: '20px', height: '20px', color: '#ffffff' }} />
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
              <div
                style={{
                  backgroundColor: '#1e293b',
                  border: '1px solid rgba(249, 115, 22, 0.25)',
                  borderRadius: '12px',
                  padding: '20px'
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#fb923c', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  TRANSFERENCIA TÉRMICA INDELEBLE
                </span>
                <h3 className="font-display" style={{ fontSize: '24px', color: '#ffffff', marginTop: '4px', letterSpacing: '0.03em' }}>
                  REQUERIMIENTOS PARA SUBLIMADOS
                </h3>
                <p style={{ fontSize: '14px', color: '#cbd5e1', marginTop: '8px', lineHeight: '1.6' }}>
                  Destaca tu <strong style={{ color: '#fb923c' }}>Marca, Negocio, Hotel, Restaurante o Inmobiliaria</strong> con sublimación full-print de colores vivos que nunca se despintan ni se agrietan.
                </p>
              </div>

              {/* Video Section */}
              <div
                style={{
                  backgroundColor: '#020617',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid #1e293b'
                }}
                className="space-y-3"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                  <Video style={{ width: '20px', height: '20px', color: '#f97316' }} />
                  <h4 className="font-display" style={{ fontSize: '18px', letterSpacing: '0.05em' }}>
                    Video de Demostración: Sublimado Full-Print
                  </h4>
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Mira la transferencia de calor y calandrado de alta definición aplicada sobre telas deportivas y hoteleras.
                </p>
                <div
                  className="relative w-full aspect-video rounded-xl overflow-hidden shadow-inner"
                  style={{ backgroundColor: '#000000', border: '1px solid #1e293b' }}
                >
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
                  <Ruler style={{ width: '20px', height: '20px', color: '#f97316' }} />
                  <h4 className="font-display" style={{ fontSize: '20px', color: '#ffffff', letterSpacing: '0.05em' }}>
                    Medidas para el Diseño Full Print
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '16px', border: '1px solid #334155' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#fb923c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ancho Máximo</span>
                    <p style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>150 cm</p>
                    <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                      Área máxima de ancho de impresión textil por rollo continuo.
                    </p>
                  </div>

                  <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '16px', border: '1px solid #334155' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#fb923c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Largo Mínimo</span>
                    <p style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px' }}>500 cm (5 metros)</p>
                    <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
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
                      className="group relative rounded-xl overflow-hidden transition-all cursor-pointer p-4 flex flex-col items-center"
                      style={{ backgroundColor: '#020617', border: '1px solid #334155' }}
                    >
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                        {diag.title}
                      </span>
                      <div className="relative w-full h-44 flex items-center justify-center rounded-lg overflow-hidden" style={{ backgroundColor: '#0f172a' }}>
                        <img
                          src={diag.url}
                          alt={diag.title}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span style={{ padding: '6px 12px', borderRadius: '8px', backgroundColor: '#f97316', color: '#ffffff', fontWeight: 700, fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <ZoomIn style={{ width: '12px', height: '12px' }} /> Ampliar
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
                <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '20px', border: '1px solid #334155' }} className="space-y-4">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                    <FileText style={{ width: '20px', height: '20px', color: '#f97316' }} />
                    <h4 className="font-display" style={{ fontSize: '18px', letterSpacing: '0.05em' }}>Requisitos de la Imagen o Diseño</h4>
                  </div>
                  <ul className="space-y-3" style={{ fontSize: '13px', color: '#cbd5e1' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#34d399', flexShrink: 0, marginTop: '2px' }} />
                      <span>Se necesita una imagen de <strong>muy buena calidad</strong> o archivos en <strong>vectores</strong>.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#34d399', flexShrink: 0, marginTop: '2px' }} />
                      <span>Formatos de imagen aceptados: <strong>PNG, JPG, TIF, EPS, PDF</strong>.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#34d399', flexShrink: 0, marginTop: '2px' }} />
                      <span>Formatos de diseño vectorial: <strong>CDR, AI, PDF, PNG, EPS, JPG</strong>.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#34d399', flexShrink: 0, marginTop: '2px' }} />
                      <span>Si tienes un diseño preparado, por favor especificar si está en modo <strong>CMYK</strong> o <strong>RGB</strong>.</span>
                    </li>
                  </ul>
                </div>

                {/* Condiciones */}
                <div style={{ backgroundColor: '#1e293b', borderRadius: '16px', padding: '20px', border: '1px solid #334155' }} className="space-y-4">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff' }}>
                    <Info style={{ width: '20px', height: '20px', color: '#f97316' }} />
                    <h4 className="font-display" style={{ fontSize: '18px', letterSpacing: '0.05em' }}>Telas y Mínimos de Producción</h4>
                  </div>
                  <ul className="space-y-3" style={{ fontSize: '13px', color: '#cbd5e1' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#fb923c', flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Composición textil:</strong> Solo en telas que sean <strong>100% Poliéster</strong>.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#fb923c', flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Tela en rollo:</strong> Para tela full print lo mínimo son <strong>5 metros</strong>.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#fb923c', flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Prendas confeccionadas:</strong> Para diseño por uniforme, el pedido mínimo son <strong>12 piezas</strong>.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#fb923c', flexShrink: 0, marginTop: '2px' }} />
                      <span>El diseñador(a) ajustará el diseño a las medidas de prenda requeridas.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#fb923c', flexShrink: 0, marginTop: '2px' }} />
                      <span>Se enviarán fotos de <strong>muestras del sublimado</strong> para validación del cliente antes del tiraje completo.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section 3: Galería de Sublimados Realizados */}
              <div className="space-y-4">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
                  <h4 className="font-display" style={{ fontSize: '20px', color: '#ffffff', letterSpacing: '0.05em' }}>
                    Marcas con Sublimados de Alta Definición
                  </h4>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>Haz clic en cualquier imagen para ampliar</span>
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
                      className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all"
                      style={{ backgroundColor: '#020617', border: '1px solid #334155' }}
                    >
                      <img
                        src={imgUrl}
                        alt={`Muestra de sublimado ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn style={{ width: '20px', height: '20px', color: '#ffffff' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Direct Help Banner */}
          <div
            style={{
              backgroundColor: '#020617',
              border: '1px solid #1e293b',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div style={{ flex: 1, minWidth: '240px' }}>
              <h5 className="font-display" style={{ fontSize: '18px', color: '#ffffff', letterSpacing: '0.03em' }}>
                ¿Deseas enviar tus archivos para validación o cotizar tu pedido?
              </h5>
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
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
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                backgroundColor: '#059669',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 10px 15px -3px rgba(5, 150, 105, 0.3)',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              <MessageSquare style={{ width: '16px', height: '16px' }} />
              <span>Consultar en WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Preview Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(8px)',
            cursor: 'pointer'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '768px',
              maxHeight: '85vh',
              padding: '8px',
              backgroundColor: '#0f172a',
              borderRadius: '16px',
              border: '1px solid #334155',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <button
              onClick={() => setPreviewImage(null)}
              type="button"
              aria-label="Cerrar vista previa"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 10,
                padding: '8px',
                borderRadius: '50%',
                backgroundColor: 'rgba(2, 6, 23, 0.85)',
                color: '#ffffff',
                border: '1px solid #334155',
                cursor: 'pointer'
              }}
            >
              <X style={{ width: '20px', height: '20px' }} />
            </button>
            <img
              src={previewImage}
              alt="Vista ampliada"
              style={{ maxHeight: '80vh', maxWidth: '100%', objectFit: 'contain', borderRadius: '12px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
