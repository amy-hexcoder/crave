import type { LatLng, Restaurant } from "./types";

export function distanceKm(a: LatLng, b: LatLng) {
  const R = 6371;
  const dLat = deg2rad(b.lat - a.lat);
  const dLon = deg2rad(b.lng - a.lng);
  const lat1 = deg2rad(a.lat);
  const lat2 = deg2rad(b.lat);
  const x = Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}
const deg2rad = (d: number) => d * Math.PI / 180;

export function sortByProximity(items: Restaurant[], origin: LatLng) {
  return [...items].sort(
    (r1, r2) => distanceKm(r1.coords, origin) - distanceKm(r2.coords, origin)
  );
}