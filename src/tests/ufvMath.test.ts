import { describe, it, expect } from 'vitest';
import { calculateUfvIndexation } from '../utils/ufvMath';

describe('Cálculos de Indexación UFV y Poder Adquisitivo', () => {

  it('debe indexar un monto desde el inicio de la UFV (año 2001, valor 1.0)', () => {
    // 10,000 Bs con UFV inicial 1.00000 y UFV final 2.58312
    // Cantidad UFV = 10,000 UFV
    // Monto actualizado = 10,000 * 2.58312 = 25,831.20 Bs
    // Variación = ((2.58312 - 1) / 1) * 100 = 158.31%
    const result = calculateUfvIndexation(10000, 1.00000, 2.58312);
    expect(result.updatedAmountBob).toBe(25831.20);
    expect(result.variationPercentage).toBe(158.31);
    expect(result.ufvQuantity).toBe(10000);
  });

  it('debe calcular correctamente la indexación desde el año 2015', () => {
    // 50,000 Bs con UFV inicial 2.09638 y UFV final 2.58312
    // Cantidad UFV = 50,000 / 2.09638 = 23,850.63776
    // Monto actualizado = 23,850.63776 * 2.58312 = 61,609.06 Bs
    const result = calculateUfvIndexation(50000, 2.09638, 2.58312);
    expect(result.updatedAmountBob).toBe(61609.06);
    expect(result.variationPercentage).toBeGreaterThan(20);
  });

  it('debe manejar montos en cero retornando cero sin errores', () => {
    const result = calculateUfvIndexation(0, 2.09638, 2.58312);
    expect(result.updatedAmountBob).toBe(0);
    expect(result.ufvQuantity).toBe(0);
  });

  it('debe calcular la pérdida relativa del poder adquisitivo no indexado', () => {
    const result = calculateUfvIndexation(1000, 1.0, 2.0);
    // Factor = (1 - 1/2) * 100 = 50%
    expect(result.purchasingPowerLossPercentage).toBe(50);
  });

});
