import React from 'react';
import { OFFICIAL_RATES, RATES_SNAPSHOT } from '../../data/officialRates';
import { ExternalLink, Info } from 'lucide-react';
import { getRateStaleness, formatDate } from '../../utils/dateFormatting';

export const RatesOverview: React.FC = () => {
  const [liveRate, setLiveRate] = React.useState<import('../../utils/liveRateService').LiveRateData | null>(null);
  React.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const data = await import('../../utils/liveRateService').then(m => m.fetchLiveBcbRate());
      if (!cancelled) setLiveRate(data);
    };
    load();
    const interval = setInterval(load, 60000); // refresh every minute
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="space-y-6">

      {/* Título de Sección */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Live Rate Badge */}
          {liveRate && (
            <div className="px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-medium flex items-center gap-1.5">
              <span>🟢 En vivo</span>
              <span>{liveRate.rate.toFixed(2)} Bs/USD</span>
              <span>(corte {liveRate.cutoffDate})</span>
            </div>
          )}

        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Tipo de Cambio Oficial del BCB
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Valores de la {RATES_SNAPSHOT.tableId}, publicada el {formatDate(RATES_SNAPSHOT.publishedOn)}.
          </p>
        </div>
        <div className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-lg self-start sm:self-auto shadow-sm">
          El BCB publica un <strong>TCO único</strong> por jornada: no hay compra/venta oficial.
        </div>
      </div>

      {/* Grid de Tarjetas de Cotizaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {OFFICIAL_RATES.map((rate) => {
          const staleness = getRateStaleness(rate.publishedOn);
          const decimals = rate.baseCurrency === 'ARS' || rate.baseCurrency === 'CLP' ? 5 : 2;
          const hasSpread = rate.buyRate !== rate.sellRate;

          return (
            <div
              key={rate.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Encabezado de la tarjeta */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {rate.baseCurrency} / {rate.targetCurrency}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1.5">
                      {rate.baseCurrency === 'USD' && 'Dólar estadounidense'}
                      {rate.baseCurrency === 'EUR' && 'Euro'}
                      {rate.baseCurrency === 'PEN' && 'Sol peruano'}
                      {rate.baseCurrency === 'BRL' && 'Real brasileño'}
                      {rate.baseCurrency === 'ARS' && 'Peso argentino'}
                      {rate.baseCurrency === 'CLP' && 'Peso chileno'}
                      {rate.baseCurrency === 'UFV' && 'Unidad de Fomento (UFV)'}
                    </h4>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${staleness.badgeClass}`}>
                    {staleness.label}
                  </span>
                </div>

                {/* Valor oficial (TCO único) */}
                <div className="my-4 bg-slate-50 dark:bg-slate-950/70 p-3 rounded-lg border border-slate-200 dark:border-slate-800/80">
                  {hasSpread ? (
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Compra (Bs)</span>
                        <span className="text-lg font-bold text-slate-800 dark:text-slate-200">
                          {rate.buyRate.toFixed(decimals)}
                        </span>
                      </div>
                      <div className="border-l border-slate-200 dark:border-slate-800 pl-3">
                        <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Venta (Bs)</span>
                        <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                          {rate.baseCurrency === 'USD' && liveRate ? liveRate.rate.toFixed(decimals) : rate.sellRate.toFixed(decimals)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {rate.baseCurrency === 'UFV' ? 'Valor de la UFV (Bs)' : 'TCO (Bs por unidad)'}
                      </span>
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">
                        {rate.baseCurrency === 'USD' && liveRate ? liveRate.rate.toFixed(decimals) : rate.sellRate.toFixed(decimals)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Nota de la fuente */}
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {rate.notes}
                </p>
              </div>

              {/* Pie de la tarjeta: Fuente y Fecha */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/70 text-[11px] text-slate-400 dark:text-slate-500 flex items-center justify-between">
                <span>Publicado: {formatDate(rate.publishedOn)}</span>
                <a
                  href={rate.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 inline-flex items-center gap-0.5 font-medium"
                  title="Consultar la tabla original del BCB"
                >
                  Fuente <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

            </div>
          );
        })}
      </div>

      {/* Aclaración metodológica */}
      <div className="p-4 bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800 dark:text-slate-200">Cómo leer esta pizarra:</strong> estos valores son
          una copia de la tabla diaria del BCB consultada el {formatDate(RATES_SNAPSHOT.retrievedOn)}. No se
          actualizan solos: si la fecha de publicación no es reciente, el dato está desactualizado y debe
          confirmarse en <a href={RATES_SNAPSHOT.humanUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline">bcb.gob.bo</a>.
          Desde diciembre de 2025 el BCB unificó el mercado cambiario, por lo que la referencia oficial y la de
          ventanilla no deben presentarse como dos mercados separados sin una fuente que lo demuestre.
        </p>
      </div>

    </div>
  );
};
