// components/Map.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Call } from '@/components/sidebar';  // Import the Call type

// Fix for default marker icon
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  selectedCall: Call | null;
}

// This component updates the map view when the selected call changes
const MapUpdater: React.FC<{ selectedCall: Call | null }> = ({ selectedCall }) => {
  const map = useMap();
  const previousCall = useRef<Call | null>(null);

  useEffect(() => {
    if (selectedCall && (previousCall.current?.id !== selectedCall.id)) {
      map.flyTo(
        [selectedCall.location.lat, selectedCall.location.lng],
        18,  // Zoom level
        {
          duration: 2,  // Animation duration in seconds
          easeLinearity: 0.25
        }
      );
      previousCall.current = selectedCall;
    }
  }, [selectedCall, map]);

  return null;
};

const Map: React.FC<MapProps> = ({ selectedCall }) => {
  const defaultCenter: [number, number] = [37.7749, -122.4194];  // Default to San Francisco

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer center={defaultCenter} zoom={10} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {selectedCall && (
          <Marker position={[selectedCall.location.lat, selectedCall.location.lng]}>
            <Popup>
              {selectedCall.shortSummary}
            </Popup>
          </Marker>
        )}
        <MapUpdater selectedCall={selectedCall} />
      </MapContainer>
    </div>
  );
};

export default Map;