import React from 'react';
import {
  CircleDollarSign,
  Calculator,
  Building2,
  Truck,
  BookOpen,
  Sun,
  Moon,
} from 'lucide-react';
import { Theme } from '../../utils/themeStore';
import { CotizaBoLogo } from '../common/CotizaBoLogo';

export type TabType = 'divisas' | 'calculadoras' | 'casas' | 'proveedores' | 'guias';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, theme, onToggleTheme }) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'divisas',      label: 'Cotizaciones',   icon: <CircleDollarSign className="w-5 h-5 md:w-4 md:h-4" /> },
    { id: 'calculadoras', label: 'Calculadoras',   icon: <Calculator className="w-5 h-5 md:w-4 md:h-4" /> },
    { id: 'casas',        label: 'Casas de Cambio', icon: <Building2 className="w-5 h-5 md:w-4 md:h-4" /> },
    { id: 'proveedores',  label: 'Proveedores',    icon: <Truck className="w-5 h-5 md:w-4 md:h-4" /> },
    { id: 'guias',        label: 'Guías',          icon: <BookOpen className="w-5 h-5 md:w-4 md:h-4" /> },
  ];

  return (
    <>
      {/* ── Barra Superior (Header) ── */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo y Marca */}
            <div
              onClick={() => onTabChange('divisas')}
              className="flex items-center cursor-pointer group shrink-0 active:scale-95 transition-transform"
            >
              <CotizaBoLogo size="md" showTagline={true} />
            </div>

            {/* Navegación Desktop */}
            <nav className="hidden md:flex items-center space-x-1 flex-1 justify-center">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-400/30 shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Controles Derecha (Tema Día / Noche) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onToggleTheme}
                aria-label={theme === 'dark' ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
                title={theme === 'dark' ? 'Modo día' : 'Modo noche'}
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-300 dark:hover:border-amber-600 active:scale-90 transition-all duration-200 shadow-sm"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Barra de Navegación Inferior Móvil (Estilo App Android Nativa) ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-1.5 shadow-2xl transition-colors">
        <div className="grid grid-cols-5 gap-1 max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 active:scale-90 select-none ${
                  isActive
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <div
                  className={`p-1.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 shadow-sm scale-110'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {item.icon}
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 truncate w-full text-center">
                  {item.label === 'Casas de Cambio' ? 'Casas' : item.label === 'Cotizaciones' ? 'Dólar' : item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
