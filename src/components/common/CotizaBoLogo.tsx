import React from 'react';

interface CotizaBoIconProps {
  className?: string;
  size?: number;
}

/**
 * Isotipo gráfico vectorial de CotizaBO.
 * Combina un orbe financiero moderno con flechas dinámicas de intercambio cambiario
 * y el acento tricolor de Bolivia.
 */
export const CotizaBoIcon: React.FC<CotizaBoIconProps> = ({ className = 'w-9 h-9', size }) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="Logo CotizaBO"
    >
      <defs>
        {/* Gradiente principal del contenedor */}
        <linearGradient id="cotizabo-grad-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="50%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>

        {/* Gradiente de brillo superior */}
        <linearGradient id="cotizabo-shine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Sombra suave interna */}
        <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Contenedor redondeado tipo app-icon moderno */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="13"
        fill="url(#cotizabo-grad-bg)"
        filter="url(#soft-shadow)"
      />
      <rect
        x="2"
        y="2"
        width="44"
        height="22"
        rx="13"
        fill="url(#cotizabo-shine)"
      />

      {/* Trazo del borde de seguridad */}
      <rect
        x="2.5"
        y="2.5"
        width="43"
        height="43"
        rx="12.5"
        stroke="#ffffff"
        strokeOpacity="0.2"
        strokeWidth="1"
      />

      {/* Flechas curvas de cotización / intercambio cambiario */}
      {/* Flecha superior (hacia la derecha/subida) */}
      <path
        d="M13 22C13 17.0294 17.0294 13 22 13H33M33 13L28.5 8.5M33 13L28.5 17.5"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Flecha inferior (hacia la izquierda/retorno) */}
      <path
        d="M35 26C35 30.9706 30.9706 35 26 35H15M15 35L19.5 30.5M15 35L19.5 39.5"
        stroke="#D1FAE5"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Punto de cotización central / nodo financiero */}
      <circle cx="24" cy="24" r="3.2" fill="#FFFFFF" />
      <circle cx="24" cy="24" r="1.5" fill="#047857" />

      {/* Acento tricolor boliviano sutil y elegante en la esquina inferior */}
      <g transform="translate(32, 33)">
        <rect x="0" y="0" width="3.2" height="7" rx="1.6" fill="#EF4444" />
        <rect x="4.2" y="0" width="3.2" height="7" rx="1.6" fill="#F59E0B" />
        <rect x="8.4" y="0" width="3.2" height="7" rx="1.6" fill="#10B981" />
      </g>
    </svg>
  );
};

interface CotizaBoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

/**
 * Logotipo completo de CotizaBO con Isotipo y Tipografía armonizada.
 */
export const CotizaBoLogo: React.FC<CotizaBoLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <CotizaBoIcon className={`${iconSize} shrink-0 transition-transform duration-200 group-hover:scale-105`} />
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`${titleSize} font-extrabold tracking-tight text-slate-900 dark:text-white`}>
            Cotiza
          </span>
          <span className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-[11px] font-black px-1.5 py-0.5 rounded shadow-sm tracking-wider uppercase">
            BO
          </span>
        </div>
        {showTagline && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-tight mt-1 hidden sm:block">
            Cotizaciones oficiales y herramientas financieras
          </p>
        )}
      </div>
    </div>
  );
};
