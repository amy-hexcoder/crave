"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { Restaurant } from "@/lib/types";
import { useEffect } from "react";

// Fix default marker icons in Next
const icon = L.icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

type Props = {
  center: LatLngExpression;
  items: Restaurant[];
};

export default function MapView({ center, items }: Props) {
  // Leaflet CSS on client only
  useEffect(() => {}, []);
  return (
    <div className="h-[360px] md:h-[480px] overflow-hidden rounded-2xl border border-black/10">
      <MapContainer center={center} zoom={14} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map(r => (
          <Marker key={r.id} position={[r.coords.lat, r.coords.lng]} icon={icon}>
            <Popup>
              <div className="text-sm">
                <div className="font-semibold">{r.name}</div>
                <div className="text-xs opacity-70">{[r.cuisine, r.price, r.city].filter(Boolean).join(" · ")}</div>
                <div className="mt-2 flex gap-2">
                  {r.mapsUrl && <a className="text-blue-600 underline" href={r.mapsUrl} target="_blank">Maps</a>}
                  {r.opentableUrl && <a className="text-blue-600 underline" href={r.opentableUrl} target="_blank">OpenTable</a>}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}