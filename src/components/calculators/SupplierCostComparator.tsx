import React, { useState } from 'react';
import { formatCurrency, roundCurrency } from '../../utils/financialMath';
import { Award, Truck } from 'lucide-react';

interface SupplierQuoteInput {
  name: string;
  unitPrice: string;
  quantity: string;
  freightCostBob: string;
  packagingAndOtherBob: string;
  rateToBob: string;
}

export const SupplierCostComparator: React.FC = () => {
  const [supplierA, setSupplierA] = useState<SupplierQuoteInput>({
    name: 'Proveedor A (Nacional - La Paz)',
    unitPrice: '45',
    quantity: '100',
    freightCostBob: '150',
    packagingAndOtherBob: '50',
    rateToBob: '1'
  });

  const [supplierB, setSupplierB] = useState<SupplierQuoteInput>({
    name: 'Proveedor B (Regional - Cochabamba)',
    unitPrice: '38',
    quantity: '200',
    freightCostBob: '400',
    packagingAndOtherBob: '100',
    rateToBob: '1'
  });

  const getMetrics = (s: SupplierQuoteInput) => {
    const uPrice = parseFloat(s.unitPrice) || 0;
    const qty = parseInt(s.quantity, 10) || 1;
    const rate = parseFloat(s.rateToBob) || 1;
    const freight = parseFloat(s.freightCostBob) || 0;
    const pack = parseFloat(s.packagingAndOtherBob) || 0;

    const totalPurchase = uPrice * qty * rate;
    const totalExpenses = freight + pack;
    const totalLanded = totalPurchase + totalExpenses;
    const unitLanded = qty > 0 ? totalLanded / qty : 0;

    return {
      totalPurchase,
      totalExpenses,
      totalLanded,
      unitLanded: roundCurrency(unitLanded, 2),
      quantity: qty
    };
  };

  const metricsA = getMetrics(supplierA);
  const metricsB = getMetrics(supplierB);

  const bestIsA = metricsA.unitLanded < metricsB.unitLanded;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 transition-colors duration-200">
      
      {/* Encabezado */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Truck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Comparador de Costo Real entre Proveedores
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          No se guíe solo por el precio de catálogo. Compare el costo unitario puesto en su almacén considerando fletes y lotes mínimos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Proveedor A */}
        <div className={`p-6 rounded-2xl border transition-all ${
          bestIsA 
            ? 'bg-emerald-50/50 dark:bg-slate-950 border-emerald-300 dark:border-emerald-500/50 shadow-md' 
            : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              value={supplierA.name}
              onChange={(e) => setSupplierA({ ...supplierA, name: e.target.value })}
              className="bg-transparent border-b border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:border-emerald-500 pb-1 w-3/4"
            />
            {bestIsA && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                <Award className="w-3 h-3" /> Más conveniente
              </span>
            )}
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Precio Unitario de Catálogo (Bs)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={supplierA.unitPrice}
                  onChange={(e) => setSupplierA({ ...supplierA, unitPrice: e.target.value })}
                  placeholder="0.00"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Cantidad del Pedido (uds)</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={supplierA.quantity}
                  onChange={(e) => setSupplierA({ ...supplierA, quantity: e.target.value })}
                  placeholder="1"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Flete Total (Bs)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={supplierA.freightCostBob}
                  onChange={(e) => setSupplierA({ ...supplierA, freightCostBob: e.target.value })}
                  placeholder="0.00"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Embalaje / Otros (Bs)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={supplierA.packagingAndOtherBob}
                  onChange={(e) => setSupplierA({ ...supplierA, packagingAndOtherBob: e.target.value })}
                  placeholder="0.00"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Métrica Resaltada */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 space-y-1">
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>Costo Total del Pedido:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(metricsA.totalLanded, 'BOB')}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold pt-1">
                <span className="text-slate-900 dark:text-white">Costo Real por Unidad:</span>
                <span className={`text-lg font-black ${bestIsA ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  {formatCurrency(metricsA.unitLanded, 'BOB')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Proveedor B */}
        <div className={`p-6 rounded-2xl border transition-all ${
          !bestIsA 
            ? 'bg-emerald-50/50 dark:bg-slate-950 border-emerald-300 dark:border-emerald-500/50 shadow-md' 
            : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              value={supplierB.name}
              onChange={(e) => setSupplierB({ ...supplierB, name: e.target.value })}
              className="bg-transparent border-b border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-sm focus:outline-none focus:border-emerald-500 pb-1 w-3/4"
            />
            {!bestIsA && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                <Award className="w-3 h-3" /> Más conveniente
              </span>
            )}
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Precio Unitario de Catálogo (Bs)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={supplierB.unitPrice}
                  onChange={(e) => setSupplierB({ ...supplierB, unitPrice: e.target.value })}
                  placeholder="0.00"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Cantidad del Pedido (uds)</label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={supplierB.quantity}
                  onChange={(e) => setSupplierB({ ...supplierB, quantity: e.target.value })}
                  placeholder="1"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Flete Total (Bs)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={supplierB.freightCostBob}
                  onChange={(e) => setSupplierB({ ...supplierB, freightCostBob: e.target.value })}
                  placeholder="0.00"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Embalaje / Otros (Bs)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={supplierB.packagingAndOtherBob}
                  onChange={(e) => setSupplierB({ ...supplierB, packagingAndOtherBob: e.target.value })}
                  placeholder="0.00"
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Métrica Resaltada */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 space-y-1">
              <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                <span>Costo Total del Pedido:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(metricsB.totalLanded, 'BOB')}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold pt-1">
                <span className="text-slate-900 dark:text-white">Costo Real por Unidad:</span>
                <span className={`text-lg font-black ${!bestIsA ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                  {formatCurrency(metricsB.unitLanded, 'BOB')}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Explicación y Veredicto */}
      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-3">
        <span>
          Diferencia de ahorro por unidad: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
            {formatCurrency(Math.abs(metricsA.unitLanded - metricsB.unitLanded), 'BOB')}
          </strong> por cada artículo puesto en su tienda.
        </span>
        <span className="text-slate-500 italic">
          Un precio por pieza aparentemente más barato puede resultar más caro si el flete o lote mínimo es excesivo.
        </span>
      </div>

    </div>
  );
};
