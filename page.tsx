import { PlanStore } from "@/lib/store";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: { id: string } };

export default function RestaurantPage({ params }: Props) {
  // naive lookup across all plans (demo)
  const demo = PlanStore.get("demo");
  const all = demo ? demo.items : [];
  const r = all.find(x => x.id === params.id);
  if (!r) return notFound();

  return (
    <div className="grid gap-6">
      <div className="card overflow-hidden p-0">
        <div className="h-48 bg-gradient-to-b from-black/10 to-black/70 relative">
          <div className="absolute inset-0 flex items-end p-4">
            <div>
              <div className="text-xs font-semibold text-yellow-400">{r.bib ? "BIB GOURMAND" : ""}</div>
              <h1 className="text-3xl font-serif text-white">{r.name}</h1>
              <div className="text-white/80 text-sm">{[r.cuisine, r.price, r.city].filter(Boolean).join(" · ")}</div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-black/60">Address</dt>
              <dd className="font-medium">{r.address || "-"}</dd>
            </div>
            <div>
              <dt className="text-black/60">Status</dt>
              <dd className="font-medium">{r.openUntil ? `Open until ${r.openUntil}` : "—"}</dd>
            </div>
            <div>
              <dt className="text-black/60">City</dt>
              <dd className="font-medium">{r.city || "-"}</dd>
            </div>
            <div>
              <dt className="text-black/60">Tags</dt>
              <dd className="font-medium">{r.bib ? "Michelin Recommended" : "—"}</dd>
            </div>
          </dl>

          <div className="mt-4 flex flex-wrap gap-2">
            {r.mapsUrl && (
              <a className="btn btn-ghost" target="_blank" href={r.mapsUrl}>Open in Google Maps</a>
            )}
            {r.opentableUrl && (
              <a className="btn btn-primary" target="_blank" href={r.opentableUrl}>Book on OpenTable</a>
            )}
            <Link className="btn btn-ghost" href="/plan/demo">Back to Itinerary</Link>
          </div>
        </div>
      </div>
    </div>
  );
}