import React, { useState, useEffect } from 'react';
import { X, Ruler, FileText, CheckCircle2, Sparkles, Layers, Video, MessageSquare, ZoomIn, Info, ChevronLeft, ChevronRight } from 'lucide-react';

interface RequerimientosModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'bordado' | 'sublimado';
}

const BORDADO_MEDIDAS = [
  'Para el pecho: La base debe ser de 8 cm.',
  'Para las mangas o gorras: La base debe ser de 6 cm.',
  'Para letras pequeñas, la altura mínima debe ser de 0.6 cm.'
];

const BORDADO_REQUISITOS = [
  'Se necesita una imagen de buena o media calidad para bordar el logo.',
  'Formatos de imagen PNG,  JPG, TIF, EPS, PDF.'
];

const BORDADO_AVISOS = [
  'A partir de 12 piezas se bordará si eres cliente nuevo.',
  'El diseñador(a) ajustará al diseño a las medidas si es necesario.',
  'Se enviarán fotos de muestras del bordado al cliente y  se realizarán ajustes de ser requeridos.'
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
  'Ancho máximo: 150 cm',
  'Largo mínimo: 500 cm'
];

const SUBLIMADO_REQUISITOS = [
  'Se necesita una imagen de muy buena calidad o vectores.',
  'Formatos de imagen PNG, a JPG, TIF, EPS, PDF.',
  'Si tienes un diseño, especificar si va en CMYK o RGB.',
  'Formatos de diseño cdr, ai, PDF, PNG, EPS, JPG'
];

const SUBLIMADO_AVISOS = [
  'Para tela full print lo minimo son 5 m.',
  'Para diseño por uniforme, el pedido minimo son 12 piezas',
  'Solo telas que sean 100% poliéster.',
  'El diseñador(a) ajustará al diseño a las medidas si es necesario.',
  'Se enviarán fotos de muestras del sublimado al cliente y  se realizarán ajustes de ser requeridos.'
];

const SUBLIMADO_DIAGRAMAS = [
  'https://uniformespre.com/wp-content/uploads/2024/02/logo-pecho-5-1.png',
  'https://uniformespre.com/wp-content/uploads/2024/02/logo-pecho-7.png',
  'https://uniformespre.com/wp-content/uploads/2024/02/logo-pecho-6.png'
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

  // Bloqueo de scroll de la página de fondo
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

  // Auto carrusel Bordado: cambia cada 5s
  useEffect(() => {
    if (!isOpen || activeTab !== 'bordado') return;
    const timer = setInterval(() => {
      setBordadoIndex((prev) => (prev + 1) % BORDADO_DIAGRAMAS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isOpen, activeTab]);

  // Auto carrusel Sublimado: cambia cada 4s
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
      {/* Fondo oscuro para cerrar */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}
      />

      {/* Tarjeta Principal Blanca (Modo Claro) */}
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
        {/* Botón Cerrar "X" Destacado en Esquina Superior Derecha */}
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

        {/* Encabezado Superior Blanco */}
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

        {/* Selector de Pestañas */}
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

        {/* Cuerpo Desplazable del Modal */}
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
          {/* TAB 1: BORDADOS */}
          {activeTab === 'bordado' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              {/* Título Principal */}
              <div
                style={{
                  backgroundColor: '#fff7ed',
                  border: '1px solid #ffedd5',
                  borderRadius: '14px',
                  padding: '18px 20px'
                }}
              >
                <h3 className="font-display" style={{ fontSize: '22px', color: '#0f172a', fontWeight: 800 }}>
                  REQUERIMIENTOS PARA BORDADOS
                </h3>
              </div>

              {/* Sección 1: Medidas para el bordado */}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <Ruler style={{ width: '20px', height: '20px', color: '#ea580c' }} />
                  <h4 className="font-display" style={{ fontSize: '18px', color: '#0f172a', fontWeight: 800 }}>
                    Medidas para el bordado
                  </h4>
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#334155' }}>
                  {BORDADO_MEDIDAS.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#16a34a', flexShrink: 0, marginTop: '3px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Carrusel de 2 fotos de dimensiones (Sin títulos, cambia cada 5s) */}
                <div
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div
                    onClick={() => setPreviewImage(BORDADO_DIAGRAMAS[bordadoIndex])}
                    className="group"
                    style={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: '680px',
                      height: '350px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      padding: '12px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    <img
                      src={BORDADO_DIAGRAMAS[bordadoIndex]}
                      alt={`Dimensión de bordado ${bordadoIndex + 1}`}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', transition: 'all 0.4s ease' }}
                      loading="lazy"
                    />

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

                  {/* Indicadores */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
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
                  </div>
                </div>
              </div>

              {/* Sección 2: Requisitos de la imagen */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <FileText style={{ width: '18px', height: '18px', color: '#ea580c' }} />
                  <h4 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                    Requisitos de la imagen
                  </h4>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#334155' }}>
                  {BORDADO_REQUISITOS.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#16a34a', flexShrink: 0, marginTop: '3px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sección 3: Avisos */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <Info style={{ width: '18px', height: '18px', color: '#ea580c' }} />
                  <h4 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                    Avisos
                  </h4>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#334155' }}>
                  {BORDADO_AVISOS.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#ea580c', fontWeight: 800 }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Video de Demostración */}
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
            /* TAB 2: SUBLIMADOS */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              {/* Título Principal */}
              <div
                style={{
                  backgroundColor: '#fff7ed',
                  border: '1px solid #ffedd5',
                  borderRadius: '14px',
                  padding: '18px 20px'
                }}
              >
                <h3 className="font-display" style={{ fontSize: '22px', color: '#0f172a', fontWeight: 800 }}>
                  REQUERIMIENTOS PARA SUBLIMADOS
                </h3>
              </div>

              {/* Sección 1: Medidas para el diseño full print */}
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <Ruler style={{ width: '20px', height: '20px', color: '#ea580c' }} />
                  <h4 className="font-display" style={{ fontSize: '18px', color: '#0f172a', fontWeight: 800 }}>
                    Medidas para el diseño full print
                  </h4>
                </div>

                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#334155' }}>
                  {SUBLIMADO_MEDIDAS.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#16a34a', flexShrink: 0, marginTop: '3px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Carrusel automático de diagramas de sublimado (Cambia cada 4s) */}
                <div
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                {/* Carrusel automático de diagramas de sublimado */}
                <div
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div
                    onClick={() => setPreviewImage(SUBLIMADO_DIAGRAMAS[sublimadoIndex])}
                    className="group"
                    style={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: '680px',
                      height: '350px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      padding: '12px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    <img
                      src={SUBLIMADO_DIAGRAMAS[sublimadoIndex]}
                      alt={`Diagrama de sublimado ${sublimadoIndex + 1}`}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', transition: 'all 0.4s ease' }}
                      loading="lazy"
                    />

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

                  {/* Indicadores */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
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
                  </div>
                </div>
              </div>

              {/* Sección 2: Requisitos de la imagen o diseño */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <FileText style={{ width: '18px', height: '18px', color: '#ea580c' }} />
                  <h4 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                    Requisitos de la imagen o diseño
                  </h4>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#334155' }}>
                  {SUBLIMADO_REQUISITOS.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#16a34a', flexShrink: 0, marginTop: '3px' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sección 3: Avisos */}
              <div
                style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px' }}>
                  <Info style={{ width: '18px', height: '18px', color: '#ea580c' }} />
                  <h4 className="font-display" style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                    Avisos
                  </h4>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#334155' }}>
                  {SUBLIMADO_AVISOS.map((item, idx) => (
                    <li key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#ea580c', fontWeight: 800 }}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Video Sublimado */}
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
