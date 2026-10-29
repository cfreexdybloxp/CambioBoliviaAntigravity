import React, { useState } from 'react';
import { SUPPLIERS } from '../../data/suppliers';
import { Supplier } from '../../types';
import { 
  ShieldAlert, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  PlusCircle, 
  X, 
  Check, 
  Building2 
} from 'lucide-react';

export const SupplierDirectory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [customSuppliers, setCustomSuppliers] = useState<Supplier[]>([]);

  // Formulario de nuevo proveedor
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<Supplier['category']>('Textiles e Indumentaria Nueva');
  const [city, setCity] = useState<string>('');
  const [department, setDepartment] = useState<string>('La Paz');
  const [address, setAddress] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [minOrder, setMinOrder] = useState<string>('20 unidades');
  const [priceRange, setPriceRange] = useState<string>('Bs 50 - Bs 100');
  const [phone, setPhone] = useState<string>('+591 ');
  const [nitOrRegistry, setNitOrRegistry] = useState<string>('NIT ');
  const [acceptedLegalNotice, setAcceptedLegalNotice] = useState<boolean>(false);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);

  const categories = [
    'Todos',
    'Textiles e Indumentaria Nueva',
    'Calzado y Cuero Nacional',
    'Artesanía y Confección',
    'Ferretería y Herramientas'
  ];

  const allSuppliers = [...SUPPLIERS, ...customSuppliers];

  const filteredSuppliers = allSuppliers.filter(
    s => selectedCategory === 'Todos' || s.category === selectedCategory
  );

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedLegalNotice) {
      alert('Debe aceptar la declaración jurada de cumplimiento del Decreto Supremo Nº 28761.');
      return;
    }

    const newSupplier: Supplier = {
      id: `supp-custom-${Date.now()}`,
      name,
      category,
      department,
      city,
      address,
      productDescription,
      minOrder,
      priceRange,
      phone,
      nitOrRegistry,
      isLegalAndCompliant: true,
      verificationSource: 'Declaración Jurada Formal (En proceso de auditoría SEPREC)',
      verifiedDate: new Date().toISOString().split('T')[0]
    };

    setCustomSuppliers(prev => [newSupplier, ...prev]);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setShowRegisterModal(false);
      setName('');
      setAddress('');
      setProductDescription('');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Directorio Comercial de Proveedores Formales y Precios Mayoristas
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Proveedores verificados con registro comercial en Bolivia para comercio lícito y formal.
          </p>
        </div>

        <button
          onClick={() => setShowRegisterModal(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-md self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Registrar mi Empresa Formal</span>
        </button>
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

      {/* Modal de Registro de Proveedor Formal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Solicitud de Registro de Proveedor Formal</h3>
              </div>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
              
              {formSuccess && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Registro recibido exitosamente. Se ha incorporado a su sesión para verificación.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Razón Social o Nombre Comercial</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Confecciones Illimani S.R.L."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">NIT / Matrícula SEPREC</label>
                  <input
                    type="text"
                    required
                    value={nitOrRegistry}
                    onChange={(e) => setNitOrRegistry(e.target.value)}
                    placeholder="NIT 1029384019"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Rubro / Categoría</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    <option value="Textiles e Indumentaria Nueva">Textiles e Indumentaria Nueva</option>
                    <option value="Calzado y Cuero Nacional">Calzado y Cuero Nacional</option>
                    <option value="Artesanía y Confección">Artesanía y Confección</option>
                    <option value="Ferretería y Herramientas">Ferretería y Herramientas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Departamento</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    {['La Paz', 'Santa Cruz', 'Cochabamba', 'Oruro', 'Potosí', 'Tarija', 'Chuquisaca', 'Beni', 'Pando'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Dirección Física de Venta o Taller</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Calle, Número, Zona o Parque Industrial"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Descripción de Productos Mayoristas</label>
                <textarea
                  required
                  rows={3}
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Detalle tipo de prendas, tejidos, telas o manufactura..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Pedido Mínimo Mayorista</label>
                  <input
                    type="text"
                    required
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    placeholder="Ej. 12 unidades / 1 docena"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Rango Estimado de Precios</label>
                  <input
                    type="text"
                    required
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    placeholder="Ej. Bs 40 - Bs 85"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Teléfono o WhatsApp Comercial</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Ciudad o Municipio</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ej. El Alto / Montero / Quillacollo"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              {/* Declaración Jurada Obligatoria */}
              <div className="p-4 bg-slate-950 rounded-xl border border-amber-900/60 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    required
                    checked={acceptedLegalNotice}
                    onChange={(e) => setAcceptedLegalNotice(e.target.checked)}
                    className="mt-0.5 accent-emerald-500 rounded"
                  />
                  <span>
                    <strong className="text-amber-300">Declaración Jurada Normativa:</strong> Declaro formalmente que todos los artículos ofrecidos son <strong className="text-white">nuevos, de confección lícita</strong> y que mi empresa <strong className="text-rose-400">NO comercializa prendería usada</strong>, en estricto cumplimiento del Decreto Supremo Nº 28761 y la Ley Nº 1990 de Aduanas.
                  </span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
                >
                  Enviar Registro
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
