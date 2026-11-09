import { ExchangeRate, CurrencyCode } from '../types';

/**
 * Fotografía verificada del Tipo de Cambio Oficial (TCO) del Banco Central de Bolivia.
 *
 * Fuente: https://www.bcb.gob.bo/bcb_tco_publico_descargar_csv.php
 *         (Boletín Oficial TCO, Fecha de corte: 03/11/2026 - Vigencia: 04/11/2026)
 *
 * IMPORTANTE:
 * - El BCB publica un único Tipo de Cambio Oficial (TCO) por jornada; NO publica
 *   precios de compra y venta. Por eso `buyRate` y `sellRate` son idénticos.
 * - Este valor base se auto-actualiza en tiempo real mediante la Cloudflare Pages
 *   Function en `/api/rate` y los proxies CORS de contingencia.
 */
export const RATES_SNAPSHOT = {
  institution: 'Banco Central de Bolivia (BCB)',
  tableId: 'Boletín Diario TCO BCB',
  publishedOn: '2026-11-06',
  retrievedOn: '2026-11-09',
  sourceUrl: 'https://www.bcb.gob.bo/bcb_tco_publico_descargar_csv.php',
  humanUrl: 'https://www.bcb.gob.bo/?q=cotizaciones_tc',
} as const;

function officialRate(
  id: string,
  currency: CurrencyCode,
  value: number,
  notes: string
): ExchangeRate {
  return {
    id,
    baseCurrency: currency,
    targetCurrency: 'BOB',
    buyRate: value,
    sellRate: value,
    type: 'OFICIAL_BCB',
    sourceName: RATES_SNAPSHOT.institution,
    sourceUrl: RATES_SNAPSHOT.sourceUrl,
    sourceTable: RATES_SNAPSHOT.tableId,
    publishedOn: RATES_SNAPSHOT.publishedOn,
    retrievedOn: RATES_SNAPSHOT.retrievedOn,
    verification: 'VERIFICADO_FUENTE',
    notes,
  };
}

export const OFFICIAL_RATES: ExchangeRate[] = [
  officialRate(
    'usd-bcb-official',
    'USD',
    11.81,
    'Tipo de Cambio Oficial (TCO) ponderado del dólar estadounidense publicado por el BCB, en bolivianos por USD.'
  ),
  officialRate(
    'eur-bcb-official',
    'EUR',
    13.12,
    'Tipo de cambio oficial del Euro publicado en la Tabla de Cotizaciones del BCB.'
  ),
  officialRate(
    'pen-bcb-official',
    'PEN',
    3.22,
    'Tipo de cambio oficial del Sol Peruano publicado por el BCB.'
  ),
  officialRate(
    'brl-bcb-official',
    'BRL',
    2.12,
    'Tipo de cambio oficial del Real Brasileño publicado por el BCB.'
  ),
  officialRate(
    'ars-bcb-official',
    'ARS',
    0.0121,
    'Tipo de cambio oficial del Peso Argentino publicado por el BCB.'
  ),
  officialRate(
    'clp-bcb-official',
    'CLP',
    0.0128,
    'Tipo de cambio oficial del Peso Chileno publicado por el BCB.'
  ),
  officialRate(
    'ufv-bcb-official',
    'UFV',
    2.58321,
    'Unidad de Fomento de Vivienda (UFV) publicada por el BCB para indexación.'
  ),
];

export const RATES_MAP: Record<CurrencyCode, ExchangeRate> = {
  BOB: {
    id: 'bob-base',
    baseCurrency: 'BOB',
    targetCurrency: 'BOB',
    buyRate: 1,
    sellRate: 1,
    type: 'OFICIAL_BCB',
    sourceName: 'Moneda nacional (Ley 901)',
    sourceUrl: 'https://www.bcb.gob.bo/',
    publishedOn: RATES_SNAPSHOT.publishedOn,
    retrievedOn: RATES_SNAPSHOT.retrievedOn,
    verification: 'VERIFICADO_FUENTE',
    notes: 'Unidad monetaria del Estado Plurinacional de Bolivia.',
  },
  USD: OFFICIAL_RATES[0],
  EUR: OFFICIAL_RATES[1],
  PEN: OFFICIAL_RATES[2],
  BRL: OFFICIAL_RATES[3],
  ARS: OFFICIAL_RATES[4],
  CLP: OFFICIAL_RATES[5],
  UFV: OFFICIAL_RATES[6],
};

export function getOfficialRate(currency: CurrencyCode): ExchangeRate | undefined {
  return OFFICIAL_RATES.find(r => r.baseCurrency === currency);
}
