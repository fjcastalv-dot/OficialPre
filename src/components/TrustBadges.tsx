import React from 'react';
import { ShieldCheck, Lock, Factory, MapPin, Truck, FileCheck, Award } from 'lucide-react';

interface TrustBadgesProps {
  variant?: 'full' | 'compact' | 'drawer';
  className?: string;
}

export default function TrustBadges({ variant = 'full', className = '' }: TrustBadgesProps) {
  const badges = [
    {
      icon: ShieldCheck,
      title: 'Garantía Textil 100%',
      desc: 'Telas anti-mancha y costuras reforzadas para uso industrial en el Caribe.',
      color: 'text-emerald-400',
    },
    {
      icon: Lock,
      title: 'Cotización Cifrada SSL',
      desc: 'Protección estricta de datos personales y comerciales bajo protocolo HTTPS.',
      color: 'text-blue-400',
    },
    {
      icon: Factory,
      title: 'Maquila y Mayoreo Directo',
      desc: 'Capacidad masiva de producción para hoteles, cadenas y corporativos.',
      color: 'text-orange-400',
    },
    {
      icon: MapPin,
      title: 'Tienda Física en Cancún',
      desc: 'Av. López Portillo (Mega Soriana), con muestrarios y bordadoras en sitio.',
      color: 'text-amber-400',
    },
    {
      icon: Truck,
      title: 'Entrega Riviera Maya',
      desc: 'Cobertura en Cancún, Playa del Carmen, Tulum, Cozumel e Isla Mujeres.',
      color: 'text-cyan-400',
    },
    {
      icon: FileCheck,
      title: 'Facturación CFDI 4.0',
      desc: 'Precios netos con IVA incluido y facturación fiscal inmediata.',
      color: 'text-emerald-400',
    },
  ];

  if (variant === 'drawer') {
    return (
      <div className={`grid grid-cols-2 gap-2 text-left ${className}`}>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
          <div className="min-w-0">
            <span className="block text-[10px] font-bold text-slate-200 truncate">Garantía de Fábrica</span>
            <span className="block text-[8px] text-slate-400">100% Calidad textil</span>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
          <Lock className="h-4 w-4 text-blue-400 shrink-0" />
          <div className="min-w-0">
            <span className="block text-[10px] font-bold text-slate-200 truncate">Cifrado Seguro</span>
            <span className="block text-[8px] text-slate-400">Protección SSL 256-bit</span>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
          <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
          <div className="min-w-0">
            <span className="block text-[10px] font-bold text-slate-200 truncate">Sucursal Cancún</span>
            <span className="block text-[8px] text-slate-400">Mega Soriana L. Portillo</span>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
          <FileCheck className="h-4 w-4 text-cyan-400 shrink-0" />
          <div className="min-w-0">
            <span className="block text-[10px] font-bold text-slate-200 truncate">Factura Legal</span>
            <span className="block text-[8px] text-slate-400">CFDI 4.0 con IVA</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center justify-center gap-4 text-xs ${className}`}>
        {badges.slice(0, 4).map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2 py-1.5 px-3 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-[11px]"
            >
              <Icon className={`h-3.5 w-3.5 ${badge.color}`} />
              <span className="font-medium text-slate-200">{badge.title}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`} id="trust-badges-section">
      <div className="text-center space-y-1">
        <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest block">
          COMPROMISO Y CONFIABILIDAD
        </span>
        <h3 className="font-display text-3xl sm:text-4xl text-white tracking-wider">
          POR QUÉ ELEGIR UNIFORMES PRE
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Protocolos de calidad certificados, respaldo legal y presencia física permanente en Cancún.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex items-start gap-3.5 text-left group shadow-sm hover:shadow-md hover:-translate-y-0.5 duration-200"
            >
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 group-hover:scale-110 transition-transform shrink-0 shadow-inner">
                <Icon className={`h-5 w-5 ${badge.color}`} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-white uppercase tracking-wider" style={{ fontFamily: 'Verdana, sans-serif' }}>
                  {badge.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  {badge.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
