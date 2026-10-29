/**
 * themeStore.ts
 * Gestiona el modo oscuro/claro usando la estrategia 'class' de Tailwind CSS.
 * La preferencia se persiste en localStorage bajo la clave 'cambio-bolivia-theme'.
 * No hay dependencias externas; opera únicamente sobre el DOM y localStorage.
 */

const STORAGE_KEY = 'cambio-bolivia-theme';

export type Theme = 'dark' | 'light';

/** Lee el tema guardado o infiere desde la preferencia del sistema operativo. */
export function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    // localStorage bloqueado (navegadores en modo privado restrictivos)
  }
  // Fallback: preferencia del sistema operativo
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

/** Aplica el tema al elemento <html> y lo persiste en localStorage. */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignorar si localStorage no está disponible
  }
}

/** Alterna entre dark y light y devuelve el nuevo tema. */
export function toggleTheme(current: Theme): Theme {
  const next: Theme = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}
