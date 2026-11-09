import React from 'react';
import { useLiveRates } from '../../context/LiveRateContext';
import { Copy, Check, RefreshCw, ShieldCheck } from 'lucide-react';

export const MobileRateHero: React.FC = () => {
  const { liveRate, isLoading, refreshRate } = useLiveRates();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${liveRate.rate.toFixed(2)} Bs`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="md:hidden relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white p-6 shadow-xl shadow-emerald-950/20 border border-white/10 select-none">
      {/* Círculos decorativos de fondo con desenfoque de luz */}
      <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-teal-300/15 blur-2xl pointer-events-none" />

      {/* Encabezado de la Tarjeta */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-emerald-100">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Oficial BCB en vivo</span>
        </div>

        <button
          onClick={() => refreshRate()}
          disabled={isLoading}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-90 transition-all border border-white/10 text-white disabled:opacity-50"
          title="Actualizar cotización"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Valor Central Gigante */}
      <div className="relative z-10 flex items-baseline justify-between gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-emerald-200/90 block">
            Dólar Estadounidense (TCO)
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-black tracking-tight text-white">
              {liveRate.rate.toFixed(2)}
            </span>
            <span className="text-lg font-bold text-emerald-200">
              Bs / USD
            </span>
          </div>
        </div>

        {/* Botón rápido para copiar */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-90 transition-all border border-white/20 text-xs font-semibold text-white shadow-sm"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copiado' : 'Copiar'}</span>
        </button>
      </div>

      {/* Pie de la Tarjeta */}
      <div className="relative z-10 mt-5 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-emerald-100/80">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
          <span>Vigente: <strong>{liveRate.cutoffDate}</strong></span>
        </span>
        <span className="text-emerald-200/70">
          Sin recargos · Promedio oficial
        </span>
      </div>
    </div>
  );
};
