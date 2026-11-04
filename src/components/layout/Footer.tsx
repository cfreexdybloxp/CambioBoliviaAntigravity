import React from 'react';
import { Shield, ExternalLink, Scale } from 'lucide-react';

interface FooterProps {
  onOpenLegalModal?: (section: 'terms' | 'privacy' | 'methodology' | 'normative') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal }) => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-sm mt-16 print:hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Columna 1: Identidad y Misión */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex flex-col w-5 h-5 rounded overflow-hidden shadow-sm border border-slate-300 dark:border-slate-700">
                <div className="h-1/3 bg-bolivia-red"></div>
                <div className="h-1/3 bg-bolivia-yellow"></div>
                <div className="h-1/3 bg-bolivia-green"></div>
              </div>
              <span className="font-bold text-slate-900 dark:text-white text-base">Cambio Bolivia</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Plataforma independiente dedicada a la transparencia cambiaria, formalización del comercio y educación financiera en Bolivia.
            </p>
            <div className="pt-2 text-xs text-slate-400 dark:text-slate-500">
              Operación con costo cero (0 Bs). Los datos se muestran con su fuente y su fecha.
            </div>
          </div>

          {/* Columna 2: Fuentes Primarias Oficiales */}
          <div className="space-y-3">
            <h4 className="text-slate-800 dark:text-white text-xs font-semibold uppercase tracking-wider">Fuentes Oficiales</h4>
            <ul className="space-y-2 text-xs">
              {[
                { href: 'https://www.bcb.gob.bo/', label: 'Banco Central de Bolivia (BCB)' },
                { href: 'https://www.asfi.gob.bo/', label: 'ASFI — Entidades Supervisadas' },
                { href: 'https://www.aduana.gob.bo/', label: 'Aduana Nacional de Bolivia (ANB)' },
                { href: 'https://www.openstreetmap.org/', label: 'Cartografía © OpenStreetMap' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors"
                  >
                    {label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Marco Legal Boliviano */}
          <div className="space-y-3">
            <h4 className="text-slate-800 dark:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              Marco Legal Boliviano
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              En cumplimiento del <strong className="text-slate-700 dark:text-slate-200">Decreto Supremo Nº 28761</strong> (Art. 3) y la <strong className="text-slate-700 dark:text-slate-200">Ley Nº 1990</strong>, la importación de prendería usada está prohibida desde el 21/04/2007 y su comercialización desde el 01/03/2008. Este portal no incluye ni asesora sobre esa mercancía.
            </p>
            {onOpenLegalModal && (
              <button
                onClick={() => onOpenLegalModal('normative')}
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline block pt-1"
              >
                Ver detalles normativos ↗
              </button>
            )}
          </div>

          {/* Columna 4: Transparencia y Privacidad */}
          <div className="space-y-3">
            <h4 className="text-slate-800 dark:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Transparencia y Privacidad
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Las cotizaciones y cálculos son de carácter orientativo. Todos los cálculos se realizan localmente en su navegador sin rastreo invasivo.
            </p>
            {onOpenLegalModal && (
              <div className="flex flex-col gap-1 text-xs pt-1">
                <button
                  onClick={() => onOpenLegalModal('methodology')}
                  className="text-left text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Metodología de datos cambiarios ↗
                </button>
                <button
                  onClick={() => onOpenLegalModal('privacy')}
                  className="text-left text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Política de privacidad (0 rastreo) ↗
                </button>
                <button
                  onClick={() => onOpenLegalModal('terms')}
                  className="text-left text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Términos y condiciones ↗
                </button>
              </div>
            )}
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Cambio Bolivia. Datos abiertos, cálculos transparentes y soberanía financiera.</p>
          <p className="flex items-center gap-1">
            Hecho con rigor para el pueblo boliviano 🇧🇴
          </p>
        </div>
      </div>
    </footer>
  );
};
