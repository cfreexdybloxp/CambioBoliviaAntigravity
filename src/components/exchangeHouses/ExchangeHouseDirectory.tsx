import React, { useState, useMemo } from 'react';
import { EXCHANGE_HOUSES } from '../../data/exchangeHouses';
import { ExchangeHouseMap } from './ExchangeHouseMap';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Search, 
  ExternalLink
} from 'lucide-react';
import { formatDate } from '../../utils/dateFormatting';

export const ExchangeHouseDirectory: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedHouseId, setSelectedHouseId] = useState<string | undefined>(EXCHANGE_HOUSES[0]?.id);
  const [viewMode, setViewMode] = useState<'both' | 'list' | 'map'>('both');

  const departments = ['Todos', ...Array.from(new Set(EXCHANGE_HOUSES.map(h => h.department)))];

  const filteredHouses = useMemo(() => {
    return EXCHANGE_HOUSES.filter((house) => {
      const matchesDept = selectedDepartment === 'Todos' || house.department === selectedDepartment;
      const matchesSearch = 
        house.commercialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        house.asfiLicense.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDept && matchesSearch;
    });
  }, [selectedDepartment, searchTerm]);

  return (
    <div className="space-y-6">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Directorio de Casas de Cambio Autorizadas
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Solo establecimientos que podamos contrastar con el registro público de ASFI. Cada ficha indica su fuente y fecha de verificación.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <a
            href="https://www.asfi.gob.bo/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verificar Registro ASFI</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>
      </div>

      {/* Estado vacío: directorio sin registros contrastados */}
      {EXCHANGE_HOUSES.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-10 space-y-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">
                Todavía no publicamos fichas: no tenemos datos contrastados
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Preferimos un directorio vacío a uno con direcciones, licencias o precios que no podamos
                respaldar. Para cada establecimiento exigimos que figure en el registro de entidades
                supervisadas por ASFI y citamos la fuente con su fecha de consulta.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                ASFI tampoco publica, hasta donde pudimos comprobar, una fuente automatizable con las
                pizarras de compra y venta de cada casa de cambio. Por eso aquí no verás cotizaciones de
                ventanilla presentadas como si fueran en tiempo real.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://www.asfi.gob.bo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
            >
              Consultar entidades supervisadas en ASFI
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.bcb.gob.bo/?q=cotizaciones_tc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              Ver tabla de cotizaciones del BCB
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {EXCHANGE_HOUSES.length > 0 && (
        <>
      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Búsqueda por texto */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre, calle o licencia..."
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Toggle de Vista (solo desktop/tablet) */}
        <div className="hidden lg:flex items-center bg-slate-950 rounded-lg p-1 border border-slate-800">
          <button
            onClick={() => setViewMode('both')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${viewMode === 'both' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Dividida
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${viewMode === 'list' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            Lista
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${viewMode === 'map' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
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
          <div className={`space-y-4 ${viewMode === 'both' ? 'lg:col-span-6 max-h-[450px] overflow-y-auto pr-1' : 'lg:col-span-12'}`}>
            
            {filteredHouses.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-400 text-sm">
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
                        ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500/40'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                          {house.department}
                        </span>
                        <h4 className="text-base font-bold text-white mt-1">
                          {house.commercialName}
                        </h4>
                        <span className="text-xs text-slate-400">{house.legalName}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 bg-slate-950 border border-slate-800 px-2 py-1 rounded">
                        Lic. {house.asfiLicense}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 my-3">
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
                          <a href={`tel:${house.phone}`} className="hover:text-emerald-400">
                            {house.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Pizarras Publicadas */}
                    <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-2 text-xs">
                      {house.publishedRates.usdBuy && (
                        <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                          USD Compra: <strong className="text-white">Bs {house.publishedRates.usdBuy}</strong> | Venta: <strong className="text-emerald-400">Bs {house.publishedRates.usdSell}</strong>
                        </span>
                      )}
                      {house.publishedRates.eurBuy && (
                        <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                          EUR: <strong className="text-white">Bs {house.publishedRates.eurBuy}</strong> / <strong className="text-emerald-400">Bs {house.publishedRates.eurSell}</strong>
                        </span>
                      )}
                    </div>

                    {/* Acciones Rápidas: GPS y Llamada */}
                    <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${house.lat},${house.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Abrir en GPS / Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <span className="text-[10px] text-slate-500">
                        {house.verification === 'VERIFICADO_FUENTE'
                          ? `Verificado: ${formatDate(house.lastVerifiedDate)}`
                          : 'Sin verificar'}
                      </span>
                    </div>

                  </div>
                );
              })
            )}

          </div>
        )}

      </div>
        </>
      )}

    </div>
  );
};
