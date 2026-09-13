import React from 'react';
import { Compass, ArrowLeft, Search, Utensils, Sparkles, Stethoscope, Briefcase, ShieldAlert } from 'lucide-react';
import { ActiveTab } from '../types';

interface NotFoundViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  setFilterCategory?: (category: string) => void;
}

export default function NotFoundView({ setActiveTab, setFilterCategory }: NotFoundViewProps) {
  const quickCategories = [
    { id: 'hoteleria', label: 'Hotelería', icon: Sparkles },
    { id: 'restaurante', label: 'Restaurante', icon: Utensils },
    { id: 'medico', label: 'Médico', icon: Stethoscope },
    { id: 'industrial', label: 'Industria', icon: ShieldAlert },
  ];

  const handleCategoryNav = (catId: string) => {
    if (setFilterCategory) setFilterCategory(catId);
    setActiveTab('catalogo');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 animate-fade-in" id="not-found-view">
      <div className="max-w-xl w-full text-center space-y-8 bg-slate-900/90 border border-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Subtle orange ambient glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Icon & 404 badge */}
        <div className="space-y-3">
          <div className="w-20 h-20 rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-orange-500 shadow-inner">
            <Compass className="h-10 w-10 animate-spin [animation-duration:15s]" />
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-orange-600/15 border border-orange-500/30 text-orange-400 font-mono text-xs font-bold uppercase tracking-widest">
            ERROR 404
          </span>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h1 className="font-display text-5xl sm:text-6xl text-white tracking-wider leading-none">
            PÁGINA NO ENCONTRADA
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-md mx-auto leading-relaxed">
            La página, prenda o enlace que buscas no existe o ha sido reubicada en nuestro nuevo catálogo de uniformes de alto rendimiento.
          </p>
        </div>

        {/* Quick Suggestions */}
        <div className="space-y-3 pt-2">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block">
            Explora las secciones principales:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {quickCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryNav(cat.id)}
                  className="flex items-center gap-1.5 py-2 px-3.5 rounded-full bg-slate-950 hover:bg-orange-600/20 text-slate-300 hover:text-orange-400 border border-slate-800 hover:border-orange-500/40 text-xs font-medium transition-all cursor-pointer"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => setActiveTab('inicio')}
            className="py-3 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer shadow-lg shadow-orange-950/30 flex items-center justify-center gap-2 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" /> Ir al Inicio
          </button>
          <button
            type="button"
            onClick={() => {
              if (setFilterCategory) setFilterCategory('todos');
              setActiveTab('catalogo');
            }}
            className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-bold text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer flex items-center justify-center gap-2 active:scale-95"
          >
            <Search className="h-4 w-4 text-orange-500" /> Ver Todo el Catálogo
          </button>
        </div>
      </div>
    </div>
  );
}
