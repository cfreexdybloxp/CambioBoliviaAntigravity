import React from 'react';
import { OFFICIAL_RATES } from '../../data/officialRates';
import { ExternalLink } from 'lucide-react';
import { getRateStaleness, formatDate } from '../../utils/dateFormatting';

export const RatesOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Título de Sección */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Pizarra de Cotizaciones Oficiales y Comerciales
          </h3>
          <p className="text-sm text-slate-400">
            Valores de referencia publicados por el Banco Central de Bolivia y entidades supervisadas.
          </p>
        </div>
        <div className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg self-start sm:self-auto">
          Perspectiva institucional: <strong>Compra</strong> (te compran) | <strong>Venta</strong> (te venden)
        </div>
      </div>

      {/* Grid de Tarjetas de Cotizaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {OFFICIAL_RATES.map((rate) => {
          const staleness = getRateStaleness(rate.effectiveDate);
          const spread = (rate.sellRate - rate.buyRate).toFixed(4);

          return (
            <div
              key={rate.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                {/* Encabezado de la tarjeta */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {rate.baseCurrency} / {rate.targetCurrency}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1.5">
                      {rate.baseCurrency === 'USD' && rate.type === 'OFICIAL_BCB' && 'Dólar Oficial (BCB)'}
                      {rate.baseCurrency === 'USD' && rate.type === 'REFERENCIAL_COMERCIAL' && 'Dólar Casas de Cambio'}
                      {rate.baseCurrency === 'EUR' && 'Euro Oficial'}
                      {rate.baseCurrency === 'PEN' && 'Sol Peruano'}
                      {rate.baseCurrency === 'BRL' && 'Real Brasileño'}
                      {rate.baseCurrency === 'ARS' && 'Peso Argentino'}
                      {rate.baseCurrency === 'CLP' && 'Peso Chileno'}
                      {rate.baseCurrency === 'UFV' && 'Unidad de Fomento (UFV)'}
                    </h4>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${staleness.badgeClass}`}>
                    {staleness.label}
                  </span>
                </div>

                {/* Precios de Compra y Venta */}
                <div className="grid grid-cols-2 gap-2 my-4 bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                  <div>
                    <span className="block text-[11px] font-medium text-slate-400">Compra (Bs)</span>
                    <span className="text-lg font-bold text-slate-200">
                      {rate.buyRate.toFixed(rate.baseCurrency === 'ARS' || rate.baseCurrency === 'CLP' ? 4 : 2)}
                    </span>
                  </div>
                  <div className="border-l border-slate-800 pl-3">
                    <span className="block text-[11px] font-medium text-slate-400">Venta (Bs)</span>
                    <span className="text-lg font-bold text-emerald-400">
                      {rate.sellRate.toFixed(rate.baseCurrency === 'ARS' || rate.baseCurrency === 'CLP' ? 4 : 2)}
                    </span>
                  </div>
                </div>

                {/* Brecha / Spread y Notas */}
                <div className="text-[11px] text-slate-400 space-y-1 mb-4">
                  {rate.baseCurrency !== 'UFV' && (
                    <div className="flex justify-between">
                      <span>Diferencial (Spread):</span>
                      <span className="text-slate-300 font-medium">Bs {spread}</span>
                    </div>
                  )}
                  <p className="text-slate-500 line-clamp-2 text-[11px] italic">
                    {rate.notes}
                  </p>
                </div>
              </div>

              {/* Pie de la tarjeta: Fuente y Fecha */}
              <div className="pt-3 border-t border-slate-800/70 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Vigencia: {formatDate(rate.effectiveDate)}</span>
                <a
                  href={rate.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-0.5"
                  title="Consultar fuente original"
                >
                  Fuente <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
