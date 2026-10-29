export type CurrencyCode = 'BOB' | 'USD' | 'PEN' | 'ARS' | 'BRL' | 'EUR' | 'CLP' | 'UFV';

export type RateType = 
  | 'OFICIAL_BCB'              // Publicado formalmente por el Banco Central de Bolivia
  | 'REFERENCIAL_COMERCIAL'   // Casas de cambio autorizadas / entidades financieras
  | 'PARALELO_INFORMATIVO';   // Referencia de mercado no regulado (con advertencia de volatilidad)

export interface ExchangeRate {
  id: string;
  baseCurrency: CurrencyCode;
  targetCurrency: CurrencyCode;
  buyRate: number;            // Precio al que la entidad compra la divisa
  sellRate: number;           // Precio al que la entidad vende la divisa
  type: RateType;
  sourceName: string;
  sourceUrl: string;
  effectiveDate: string;      // YYYY-MM-DD
  retrievedAt: string;        // ISO timestamp
  isVerified: boolean;
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
  isVerified: boolean;
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
  isLegalAndCompliant: boolean; // Cumple estrictamente con normativas (DS 28761)
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

