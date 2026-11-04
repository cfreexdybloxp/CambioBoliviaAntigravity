import React, { useState, useMemo } from 'react';
import { 
  BOLIVIAN_TARIFF_CATEGORIES, 
  calculateBolivianCustoms 
} from '../../utils/customsTariff';
import { formatCurrency } from '../../utils/financialMath';
import { RATES_MAP } from '../../data/officialRates';
import { 
  Scale, 
  AlertTriangle, 
  ShieldCheck 
} from 'lucide-react';

export const CustomsTariffCalculator: React.FC = () => {
  const [cifValueUsd, setCifValueUsd] = useState<number>(2000);
  const [exchangeRate, setExchangeRate] = useState<number>(RATES_MAP.USD.sellRate); // TCO BCB
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(BOLIVIAN_TARIFF_CATEGORIES[3].id); // Confección nueva
  const [agencyFeesBob, setAgencyFeesBob] = useState<number>(450); // Despacho y almacén

  const cifBob = useMemo(() => {
    return Math.max(0, cifValueUsd * exchangeRate);
  }, [cifValueUsd, exchangeRate]);

  const calculation = useMemo(() => {
    return calculateBolivianCustoms(cifBob, selectedCategoryId, agencyFeesBob);
  }, [cifBob, selectedCategoryId, agencyFeesBob]);

  const currentCategory = useMemo(() => {
    return BOLIVIAN_TARIFF_CATEGORIES.find(c => c.id === selectedCategoryId);
  }, [selectedCategoryId]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Encabezado */}
      <div>
        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-400" />
          Estimador Arancelario e IVA de Importación Formal (Aduana Bolivia)
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          Cálculo tributario formal con base en la Ley General de Aduanas (Ley Nº 1990) y el Gravamen Arancelario vigente en Bolivia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Entradas de datos */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Valor CIF Frontera (USD)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={cifValueUsd}
                onChange={(e) => setCifValueUsd(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-semibold text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Costo mercancía + Seguro + Flete internacional hasta aduana boliviana.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Tipo de Cambio Oficial (Bs/USD)
              </label>
              <input
                type="number"
                step="any"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(parseFloat(e.target.value) || RATES_MAP.USD.sellRate)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-200 font-semibold text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Valor CIF convertido: <strong>{formatCurrency(cifBob, 'BOB')}</strong>
              </span>
            </div>
          </div>

          {/* Selector de Categoría Arancelaria */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Partida Arancelaria / Tipo de Mercancía
            </label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs sm:text-sm text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {BOLIVIAN_TARIFF_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} {cat.isProhibited ? '⚠️' : `(GA: ${cat.gaRatePercentage}%)`}
                </option>
              ))}
            </select>
          </div>

          {/* Información y Ejemplos de la Categoría */}
          {currentCategory && (
            <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
              currentCategory.isProhibited 
                ? 'bg-rose-950/40 border-rose-800 text-rose-300' 
                : 'bg-slate-950/60 border-slate-800 text-slate-300'
            }`}>
              <div className="flex items-center justify-between font-semibold">
                <span>Gravamen Arancelario (GA):</span>
                <span className={currentCategory.isProhibited ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {currentCategory.isProhibited ? 'PROHIBIDO' : `${currentCategory.gaRatePercentage}%`}
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {currentCategory.legalNote}
              </p>
              <div className="text-[10px] text-slate-500 pt-1">
                <strong>Artículos típicos:</strong> {currentCategory.typicalItems}
              </div>
            </div>
          )}

          <div className="p-3 bg-amber-950/20 border border-amber-900/50 rounded-xl text-[11px] text-amber-200/90 leading-relaxed">
            <strong>Estimación, no liquidación oficial.</strong> Las categorías de esta calculadora son
            agrupaciones didácticas, no la clasificación arancelaria de 8 dígitos. El Gravamen Arancelario real
            depende de la subpartida del producto en el Arancel Aduanero de Importación. Confirma la
            clasificación con la Aduana Nacional o un despachante antes de importar.
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Despacho Aduanero y Almacén Estimado (Bs)
            </label>
            <input
              type="number"
              min="0"
              value={agencyFeesBob}
              onChange={(e) => setAgencyFeesBob(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

        </div>

        {/* Resultados Tributarios */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
          
          {calculation.isProhibited ? (
            <div className="p-5 bg-rose-950/60 border border-rose-700 rounded-xl text-rose-200 text-xs space-y-3">
              <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                MERCANCÍA TERMINANTEMENTE PROHIBIDA
              </div>
              <p className="leading-relaxed">
                {calculation.prohibitionMessage}
              </p>
              <div className="pt-2 border-t border-rose-900/60 text-[11px] text-rose-300">
                La Aduana Nacional procede al comiso de la prendería usada y su destrucción mediante trituración en Subasta Ecológica. No arriesgue su capital en actividades ilícitas.
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              
              <div>
                <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
                  Total Tributos e Impuestos Aduaneros
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  {formatCurrency(calculation.totalTaxesAndDutiesBob, 'BOB')}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Monto requerido para nacionalizar la mercancía formalmente.
                </p>
              </div>

              {/* Desglose de Tributos */}
              <div className="space-y-2 py-4 border-y border-slate-800 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Gravamen Arancelario ({calculation.gaPercentage}% sobre CIF):</span>
                  <span className="font-semibold text-white">{formatCurrency(calculation.gaAmountBob, 'BOB')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">IVA Importación (14.94% efectivo sobre CIF+GA):</span>
                  <span className="font-semibold text-white">{formatCurrency(calculation.ivaAmountBob, 'BOB')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Gastos de Almacén y Despacho:</span>
                  <span className="font-semibold text-white">{formatCurrency(calculation.customsAgencyAndWarehouseBob, 'BOB')}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-slate-800 text-base font-bold">
                  <span className="text-slate-200">Costo Mercancía Nacionalizada:</span>
                  <span className="text-emerald-400">{formatCurrency(calculation.totalNationalizedCostBob, 'BOB')}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Transparencia fiscal boliviana:</span>
                </div>
                <p>
                  El IVA pagado en aduana (14.94% efectivo) genera <strong>Crédito Fiscal IVA</strong> que el comerciante puede compensar mensualmente contra el Débito Fiscal de sus ventas en el Formulario 200 del SIN.
                </p>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
