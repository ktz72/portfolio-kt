"use client";

import { MapContainer, TileLayer, ImageOverlay, useMap } from "react-leaflet";
import { useEffect } from "react";

type ZoomMapProps = {
  imageUrl: string;
  bounds: [[number, number], [number, number]];
};

function FixMapSize() {
  const map = useMap();

  useEffect(() => {
    const t = setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => clearTimeout(t);
  }, [map]);

  return null;
}

export default function ZoomMap({ imageUrl, bounds }: ZoomMapProps) {
  return (
    <div className="h-[55vh] w-full overflow-hidden rounded-2xl border border-white/10">
      <MapContainer
        bounds={bounds}
        className="h-full w-full"
        zoomControl={true}
      >
        <FixMapSize />

        <TileLayer
          attribution='© OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ImageOverlay url={imageUrl} bounds={bounds} />
      </MapContainer>
    </div>
  );
}