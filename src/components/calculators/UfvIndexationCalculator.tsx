import React, { useState, useMemo } from 'react';
import { 
  UFV_HISTORICAL_SERIES, 
  calculateUfvIndexation 
} from '../../utils/ufvMath';
import { formatCurrency } from '../../utils/financialMath';
import { Landmark, ShieldCheck } from 'lucide-react';

export const UfvIndexationCalculator: React.FC = () => {
  const [amountBob, setAmountBob] = useState<number>(10000);
  const [selectedInitialYear, setSelectedInitialYear] = useState<number>(2015);
  const [customInitialUfv, setCustomInitialUfv] = useState<string>('2.09638');
  const [useCustomUfv, setUseCustomUfv] = useState<boolean>(false);
  const [finalUfv, setFinalUfv] = useState<number>(2.58312); // UFV oficial actual

  const activeInitialUfv = useMemo(() => {
    if (useCustomUfv) {
      return parseFloat(customInitialUfv) || 1.0;
    }
    const found = UFV_HISTORICAL_SERIES.find(p => p.year === selectedInitialYear);
    return found ? found.ufvValue : 2.09638;
  }, [useCustomUfv, customInitialUfv, selectedInitialYear]);

  const result = useMemo(() => {
    return calculateUfvIndexation(amountBob, activeInitialUfv, finalUfv);
  }, [amountBob, activeInitialUfv, finalUfv]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Encabezado */}
      <div>
        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Landmark className="w-5 h-5 text-emerald-400" />
          Calculadora de Indexación UFV y Poder Adquisitivo (BCB)
        </h3>
        <p className="text-sm text-slate-400 mt-1">
          Actualice deudas, contratos, anticréticos o beneficios laborales conforme a la Unidad de Fomento de Vivienda del Banco Central de Bolivia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Entradas */}
        <div className="lg:col-span-6 space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Monto Original a Actualizar (Bs)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={amountBob}
              onChange={(e) => setAmountBob(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-semibold text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Valor histórico del contrato, depósito judicial, anticrético o deuda.
            </span>
          </div>

          {/* Selección de Período Inicial */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Fecha o UFV de Origen
              </label>
              <button
                type="button"
                onClick={() => setUseCustomUfv(!useCustomUfv)}
                className="text-[11px] text-emerald-400 hover:underline"
              >
                {useCustomUfv ? 'Elegir por año histórico' : 'Ingresar valor exacto'}
              </button>
            </div>

            {!useCustomUfv ? (
              <div>
                <select
                  value={selectedInitialYear}
                  onChange={(e) => setSelectedInitialYear(parseInt(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {UFV_HISTORICAL_SERIES.filter(p => p.year < 2026).map((point) => (
                    <option key={point.year} value={point.year}>
                      {point.label} — UFV: {point.ufvValue.toFixed(5)}
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  UFV inicial aplicada: <strong>{activeInitialUfv.toFixed(5)}</strong>
                </span>
              </div>
            ) : (
              <div>
                <input
                  type="number"
                  step="0.00001"
                  value={customInitialUfv}
                  onChange={(e) => setCustomInitialUfv(e.target.value)}
                  placeholder="Ej. 1.84521"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}
          </div>

          {/* UFV Final / Destino */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              UFV de Cierre / Actual (BCB)
            </label>
            <input
              type="number"
              step="0.00001"
              value={finalUfv}
              onChange={(e) => setFinalUfv(parseFloat(e.target.value) || 2.58312)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              Cotización oficial diaria vigente publicada por el Banco Central de Bolivia.
            </span>
          </div>

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
                Equivalente al poder adquisitivo indexado a la inflación oficial.
              </p>
            </div>

            <div className="space-y-2 py-4 border-y border-slate-800 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Cantidad de UFVs equivalentes:</span>
                <span className="font-semibold text-white">{result.ufvQuantity.toLocaleString('es-BO')} UFV</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Variación acumulada de la UFV:</span>
                <span className="font-semibold text-emerald-400">+{result.variationPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Incremento en Bolivianos:</span>
                <span className="font-semibold text-white">+{formatCurrency(result.updatedAmountBob - result.originalAmountBob, 'BOB')}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Uso legal y tributario en Bolivia:</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                La UFV fue creada mediante el <strong>Decreto Supremo Nº 26390</strong> para preservar el valor de las operaciones financieras. Se utiliza en el cálculo de actualizaciones de adeudos tributarios del SIN y en contratos de financiamiento de vivienda de interés social.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
