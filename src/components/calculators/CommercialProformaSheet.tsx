import React, { useState } from 'react';
import { Printer, FileText } from 'lucide-react';
import { formatCurrency } from '../../utils/financialMath';

export const CommercialProformaSheet: React.FC = () => {
  const [businessName, setBusinessName] = useState<string>('Comercial & Confecciones Bolivia');
  const [productName, setProductName] = useState<string>('Lote de Indumentaria Textil Algodón');
  const [quantity, setQuantity] = useState<number>(100);
  const [unitCost, setUnitCost] = useState<number>(85.50);
  const [unitSellingPrice, setUnitSellingPrice] = useState<number>(130.00);
  const [clientName, setClientName] = useState<string>('Cliente Mayorista / Distribución');

  const totalCost = quantity * unitCost;
  const totalRevenue = quantity * unitSellingPrice;
  const totalProfit = totalRevenue - totalCost;
  const marginPercent = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(2) : '0';
  const markupPercent = totalCost > 0 ? ((totalProfit / totalCost) * 100).toFixed(2) : '0';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Barra de Controles y Botón de Impresión */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-xl print:hidden">
        <div>
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            Generador de Hoja de Costeo y Proforma Comercial Imprimible
          </h4>
          <p className="text-xs text-slate-400">
            Genere un comprobante formal listo para imprimir o guardar como PDF para sus socios, clientes o archivo interno.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-950/40"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir / Guardar en PDF</span>
        </button>
      </div>

      {/* Inputs de Edición Rápida */}
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs print:hidden">
        <div>
          <label className="text-slate-400 block mb-1">Nombre de su Negocio</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-1">Descripción del Producto</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-1">Destinatario / Cliente</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-1">Cantidad (uds)</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-1">Costo Unit. (Bs)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={unitCost}
            onChange={(e) => setUnitCost(parseFloat(e.target.value) || 0)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
          />
        </div>
        <div>
          <label className="text-slate-400 block mb-1">Precio Venta (Bs)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={unitSellingPrice}
            onChange={(e) => setUnitSellingPrice(parseFloat(e.target.value) || 0)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white"
          />
        </div>
      </div>

      {/* Hoja de Proforma Formal (Optimizada para pantalla e impresión A4) */}
      <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-200 max-w-4xl mx-auto print:shadow-none print:border-none print:p-0">
        
        {/* Cabecera Proforma */}
        <div className="flex justify-between items-start border-b border-slate-300 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col w-6 h-6 rounded overflow-hidden border border-slate-400">
                <div className="h-1/3 bg-bolivia-red"></div>
                <div className="h-1/3 bg-bolivia-yellow"></div>
                <div className="h-1/3 bg-bolivia-green"></div>
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{businessName}</h2>
            </div>
            <p className="text-xs text-slate-600 mt-1">Hoja de Liquidación de Costos y Proforma Comercial</p>
            <p className="text-xs text-slate-500">Fecha de emisión: {new Date().toLocaleDateString('es-BO')}</p>
          </div>

          <div className="text-right">
            <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">Documento Referencial</span>
            <div className="text-lg font-black text-slate-900 mt-0.5">PROFORMA #{Math.floor(1000 + Math.random() * 9000)}</div>
            <span className="text-[10px] text-slate-500">Emitido vía Cambio Bolivia</span>
          </div>
        </div>

        {/* Cliente y Condiciones */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-xs grid grid-cols-2 gap-4">
          <div>
            <span className="text-slate-500 block">Cliente / Solicitante:</span>
            <span className="font-bold text-slate-900 text-sm">{clientName}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Moneda de Liquidación:</span>
            <span className="font-bold text-slate-900 text-sm">Bolivianos (BOB)</span>
          </div>
        </div>

        {/* Tabla de Detalle Comercial */}
        <table className="w-full text-xs text-left mb-6 border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-300 text-slate-700 uppercase font-semibold">
              <th className="py-2.5">Ítem / Detalle</th>
              <th className="py-2.5 text-center">Cantidad</th>
              <th className="py-2.5 text-right">Costo Unit. (Bs)</th>
              <th className="py-2.5 text-right">Precio Venta Unit. (Bs)</th>
              <th className="py-2.5 text-right">Subtotal Venta (Bs)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-slate-800">
            <tr>
              <td className="py-3 font-medium">{productName}</td>
              <td className="py-3 text-center">{quantity} uds.</td>
              <td className="py-3 text-right">{formatCurrency(unitCost, 'BOB')}</td>
              <td className="py-3 text-right font-bold text-slate-900">{formatCurrency(unitSellingPrice, 'BOB')}</td>
              <td className="py-3 text-right font-extrabold text-slate-900">{formatCurrency(totalRevenue, 'BOB')}</td>
            </tr>
          </tbody>
        </table>

        {/* Resumen Financiero y Rentabilidad */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t-2 border-slate-300">
          
          <div className="space-y-1 text-xs text-slate-600">
            <h5 className="font-bold text-slate-900 uppercase text-[11px]">Indicadores de Rentabilidad:</h5>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span>Margen Bruto de Ganancia:</span>
              <strong className="text-slate-900">{marginPercent}%</strong>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span>Recargo sobre el Costo (*Markup*):</span>
              <strong className="text-slate-900">{markupPercent}%</strong>
            </div>
            <div className="flex justify-between py-1">
              <span>Utilidad Bruta Estimada:</span>
              <strong className="text-emerald-700 font-bold">{formatCurrency(totalProfit, 'BOB')}</strong>
            </div>
          </div>

          <div className="bg-slate-100 p-4 rounded-xl space-y-2 text-right">
            <div className="text-xs text-slate-600">Total Inversión de Costo: {formatCurrency(totalCost, 'BOB')}</div>
            <div className="text-sm font-semibold text-slate-700">Total Proforma Facturación:</div>
            <div className="text-3xl font-black text-slate-900">{formatCurrency(totalRevenue, 'BOB')}</div>
          </div>

        </div>

        {/* Descargo y Validez */}
        <div className="mt-8 pt-4 border-t border-slate-200 text-[10px] text-slate-500 flex justify-between items-center">
          <span>Esta liquidación comercial fue calculada mediante la plataforma Cambio Bolivia (cambiobolivia.pages.dev).</span>
          <span>Vigencia referencial: 15 días calendario</span>
        </div>

      </div>

    </div>
  );
};
