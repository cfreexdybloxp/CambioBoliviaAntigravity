import { ExchangeRate, CurrencyCode } from '../types';

/**
 * Fotografía verificada de la "Tabla de Cotizaciones" del Banco Central de Bolivia.
 *
 * Fuente: https://www.bcb.gob.bo/librerias/indicadores/otras/ultimo.php
 *         (Tabla de Cotizaciones Nº 204-26, publicada el 30/10/2026)
 * Consulta manual: 30/10/2026.
 *
 * IMPORTANTE:
 * - El BCB publica un único Tipo de Cambio Oficial (TCO) por jornada; NO publica
 *   precios de compra y venta. Por eso `buyRate` y `sellRate` son idénticos en
 *   todas las entradas de este archivo.
 * - Estos valores son una fotografía estática. Si la fecha de `publishedOn` deja
 *   de ser reciente, la interfaz debe mostrar la antigüedad y no afirmar que el
 *   dato está "vigente".
 * - No editar a mano sin volver a consultar la fuente y actualizar también
 *   `publishedOn` y `retrievedOn`.
 */
export const RATES_SNAPSHOT = {
  institution: 'Banco Central de Bolivia (BCB)',
  tableId: 'Tabla de Cotizaciones Nº 204-26',
  publishedOn: '2026-10-30',
  retrievedOn: '2026-10-30',
  sourceUrl: 'https://www.bcb.gob.bo/librerias/indicadores/otras/ultimo.php',
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
    // TCO único: el BCB no distingue compra/venta.
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
    12.11,
    'Tipo de Cambio Oficial (TCO) del dólar estadounidense, en bolivianos por USD.'
  ),
  officialRate(
    'eur-bcb-official',
    'EUR',
    13.52559,
    'Cotización oficial del euro: bolivianos por unidad de moneda extranjera.'
  ),
  officialRate(
    'pen-bcb-official',
    'PEN',
    3.50071,
    'Cotización oficial del sol peruano: bolivianos por unidad de moneda extranjera.'
  ),
  officialRate(
    'brl-bcb-official',
    'BRL',
    2.23518,
    'Cotización oficial del real brasileño: bolivianos por unidad de moneda extranjera.'
  ),
  officialRate(
    'ars-bcb-official',
    'ARS',
    0.00787,
    'Cotización oficial del peso argentino: bolivianos por unidad de moneda extranjera.'
  ),
  officialRate(
    'clp-bcb-official',
    'CLP',
    0.01222,
    'Cotización oficial del peso chileno: bolivianos por unidad de moneda extranjera.'
  ),
  officialRate(
    'ufv-bcb-official',
    'UFV',
    3.36581,
    'Unidad de Fomento de Vivienda (UFV): bolivianos por UFV, publicada en la misma tabla diaria.'
  ),
];

/**
 * Mapa de tasas usado por el conversor. Se deriva de OFFICIAL_RATES para que
 * exista una sola fuente de verdad y no haya cifras duplicadas que se desincronicen.
 */
export const RATES_MAP: Record<CurrencyCode, { buyRate: number; sellRate: number; name: string }> = (() => {
  const names: Record<CurrencyCode, string> = {
    BOB: 'Boliviano',
    USD: 'Dólar Estadounidense',
    EUR: 'Euro',
    PEN: 'Sol Peruano',
    BRL: 'Real Brasileño',
    ARS: 'Peso Argentino',
    CLP: 'Peso Chileno',
    UFV: 'Unidad de Fomento de Vivienda',
  };

  const map = {
    BOB: { buyRate: 1, sellRate: 1, name: names.BOB },
  } as Record<CurrencyCode, { buyRate: number; sellRate: number; name: string }>;

  for (const rate of OFFICIAL_RATES) {
    map[rate.baseCurrency] = {
      buyRate: rate.buyRate,
      sellRate: rate.sellRate,
      name: names[rate.baseCurrency],
    };
  }

  return map;
})();

/** Devuelve el TCO de una moneda, o undefined si no consta en la fuente. */
export function getOfficialRate(currency: CurrencyCode): ExchangeRate | undefined {
  return OFFICIAL_RATES.find(rate => rate.baseCurrency === currency);
}
