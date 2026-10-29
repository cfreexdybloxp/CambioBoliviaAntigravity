import { useState } from 'react';
import { Navbar, TabType } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DisclaimerBanner } from './components/layout/DisclaimerBanner';
import { CurrencyConverter } from './components/currency/CurrencyConverter';
import { RatesOverview } from './components/currency/RatesOverview';
import { CommercialCostCalculator } from './components/calculators/CommercialCostCalculator';
import { ProfitMarginCalculator } from './components/calculators/ProfitMarginCalculator';
import { BreakEvenCalculator } from './components/calculators/BreakEvenCalculator';
import { SupplierCostComparator } from './components/calculators/SupplierCostComparator';
import { ExchangeHouseDirectory } from './components/exchangeHouses/ExchangeHouseDirectory';
import { SupplierDirectory } from './components/suppliers/SupplierDirectory';
import { EducationalGuides } from './components/guides/EducationalGuides';
import { 
  Calculator, 
  Truck, 
  TrendingUp, 
  ShieldCheck, 
  BarChart3
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('divisas');
  const [activeCalculator, setActiveCalculator] = useState<'cost' | 'margin' | 'breakeven' | 'compare'>('cost');
  const [transferredUnitCost, setTransferredUnitCost] = useState<number | undefined>(undefined);

  const handleSendToMargin = (unitCost: number) => {
    setTransferredUnitCost(unitCost);
    setActiveCalculator('margin');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      
      {/* Barra de Trazabilidad y Descargo Legal */}
      <DisclaimerBanner />

      {/* Navegación Principal */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        
        {/* PESTAÑA: DIVISAS Y CONVERSOR */}
        {activeTab === 'divisas' && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* Hero / Introducción */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Datos Oficiales Contrastados</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Cotizaciones y Divisas en Bolivia
              </h1>
              <p className="text-sm sm:text-base text-slate-400">
                Consulte tipos de cambio oficiales del Banco Central de Bolivia, referencias comerciales y realice conversiones bidireccionales con precisión matemática garantizada.
              </p>
            </div>

            {/* Conversor Interactivo */}
            <CurrencyConverter />

            {/* Pizarra General de Cotizaciones */}
            <RatesOverview />

          </div>
        )}

        {/* PESTAÑA: CALCULADORAS COMERCIALES */}
        {activeTab === 'calculadoras' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Encabezado del Módulo de Calculadoras */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Herramientas Financieras y Comerciales
              </h1>
              <p className="text-sm text-slate-400">
                Calculadoras diseñadas para comerciantes y pymes bolivianas: determine costos unitarios, márgenes y metas de ventas.
              </p>
            </div>

            {/* Selector de Calculadora */}
            <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 max-w-3xl mx-auto">
              <button
                onClick={() => setActiveCalculator('cost')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeCalculator === 'cost'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Calculator className="w-4 h-4" />
                Costo Total y Unitario
              </button>

              <button
                onClick={() => setActiveCalculator('margin')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeCalculator === 'margin'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Margen Bruto vs. Recargo
              </button>

              <button
                onClick={() => setActiveCalculator('breakeven')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeCalculator === 'breakeven'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                Punto de Equilibrio
              </button>

              <button
                onClick={() => setActiveCalculator('compare')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeCalculator === 'compare'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Truck className="w-4 h-4" />
                Comparar Proveedores
              </button>
            </div>

            {/* Vista de la Calculadora Seleccionada */}
            <div className="mt-6">
              {activeCalculator === 'cost' && (
                <CommercialCostCalculator onSendToMarginCalculator={handleSendToMargin} />
              )}
              {activeCalculator === 'margin' && (
                <ProfitMarginCalculator initialCost={transferredUnitCost} />
              )}
              {activeCalculator === 'breakeven' && (
                <BreakEvenCalculator />
              )}
              {activeCalculator === 'compare' && (
                <SupplierCostComparator />
              )}
            </div>

          </div>
        )}

        {/* PESTAÑA: CASAS DE CAMBIO (ASFI) Y MAPA */}
        {activeTab === 'casas' && (
          <div className="animate-fadeIn">
            <ExchangeHouseDirectory />
          </div>
        )}

        {/* PESTAÑA: PROVEEDORES LÍCITOS */}
        {activeTab === 'proveedores' && (
          <div className="animate-fadeIn">
            <SupplierDirectory />
          </div>
        )}

        {/* PESTAÑA: GUÍAS Y EDUCACIÓN */}
        {activeTab === 'guias' && (
          <div className="animate-fadeIn">
            <EducationalGuides />
          </div>
        )}

      </main>

      {/* Pie de Página Institucional */}
      <Footer />

    </div>
  );
}

export default App;
