import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchLiveBcbRate, LiveRateData, BASELINE_TCO } from '../utils/liveRateService';
import { RATES_MAP } from '../data/officialRates';
import { CurrencyCode, ExchangeRate } from '../types';

interface LiveRateContextType {
  liveRate: LiveRateData;
  isLoading: boolean;
  lastUpdated: Date | null;
  refreshRate: () => Promise<void>;
  getEffectiveRate: (currency: CurrencyCode) => number;
  ratesMap: Record<CurrencyCode, ExchangeRate>;
}

const LiveRateContext = createContext<LiveRateContextType | undefined>(undefined);

export const LiveRateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [liveRate, setLiveRate] = useState<LiveRateData>(() => {
    try {
      const cached = localStorage.getItem('cambio-bolivia-live-tco');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.rate && Number.isFinite(parsed.rate)) {
          return parsed;
        }
      }
    } catch {}
    return BASELINE_TCO;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const refreshRate = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchLiveBcbRate();
      setLiveRate(data);
      setLastUpdated(new Date());
    } catch (e) {
      console.warn('Error al refrescar tasa BCB:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Carga inicial y auto-actualización periódica cada 60 segundos
  useEffect(() => {
    refreshRate();
    const interval = setInterval(refreshRate, 60000);
    return () => clearInterval(interval);
  }, [refreshRate]);

  // Mapa de tasas derivado dinámicamente con el TCO USD en vivo
  const dynamicRatesMap: Record<CurrencyCode, ExchangeRate> = React.useMemo(() => {
    const updatedUsd: ExchangeRate = {
      ...RATES_MAP.USD,
      buyRate: liveRate.rate,
      sellRate: liveRate.rate,
      publishedOn: liveRate.cutoffDate || RATES_MAP.USD.publishedOn,
      retrievedOn: liveRate.validityDate || RATES_MAP.USD.retrievedOn,
      notes: `Tipo de cambio oficial vigente del BCB (${liveRate.isLive ? 'actualizado en tiempo real' : 'referencia oficial'}).`
    };

    return {
      ...RATES_MAP,
      USD: updatedUsd,
    };
  }, [liveRate]);

  const getEffectiveRate = useCallback((currency: CurrencyCode): number => {
    if (currency === 'BOB') return 1;
    if (currency === 'USD') return liveRate.rate;
    return dynamicRatesMap[currency]?.sellRate || 1;
  }, [liveRate, dynamicRatesMap]);

  return (
    <LiveRateContext.Provider
      value={{
        liveRate,
        isLoading,
        lastUpdated,
        refreshRate,
        getEffectiveRate,
        ratesMap: dynamicRatesMap
      }}
    >
      {children}
    </LiveRateContext.Provider>
  );
};

export const useLiveRates = () => {
  const context = useContext(LiveRateContext);
  if (!context) {
    throw new Error('useLiveRates debe utilizarse dentro de un LiveRateProvider');
  }
  return context;
};
