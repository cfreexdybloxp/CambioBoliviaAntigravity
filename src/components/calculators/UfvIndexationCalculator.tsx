import React, { useState, useMemo } from 'react';
import { calculateUfvIndexation } from '../../utils/ufvMath';
import { formatCurrency } from '../../utils/financialMath';
import { getOfficialRate } from '../../data/officialRates';
import { Landmark, ShieldCheck, ExternalLink, Info } from 'lucide-react';

export const UfvIndexationCalculator: React.FC = () => {
  const ufvRate = getOfficialRate('UFV');
  const officialUfv = ufvRate?.sellRate ?? 2.58321;

  const [amountBob, setAmountBob] = useState<string>('10000');
  const [initialUfv, setInitialUfv] = useState<string>('1.00000');
  const [finalUfv, setFinalUfv] = useState<string>(officialUfv.toFixed(5));

  const parsedAmount = parseFloat(amountBob);
  const parsedInitial = parseFloat(initialUfv);
  const parsedFinal = parseFloat(finalUfv);

  const result = useMemo(() => {
    return calculateUfvIndexation(
      Number.isFinite(parsedAmount) ? parsedAmount : 0,
      Number.isFinite(parsedInitial) ? parsedInitial : 0,
      Number.isFinite(parsedFinal) ? parsedFinal : 0
    );
  }, [parsedAmount, parsedInitial, parsedFinal]);

  const differenceBob = result.updatedAmountBob - result.originalAmountBob;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 transition-colors duration-200">

      {/* Encabezado */}
      <div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Landmark className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Calculadora de Indexación UFV (Mantenimiento de Valor BCB)
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Actualice montos de contratos, alquileres o depósitos entre dos fechas aplicando la fórmula oficial del Banco Central de Bolivia (D.S. 26390).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Entradas */}
        <div className="lg:col-span-6 space-y-4">

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Monto Original (Bs)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={amountBob}
              onChange={(e) => setAmountBob(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white font-semibold text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Importe del contrato, depósito o deuda en la fecha de origen.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                UFV de Origen (Inicial)
              </label>
              <input
                type="number"
                step="0.00001"
                min="0"
                value={initialUfv}
                onChange={(e) => setInitialUfv(e.target.value)}
                placeholder="1.00000"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Valor de la UFV en la fecha inicial (disponible en la tabla oficial del BCB).
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                UFV de Destino (Actual)
              </label>
              <input
                type="number"
                step="0.00001"
                min="0"
                value={finalUfv}
                onChange={(e) => setFinalUfv(e.target.value)}
                placeholder="2.58321"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-emerald-700 dark:text-emerald-400 font-semibold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Valor actual de la UFV.
              </span>
            </div>
          </div>

          {/* Enlace de verificación con el BCB */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Verificación con la Fuente Oficial:</span>
            </div>
            <p>
              La Unidad de Fomento a la Vivienda (UFV) es calculada y publicada diariamente por el Banco Central de Bolivia con base en el IPC.
            </p>
            <a
              href="https://www.bcb.gob.bo/?q=cotizaciones_tc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 font-medium pt-1"
            >
              Consultar serie histórica de UFVs en BCB.gob.bo
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Resultados */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-50 dark:bg-slate-950/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">

          <div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block mb-1">
              Resultado de Indexación
            </span>
            <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Monto Actualizado por UFV
            </h4>

            <div className="my-6 space-y-4">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 text-center shadow-sm">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Monto Final Actualizado:</span>
                <span className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                  {formatCurrency(result.updatedAmountBob, 'BOB')}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mt-2">
                  (Variación por mantenimiento de valor: +{formatCurrency(differenceBob, 'BOB')})
                </span>
              </div>

              <div className="space-y-2 text-xs bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  <span>Monto Inicial:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(result.originalAmountBob, 'BOB')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  <span>Factor de Actualización:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {result.variationPercentage >= 0 ? '+' : ''}{result.variationPercentage.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between py-1.5 font-bold text-sm text-slate-900 dark:text-white pt-1">
                  <span>Mantenimiento de Valor Ganado:</span>
                  <span className="text-emerald-600 dark:text-emerald-400">
                    +{formatCurrency(differenceBob, 'BOB')}
                  </span>
                </div>
              </div>
            </div>

          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>Fórmula legal: Monto Actualizado = Monto Inicial × (UFV Final / UFV Inicial). Utilizada en contratos de anticrético, pagarés y obligaciones fiscales en Bolivia.</span>
          </div>

        </div>

      </div>

    </div>
  );
};
