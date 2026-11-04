import { useState, useEffect } from 'react';
import { Navbar, TabType } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DisclaimerBanner } from './components/layout/DisclaimerBanner';
import { CurrencyConverter } from './components/currency/CurrencyConverter';
import { RatesOverview } from './components/currency/RatesOverview';
import { RateComparisonTable } from './components/currency/RateComparisonTable';
import { CommunityRatesPanel } from './components/currency/CommunityRatesPanel';
import { CommercialCostCalculator } from './components/calculators/CommercialCostCalculator';
import { ProfitMarginCalculator } from './components/calculators/ProfitMarginCalculator';
import { BreakEvenCalculator } from './components/calculators/BreakEvenCalculator';
import { CustomsTariffCalculator } from './components/calculators/CustomsTariffCalculator';
import { UfvIndexationCalculator } from './components/calculators/UfvIndexationCalculator';
import { SupplierCostComparator } from './components/calculators/SupplierCostComparator';
import { CommercialProformaSheet } from './components/calculators/CommercialProformaSheet';
import { OpenDataExporter } from './components/common/OpenDataExporter';
import { ExchangeHouseDirectory } from './components/exchangeHouses/ExchangeHouseDirectory';
import { SupplierDirectory } from './components/suppliers/SupplierDirectory';
import { EducationalGuides } from './components/guides/EducationalGuides';
import { LegalDisclaimerModal } from './components/common/LegalDisclaimerModal';
import { getStoredTheme, applyTheme, toggleTheme, Theme } from './utils/themeStore';
import {
  Calculator,
  Truck,
  TrendingUp,
  ShieldCheck,
  BarChart3,
  Scale,
  FileSpreadsheet
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('divisas');
  const [activeCalculator, setActiveCalculator] = useState<
    'cost' | 'margin' | 'breakeven' | 'customs' | 'ufv' | 'compare' | 'proforma'
  >('cost');
  const [transferredUnitCost, setTransferredUnitCost] = useState<number | undefined>(undefined);
  const [theme, setTheme] = useState<Theme>('dark');
  const [legalModal, setLegalModal] = useState<{
    isOpen: boolean;
    section: 'terms' | 'privacy' | 'methodology' | 'normative';
  }>({
    isOpen: false,
    section: 'methodology'
  });

  // Inicializa el tema desde localStorage o preferencia del SO
  useEffect(() => {
    const stored = getStoredTheme();
    applyTheme(stored);
    setTheme(stored);
  }, []);

  const handleToggleTheme = () => {
    setTheme(prev => toggleTheme(prev));
  };

  const handleSendToMargin = (unitCost: number) => {
    setTransferredUnitCost(unitCost);
    setActiveCalculator('margin');
  };

  const openLegalModal = (section: 'terms' | 'privacy' | 'methodology' | 'normative') => {
    setLegalModal({ isOpen: true, section });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-emerald-500 selection:text-white">

      {/* Barra de Trazabilidad y Descargo Legal */}
      <DisclaimerBanner />

      {/* Navegación Principal */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">

        {/* ── PESTAÑA: DIVISAS Y CONVERSOR ── */}
        {activeTab === 'divisas' && (
          <div className="space-y-12 animate-fadeIn">

            {/* Hero */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Fuente citada y fecha visible · Uso gratuito</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Cotizaciones y Divisas{' '}
                <span className="text-emerald-600 dark:text-emerald-400">en Bolivia</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                Consulta el Tipo de Cambio Oficial del Banco Central de Bolivia, con su fecha de publicación,
                y convierte entre monedas viendo siempre qué tasa se aplicó.
              </p>
            </div>

            {/* Conversor Interactivo */}
            <CurrencyConverter />

            {/* Pizarra General de Cotizaciones */}
            <RatesOverview />

            {/* Tabla Comparativa de Cotizaciones y Spread */}
            <RateComparisonTable />

            {/* Panel de Reportes Colaborativos */}
            <CommunityRatesPanel />

            {/* Exportación de Datos Abiertos */}
            <OpenDataExporter />

          </div>
        )}

        {/* ── PESTAÑA: CALCULADORAS COMERCIALES ── */}
        {activeTab === 'calculadoras' && (
          <div className="space-y-8 animate-fadeIn">

            {/* Encabezado */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Herramientas Financieras y Comerciales
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Calculadoras diseñadas para comerciantes y pymes bolivianas: determine costos unitarios, márgenes, aranceles formales y genere proformas imprimibles.
              </p>
            </div>

            {/* Selector de Calculadora */}
            <div className="flex flex-wrap items-center justify-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-4xl mx-auto">
              {[
                { id: 'cost' as const,      icon: <Calculator className="w-4 h-4" />,      label: 'Costo Total y Unitario' },
                { id: 'margin' as const,    icon: <TrendingUp className="w-4 h-4" />,      label: 'Margen vs. Recargo' },
                { id: 'breakeven' as const, icon: <BarChart3 className="w-4 h-4" />,       label: 'Punto de Equilibrio' },
                { id: 'customs' as const,   icon: <Scale className="w-4 h-4" />,           label: 'Aranceles e IVA Aduana' },
                { id: 'ufv' as const,       icon: <TrendingUp className="w-4 h-4" />,      label: 'Indexación UFV (BCB)' },
                { id: 'compare' as const,   icon: <Truck className="w-4 h-4" />,           label: 'Comparar Proveedores' },
                { id: 'proforma' as const,  icon: <FileSpreadsheet className="w-4 h-4" />, label: 'Proforma Imprimible' },
              ].map(({ id, icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveCalculator(id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeCalculator === id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* Vista de la Calculadora Seleccionada */}
            <div className="mt-6">
              {activeCalculator === 'cost'      && <CommercialCostCalculator onSendToMarginCalculator={handleSendToMargin} />}
              {activeCalculator === 'margin'    && <ProfitMarginCalculator initialCost={transferredUnitCost} />}
              {activeCalculator === 'breakeven' && <BreakEvenCalculator />}
              {activeCalculator === 'customs'   && <CustomsTariffCalculator />}
              {activeCalculator === 'ufv'       && <UfvIndexationCalculator />}
              {activeCalculator === 'compare'   && <SupplierCostComparator />}
              {activeCalculator === 'proforma'  && <CommercialProformaSheet />}
            </div>

          </div>
        )}

        {/* ── PESTAÑA: CASAS DE CAMBIO (ASFI) ── */}
        {activeTab === 'casas' && (
          <div className="animate-fadeIn">
            <ExchangeHouseDirectory />
          </div>
        )}

        {/* ── PESTAÑA: PROVEEDORES LÍCITOS ── */}
        {activeTab === 'proveedores' && (
          <div className="animate-fadeIn">
            <SupplierDirectory />
          </div>
        )}

        {/* ── PESTAÑA: GUÍAS Y EDUCACIÓN ── */}
        {activeTab === 'guias' && (
          <div className="animate-fadeIn">
            <EducationalGuides />
          </div>
        )}

      </main>

      {/* Pie de Página */}
      <Footer onOpenLegalModal={openLegalModal} />

      {/* Modal Legal */}
      <LegalDisclaimerModal
        isOpen={legalModal.isOpen}
        initialSection={legalModal.section}
        onClose={() => setLegalModal(prev => ({ ...prev, isOpen: false }))}
      />

    </div>
  );
}

export default App;
