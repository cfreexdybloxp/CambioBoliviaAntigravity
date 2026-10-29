import { OFFICIAL_RATES } from '../data/officialRates';
import { EXCHANGE_HOUSES } from '../data/exchangeHouses';

export function downloadRatesAsCsv(): void {
  const headers = ['Moneda_Base', 'Moneda_Destino', 'Tipo_Cotizacion', 'Precio_Compra_Bs', 'Precio_Venta_Bs', 'Fuente', 'Fecha_Vigencia'];
  const rows = OFFICIAL_RATES.map(r => [
    r.baseCurrency,
    r.targetCurrency,
    r.type,
    r.buyRate,
    r.sellRate,
    `"${r.sourceName}"`,
    r.effectiveDate
  ]);

  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  triggerDownload(csvContent, 'cambio-bolivia-cotizaciones.csv', 'text/csv;charset=utf-8;');
}

export function downloadRatesAsJson(): void {
  const jsonContent = JSON.stringify(OFFICIAL_RATES, null, 2);
  triggerDownload(jsonContent, 'cambio-bolivia-cotizaciones.json', 'application/json;');
}

export function downloadExchangeHousesAsCsv(): void {
  const headers = ['Nombre_Comercial', 'Razon_Social', 'Licencia_ASFI', 'Departamento', 'Ciudad', 'Direccion', 'Telefono', 'Horario', 'Dolar_Compra_Bs', 'Dolar_Venta_Bs'];
  const rows = EXCHANGE_HOUSES.map(h => [
    `"${h.commercialName}"`,
    `"${h.legalName}"`,
    h.asfiLicense,
    h.department,
    `"${h.city}"`,
    `"${h.address}"`,
    `"${h.phone || ''}"`,
    `"${h.schedule}"`,
    h.publishedRates.usdBuy || '',
    h.publishedRates.usdSell || ''
  ]);

  const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  triggerDownload(csvContent, 'cambio-bolivia-casas-asfi.csv', 'text/csv;charset=utf-8;');
}

function triggerDownload(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
