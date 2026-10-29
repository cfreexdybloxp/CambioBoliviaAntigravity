import React, { useState } from 'react';
import { CurrencyCode } from '../../types';
import { OFFICIAL_RATES } from '../../data/officialRates';
import { EXCHANGE_HOUSES } from '../../data/exchangeHouses';
import { ArrowUpDown, Info } from 'lucide-react';

export const RateComparisonTable: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');

  // Obtener cotización oficial del BCB para la moneda seleccionada
  const officialRate = OFFICIAL_RATES.find(
    r => r.baseCurrency === selectedCurrency && r.type === 'OFICIAL_BCB'
  );

  // Armar lista de establecimientos con cotizaciones disponibles para esa moneda
  const rows = EXCHANGE_HOUSES.map(house => {
    let buy: number | undefined;
    let sell: number | undefined;

    if (selectedCurrency === 'USD') {
      buy = house.publishedRates.usdBuy;
      sell = house.publishedRates.usdSell;
    } else if (selectedCurrency === 'EUR') {
      buy = house.publishedRates.eurBuy;
      sell = house.publishedRates.eurSell;
    } else if (selectedCurrency === 'PEN') {
      buy = house.publishedRates.penBuy;
      sell = house.publishedRates.penSell;
    } else if (selectedCurrency === 'ARS') {
      buy = house.publishedRates.arsBuy;
      sell = house.publishedRates.arsSell;
    } else if (selectedCurrency === 'BRL') {
      buy = house.publishedRates.brlBuy;
      sell = house.publishedRates.brlSell;
    }

    const spread = (buy && sell) ? (sell - buy).toFixed(2) : '-';
    const diffFromOfficial = (sell && officialRate) ? (sell - officialRate.sellRate).toFixed(2) : '-';

    return {
      id: house.id,
      name: house.commercialName,
      city: `${house.city} (${house.department})`,
      asfiLicense: house.asfiLicense,
      buy,
      sell,
      spread,
      diffFromOfficial,
      verifiedDate: house.lastVerifiedDate
    };
  }).filter(r => r.sell !== undefined);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ArrowUpDown className="w-5 h-5 text-emerald-400" />
            Tabla Comparativa de Cotizaciones por Establecimiento
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Contraste el diferencial (*spread*) y las pizarras comerciales frente al Tipo de Cambio Oficial del BCB.
          </p>
        </div>

        {/* Selector de Moneda */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {(['USD', 'EUR', 'PEN', 'ARS', 'BRL'] as CurrencyCode[]).map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCurrency(c)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCurrency === c
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Referencia Oficial Destacada */}
      {officialRate && (
        <div className="bg-emerald-950/30 border border-emerald-800/60 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">
              Tipo de Cambio Oficial (BCB) de Referencia
            </span>
            <span className="text-white font-semibold text-sm">
              Compra: Bs {officialRate.buyRate.toFixed(2)} | Venta: Bs {officialRate.sellRate.toFixed(2)}
            </span>
          </div>
          <span className="text-slate-400">
            Fijado por el Banco Central de Bolivia para operaciones formales y tributarias.
          </span>
        </div>
      )}

      {/* Tabla Responsive */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
              <th className="py-3 px-3">Casa de Cambio (ASFI)</th>
              <th className="py-3 px-3">Ubicación</th>
              <th className="py-3 px-3 text-right">Compra (Bs)</th>
              <th className="py-3 px-3 text-right">Venta (Bs)</th>
              <th className="py-3 px-3 text-right">Diferencial (Spread)</th>
              <th className="py-3 px-3 text-right">Dif. vs BCB Oficial</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-850/50 transition-colors">
                <td className="py-3.5 px-3">
                  <div className="font-bold text-white text-sm">{row.name}</div>
                  <span className="text-[10px] text-slate-500">Licencia: {row.asfiLicense}</span>
                </td>
                <td className="py-3.5 px-3 text-slate-400">{row.city}</td>
                <td className="py-3.5 px-3 text-right font-medium text-slate-200">
                  {row.buy ? `Bs ${row.buy.toFixed(2)}` : '-'}
                </td>
                <td className="py-3.5 px-3 text-right font-bold text-emerald-400 text-sm">
                  {row.sell ? `Bs ${row.sell.toFixed(2)}` : '-'}
                </td>
                <td className="py-3.5 px-3 text-right font-medium text-slate-400">
                  Bs {row.spread}
                </td>
                <td className="py-3.5 px-3 text-right font-medium text-amber-400">
                  {row.diffFromOfficial !== '-' ? `+Bs ${row.diffFromOfficial}` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Descargo Normativo (Regla 23 de Instrucción Maestra) */}
      <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-200">Aviso sobre comparaciones:</strong> Las diferencias numéricas reflejan precios de ventanilla registrados en establecimientos autorizados. No constituyen garantías de ahorro ni compromisos comerciales obligatorios para las entidades. Las cotizaciones pueden variar según la disponibilidad de efectivo físico en caja.
        </p>
      </div>

    </div>
  );
};
