import React, { useState, useMemo } from 'react';
import { calculateUfvIndexation } from '../../utils/ufvMath';
import { formatCurrency } from '../../utils/financialMath';
import { getOfficialRate, RATES_SNAPSHOT } from '../../data/officialRates';
import { formatDate } from '../../utils/dateFormatting';
import { Landmark, ShieldCheck, ExternalLink, Info } from 'lucide-react';

export const UfvIndexationCalculator: React.FC = () => {
  const ufvRate = getOfficialRate('UFV');
  const officialUfv = ufvRate?.sellRate ?? 0;

  const [amountBob, setAmountBob] = useState<number>(10000);
  const [initialUfv, setInitialUfv] = useState<string>('1.00000');
  const [finalUfv, setFinalUfv] = useState<string>(officialUfv.toFixed(5));

  const parsedInitial = parseFloat(initialUfv);
  const parsedFinal = parseFloat(finalUfv);

  const result = useMemo(() => {
    return calculateUfvIndexation(
      amountBob,
      Number.isFinite(parsedInitial) ? parsedInitial : 0,
      Number.isFinite(parsedFinal) ? parsedFinal : 0
    );
  }, [amountBob, parsedInitial, parsedFinal]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">

      {/* Encabezado */}
      <div>
        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Landmark className="w-5 h-5 text-emerald-400" />
          Calculadora de Indexación UFV
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          Actualiza un monto entre dos fechas usando el valor de la UFV que tú indiques. No usamos una serie histórica propia: la UFV la publica el BCB.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Entradas */}
        <div className="lg:col-span-6 space-y-4">

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Monto Original (Bs)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={Number.isFinite(amountBob) ? amountBob : ''}
              onChange={(e) => setAmountBob(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-semibold text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Importe del contrato, depósito o deuda en la fecha de origen.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                UFV de Origen
              </label>
              <input
                type="number"
                step="0.00001"
                min="0"
                value={initialUfv}
                onChange={(e) => setInitialUfv(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Valor de la UFV en la fecha inicial. Búscalo en la tabla del BCB.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                UFV de Cierre
              </label>
              <input
                type="number"
                step="0.00001"
                min="0"
                value={finalUfv}
                onChange={(e) => setFinalUfv(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Por defecto, la UFV publicada el {formatDate(RATES_SNAPSHOT.publishedOn)}.
              </span>
            </div>
          </div>

          <a
            href="https://www.bcb.gob.bo/?q=servicios/ufv/datos_estadisticos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
          >
            Consultar la tabla oficial de UFV en el BCB
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

        </div>

        {/* Resultados */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-950/80 border border-slate-800 rounded-2xl p-6">

          <div className="space-y-6">

            <div>
              <span className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">
                Monto Actualizado por UFV
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                {formatCurrency(result.updatedAmountBob, 'BOB')}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Resultado de aplicar la variación de la UFV entre las dos fechas indicadas.
              </p>
            </div>

            <div className="space-y-2 py-4 border-y border-slate-800 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Cantidad de UFV equivalentes:</span>
                <span className="font-semibold text-white">{result.ufvQuantity.toLocaleString('es-BO')} UFV</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Variación de la UFV:</span>
                <span className="font-semibold text-emerald-400">{result.variationPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Diferencia en bolivianos:</span>
                <span className="font-semibold text-white">{formatCurrency(result.updatedAmountBob - result.originalAmountBob, 'BOB')}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Qué hace y qué no hace este cálculo</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Aplica la fórmula de indexación por UFV. No determina por sí solo si una deuda es exigible:
                eso depende del contrato y de la normativa aplicable. Para montos judiciales o tributarios,
                confirma el procedimiento con la entidad correspondiente.
              </p>
            </div>

          </div>

        </div>

      </div>

      <div className="text-[11px] text-slate-500 flex items-start gap-1.5 pt-2 border-t border-slate-800">
        <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
        <span>
          La UFV de cierre precargada ({officialUfv.toFixed(5)}) proviene de la {RATES_SNAPSHOT.tableId} del BCB,
          publicada el {formatDate(RATES_SNAPSHOT.publishedOn)}. Si la fecha ya no es reciente, actualízala.
        </span>
      </div>

    </div>
  );
};
