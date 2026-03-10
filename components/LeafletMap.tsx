"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

type Point = {
  name: string;
  lat: number;
  lng: number;
  value: number;
  color?: string;
};

type MapProps = {
  center: [number, number];
  zoom?: number;
  points: Point[];
};

function radius(value: number) {
  return Math.max(6, value / 12);
}

export default function LeafletMap({ center, zoom = 4, points }: MapProps) {
  return (
    <div className="h-[55vh] w-full overflow-hidden rounded-2xl border border-white/10">
      <MapContainer center={center} zoom={zoom} className="h-full w-full">
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.map((p) => (
          <CircleMarker
            key={p.name}
            center={[p.lat, p.lng]}
            radius={radius(p.value)}
            pathOptions={{
              color: "#1f2937",
              weight: 1,
              fillColor: p.color || "#F26B4F",
              fillOpacity: 0.85,
            }}
          >
            <Popup>
              <strong>{p.name}</strong>
              <br />
              Value: {p.value}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}