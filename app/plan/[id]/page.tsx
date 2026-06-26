import { PlanStore } from "@/lib/store";
import { notFound } from "next/navigation";
import { sortByProximity } from "@/lib/geo";
import MapView from "@/components/MapView";
import ItineraryList from "@/components/ItineraryList";

type Props = { 
  params: Promise<{ id: string }> 
};

export default async function PlanPage({ params }: Props) {
  // 1. Await the params (Next.js 15+ standard)
  const { id } = await params;
  
  // 2. Fetch from Vercel KV
  const plan = await PlanStore.get(id);
  
  // 3. Graceful fallback if the plan expired or doesn't exist
  if (!plan) return notFound();

  // 4. Sort the payload
  const origin = plan.origin!;
  const items = sortByProximity(plan.items, origin);

  return (
    <div className="grid gap-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="h2 text-white">{plan.title}</h2>
          <p className="text-sm text-white/70">
            {items.length} spots · {plan.source === "opentable" ? "OpenTable" : "Custom"} source
          </p>
        </div>
        <div className="flex gap-2">
          <a
            className="btn btn-primary"
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(items[0].name + " " + (items[0].city || ""))}`}
            target="_blank"
            rel="noreferrer"
          >
            Start Route
          </a>
          {/* Note: Client-side clipboard logic should ideally live in a small client component, 
              but for an MVP, a standard anchor tag or visual button works well enough. */}
        </div>
      </div>

      <MapView center={[origin.lat, origin.lng]} items={items} />

      <ItineraryList items={items} />
    </div>
  );
}
