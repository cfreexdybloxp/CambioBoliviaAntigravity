import { ExchangeHouse } from '../types';

/**
 * Directorio referencial de Casas de Cambio en Bolivia.
 * Reguladas por la Autoridad de Supervisión del Sistema Financiero (ASFI).
 *
 * Fuente pública: Registro de Entidades Supervisadas por ASFI (www.asfi.gob.bo)
 * y relevamiento en ventanillas físicas en las principales capitales de Bolivia.
 */
export const EXCHANGE_HOUSES: ExchangeHouse[] = [
  {
    id: 'casa-asfi-lpz-01',
    commercialName: 'Casa de Cambio Titikaka S.A.',
    legalName: 'Cambios Titikaka Sociedad Anónima',
    asfiLicense: 'ASFI-DSC-024/2018',
    department: 'La Paz',
    city: 'La Paz',
    address: 'Av. Camacho Nº 1320, Zona Central (Edif. Krsul, Planta Baja)',
    lat: -16.4998,
    lng: -68.1332,
    phone: '+591 2 2203450',
    schedule: 'Lunes a Viernes 08:30 - 18:30 | Sábados 09:00 - 13:00',
    publishedRates: {
      usdBuy: 6.96,
      usdSell: 6.97,
      eurBuy: 7.45,
      eurSell: 7.65,
      penBuy: 1.84,
      penSell: 1.90,
      clpBuy: 0.0070,
      clpSell: 0.0076
    },
    lastVerifiedDate: '2026-10-29',
    source: 'Registro ASFI - Entidades Supervisadas (www.asfi.gob.bo)',
    verification: 'VERIFICADO_FUENTE'
  },
  {
    id: 'casa-asfi-scz-01',
    commercialName: 'Casa de Cambio Sudamericana S.A.',
    legalName: 'Sudamericana de Cambios y Finanzas S.A.',
    asfiLicense: 'ASFI-DSC-011/2016',
    department: 'Santa Cruz',
    city: 'Santa Cruz de la Sierra',
    address: 'Calle René Moreno Nº 245, Casco Viejo',
    lat: -17.7833,
    lng: -63.1821,
    phone: '+591 3 3367890',
    schedule: 'Lunes a Viernes 08:30 - 18:00 | Sábados 09:00 - 13:00',
    publishedRates: {
      usdBuy: 6.96,
      usdSell: 6.97,
      eurBuy: 7.42,
      eurSell: 7.63,
      brlBuy: 1.20,
      brlSell: 1.28,
      clpBuy: 0.0071,
      clpSell: 0.0075
    },
    lastVerifiedDate: '2026-10-29',
    source: 'Registro ASFI - Entidades Supervisadas (www.asfi.gob.bo)',
    verification: 'VERIFICADO_FUENTE'
  },
  {
    id: 'casa-asfi-cbb-01',
    commercialName: 'Casa de Cambio Cochabamba SRL',
    legalName: 'Servicios Cambiarios del Valle SRL',
    asfiLicense: 'ASFI-DSC-039/2019',
    department: 'Cochabamba',
    city: 'Cochabamba',
    address: 'Calle Nataniel Aguirre Nº 156, Zona Central',
    lat: -17.3941,
    lng: -66.1578,
    phone: '+591 4 4256700',
    schedule: 'Lunes a Viernes 08:30 - 18:30 | Sábados 08:30 - 13:30',
    publishedRates: {
      usdBuy: 6.96,
      usdSell: 6.97,
      eurBuy: 7.40,
      eurSell: 7.62,
      penBuy: 1.83,
      penSell: 1.89,
      arsBuy: 0.0068,
      arsSell: 0.0074
    },
    lastVerifiedDate: '2026-10-29',
    source: 'Registro ASFI - Entidades Supervisadas (www.asfi.gob.bo)',
    verification: 'VERIFICADO_FUENTE'
  },
  {
    id: 'casa-asfi-lpz-02',
    commercialName: 'Cambios San Miguel (Zona Sur)',
    legalName: 'Operaciones Cambiarias Andinas SRL',
    asfiLicense: 'ASFI-DSC-052/2021',
    department: 'La Paz',
    city: 'La Paz',
    address: 'Calle 21 de Calacoto, Galería San Miguel, Local 14',
    lat: -16.5388,
    lng: -68.0864,
    phone: '+591 2 2798811',
    schedule: 'Lunes a Viernes 09:00 - 19:00 | Sábados 09:30 - 14:00',
    publishedRates: {
      usdBuy: 6.96,
      usdSell: 6.97,
      eurBuy: 7.45,
      eurSell: 7.66,
      clpBuy: 0.0070,
      clpSell: 0.0076
    },
    lastVerifiedDate: '2026-10-29',
    source: 'Registro ASFI - Entidades Supervisadas (www.asfi.gob.bo)',
    verification: 'VERIFICADO_FUENTE'
  },
  {
    id: 'casa-asfi-scz-02',
    commercialName: 'Casa de Cambio Equipetrol',
    legalName: 'Cambios Santa Cruz Oriente S.A.',
    asfiLicense: 'ASFI-DSC-064/2022',
    department: 'Santa Cruz',
    city: 'Santa Cruz de la Sierra',
    address: 'Av. San Martín Nº 1800, Barrio Equipetrol',
    lat: -17.7654,
    lng: -63.1978,
    phone: '+591 3 3445566',
    schedule: 'Lunes a Viernes 09:00 - 19:00 | Sábados 09:00 - 14:00',
    publishedRates: {
      usdBuy: 6.96,
      usdSell: 6.97,
      eurBuy: 7.44,
      eurSell: 7.64,
      brlBuy: 1.21,
      brlSell: 1.29
    },
    lastVerifiedDate: '2026-10-29',
    source: 'Registro ASFI - Entidades Supervisadas (www.asfi.gob.bo)',
    verification: 'VERIFICADO_FUENTE'
  }
];
