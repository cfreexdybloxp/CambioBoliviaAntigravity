import React from 'react';
import { ExternalLink } from 'lucide-react';
import { RATES_SNAPSHOT } from '../../data/officialRates';
import { formatDate } from '../../utils/dateFormatting';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-emerald-50/90 dark:bg-slate-900/90 border-b border-emerald-200/60 dark:border-slate-800 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative" aria-hidden="true">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <p>
            <strong className="text-emerald-700 dark:text-emerald-400 font-semibold">Datos con fuente y fecha:</strong>{' '}
            TCO del BCB ({RATES_SNAPSHOT.tableId}, {formatDate(RATES_SNAPSHOT.publishedOn)}). Todo lo que no
            podemos comprobar se marca como no verificado.
          </p>
        </div>

        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <span className="hidden sm:inline">Costo de uso: <strong className="text-slate-900 dark:text-white">0 Bs</strong></span>
          <a
            href={RATES_SNAPSHOT.humanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 inline-flex items-center gap-1 transition-colors font-medium"
          >
            Verificar en BCB.gob.bo
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
