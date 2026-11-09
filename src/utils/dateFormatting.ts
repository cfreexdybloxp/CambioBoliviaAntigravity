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
      badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
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
      status: 'fresh',
      label: 'Vigencia oficial',
      badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      description: 'Publicación oficial del Banco Central de Bolivia vigente para la jornada.',
      daysOld,
    };
  }

  if (daysOld === 0) {
    return {
      status: 'fresh',
      label: 'Publicado hoy',
      badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      description: 'La fuente declara esta cotización con fecha de hoy. Confirmado en el Banco Central de Bolivia.',
      daysOld,
    };
  }

  if (daysOld === 1) {
    return {
      status: 'fresh',
      label: 'Última jornada hábil',
      badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      description: 'Cotización oficial de la jornada bancaria anterior.',
      daysOld,
    };
  }

  // Si fue publicado hace 2 a 4 días (ej. fin de semana bancario viernes-lunes)
  if (daysOld <= 4) {
    return {
      status: 'fresh',
      label: 'Vigente (último corte BCB)',
      badgeClass: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      description: `Cotización oficial vigente del último corte hábil del BCB (${daysOld} días atrás, cubre fin de semana).`,
      daysOld,
    };
  }

  return {
    status: 'stale_warning',
    label: `Corte anterior (${daysOld}d)`,
    badgeClass: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    description: `El dato corresponde a la sesión de hace ${daysOld} días. En espera de la siguiente publicación del BCB.`,
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
