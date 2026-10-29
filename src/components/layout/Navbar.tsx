import React from 'react';
import { 
  CircleDollarSign, 
  Calculator, 
  Building2, 
  Truck, 
  BookOpen, 
  Menu, 
  X 
} from 'lucide-react';

export type TabType = 'divisas' | 'calculadoras' | 'casas' | 'proveedores' | 'guias';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'divisas', label: 'Cotizaciones y Conversor', icon: <CircleDollarSign className="w-4 h-4" /> },
    { id: 'calculadoras', label: 'Calculadoras Comerciales', icon: <Calculator className="w-4 h-4" /> },
    { id: 'casas', label: 'Casas de Cambio (ASFI)', icon: <Building2 className="w-4 h-4" /> },
    { id: 'proveedores', label: 'Proveedores Lícitos', icon: <Truck className="w-4 h-4" /> },
    { id: 'guias', label: 'Guías y Educación', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const handleSelect = (id: TabType) => {
    onTabChange(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo y Marca */}
          <div 
            onClick={() => handleSelect('divisas')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex flex-col w-7 h-7 rounded overflow-hidden shadow-md border border-slate-700">
              <div className="h-1/3 bg-bolivia-red"></div>
              <div className="h-1/3 bg-bolivia-yellow"></div>
              <div className="h-1/3 bg-bolivia-green"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Cambio Bolivia
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Oficial & Comercial
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Plataforma Financiera y Económica Independiente</p>
            </div>
          </div>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Botón de Menú Móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-900 px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
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
