import React from 'react';
import {
  CircleDollarSign,
  Calculator,
  Building2,
  Truck,
  BookOpen,
  Menu,
  X,
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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'divisas',      label: 'Cotizaciones',  icon: <CircleDollarSign className="w-4 h-4" /> },
    { id: 'calculadoras', label: 'Calculadoras',   icon: <Calculator className="w-4 h-4" /> },
    { id: 'casas',        label: 'Casas de Cambio',icon: <Building2 className="w-4 h-4" /> },
    { id: 'proveedores',  label: 'Proveedores',    icon: <Truck className="w-4 h-4" /> },
    { id: 'guias',        label: 'Guías',          icon: <BookOpen className="w-4 h-4" /> },
  ];

  const handleSelect = (id: TabType) => {
    onTabChange(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* ── Logo y Marca ── */}
          <div
            onClick={() => handleSelect('divisas')}
            className="flex items-center cursor-pointer group shrink-0"
          >
            <CotizaBoLogo size="md" showTagline={true} />
          </div>

          {/* ── Navegación Desktop ── */}
          <nav className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
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

          {/* ── Controles Derecha ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Botón Modo Día/Noche */}
            <button
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Cambiar a modo día' : 'Cambiar a modo noche'}
              title={theme === 'dark' ? 'Modo día' : 'Modo noche'}
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-300 dark:hover:border-amber-600 transition-all duration-200 shadow-sm"
            >
              {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Botón Menú Móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Menú Desplegable Móvil ── */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 pt-2 pb-3 space-y-1 transition-colors">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-base font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-400/30'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
