import React from 'react';
import {
  downloadRatesAsCsv,
  downloadRatesAsJson,
  downloadExchangeHousesAsCsv
} from '../../utils/dataExport';
import { EXCHANGE_HOUSES } from '../../data/exchangeHouses';
import { FileSpreadsheet, FileCode, Database, Info } from 'lucide-react';

export const OpenDataExporter: React.FC = () => {
  const hasExchangeHouses = EXCHANGE_HOUSES.length > 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-4 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Acceso a Datos Abiertos y Exportación Local
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Descargue la tabla de cotizaciones del BCB con su fuente y fecha, o el directorio de casas de cambio cuando tenga registros comprobados.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={downloadRatesAsCsv}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Cotizaciones (CSV)</span>
        </button>

        <button
          onClick={downloadRatesAsJson}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
        >
          <FileCode className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Cotizaciones (JSON)</span>
        </button>

        <button
          onClick={downloadExchangeHousesAsCsv}
          disabled={!hasExchangeHouses}
          title={hasExchangeHouses
            ? 'Descargar el directorio en CSV'
            : 'No hay casas de cambio con datos comprobados todavía'}
          className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-slate-200 dark:enabled:hover:bg-slate-800"
        >
          <FileSpreadsheet className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Directorio Casas ASFI (CSV)</span>
          {!hasExchangeHouses && <span className="font-normal">— 0 registros</span>}
        </button>
      </div>

      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
        <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
        <span>
          Los archivos se generan en la memoria de su navegador, sin enviar solicitudes a servidores externos.
          {!hasExchangeHouses && ' El directorio de casas de cambio está vacío porque aún no hay registros con fuente comprobable.'}
        </span>
      </div>
    </div>
  );
};
