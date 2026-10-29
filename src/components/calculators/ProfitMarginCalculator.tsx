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
  const [costPrice, setCostPrice] = useState<number>(initialCost || 100);
  const [sellingPrice, setSellingPrice] = useState<number>(140);
  const [calculationMode, setCalculationMode] = useState<'known_price' | 'target_margin' | 'target_markup'>('known_price');
  const [targetMargin, setTargetMargin] = useState<number>(30);
  const [targetMarkup, setTargetMarkup] = useState<number>(40);

  useEffect(() => {
    if (initialCost && initialCost > 0) {
      setCostPrice(initialCost);
      // Auto-suggest reasonable selling price with 30% margin
      try {
        const suggested = calculateSellingPriceFromMargin(initialCost, 30);
        setSellingPrice(suggested);
      } catch {}
    }
  }, [initialCost]);

  // Si el usuario cambia el modo a target_margin, recalculamos sellingPrice
  useEffect(() => {
    if (calculationMode === 'target_margin' && costPrice > 0) {
      try {
        const calculated = calculateSellingPriceFromMargin(costPrice, targetMargin);
        setSellingPrice(calculated);
      } catch {}
    } else if (calculationMode === 'target_markup' && costPrice > 0) {
      try {
        const calculated = calculateSellingPriceFromMarkup(costPrice, targetMarkup);
        setSellingPrice(calculated);
      } catch {}
    }
  }, [calculationMode, targetMargin, targetMarkup, costPrice]);

  const results = useMemo(() => {
    try {
      return calculateMarginAndMarkup(costPrice, sellingPrice);
    } catch {
      return null;
    }
  }, [costPrice, sellingPrice]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Encabezado */}
      <div>
        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          Calculadora de Margen Bruto vs. Recargo (Markup)
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          Domine la fijación de precios y evite el error financiero de confundir el recargo sobre el costo con el margen de beneficio real.
        </p>
      </div>

      {/* Selector de Modo */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
        <button
          onClick={() => setCalculationMode('known_price')}
          className={`flex-1 min-w-[200px] text-xs font-semibold py-2 px-3 rounded-lg transition-all ${
            calculationMode === 'known_price'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          1. Comparar Costo vs. Precio de Venta
        </button>
        <button
          onClick={() => setCalculationMode('target_margin')}
          className={`flex-1 min-w-[200px] text-xs font-semibold py-2 px-3 rounded-lg transition-all ${
            calculationMode === 'target_margin'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          2. Fijar Margen Bruto Deseado (%)
        </button>
        <button
          onClick={() => setCalculationMode('target_markup')}
          className={`flex-1 min-w-[200px] text-xs font-semibold py-2 px-3 rounded-lg transition-all ${
            calculationMode === 'target_markup'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          3. Fijar Recargo / Markup (%)
        </button>
      </div>

      {/* Entradas de Datos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Costo Unitario del Producto (Bs)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={costPrice}
              onChange={(e) => setCostPrice(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white font-semibold text-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Lo que le cuesta adquirir o fabricar el producto puesto en su negocio.
            </span>
          </div>

          {calculationMode === 'known_price' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Precio de Venta al Público (Bs)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-emerald-400 font-semibold text-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Precio que cobrará a su cliente final.
              </span>
            </div>
          )}

          {calculationMode === 'target_margin' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Margen Bruto Objetivo Deseado (%)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="90"
                  value={targetMargin}
                  onChange={(e) => setTargetMargin(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <span className="font-bold text-lg text-emerald-400 w-16 text-right">{targetMargin}%</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Porcentaje del dinero recaudado en la venta que desea conservar como ganancia.
              </span>
            </div>
          )}

          {calculationMode === 'target_markup' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Recargo (*Markup*) sobre el Costo (%)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="200"
                  value={targetMarkup}
                  onChange={(e) => setTargetMarkup(parseInt(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <span className="font-bold text-lg text-blue-400 w-16 text-right">{targetMarkup}%</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Porcentaje que le suma al costo para definir el precio.
              </span>
            </div>
          )}
        </div>

        {/* Tarjeta de Métricas Comparativas */}
        {results && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            
            <div className="flex justify-between items-start pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs uppercase font-medium text-slate-400">Precio de Venta Calculado</span>
                <div className="text-3xl font-extrabold text-white mt-0.5">
                  {formatCurrency(results.sellingPrice, 'BOB')}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs uppercase font-medium text-slate-400">Ganancia Bruta</span>
                <div className="text-2xl font-bold text-emerald-400 mt-0.5">
                  +{formatCurrency(results.grossProfit, 'BOB')}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              
              {/* Margen Bruto */}
              <div className="bg-emerald-950/30 border border-emerald-800/50 rounded-xl p-4">
                <div className="flex items-center justify-between text-emerald-400 text-xs font-semibold uppercase">
                  <span>Margen Bruto</span>
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 mt-1">
                  {results.grossMarginPercentage}%
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  De cada 100 Bs vendidos, le quedan {results.grossMarginPercentage} Bs.
                </p>
              </div>

              {/* Recargo / Markup */}
              <div className="bg-blue-950/30 border border-blue-800/50 rounded-xl p-4">
                <div className="flex items-center justify-between text-blue-400 text-xs font-semibold uppercase">
                  <span>Recargo (Markup)</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-300 mt-1">
                  {results.markupPercentage}%
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Le agregó un {results.markupPercentage}% extra a su costo original.
                </p>
              </div>

            </div>

            {/* Cuadro Pedagógico de Claridad Financiera */}
            <div className="p-3 bg-amber-950/20 border border-amber-900/50 rounded-xl text-xs text-amber-200/90 flex gap-2.5 items-start">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-300 font-semibold">Regla de oro:</strong> El Recargo ({results.markupPercentage}%) siempre es mayor que el Margen ({results.grossMarginPercentage}%). Un negocio que necesita un margen del 30% no puede simplemente sumarle el 30% a su costo, o perderá un 7% de ganancia esperada.
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
