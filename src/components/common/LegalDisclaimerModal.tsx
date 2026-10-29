import React, { useState } from 'react';
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Cabecera del Modal */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Transparencia, Metodología y Marco Legal</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pestañas internas */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveSection('methodology')}
            className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeSection === 'methodology'
                ? 'border-emerald-500 text-emerald-400 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Metodología de Datos
          </button>
          <button
            onClick={() => setActiveSection('normative')}
            className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeSection === 'normative'
                ? 'border-emerald-500 text-emerald-400 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Marco Legal y DS 28761
          </button>
          <button
            onClick={() => setActiveSection('privacy')}
            className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeSection === 'privacy'
                ? 'border-emerald-500 text-emerald-400 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Privacidad (0 Rastreo)
          </button>
          <button
            onClick={() => setActiveSection('terms')}
            className={`px-4 py-3 font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeSection === 'terms'
                ? 'border-emerald-500 text-emerald-400 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Términos de Uso
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed">
          
          {activeSection === 'methodology' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Info className="w-4 h-4 text-emerald-400" />
                ¿Cómo recopilamos y auditamos los datos cambiarios?
              </h4>
              <p>
                <strong>1. Tipo de Cambio Oficial (TCO):</strong> Obtenido de las publicaciones diarias del Banco Central de Bolivia (BCB) en días hábiles financieros.
              </p>
              <p>
                <strong>2. Pizarras Comerciales:</strong> Referenciadas a partir de casas de cambio que cuentan con Licencia de Funcionamiento otorgada por la ASFI.
              </p>
              <p>
                <strong>3. Política de Antigüedad:</strong> Cada dato en la plataforma conserva su fecha efectiva de publicación. El sistema alerta visualmente si una cotización supera las 24 o 72 horas sin confirmación de actualización por parte del emisor.
              </p>
            </div>
          )}

          {activeSection === 'normative' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-400" />
                Cumplimiento del Decreto Supremo Nº 28761 y Ley General de Aduanas Nº 1990
              </h4>
              <p>
                El <strong>Decreto Supremo Nº 28761</strong> prohíbe de manera absoluta la internación y venta de ropa usada (prendería de segunda mano) en todo el territorio de Bolivia.
              </p>
              <p>
                <strong>Cambio Bolivia</strong> rechaza terminantemente cualquier facilitación o publicación de proveedores de ropa usada o mercancías ilícitas. Todas nuestras herramientas de costeo y directorios comerciales están orientados al fomento de la industria textil nacional, confección nueva, artesanía, cuero y comercio legal formal.
              </p>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" />
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
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-400" />
                Términos y Condiciones del Servicio
              </h4>
              <p>
                La información provista por Cambio Bolivia es de naturaleza estrictamente orientativa y educativa. Los precios de venta y compra efectivos en ventanilla física dependen de cada establecimiento financiero independiente y de la disponibilidad de divisas.
              </p>
              <p>
                El usuario es el único responsable de corroborar las cifras antes de firmar contratos comerciales o ejecutar operaciones cambiarias de gran escala.
              </p>
            </div>
          )}

        </div>

        {/* Pie del modal */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end">
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
