import React, { useState, useMemo, useEffect } from 'react';
import { 
  calculateMarginAndMarkup, 
  calculateSellingPriceFromMargin, 
  calculateSellingPriceFromMarkup, 
  formatCurrency 
} from '../../utils/financialMath';
import { Info, ArrowUpRight, TrendingUp } from 'lucide-react';

interface ProfitMarginCalculatorProps {
  initialCost?: number;
}

export const ProfitMarginCalculator: React.FC<ProfitMarginCalculatorProps> = ({ initialCost }) => {
  const [costPrice, setCostPrice] = useState<string>(initialCost ? initialCost.toString() : '100');
  const [sellingPrice, setSellingPrice] = useState<string>('140');
  const [calculationMode, setCalculationMode] = useState<'known_price' | 'target_margin' | 'target_markup'>('known_price');
  const [targetMargin, setTargetMargin] = useState<string>('30');
  const [targetMarkup, setTargetMarkup] = useState<string>('40');

  useEffect(() => {
    if (initialCost && initialCost > 0) {
      setCostPrice(initialCost.toString());
      try {
        const suggested = calculateSellingPriceFromMargin(initialCost, 30);
        setSellingPrice(suggested.toString());
      } catch {}
    }
  }, [initialCost]);

  // Si el usuario cambia el modo a target_margin o target_markup, recalculamos sellingPrice
  useEffect(() => {
    const cost = parseFloat(costPrice);
    if (!Number.isFinite(cost) || cost <= 0) return;

    if (calculationMode === 'target_margin') {
      const margin = parseFloat(targetMargin);
      if (Number.isFinite(margin) && margin > 0 && margin < 100) {
        try {
          const calculated = calculateSellingPriceFromMargin(cost, margin);
          setSellingPrice(calculated.toString());
        } catch {}
      }
    } else if (calculationMode === 'target_markup') {
      const markup = parseFloat(targetMarkup);
      if (Number.isFinite(markup) && markup >= 0) {
        try {
          const calculated = calculateSellingPriceFromMarkup(cost, markup);
          setSellingPrice(calculated.toString());
        } catch {}
      }
    }
  }, [calculationMode, targetMargin, targetMarkup, costPrice]);

  const results = useMemo(() => {
    const cost = parseFloat(costPrice);
    const sell = parseFloat(sellingPrice);
    if (!Number.isFinite(cost) || !Number.isFinite(sell) || cost <= 0 || sell <= 0) {
      return null;
    }
    try {
      return calculateMarginAndMarkup(cost, sell);
    } catch {
      return null;
    }
  }, [costPrice, sellingPrice]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 transition-colors duration-200">
      
      {/* Encabezado */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Calculadora de Margen Bruto vs. Recargo (Markup)
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Domine la fijación de precios y evite el error financiero de confundir el recargo sobre el costo con el margen de beneficio real.
        </p>
      </div>

      {/* Selector de Modo */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setCalculationMode('known_price')}
          className={`flex-1 min-w-[200px] text-xs font-semibold py-2 px-3 rounded-lg transition-all ${
            calculationMode === 'known_price'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-900'
          }`}
        >
          1. Comparar Costo vs. Precio de Venta
        </button>
        <button
          onClick={() => setCalculationMode('target_margin')}
          className={`flex-1 min-w-[200px] text-xs font-semibold py-2 px-3 rounded-lg transition-all ${
            calculationMode === 'target_margin'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-900'
          }`}
        >
          2. Fijar Precio según Margen Deseado (%)
        </button>
        <button
          onClick={() => setCalculationMode('target_markup')}
          className={`flex-1 min-w-[200px] text-xs font-semibold py-2 px-3 rounded-lg transition-all ${
            calculationMode === 'target_markup'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-900'
          }`}
        >
          3. Fijar Precio según Recargo / Markup (%)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Entradas según el modo */}
        <div className="lg:col-span-6 space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Costo Unitario de Adquisición (Bs)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Lo que costó el artículo puesto en su tienda (use la calculadora de costo total).
            </span>
          </div>

          {calculationMode === 'known_price' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Precio de Venta al Público (Bs)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-emerald-700 dark:text-emerald-400 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
              />
            </div>
          )}

          {calculationMode === 'target_margin' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Margen Bruto Deseado sobre la Venta (%)
              </label>
              <input
                type="number"
                min="0.1"
                max="99.9"
                step="any"
                value={targetMargin}
                onChange={(e) => setTargetMargin(e.target.value)}
                placeholder="30"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-emerald-700 dark:text-emerald-400 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Porcentaje de cada 100 Bs vendidos que quedará libre tras pagar el costo del producto.
              </span>
            </div>
          )}

          {calculationMode === 'target_markup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Recargo Deseado sobre el Costo / Markup (%)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={targetMarkup}
                onChange={(e) => setTargetMarkup(e.target.value)}
                placeholder="40"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-amber-700 dark:text-amber-400 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Porcentaje que le añadirá directamente encima de su costo de compra.
              </span>
            </div>
          )}

          {/* Explicación Pedagógica del Error Común */}
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 p-4 rounded-xl text-xs space-y-2 text-amber-900 dark:text-amber-200">
            <div className="flex items-center gap-1.5 font-bold">
              <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Diferencia Crítica en Bolivia:</span>
            </div>
            <p className="leading-relaxed text-amber-800 dark:text-amber-300/90">
              Si compras a <strong>100 Bs</strong> y le subes el <strong>30% de Markup</strong>, lo vendes a <strong>130 Bs</strong>. Pero tu <strong>Margen Real</strong> no es del 30%, sino del <strong>23,08%</strong> (30 Bs ganados entre 130 Bs cobrados). Para ganar un margen real del 30%, debes vender a <strong>142,86 Bs</strong>.
            </p>
          </div>

        </div>

        {/* Tarjeta de Métricas Comparativas */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-50 dark:bg-slate-950/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          
          <div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
              Análisis de Rentabilidad
            </span>
            <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Resultados de la Fijación de Precio
            </h4>

            {results && (
              <div className="grid grid-cols-2 gap-4 my-6">
                
                {/* Margen Real */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-emerald-200 dark:border-emerald-500/20 shadow-sm text-center">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    Margen Bruto Real
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                    {results.grossMarginPercentage}%
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    de cada Bs cobrado
                  </span>
                </div>

                {/* Recargo / Markup */}
                <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-amber-200 dark:border-amber-500/20 shadow-sm text-center">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                    Recargo (Markup)
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
                    {results.markupPercentage}%
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    sobre el costo base
                  </span>
                </div>

              </div>
            )}

            {results && (
              <div className="space-y-3 text-xs bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  <span>Costo Unitario:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(results.costPrice, 'BOB')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  <span>Precio de Venta Sugerido:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(results.sellingPrice, 'BOB')}</span>
                </div>
                <div className="flex justify-between py-1 text-slate-900 dark:text-white font-bold text-sm pt-1">
                  <span>Ganancia Neta por Unidad:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    {formatCurrency(results.grossProfit, 'BOB')}
                  </span>
                </div>
              </div>
            )}

          </div>

          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/40 text-[11px] text-emerald-800 dark:text-emerald-300">
            Fórmula de protección: El Margen nunca puede ser igual o mayor al 100%. El Markup sí puede superar el 100% en productos de alta rotación o manufactura propia.
          </div>

        </div>

      </div>

    </div>
  );
};
