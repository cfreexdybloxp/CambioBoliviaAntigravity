import React, { useState } from 'react';
import { X, Building2, CheckCircle, AlertTriangle, Send } from 'lucide-react';

interface ExchangeHouseRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
}

export const ExchangeHouseRegistrationModal: React.FC<ExchangeHouseRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSubmitted
}) => {
  const [commercialName, setCommercialName] = useState('');
  const [legalName, setLegalName] = useState('');
  const [asfiLicense, setAsfiLicense] = useState('');
  const [department, setDepartment] = useState('La Paz');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [mapsUrl, setMapsUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [asfiComplianceOath, setAsfiComplianceOath] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!asfiComplianceOath) {
      setStatus('error');
      setErrorMessage('Es obligatorio aceptar la declaración jurada de cumplimiento normativo ASFI.');
      return;
    }

    if (!commercialName.trim() || !asfiLicense.trim() || !address.trim() || !city.trim()) {
      setStatus('error');
      setErrorMessage('Por favor completa todos los campos obligatorios (*).');
      return;
    }

    try {
      const newRequest = {
        id: `user-house-${Date.now()}`,
        commercialName: commercialName.trim(),
        legalName: legalName.trim() || commercialName.trim(),
        asfiLicense: asfiLicense.trim(),
        department,
        city: city.trim(),
        address: address.trim(),
        phone: phone.trim(),
        whatsapp: whatsapp.trim(),
        openingHours: openingHours.trim() || 'Lunes a Viernes 08:30 - 18:30',
        mapsUrl: mapsUrl.trim(),
        notes: notes.trim(),
        submittedAt: new Date().toISOString(),
        status: 'PENDIENTE_VERIFICACION'
      };

      // Persistir en localStorage
      const existing = JSON.parse(localStorage.getItem('cambio-bolivia-submitted-exchange-houses') || '[]');
      existing.push(newRequest);
      localStorage.setItem('cambio-bolivia-submitted-exchange-houses', JSON.stringify(existing));

      setStatus('success');
      setTimeout(() => {
        onClose();
        if (onSubmitted) onSubmitted();
      }, 2500);
    } catch {
      setStatus('error');
      setErrorMessage('Error al guardar la solicitud en su navegador.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transition-colors duration-200">
        
        {/* Cabecera del Modal */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Solicitar Registro de Casa de Cambio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Inclusión en el directorio y mapa tras comprobación con el registro público de ASFI.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {status === 'success' && (
            <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-3">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <div>
                <strong className="block font-bold">¡Solicitud recibida con éxito!</strong>
                Los datos se guardaron localmente y pasarán a revisión para contrastarse con la lista oficial de entidades supervisadas por ASFI.
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 rounded-xl bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nombre Comercial del Establecimiento *
              </label>
              <input
                type="text"
                required
                value={commercialName}
                onChange={(e) => setCommercialName(e.target.value)}
                placeholder="Ej. Casa de Cambio Los Andes"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Razón Social (según NIT / FUNDEMPRESA)
              </label>
              <input
                type="text"
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                placeholder="Ej. Servicios Cambiarios Los Andes S.A."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Nº de Resolución / Licencia ASFI o NIT *
              </label>
              <input
                type="text"
                required
                value={asfiLicense}
                onChange={(e) => setAsfiLicense(e.target.value)}
                placeholder="Ej. ASFI-DSC-029/2020 o NIT 1028394021"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Departamento *
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {['La Paz', 'Santa Cruz', 'Cochabamba', 'Oruro', 'Potosí', 'Chuquisaca', 'Tarija', 'Beni', 'Pando'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Ciudad / Municipio *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ej. La Paz (Zona San Pedro)"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Dirección Física Exacta *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej. Calle Mercado Nº 1050, Galería Comercial Local 5"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Teléfono Fijo / Celular
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ej. +591 2 2405060"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                WhatsApp de Atención al Cliente
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Ej. +591 76543210"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Horario de Atención al Público
            </label>
            <input
              type="text"
              value={openingHours}
              onChange={(e) => setOpeningHours(e.target.value)}
              placeholder="Ej. Lunes a Viernes 08:30 - 18:30 | Sábados 09:00 - 13:00"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Enlace de Ubicación (Google Maps u OpenStreetMap)
            </label>
            <input
              type="url"
              value={mapsUrl}
              onChange={(e) => setMapsUrl(e.target.value)}
              placeholder="https://maps.google.com/?q=..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Notas Adicionales / Monedas que comercia
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej. Especialistas en Dólares, Euros, Soles y Reales. Ventanilla con caja de seguridad."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Declaración Jurada Obligatoria */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={asfiComplianceOath}
                onChange={(e) => setAsfiComplianceOath(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-white">Declaración Jurada de Cumplimiento Normativo:</strong> Declaro que los datos proporcionados corresponden a un establecimiento cambiario que opera formalmente en Bolivia conforme a la Ley Nº 393 de Servicios Financieros, bajo supervisión de la ASFI y la Unidad de Investigaciones Financieras (UIF).
              </span>
            </label>
          </div>

          {/* Botones de Acción */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 transition-colors shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enviar Solicitud de Inclusión</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
