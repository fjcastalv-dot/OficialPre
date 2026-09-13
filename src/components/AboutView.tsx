import { Shield, Sparkles, Trophy, Lightbulb, Users, BarChart3, CheckCircle2, ArrowRight } from 'lucide-react';
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
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

          {/* Right: Asymmetric Photo Grid */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4">
            <div className="col-span-8 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-sm">
              <img
                src={trayImg1 || BORDADO_URL}
                alt="Detalle de Costura"
                className="w-full h-64 sm:h-80 object-cover rounded-xl transition-opacity duration-300"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (e.currentTarget.src !== BORDADO_URL) {
                    e.currentTarget.src = BORDADO_URL;
                  }
                }}
              />
            </div>
            <div className="col-span-4 self-center bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-sm">
              <img
                src={trayImg2 || CAPACIDAD_INDUSTRIAL_URL}
                alt="Uniformes Ejecutivos"
                className="w-full h-40 sm:h-48 object-cover rounded-xl transition-opacity duration-300"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (e.currentTarget.src !== CAPACIDAD_INDUSTRIAL_URL) {
                    e.currentTarget.src = CAPACIDAD_INDUSTRIAL_URL;
                  }
                }}
              />
            </div>
            <div className="col-span-12 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-sm">
              <img
                src={trayImg3 || TELAS_URL}
                alt="Chef Plating Uniform"
                className="w-full h-44 sm:h-52 object-cover rounded-xl transition-opacity duration-300"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (e.currentTarget.src !== TELAS_URL) {
                    e.currentTarget.src = TELAS_URL;
                  }
                }}
              />
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
