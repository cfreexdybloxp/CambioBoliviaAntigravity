/**
 * liveRateService.ts
 * Servicio en cliente para consultar y auto-actualizar el Tipo de Cambio Oficial (TCO)
 * del Banco Central de Bolivia (BCB) en tiempo real.
 * 
 * Estrategia de resiliencia:
 * 1. Intenta consultar la función Edge en `/api/rate` (servida por Cloudflare Pages).
 * 2. Si falla o estamos en entorno local, usa directamente los proxies CORS gratuitos (allorigins.win / corsproxy.io).
 * 3. Si no hay conexión a internet, recurre a la última tasa guardada en localStorage o a la tasa base verificada.
 */

export interface LiveRateData {
  rate: number;
  cutoffDate: string;
  validityDate: string;
  retrievedAt: string;
  source: string;
  isLive: boolean;
  method: string;
}

const STORAGE_KEY = 'cambio-bolivia-live-tco';
const BCB_CSV_URL = 'https://www.bcb.gob.bo/bcb_tco_publico_descargar_csv.php';
const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

// Tasa base verificada de contingencia
export const BASELINE_TCO: LiveRateData = {
  rate: 12.06,
  cutoffDate: '2026-11-03',
  validityDate: '2026-11-04',
  retrievedAt: new Date().toISOString(),
  source: 'Banco Central de Bolivia (BCB)',
  isLive: false,
  method: 'baseline'
};

function parseBcbCsvClient(csvText: string): { rate: number; cutoffDate: string; validityDate: string } {
  const lines = csvText.trim().split(/\r?\n/).filter(l => l.trim().length > 0);
  const tcoLine = lines.slice().reverse().find(l => l.includes(';TCO;') || l.includes(';TCO'));
  
  if (!tcoLine) {
    throw new Error('Fila TCO no encontrada');
  }

  const parts = tcoLine.split(';').map(p => p.trim());
  const cutoffDate = parts[0] || new Date().toISOString().slice(0, 10);
  const validityDate = parts[1] || cutoffDate;

  const numericParts = parts.slice(3).filter(p => p.length > 0 && /^[0-9]+,[0-9]+$/.test(p));
  if (numericParts.length === 0) {
    throw new Error('Sin valores numéricos en fila TCO');
  }

  const generalTcoStr = numericParts[numericParts.length - 1].replace(',', '.');
  const rate = parseFloat(generalTcoStr);

  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error('Tasa inválida');
  }

  return { rate, cutoffDate, validityDate };
}

/**
 * Consulta la tasa oficial más reciente disponible.
 */
export async function fetchLiveBcbRate(): Promise<LiveRateData> {
  // 1. Intentar endpoint Cloudflare Pages Function (/api/rate)
  try {
    const resp = await fetch('/api/rate', {
      headers: { 'Accept': 'application/json' }
    });
    if (resp.ok) {
      const json = await resp.json();
      if (json && json.rate && Number.isFinite(json.rate)) {
        const live: LiveRateData = {
          rate: json.rate,
          cutoffDate: json.cutoffDate || '2026-11-03',
          validityDate: json.validityDate || '2026-11-04',
          retrievedAt: json.retrievedAt || new Date().toISOString(),
          source: json.source || 'Banco Central de Bolivia (BCB)',
          isLive: true,
          method: json.method || 'cloudflare-api'
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(live));
        } catch {}
        return live;
      }
    }
  } catch {}

  // 2. Fallback con Proxies CORS directamente en el navegador
  const today = new Date().toISOString().slice(0, 10);
  const from = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
  const targetUrl = `${BCB_CSV_URL}?desde=${from}&hasta=${today}`;

  // Proxy 1: allorigins.win
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
    const resp = await fetch(proxyUrl, { headers: { 'User-Agent': BROWSER_UA } });
    if (resp.ok) {
      const text = await resp.text();
      const parsed = parseBcbCsvClient(text);
      const live: LiveRateData = {
        rate: parsed.rate,
        cutoffDate: parsed.cutoffDate,
        validityDate: parsed.validityDate,
        retrievedAt: new Date().toISOString(),
        source: 'Banco Central de Bolivia (BCB) vía proxy CORS',
        isLive: true,
        method: 'allorigins-cors'
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(live));
      } catch {}
      return live;
    }
  } catch {}

  // Proxy 2: corsproxy.io
  try {
    const proxyUrl = `https://corsproxy.io/?url=${encodeURIComponent(targetUrl)}`;
    const resp = await fetch(proxyUrl, { headers: { 'User-Agent': BROWSER_UA } });
    if (resp.ok) {
      const text = await resp.text();
      const parsed = parseBcbCsvClient(text);
      const live: LiveRateData = {
        rate: parsed.rate,
        cutoffDate: parsed.cutoffDate,
        validityDate: parsed.validityDate,
        retrievedAt: new Date().toISOString(),
        source: 'Banco Central de Bolivia (BCB) vía proxy CORS',
        isLive: true,
        method: 'corsproxy-io'
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(live));
      } catch {}
      return live;
    }
  } catch {}

  // 3. Fallback a caché local guardada
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.rate) {
        return { ...parsed, isLive: false };
      }
    }
  } catch {}

  // 4. Último recurso: Baseline oficial verificado
  return BASELINE_TCO;
}
