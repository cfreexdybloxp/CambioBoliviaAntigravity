import React, { useState } from 'react';
import { Printer, FileSpreadsheet } from 'lucide-react';
import { formatCurrency } from '../../utils/financialMath';

export const CommercialProformaSheet: React.FC = () => {
  const [businessName, setBusinessName] = useState<string>('Comercial & Confecciones Bolivia');
  const [productName, setProductName] = useState<string>('Lote de Indumentaria Textil Algodón');
  const [quantity, setQuantity] = useState<string>('100');
  const [unitCost, setUnitCost] = useState<string>('85.50');
  const [unitSellingPrice, setUnitSellingPrice] = useState<string>('130.00');
  const [clientName, setClientName] = useState<string>('Cliente Mayorista / Distribución');
  const [proformaNumber] = useState<number>(() => Math.floor(1000 + Math.random() * 9000));

  const parsedQty = parseInt(quantity, 10) || 0;
  const parsedCost = parseFloat(unitCost) || 0;
  const parsedPrice = parseFloat(unitSellingPrice) || 0;

  const totalCost = parsedQty * parsedCost;
  const totalRevenue = parsedQty * parsedPrice;
  const totalProfit = totalRevenue - totalCost;
  const marginPercent = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(2) : '0';
  const markupPercent = totalCost > 0 ? ((totalProfit / totalCost) * 100).toFixed(2) : '0';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Barra de Controles y Botón de Impresión */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm print:hidden transition-colors">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Generador de Hoja de Costeo y Proforma Comercial Imprimible
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Genere un comprobante formal listo para imprimir o guardar como PDF para sus socios, clientes o archivo interno.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir / Guardar en PDF</span>
        </button>
      </div>

      {/* Inputs de Edición Rápida */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 rounded-xl grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs print:hidden shadow-sm">
        <div>
          <label className="text-slate-600 dark:text-slate-400 block mb-1">Nombre de su Negocio</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-slate-600 dark:text-slate-400 block mb-1">Descripción del Producto</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-slate-600 dark:text-slate-400 block mb-1">Destinatario / Cliente</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-slate-600 dark:text-slate-400 block mb-1">Cantidad (uds)</label>
          <input
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="1"
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-slate-600 dark:text-slate-400 block mb-1">Costo Unitario (Bs)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={unitCost}
            onChange={(e) => setUnitCost(e.target.value)}
            placeholder="0.00"
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-slate-600 dark:text-slate-400 block mb-1">Precio Venta (Bs)</label>
          <input
            type="number"
            min="0"
            step="any"
            value={unitSellingPrice}
            onChange={(e) => setUnitSellingPrice(e.target.value)}
            placeholder="0.00"
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-emerald-700 dark:text-emerald-400 font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* ── HOJA FORMAL PROFORMA (Lista para imprimir en blanco/negro o color) ── */}
      <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl max-w-4xl mx-auto print:border-none print:shadow-none print:p-0 print:max-w-none">
        
        {/* Cabecera de la Proforma */}
        <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex flex-col w-6 h-6 rounded overflow-hidden border border-slate-300">
                <div className="h-1/3 bg-[#D52B1E]"></div>
                <div className="h-1/3 bg-[#F9D616]"></div>
                <div className="h-1/3 bg-[#007934]"></div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">{businessName}</span>
            </div>
            <p className="text-xs text-slate-500">Documento de Cotización y Análisis de Costeo Comercial</p>
            <p className="text-xs text-slate-500">Estado Plurinacional de Bolivia</p>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">PROFORMA Nº</span>
            <span className="text-2xl font-black text-slate-900">#BOL-{proformaNumber}</span>
            <span className="text-xs text-slate-500 block mt-1">Fecha: {new Date().toLocaleDateString('es-BO', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Datos del Cliente y Mercancía */}
        <div className="grid grid-cols-2 gap-6 mb-8 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <span className="text-slate-400 font-bold uppercase block mb-1">CLIENTE / DESTINATARIO:</span>
            <span className="text-sm font-bold text-slate-900">{clientName}</span>
          </div>
          <div>
            <span className="text-slate-400 font-bold uppercase block mb-1">CONDICIONES COMERCIALES:</span>
            <span className="text-sm font-semibold text-slate-800">Contado / Moneda Nacional (Bs)</span>
          </div>
        </div>

        {/* Tabla de Artículos */}
        <table className="w-full text-xs text-left border-collapse mb-8">
          <thead>
            <tr className="border-b-2 border-slate-300 text-slate-600 uppercase font-bold text-[11px]">
              <th className="py-2.5">Detalle / Producto</th>
              <th className="py-2.5 text-center">Cantidad</th>
              <th className="py-2.5 text-right">Precio Unitario (Bs)</th>
              <th className="py-2.5 text-right">Total Comercial (Bs)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr>
              <td className="py-4">
                <span className="font-bold text-slate-900 text-sm block">{productName}</span>
                <span className="text-slate-500 text-[11px]">Mercancía lícita nacional / formalizada</span>
              </td>
              <td className="py-4 text-center font-bold text-slate-800 text-sm">{parsedQty}</td>
              <td className="py-4 text-right font-medium text-slate-800 text-sm">{formatCurrency(parsedPrice, 'BOB')}</td>
              <td className="py-4 text-right font-bold text-slate-900 text-sm">{formatCurrency(totalRevenue, 'BOB')}</td>
            </tr>
          </tbody>
        </table>

        {/* Totales y Margen */}
        <div className="flex justify-end mb-8">
          <div className="w-full sm:w-1/2 space-y-2 text-xs border-t border-slate-300 pt-4">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal Cotizado:</span>
              <span className="font-semibold text-slate-900">{formatCurrency(totalRevenue, 'BOB')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Costo Estimado de Adquisición:</span>
              <span className="text-slate-700">{formatCurrency(totalCost, 'BOB')}</span>
            </div>
            <div className="flex justify-between border-t border-slate-300 pt-2 text-base font-black text-slate-900">
              <span>TOTAL COTIZADO:</span>
              <span className="text-emerald-700">{formatCurrency(totalRevenue, 'BOB')}</span>
            </div>
          </div>
        </div>

        {/* Resumen Interno de Rentabilidad (Solo si se desea para control interno) */}
        <div className="bg-slate-100 p-4 rounded-xl text-xs text-slate-600 space-y-1 mb-8 border border-slate-200">
          <span className="font-bold uppercase text-[10px] tracking-wider text-slate-500 block">ANÁLISIS INTERNO DE COSTEO:</span>
          <div className="grid grid-cols-3 gap-2 pt-1 font-semibold text-slate-800">
            <span>Utilidad Bruta: <strong>{formatCurrency(totalProfit, 'BOB')}</strong></span>
            <span>Margen Real: <strong>{marginPercent}%</strong></span>
            <span>Markup: <strong>{markupPercent}%</strong></span>
          </div>
        </div>

        {/* Firma y Validez */}
        <div className="pt-8 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500">
          <div>
            <p>Validez de la oferta: 15 días calendario.</p>
            <p>Generado a través de Cambio Bolivia (Plataforma Financiera Independiente).</p>
          </div>
          <div className="text-center w-48 border-t border-slate-400 pt-1">
            <span className="font-semibold text-slate-700 block">Firma / Sello Responsable</span>
          </div>
        </div>

      </div>

    </div>
  );
};
