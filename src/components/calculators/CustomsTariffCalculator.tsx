import React, { useState, useMemo, useEffect } from 'react';
import { 
  BOLIVIAN_TARIFF_CATEGORIES, 
  calculateBolivianCustoms 
} from '../../utils/customsTariff';
import { formatCurrency } from '../../utils/financialMath';
import { 
  Scale, 
  AlertTriangle, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { useLiveRates } from '../../context/LiveRateContext';

export const CustomsTariffCalculator: React.FC = () => {
  const { liveRate } = useLiveRates();
  const [cifValueUsd, setCifValueUsd] = useState<string>('2000');
  const [exchangeRate, setExchangeRate] = useState<string>(() => liveRate.rate.toString());
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(BOLIVIAN_TARIFF_CATEGORIES[3].id); // Confección nueva
  const [agencyFeesBob, setAgencyFeesBob] = useState<string>('450');

  useEffect(() => {
    setExchangeRate(liveRate.rate.toString());
  }, [liveRate.rate]);

  const cifBob = useMemo(() => {
    const cifUsd = parseFloat(cifValueUsd);
    const exRate = parseFloat(exchangeRate);
    if (!Number.isFinite(cifUsd) || !Number.isFinite(exRate) || cifUsd < 0 || exRate <= 0) {
      return 0;
    }
    return cifUsd * exRate;
  }, [cifValueUsd, exchangeRate]);

  const calculation = useMemo(() => {
    const fees = parseFloat(agencyFeesBob);
    return calculateBolivianCustoms(
      cifBob, 
      selectedCategoryId, 
      Number.isFinite(fees) ? Math.max(0, fees) : 0
    );
  }, [cifBob, selectedCategoryId, agencyFeesBob]);

  const currentCategory = useMemo(() => {
    return BOLIVIAN_TARIFF_CATEGORIES.find(c => c.id === selectedCategoryId);
  }, [selectedCategoryId]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 transition-colors duration-200">
      
      {/* Encabezado */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Estimador Arancelario e IVA de Importación Formal (Aduana Bolivia)
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Cálculo tributario formal con base en la Ley General de Aduanas (Ley Nº 1990) y el Gravamen Arancelario vigente en Bolivia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Entradas de datos */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Valor CIF Frontera (USD)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={cifValueUsd}
                onChange={(e) => setCifValueUsd(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white font-semibold text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Costo mercancía + Seguro + Flete internacional hasta aduana boliviana.
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Tipo de Cambio Oficial (Bs/USD)
                </label>
                <button
                  type="button"
                  onClick={() => setExchangeRate(liveRate.rate.toString())}
                  className="text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  En vivo: {liveRate.rate.toFixed(2)}
                </button>
              </div>
              <input
                type="number"
                min="0"
                step="any"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(e.target.value)}
                placeholder="6.96"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-800 dark:text-slate-200 font-semibold text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                TCO fijado por el BCB para liquidación de pólizas aduaneras.
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Partida Arancelaria / Tipo de Mercancía
            </label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
            >
              {BOLIVIAN_TARIFF_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} — GA: {cat.gaRatePercentage}% {cat.isProhibited ? '(PROHIBIDO DS 28761)' : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Gastos de Despachante y Almacén Aduanero (Bs)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={agencyFeesBob}
              onChange={(e) => setAgencyFeesBob(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Honorarios de agencia despachante, canon de recinto (ALBO/DAB) y validación SIDUNEA.
            </span>
          </div>

          {/* Bloqueo Estricto DS 28761 (Mercancía Prohibida) */}
          {currentCategory?.isProhibited && (
            <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 p-4 rounded-xl text-xs space-y-2 text-rose-900 dark:text-rose-200">
              <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-300 text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span>MERCANCÍA PROHIBIDA DE IMPORTACIÓN (D.S. Nº 28761)</span>
              </div>
              <p className="leading-relaxed text-rose-800 dark:text-rose-300/90">
                El Decreto Supremo Nº 28761 prohíbe de manera expresa la internación a territorio aduanero nacional de prendería usada, ropa de vestir usada, calzado usado y desechos textiles. 
              </p>
              <div className="pt-1 font-semibold text-[11px] text-rose-700 dark:text-rose-400">
                Consecuencia legal: Decomiso directo por la Aduana Nacional e incautación penal bajo la Ley Nº 1990 sin derecho a pago de tributos.
              </div>
            </div>
          )}

          {!currentCategory?.isProhibited && (
            <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Base Imponible de la Aduana Nacional (CIF Frontera):</span>
              </div>
              <p>
                {formatCurrency(cifBob, 'BOB')} (calculado al Tipo de Cambio Oficial de {exchangeRate} Bs/USD).
              </p>
            </div>
          )}

        </div>

        {/* Resultados Tributarios */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-50 dark:bg-slate-950/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          
          <div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
              Liquidación Tributaria Estimada
            </span>
            <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Tributos Aduaneros a Pagar
            </h4>

            {currentCategory?.isProhibited ? (
              <div className="my-8 text-center p-6 bg-white dark:bg-slate-900 rounded-2xl border border-rose-200 dark:border-rose-900/40 text-rose-700 dark:text-rose-400 space-y-2">
                <AlertTriangle className="w-8 h-8 mx-auto" />
                <span className="block font-bold text-sm">NO CALCULABLE</span>
                <p className="text-xs text-slate-500">
                  No se liquidan aranceles para mercancías prohibidas por el Decreto Supremo Nº 28761.
                </p>
              </div>
            ) : calculation ? (
              <div className="space-y-4 my-6">
                
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 text-center shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Total Tributos Fiscales (GA + IVA):</span>
                  <span className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                    {formatCurrency(calculation.totalTaxesAndDutiesBob, 'BOB')}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-1">
                    (Monto a pagar al Servicio de Impuestos / Aduana)
                  </span>
                </div>

                <div className="space-y-2 text-xs bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                    <span>Gravamen Arancelario (GA {calculation.gaPercentage}%):</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(calculation.gaAmountBob, 'BOB')}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                    <span>Base Imponible del IVA Aduanero:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(calculation.cifValueBob + calculation.gaAmountBob, 'BOB')}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                    <span>IVA Importaciones Efectivo (14,94%):</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(calculation.ivaAmountBob, 'BOB')}</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                    <span>Gastos Despacho y Almacén:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(calculation.customsAgencyAndWarehouseBob, 'BOB')}</span>
                  </div>

                  <div className="flex justify-between py-1.5 font-bold text-sm text-slate-900 dark:text-white pt-2">
                    <span>Costo Total Nacionalizado (CIF + Tributos):</span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(calculation.totalNationalizedCostBob, 'BOB')}
                    </span>
                  </div>
                </div>

              </div>
            ) : null}
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            Nota de formalización: El IVA pagado en aduana (14,94% efectivo) genera Crédito Fiscal IVA computable íntegramente en su declaración mensual (Formulario 200).
          </div>

        </div>

      </div>

    </div>
  );
};
