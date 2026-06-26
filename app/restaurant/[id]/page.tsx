import { PlanStore } from "@/lib/store";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { 
  params: Promise<{ id: string }> 
};

export default async function RestaurantPage({ params }: Props) {
  // 1. Await the params
  const { id } = await params;

  // 2. For the MVP, we read from the demo plan.  
  // In v2, this would be: await db.restaurants.findById(id)
  const demo = await PlanStore.get("demo");
  const all = demo ? demo.items : [];
  const r = all.find(x => x.id === id);
  
  if (!r) return notFound();

  return (
    <div className="grid gap-6">
      <div className="card overflow-hidden p-0">
        <div className="h-48 bg-gradient-to-b from-black/10 to-black/70 relative">
          <div className="absolute inset-0 flex items-end p-4">
            <div>
              <div className="text-xs font-semibold text-yellow-400">
                {r.bib ? "★ MICHELIN RECOMMENDED" : ""}
              </div>
              <h1 className="text-3xl font-serif text-white">{r.name}</h1>
              <div className="text-white/80 text-sm mt-1">
                {[r.cuisine, r.price, r.city].filter(Boolean).join(" · ")}
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <dl className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="text-black/60 font-semibold mb-1">Address</dt>
              <dd className="font-medium text-black">{r.address || "-"}</dd>
            </div>
            <div>
              <dt className="text-black/60 font-semibold mb-1">Status</dt>
              <dd className="font-medium text-green-700">
                {r.openUntil ? `Open until ${r.openUntil}` : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-black/60 font-semibold mb-1">City</dt>
              <dd className="font-medium text-black">{r.city || "-"}</dd>
            </div>
            <div>
              <dt className="text-black/60 font-semibold mb-1">Tags</dt>
              <dd className="font-medium text-black">
                {r.bib ? "Bib Gourmand" : "—"}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-black/5 pt-6">
            {r.mapsUrl && (
              <a className="btn btn-ghost" target="_blank" rel="noreferrer" href={r.mapsUrl}>
                Open in Maps
              </a>
            )}
            {r.opentableUrl && (
              <a className="btn btn-primary" target="_blank" rel="noreferrer" href={r.opentableUrl}>
                Book on OpenTable
              </a>
            )}
            <Link className="btn btn-ghost ml-auto" href="/plan/demo">
              ← Back to Itinerary
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
