import React, { useState } from 'react';
import { EDUCATIONAL_GUIDES } from '../../data/educationalGuides';
import { Clock, ChevronDown, ChevronUp, CheckCircle, HelpCircle } from 'lucide-react';

export const EducationalGuides: React.FC = () => {
  const [expandedGuideId, setExpandedGuideId] = useState<string>(EDUCATIONAL_GUIDES[0]?.id);

  const glossaryItems = [
    {
      term: 'UFV (Unidad de Fomento de Vivienda)',
      definition: 'Unidad de cuenta referencial calculada diariamente por el BCB según la inflación (IPC). Utilizada en contratos de vivienda, actualización de tributos y créditos a largo plazo.'
    },
    {
      term: 'TCO (Tipo de Cambio Oficial)',
      definition: 'Cotización legal fijada por el Banco Central de Bolivia. Obligatoria para balances contables, recaudación fiscal y declaraciones juradas aduaneras.'
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
      definition: 'Decreto de 2006 que prohíbe de forma terminante la importación y comercialización de ropa usada en Bolivia para salvaguardar la industria textil y la salud pública.'
    },
    {
      term: 'Subasta Ecológica Aduanera',
      definition: 'Procedimiento legal mediante el cual la ropa usada decomisada por contrabando se inutiliza y tritura para ser vendida únicamente como relleno de colchones o aislantes.'
    }
  ];

  return (
    <div className="space-y-10">
      
      {/* Encabezado */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          Guías Prácticas y Educación Económica para Bolivia
        </h2>
        <p className="text-sm text-slate-400 mt-1">
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
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setExpandedGuideId(isExpanded ? '' : guide.id)}
                className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-slate-850/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                      {guide.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {guide.readingTimeMinutes} min de lectura
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                    {guide.summary}
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-slate-800 text-slate-300 shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isExpanded && (
                <div className="p-6 pt-0 border-t border-slate-800 space-y-6 animate-fadeIn">
                  
                  {/* Puntos Clave */}
                  <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                    <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Puntos Fundamentales:
                    </h4>
                    <ul className="space-y-1.5 text-slate-300">
                      {guide.keyTakeaways.map((takeaway, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cuerpo del Artículo */}
                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 prose-invert">
                    {guide.content.split('\n\n').map((paragraph, index) => {
                      if (paragraph.startsWith('###')) {
                        return (
                          <h4 key={index} className="text-sm font-bold text-white pt-2">
                            {paragraph.replace('###', '').trim()}
                          </h4>
                        );
                      }
                      return (
                        <p key={index} className="text-slate-300">
                          {paragraph.trim()}
                        </p>
                      );
                    })}
                  </div>

                  {/* Fuente */}
                  <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500">
                    Respaldo documental: <strong className="text-slate-400">{guide.sourceReference}</strong>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Glosario Financiero Boliviano */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            Glosario Financiero y Económico Boliviano
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Definiciones exactas conforme a la legislación nacional y normativas vigentes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {glossaryItems.map((item, i) => (
            <div key={i} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <h4 className="text-xs font-bold text-emerald-400">{item.term}</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">{item.definition}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
