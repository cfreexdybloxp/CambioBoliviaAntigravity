import { CommunityRateReport, CurrencyCode } from '../types';

const STORAGE_KEY = 'cambio_bolivia_community_reports';
const LAST_SUBMIT_KEY = 'cambio_bolivia_last_submit_ts';

export const INITIAL_COMMUNITY_REPORTS: CommunityRateReport[] = [
  {
    id: 'rep-001',
    establishmentName: 'Pizarra Casa de Cambio Colón',
    city: 'La Paz (Centro)',
    currency: 'USD',
    buyRate: 12.08,
    sellRate: 12.14,
    declaredSource: 'Ventanilla física / Pizarra',
    reportedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: 'VERIFICADO_PUBLICADO',
    notes: 'Contrastado telefónicamente con la entidad.'
  },
  {
    id: 'rep-002',
    establishmentName: 'Librecambio Av. Mutualista',
    city: 'Santa Cruz',
    currency: 'USD',
    buyRate: 12.15,
    sellRate: 12.25,
    declaredSource: 'Consulta telefónica',
    reportedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: 'PENDIENTE_REVISION',
    notes: 'Pendiente de comprobación física. Cotización informal.'
  }
];

export function getStoredReports(): CommunityRateReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COMMUNITY_REPORTS));
      return INITIAL_COMMUNITY_REPORTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_COMMUNITY_REPORTS;
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

  if (data.buyRate <= 0 || data.sellRate <= 0) {
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
    notes: 'Enviado por la comunidad; no representa un dato oficial verificado hasta su moderación.'
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

export function moderateStoredReport(id: string, newStatus: CommunityRateReport['status'], reason?: string): boolean {
  try {
    const reports = getStoredReports();
    const index = reports.findIndex(r => r.id === id);
    if (index === -1) return false;

    reports[index].status = newStatus;
    if (reason) {
      reports[index].rejectionReason = reason;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    return true;
  } catch {
    return false;
  }
}
