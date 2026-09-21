import React, { useState, useEffect } from 'react';
import { X, Ruler, FileText, CheckCircle2, Sparkles, Layers, Video, MessageSquare, ZoomIn, Info, ChevronLeft, ChevronRight } from 'lucide-react';

interface RequerimientosModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'bordado' | 'sublimado';
}

const BORDADO_MEDIDAS = [
  {
    title: 'Pecho',
    val: '8 cm base',
    desc: 'Medida estándar recomendada para colocación en pecho izquierdo o centrado.'
  },
  {
    title: 'Mangas o Gorras',
    val: '6 cm base',
    desc: 'Dimensión óptima para laterales de manga, viseras o frentes de gorra.'
  },
  {
    title: 'Letras Pequeñas',
    val: '0.6 cm mínimo',
    desc: 'Altura mínima requerida por letra para asegurar nitidez y legibilidad del hilo.'
  }
];

const BORDADO_DIAGRAMAS = [
  'https://uniformespre.com/wp-content/uploads/2024/02/logo-pecho-1.png',
  'https://uniformespre.com/wp-content/uploads/2024/02/logo-pecho.png'
];

const BORDADO_GALERIA = [
  'https://uniformespre.com/wp-content/uploads/2024/07/1-6.png',
  'https://uniformespre.com/wp-content/uploads/2024/07/2-5.png',
  'https://uniformespre.com/wp-content/uploads/2024/07/3-6.png',
  'https://uniformespre.com/wp-content/uploads/2024/07/4-3.png',
  'https://uniformespre.com/wp-content/uploads/2024/07/5-1.png'
];

const SUBLIMADO_MEDIDAS = [
  {
    title: 'Ancho Máximo',
    val: '150 cm',
    desc: 'Área máxima de ancho de impresión textil por rollo continuo.'
  },
  {
    title: 'Largo Mínimo',
    val: '500 cm (5 m)',
    desc: 'Longitud mínima requerida para tiraje de tela en rollo full print.'
  }
];

const SUBLIMADO_DIAGRAMAS = [
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
];

const SUBLIMADO_GALERIA = [
  'https://uniformespre.com/wp-content/uploads/2024/02/15f6a6eba4021348509334dc9141c8c3.jpg',
  'https://uniformespre.com/wp-content/uploads/2024/02/sublimado4.png',
  'https://uniformespre.com/wp-content/uploads/2024/02/images.jpg',
  'https://uniformespre.com/wp-content/uploads/2024/02/images-3.jpg',
  'https://uniformespre.com/wp-content/uploads/2024/02/TelaSublimado.jpg',
  'https://uniformespre.com/wp-content/uploads/2024/02/estampados-textiles-serigrafia-sublimacion-vinilos-transfer-17359-MLA20135700007_072014-F.jpg',
  'https://uniformespre.com/wp-content/uploads/2024/02/images-1.jpg'
];

export default function RequerimientosModal({
  isOpen,
  onClose,
  initialTab = 'bordado'
}: RequerimientosModalProps) {
  const [activeTab, setActiveTab] = useState<'bordado' | 'sublimado'>(initialTab);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [bordadoIndex, setBordadoIndex] = useState(0);
  const [sublimadoIndex, setSublimadoIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setPreviewImage(null);
      setBordadoIndex(0);
      setSublimadoIndex(0);
    }
  }, [isOpen, initialTab]);

  // Lock background scroll completely when modal is open
  useEffect(() => {
    if (isOpen) {
      const origOverflow = document.body.style.overflow;
      const origDocOverflow = document.documentElement.style.overflow;
      const origOverscroll = document.body.style.overscrollBehavior;
      const origDocOverscroll = document.documentElement.style.overscrollBehavior;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';
      document.documentElement.style.overscrollBehavior = 'none';
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open');

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
        document.documentElement.style.overflow = origDocOverflow;
        document.body.style.overscrollBehavior = origOverscroll;
        document.documentElement.style.overscrollBehavior = origDocOverscroll;
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose, previewImage]);

  // Auto carousel: Bordado dimensions images rotate every 5s
  useEffect(() => {
    if (!isOpen || activeTab !== 'bordado') return;
    const timer = setInterval(() => {
      setBordadoIndex((prev) => (prev + 1) % BORDADO_DIAGRAMAS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isOpen, activeTab]);

  // Auto carousel: Sublimado diagrams rotate every 4s
  useEffect(() => {
    if (!isOpen || activeTab !== 'sublimado') return;
    const timer = setInterval(() => {
      setSublimadoIndex((prev) => (prev + 1) % SUBLIMADO_DIAGRAMAS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isOpen, activeTab]);

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
      onTouchMove={(e) => e.stopPropagation()}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        height: '100dvh',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        margin: 0,
        overscrollBehavior: 'contain',
        boxSizing: 'border-box'
      }}
    >
      {/* Backdrop click layer */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}
      />

      {/* Modal Main Card (Light Theme: White background) */}
      <div
        id="requerimientos-modal-card"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '920px',
          maxHeight: 'calc(100vh - 32px)',
          maxHeight: 'calc(100dvh - 32px)',
          height: '88vh',
          height: '88dvh',
          backgroundColor: '#ffffff',
          color: '#0f172a',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
          overscrollBehavior: 'contain'
        }}
      >
        {/* Prominent Floating Close Button (top-right X) */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Cerrar ventana emergente"
          className="modal-close-x-btn"
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            zIndex: 60,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#f1f5f9',
            color: '#334155',
            border: '1.5px solid #cbd5e1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ef4444';
            e.currentTarget.style.borderColor = '#f87171';
            e.currentTarget.style.color = '#ffffff';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f1f5f9';
            e.currentTarget.style.borderColor = '#cbd5e1';
            e.currentTarget.style.color = '#334155';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X style={{ width: '20px', height: '20px' }} strokeWidth={2.5} />
        </button>

        {/* Modal Header */}
        <div
          className="sticky top-0 z-20 shrink-0"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '16px 64px 16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0
          }}
        >
          <div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                backgroundColor: '#fff7ed',
                color: '#ea580c',
                border: '1px solid #fed7aa'
              }}
            >
              ESPECIFICACIONES TÉCNICAS
            </span>
            <h2
              className="font-display"
              style={{
                fontSize: '22px',
                color: '#0f172a',
                letterSpacing: '0.03em',
                marginTop: '4px',
                fontWeight: 800
              }}
            >
              Requerimientos de Personalización
            </h2>
          </div>
        </div>

        {/* Tab Switcher (Bordado vs Sublimado) */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            padding: '12px 20px',
            borderBottom: '1px solid #e2e8f0',
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '11px 18px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              border: '1px solid',
              backgroundColor: activeTab === 'bordado' ? '#f97316' : '#ffffff',
              borderColor: activeTab === 'bordado' ? '#ea580c' : '#e2e8f0',
              color: activeTab === 'bordado' ? '#ffffff' : '#64748b',
              boxShadow: activeTab === 'bordado' ? '0 4px 12px rgba(249, 115, 22, 0.25)' : 'none',
              transition: 'all 0.2s ease'
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '11px 18px',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              border: '1px solid',
              backgroundColor: activeTab === 'sublimado' ? '#f97316' : '#ffffff',
              borderColor: activeTab === 'sublimado' ? '#ea580c' : '#e2e8f0',
              color: activeTab === 'sublimado' ? '#ffffff' : '#64748b',
              boxShadow: activeTab === 'sublimado' ? '0 4px 12px rgba(249, 115, 22, 0.25)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <Layers style={{ width: '16px', height: '16px' }} />
            <span>Sublimado Full Print</span>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div
          id="requerimientos-modal-body"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{
            flex: '1 1 0%',
            minHeight: 0,
            overflowY: 'auto',
            padding: '24px',
            backgroundColor: '#ffffff',
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {/* TAB 1: BORDADO INDUSTRIAL */}
          {activeTab === 'bordado' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {/* Highlight Banner */}
              <div
                style={{
                  backgroundColor: '#fff7ed',
                  border: '1px solid #ffedd5',
                  borderRadius: '14px',
                  padding: '20px'
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#ea580c', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  ALTA DEFINICIÓN COMPUTARIZADA
                </span>
                <h3 className="font-display" style={{ fontSize: '22px', color: '#0f172a', marginTop: '4px', fontWeight: 800 }}>
                  REQUERIMIENTOS PARA BORDADOS
                </h3>
                <p style={{ fontSize: '14px', color: '#475569', marginTop: '8px', lineHeight: 1.6 }}>
                  Personaliza el uniforme de tu{' '}
                  <strong style={{ color: '#ea580c' }}>Marca, Negocio, Hotel, Restaurante o Inmobiliaria</strong> con puntada de máxima densidad, hilos de alta resistencia y calibración milimétrica.
                </p>
              </div>

              {/* Video Section */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '16px',
                  padding: '18px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
                  <Video style={{ width: '20px', height: '20px', color: '#ea580c' }} />
                  <h4 className="font-display" style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.02em' }}>
                    Video de Demostración: Bordado en Proceso
                  </h4>
                </div>
                <p style={{ fontSize: '12px', color: '#64748b' }}>
                  Conoce nuestra tecnología computarizada de bordado industrial multicabezal operando en taller.
                </p>
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#000000'
                  }}
                >
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/KVtucXUntoY?rel=0"
                    title="Bordados Uniformes PRE"
                    style={{ width: '100%', height: '100%', border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Section: Medidas & Carrusel de Dimensiones */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <Ruler style={{ width: '20px', height: '20px', color: '#ea580c' }} />
                  <h4 className="font-display" style={{ fontSize: '20px', color: '#0f172a', fontWeight: 800 }}>
                    Medidas para el Bordado
                  </h4>
                </div>

                {/* 3 Medidas Metric Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {BORDADO_MEDIDAS.map((m, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: '#f8fafc',
                        borderRadius: '12px',
                        padding: '16px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {m.title}
                      </span>
                      <p style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
                        {m.val}
                      </p>
                      <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', lineHeight: 1.5 }}>
                        {m.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Carrusel automático de dimensiones (1 sola foto visible, alterna cada 5s, sin título) */}
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '14px'
                  }}
                >
                  <div
                    onClick={() => setPreviewImage(BORDADO_DIAGRAMAS[bordadoIndex])}
                    className="group"
                    style={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: '520px',
                      height: '260px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    <img
                      src={BORDADO_DIAGRAMAS[bordadoIndex]}
                      alt={`Medida de bordado ${bordadoIndex + 1}`}
                      style={{ maxHeight: '92%', maxWidth: '92%', objectFit: 'contain', transition: 'all 0.4s ease' }}
                      loading="lazy"
                    />

                    {/* Prev / Next controls */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBordadoIndex((prev) => (prev - 1 + BORDADO_DIAGRAMAS.length) % BORDADO_DIAGRAMAS.length);
                      }}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        color: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      <ChevronLeft style={{ width: '18px', height: '18px' }} />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setBordadoIndex((prev) => (prev + 1) % BORDADO_DIAGRAMAS.length);
                      }}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        color: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      <ChevronRight style={{ width: '18px', height: '18px' }} />
                    </button>

                    <div
                      className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none"
                    >
                      <span
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#ea580c',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <ZoomIn style={{ width: '14px', height: '14px' }} />
                        Ampliar imagen
                      </span>
                    </div>
                  </div>

                  {/* Indicator Dots */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {BORDADO_DIAGRAMAS.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setBordadoIndex(idx)}
                        aria-label={`Ver imagen ${idx + 1}`}
                        style={{
                          height: '8px',
                          width: bordadoIndex === idx ? '24px' : '8px',
                          borderRadius: '4px',
                          backgroundColor: bordadoIndex === idx ? '#ea580c' : '#cbd5e1',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                    <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '6px' }}>
                      (Cambio automático cada 5s)
                    </span>
                  </div>
                </div>
              </div>

              {/* Requirements & Notices Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileText style={{ width: '18px', height: '18px', color: '#ea580c' }} />
                    <h4 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                      Requisitos de la Imagen
                    </h4>
                  </div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#334155' }}>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Resolución mínima:</strong> 300 DPI recomendada.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Formatos preferidos:</strong> Vectoriales (AI, EPS, PDF) o mapas de bits en alta calidad (PNG fondo transparente, JPG nítido).</span>
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Sin degradados complejos:</strong> Los bordados emplean hilos continuos en colores sólidos.</span>
                    </li>
                  </ul>
                </div>

                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Info style={{ width: '18px', height: '18px', color: '#ea580c' }} />
                    <h4 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                      Avisos Importantes
                    </h4>
                  </div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#334155' }}>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#ea580c', fontWeight: 800 }}>•</span>
                      <span><strong>Digitalización (Ponchado):</strong> Se realiza una sola vez y queda archivada para tus siguientes pedidos.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#ea580c', fontWeight: 800 }}>•</span>
                      <span><strong>Tiraje mínimo:</strong> A partir de 12 piezas para optimizar costo por prenda.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#ea580c', fontWeight: 800 }}>•</span>
                      <span><strong>Muestra previa:</strong> Enviamos fotografía de bordado real para tu visto bueno antes de maquilar.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Galería Bordados */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <h4 className="font-display" style={{ fontSize: '20px', color: '#0f172a', fontWeight: 800 }}>
                    Galería de Trabajos Realizados
                  </h4>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Haz clic en cualquier foto para ampliar</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {BORDADO_GALERIA.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setPreviewImage(img)}
                      className="group"
                      style={{
                        position: 'relative',
                        aspectRatio: '1/1',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
                      }}
                    >
                      <img
                        src={img}
                        alt={`Bordado muestra ${i + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.parentElement!.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ZoomIn style={{ width: '20px', height: '20px', color: '#ffffff' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: SUBLIMADO FULL PRINT */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {/* Highlight Banner */}
              <div
                style={{
                  backgroundColor: '#fff7ed',
                  border: '1px solid #ffedd5',
                  borderRadius: '14px',
                  padding: '20px'
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#ea580c', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  IMPRESIÓN TEXTIL POR TRANSFERENCIA TÉRMICA
                </span>
                <h3 className="font-display" style={{ fontSize: '22px', color: '#0f172a', marginTop: '4px', fontWeight: 800 }}>
                  REQUERIMIENTOS PARA SUBLIMADO
                </h3>
                <p style={{ fontSize: '14px', color: '#475569', marginTop: '8px', lineHeight: 1.6 }}>
                  Impresión de alta fidelidad para prendas de poliéster, licras deportivas, playeras técnicas y mantelería publicitaria sin límites de color ni tacto.
                </p>
              </div>

              {/* Video Section */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '16px',
                  padding: '18px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
                  <Video style={{ width: '20px', height: '20px', color: '#ea580c' }} />
                  <h4 className="font-display" style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.02em' }}>
                    Video Demostrativo: Proceso de Sublimación
                  </h4>
                </div>
                <p style={{ fontSize: '12px', color: '#64748b' }}>
                  Observa cómo la tinta se funde químicamente con la fibra textil a alta temperatura garantizando durabilidad de por vida.
                </p>
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16/9',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid #cbd5e1',
                    backgroundColor: '#000000'
                  }}
                >
                  <iframe
                    src="https://www.youtube-nocookie.com/embed/9wG5V-B6n-s?rel=0"
                    title="Sublimado Uniformes PRE"
                    style={{ width: '100%', height: '100%', border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Section: Medidas & Carrusel de Diagramas (Cambio cada 4s) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <Ruler style={{ width: '20px', height: '20px', color: '#ea580c' }} />
                  <h4 className="font-display" style={{ fontSize: '20px', color: '#0f172a', fontWeight: 800 }}>
                    Medidas y Formato de Archivo
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SUBLIMADO_MEDIDAS.map((m, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: '#f8fafc',
                        borderRadius: '12px',
                        padding: '16px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {m.title}
                      </span>
                      <p style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
                        {m.val}
                      </p>
                      <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', lineHeight: 1.5 }}>
                        {m.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Carrusel automático de diagramas de sublimado (Cambia cada 4s) */}
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '14px'
                  }}
                >
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 800,
                      color: '#ea580c',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {SUBLIMADO_DIAGRAMAS[sublimadoIndex].title}
                  </span>

                  <div
                    onClick={() => setPreviewImage(SUBLIMADO_DIAGRAMAS[sublimadoIndex].url)}
                    className="group"
                    style={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: '520px',
                      height: '260px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    <img
                      src={SUBLIMADO_DIAGRAMAS[sublimadoIndex].url}
                      alt={SUBLIMADO_DIAGRAMAS[sublimadoIndex].title}
                      style={{ maxHeight: '92%', maxWidth: '92%', objectFit: 'contain', transition: 'all 0.4s ease' }}
                      loading="lazy"
                    />

                    {/* Prev / Next buttons */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSublimadoIndex((prev) => (prev - 1 + SUBLIMADO_DIAGRAMAS.length) % SUBLIMADO_DIAGRAMAS.length);
                      }}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        color: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      <ChevronLeft style={{ width: '18px', height: '18px' }} />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSublimadoIndex((prev) => (prev + 1) % SUBLIMADO_DIAGRAMAS.length);
                      }}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        border: '1px solid #cbd5e1',
                        color: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      <ChevronRight style={{ width: '18px', height: '18px' }} />
                    </button>

                    <div
                      className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none"
                    >
                      <span
                        style={{
                          padding: '6px 14px',
                          borderRadius: '8px',
                          backgroundColor: '#ea580c',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <ZoomIn style={{ width: '14px', height: '14px' }} />
                        Ampliar imagen
                      </span>
                    </div>
                  </div>

                  {/* Indicator Dots */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {SUBLIMADO_DIAGRAMAS.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSublimadoIndex(idx)}
                        aria-label={`Ver diagrama ${idx + 1}`}
                        style={{
                          height: '8px',
                          width: sublimadoIndex === idx ? '24px' : '8px',
                          borderRadius: '4px',
                          backgroundColor: sublimadoIndex === idx ? '#ea580c' : '#cbd5e1',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                    <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '6px' }}>
                      (Cambio automático cada 4s)
                    </span>
                  </div>
                </div>
              </div>

              {/* Requirements & Applications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}
                >
                  <div style={{ display: 'center', alignItems: 'center', gap: '8px' }}>
                    <FileText style={{ width: '18px', height: '18px', color: '#ea580c' }} />
                    <h4 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                      Preparación de Archivos
                    </h4>
                  </div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#334155' }}>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Perfil de color:</strong> CMYK (FOGRA39 o US Web Coated) para tonos exactos.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Formato:</strong> TIFF, PDF o PSD en capas, tamaño real al 100% y 300 DPI.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#16a34a', flexShrink: 0, marginTop: '2px' }} />
                      <span><strong>Sangrado / Margen:</strong> Incluir 1.5 cm perimetral para compensar cortes y costuras.</span>
                    </li>
                  </ul>
                </div>

                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '16px',
                    padding: '20px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Info style={{ width: '18px', height: '18px', color: '#ea580c' }} />
                    <h4 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                      Telas y Aplicaciones
                    </h4>
                  </div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#334155' }}>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#ea580c', fontWeight: 800 }}>•</span>
                      <span><strong>Compatibilidad:</strong> Exclusivo para poliéster 100% o mezclas con mínimo 70% poliéster.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#ea580c', fontWeight: 800 }}>•</span>
                      <span><strong>Ideal para:</strong> Jerseys deportivos, lycras rash guard, playeras dry-fit, banderas y mantelería.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#ea580c', fontWeight: 800 }}>•</span>
                      <span><strong>Ventaja única:</strong> Cero tacto sobre la fibra, transpirabilidad total y sin cuartearse al lavado.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Galería de Sublimados Realizados (Sólo fotos válidas, sin fotos negras) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <h4 className="font-display" style={{ fontSize: '20px', color: '#0f172a', fontWeight: 800 }}>
                    Marcas con Sublimados de Alta Definición
                  </h4>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>Haz clic en cualquier imagen para ampliar</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {SUBLIMADO_GALERIA.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setPreviewImage(imgUrl)}
                      className="group"
                      style={{
                        position: 'relative',
                        aspectRatio: '1/1',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
                      }}
                    >
                      <img
                        src={imgUrl}
                        alt={`Sublimado muestra ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.parentElement!.style.display = 'none';
                        }}
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
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              marginTop: '28px'
            }}
          >
            <div style={{ flex: 1, minWidth: '240px' }}>
              <h5 className="font-display" style={{ fontSize: '18px', color: '#0f172a', fontWeight: 800 }}>
                ¿Deseas enviar tus archivos para validación o cotizar tu pedido?
              </h5>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
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
                padding: '12px 22px',
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
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)',
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
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
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
              maxWidth: '820px',
              maxHeight: '88vh',
              padding: '10px',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
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
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: '#0f172a',
                border: '1px solid #cbd5e1',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}
            >
              <X style={{ width: '20px', height: '20px' }} strokeWidth={2.5} />
            </button>
            <img
              src={previewImage}
              alt="Vista ampliada"
              style={{ maxHeight: '80vh', maxWidth: '100%', objectFit: 'contain', borderRadius: '10px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
