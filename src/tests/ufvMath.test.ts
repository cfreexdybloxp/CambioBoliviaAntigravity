import { describe, it, expect } from 'vitest';
import { calculateUfvIndexation } from '../utils/ufvMath';

/**
 * La UFV final usada en estos tests es la publicada por el BCB el 30/10/2026
 * (3,36581 Bs por UFV). Los valores iniciales son ejemplos de contrato: el
 * usuario debe introducir los de su propia fecha.
 */
describe('Cálculos de Indexación UFV y Poder Adquisitivo', () => {

  it('debe indexar un monto desde el inicio de la UFV (año 2001, valor 1.0)', () => {
    // 10.000 Bs con UFV inicial 1,00000 y UFV final 3,36581
    // Cantidad UFV = 10.000 UFV
    // Monto actualizado = 10.000 * 3,36581 = 33.658,10 Bs
    // Variación = ((3,36581 - 1) / 1) * 100 = 236,58%
    const result = calculateUfvIndexation(10000, 1.00000, 3.36581);
    expect(result.updatedAmountBob).toBe(33658.10);
    expect(result.variationPercentage).toBe(236.58);
    expect(result.ufvQuantity).toBe(10000);
  });

  it('debe calcular correctamente la indexación desde un valor intermedio', () => {
    // 50.000 Bs con UFV inicial 2,09638 y UFV final 3,36581
    // Cantidad UFV = 50.000 / 2,09638 = 23.850,6378
    // Monto actualizado = 23.850,6378 * 3,36581 = 80.276,72 Bs
    const result = calculateUfvIndexation(50000, 2.09638, 3.36581);
    expect(result.updatedAmountBob).toBe(80276.72);
    expect(result.variationPercentage).toBe(60.55);
  });

  it('debe manejar montos en cero retornando cero sin errores', () => {
    const result = calculateUfvIndexation(0, 2.09638, 3.36581);
    expect(result.updatedAmountBob).toBe(0);
    expect(result.ufvQuantity).toBe(0);
  });

  it('debe calcular la pérdida relativa del poder adquisitivo no indexado', () => {
    const result = calculateUfvIndexation(1000, 1.0, 2.0);
    // Factor = (1 - 1/2) * 100 = 50%
    expect(result.purchasingPowerLossPercentage).toBe(50);
  });

});
