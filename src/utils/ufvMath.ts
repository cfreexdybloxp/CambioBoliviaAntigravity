import { roundCurrency } from './financialMath';

export interface UfvHistoricalPoint {
  year: number;
  label: string;
  ufvValue: number;
}

export const UFV_HISTORICAL_SERIES: UfvHistoricalPoint[] = [
  { year: 2001, label: 'Inicio UFV (D.S. 26390)', ufvValue: 1.00000 },
  { year: 2005, label: 'Diciembre 2005', ufvValue: 1.11582 },
  { year: 2010, label: 'Diciembre 2010', ufvValue: 1.54728 },
  { year: 2015, label: 'Diciembre 2015', ufvValue: 2.09638 },
  { year: 2020, label: 'Diciembre 2020', ufvValue: 2.35852 },
  { year: 2023, label: 'Diciembre 2023', ufvValue: 2.47814 },
  { year: 2024, label: 'Diciembre 2024', ufvValue: 2.52410 },
  { year: 2025, label: 'Diciembre 2025', ufvValue: 2.55980 },
  { year: 2026, label: 'Vigente (Octubre 2026)', ufvValue: 2.58312 }
];

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
  finalUfv: number = 2.58312
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
  // Factor = (1 - (Inicial / Final)) * 100
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
