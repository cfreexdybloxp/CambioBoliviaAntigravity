import React, { useState } from 'react';
import { formatCurrency, roundCurrency } from '../../utils/financialMath';
import { Award } from 'lucide-react';

interface SupplierQuote {
  name: string;
  unitPrice: number;
  quantity: number;
  freightCostBob: number;
  packagingAndOtherBob: number;
  rateToBob: number;
}

export const SupplierCostComparator: React.FC = () => {
  const [supplierA, setSupplierA] = useState<SupplierQuote>({
    name: 'Proveedor A (Nacional - La Paz)',
    unitPrice: 45, // Bs
    quantity: 100,
    freightCostBob: 150,
    packagingAndOtherBob: 50,
    rateToBob: 1
  });

  const [supplierB, setSupplierB] = useState<SupplierQuote>({
    name: 'Proveedor B (Regional - Cochabamba)',
    unitPrice: 38, // Bs
    quantity: 200,
    freightCostBob: 400,
    packagingAndOtherBob: 100,
    rateToBob: 1
  });

  const getMetrics = (s: SupplierQuote) => {
    const totalPurchase = s.unitPrice * s.quantity * s.rateToBob;
    const totalExpenses = s.freightCostBob + s.packagingAndOtherBob;
    const totalLanded = totalPurchase + totalExpenses;
    const unitLanded = s.quantity > 0 ? totalLanded / s.quantity : 0;
    return {
      totalPurchase,
      totalExpenses,
      totalLanded,
      unitLanded: roundCurrency(unitLanded, 2)
    };
  };

  const metricsA = getMetrics(supplierA);
  const metricsB = getMetrics(supplierB);

  const bestIsA = metricsA.unitLanded < metricsB.unitLanded;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Encabezado */}
      <div>
        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          Comparador de Costo Real entre Proveedores
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          No se guíe solo por el precio de catálogo. Compare el costo unitario puesto en su almacén considerando fletes y lotes mínimos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Proveedor A */}
        <div className={`p-6 rounded-2xl border transition-all ${bestIsA ? 'bg-slate-950 border-emerald-500/50 shadow-lg shadow-emerald-950/20' : 'bg-slate-950/60 border-slate-800'}`}>
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              value={supplierA.name}
              onChange={(e) => setSupplierA({ ...supplierA, name: e.target.value })}
              className="bg-transparent border-b border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-emerald-500 pb-1 w-3/4"
            />
            {bestIsA && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                <Award className="w-3 h-3" /> Mejor costo unitario
              </span>
            )}
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Precio Unitario (Bs)</label>
                <input
                  type="number"
                  value={supplierA.unitPrice}
                  onChange={(e) => setSupplierA({ ...supplierA, unitPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Cantidad Lote (uds)</label>
                <input
                  type="number"
                  value={supplierA.quantity}
                  onChange={(e) => setSupplierA({ ...supplierA, quantity: parseInt(e.target.value) || 1 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Flete Total (Bs)</label>
                <input
                  type="number"
                  value={supplierA.freightCostBob}
                  onChange={(e) => setSupplierA({ ...supplierA, freightCostBob: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Embalaje/Otros (Bs)</label>
                <input
                  type="number"
                  value={supplierA.packagingAndOtherBob}
                  onChange={(e) => setSupplierA({ ...supplierA, packagingAndOtherBob: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Inversión total requerida:</span>
                <span className="font-semibold text-white">{formatCurrency(metricsA.totalLanded, 'BOB')}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="font-bold text-slate-200">Costo Unitario Real:</span>
                <span className={`text-xl font-extrabold ${bestIsA ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {formatCurrency(metricsA.unitLanded, 'BOB')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Proveedor B */}
        <div className={`p-6 rounded-2xl border transition-all ${!bestIsA ? 'bg-slate-950 border-emerald-500/50 shadow-lg shadow-emerald-950/20' : 'bg-slate-950/60 border-slate-800'}`}>
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              value={supplierB.name}
              onChange={(e) => setSupplierB({ ...supplierB, name: e.target.value })}
              className="bg-transparent border-b border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-emerald-500 pb-1 w-3/4"
            />
            {!bestIsA && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                <Award className="w-3 h-3" /> Mejor costo unitario
              </span>
            )}
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Precio Unitario (Bs)</label>
                <input
                  type="number"
                  value={supplierB.unitPrice}
                  onChange={(e) => setSupplierB({ ...supplierB, unitPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Cantidad Lote (uds)</label>
                <input
                  type="number"
                  value={supplierB.quantity}
                  onChange={(e) => setSupplierB({ ...supplierB, quantity: parseInt(e.target.value) || 1 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Flete Total (Bs)</label>
                <input
                  type="number"
                  value={supplierB.freightCostBob}
                  onChange={(e) => setSupplierB({ ...supplierB, freightCostBob: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Embalaje/Otros (Bs)</label>
                <input
                  type="number"
                  value={supplierB.packagingAndOtherBob}
                  onChange={(e) => setSupplierB({ ...supplierB, packagingAndOtherBob: parseFloat(e.target.value) || 0 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Inversión total requerida:</span>
                <span className="font-semibold text-white">{formatCurrency(metricsB.totalLanded, 'BOB')}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="font-bold text-slate-200">Costo Unitario Real:</span>
                <span className={`text-xl font-extrabold ${!bestIsA ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {formatCurrency(metricsB.unitLanded, 'BOB')}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <span>
          Diferencia de costo unitario: <strong className="text-white">{formatCurrency(Math.abs(metricsA.unitLanded - metricsB.unitLanded), 'BOB')}</strong> por unidad.
        </span>
        <span className="text-slate-500">
          Evaluación objetiva sin inventar ofertas comerciales.
        </span>
      </div>

    </div>
  );
};
