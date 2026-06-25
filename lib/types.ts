export type LatLng = { lat: number; lng: number };

export type Restaurant = {
  id: string;
  name: string;
  cuisine?: string;
  price?: "$" | "$$" | "$$$" | "$$$$";
  address?: string;
  city?: string;
  coords: LatLng;
  openUntil?: string;
  opentableUrl?: string;
  mapsUrl?: string;
  tags?: string[];
  bib?: boolean;
};

export type Plan = {
  id: string;
  title: string;
  origin?: LatLng; // user center point
  items: Restaurant[];
  createdAt: number;
  source?: "opentable" | "manual" | "other";
};