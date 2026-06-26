"use server";

import { randomUUID } from "crypto";
import { Plan, Restaurant } from "@/lib/types";
import { PlanStore } from "@/lib/store";
import { PALO_ALTO, seedRestaurants } from "@/lib/sample";

function parseInput(input: string): { restaurants: Partial<Restaurant>[]; source: Plan["source"] } {
  // Extremely simple parser: if it sees the OpenTable Bib URL, seed with demo data.
  if (input.includes("opentable.com/blog/michelin-bib-gourmand-california")) {
    return {
      restaurants: seedRestaurants,
      source: "opentable"
    };
  }
  // Otherwise, split on lines and assume each is a restaurant name near Palo Alto.
  const names = input
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 20);

  const restaurants: Partial<Restaurant>[] = names.map((name, i) => ({
    id: `${name.toLowerCase().replace(/\s+/g, "-")}-${i}`,
    name,
    city: "Palo Alto",
    coords: jitterCoords(PALO_ALTO.center, i),
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " Palo Alto")}`,
    opentableUrl: `https://www.opentable.com/s?currentlocationid=4&term=${encodeURIComponent(name + " Palo Alto")}`
  }));

  return { restaurants, source: "manual" };
}

function jitterCoords(center: { lat: number; lng: number }, i: number) {
  const r = 0.01; // ~1km jitter
  return {
    lat: center.lat + ((Math.sin(i) * r)),
    lng: center.lng + ((Math.cos(i) * r))
  };
}

export async function createPlan(formData: FormData) {
  const raw = (formData.get("input") as string) || "";
  const title = (formData.get("title") as string) || "Custom Hitlist";
  const { restaurants, source } = parseInput(raw);

  const items: Restaurant[] = restaurants.map((r, idx) => ({
    id: r.id || `r-${idx}`,
    name: r.name || `Restaurant ${idx + 1}`,
    cuisine: r.cuisine || undefined,
    price: (r.price as any) || undefined,
    address: r.address,
    city: r.city || "Palo Alto",
    coords: r.coords || PALO_ALTO.center,
    openUntil: r.openUntil || undefined,
    bib: r.bib || false,
    opentableUrl: r.opentableUrl,
    mapsUrl: r.mapsUrl
  }));

   const plan: Plan = {
    id: randomUUID(),
    title,
    origin: PALO_ALTO.center,
    items,
    createdAt: Date.now(),
    source
  };

  // Now we await the KV insertion
  await PlanStore.set(plan);
  return plan.id;
}
