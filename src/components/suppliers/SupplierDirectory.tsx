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
  Building2,
  Clock,
  Info,
  ExternalLink
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
      verification: 'NO_VERIFICADO',
      verificationSource: 'Declaración del propio proveedor. No comprobada por Cambio Bolivia.',
      verifiedDate: ''
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
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Directorio Comercial de Proveedores Formales
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Red de fabricantes y distribuidores legales en Bolivia. Confección nacional, materias primas y comercio regulado.
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
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-5 text-xs text-amber-900 dark:text-amber-200 space-y-3 transition-colors">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-800 dark:text-amber-300 text-sm">
              Aviso Normativo Aduanero Obligatorio — Decreto Supremo Nº 28761
            </h4>
            <p className="leading-relaxed">
              En Bolivia, la importación de <strong>prendería usada (ropa usada)</strong> está prohibida desde el
              21/04/2007 y su comercialización desde el 01/03/2008 (Decreto Supremo Nº 28761, Artículo 3). La
              Aduana Nacional decomisa cualquier internación ilegal.
            </p>
            <p className="leading-relaxed text-amber-800 dark:text-amber-300/90 font-medium">
              Por principios éticos y legales, <strong>Cambio Bolivia NO lista, NO promueve ni facilita</strong> contactos
              de ropa usada. Priorizamos confección textil boliviana nueva, calzado nacional e importación formal regulada.
            </p>
            <a
              href="https://www.lexivox.org/norms/BO-DS-28761.xhtml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-300 hover:underline font-semibold"
            >
              Leer el texto del DS 28761 en LexiVox ↗
              <ExternalLink className="w-3 h-3" />
            </a>
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
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Proveedores */}
      {filteredSuppliers.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-10 space-y-3 shadow-sm transition-colors">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {allSuppliers.length === 0
                  ? 'Directorio en proceso de curación y homologación'
                  : 'Ningún proveedor coincide con esta categoría'}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Para garantizar la seguridad de su dinero, no publicamos empresas sin contrastar su NIT o matrícula comercial ante el Servicio Plurinacional de Registro de Comercio (SEPREC). Puedes registrar tu empresa haciendo clic en el botón superior.
              </p>
            </div>
          </div>
          <a
            href="https://www.seprec.gob.bo/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
          >
            Consultar el registro de comercio en SEPREC ↗
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded">
                    {supplier.category}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded flex items-center gap-1">
                    {supplier.verification === 'VERIFICADO_FUENTE' ? (
                      <><CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Verificado</>
                    ) : (
                      <><Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Sin verificar</>
                    )}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {supplier.name}
                </h3>
                <span className="text-xs text-slate-500">{supplier.nitOrRegistry}</span>

                <p className="text-xs text-slate-600 dark:text-slate-300 my-3 leading-relaxed">
                  {supplier.productDescription}
                </p>

                <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400 py-2 border-y border-slate-100 dark:border-slate-800/80 my-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{supplier.address} ({supplier.city}, {supplier.department})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Pedido mínimo: <strong>{supplier.minOrder}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">$</span>
                    <span>Rango estimado: <strong className="text-slate-800 dark:text-slate-200">{supplier.priceRange}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <a
                  href={`tel:${supplier.phone}`}
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{supplier.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Registro de Proveedor */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl transition-colors">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Registrar Proveedor Formal en Directorio</h3>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formSuccess && (
              <div className="p-3 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>¡Empresa registrada con éxito en su navegador local!</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold">Nombre o Razón Social *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Confecciones Illimani SRL"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold">Categoría *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Textiles e Indumentaria Nueva">Textiles e Indumentaria Nueva</option>
                    <option value="Calzado y Cuero Nacional">Calzado y Cuero Nacional</option>
                    <option value="Artesanía y Confección">Artesanía y Confección</option>
                    <option value="Ferretería y Herramientas">Ferretería y Herramientas</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold">Departamento *</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {['La Paz', 'Santa Cruz', 'Cochabamba', 'Oruro', 'Potosí', 'Chuquisaca', 'Tarija', 'Beni', 'Pando'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold">Ciudad / Municipio *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ej. El Alto"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold">NIT o Matrícula SEPREC *</label>
                  <input
                    type="text"
                    required
                    value={nitOrRegistry}
                    onChange={(e) => setNitOrRegistry(e.target.value)}
                    placeholder="NIT 1020304050"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold">Dirección del Taller / Almacén *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ej. Av. Juan Pablo II Nº 450"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold">Descripción de Productos *</label>
                <textarea
                  rows={2}
                  required
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Ej. Confección de poleras de algodón 100%, buzos deportivos y uniformes corporativos."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold">Pedido Mínimo Mayorista</label>
                  <input
                    type="text"
                    value={minOrder}
                    onChange={(e) => setMinOrder(e.target.value)}
                    placeholder="Ej. 12 unidades"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold">Rango de Precios</label>
                  <input
                    type="text"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    placeholder="Ej. Bs 35 - Bs 70"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300 block mb-1 font-semibold">Teléfono / WhatsApp de Ventas *</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+591 76543210"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Declaración Jurada Obligatoria DS 28761 */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl space-y-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={acceptedLegalNotice}
                    onChange={(e) => setAcceptedLegalNotice(e.target.checked)}
                    className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-[11px] text-amber-900 dark:text-amber-200 leading-tight">
                    <strong className="block text-slate-900 dark:text-white">Declaración Jurada DS 28761:</strong> Declaro formalmente que todos los artículos que comercializo son de confección nueva o lícita nacionalización, y que bajo ninguna circunstancia incluyo prendería usada, mercancía prohibida o contrabando.
                  </span>
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-md"
                >
                  Registrar Empresa
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
