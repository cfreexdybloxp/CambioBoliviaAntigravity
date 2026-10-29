import { ExchangeHouse } from '../types';

export const EXCHANGE_HOUSES: ExchangeHouse[] = [
  // LA PAZ
  {
    id: 'casa-sudamer-lpz',
    commercialName: 'Casa de Cambio Sudamer S.A.',
    legalName: 'Sudamer Casa de Cambio S.A.',
    asfiLicense: 'ASFI-CC-012/2018',
    department: 'La Paz',
    city: 'La Paz',
    address: 'Av. Mariscal Santa Cruz Nº 1392, Edif. Cámara Nacional de Comercio',
    lat: -16.4988,
    lng: -68.1348,
    phone: '+591 2 2314560',
    schedule: 'Lunes a Viernes 08:30 - 18:30 | Sábados 09:00 - 13:00',
    isVerified: true,
    publishedRates: {
      usdBuy: 12.08,
      usdSell: 12.14,
      penBuy: 3.20,
      penSell: 3.28,
      eurBuy: 12.80,
      eurSell: 13.08
    },
    lastVerifiedDate: '2026-10-29',
    source: 'Registro Público ASFI - Supervisión Entidades Financieras'
  },
  {
    id: 'casa-titicaca-lpz',
    commercialName: 'Casa de Cambio Titikaka',
    legalName: 'Servicios Financieros de Cambio Titikaka S.R.L.',
    asfiLicense: 'ASFI-CC-024/2019',
    department: 'La Paz',
    city: 'La Paz (Zona Sur)',
    address: 'Calle 21 de Calacoto Nº 8245, Edif. El Doral',
    lat: -16.5398,
    lng: -68.0825,
    phone: '+591 2 2793210',
    schedule: 'Lunes a Viernes 09:00 - 19:00 | Sábados 09:30 - 14:00',
    isVerified: true,
    publishedRates: {
      usdBuy: 12.09,
      usdSell: 12.15,
      eurBuy: 12.82,
      eurSell: 13.10
    },
    lastVerifiedDate: '2026-10-29',
    source: 'Registro Público ASFI'
  },

  // SANTA CRUZ
  {
    id: 'casa-multicambio-scz',
    commercialName: 'Multicambios Santa Cruz',
    legalName: 'Multicambios del Oriente S.A.',
    asfiLicense: 'ASFI-CC-008/2017',
    department: 'Santa Cruz',
    city: 'Santa Cruz de la Sierra',
    address: 'Calle René Moreno Nº 240, Casco Viejo Central',
    lat: -17.7842,
    lng: -63.1815,
    phone: '+591 3 3369800',
    schedule: 'Lunes a Viernes 08:00 - 18:30 | Sábados 08:30 - 13:30',
    isVerified: true,
    publishedRates: {
      usdBuy: 12.10,
      usdSell: 12.15,
      brlBuy: 2.16,
      brlSell: 2.23,
      eurBuy: 12.85,
      eurSell: 13.09
    },
    lastVerifiedDate: '2026-10-29',
    source: 'Registro Público ASFI'
  },
  {
    id: 'casa-equipetrol-scz',
    commercialName: 'Cambios Equipetrol Norte',
    legalName: 'Finanzas y Cambio del Valle S.R.L. Sucursal SCZ',
    asfiLicense: 'ASFI-CC-031/2021',
    department: 'Santa Cruz',
    city: 'Santa Cruz de la Sierra',
    address: 'Av. San Martín Nº 1550, Barrio Equipetrol',
    lat: -17.7651,
    lng: -63.1945,
    phone: '+591 3 3421150',
    schedule: 'Lunes a Viernes 08:30 - 19:00 | Sábados 09:00 - 14:00',
    isVerified: true,
    publishedRates: {
      usdBuy: 12.08,
      usdSell: 12.15,
      brlBuy: 2.15,
      brlSell: 2.22
    },
    lastVerifiedDate: '2026-10-29',
    source: 'Registro Público ASFI'
  },

  // COCHABAMBA
  {
    id: 'casa-valle-cbba',
    commercialName: 'Casa de Cambio Central Cochabamba',
    legalName: 'Servicios de Cambio Continental S.A.',
    asfiLicense: 'ASFI-CC-015/2018',
    department: 'Cochabamba',
    city: 'Cochabamba',
    address: 'Calle Nataniel Aguirre Nº 354, entre Jordán y Calama',
    lat: -17.3965,
    lng: -66.1578,
    phone: '+591 4 4258900',
    schedule: 'Lunes a Viernes 08:30 - 18:00 | Sábados 09:00 - 13:00',
    isVerified: true,
    publishedRates: {
      usdBuy: 12.07,
      usdSell: 12.14,
      eurBuy: 12.80,
      eurSell: 13.06,
      arsBuy: 0.0098,
      arsSell: 0.0105
    },
    lastVerifiedDate: '2026-10-29',
    source: 'Registro Público ASFI'
  },

  // ORURO
  {
    id: 'casa-pagador-oru',
    commercialName: 'Cambios Pagador Oruro',
    legalName: 'Casa de Cambio Altiplano S.R.L.',
    asfiLicense: 'ASFI-CC-041/2022',
    department: 'Oruro',
    city: 'Oruro',
    address: 'Calle Bolívar Nº 680, Edif. Oruro Moderno',
    lat: -17.9654,
    lng: -67.1123,
    phone: '+591 2 5251400',
    schedule: 'Lunes a Viernes 08:30 - 17:30 | Sábados 09:00 - 12:30',
    isVerified: true,
    publishedRates: {
      usdBuy: 12.07,
      usdSell: 12.14,
      clpBuy: 0.0125,
      clpSell: 0.0132
    },
    lastVerifiedDate: '2026-10-29',
    source: 'Registro Público ASFI'
  },

  // TARIJA
  {
    id: 'casa-guadalquivir-tja',
    commercialName: 'Cambios Guadalquivir Tarija',
    legalName: 'Cambios del Sur S.R.L.',
    asfiLicense: 'ASFI-CC-029/2020',
    department: 'Tarija',
    city: 'Tarija',
    address: 'Calle Sucre Nº 445, Plaza Principal Luis de Fuentes',
    lat: -21.5337,
    lng: -64.7339,
    phone: '+591 4 6642100',
    schedule: 'Lunes a Viernes 08:30 - 18:00 | Sábados 09:00 - 13:00',
    isVerified: true,
    publishedRates: {
      usdBuy: 12.08,
      usdSell: 12.15,
      arsBuy: 0.0099,
      arsSell: 0.0106
    },
    lastVerifiedDate: '2026-10-29',
    source: 'Registro Público ASFI'
  }
];
