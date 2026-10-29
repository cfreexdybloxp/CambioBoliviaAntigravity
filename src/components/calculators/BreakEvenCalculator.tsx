import React, { useState, useMemo } from 'react';
import { calculateBreakEven, formatCurrency } from '../../utils/financialMath';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export const BreakEvenCalculator: React.FC = () => {
  const [fixedCosts, setFixedCosts] = useState<number>(12000); // Ej: 12.000 Bs mensuales (alquiler, personal, luz, internet)
  const [sellingPrice, setSellingPrice] = useState<number>(150); // Ej: 150 Bs por unidad
  const [variableCost, setVariableCost] = useState<number>(90); // Ej: 90 Bs por unidad

  const breakEven = useMemo(() => {
    try {
      return calculateBreakEven(
        Math.max(0, fixedCosts),
        Math.max(0, sellingPrice),
        Math.max(0, variableCost)
      );
    } catch {
      return null;
    }
  }, [fixedCosts, sellingPrice, variableCost]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Encabezado */}
      <div>
        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          Calculadora de Punto de Equilibrio Comercial
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          Descubra cuántas unidades debe vender al mes para que su negocio no pierda dinero y comience a generar utilidad real.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Entradas */}
        <div className="lg:col-span-6 space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Costos Fijos Mensuales Totales (Bs)
            </label>
            <input
              type="number"
              min="0"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-semibold text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              Alquiler de tienda/taller, salarios fijos, internet, agua, luz y patentes municipales.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Precio de Venta Unitario (Bs)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-emerald-400 font-semibold text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Costo Variable Unitario (Bs)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={variableCost}
                onChange={(e) => setVariableCost(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-semibold text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">
                Materia prima o costo de compra por producto.
              </span>
            </div>
          </div>

          {/* Margen de Contribución Unitario */}
          {breakEven && breakEven.isFeasible && (
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Margen de Contribución por Unidad:</span>
                <span className="font-bold text-white">
                  {formatCurrency(breakEven.unitContributionMargin, 'BOB')}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Razón de Contribución Marginal:</span>
                <span className="font-semibold text-emerald-400">
                  {breakEven.contributionMarginRatio}%
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Resultados */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-950/80 border border-slate-800 rounded-2xl p-6">
          
          {breakEven && breakEven.isFeasible ? (
            <div className="space-y-6">
              
              <div>
                <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  Meta Mensual de Cobertura
                </span>
                
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                    <span className="text-xs text-slate-400">Unidades a vender:</span>
                    <div className="text-3xl font-extrabold text-white mt-1">
                      {breakEven.breakEvenUnits.toLocaleString('es-BO')}
                      <span className="text-xs font-normal text-slate-400 ml-1">uds.</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                    <span className="text-xs text-slate-400">Facturación mínima:</span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
                      {formatCurrency(breakEven.breakEvenRevenue, 'BOB')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <p>
                  <strong>Interpretación comercial:</strong> A partir de la unidad vendida número <strong className="text-emerald-400">{breakEven.breakEvenUnits + 1}</strong>, cada venta genera una utilidad neta libre de costos fijos de <strong className="text-white">{formatCurrency(breakEven.unitContributionMargin, 'BOB')}</strong>.
                </p>
              </div>

            </div>
          ) : (
            <div className="p-4 bg-rose-950/40 border border-rose-800/80 rounded-xl flex items-start gap-3 text-rose-300 text-xs">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-rose-200 font-semibold mb-1">Operación Comercial Inviable:</strong>
                {breakEven?.warningMessage || 'El precio de venta debe ser superior al costo variable unitario para generar margen de cobertura.'}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
