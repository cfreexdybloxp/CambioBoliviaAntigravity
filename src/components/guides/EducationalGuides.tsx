import React, { useState } from 'react';
import { EDUCATIONAL_GUIDES } from '../../data/educationalGuides';
import { Clock, ChevronDown, ChevronUp, CheckCircle, HelpCircle, BookOpen } from 'lucide-react';

export const EducationalGuides: React.FC = () => {
  const [expandedGuideId, setExpandedGuideId] = useState<string>(EDUCATIONAL_GUIDES[0]?.id);

  const glossaryItems = [
    {
      term: 'UFV (Unidad de Fomento de Vivienda)',
      definition: 'Unidad de cuenta cuyo valor publica el BCB a diario en su Tabla de Cotizaciones. Se usa en contratos de vivienda, anticréticos, actualización de tributos y créditos a largo plazo. Para indexar necesita la UFV de la fecha inicial y la de la fecha final.'
    },
    {
      term: 'TCO (Tipo de Cambio Oficial)',
      definition: 'Cotización que publica a diario el Banco Central de Bolivia, con un solo valor por moneda. Sirve de referencia en registros contables, obligaciones tributarias y operaciones aduaneras.'
    },
    {
      term: 'Spread Cambiario (Diferencial)',
      definition: 'Diferencia en Bolivianos entre el precio al que una casa de cambio compra una divisa y el precio al que la vende. Representa el margen de intermediación comercial.'
    },
    {
      term: 'ASFI',
      definition: 'Autoridad de Supervisión del Sistema Financiero. Institución estatal que regula, controla y otorga licencias a bancos, cooperativas y casas de cambio en Bolivia.'
    },
    {
      term: 'Decreto Supremo Nº 28761',
      definition: 'Norma del 21 de junio de 2006. Su Artículo 3 prohíbe la importación de prendería usada desde el 21/04/2007 y su comercialización desde el 01/03/2008.'
    },
    {
      term: 'Subasta Ecológica Aduanera',
      definition: 'Procedimiento de la Aduana Nacional para inutilizar o destruir mercancía decomisada que no puede volver al comercio, como la prendería usada.'
    }
  ];

  return (
    <div className="space-y-10">
      
      {/* Encabezado */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          Guías Prácticas y Educación Económica para Bolivia
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Conceptos financieros, contables y regulatorios explicados con sencillez y respaldo legal.
        </p>
      </div>

      {/* Artículos y Guías Interactivas */}
      <div className="space-y-4">
        {EDUCATIONAL_GUIDES.map((guide) => {
          const isExpanded = expandedGuideId === guide.id;

          return (
            <div
              key={guide.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <button
                onClick={() => setExpandedGuideId(isExpanded ? '' : guide.id)}
                className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded">
                      {guide.category}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {guide.readingTimeMinutes} min de lectura
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl">
                    {guide.summary}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-6 animate-fadeIn">
                  
                  {/* Puntos Clave */}
                  <div className="bg-slate-50 dark:bg-slate-950/70 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                    <h4 className="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Puntos Fundamentales:
                    </h4>
                    <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                      {guide.keyTakeaways.map((takeaway, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contenido Completo del Artículo */}
                  <div className="prose prose-sm dark:prose-invert max-w-none text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-3 whitespace-pre-line font-sans">
                    {guide.content}
                  </div>

                  {/* Fuente de Respaldo */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                    Fuente de referencia: <strong className="text-slate-700 dark:text-slate-400">{guide.sourceReference}</strong>
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Glosario de Términos Bolivianos */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm transition-colors">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Glosario de Términos Comerciales y Financieros en Bolivia
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Definiciones claras para que ningún tecnicismo sea una barrera en su actividad económica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {glossaryItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 p-4 rounded-xl space-y-2 text-xs"
            >
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.term}</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
