import React from 'react';
import { ExternalLink } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2.5 text-xs text-slate-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <p>
            <strong className="text-emerald-400 font-semibold">Trazabilidad Verificada:</strong> Cotizaciones oficiales referenciadas al Banco Central de Bolivia (BCB) y establecimientos supervisados por ASFI.
          </p>
        </div>
        
        <div className="flex items-center gap-4 text-slate-400">
          <span className="hidden sm:inline">Presupuesto y costo de uso: <strong className="text-white">0 Bs</strong></span>
          <a
            href="https://www.bcb.gob.bo/?q=tipos-de-cambio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
          >
            Verificar en BCB.gob.bo
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
