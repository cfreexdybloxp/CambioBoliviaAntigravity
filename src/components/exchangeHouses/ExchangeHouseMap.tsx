import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { ExchangeHouse } from '../../types';

interface ExchangeHouseMapProps {
  houses: ExchangeHouse[];
  selectedHouseId?: string;
  onSelectHouse: (house: ExchangeHouse) => void;
}

export const ExchangeHouseMap: React.FC<ExchangeHouseMapProps> = ({
  houses,
  selectedHouseId,
  onSelectHouse
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Centro geográfico aproximado de Bolivia
      const map = L.map(mapContainerRef.current, {
        center: [-16.5, -65.0],
        zoom: 6,
        scrollWheelZoom: false,
      });

      // Capa de OpenStreetMap (0 Bs, Open Source)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Limpiar marcadores anteriores
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Crear icono personalizado en SVG puro
    const defaultIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<div style="background-color: #059669; width: 26px; height: 26px; border-radius: 50%; border: 2px solid #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: bold;">Bs</div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 13],
    });

    const activeIcon = L.divIcon({
      className: 'custom-map-pin-active',
      html: `<div style="background-color: #d97706; width: 32px; height: 32px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 6px 12px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 14px; font-weight: bold;">★</div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    // Añadir marcadores
    houses.forEach(house => {
      const isSelected = house.id === selectedHouseId;
      const marker = L.marker([house.lat, house.lng], {
        icon: isSelected ? activeIcon : defaultIcon
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: system-ui, -apple-system, sans-serif; font-size: 12px; line-height: 1.4; min-width: 180px;">
          <strong style="font-size: 13px; color: #059669; display: block; margin-bottom: 2px;">${house.commercialName}</strong>
          <span style="color: #64748b; font-size: 11px;">${house.address} (${house.city})</span><br/>
          <span style="display: inline-block; background-color: #ecfdf5; color: #065f46; font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px; margin-top: 4px; border: 1px solid #a7f3d0;">
            Licencia ASFI: ${house.asfiLicense}
          </span>
          <div style="margin-top: 6px; border-top: 1px solid #e2e8f0; padding-top: 4px; font-size: 11px;">
            <span><strong>Dólar compra:</strong> Bs ${house.publishedRates.usdBuy || '-'} | <strong>Venta:</strong> Bs ${house.publishedRates.usdSell || '-'}</span>
          </div>
          <div style="margin-top: 4px;">
            <a href="https://www.google.com/maps/search/?api=1&query=${house.lat},${house.lng}" target="_blank" rel="noopener noreferrer" style="color: #059669; text-decoration: underline; font-weight: bold; font-size: 11px;">
              Abrir en Google Maps ↗
            </a>
          </div>
        </div>
      `);

      marker.on('click', () => {
        onSelectHouse(house);
      });

      markersRef.current.push(marker);
    });

    // Centrar mapa según selección o límites de marcadores
    if (selectedHouseId) {
      const selected = houses.find(h => h.id === selectedHouseId);
      if (selected) {
        map.setView([selected.lat, selected.lng], 14, { animate: true });
      }
    } else if (houses.length > 0) {
      const group = L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds().pad(0.2));
    }

  }, [houses, selectedHouseId]);

  return (
    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl transition-colors">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute bottom-2 left-2 z-[400] bg-white/95 dark:bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-400 shadow-sm">
        Cartografía comunitaria libre © OpenStreetMap
      </div>
    </div>
  );
};
