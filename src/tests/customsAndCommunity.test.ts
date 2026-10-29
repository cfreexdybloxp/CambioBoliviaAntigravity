import { describe, it, expect } from 'vitest';
import { calculateBolivianCustoms } from '../utils/customsTariff';
import { validateReportInput } from '../utils/communityReports';

describe('Cálculos Aduaneros y Validación Comunitaria', () => {

  describe('calculateBolivianCustoms (Gravamen Arancelario e IVA Aduanero)', () => {
    it('debe calcular correctamente el GA (0%) e IVA (14.94%) para bienes de capital', () => {
      // CIF = 10,000 Bs
      // GA = 0% -> 0 Bs
      // Base IVA = 10,000 Bs -> IVA 14.94% = 1,494 Bs
      // Gastos agencia = 350 Bs
      // Total tributos = 1,844 Bs
      // Costo total nacionalizado = 11,844 Bs
      const result = calculateBolivianCustoms(10000, 'capital_goods', 350);
      expect(result.isProhibited).toBe(false);
      expect(result.gaAmountBob).toBe(0);
      expect(result.ivaAmountBob).toBe(1494);
      expect(result.totalTaxesAndDutiesBob).toBe(1844);
      expect(result.totalNationalizedCostBob).toBe(11844);
    });

    it('debe calcular arancel del 20% para confección textil nueva', () => {
      // CIF = 5,000 Bs
      // GA = 20% -> 1,000 Bs
      // Base IVA = 6,000 Bs -> IVA 14.94% = 896.40 Bs
      const result = calculateBolivianCustoms(5000, 'finished_textiles_new', 0);
      expect(result.gaPercentage).toBe(20);
      expect(result.gaAmountBob).toBe(1000);
      expect(result.ivaAmountBob).toBe(896.40);
    });

    it('debe bloquear terminantemente la importación de ropa usada por Decreto Supremo 28761', () => {
      const result = calculateBolivianCustoms(5000, 'used_clothing_prohibited');
      expect(result.isProhibited).toBe(true);
      expect(result.prohibitionMessage).toContain('Decreto Supremo Nº 28761');
      expect(result.totalNationalizedCostBob).toBe(0);
    });
  });

  describe('validateReportInput (Control de Calidad Ciudadano)', () => {
    it('debe validar un reporte consistente', () => {
      const result = validateReportInput({
        establishmentName: 'Casa de Cambio Central',
        city: 'La Paz',
        currency: 'USD',
        buyRate: 12.08,
        sellRate: 12.14
      });
      expect(result.isValid).toBe(true);
    });

    it('debe rechazar si el precio de compra es mayor al precio de venta', () => {
      const result = validateReportInput({
        establishmentName: 'Cambios Illimani',
        city: 'La Paz',
        currency: 'USD',
        buyRate: 12.50,
        sellRate: 12.00
      });
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('precio de compra no puede ser mayor');
    });

    it('debe rechazar valores absurdos o maliciosos fuera de rango', () => {
      const result = validateReportInput({
        establishmentName: 'Cambios Ficticios',
        city: 'Oruro',
        currency: 'USD',
        buyRate: 100, // Insano para el mercado boliviano
        sellRate: 110
      });
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('fuera de los rangos de coherencia');
    });
  });

});
