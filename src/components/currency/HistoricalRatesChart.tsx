import React, { useState } from 'react';
import { TrendingUp, Info } from 'lucide-react';

interface DataPoint {
  date: string;
  officialSell: number;
  commercialAvg: number;
}

const HISTORICAL_DATA: DataPoint[] = [
  { date: '22 Oct', officialSell: 12.12, commercialAvg: 12.14 },
  { date: '23 Oct', officialSell: 12.12, commercialAvg: 12.15 },
  { date: '24 Oct', officialSell: 12.12, commercialAvg: 12.14 },
  { date: '25 Oct', officialSell: 12.12, commercialAvg: 12.14 },
  { date: '26 Oct', officialSell: 12.12, commercialAvg: 12.15 },
  { date: '27 Oct', officialSell: 12.12, commercialAvg: 12.15 },
  { date: '28 Oct', officialSell: 12.12, commercialAvg: 12.15 },
  { date: '29 Oct', officialSell: 12.12, commercialAvg: 12.15 },
];

export const HistoricalRatesChart: React.FC = () => {
  const [activePoint, setActivePoint] = useState<DataPoint | null>(null);

  // Dimensiones del gráfico SVG
  const width = 650;
  const height = 220;
  const padding = { top: 25, right: 30, bottom: 35, left: 50 };

  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const minY = 12.00;
  const maxY = 12.25;

  const getX = (index: number) => {
    return padding.left + (index / (HISTORICAL_DATA.length - 1)) * innerWidth;
  };

  const getY = (val: number) => {
    const clamped = Math.max(minY, Math.min(maxY, val));
    const ratio = (clamped - minY) / (maxY - minY);
    return height - padding.bottom - ratio * innerHeight;
  };

  // Generar trazos SVG
  const officialPath = HISTORICAL_DATA.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.officialSell)}`).join(' ');
  const commercialPath = HISTORICAL_DATA.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.commercialAvg)}`).join(' ');

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-4 transition-colors duration-200">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Evolución Reciente: Dólar Oficial vs. Casas de Cambio (Bs)
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Comparativa de la serie diaria del Banco Central de Bolivia y el promedio de casas de cambio supervisadas.
          </p>
        </div>

        {/* Leyenda */}
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
            <span className="w-3 h-0.5 bg-emerald-500"></span> Oficial BCB (Venta)
          </span>
          <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
            <span className="w-3 h-0.5 bg-amber-500 border-b border-dashed"></span> Promedio Comercial
          </span>
        </div>
      </div>

      {/* Contenedor del Gráfico SVG Responsive */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none"
        >
          {/* Líneas horizontales de guía */}
          {[12.00, 12.10, 12.20].map((val) => (
            <g key={val}>
              <line
                x1={padding.left}
                y1={getY(val)}
                x2={width - padding.right}
                y2={getY(val)}
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <text
                x={padding.left - 8}
                y={getY(val) + 4}
                className="fill-slate-400 dark:fill-slate-500"
                fontSize="10"
                textAnchor="end"
              >
                Bs {val.toFixed(2)}
              </text>
            </g>
          ))}

          {/* Líneas de datos */}
          <path
            d={officialPath}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d={commercialPath}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />

          {/* Puntos interactivos y etiquetas en el eje X */}
          {HISTORICAL_DATA.map((d, i) => (
            <g key={i}>
              <text
                x={getX(i)}
                y={height - 10}
                className="fill-slate-500 dark:fill-slate-400 font-medium"
                fontSize="10"
                textAnchor="middle"
              >
                {d.date}
              </text>

              {/* Punto Oficial */}
              <circle
                cx={getX(i)}
                cy={getY(d.officialSell)}
                r={activePoint?.date === d.date ? 6 : 4}
                fill="#10b981"
                className="cursor-pointer transition-all"
                onMouseEnter={() => setActivePoint(d)}
              />

              {/* Punto Comercial */}
              <circle
                cx={getX(i)}
                cy={getY(d.commercialAvg)}
                r={activePoint?.date === d.date ? 6 : 3.5}
                fill="#f59e0b"
                className="cursor-pointer transition-all"
                onMouseEnter={() => setActivePoint(d)}
              />
            </g>
          ))}
        </svg>

        {/* Tooltip de punto activo */}
        {activePoint && (
          <div className="mt-2 bg-slate-100 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between text-slate-700 dark:text-slate-300">
            <span className="font-semibold text-slate-900 dark:text-white">Fecha: {activePoint.date} 2026</span>
            <div className="flex gap-4">
              <span>Oficial BCB: <strong className="text-emerald-600 dark:text-emerald-400">Bs {activePoint.officialSell.toFixed(2)}</strong></span>
              <span>Comercial: <strong className="text-amber-600 dark:text-amber-400">Bs {activePoint.commercialAvg.toFixed(2)}</strong></span>
            </div>
          </div>
        )}
      </div>

      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1 border-t border-slate-200 dark:border-slate-800/80">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>Los datos históricos reflejan la estabilidad del Tipo de Cambio Oficial frente a las oscilaciones de ventanilla comercial en días hábiles.</span>
      </div>

    </div>
  );
};
