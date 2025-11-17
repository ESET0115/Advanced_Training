// src/components/MapComponent.jsx
import React from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map-styles.css"; // small local styles for the map container

// sample zone markers (lat, lng) - replace with real coords if available
const ZONE_MARKERS = [
  { id: "mang", name: "Mangalore zone", coords: [12.9165, 74.8560], stats: { alarms: 6, issues: 12 } },
  { id: "pump", name: "Pumpwell", coords: [12.9141, 74.8552], stats: { alarms: 3, issues: 8 } },
  { id: "bej", name: "Bejai", coords: [12.9222, 74.8600], stats: { alarms: 4, issues: 9 } },
  { id: "pvs", name: "PVS", coords: [12.9190, 74.8500], stats: { alarms: 2, issues: 5 } },
  { id: "kotek", name: "Kotekar", coords: [12.80, 74.99], stats: { alarms: 5, issues: 10 } },
];

export default function MapComponent({ center = [12.92, 74.86], zoom = 11, markers = ZONE_MARKERS }) {
  return (
    <div className="map-card">
      <MapContainer center={center} zoom={zoom} style={{ height: "360px", width: "100%", borderRadius: 8 }}>
        <TileLayer
          // using a neutral, free tile provider (OpenStreetMap)
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((m) => (
          <CircleMarker
            key={m.id}
            center={m.coords}
            radius={10}
            pathOptions={{ color: "#ef4444", fillColor: "#ef4444", fillOpacity: 1 }}
          >
            <Popup>
              <div style={{ minWidth: 160 }}>
                <strong>{m.name}</strong>
                <div style={{ marginTop: 6, display: "flex", gap: 10, fontSize: 13 }}>
                  <div>⚡ {m.stats.issues}</div>
                  <div>🔔 {m.stats.alarms}</div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
