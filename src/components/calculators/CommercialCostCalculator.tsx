import React, { useState, useMemo } from 'react';
import { CurrencyCode } from '../../types';
import { calculateImportCost, formatCurrency } from '../../utils/financialMath';
import { RATES_MAP } from '../../data/officialRates';
import { ArrowRight } from 'lucide-react';

interface CommercialCostCalculatorProps {
  onSendToMarginCalculator?: (unitCost: number) => void;
}

export const CommercialCostCalculator: React.FC<CommercialCostCalculatorProps> = ({ onSendToMarginCalculator }) => {
  const [purchasePrice, setPurchasePrice] = useState<number>(15);
  const [quantity, setQuantity] = useState<number>(100);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [exchangeRate, setExchangeRate] = useState<number>(RATES_MAP.USD.sellRate);
  const [freightCost, setFreightCost] = useState<number>(800);
  const [packagingCost, setPackagingCost] = useState<number>(200);
  const [customsTaxes, setCustomsTaxes] = useState<number>(1500);
  const [otherExpenses, setOtherExpenses] = useState<number>(300);

  const costResult = useMemo(() => {
    try {
      return calculateImportCost({
        purchasePrice: Math.max(0, purchasePrice),
        quantity: Math.max(1, quantity),
        currency,
        exchangeRateToBob: exchangeRate,
        freightCostBob: Math.max(0, freightCost),
        packagingCostBob: Math.max(0, packagingCost),
        customsAndTaxesBob: Math.max(0, customsTaxes),
        commissionsAndOtherBob: Math.max(0, otherExpenses)
      });
    } catch {
      return null;
    }
  }, [purchasePrice, quantity, currency, exchangeRate, freightCost, packagingCost, customsTaxes, otherExpenses]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Encabezado */}
      <div>
        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          Calculadora de Costo Total de Adquisición y Costo Unitario
        </h3>
        <p className="text-sm text-slate-400 mt-1">
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
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Precio Unitario de Compra
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Cantidad de Unidades (Lote)
              </label>
              <input
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Moneda y Tipo de Cambio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Moneda de Origen
              </label>
              <select
                value={currency}
                onChange={(e) => {
                  const curr = e.target.value as CurrencyCode;
                  setCurrency(curr);
                  if (curr === 'BOB') setExchangeRate(1);
                  else setExchangeRate(RATES_MAP[curr].sellRate);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="USD">USD — Dólar Estadounidense</option>
                <option value="BOB">BOB — Boliviano</option>
                <option value="PEN">PEN — Sol Peruano</option>
                <option value="EUR">EUR — Euro</option>
                <option value="BRL">BRL — Real Brasileño</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Tasa de Cambio a Bs (Cotización)
              </label>
              <input
                type="number"
                min="0.001"
                step="any"
                disabled={currency === 'BOB'}
                value={exchangeRate}
                onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 1)}
                className="w-full bg-slate-900 border border-slate-700 disabled:opacity-50 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Gastos Adicionales en Bolivianos */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Gastos Adicionales de Logística y Formalización (en Bs)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">Transporte / Flete Total (Bs)</label>
                <input
                  type="number"
                  min="0"
                  value={freightCost}
                  onChange={(e) => setFreightCost(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Embalaje y Protección (Bs)</label>
                <input
                  type="number"
                  min="0"
                  value={packagingCost}
                  onChange={(e) => setPackagingCost(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Tributos Aduaneros / IVA (Bs)</label>
                <input
                  type="number"
                  min="0"
                  value={customsTaxes}
                  onChange={(e) => setCustomsTaxes(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Comisiones y Otros Gastos (Bs)</label>
                <input
                  type="number"
                  min="0"
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Columna Derecha: Tarjetas de Resultados */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
          
          {costResult ? (
            <div className="space-y-6">
              
              <div>
                <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
                  Costo Unitario Real Puesto en Destino
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  {formatCurrency(costResult.unitCostBob, 'BOB')}
                  <span className="text-sm font-normal text-slate-400 ml-1.5">/ unidad</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Basado en un lote total de {quantity} unidades.
                </p>
              </div>

              {/* Totales */}
              <div className="space-y-2 py-4 border-y border-slate-800 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Costo compra mercancía:</span>
                  <span className="font-semibold text-white">{formatCurrency(costResult.totalPurchaseCostBob, 'BOB')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total gastos logísticos:</span>
                  <span className="font-semibold text-white">{formatCurrency(costResult.totalAdditionalExpensesBob, 'BOB')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-800/60 text-base">
                  <span className="font-bold text-slate-200">Inversión Total del Lote:</span>
                  <span className="font-bold text-emerald-400">{formatCurrency(costResult.totalLandedCostBob, 'BOB')}</span>
                </div>
              </div>

              {/* Gráfico de Barras de Composición del Costo */}
              <div className="space-y-2">
                <span className="text-xs font-medium text-slate-400">Composición porcentual del costo:</span>
                
                <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div 
                    style={{ width: `${costResult.breakdown.purchasePercentage}%` }} 
                    className="bg-emerald-500 transition-all duration-300"
                    title={`Mercancía: ${costResult.breakdown.purchasePercentage}%`}
                  ></div>
                  <div 
                    style={{ width: `${costResult.breakdown.freightPercentage}%` }} 
                    className="bg-blue-500 transition-all duration-300"
                    title={`Flete: ${costResult.breakdown.freightPercentage}%`}
                  ></div>
                  <div 
                    style={{ width: `${costResult.breakdown.customsPercentage}%` }} 
                    className="bg-amber-500 transition-all duration-300"
                    title={`Aduana/Impuestos: ${costResult.breakdown.customsPercentage}%`}
                  ></div>
                  <div 
                    style={{ width: `${costResult.breakdown.otherPercentage}%` }} 
                    className="bg-purple-500 transition-all duration-300"
                    title={`Otros: ${costResult.breakdown.otherPercentage}%`}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Mercancía ({costResult.breakdown.purchasePercentage}%)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Flete ({costResult.breakdown.freightPercentage}%)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span> Aduana ({costResult.breakdown.customsPercentage}%)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span> Otros ({costResult.breakdown.otherPercentage}%)
                  </span>
                </div>
              </div>

              {/* Botón de Enlace al Calculador de Margen */}
              {onSendToMarginCalculator && (
                <button
                  onClick={() => onSendToMarginCalculator(costResult.unitCostBob)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-emerald-900/30"
                >
                  <span>Calcular Precio de Venta y Margen</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500 text-sm">
              Ingrese datos válidos para calcular el costo total.
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
