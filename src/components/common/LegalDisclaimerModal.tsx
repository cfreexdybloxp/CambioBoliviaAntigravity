import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, FileText, Scale, Lock, Info } from 'lucide-react';

interface LegalDisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: 'terms' | 'privacy' | 'methodology' | 'normative';
}

export const LegalDisclaimerModal: React.FC<LegalDisclaimerModalProps> = ({
  isOpen,
  onClose,
  initialSection = 'methodology'
}) => {
  const [activeSection, setActiveSection] = useState<'terms' | 'privacy' | 'methodology' | 'normative'>(initialSection);

  // Mantiene la pestaña en sincronía con la sección solicitada desde el pie de página.
  useEffect(() => {
    if (isOpen) setActiveSection(initialSection);
  }, [initialSection, isOpen]);

  // Cierre con Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
      >

        {/* Cabecera del Modal */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 id="legal-modal-title" className="text-base font-bold text-slate-900 dark:text-white">Transparencia, Metodología y Marco Legal</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas internas */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveSection('methodology')}
            className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeSection === 'methodology'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900/60'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Metodología de Datos
          </button>
          <button
            onClick={() => setActiveSection('normative')}
            className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeSection === 'normative'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900/60'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Marco Legal y DS 28761
          </button>
          <button
            onClick={() => setActiveSection('privacy')}
            className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeSection === 'privacy'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900/60'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Privacidad (0 Rastreo)
          </button>
          <button
            onClick={() => setActiveSection('terms')}
            className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeSection === 'terms'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900/60'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Términos de Uso
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          
          {activeSection === 'methodology' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                ¿De dónde salen los datos?
              </h4>
              <p>
                <strong>1. Tipo de Cambio Oficial (TCO):</strong> se copia de la «Tabla de Cotizaciones» diaria del
                Banco Central de Bolivia. Cada tarjeta indica la fecha de publicación y enlaza a la tabla original.
              </p>
              <p>
                <strong>2. Cotizaciones de ventanilla:</strong> no publicamos pizarras de casas de cambio salvo que
                podamos comprobar la fuente. No encontramos una fuente pública automatizable con esos precios, así
                que el comparador permanece vacío en lugar de mostrar cifras inventadas.
              </p>
              <p>
                <strong>3. Antigüedad:</strong> el sistema cuenta los días desde la fecha de publicación del dato,
                no desde la última vez que se abrió la página. Avisa a partir de 24 horas y marca el dato como
                desactualizado a partir de 4 días.
              </p>
              <p>
                <strong>4. Sin verificar:</strong> cualquier registro que no podamos contrastar se muestra como
                «sin verificar». No se presenta como oficial ni se usa para calcular conversiones.
              </p>
              <p>
                <strong>5. Mercado cambiario:</strong> desde diciembre de 2025 el BCB unificó el mercado cambiario.
                Por eso no mostramos un «dólar paralelo» como cotización oficial ni atribuimos a ASFI precios que
                no publica.
              </p>
            </div>
          )}

          {activeSection === 'normative' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                Decreto Supremo Nº 28761 y Ley General de Aduanas Nº 1990
              </h4>
              <p>
                El <strong>Decreto Supremo Nº 28761</strong> (Art. 3) prohíbe la importación de prendería usada
                desde el 21/04/2007 y su comercialización desde el 01/03/2008.
              </p>
              <p>
                <strong>CotizaBO</strong> rechaza terminantemente cualquier facilitación o publicación de proveedores de ropa usada o mercancías ilícitas. Todas nuestras herramientas de costeo y directorios comerciales están orientados al fomento de la industria textil nacional, confección nueva, artesanía, cuero y comercio legal formal.
              </p>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Política de Privacidad y Procesamiento en el Cliente
              </h4>
              <p>
                - <strong>Sin almacenamiento de datos bancarios:</strong> No recopilamos números de cuenta, tarjetas de crédito ni datos financieros sensibles.
              </p>
              <p>
                - <strong>Cálculos 100% locales:</strong> Todas las operaciones de las calculadoras comerciales, costos de importación y conversiones se ejecutan dentro de la memoria de su navegador (JavaScript del cliente).
              </p>
              <p>
                - <strong>Cero rastreadores invasivos:</strong> No se instalan cookies de seguimiento publicitario ni se comparten sus cotizaciones con terceros.
              </p>
            </div>
          )}

          {activeSection === 'terms' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                Términos y Condiciones del Servicio
              </h4>
              <p>
                La información provista por CotizaBO es de naturaleza estrictamente orientativa y educativa. Los precios de venta y compra efectivos en ventanilla física dependen de cada establecimiento financiero independiente y de la disponibilidad de divisas.
              </p>
              <p>
                El usuario es el único responsable de corroborar las cifras antes de firmar contratos comerciales o ejecutar operaciones cambiarias de gran escala.
              </p>
            </div>
          )}

        </div>

        {/* Pie del modal */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-colors"
          >
            Entendido y Aceptar
          </button>
        </div>

      </div>
    </div>
  );
};
