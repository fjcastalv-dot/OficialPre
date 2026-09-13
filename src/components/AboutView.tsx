import { useState, useRef } from 'react';
import { Shield, Sparkles, Trophy, Lightbulb, Users, BarChart3, CheckCircle2, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { ActiveTab } from '../types';
// @ts-ignore
import regeneratedHeroImg from '../assets/images/a_prueba_de_sudor.jpg';
// @ts-ignore
import trayImg1 from '../assets/images/bordado_service.jpg';
// @ts-ignore
import trayImg2 from '../assets/images/capacidad_industrial_service.jpg';
// @ts-ignore
import trayImg3 from '../assets/images/telas_service.jpg';
import { A_PRUEBA_DE_SUDOR_URL } from '../../imaganes/Imagenes inicio/A prueba de sudor';
import { BORDADO_URL } from '../../imaganes/Imagenes inicio/Bordado';
import { CAPACIDAD_INDUSTRIAL_URL } from '../../imaganes/Imagenes inicio/Capacidad industrial';
import { TELAS_URL } from '../../imaganes/Imagenes inicio/Telas';
import { QUIENES_SOMOS_URL } from '../../imaganes/Quienes somos';
import { LISTO_URL } from '../../imaganes/Listo';

interface AboutViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function AboutView({ setActiveTab }: AboutViewProps) {
  const [isTrayVideoMuted, setIsTrayVideoMuted] = useState(true);
  const [isTrayPlaying, setIsTrayPlaying] = useState(true);
  const [trayCurrentTime, setTrayCurrentTime] = useState(0);
  const [trayDuration, setTrayDuration] = useState(0);
  const trayVideoRef = useRef<HTMLVideoElement>(null);

  const toggleTrayVideoMute = () => {
    if (trayVideoRef.current) {
      const nextMuted = !trayVideoRef.current.muted;
      trayVideoRef.current.muted = nextMuted;
      setIsTrayVideoMuted(nextMuted);
      if (!nextMuted) {
        trayVideoRef.current.play().catch(() => {});
      }
    }
  };

  const toggleTrayPlay = () => {
    if (trayVideoRef.current) {
      if (trayVideoRef.current.paused) {
        trayVideoRef.current.play();
        setIsTrayPlaying(true);
      } else {
        trayVideoRef.current.pause();
        setIsTrayPlaying(false);
      }
    }
  };

  const skipTrayTime = (seconds: number) => {
    if (trayVideoRef.current) {
      const newTime = Math.max(0, Math.min(trayVideoRef.current.duration || 0, trayVideoRef.current.currentTime + seconds));
      trayVideoRef.current.currentTime = newTime;
      setTrayCurrentTime(newTime);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (trayVideoRef.current && trayVideoRef.current.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickPos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const newTime = clickPos * trayVideoRef.current.duration;
      trayVideoRef.current.currentTime = newTime;
      setTrayCurrentTime(newTime);
    }
  };

  const formatVideoTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const pillars = [
    {
      num: '01',
      title: 'Calidad Técnica',
      badges: ['Anti-mancha', 'Transpirable', 'Secado Rápido', 'Resistencia UV'],
      description:
        'Seleccionamos hilos y composiciones de fibras técnicas que repelen líquidos, reducen manchas de grasa corporales y maximizan la evaporación del vapor del sudor.',
    },
    {
      num: '02',
      title: 'Asesoría 360°',
      badges: ['Muestras físicas', 'Logística integrada', 'Asignación de Ejecutivo'],
      description:
        'Le acompañamos en cada paso de este importante proceso con escucha activa y servicio.',
    },
    {
      num: '03',
      title: 'Diseño Vanguardista',
      badges: ['Ergonomía', 'Cortes modernos', 'Durabilidad extrema'],
      description:
        'Nuestros patrones respetan los movimientos operativos del personal de cocina, camaristas o ingenieros de campo, combinando confort con una silueta estilizada.',
    },
  ];

  const stats = [
    { value: '13+', label: 'Años de historia' },
    { value: '100k+', label: 'Prendas confeccionadas' },
    { value: '100+', label: 'Clientes corporativos' },
    { value: '100%', label: 'Compromiso con nuestros clientes' },
  ];

  return (
    <div className="space-y-20 pb-16 animate-fade-in" id="about-view">
      {/* ==========================================
          HERO BANNER
          ========================================== */}
      <section className="relative bg-slate-950 overflow-hidden min-h-[460px] sm:min-h-[500px] flex items-center border-b border-slate-800/60">
        {/* Background Image from Quienes somos with refined overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={QUIENES_SOMOS_URL}
            alt="Fábrica y Equipo de Uniformes PRE"
            className="w-full h-full object-cover object-center opacity-85 transition-opacity duration-300"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-left">
          <span className="text-orange-500 text-xs font-semibold tracking-widest uppercase block mb-4">
            NUESTRA HISTORIA
          </span>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl tracking-wider text-white leading-none">
            13 AÑOS CREANDO UNIFORMES <br />
            <span className="text-orange-500">QUE REPRESENTAN GRANDES EMPRESAS</span>
          </h1>
          <p className="mt-4 max-w-xl text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            Durante más de 13 años, en Uniformes PRE hemos diseñado y fabricado soluciones textiles para empresas de diferentes industrias y necesidades.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://maps.google.com/?q=Uniformes+PRE+Cancun+Soriana+Lopez+Portillo"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 rounded bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-orange-600/20 inline-flex items-center justify-center"
            >
              Nuestro punto de venta
            </a>
          </div>
        </div>
      </section>

      {/* ==========================================
          STATS TICKER
          ========================================== */}
      <section className="bg-slate-900 border-y border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="font-display text-4xl sm:text-5xl text-orange-500 tracking-wider block">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-400 font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          NUESTRA TRAYECTORIA SECTION
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="trayectoria-section">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Narrative */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-[10px] text-orange-500 uppercase tracking-widest font-bold">Hecho en México</span>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide leading-none">
              PRECISIÓN EN <br />CADA PUNTADA
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Nuestra experiencia comenzó en el Caribe Mexicano, trabajando de cerca con sectores como hotelería, gastronomía, industria, educación y corporativo, y hoy nos permite desarrollar uniformes para clientes en diferentes regiones de México.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Diseño, fabricación y experiencia para vestir equipos que representan grandes marcas.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              Contáctanos y con gusto te ayudaremos a elegir la mejor opción para tu negocio:{' '}
              <a 
                href="https://wa.me/529989370850" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-orange-500 hover:text-orange-400 font-semibold underline underline-offset-4 transition-colors"
              >
                WhatsApp +52 9989370850
              </a>
            </p>
          </div>

          {/* Right: Video Container */}
          <div className="lg:col-span-7 flex justify-center lg:justify-start">
            <div 
              className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group select-none"
              style={{ maxWidth: '380px', aspectRatio: '9 / 16' }}
            >
              <video
                ref={trayVideoRef}
                src="./videos/precision_puntada_instagram.mp4"
                autoPlay
                loop
                muted={isTrayVideoMuted}
                playsInline
                onClick={toggleTrayPlay}
                onTimeUpdate={() => {
                  if (trayVideoRef.current) {
                    setTrayCurrentTime(trayVideoRef.current.currentTime);
                  }
                }}
                onLoadedMetadata={() => {
                  if (trayVideoRef.current) {
                    setTrayDuration(trayVideoRef.current.duration);
                  }
                }}
                onPlay={() => setIsTrayPlaying(true)}
                onPause={() => setIsTrayPlaying(false)}
                className="w-full h-full object-cover cursor-pointer"
              />

              {/* Big center play icon when paused */}
              {!isTrayPlaying && (
                <button
                  onClick={toggleTrayPlay}
                  type="button"
                  aria-label="Reproducir video"
                  className="absolute inset-0 m-auto h-16 w-16 rounded-full bg-slate-900/85 hover:bg-slate-900 border border-white/30 text-white flex items-center justify-center backdrop-blur-md shadow-2xl transition-transform active:scale-90 cursor-pointer z-10"
                >
                  <svg className="h-8 w-8 translate-x-0.5 fill-current" viewBox="0 0 24 24">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </button>
              )}

              {/* Bottom Gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Bottom Media Controls */}
              <div className="absolute inset-x-0 bottom-0 p-3 space-y-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Progress bar with scrubber */}
                <div 
                  className="w-full h-2 bg-white/25 hover:h-3 rounded-full cursor-pointer relative transition-all group/bar flex items-center"
                  onClick={handleProgressBarClick}
                  title="Avanzar / retroceder en la barra"
                >
                  <div 
                    className="h-full bg-orange-500 rounded-full relative"
                    style={{ width: `${(trayCurrentTime / (trayDuration || 1)) * 100}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover/bar:scale-100 transition-transform" />
                  </div>
                </div>

                {/* Control buttons row */}
                <div className="flex items-center justify-between text-white text-xs">
                  <div className="flex items-center space-x-1.5">
                    {/* Play/Pause */}
                    <button
                      onClick={toggleTrayPlay}
                      type="button"
                      aria-label={isTrayPlaying ? "Pausar" : "Reproducir"}
                      title={isTrayPlaying ? "Pausar" : "Reproducir"}
                      className="p-1.5 rounded-full bg-slate-900/85 hover:bg-slate-800 border border-white/20 transition-all cursor-pointer"
                    >
                      {isTrayPlaying ? (
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                          <rect x="6" y="4" width="4" height="16" />
                          <rect x="14" y="4" width="4" height="16" />
                        </svg>
                      ) : (
                        <svg className="h-3.5 w-3.5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      )}
                    </button>

                    {/* Rewind -5s */}
                    <button
                      onClick={() => skipTrayTime(-5)}
                      type="button"
                      aria-label="Retroceder 5 segundos"
                      title="Retroceder 5s"
                      className="px-1.5 py-1 rounded-full bg-slate-900/85 hover:bg-slate-800 border border-white/20 transition-all cursor-pointer flex items-center gap-0.5 text-[10px] font-bold"
                    >
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="11 17 6 12 11 7" />
                        <polyline points="18 17 13 12 18 7" />
                      </svg>
                      <span>-5s</span>
                    </button>

                    {/* Forward +5s */}
                    <button
                      onClick={() => skipTrayTime(5)}
                      type="button"
                      aria-label="Avanzar 5 segundos"
                      title="Avanzar 5s"
                      className="px-1.5 py-1 rounded-full bg-slate-900/85 hover:bg-slate-800 border border-white/20 transition-all cursor-pointer flex items-center gap-0.5 text-[10px] font-bold"
                    >
                      <span>+5s</span>
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="13 17 18 12 13 7" />
                        <polyline points="6 17 11 12 6 7" />
                      </svg>
                    </button>

                    {/* Time indicator */}
                    <span className="text-[10px] text-slate-300 font-mono tracking-tight pl-1">
                      {formatVideoTime(trayCurrentTime)} / {formatVideoTime(trayDuration)}
                    </span>
                  </div>

                  {/* Sound toggle button */}
                  <button
                    onClick={toggleTrayVideoMute}
                    type="button"
                    aria-label={isTrayVideoMuted ? "Activar sonido" : "Silenciar video"}
                    title={isTrayVideoMuted ? "Activar sonido" : "Silenciar video"}
                    className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-slate-900/85 hover:bg-slate-800 border border-white/20 text-xs font-semibold backdrop-blur-md transition-all cursor-pointer"
                  >
                    {isTrayVideoMuted ? (
                      <>
                        <VolumeX className="h-3 w-3 text-orange-400" />
                        <span className="text-[10px] font-medium text-slate-200">Activar sonido</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-3 w-3 text-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-medium text-emerald-300">Silenciar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          LOS PILARES DEL PRESTIGE (Bento Columns)
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wider">
            Los pilares Pre uniformes
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((pil) => (
            <div
              key={pil.num}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 text-left hover:border-orange-500/30 transition-colors group"
            >
              <div className="space-y-4">
                <span className="font-mono text-4xl text-orange-500/35 font-bold group-hover:text-orange-500/90 transition-colors">
                  {pil.num}
                </span>
                <h3 className="font-display text-2xl text-white tracking-wide">
                  {pil.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {pil.description}
                </p>
              </div>

              {/* Chips list */}
              <div className="flex flex-wrap gap-2 border-t border-slate-800/80 pt-4">
                {pil.badges.map((badge, bIdx) => (
                  <span
                    key={bIdx}
                    className="text-[9px] font-semibold bg-slate-950 border border-slate-800/60 text-slate-400 px-2 py-1 rounded"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          ASYMMETRIC EXEC BLOCK
          ========================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col lg:flex-row h-full shadow-sm">
          {/* Left Column: Image with overlay */}
          <div className="lg:w-1/2 relative min-h-[300px] h-64 lg:h-auto bg-slate-950">
            <img
              src={LISTO_URL}
              alt="Ejecutivos y Uniformes Corporativos"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-6 left-6 z-10 bg-orange-600 text-white font-display text-2xl tracking-wider py-2 px-5 rounded uppercase shadow-lg">
              Vistiendo el éxito
            </div>
          </div>

          {/* Right Column: Text & CTAs */}
          <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-[10px] text-orange-500 uppercase tracking-widest font-bold">Proyección Corporativa</span>
              <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide leading-none">
                TU EQUIPO TAMBIÉN ES PARTE DE TU MARCA
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                El uniforme es uno de los primeros elementos que tus clientes perciben. Diseñamos prendas que combinan identidad, funcionalidad y comodidad para que cada integrante de tu equipo proyecte la esencia y el profesionalismo de tu empresa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => setActiveTab('contacto')}
                className="py-3 px-6 rounded bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer text-center shadow-lg shadow-orange-600/20"
              >
                TRANSFORMA LA IMAGEN DE TU EQUIPO
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
