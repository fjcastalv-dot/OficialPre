import { useState } from 'react';
// @ts-ignore
import brandLogo from '../assets/images/logo_pre.png';
import { LOGO_PRE_URL } from '../../imaganes/Imagenes inicio/Logo';
import { MapPin, Phone, Clock, Mail, Facebook, Instagram, Music, Linkedin } from 'lucide-react';
import { ActiveTab } from '../types';
import LegalDocsModal from './LegalDocsModal';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  openClubModal: () => void;
}

export default function Footer({ setActiveTab, openClubModal }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'returns'>('returns');

  const openLegalModal = (tab: 'privacy' | 'returns') => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <footer className="bg-brand-navy text-white/80 border-t border-white/10" id="app-footer">
      {/* Top Banner Contact Info */}
      <div className="bg-[#000654] border-b border-white/10 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
            <div className="p-3 rounded-full bg-white/10 text-orange-500 shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4
                className="font-semibold text-white text-sm uppercase tracking-wider"
                style={{ fontFamily: '"Bebas Neue", sans-serif' }}
              >
                Ubicación en Cancún
              </h4>
              <p className="text-xs text-white/70 mt-1 leading-relaxed">
                SM 92 Manzana 57, 58, 59 Y 60, MEGA Soriana Lopez Portillo, Local 7, C.P. 77516, Cancún, Quintana Roo, México.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
            <div className="p-3 rounded-full bg-white/10 text-orange-500 shrink-0">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Atención Telefónica / WhatsApp</h4>
              <div className="text-xs text-white/70 mt-1 space-y-1">
                <p>
                  Ventas: <a href="tel:+529989370850" className="text-white hover:text-orange-400 transition-colors font-medium">998 937 0850</a>
                  {' • '}
                  <a href="https://wa.me/529989370850" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-medium">WhatsApp</a>
                </p>
                <p>
                  Comercialización: <a href="tel:+529983415683" className="text-white hover:text-orange-400 transition-colors font-medium">998 341 5683</a>
                  {' • '}
                  <a href="https://wa.me/529983415683" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-medium">WhatsApp</a>
                </p>
                <p className="pt-1 flex flex-col gap-0.5">
                  <a href="mailto:ventas@uniformespre.com" className="hover:text-orange-300 transition-colors font-semibold text-orange-400">ventas@uniformespre.com</a>
                  <a href="mailto:comercializacion@uniformespre.com" className="hover:text-orange-300 transition-colors font-semibold text-orange-400">comercializacion@uniformespre.com</a>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
            <div className="p-3 rounded-full bg-white/10 text-orange-500 shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider">Horario de Servicio</h4>
              <p className="text-xs text-white/70 mt-1 leading-relaxed">
                Lunes a Sábado: 10:00 AM - 6:00 PM <br />
                Domingos: Cerrado
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Description */}
        <div className="col-span-1 md:col-span-1 flex flex-col space-y-4">
          <button
            onClick={() => {
              setActiveTab('inicio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="focus:outline-none cursor-pointer text-left block w-full"
            id="footer-logo-btn"
            aria-label="Ir a Inicio"
          >
            <img
              src={brandLogo || LOGO_PRE_URL}
              alt="Uniformes PRE - Prestige Apparel"
              className="w-[75%] max-w-[260px] sm:max-w-[280px] h-auto object-contain block"
              referrerPolicy="no-referrer"
              onError={(e) => {
                if (e.currentTarget.src !== LOGO_PRE_URL) {
                  e.currentTarget.src = LOGO_PRE_URL;
                }
              }}
            />
          </button>
          <p className="text-xs text-white/75 leading-relaxed">
            Vistiendo al Caribe Mexicano, con alcance nacional.
          </p>
          <div className="flex space-x-3 pt-2">
            <a
              href="https://www.facebook.com/uniformespree"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-orange-600 text-white/90 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/uniformespre?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-orange-600 text-white/90 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.tiktok.com/@uniformes.pre?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-orange-600 text-white/90 hover:text-white transition-colors"
              aria-label="TikTok"
            >
              <Music className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/company/uniformespre/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-orange-600 text-white/90 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Empresa */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">Empresa</h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button
                onClick={() => setActiveTab('inicio')}
                className="text-white/80 hover:text-orange-400 transition-colors cursor-pointer"
              >
                Inicio
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('catalogo')}
                className="text-white/80 hover:text-orange-400 transition-colors cursor-pointer"
              >
                Catálogo de Productos
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('quienes-somos')}
                className="text-white/80 hover:text-orange-400 transition-colors cursor-pointer"
              >
                Quiénes Somos
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('contacto')}
                className="text-white/80 hover:text-orange-400 transition-colors cursor-pointer"
              >
                Contacto
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Servicios */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white mb-4">Servicios</h3>
          <ul className="space-y-2.5 text-xs text-white/80">
            <li className="hover:text-orange-400 cursor-pointer transition-colors">
              Bordado Industrial
            </li>
            <li className="hover:text-orange-400 cursor-pointer transition-colors">
              Sublimación Full-Print de Alta Resolución
            </li>
            <li className="hover:text-orange-400 cursor-pointer transition-colors">
              Cambio de imagen corporativa
            </li>
            <li className="hover:text-orange-400 cursor-pointer transition-colors">
              Confección y Maquila a Gran Escala
            </li>
            <li className="hover:text-orange-400 cursor-pointer transition-colors">
              Personalización de Uniformes Corporativos
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="bg-[#000540] border-t border-white/10 py-6 text-center text-xs text-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>Copyright © {currentYear} Uniformes Pre</p>
          {/* Two distinct buttons side by side */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openLegalModal('returns')}
              type="button"
              className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 hover:bg-orange-600 hover:border-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm hover:shadow active:scale-95"
            >
              POLÍTICA DE DEVOLUCIONES Y CAMBIOS
            </button>
            <button
              onClick={() => openLegalModal('privacy')}
              type="button"
              className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 hover:bg-orange-600 hover:border-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm hover:shadow active:scale-95"
            >
              Aviso de Privacidad Uniformes PRE
            </button>
          </div>
        </div>
      </div>

      {/* Legal Documents Modal */}
      <LegalDocsModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalModalTab}
      />
    </footer>
  );
}
