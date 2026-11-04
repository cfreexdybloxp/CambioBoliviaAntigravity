import { CommunityRateReport, CurrencyCode } from '../types';

const STORAGE_KEY = 'cambio_bolivia_community_reports';
const LAST_SUBMIT_KEY = 'cambio_bolivia_last_submit_ts';

/**
 * Reportes comunitarios.
 *
 * Limitación importante y deliberada: esta versión guarda los reportes
 * únicamente en `localStorage`. No se envían a ningún servidor, no se
 * comparten entre usuarios y nadie los modera. Por eso la interfaz debe
 * presentarlos como "borradores locales", nunca como cotizaciones verificadas
 * ni como una muestra de lo que reporta la comunidad.
 *
 * No se incluyen reportes de ejemplo: inventar cotizaciones para aparentar
 * actividad es exactamente lo que este proyecto debe evitar.
 */
export const INITIAL_COMMUNITY_REPORTS: CommunityRateReport[] = [];

export function getStoredReports(): CommunityRateReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function validateReportInput(data: {
  establishmentName: string;
  city: string;
  currency: CurrencyCode;
  buyRate: number;
  sellRate: number;
}): { isValid: boolean; error?: string } {
  if (!data.establishmentName || data.establishmentName.trim().length < 3) {
    return { isValid: false, error: 'El nombre del establecimiento debe tener al menos 3 caracteres.' };
  }

  if (!data.city || data.city.trim().length < 3) {
    return { isValid: false, error: 'Especifique la ciudad y zona de la cotización.' };
  }

  if (!Number.isFinite(data.buyRate) || !Number.isFinite(data.sellRate) || data.buyRate <= 0 || data.sellRate <= 0) {
    return { isValid: false, error: 'Las cotizaciones deben ser valores numéricos positivos mayores a cero.' };
  }

  if (data.buyRate > data.sellRate) {
    return { isValid: false, error: 'El precio de compra no puede ser mayor al precio de venta del establecimiento.' };
  }

  // Comprobación de cordura numérica para USD
  if (data.currency === 'USD') {
    if (data.buyRate < 5 || data.sellRate > 30) {
      return { isValid: false, error: 'La cotización ingresada para USD se encuentra fuera de los rangos de coherencia del mercado.' };
    }
  }

  return { isValid: true };
}

export function checkSpamLimits(establishmentName: string, currency: CurrencyCode): { allowed: boolean; message?: string } {
  const lastSubmit = localStorage.getItem(LAST_SUBMIT_KEY);
  const now = Date.now();

  // Límite de 1 minuto entre envíos consecutivos por usuario
  if (lastSubmit && now - parseInt(lastSubmit, 10) < 60000) {
    const remainingSeconds = Math.ceil((60000 - (now - parseInt(lastSubmit, 10))) / 1000);
    return {
      allowed: false,
      message: `Control de frecuencia anti-spam: Espere ${remainingSeconds} segundos antes de enviar otro reporte.`
    };
  }

  // Control de duplicados en las últimas 2 horas para el mismo establecimiento y divisa
  const existingReports = getStoredReports();
  const twoHoursAgo = now - 7200000;
  const duplicate = existingReports.find(
    r => r.establishmentName.toLowerCase().trim() === establishmentName.toLowerCase().trim() &&
         r.currency === currency &&
         new Date(r.reportedAt).getTime() > twoHoursAgo
  );

  if (duplicate) {
    return {
      allowed: false,
      message: 'Ya existe un reporte reciente para este establecimiento y moneda en las últimas 2 horas.'
    };
  }

  return { allowed: true };
}

export function submitCommunityReport(reportData: Omit<CommunityRateReport, 'id' | 'reportedAt' | 'status'>): {
  success: boolean;
  report?: CommunityRateReport;
  error?: string;
} {
  const validation = validateReportInput(reportData);
  if (!validation.isValid) {
    return { success: false, error: validation.error };
  }

  const spamCheck = checkSpamLimits(reportData.establishmentName, reportData.currency);
  if (!spamCheck.allowed) {
    return { success: false, error: spamCheck.message };
  }

  const newReport: CommunityRateReport = {
    ...reportData,
    id: `rep-${Date.now()}`,
    reportedAt: new Date().toISOString(),
    status: 'PENDIENTE_REVISION',
    notes: 'Borrador guardado solo en este navegador. No fue enviado, publicado ni verificado por nadie.'
  };

  try {
    const reports = getStoredReports();
    reports.unshift(newReport);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    localStorage.setItem(LAST_SUBMIT_KEY, Date.now().toString());
    return { success: true, report: newReport };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error al almacenar el reporte en el navegador.' };
  }
}

export function clearStoredReports(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LAST_SUBMIT_KEY);
  } catch {
    // localStorage no disponible
  }
}
