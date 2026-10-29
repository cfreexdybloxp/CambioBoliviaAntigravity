export interface StalenessInfo {
  status: 'fresh' | 'stale_warning' | 'expired';
  label: string;
  badgeClass: string;
  description: string;
}

/**
 * Calcula la antigüedad y el estado de vigencia de una cotización
 */
export function getRateStaleness(effectiveDateStr: string): StalenessInfo {
  const effectiveDate = new Date(effectiveDateStr);
  const now = new Date();
  
  if (isNaN(effectiveDate.getTime())) {
    return {
      status: 'expired',
      label: 'Fecha desconocida',
      badgeClass: 'bg-rose-950/60 text-rose-300 border-rose-800',
      description: 'No se puede verificar la fecha de emisión del dato.'
    };
  }

  const diffMs = now.getTime() - effectiveDate.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 24) {
    return {
      status: 'fresh',
      label: 'Vigente y Verificado',
      badgeClass: 'bg-emerald-950/60 text-emerald-300 border-emerald-800',
      description: `Publicación oficial vigente (${diffHours === 0 ? 'hace menos de 1 hora' : `hace ${diffHours} horas`}).`
    };
  }

  if (diffDays <= 3) {
    return {
      status: 'stale_warning',
      label: 'Referencia previa',
      badgeClass: 'bg-amber-950/60 text-amber-300 border-amber-800',
      description: `Último registro publicado hace ${diffDays} día(s). Fines de semana o feriados bancarios pueden retrasar la emisión oficial.`
    };
  }

  return {
    status: 'expired',
    label: 'Dato desactualizado',
    badgeClass: 'bg-rose-950/60 text-rose-300 border-rose-800',
    description: `Cotización con más de ${diffDays} días de antigüedad. Verifique directamente con la entidad antes de operar.`
  };
}

/**
 * Formatea una fecha ISO a formato legible boliviano (DD/MM/AAAA)
 */
export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return new Intl.DateTimeFormat('es-BO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(d);
  } catch {
    return dateStr;
  }
}
