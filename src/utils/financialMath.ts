import { ImportCostInput, ImportCostResult, MarginMarkupResult, BreakEvenResult, CurrencyCode } from '../types';

/**
 * Redondeo financiero estándar para evitar errores de precisión IEEE 754
 */
export function roundCurrency(value: number, decimals: number = 2): number {
  if (!Number.isFinite(value)) return 0;
  const factor = Math.pow(10, decimals);
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * Formatea un valor monetario con convenciones visuales bolivianas
 */
export function formatCurrency(value: number, currency: CurrencyCode = 'BOB', decimals: number = 2): string {
  if (!Number.isFinite(value)) return '0,00';
  
  const formattedNumber = new Intl.NumberFormat('es-BO', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  const symbols: Record<CurrencyCode, string> = {
    BOB: 'Bs',
    USD: '$',
    PEN: 'S/',
    ARS: '$arg',
    BRL: 'R$',
    EUR: '€',
    CLP: '$clp',
    UFV: 'UFV'
  };

  const symbol = symbols[currency] || currency;
  return `${symbol} ${formattedNumber}`;
}

/**
 * Conversión de divisa utilizando tasas bidireccionales explícitas
 */
export function convertAmount(
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
  rates: Record<CurrencyCode, { buyRate: number; sellRate: number }>
): {
  result: number;
  rateApplied: number;
  calculationExplanation: string;
} {
  if (amount <= 0 || !Number.isFinite(amount)) {
    return {
      result: 0,
      rateApplied: 0,
      calculationExplanation: 'La cantidad debe ser mayor a cero'
    };
  }

  if (fromCurrency === toCurrency) {
    return {
      result: roundCurrency(amount, 2),
      rateApplied: 1,
      calculationExplanation: `Misma moneda (${fromCurrency}): tasa 1.0`
    };
  }

  // Conversión de moneda extranjera a BOB con el TCO oficial (valor único)
  // Ej: 100 USD * 12,11 = 1.211 BOB
  if (toCurrency === 'BOB' && fromCurrency in rates) {
    const rate = rates[fromCurrency].buyRate;
    const result = roundCurrency(amount * rate, 2);
    return {
      result,
      rateApplied: rate,
      calculationExplanation: `${amount} ${fromCurrency} × ${rate} Bs/unidad = ${result} Bs`
    };
  }

  // Conversión de BOB a moneda extranjera: con el TCO único se usa el mismo valor.
  // Se mantiene `sellRate` por compatibilidad con la interfaz de tasas.
  // Ej: 1.211 BOB / 12,11 = 100 USD
  if (fromCurrency === 'BOB' && toCurrency in rates) {
    const rate = rates[toCurrency].sellRate;
    if (rate <= 0) throw new Error('Tasa de cambio inválida o cero');
    const result = roundCurrency(amount / rate, 2);
    return {
      result,
      rateApplied: rate,
      calculationExplanation: `${amount} Bs ÷ ${rate} Bs/unidad = ${result} ${toCurrency}`
    };
  }

  // Cruce de monedas extranjeras triangulando a través de BOB (Pivote boliviano)
  if (fromCurrency in rates && toCurrency in rates) {
    const fromRate = rates[fromCurrency].buyRate; // TCO de la moneda de origen
    const toRate = rates[toCurrency].sellRate;    // TCO de la moneda de destino
    const inBob = amount * fromRate;
    const result = roundCurrency(inBob / toRate, 2);
    const effectiveCrossRate = roundCurrency(fromRate / toRate, 4);

    return {
      result,
      rateApplied: effectiveCrossRate,
      calculationExplanation: `${amount} ${fromCurrency} convertidos a ${roundCurrency(inBob, 2)} Bs (TCO ${fromRate}), luego convertidos a ${toCurrency} (TCO ${toRate})`
    };
  }

  throw new Error(`No se dispone de cotización para convertir ${fromCurrency} a ${toCurrency}`);
}

/**
 * Calculadora de Costo Total de Importación y Costo Unitario
 */
export function calculateImportCost(input: ImportCostInput): ImportCostResult {
  const {
    purchasePrice,
    quantity,
    currency,
    exchangeRateToBob,
    freightCostBob,
    packagingCostBob,
    customsAndTaxesBob,
    commissionsAndOtherBob
  } = input;

  if (quantity <= 0) {
    throw new Error('La cantidad adquirida debe ser mayor a cero.');
  }

  if (purchasePrice < 0) {
    throw new Error('El precio de compra no puede ser negativo.');
  }

  // Convertir precio de compra a BOB
  const rate = currency === 'BOB' ? 1 : (exchangeRateToBob > 0 ? exchangeRateToBob : 1);
  const totalPurchaseCostBob = roundCurrency(purchasePrice * quantity * rate, 2);

  const totalAdditionalExpensesBob = roundCurrency(
    Math.max(0, freightCostBob) +
    Math.max(0, packagingCostBob) +
    Math.max(0, customsAndTaxesBob) +
    Math.max(0, commissionsAndOtherBob),
    2
  );

  const totalLandedCostBob = roundCurrency(totalPurchaseCostBob + totalAdditionalExpensesBob, 2);
  const unitCostBob = roundCurrency(totalLandedCostBob / quantity, 2);

  // Porcentajes de incidencia
  const breakdown = {
    purchasePercentage: totalLandedCostBob > 0 ? roundCurrency((totalPurchaseCostBob / totalLandedCostBob) * 100, 1) : 0,
    freightPercentage: totalLandedCostBob > 0 ? roundCurrency((freightCostBob / totalLandedCostBob) * 100, 1) : 0,
    customsPercentage: totalLandedCostBob > 0 ? roundCurrency((customsAndTaxesBob / totalLandedCostBob) * 100, 1) : 0,
    otherPercentage: totalLandedCostBob > 0 ? roundCurrency(((packagingCostBob + commissionsAndOtherBob) / totalLandedCostBob) * 100, 1) : 0,
  };

  return {
    totalPurchaseCostBob,
    totalAdditionalExpensesBob,
    totalLandedCostBob,
    unitCostBob,
    breakdown
  };
}

/**
 * Distinción matemática estricta: Margen Bruto vs. Recargo (Markup)
 * 
 * Ganancia Bruta = Precio de Venta - Costo
 * Margen Bruto % = (Ganancia Bruta / Precio de Venta) * 100
 * Recargo (Markup) % = (Ganancia Bruta / Costo) * 100
 */
export function calculateMarginAndMarkup(costPrice: number, sellingPrice: number): MarginMarkupResult {
  if (costPrice < 0 || sellingPrice < 0) {
    throw new Error('Los precios no pueden ser negativos.');
  }

  const grossProfit = roundCurrency(sellingPrice - costPrice, 2);

  const grossMarginPercentage = sellingPrice > 0
    ? roundCurrency((grossProfit / sellingPrice) * 100, 2)
    : 0;

  const markupPercentage = costPrice > 0
    ? roundCurrency((grossProfit / costPrice) * 100, 2)
    : 0;

  return {
    costPrice: roundCurrency(costPrice, 2),
    sellingPrice: roundCurrency(sellingPrice, 2),
    grossProfit,
    grossMarginPercentage,
    markupPercentage
  };
}

/**
 * Calcula el Precio de Venta requerido para un Margen Bruto objetivo
 * Precio = Costo / (1 - (Margen % / 100))
 */
export function calculateSellingPriceFromMargin(costPrice: number, targetMarginPercentage: number): number {
  if (costPrice <= 0) return 0;
  if (targetMarginPercentage >= 100) {
    throw new Error('El margen bruto objetivo no puede ser 100% o superior.');
  }
  if (targetMarginPercentage < 0) {
    throw new Error('El margen no puede ser negativo.');
  }

  const marginDecimal = targetMarginPercentage / 100;
  const sellingPrice = costPrice / (1 - marginDecimal);
  return roundCurrency(sellingPrice, 2);
}

/**
 * Calcula el Precio de Venta requerido para un Recargo (Markup) objetivo
 * Precio = Costo * (1 + (Markup % / 100))
 */
export function calculateSellingPriceFromMarkup(costPrice: number, targetMarkupPercentage: number): number {
  if (costPrice <= 0) return 0;
  if (targetMarkupPercentage < 0) {
    throw new Error('El recargo no puede ser negativo.');
  }

  const markupDecimal = targetMarkupPercentage / 100;
  const sellingPrice = costPrice * (1 + markupDecimal);
  return roundCurrency(sellingPrice, 2);
}

/**
 * Cálculo riguroso de Punto de Equilibrio
 * Unidades de equilibrio = Costos Fijos / (Precio Unitario - Costo Variable Unitario)
 */
export function calculateBreakEven(
  fixedCosts: number,
  unitSellingPrice: number,
  unitVariableCost: number
): BreakEvenResult {
  if (fixedCosts < 0 || unitSellingPrice < 0 || unitVariableCost < 0) {
    throw new Error('Los valores no pueden ser negativos.');
  }

  const unitContributionMargin = roundCurrency(unitSellingPrice - unitVariableCost, 2);
  const contributionMarginRatio = unitSellingPrice > 0
    ? roundCurrency((unitContributionMargin / unitSellingPrice) * 100, 2)
    : 0;

  // Viabilidad comercial: El precio unitario debe superar al costo variable
  if (unitContributionMargin <= 0) {
    return {
      fixedCosts,
      unitSellingPrice,
      unitVariableCost,
      unitContributionMargin,
      contributionMarginRatio,
      breakEvenUnits: 0,
      breakEvenRevenue: 0,
      isFeasible: false,
      warningMessage: unitContributionMargin === 0
        ? 'El precio de venta es igual al costo variable (margen cero). No es posible cubrir los costos fijos.'
        : 'El precio de venta es inferior al costo variable unitario. Cada unidad vendida genera pérdida.'
    };
  }

  const breakEvenUnits = Math.ceil(fixedCosts / unitContributionMargin);
  const breakEvenRevenue = roundCurrency(breakEvenUnits * unitSellingPrice, 2);

  return {
    fixedCosts,
    unitSellingPrice,
    unitVariableCost,
    unitContributionMargin,
    contributionMarginRatio,
    breakEvenUnits,
    breakEvenRevenue,
    isFeasible: true
  };
}
