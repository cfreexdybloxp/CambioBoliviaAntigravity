import React, { useState, useEffect } from 'react';
import { CurrencyCode, CommunityRateReport } from '../../types';
import { 
  getStoredReports, 
  submitCommunityReport, 
  moderateStoredReport 
} from '../../utils/communityReports';
import { 
  Users, 
  Send, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  XCircle 
} from 'lucide-react';
import { formatDate } from '../../utils/dateFormatting';

export const CommunityRatesPanel: React.FC = () => {
  const [reports, setReports] = useState<CommunityRateReport[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showAdminModeration, setShowAdminModeration] = useState<boolean>(false);

  // Estados del formulario
  const [establishmentName, setEstablishmentName] = useState<string>('');
  const [city, setCity] = useState<string>('La Paz');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [buyRate, setBuyRate] = useState<string>('12.08');
  const [sellRate, setSellRate] = useState<string>('12.15');
  const [declaredSource, setDeclaredSource] = useState<CommunityRateReport['declaredSource']>('Ventanilla física / Pizarra');
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    setReports(getStoredReports());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackMessage(null);

    const bRate = parseFloat(buyRate);
    const sRate = parseFloat(sellRate);

    const result = submitCommunityReport({
      establishmentName,
      city,
      currency,
      buyRate: bRate,
      sellRate: sRate,
      declaredSource
    });

    if (result.success) {
      setFeedbackMessage({
        type: 'success',
        text: 'Reporte enviado con éxito. Ha quedado registrado como PENDIENTE DE REVISIÓN para evitar datos erróneos.'
      });
      setEstablishmentName('');
      setReports(getStoredReports());
      setTimeout(() => setShowForm(false), 2500);
    } else {
      setFeedbackMessage({
        type: 'error',
        text: result.error || 'No se pudo procesar el reporte.'
      });
    }
  };

  const handleModerate = (id: string, newStatus: CommunityRateReport['status'], reason?: string) => {
    moderateStoredReport(id, newStatus, reason);
    setReports(getStoredReports());
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-6 transition-colors duration-200">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Reportes Colaborativos de la Comunidad y Moderación
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Transparencia con control de calidad: los reportes ciudadanos pasan por filtro de validación antes de considerarse referencia comprobada.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-md"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{showForm ? 'Cerrar Formulario' : 'Reportar Cotización'}</span>
          </button>
        </div>
      </div>

      {/* Formulario de Envío de Reporte */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-950/80 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Nuevo Reporte de Cotización en Ventanilla</h4>

          {feedbackMessage && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              feedbackMessage.type === 'success' 
                ? 'bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300'
            }`}>
              {feedbackMessage.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
              <span>{feedbackMessage.text}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Nombre del Establecimiento / Ubicación</label>
              <input
                type="text"
                required
                value={establishmentName}
                onChange={(e) => setEstablishmentName(e.target.value)}
                placeholder="Ej. Casa de Cambio Calle Colón"
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Ciudad y Zona</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ej. Santa Cruz (Centro)"
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Moneda Observada</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="USD">USD — Dólar</option>
                <option value="EUR">EUR — Euro</option>
                <option value="PEN">PEN — Sol Peruano</option>
                <option value="ARS">ARS — Peso Argentino</option>
                <option value="BRL">BRL — Real Brasileño</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Precio Compra de Ventanilla (Bs)</label>
              <input
                type="number"
                step="any"
                required
                value={buyRate}
                onChange={(e) => setBuyRate(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Precio Venta de Ventanilla (Bs)</label>
              <input
                type="number"
                step="any"
                required
                value={sellRate}
                onChange={(e) => setSellRate(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Fuente Declarada</label>
              <select
                value={declaredSource}
                onChange={(e) => setDeclaredSource(e.target.value as any)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Ventanilla física / Pizarra">Ventanilla física / Pizarra</option>
                <option value="Comprobante de compra">Comprobante de compra / Ticket</option>
                <option value="Sitio web oficial">Sitio web oficial</option>
                <option value="Consulta telefónica">Consulta telefónica</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              Enviar para Moderación
            </button>
          </div>
        </form>
      )}

      {/* Listado de Reportes Recientes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Últimas cotizaciones reportadas por usuarios en territorio nacional:</span>
          <button
            onClick={() => setShowAdminModeration(!showAdminModeration)}
            className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline"
          >
            {showAdminModeration ? 'Ocultar Panel de Moderación' : 'Modo Moderador'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report) => {
            const isVerified = report.status === 'VERIFICADO_PUBLICADO';
            const isPending = report.status === 'PENDIENTE_REVISION';
            const isRejected = report.status === 'RECHAZADO';

            return (
              <div
                key={report.id}
                className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white text-sm">{report.establishmentName}</h5>
                    <span className="text-slate-500 dark:text-slate-400">{report.city}</span>
                  </div>

                  {isVerified && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Verificado
                    </span>
                  )}
                  {isPending && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Pendiente de Revisión
                    </span>
                  )}
                  {isRejected && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> Desestimado
                    </span>
                  )}
                </div>

                <div className="flex gap-4 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800/80">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Compra ({report.currency}):</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">Bs {report.buyRate.toFixed(2)}</span>
                  </div>
                  <div className="border-l border-slate-200 dark:border-slate-800 pl-4">
                    <span className="text-slate-500 block text-[10px]">Venta ({report.currency}):</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">Bs {report.sellRate.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex justify-between items-center pt-1">
                  <span>Fuente: {report.declaredSource}</span>
                  <span>{formatDate(report.reportedAt)}</span>
                </div>

                {report.notes && (
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 italic">
                    Nota: {report.notes}
                  </p>
                )}

                {/* Acciones de Moderación Administrativa Local */}
                {showAdminModeration && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                    <button
                      onClick={() => handleModerate(report.id, 'VERIFICADO_PUBLICADO')}
                      className="px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-900/60 hover:bg-emerald-200 dark:hover:bg-emerald-800 text-emerald-800 dark:text-emerald-300 text-[10px] font-medium"
                    >
                      Aprobar (Verificado)
                    </button>
                    <button
                      onClick={() => handleModerate(report.id, 'RECHAZADO', 'Datos no coincidentes con pizarra ASFI')}
                      className="px-2 py-1 rounded bg-rose-100 dark:bg-rose-900/60 hover:bg-rose-200 dark:hover:bg-rose-800 text-rose-800 dark:text-rose-300 text-[10px] font-medium"
                    >
                      Rechazar
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
