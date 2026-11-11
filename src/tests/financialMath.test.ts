import { describe, it, expect } from 'vitest';
import {
  roundCurrency,
  convertAmount,
  calculateImportCost,
  calculateMarginAndMarkup,
  calculateSellingPriceFromMargin,
  calculateSellingPriceFromMarkup,
  calculateBreakEven,
  formatCurrency
} from '../utils/financialMath';
import { RATES_MAP } from '../data/officialRates';

describe('Motor Matemático Financiero — CotizaBO', () => {

  describe('roundCurrency & formatCurrency', () => {
    it('debe redondear correctamente evitando fallos de coma flotante', () => {
      expect(roundCurrency(0.1 + 0.2)).toBe(0.3);
      expect(roundCurrency(12.125, 2)).toBe(12.13);
      expect(roundCurrency(12.124, 2)).toBe(12.12);
    });

    it('debe manejar entradas inválidas o infinitas retornando 0', () => {
      expect(roundCurrency(NaN)).toBe(0);
      expect(roundCurrency(Infinity)).toBe(0);
    });

    it('debe formatear monedas con símbolos y separadores bolivianos', () => {
      const formatted = formatCurrency(1234.56, 'BOB');
      expect(formatted).toContain('Bs');
      expect(formatted).toContain('1.234,56');
    });
  });

  describe('convertAmount (Conversor de Divisas)', () => {
    it('debe convertir BOB a USD correctamente dividiendo entre el TCO oficial', () => {
      // TCO del USD publicado por el BCB (corte vigente 10/11/2026): 11,71 Bs por USD
      // 1171 Bs / 11,71 = 100 USD
      const result = convertAmount(1171, 'BOB', 'USD', RATES_MAP);
      expect(result.result).toBe(100);
      expect(result.rateApplied).toBe(11.71);
    });

    it('debe convertir USD a BOB multiplicando por el TCO oficial', () => {
      // 50 USD * 11,71 Bs = 585,50 Bs
      const result = convertAmount(50, 'USD', 'BOB', RATES_MAP);
      expect(result.result).toBe(585.5);
      expect(result.rateApplied).toBe(11.71);
    });

    it('debe manejar conversión de misma moneda (BOB a BOB)', () => {
      const result = convertAmount(500, 'BOB', 'BOB', RATES_MAP);
      expect(result.result).toBe(500);
      expect(result.rateApplied).toBe(1);
    });

    it('debe realizar triangulación cruzada documentada entre monedas extranjeras', () => {
      // EUR a USD vía BOB pivote
      const result = convertAmount(100, 'EUR', 'USD', RATES_MAP);
      expect(result.result).toBeGreaterThan(0);
      expect(result.calculationExplanation).toContain('convertidos');
    });

    it('debe retornar 0 y mensaje de advertencia si la cantidad es <= 0', () => {
      const result = convertAmount(0, 'USD', 'BOB', RATES_MAP);
      expect(result.result).toBe(0);
      expect(result.rateApplied).toBe(0);
    });
  });

  describe('calculateImportCost (Calculadora de Costos Comerciales)', () => {
    it('debe calcular correctamente el costo total y unitario de un lote', () => {
      // 100 unidades a $10 USD c/u (con tasa de cambio de 12.00 Bs/USD = 12,000 Bs compra)
      // Flete = 1,000 Bs, Embalaje = 200 Bs, Aduana = 1,500 Bs, Otros = 300 Bs
      // Total gastos adicionales = 3,000 Bs
      // Costo total = 15,000 Bs
      // Costo unitario = 15,000 / 100 = 150 Bs
      const result = calculateImportCost({
        purchasePrice: 10,
        quantity: 100,
        currency: 'USD',
        exchangeRateToBob: 12.00,
        freightCostBob: 1000,
        packagingCostBob: 200,
        customsAndTaxesBob: 1500,
        commissionsAndOtherBob: 300
      });

      expect(result.totalPurchaseCostBob).toBe(12000);
      expect(result.totalAdditionalExpensesBob).toBe(3000);
      expect(result.totalLandedCostBob).toBe(15000);
      expect(result.unitCostBob).toBe(150);
      expect(result.breakdown.purchasePercentage).toBe(80);
    });

    it('debe arrojar error si la cantidad es 0 o negativa', () => {
      expect(() => calculateImportCost({
        purchasePrice: 50,
        quantity: 0,
        currency: 'BOB',
        exchangeRateToBob: 1,
        freightCostBob: 0,
        packagingCostBob: 0,
        customsAndTaxesBob: 0,
        commissionsAndOtherBob: 0
      })).toThrowError('La cantidad adquirida debe ser mayor a cero.');
    });
  });

  describe('calculateMarginAndMarkup (Margen vs Recargo)', () => {
    it('debe distinguir rigurosamente margen bruto vs recargo (markup)', () => {
      // Costo: 100 Bs, Venta: 150 Bs -> Ganancia: 50 Bs
      // Margen Bruto: 50 / 150 = 33.33%
      // Recargo (Markup): 50 / 100 = 50.00%
      const result = calculateMarginAndMarkup(100, 150);
      expect(result.grossProfit).toBe(50);
      expect(result.grossMarginPercentage).toBe(33.33);
      expect(result.markupPercentage).toBe(50);
    });

    it('debe calcular el precio de venta a partir de un margen objetivo', () => {
      // Costo 100 Bs y margen objetivo 25% -> Precio = 100 / (1 - 0.25) = 133.33 Bs
      const price = calculateSellingPriceFromMargin(100, 25);
      expect(price).toBe(133.33);
    });

    it('debe calcular el precio de venta a partir de un markup objetivo', () => {
      // Costo 100 Bs y markup 50% -> Precio = 100 * 1.50 = 150 Bs
      const price = calculateSellingPriceFromMarkup(100, 50);
      expect(price).toBe(150);
    });

    it('debe evitar márgenes imposibles (>= 100%)', () => {
      expect(() => calculateSellingPriceFromMargin(100, 100)).toThrow();
    });
  });

  describe('calculateBreakEven (Punto de Equilibrio)', () => {
    it('debe calcular las unidades y facturación de equilibrio en un caso comercial viable', () => {
      // Costos fijos: 10,000 Bs
      // Precio unitario: 50 Bs
      // Costo variable unitario: 30 Bs
      // Margen contribución unitario: 20 Bs
      // Unidades: 10,000 / 20 = 500 unidades
      // Facturación: 500 * 50 = 25,000 Bs
      const result = calculateBreakEven(10000, 50, 30);
      expect(result.isFeasible).toBe(true);
      expect(result.unitContributionMargin).toBe(20);
      expect(result.breakEvenUnits).toBe(500);
      expect(result.breakEvenRevenue).toBe(25000);
    });

    it('debe advertir inviabilidad si el precio no supera el costo variable', () => {
      const result = calculateBreakEven(5000, 20, 25);
      expect(result.isFeasible).toBe(false);
      expect(result.breakEvenUnits).toBe(0);
      expect(result.warningMessage).toBeDefined();
    });
  });

});
