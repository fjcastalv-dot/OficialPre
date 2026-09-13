import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Gift, AlertCircle } from 'lucide-react';
import { sanitizeText, validateName, validateEmail, checkRateLimit, recordSubmission } from '../security';

interface ClubPREModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClubPREModal({ isOpen, onClose }: ClubPREModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; general?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Reset submit state on modal open
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setEmail('');
      setName('');
      setCompany('');
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; general?: string } = {};

    const nameClean = sanitizeText(name);
    const emailClean = sanitizeText(email);
    const companyClean = sanitizeText(company);

    if (!validateName(nameClean)) {
      newErrors.name = 'Por favor ingresa un nombre válido (al menos 2 caracteres).';
    }
    if (!validateEmail(emailClean)) {
      newErrors.email = 'Por favor ingresa un correo corporativo válido.';
    }

    const rateCheck = checkRateLimit('club_pre', 4, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      newErrors.general = `Has alcanzado el límite de registros. Espera ${Math.ceil(rateCheck.remainingTimeMs / 60000)} minutos o escríbenos a WhatsApp.`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    recordSubmission('club_pre');
    setErrors({});
    setName(nameClean);
    setEmail(emailClean);
    setCompany(companyClean);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="club-pre-modal">
      {/* Dark overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Modal content block */}
      <div className="relative w-full max-w-2xl bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-y-visible">
        {/* Left column: High impact image block */}
        <div className="relative w-full md:w-1/2 h-48 md:h-auto bg-slate-800 flex flex-col justify-end p-6 min-h-[220px]">
          <img
            src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600"
            alt="Club PRE Premium Fabrics"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1 bg-orange-600/90 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded mb-3">
              <Sparkles className="h-3 w-3" /> Membresía Club PRE
            </span>
            <h3 className="font-display text-4xl text-white tracking-wide leading-none">
              BENEFICIOS <br />EXCLUSIVOS
            </h3>
            <p className="text-xs text-slate-300 mt-2 font-sans">
              Únase hoy mismo y vista el éxito de su corporación con condiciones inigualables en todo el Caribe Mexicano.
            </p>
          </div>
        </div>

        {/* Right column: Interactive form / Success message */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center text-slate-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none cursor-pointer"
            aria-label="Cerrar modal"
            id="close-club-modal-btn"
          >
            <X className="h-4 w-4" />
          </button>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div>
                <h4 className="font-display text-2xl tracking-wide text-white">
                  ÚNETE AL CLUB PRE
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Regístrese gratis y obtenga beneficios inmediatos para su empresa.
                </p>
              </div>

              {/* Benefits list bullet points */}
              <div className="space-y-2 py-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="mt-0.5 text-orange-500 font-bold">✓</span>
                  <p><strong>10% de Descuento</strong> en su primera cotización formal.</p>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="mt-0.5 text-orange-500 font-bold">✓</span>
                  <p><strong>Bordado de Muestra Gratis</strong> de su logotipo corporativo.</p>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="mt-0.5 text-orange-500 font-bold">✓</span>
                  <p><strong>Atención prioritaria 24/7</strong> con un asesor de diseño dedicado.</p>
                </div>
              </div>

              {errors.general && (
                <div className="p-3 bg-red-950/50 border border-red-800/80 rounded-lg text-red-300 text-xs flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-400" />
                  <span>{errors.general}</span>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label htmlFor="club-name" className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="club-name"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Ej. Ing. Alejandro Gómez"
                    className={`w-full bg-slate-800 border ${
                      errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'
                    } rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 inline" /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="club-company" className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Empresa / Hotel
                  </label>
                  <input
                    type="text"
                    id="club-company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ej. Hotel Riviera Cancun"
                    className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="club-email" className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    Correo Corporativo *
                  </label>
                  <input
                    type="email"
                    required
                    id="club-email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="ejemplo@empresa.com"
                    className={`w-full bg-slate-800 border ${
                      errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-700'
                    } rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 inline" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-2.5 rounded border border-slate-700 hover:bg-slate-800 active:scale-95 text-slate-400 hover:text-white font-medium text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Ahora no
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-orange-950/20"
                >
                  Registrarse
                </button>
              </div>
            </form>
          ) : (
            // Success Block
            <div className="flex flex-col items-center justify-center text-center space-y-5 py-6">
              <div className="h-16 w-16 rounded-full bg-orange-950/60 border border-orange-500/30 text-orange-500 flex items-center justify-center text-3xl animate-bounce">
                🎉
              </div>
              <div>
                <h4 className="font-display text-3xl text-white tracking-wide">
                  ¡BIENVENIDO AL CLUB PRE, {name.split(' ')[0].toUpperCase()}!
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Su membresía ha sido registrada exitosamente. Un asesor se pondrá en contacto para coordinar su muestra de bordado gratis.
                </p>
              </div>

              {/* Coupon Reward display */}
              <div className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 h-12 w-12 bg-orange-600 rotate-45 translate-x-6 -translate-y-6 flex items-end justify-center pb-1">
                  <Gift className="h-3 w-3 text-white -rotate-45" />
                </div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Código de Descuento Inmediato:</span>
                <span className="text-2xl font-mono text-orange-500 font-bold tracking-widest mt-1">
                  CLUBPRE10
                </span>
                <p className="text-[10px] text-slate-500 mt-1.5">
                  10% de descuento formal en su primer pedido. Mencione este código a su asesor.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Comenzar a Comprar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
