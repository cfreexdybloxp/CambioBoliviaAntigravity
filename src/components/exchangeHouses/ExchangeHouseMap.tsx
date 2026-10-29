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
      html: `<div style="background-color: #059669; width: 24px; height: 24px; border-radius: 50%; border: 2px solid #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: bold;">Bs</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });

    const activeIcon = L.divIcon({
      className: 'custom-map-pin-active',
      html: `<div style="background-color: #f59e0b; width: 30px; height: 30px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 6px 10px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: #111827; font-size: 13px; font-weight: bold;">★</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

    // Añadir marcadores
    houses.forEach(house => {
      const isSelected = house.id === selectedHouseId;
      const marker = L.marker([house.lat, house.lng], {
        icon: isSelected ? activeIcon : defaultIcon
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4;">
          <strong style="font-size: 13px; color: #10b981;">${house.commercialName}</strong><br/>
          <span style="color: #94a3b8;">${house.address} (${house.city})</span><br/>
          <span style="display: inline-block; background-color: #064e3b; color: #34d399; font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-top: 4px;">
            Licencia: ${house.asfiLicense}
          </span>
          <div style="margin-top: 6px; border-top: 1px solid #334155; padding-top: 4px;">
            <strong>Dólar compra:</strong> Bs ${house.publishedRates.usdBuy || '-'} | 
            <strong>Venta:</strong> Bs ${house.publishedRates.usdSell || '-'}
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
    <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute bottom-2 left-2 z-[400] bg-slate-900/90 backdrop-blur px-2.5 py-1 rounded-md border border-slate-800 text-[10px] text-slate-400">
        Cartografía comunitaria libre © OpenStreetMap (0 Bs)
      </div>
    </div>
  );
};
