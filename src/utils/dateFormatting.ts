export interface StalenessInfo {
  status: 'fresh' | 'stale_warning' | 'expired' | 'unknown';
  label: string;
  badgeClass: string;
  description: string;
  daysOld: number | null;
}

/**
 * Convierte 'YYYY-MM-DD' en una fecha local a medianoche.
 * `new Date('2026-10-30')` se interpreta como UTC y en Bolivia (UTC-4)
 * mostraría el día anterior.
 */
export function parseDateOnly(dateStr: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr.trim());
  if (!match) {
    const fallback = new Date(dateStr);
    return isNaN(fallback.getTime()) ? null : fallback;
  }
  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day));
}

/**
 * Calcula la antigüedad de un dato a partir de la fecha que declara la fuente.
 * No afirma que el dato siga vigente: solo informa cuánto tiempo pasó desde su
 * publicación. La comprobación real debe hacerse en la fuente enlazada.
 */
export function getRateStaleness(publishedOn: string): StalenessInfo {
  const published = parseDateOnly(publishedOn);

  if (!published) {
    return {
      status: 'unknown',
      label: 'Fecha desconocida',
      badgeClass: 'bg-rose-950/60 text-rose-300 border-rose-800',
      description: 'No se puede verificar la fecha de publicación del dato.',
      daysOld: null,
    };
  }

  const today = new Date();
  const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  const publishedUtc = Date.UTC(published.getFullYear(), published.getMonth(), published.getDate());
  const daysOld = Math.round((todayUtc - publishedUtc) / 86400000);

  if (daysOld < 0) {
    return {
      status: 'unknown',
      label: 'Fecha futura',
      badgeClass: 'bg-rose-950/60 text-rose-300 border-rose-800',
      description: 'La fecha declarada por la fuente es posterior a hoy. Revise el dato antes de usarlo.',
      daysOld,
    };
  }

  if (daysOld === 0) {
    return {
      status: 'fresh',
      label: 'Publicado hoy',
      badgeClass: 'bg-emerald-950/60 text-emerald-300 border-emerald-800',
      description: 'La fuente declara esta cotización con fecha de hoy. Confirme el valor en el enlace de la fuente.',
      daysOld,
    };
  }

  if (daysOld === 1) {
    return {
      status: 'stale_warning',
      label: 'Publicado ayer',
      badgeClass: 'bg-amber-950/60 text-amber-300 border-amber-800',
      description: 'Última publicación registrada ayer. Puede corresponder a un día no hábil o a una actualización pendiente.',
      daysOld,
    };
  }

  if (daysOld <= 3) {
    return {
      status: 'stale_warning',
      label: `Hace ${daysOld} días`,
      badgeClass: 'bg-amber-950/60 text-amber-300 border-amber-800',
      description: `El dato fue publicado hace ${daysOld} días. Confirme la cotización actual en la fuente antes de operar.`,
      daysOld,
    };
  }

  return {
    status: 'expired',
    label: `Desactualizado (${daysOld} días)`,
    badgeClass: 'bg-rose-950/60 text-rose-300 border-rose-800',
    description: `El dato tiene ${daysOld} días de antigüedad. No representa necesariamente la cotización actual: verifique en el Banco Central de Bolivia.`,
    daysOld,
  };
}

/**
 * Formatea una fecha ISO o 'YYYY-MM-DD' en formato boliviano (DD/MM/AAAA).
 */
export function formatDate(dateStr: string): string {
  const parsed = parseDateOnly(dateStr);
  if (!parsed) return dateStr;

  return new Intl.DateTimeFormat('es-BO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsed);
}
