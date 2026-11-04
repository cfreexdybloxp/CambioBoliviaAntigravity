import React, { useState, useMemo, useEffect } from 'react';
import { EXCHANGE_HOUSES } from '../../data/exchangeHouses';
import { ExchangeHouseMap } from './ExchangeHouseMap';
import { ExchangeHouseRegistrationModal } from './ExchangeHouseRegistrationModal';
import { ExchangeHouse } from '../../types';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Search, 
  ExternalLink,
  PlusCircle
} from 'lucide-react';
import { formatDate } from '../../utils/dateFormatting';

export const ExchangeHouseDirectory: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedHouseId, setSelectedHouseId] = useState<string | undefined>(EXCHANGE_HOUSES[0]?.id);
  const [viewMode, setViewMode] = useState<'both' | 'list' | 'map'>('both');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [customHouses, setCustomHouses] = useState<ExchangeHouse[]>([]);

  // Cargar solicitudes locales enviadas por el usuario
  const loadCustomHouses = () => {
    try {
      const stored = localStorage.getItem('cambio-bolivia-submitted-exchange-houses');
      if (stored) {
        const parsed = JSON.parse(stored);
        const mapped: ExchangeHouse[] = parsed.map((item: any) => ({
          id: item.id,
          commercialName: item.commercialName,
          legalName: item.legalName,
          asfiLicense: item.asfiLicense,
          department: item.department as any,
          city: item.city,
          address: item.address,
          lat: -16.5000,
          lng: -68.1300,
          phone: item.phone,
          schedule: item.openingHours,
          publishedRates: {},
          lastVerifiedDate: item.submittedAt?.split('T')[0] || '2026-10-29',
          source: 'Solicitud ciudadana en proceso de verificación ASFI',
          verification: 'NO_VERIFICADO'
        }));
        setCustomHouses(mapped);
      }
    } catch {
      // Ignorar error si localStorage no está disponible
    }
  };

  useEffect(() => {
    loadCustomHouses();
  }, []);

  const allHouses = useMemo(() => {
    return [...EXCHANGE_HOUSES, ...customHouses];
  }, [customHouses]);

  const departments = ['Todos', ...Array.from(new Set(allHouses.map(h => h.department)))];

  const filteredHouses = useMemo(() => {
    return allHouses.filter((house) => {
      const matchesDept = selectedDepartment === 'Todos' || house.department === selectedDepartment;
      const matchesSearch = 
        house.commercialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.asfiLicense.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDept && matchesSearch;
    });
  }, [allHouses, selectedDepartment, searchTerm]);

  return (
    <div className="space-y-6">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Directorio de Casas de Cambio Autorizadas
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Establecimientos supervisados por la ASFI en Bolivia. Cada ficha cuenta con dirección física, horario y enlace de navegación GPS.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Botón para solicitar inclusión de una casa de cambio */}
          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="text-xs px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Solicitar Registro de Casa</span>
          </button>

          <a
            href="https://www.asfi.gob.bo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Verificar en ASFI</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm transition-colors">
        
        {/* Búsqueda por texto */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, calle o licencia..."
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filtro por Departamento */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`text-xs px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                selectedDepartment === dept
                  ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Toggle de Vista (solo desktop/tablet) */}
        <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-950 rounded-lg p-1 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setViewMode('both')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${viewMode === 'both' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Dividida
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Lista
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${viewMode === 'map' ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
          >
            Mapa
          </button>
        </div>

      </div>

      {/* Contenido Principal: Mapa y Lista */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Mapa Interactivo */}
        {(viewMode === 'both' || viewMode === 'map') && (
          <div className={viewMode === 'both' ? 'lg:col-span-6' : 'lg:col-span-12'}>
            <ExchangeHouseMap
              houses={filteredHouses}
              selectedHouseId={selectedHouseId}
              onSelectHouse={(house) => setSelectedHouseId(house.id)}
            />
          </div>
        )}

        {/* Listado de Casas */}
        {(viewMode === 'both' || viewMode === 'list') && (
          <div className={`space-y-4 ${viewMode === 'both' ? 'lg:col-span-6 max-h-[520px] overflow-y-auto pr-1' : 'lg:col-span-12'}`}>
            
            {filteredHouses.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                Ningún establecimiento coincide con el filtro. Prueba con otro departamento o limpia la búsqueda.
              </div>
            ) : (
              filteredHouses.map((house) => {
                const isSelected = house.id === selectedHouseId;
                return (
                  <div
                    key={house.id}
                    onClick={() => setSelectedHouseId(house.id)}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-50/50 dark:bg-slate-900 border-emerald-500 shadow-md ring-1 ring-emerald-500/40'
                        : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded">
                          {house.department}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                          {house.commercialName}
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{house.legalName}</span>
                      </div>
                      <span className="text-[10px] text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-2 py-1 rounded">
                        Lic. {house.asfiLicense}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 my-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                        <span>{house.address} ({house.city})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{house.schedule}</span>
                      </div>
                      {house.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <a href={`tel:${house.phone}`} className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium">
                            {house.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Pizarras Publicadas */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 text-xs">
                      {house.publishedRates.usdBuy && (
                        <span className="bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                          USD Compra: <strong className="text-slate-900 dark:text-white">Bs {house.publishedRates.usdBuy}</strong> | Venta: <strong className="text-emerald-600 dark:text-emerald-400">Bs {house.publishedRates.usdSell}</strong>
                        </span>
                      )}
                      {house.publishedRates.eurBuy && (
                        <span className="bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                          EUR: <strong className="text-slate-900 dark:text-white">Bs {house.publishedRates.eurBuy}</strong> / <strong className="text-emerald-600 dark:text-emerald-400">Bs {house.publishedRates.eurSell}</strong>
                        </span>
                      )}
                    </div>

                    {/* Acciones Rápidas: GPS y Verificación */}
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${house.lat},${house.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Navegar con GPS / Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <span className="text-[10px] text-slate-400 dark:text-slate-500">
                        {house.verification === 'VERIFICADO_FUENTE'
                          ? `Verificado: ${formatDate(house.lastVerifiedDate)}`
                          : 'Pendiente de verificación'}
                      </span>
                    </div>

                  </div>
                );
              })
            )}

          </div>
        )}

      </div>

      {/* Modal de Solicitud de Registro */}
      <ExchangeHouseRegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSubmitted={() => loadCustomHouses()}
      />

    </div>
  );
};
