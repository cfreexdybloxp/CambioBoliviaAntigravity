export type CurrencyCode = 'BOB' | 'USD' | 'PEN' | 'ARS' | 'BRL' | 'EUR' | 'CLP' | 'UFV';

export type RateType = 
  | 'OFICIAL_BCB'              // Publicado formalmente por el Banco Central de Bolivia
  | 'REFERENCIAL_COMERCIAL'   // Casas de cambio autorizadas / entidades financieras
  | 'PARALELO_INFORMATIVO';   // Referencia de mercado no regulado (con advertencia de volatilidad)

/**
 * Nivel de comprobación de un dato. No son equivalentes:
 * - VERIFICADO_FUENTE: el valor se leyó de la fuente citada en la fecha indicada.
 * - NO_VERIFICADO: no consta una fuente comprobable. No debe presentarse como oficial.
 * - DEMO: dato de ejemplo para probar la interfaz. No sirve para operar.
 */
export type VerificationLevel = 'VERIFICADO_FUENTE' | 'NO_VERIFICADO' | 'DEMO';

export interface ExchangeRate {
  id: string;
  baseCurrency: CurrencyCode;
  targetCurrency: CurrencyCode;
  /**
   * El BCB publica un único Tipo de Cambio Oficial (TCO) por jornada, no un par
   * compra/venta. Para las cotizaciones oficiales ambos campos son iguales y
   * solo existen por compatibilidad con la interfaz del conversor.
   */
  buyRate: number;
  sellRate: number;
  type: RateType;
  sourceName: string;
  sourceUrl: string;
  sourceTable?: string;       // Identificación de la tabla/boletín de la fuente
  publishedOn: string;        // YYYY-MM-DD que declara la fuente
  retrievedOn: string;        // YYYY-MM-DD en que se consultó la fuente
  verification: VerificationLevel;
  notes?: string;
}

export interface ExchangeHouse {
  id: string;
  commercialName: string;
  legalName: string;
  asfiLicense: string;        // Código o número de registro ASFI
  department: 'La Paz' | 'Santa Cruz' | 'Cochabamba' | 'Oruro' | 'Potosí' | 'Tarija' | 'Chuquisaca' | 'Beni' | 'Pando';
  city: string;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  schedule: string;
  verification: VerificationLevel;
  publishedRates: {
    usdBuy?: number;
    usdSell?: number;
    penBuy?: number;
    penSell?: number;
    arsBuy?: number;
    arsSell?: number;
    brlBuy?: number;
    brlSell?: number;
    eurBuy?: number;
    eurSell?: number;
    clpBuy?: number;
    clpSell?: number;
  };
  lastVerifiedDate: string;
  source: string;
}

export interface ImportCostInput {
  purchasePrice: number;
  quantity: number;
  currency: CurrencyCode;
  exchangeRateToBob: number;
  freightCostBob: number;
  packagingCostBob: number;
  customsAndTaxesBob: number;  // Tributos aduaneros verificados (IVA/GA)
  commissionsAndOtherBob: number;
}

export interface ImportCostResult {
  totalPurchaseCostBob: number;
  totalAdditionalExpensesBob: number;
  totalLandedCostBob: number;
  unitCostBob: number;
  breakdown: {
    purchasePercentage: number;
    freightPercentage: number;
    customsPercentage: number;
    otherPercentage: number;
  };
}

export interface MarginMarkupResult {
  costPrice: number;
  sellingPrice: number;
  grossProfit: number;
  grossMarginPercentage: number;  // Ganancia / Precio de Venta
  markupPercentage: number;       // Ganancia / Costo
}

export interface BreakEvenResult {
  fixedCosts: number;
  unitSellingPrice: number;
  unitVariableCost: number;
  unitContributionMargin: number;
  contributionMarginRatio: number;
  breakEvenUnits: number;
  breakEvenRevenue: number;
  isFeasible: boolean;
  warningMessage?: string;
}

export interface Supplier {
  id: string;
  name: string;
  category: 'Textiles e Indumentaria Nueva' | 'Calzado y Cuero Nacional' | 'Artesanía y Confección' | 'Ferretería y Herramientas' | 'Tecnología y Accesorios';
  city: string;
  department: string;
  address: string;
  productDescription: string;
  minOrder: string;
  priceRange: string;
  phone: string;
  nitOrRegistry: string;
  /** Cumple estrictamente con normativas (DS 28761) — solo si fue comprobado. */
  verification: VerificationLevel;
  verificationSource: string;
  verifiedDate: string;
}

export interface EducationalGuide {
  id: string;
  slug: string;
  title: string;
  category: 'Divisas' | 'Comercio e Importación' | 'Finanzas y Costos' | 'Normativa';
  readingTimeMinutes: number;
  summary: string;
  sourceReference: string;
  content: string; // Markdown or structured text
  keyTakeaways: string[];
}

export type ReportStatus = 'PENDIENTE_REVISION' | 'VERIFICADO_PUBLICADO' | 'RECHAZADO';

export interface CommunityRateReport {
  id: string;
  establishmentName: string;
  city: string;
  currency: CurrencyCode;
  buyRate: number;
  sellRate: number;
  declaredSource: 'Ventanilla física / Pizarra' | 'Comprobante de compra' | 'Sitio web oficial' | 'Consulta telefónica';
  reportedAt: string;
  status: ReportStatus;
  rejectionReason?: string;
  notes?: string;
}

