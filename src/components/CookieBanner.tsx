import { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

export default function CookieBanner({ onOpenPrivacy }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('pre_cookie_consent');
      if (!consent) {
        // Delay slightly for smooth appearance
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('pre_cookie_consent', 'accepted');
    } catch {}
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('pre_cookie_consent', 'essential');
    } catch {}
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:max-w-md md:max-w-lg z-50"
          id="cookie-consent-banner"
          role="region"
          aria-label="Consentimiento de cookies"
        >
          <div className="bg-slate-900/95 border border-slate-700/90 rounded-2xl p-5 shadow-2xl backdrop-blur-md text-slate-200 text-xs space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-orange-600/20 text-orange-500 border border-orange-500/30">
                  <Cookie className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm tracking-wide">
                    Privacidad y Cookies
                  </h4>
                  <span className="text-[10px] text-slate-400">Transparencia y Seguridad PRE</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleEssentialOnly}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Cerrar banner de cookies"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
              Utilizamos cookies técnicas y analíticas para guardar tus prendas cotizadas, recordar tus preferencias de tema y optimizar la velocidad en Cancún y la Riviera Maya conforme a nuestro{' '}
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="text-orange-400 hover:text-orange-300 underline underline-offset-2 cursor-pointer font-semibold inline"
              >
                Aviso de Privacidad
              </button>.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 py-2 px-4 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer shadow-md active:scale-95 text-center"
              >
                Aceptar todas
              </button>
              <button
                type="button"
                onClick={handleEssentialOnly}
                className="py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-all duration-150 cursor-pointer border border-slate-700 active:scale-95 text-center"
              >
                Solo necesarias
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
