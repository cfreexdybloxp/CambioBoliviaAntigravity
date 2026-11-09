import { describe, it, expect } from 'vitest';
import {
  OFFICIAL_RATES,
  RATES_MAP,
  RATES_SNAPSHOT,
  getOfficialRate,
} from '../data/officialRates';

/**
 * Estos tests protegen la fuente de verdad de los tipos de cambio oficiales.
 * Si alguien edita `officialRates.ts` a mano sin volver a consultar al BCB, o
 * inventa un par compra/venta que el BCB no publica, aquí se rompe.
 */
describe('Tipos de cambio oficiales del BCB', () => {

  it('debe incluir todas las monedas que la interfaz ofrece', () => {
    const currencies = OFFICIAL_RATES.map(r => r.baseCurrency).sort();
    expect(currencies).toEqual(['ARS', 'BRL', 'CLP', 'EUR', 'PEN', 'UFV', 'USD']);
  });

  it('debe declarar el TCO como valor único, sin compra/venta inventados', () => {
    for (const rate of OFFICIAL_RATES) {
      expect(rate.buyRate).toBe(rate.sellRate);
    }
  });

  it('debe tener valores positivos y finitos', () => {
    for (const rate of OFFICIAL_RATES) {
      expect(Number.isFinite(rate.buyRate)).toBe(true);
      expect(rate.buyRate).toBeGreaterThan(0);
    }
  });

  it('debe marcar cada cotización como verificada en fuente, no como demo', () => {
    for (const rate of OFFICIAL_RATES) {
      expect(rate.verification).toBe('VERIFICADO_FUENTE');
      expect(rate.type).toBe('OFICIAL_BCB');
    }
  });

  it('debe declarar fecha de publicación, fecha de consulta y enlace a la fuente', () => {
    for (const rate of OFFICIAL_RATES) {
      expect(rate.publishedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(rate.retrievedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(rate.sourceUrl).toBe(RATES_SNAPSHOT.sourceUrl);
      expect(rate.sourceTable).toBe(RATES_SNAPSHOT.tableId);
    }
  });

  it('debe apuntar a la tabla de cotizaciones vigente del BCB', () => {
    expect(RATES_SNAPSHOT.sourceUrl).toBe(
      'https://www.bcb.gob.bo/bcb_tco_publico_descargar_csv.php'
    );
    expect(RATES_SNAPSHOT.institution).toContain('Banco Central de Bolivia');
  });

  it('debe conservar los valores publicados el 03/11/2026', () => {
    // Si se actualiza el snapshot, actualizar también estas expectativas
    // junto con `publishedOn` y `retrievedOn`.
    expect(getOfficialRate('USD')?.sellRate).toBe(12.06);
    expect(getOfficialRate('EUR')?.sellRate).toBe(13.12);
    expect(getOfficialRate('PEN')?.sellRate).toBe(3.22);
    expect(getOfficialRate('BRL')?.sellRate).toBe(2.12);
    expect(getOfficialRate('ARS')?.sellRate).toBe(0.0121);
    expect(getOfficialRate('CLP')?.sellRate).toBe(0.0128);
    expect(getOfficialRate('UFV')?.sellRate).toBe(2.58321);
  });

  it('debe derivar RATES_MAP de OFFICIAL_RATES sin duplicar cifras', () => {
    for (const rate of OFFICIAL_RATES) {
      expect(RATES_MAP[rate.baseCurrency].buyRate).toBe(rate.buyRate);
      expect(RATES_MAP[rate.baseCurrency].sellRate).toBe(rate.sellRate);
    }
    expect(RATES_MAP.BOB.buyRate).toBe(1);
    expect(RATES_MAP.BOB.sellRate).toBe(1);
  });

  it('debe devolver undefined para una moneda sin cotización declarada', () => {
    // @ts-expect-error se prueba una moneda fuera del catálogo a propósito
    expect(getOfficialRate('XXX')).toBeUndefined();
  });

});
