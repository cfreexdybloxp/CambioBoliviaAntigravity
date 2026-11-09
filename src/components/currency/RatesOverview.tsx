import React from 'react';
import { OFFICIAL_RATES, RATES_SNAPSHOT } from '../../data/officialRates';
import { ExternalLink, Info, RefreshCw } from 'lucide-react';
import { getRateStaleness, formatDate } from '../../utils/dateFormatting';
import { useLiveRates } from '../../context/LiveRateContext';

export const RatesOverview: React.FC = () => {
  const { liveRate, isLoading, refreshRate, lastUpdated } = useLiveRates();

  return (
    <div className="space-y-6">

      {/* Título de Sección */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Tipo de Cambio Oficial del BCB
            </h3>
            {/* Live Rate Badge */}
            <div className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>En vivo: <strong>{liveRate.rate.toFixed(2)} Bs/USD</strong></span>
              <span className="text-slate-400 dark:text-slate-500 text-[10px] hidden md:inline">
                (Corte: {liveRate.cutoffDate})
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Valores oficiales de corte diario del Banco Central de Bolivia. Se actualizan automáticamente.
            {lastUpdated && (
              <span className="text-[11px] text-slate-400 dark:text-slate-500 ml-2">
                · Último chequeo: {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => refreshRate()}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm transition-all disabled:opacity-50"
            title="Consultar datos frescos del BCB ahora"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Consultando...' : 'Actualizar ahora'}</span>
          </button>
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
