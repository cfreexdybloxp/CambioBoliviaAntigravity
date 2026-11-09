import React, { useState } from 'react';
import { CurrencyCode } from '../../types';
import { getOfficialRate } from '../../data/officialRates';
import { EXCHANGE_HOUSES } from '../../data/exchangeHouses';
import { ArrowUpDown, Info, ExternalLink } from 'lucide-react';
import { formatDate } from '../../utils/dateFormatting';
import { useLiveRates } from '../../context/LiveRateContext';

export const RateComparisonTable: React.FC = () => {
  const { liveRate } = useLiveRates();
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');

  const baseOfficialRate = getOfficialRate(selectedCurrency);
  const effectiveSellRate = selectedCurrency === 'USD' ? liveRate.rate : (baseOfficialRate?.sellRate || 0);

  // Cotizaciones de ventanilla: solo si existen registros con fuente comprobable.
  const rows = EXCHANGE_HOUSES.flatMap(house => {
    const rates = house.publishedRates;
    const map: Partial<Record<CurrencyCode, { buy?: number; sell?: number }>> = {
      USD: { buy: rates.usdBuy, sell: rates.usdSell },
      EUR: { buy: rates.eurBuy, sell: rates.eurSell },
      PEN: { buy: rates.penBuy, sell: rates.penSell },
      ARS: { buy: rates.arsBuy, sell: rates.arsSell },
      BRL: { buy: rates.brlBuy, sell: rates.brlSell },
      CLP: { buy: rates.clpBuy, sell: rates.clpSell },
    };

    const pair = map[selectedCurrency];
    if (!pair?.sell) return [];

    const spread = pair.buy !== undefined ? (pair.sell - pair.buy) : null;

    return [{
      id: house.id,
      name: house.commercialName,
      city: `${house.city} (${house.department})`,
      asfiLicense: house.asfiLicense,
      buy: pair.buy,
      sell: pair.sell,
      spread,
      diffFromOfficial: effectiveSellRate > 0 ? pair.sell - effectiveSellRate : null,
      verifiedDate: house.lastVerifiedDate,
    }];
  });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 transition-colors duration-200">

      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Referencia oficial frente a cotizaciones de ventanilla
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            El BCB publica un TCO único. Las pizarras de cada establecimiento son otra cosa y solo se muestran si tienen fuente comprobable.
          </p>
        </div>

        {/* Selector de Moneda */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
          {(['USD', 'EUR', 'PEN', 'ARS', 'BRL', 'CLP'] as CurrencyCode[]).map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCurrency(c)}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCurrency === c
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-slate-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Referencia oficial */}
      {baseOfficialRate ? (
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase text-[10px] tracking-wider block">
                Tipo de Cambio Oficial (BCB) — {selectedCurrency}/BOB
              </span>
              {selectedCurrency === 'USD' && (
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 font-semibold">
                  En vivo
                </span>
              )}
            </div>
            <span className="text-slate-900 dark:text-white font-semibold text-lg">
              Bs {effectiveSellRate.toFixed(selectedCurrency === 'ARS' || selectedCurrency === 'CLP' ? 5 : 2)}
            </span>
          </div>
          <div className="text-slate-600 dark:text-slate-400 space-y-1">
            <p>
              {selectedCurrency === 'USD' 
                ? `Corte oficial BCB: ${liveRate.cutoffDate} (Vigente)` 
                : `Publicado el ${formatDate(baseOfficialRate.publishedOn)} · ${baseOfficialRate.sourceTable}`
              }
            </p>
            <a
              href={baseOfficialRate.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 font-medium"
            >
              Verificar en el BCB <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl p-4 text-xs text-amber-700 dark:text-amber-300">
          No consta un TCO para {selectedCurrency} en la fuente consultada.
        </div>
      )}

      {/* Tabla de ventanilla (solo con datos verificados) */}
      {rows.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase font-semibold">
                <th className="py-3 px-3">Casa de cambio</th>
                <th className="py-3 px-3">Ubicación</th>
                <th className="py-3 px-3 text-right">Compra (Bs)</th>
                <th className="py-3 px-3 text-right">Venta (Bs)</th>
                <th className="py-3 px-3 text-right">Diferencial</th>
                <th className="py-3 px-3 text-right">Dif. vs TCO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">{row.name}</div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">Registro: {row.asfiLicense}</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 dark:text-slate-400">{row.city}</td>
                  <td className="py-3.5 px-3 text-right font-medium text-slate-800 dark:text-slate-200">
                    {row.buy !== undefined ? `Bs ${row.buy.toFixed(4)}` : '—'}
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                    Bs {row.sell.toFixed(4)}
                  </td>
                  <td className="py-3.5 px-3 text-right font-medium text-slate-500 dark:text-slate-400">
                    {row.spread !== null ? `Bs ${row.spread.toFixed(4)}` : '—'}
                  </td>
                  <td className="py-3.5 px-3 text-right font-medium text-amber-600 dark:text-amber-400">
                    {row.diffFromOfficial !== null ? `Bs ${row.diffFromOfficial.toFixed(4)}` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl p-5 text-xs text-slate-600 dark:text-slate-400 space-y-2">
          <p className="font-semibold text-slate-800 dark:text-slate-200">
            Sin cotizaciones de ventanilla contrastadas para {selectedCurrency}
          </p>
          <p className="leading-relaxed">
            No publicamos pizarras de casas de cambio hasta poder verificarlas: no tenemos una fuente
            pública con la que comprobarlas. Puedes consultar el TCO oficial arriba y confirmar el precio
            de ventanilla directamente en el establecimiento.
          </p>
        </div>
      )}

      {/* Descargo */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800 dark:text-slate-200">Sobre las comparaciones:</strong> una diferencia
          numérica no implica una oportunidad de ahorro. Comisiones, disponibilidad de efectivo y condiciones
          de cada operación pueden cambiar el resultado. Confirma siempre antes de operar.
        </p>
      </div>

    </div>
  );
};
