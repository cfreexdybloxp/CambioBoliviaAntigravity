import React, { useState } from 'react';
import { SUPPLIERS } from '../../data/suppliers';
import { 
  ShieldAlert, 
  CheckCircle2, 
  MapPin, 
  Phone
} from 'lucide-react';

export const SupplierDirectory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = [
    'Todos',
    'Textiles e Indumentaria Nueva',
    'Calzado y Cuero Nacional',
    'Artesanía y Confección',
    'Ferretería y Herramientas'
  ];

  const filteredSuppliers = SUPPLIERS.filter(
    s => selectedCategory === 'Todos' || s.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      
      {/* Encabezado */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          Directorio Comercial de Proveedores Formales y Precios Mayoristas
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Proveedores verificados con registro comercial en Bolivia para comercio lícito y formal.
        </p>
      </div>

      {/* Banner de Cumplimiento Normativo (Decreto Supremo Nº 28761) */}
      <div className="bg-amber-950/30 border border-amber-900/60 rounded-2xl p-5 text-xs text-amber-200 space-y-3">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-300 text-sm">
              Aviso Normativo Aduanero Obligatorio — Decreto Supremo Nº 28761
            </h4>
            <p className="leading-relaxed">
              En Bolivia, la importación y comercialización de <strong>prendería usada (ropa usada)</strong> está <strong>terminantemente prohibida</strong> por ley. La Aduana Nacional decomisa e inutiliza cualquier lote ilícito considerándolo contrabando con sanción penal.
            </p>
            <p className="leading-relaxed text-amber-300/90 font-medium">
              Por principios éticos y legales, <strong>Cambio Bolivia NO lista, NO promueve ni facilita</strong> contactos de ropa usada. Priorizamos exclusivamente confección textil boliviana nueva, calzado nacional e importación formal regulada.
            </p>
          </div>
        </div>
      </div>

      {/* Filtros por Categoría */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-3.5 py-2 rounded-xl whitespace-nowrap font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Proveedores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSuppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                  {supplier.category}
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Formal
                </span>
              </div>

              <h4 className="text-lg font-bold text-white mt-1">
                {supplier.name}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">{supplier.nitOrRegistry}</p>

              <p className="text-xs text-slate-300 my-4 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                {supplier.productDescription}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Pedido Mínimo:</span>
                  <span className="font-semibold text-slate-200">{supplier.minOrder}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Rango de Precios:</span>
                  <span className="font-semibold text-emerald-400">{supplier.priceRange}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{supplier.address} ({supplier.city}, {supplier.department})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <a href={`tel:${supplier.phone}`} className="hover:text-emerald-400 text-slate-300">
                    {supplier.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 flex justify-between items-center">
              <span>Fuente: {supplier.verificationSource}</span>
              <span>Auditado: {supplier.verifiedDate}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
