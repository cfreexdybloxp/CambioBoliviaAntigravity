import { roundCurrency } from './financialMath';

export interface TariffCategory {
  id: string;
  name: string;
  gaRatePercentage: number;
  isProhibited: boolean;
  legalNote: string;
  typicalItems: string;
}

export const BOLIVIAN_TARIFF_CATEGORIES: TariffCategory[] = [
  {
    id: 'capital_goods',
    name: 'Bienes de Capital y Maquinaria Industrial',
    gaRatePercentage: 0,
    isProhibited: false,
    legalNote: 'Exención de GA bajo políticas de incentivo a la industrialización nacional.',
    typicalItems: 'Torno, máquinas de coser industriales, motores, maquinaria agrícola.'
  },
  {
    id: 'raw_materials',
    name: 'Materias Primas e Insumos Textiles',
    gaRatePercentage: 5,
    isProhibited: false,
    legalNote: 'Arancel preferencial para insumos no producidos en el país.',
    typicalItems: 'Hilos de algodón crudo, telas vírgenes, tinturas, cremalleras por mayor.'
  },
  {
    id: 'semi_finished',
    name: 'Productos Semielaborados y Ferretería',
    gaRatePercentage: 10,
    isProhibited: false,
    legalNote: 'Gravamen arancelario estándar para herramientas y repuestos.',
    typicalItems: 'Discos de corte, pernos, herramientas manuales, componentes eléctricos.'
  },
  {
    id: 'finished_textiles_new',
    name: 'Confección Textil e Indumentaria NUEVA',
    gaRatePercentage: 20,
    isProhibited: false,
    legalNote: 'Arancel formal para importación legal de prendas terminadas nuevas con etiqueta de origen.',
    typicalItems: 'Poleras nuevas, camisas con etiqueta de fábrica, pantalones nuevos.'
  },
  {
    id: 'finished_footwear',
    name: 'Calzado Terminado y Manufacturas de Cuero',
    gaRatePercentage: 40,
    isProhibited: false,
    legalNote: 'Tasa máxima de protección arancelaria para defender a la industria del cuero nacional.',
    typicalItems: 'Zapatos de vestir importados, zapatillas deportivas terminadas.'
  },
  {
    id: 'used_clothing_prohibited',
    name: 'Ropa Usada / Prendería de Segunda Mano (PROHIBIDO)',
    gaRatePercentage: 0,
    isProhibited: true,
    legalNote: 'PROHIBICIÓN TERMINANTE según Decreto Supremo Nº 28761 y Ley General de Aduanas Nº 1990. Mercancía ilícita sujeta a decomiso inmediato y proceso penal por contrabando.',
    typicalItems: 'Fardos de ropa usada, calzado usado, retazos viejos.'
  }
];

export interface CustomsCalculationResult {
  cifValueBob: number;
  gaPercentage: number;
  gaAmountBob: number;
  ivaEffectivePercentage: number; // 14.94%
  ivaAmountBob: number;
  customsAgencyAndWarehouseBob: number; // Tasa de almacén / Despacho aduanero estimado
  totalTaxesAndDutiesBob: number;
  totalNationalizedCostBob: number;
  isProhibited: boolean;
  prohibitionMessage?: string;
}

export function calculateBolivianCustoms(
  cifValueBob: number,
  categoryId: string,
  customsAgencyFeesBob: number = 350
): CustomsCalculationResult {
  const category = BOLIVIAN_TARIFF_CATEGORIES.find(c => c.id === categoryId) || BOLIVIAN_TARIFF_CATEGORIES[2];

  if (category.isProhibited) {
    return {
      cifValueBob,
      gaPercentage: 0,
      gaAmountBob: 0,
      ivaEffectivePercentage: 0,
      ivaAmountBob: 0,
      customsAgencyAndWarehouseBob: 0,
      totalTaxesAndDutiesBob: 0,
      totalNationalizedCostBob: 0,
      isProhibited: true,
      prohibitionMessage: 'OPERACIÓN PROHIBIDA: El Decreto Supremo Nº 28761 prohíbe de forma definitiva la importación y comercialización de prendería usada. No existe tributo aduanero aplicable para legalizar esta mercancía. Su internación constituye delito aduanero de contrabando.'
    };
  }

  const safeCif = Math.max(0, cifValueBob);
  const gaRate = category.gaRatePercentage / 100;
  const gaAmountBob = roundCurrency(safeCif * gaRate, 2);

  // La base imponible para el IVA de importación es CIF + GA + Otras erogaciones aduaneras
  const ivaBaseImponible = safeCif + gaAmountBob;
  // Alícuota efectiva del IVA importaciones en Bolivia es 14.94% (13% / (1 - 0.13))
  const ivaEffectiveRate = 0.1494;
  const ivaAmountBob = roundCurrency(ivaBaseImponible * ivaEffectiveRate, 2);

  const safeFees = Math.max(0, customsAgencyFeesBob);
  const totalTaxesAndDutiesBob = roundCurrency(gaAmountBob + ivaAmountBob + safeFees, 2);
  const totalNationalizedCostBob = roundCurrency(safeCif + totalTaxesAndDutiesBob, 2);

  return {
    cifValueBob: safeCif,
    gaPercentage: category.gaRatePercentage,
    gaAmountBob,
    ivaEffectivePercentage: 14.94,
    ivaAmountBob,
    customsAgencyAndWarehouseBob: safeFees,
    totalTaxesAndDutiesBob,
    totalNationalizedCostBob,
    isProhibited: false
  };
}
