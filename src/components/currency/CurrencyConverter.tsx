import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Copy, Check, Clock, Info, ShieldCheck } from 'lucide-react';
import { CurrencyCode } from '../../types';
import { OFFICIAL_RATES } from '../../data/officialRates';
import { convertAmount, formatCurrency, roundCurrency } from '../../utils/financialMath';
import { getRateStaleness, formatDate } from '../../utils/dateFormatting';
import { useLiveRates } from '../../context/LiveRateContext';

export const CurrencyConverter: React.FC = () => {
  const { liveRate, ratesMap } = useLiveRates();
  // Manejamos el monto como string para permitir borrar completamente sin que se pegue un cero
  const [amount, setAmount] = useState<string>('100');

  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('USD');
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('BOB');
  const [copied, setCopied] = useState<boolean>(false);

  const currencies: { code: CurrencyCode; name: string; flag: string }[] = [
    { code: 'BOB', name: 'Boliviano (BOB)', flag: '🇧🇴' },
    { code: 'USD', name: 'Dólar Estadounidense (USD)', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro (EUR)', flag: '🇪🇺' },
    { code: 'PEN', name: 'Sol Peruano (PEN)', flag: '🇵🇪' },
    { code: 'BRL', name: 'Real Brasileño (BRL)', flag: '🇧🇷' },
    { code: 'ARS', name: 'Peso Argentino (ARS)', flag: '🇦🇷' },
    { code: 'CLP', name: 'Peso Chileno (CLP)', flag: '🇨🇱' },
    { code: 'UFV', name: 'Unidad de Fomento (UFV)', flag: '📈' },
  ];

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const parsedAmount = parseFloat(amount);

  const conversionResult = useMemo(() => {
    // Use live BCB rate when converting between USD and BOB
    if (liveRate && ((fromCurrency === 'USD' && toCurrency === 'BOB') || (fromCurrency === 'BOB' && toCurrency === 'USD'))) {
      const rate = fromCurrency === 'USD' ? liveRate.rate : 1 / liveRate.rate;
      const result = parsedAmount * rate;
      return {
        result,
        rateApplied: rate,
        calculationExplanation: `Tasa en vivo BCB: ${liveRate.rate.toFixed(4)} Bs/USD`
      };
    }
    const val = Number.isFinite(parsedAmount) ? parsedAmount : 0;
    try {
      return convertAmount(val, fromCurrency, toCurrency, ratesMap);
    } catch (e: any) {
      return {
        result: 0,
        rateApplied: 0,
        calculationExplanation: e.message || 'Error en cálculo'
      };
    }
  }, [parsedAmount, fromCurrency, toCurrency, liveRate]);

  const activeRateMeta = useMemo(() => {
    const pair = OFFICIAL_RATES.find(
      r => (r.baseCurrency === fromCurrency && r.targetCurrency === toCurrency) ||
           (r.baseCurrency === toCurrency && r.targetCurrency === fromCurrency)
    ) || OFFICIAL_RATES[0];
    return pair;
  }, [fromCurrency, toCurrency]);

  const staleness = useMemo(() => {
    return getRateStaleness(activeRateMeta.publishedOn);
  }, [activeRateMeta]);

  const handleCopy = () => {
    const text = `${amount} ${fromCurrency} = ${conversionResult.result} ${toCurrency} (Tasa: ${conversionResult.rateApplied})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none max-w-4xl mx-auto transition-colors duration-200">
      
      {/* Encabezado del Conversor */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Conversor de Divisas Oficial y Comercial
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Cálculos transparentes con cotizaciones del Banco Central de Bolivia y entidades reguladas.
          </p>
        </div>

        {/* Badge de Antigüedad y Trazabilidad */}
        <div className={`px-3 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto ${staleness.badgeClass}`}>
          <Clock className="w-3.5 h-3.5" />
          <span>{staleness.label} ({formatDate(activeRateMeta.publishedOn)})</span>
        </div>
      </div>

      {/* Inputs Principales */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-center my-6">
        
        {/* Cantidad y De */}
        <div className="lg:col-span-3 space-y-2">
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Monto a Convertir
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-lg font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value as CurrencyCode)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de Intercambio (Swap) */}
        <div className="lg:col-span-1 flex justify-center py-2 lg:py-0">
          <button
            onClick={handleSwap}
            className="p-3 rounded-full bg-slate-100 hover:bg-emerald-600 dark:bg-slate-800 dark:hover:bg-emerald-600 text-slate-700 hover:text-white dark:text-slate-300 dark:hover:text-white border border-slate-300 dark:border-slate-700 transition-all shadow-md group"
            title="Invertir monedas"
            aria-label="Invertir monedas"
          >
            <ArrowLeftRight className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        {/* Moneda de Destino y Resultado */}
        <div className="lg:col-span-3 space-y-2">
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Moneda Recibida
          </label>
          <div className="bg-emerald-50/60 dark:bg-slate-950/80 border border-emerald-300 dark:border-emerald-900/50 rounded-xl px-4 py-3 flex items-center justify-between">
            <span className="text-xl sm:text-2xl font-bold text-emerald-700 dark:text-emerald-400 tracking-tight">
              {formatCurrency(conversionResult.result, toCurrency)}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              title="Copiar resultado"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value as CurrencyCode)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Botones de Montos Rápidos */}
      <div className="flex flex-wrap items-center gap-2 pt-2 pb-4">
        <span className="text-xs text-slate-400 dark:text-slate-500 mr-2">Montos rápidos:</span>
        {[10, 50, 100, 500, 1000].map((val) => (
          <button
            key={val}
            onClick={() => setAmount(val.toString())}
            className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
              amount === val.toString()
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
          >
            {val} {fromCurrency}
          </button>
        ))}
      </div>

      {/* Desglose del Cálculo y Trazabilidad de la Tasa */}
      <div className="bg-slate-50 dark:bg-slate-950/60 rounded-xl p-4 border border-slate-200 dark:border-slate-800/80 text-xs space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span><strong>Fórmula aplicada:</strong> {conversionResult.calculationExplanation}</span>
          </div>
          <span className="text-slate-500">
            Tasa efectiva: <strong className="text-slate-800 dark:text-slate-200">1 {fromCurrency} = {roundCurrency(conversionResult.rateApplied, 4)} {toCurrency === 'BOB' ? 'Bs' : toCurrency}</strong>
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-800/50 text-slate-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Fuente: <strong className="text-slate-700 dark:text-slate-300">{activeRateMeta.sourceName}</strong></span>
          </div>
          <a
            href={activeRateMeta.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
          >
            Comprobar fuente oficial ↗
          </a>
        </div>
      </div>

    </div>
  );
};
