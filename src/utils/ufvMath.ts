import { roundCurrency } from './financialMath';

/**
 * Indexación por UFV (Unidad de Fomento de Vivienda, BCB).
 *
 * Fórmula: monto_actualizado = (monto_original / UFV_inicial) × UFV_final.
 * Es una regla de tres: la cantidad de UFV que representaba el monto se
 * revaloriza al valor de la UFV en la fecha de cierre.
 *
 * Esta utilidad no incluye series históricas. La versión anterior traía una
 * "serie" escrita a mano que no coincidía con las publicaciones del BCB y se
 * retiró. El usuario debe introducir la UFV de la fecha de su contrato,
 * consultándola en la tabla del BCB.
 */
export interface UfvIndexationResult {
  originalAmountBob: number;
  initialUfv: number;
  finalUfv: number;
  updatedAmountBob: number;
  variationPercentage: number;
  purchasingPowerLossPercentage: number;
  ufvQuantity: number;
}

export function calculateUfvIndexation(
  amountBob: number,
  initialUfv: number,
  finalUfv: number
): UfvIndexationResult {
  const safeAmount = Math.max(0, amountBob);
  const safeInitialUfv = Math.max(0.00001, initialUfv);
  const safeFinalUfv = Math.max(0.00001, finalUfv);

  const ufvQuantity = safeAmount / safeInitialUfv;
  const updatedAmountBob = roundCurrency(ufvQuantity * safeFinalUfv, 2);

  const variationPercentage = roundCurrency(
    ((safeFinalUfv - safeInitialUfv) / safeInitialUfv) * 100,
    2
  );

  // Pérdida relativa del poder adquisitivo si no se hubiese indexado
  const purchasingPowerLossPercentage = roundCurrency(
    (1 - (safeInitialUfv / safeFinalUfv)) * 100,
    2
  );

  return {
    originalAmountBob: safeAmount,
    initialUfv: safeInitialUfv,
    finalUfv: safeFinalUfv,
    updatedAmountBob,
    variationPercentage,
    purchasingPowerLossPercentage,
    ufvQuantity: roundCurrency(ufvQuantity, 4)
  };
}
