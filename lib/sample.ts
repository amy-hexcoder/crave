import type { Restaurant, Plan } from "./types";

export const PALO_ALTO: { center: { lat: number; lng: number }; city: string } = {
  center: { lat: 37.4419, lng: -122.1430 },
  city: "Palo Alto, CA"
};

export const seedRestaurants: Restaurant[] = [
  {
    id: "evvia",
    name: "Evvia Estiatorio",
    cuisine: "Greek",
    price: "$$$",
    address: "420 Emerson St, Palo Alto, CA",
    city: "Palo Alto",
    coords: { lat: 37.4456, lng: -122.1636 },
    openUntil: "10:00 PM",
    bib: true,
    opentableUrl: "https://www.opentable.com/r/evvia-estiatorio-palo-alto",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Evvia%20Estiatorio%20Palo%20Alto"
  },
  {
    id: "ettan",
    name: "Ettan",
    cuisine: "Indian",
    price: "$$$",
    address: "518 Bryant St, Palo Alto, CA",
    city: "Palo Alto",
    coords: { lat: 37.4450, lng: -122.1604 },
    openUntil: "10:00 PM",
    bib: true,
    opentableUrl: "https://www.opentable.com/r/ettan-palo-alto",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ettan%20Palo%20Alto"
  },
  {
    id: "protege",
    name: "Protégé",
    cuisine: "New American",
    price: "$$$$",
    address: "250 California Ave, Palo Alto, CA",
    city: "Palo Alto",
    coords: { lat: 37.4279, lng: -122.1446 },
    openUntil: "9:30 PM",
    bib: true,
    opentableUrl: "https://www.opentable.com/r/protege-palo-alto",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Protege%20Palo%20Alto"
  },
  {
    id: "ramen-nagi",
    name: "Ramen Nagi",
    cuisine: "Japanese",
    price: "$$",
    address: "541 Bryant St, Palo Alto, CA",
    city: "Palo Alto",
    coords: { lat: 37.4455, lng: -122.1610 },
    openUntil: "10:00 PM",
    bib: false,
    opentableUrl: "https://www.opentable.com/s?currentlocationid=4&term=ramen%20nagi%20palo%20alto",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Ramen%20Nagi%20Palo%20Alto"
  }
];

export function seedPlan(): Plan {
  return {
    id: "demo",
    title: "Palo Alto Hitlist",
    origin: PALO_ALTO.center,
    items: seedRestaurants,
    createdAt: Date.now(),
    source: "opentable"
  };
}