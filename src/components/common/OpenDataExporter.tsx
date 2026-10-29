import React from 'react';
import { 
  downloadRatesAsCsv, 
  downloadRatesAsJson, 
  downloadExchangeHousesAsCsv 
} from '../../utils/dataExport';
import { FileSpreadsheet, FileCode, Database } from 'lucide-react';

export const OpenDataExporter: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            Acceso a Datos Abiertos y Exportación Local
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Descargue libremente las tablas de cotizaciones y el directorio regulado ASFI para análisis económico o archivo personal.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={downloadRatesAsCsv}
          className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>Cotizaciones (CSV)</span>
        </button>

        <button
          onClick={downloadRatesAsJson}
          className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <FileCode className="w-4 h-4 text-blue-400" />
          <span>Cotizaciones (JSON)</span>
        </button>

        <button
          onClick={downloadExchangeHousesAsCsv}
          className="px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4 text-amber-400" />
          <span>Directorio Casas ASFI (CSV)</span>
        </button>
      </div>

      <div className="text-[11px] text-slate-500">
        Los archivos se generan de forma instantánea en la memoria de su navegador sin enviar solicitudes a servidores externos.
      </div>
    </div>
  );
};
