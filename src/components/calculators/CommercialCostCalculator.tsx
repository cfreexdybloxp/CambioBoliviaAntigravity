import React, { useState, useMemo } from 'react';
import { CurrencyCode } from '../../types';
import { calculateImportCost, formatCurrency } from '../../utils/financialMath';
import { RATES_MAP } from '../../data/officialRates';
import { ArrowRight, Calculator } from 'lucide-react';

interface CommercialCostCalculatorProps {
  onSendToMarginCalculator?: (unitCost: number) => void;
}

export const CommercialCostCalculator: React.FC<CommercialCostCalculatorProps> = ({ onSendToMarginCalculator }) => {
  // Manejamos los valores como strings para permitir borrar completamente el input sin ceros molestos
  const [purchasePrice, setPurchasePrice] = useState<string>('15');
  const [quantity, setQuantity] = useState<string>('100');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [exchangeRate, setExchangeRate] = useState<string>(RATES_MAP.USD.sellRate.toString());
  const [freightCost, setFreightCost] = useState<string>('800');
  const [packagingCost, setPackagingCost] = useState<string>('200');
  const [customsTaxes, setCustomsTaxes] = useState<string>('1500');
  const [otherExpenses, setOtherExpenses] = useState<string>('300');

  const pPrice = parseFloat(purchasePrice) || 0;
  const qty = parseInt(quantity, 10) || 1;
  const exRate = parseFloat(exchangeRate) || 1;
  const freight = parseFloat(freightCost) || 0;
  const packaging = parseFloat(packagingCost) || 0;
  const customs = parseFloat(customsTaxes) || 0;
  const other = parseFloat(otherExpenses) || 0;

  const costResult = useMemo(() => {
    try {
      return calculateImportCost({
        purchasePrice: Math.max(0, pPrice),
        quantity: Math.max(1, qty),
        currency,
        exchangeRateToBob: exRate > 0 ? exRate : 1,
        freightCostBob: Math.max(0, freight),
        packagingCostBob: Math.max(0, packaging),
        customsAndTaxesBob: Math.max(0, customs),
        commissionsAndOtherBob: Math.max(0, other)
      });
    } catch {
      return null;
    }
  }, [pPrice, qty, currency, exRate, freight, packaging, customs, other]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 transition-colors duration-200">
      
      {/* Encabezado */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Calculadora de Costo Total de Adquisición y Costo Unitario
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Calcule el costo real por unidad (*landed cost*) incorporando tipo de cambio, fletes, embalaje y tributos formales.
        </p>
      </div>

      {/* Grid de Formulario y Resultados */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Columna Izquierda: Entradas de Datos */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Precio y Cantidad */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Precio Unitario de Compra
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Cantidad de Unidades (Lote)
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="1"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Moneda y Tipo de Cambio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Moneda de Origen
              </label>
              <select
                value={currency}
                onChange={(e) => {
                  const curr = e.target.value as CurrencyCode;
                  setCurrency(curr);
                  if (curr !== 'BOB' && RATES_MAP[curr]) {
                    setExchangeRate(RATES_MAP[curr].sellRate.toString());
                  } else {
                    setExchangeRate('1');
                  }
                }}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="BOB">BOB — Bolivianos (Bs)</option>
                <option value="USD">USD — Dólar Americano</option>
                <option value="EUR">EUR — Euro</option>
                <option value="PEN">PEN — Sol Peruano</option>
                <option value="BRL">BRL — Real Brasileño</option>
                <option value="ARS">ARS — Peso Argentino</option>
                <option value="CLP">CLP — Peso Chileno</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Tipo de Cambio Aplicado (Bs)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                disabled={currency === 'BOB'}
                value={exchangeRate}
                onChange={(e) => setExchangeRate(e.target.value)}
                placeholder="1.00"
                className={`w-full border rounded-xl px-3 py-2 text-sm font-semibold transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
                  currency === 'BOB'
                    ? 'bg-slate-100 dark:bg-slate-900/40 text-slate-400 dark:text-slate-600 border-slate-200 dark:border-slate-800'
                    : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700'
                }`}
              />
            </div>
          </div>

          {/* Gastos Logísticos y Tributarios */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Gastos Logísticos, Tributarios y Operativos (en Bolivianos Bs)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Flete y Transporte Total (Bs)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={freightCost}
                  onChange={(e) => setFreightCost(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Embalaje y Protección (Bs)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Aduana, Aranceles e Impuestos (Bs)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={customsTaxes}
                  onChange={(e) => setCustomsTaxes(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Comisiones Bancarias / Otros (Bs)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Columna Derecha: Tarjeta de Resultados */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50 dark:bg-slate-950/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          
          <div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
              Resultado Financiero
            </span>
            <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Costo Unitario Puesto en Almacén
            </h4>

            {costResult && (
              <div className="my-6 text-center bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 shadow-sm">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Costo Real por Unidad:</span>
                <span className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                  {formatCurrency(costResult.unitCostBob, 'BOB')}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-2">
                  (Para un lote de {qty} unidades)
                </span>
              </div>
            )}

            {/* Desglose de Costos */}
            {costResult && (
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  <span>Compra Base ({currency}):</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {formatCurrency(pPrice * qty, currency)}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  <span>Compra Convertida a Bolivianos:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {formatCurrency(costResult.totalPurchaseCostBob, 'BOB')}
                  </span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  <span>Total Gastos e Impuestos:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {formatCurrency(costResult.totalAdditionalExpensesBob, 'BOB')}
                  </span>
                </div>

                <div className="flex justify-between py-1.5 font-bold text-sm text-slate-900 dark:text-white pt-2">
                  <span>Inversión Total del Lote:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(costResult.totalLandedCostBob, 'BOB')}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Botón de Enlace al Módulo de Márgenes */}
          {onSendToMarginCalculator && costResult && (
            <button
              onClick={() => onSendToMarginCalculator(costResult.unitCostBob)}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md group"
            >
              <span>Transferir costo unitario al fijador de precios</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
