import { OFFICIAL_RATES } from '../data/officialRates';
import { EXCHANGE_HOUSES } from '../data/exchangeHouses';

/** Escapa un campo para CSV: comillas dobles y separadores. */
function csvField(value: string | number | undefined): string {
  const text = value === undefined || value === null ? '' : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function buildCsv(headers: string[], rows: Array<Array<string | number | undefined>>): string {
  const lines = [
    headers.map(csvField).join(','),
    ...rows.map(row => row.map(csvField).join(',')),
  ];
  // BOM para que Excel reconozca UTF-8 y no rompa tildes ni la ñ.
  return '\uFEFF' + lines.join('\r\n');
}

export function downloadRatesAsCsv(): void {
  const headers = [
    'Moneda_Base',
    'Moneda_Destino',
    'Tipo_Cotizacion',
    'TCO_Bs_por_Unidad',
    'Fuente',
    'Tabla',
    'Fecha_Publicacion',
    'Fecha_Consulta',
    'Nivel_Verificacion',
    'URL_Fuente',
  ];
  const rows = OFFICIAL_RATES.map(r => [
    r.baseCurrency,
    r.targetCurrency,
    r.type,
    r.sellRate,
    r.sourceName,
    r.sourceTable,
    r.publishedOn,
    r.retrievedOn,
    r.verification,
    r.sourceUrl,
  ]);

  triggerDownload(buildCsv(headers, rows), 'cambio-bolivia-cotizaciones.csv', 'text/csv;charset=utf-8;');
}

export function downloadRatesAsJson(): void {
  const jsonContent = JSON.stringify(OFFICIAL_RATES, null, 2);
  triggerDownload(jsonContent, 'cambio-bolivia-cotizaciones.json', 'application/json;charset=utf-8;');
}

export function downloadExchangeHousesAsCsv(): void {
  const headers = [
    'Nombre_Comercial',
    'Razon_Social',
    'Registro_ASFI',
    'Departamento',
    'Ciudad',
    'Direccion',
    'Telefono',
    'Horario',
    'Nivel_Verificacion',
    'Fecha_Verificacion',
  ];
  const rows = EXCHANGE_HOUSES.map(h => [
    h.commercialName,
    h.legalName,
    h.asfiLicense,
    h.department,
    h.city,
    h.address,
    h.phone,
    h.schedule,
    h.verification,
    h.lastVerifiedDate,
  ]);

  triggerDownload(
    buildCsv(headers, rows),
    'cambio-bolivia-casas-asfi.csv',
    'text/csv;charset=utf-8;'
  );
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
