import React, { useState, useMemo } from 'react';
import { calculateBreakEven, formatCurrency } from '../../utils/financialMath';
import { AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react';

export const BreakEvenCalculator: React.FC = () => {
  const [fixedCosts, setFixedCosts] = useState<string>('12000');
  const [sellingPrice, setSellingPrice] = useState<string>('150');
  const [variableCost, setVariableCost] = useState<string>('90');

  const breakEven = useMemo(() => {
    const fCosts = parseFloat(fixedCosts);
    const sPrice = parseFloat(sellingPrice);
    const vCost = parseFloat(variableCost);

    if (!Number.isFinite(fCosts) || !Number.isFinite(sPrice) || !Number.isFinite(vCost)) {
      return null;
    }

    try {
      return calculateBreakEven(
        Math.max(0, fCosts),
        Math.max(0, sPrice),
        Math.max(0, vCost)
      );
    } catch {
      return null;
    }
  }, [fixedCosts, sellingPrice, variableCost]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 transition-colors duration-200">
      
      {/* Encabezado */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Calculadora de Punto de Equilibrio Comercial
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Descubra cuántas unidades debe vender al mes para que su negocio no pierda dinero y comience a generar utilidad real.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Entradas */}
        <div className="lg:col-span-6 space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Costos Fijos Mensuales Totales (Bs)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white font-semibold text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Alquiler de tienda/taller, salarios fijos, internet, agua, luz y patentes municipales.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Precio de Venta Unitario (Bs)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-emerald-700 dark:text-emerald-400 font-semibold text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Costo Variable Unitario (Bs)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={variableCost}
                onChange={(e) => setVariableCost(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white font-semibold text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Advertencia si el precio es menor al costo variable */}
          {parseFloat(sellingPrice) <= parseFloat(variableCost) && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Atención:</strong> El precio de venta ({sellingPrice} Bs) es menor o igual al costo variable ({variableCost} Bs). Con ese valor cada venta genera pérdida directa y nunca se alcanzará el punto de equilibrio.
              </span>
            </div>
          )}

        </div>

        {/* Resultados */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-50 dark:bg-slate-950/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          
          <div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
              Meta de Ventas Mínima
            </span>
            <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Punto de Equilibrio Mensual
            </h4>

            {breakEven ? (
              <div className="my-6 space-y-4">
                
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 text-center shadow-sm">
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Debes vender como mínimo:</span>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                      {breakEven.breakEvenUnits.toLocaleString('es-BO')}
                    </span>
                    <span className="text-base font-bold text-slate-600 dark:text-slate-300">unidades/mes</span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mt-2">
                    A partir de la unidad #{breakEven.breakEvenUnits + 1}, todo es ganancia pura.
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Facturación Mínima:</span>
                    <span className="font-bold text-slate-900 dark:text-white text-base">
                      {formatCurrency(breakEven.breakEvenRevenue, 'BOB')}
                    </span>
                  </div>

                  <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="text-slate-500 dark:text-slate-400 block text-[11px]">Margen de Contribución:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base">
                      {formatCurrency(breakEven.unitContributionMargin, 'BOB')}
                    </span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                Ingrese valores válidos para calcular el punto de equilibrio.
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Permite saber exactamente cuántos días de ventas necesitas para pagar el alquiler y los salarios del mes.</span>
          </div>

        </div>

      </div>

    </div>
  );
};
