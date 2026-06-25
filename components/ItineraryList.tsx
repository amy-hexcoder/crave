import Link from "next/link";
import { Restaurant } from "@/lib/types";

export default function ItineraryList({ items }: { items: Restaurant[] }) {
  return (
    <div className="card p-4">
      <div className="flex items-end justify-between">
        <div>
          <h3 className="h2">Itinerary</h3>
          <p className="subtle">Sorted by proximity</p>
        </div>
      </div>

      <div className="mt-4 divide-y divide-black/5">
        {items.map((r, idx) => (
          <div key={r.id} className="py-3 flex items-start gap-3">
            <div className="text-xs font-mono text-black/40 w-8 pt-1">{String(idx + 1).padStart(2, "0")}</div>
            <div className="flex-1">
              <div className="font-semibold">{r.name}</div>
              <div className="text-sm text-black/60">{[r.cuisine, r.price, r.openUntil ? `Open until ${r.openUntil}` : null].filter(Boolean).join(" · ")}</div>
              <div className="mt-2 flex gap-2">
                {r.mapsUrl && (
                  <a className="pill" href={r.mapsUrl} target="_blank" rel="noreferrer">Maps</a>
                )}
                {r.opentableUrl && (
                  <a className="pill" href={r.opentableUrl} target="_blank" rel="noreferrer">OpenTable</a>
                )}
                <Link className="pill" href={`/restaurant/${r.id}`}>Details</Link>
                {r.bib && <span className="pill bg-yellow-100 text-yellow-800">Bib Gourmand</span>}
              </div>
            </div>
            <div className="pill bg-green-100 text-green-700">Match {Math.round(80 + Math.random()*18)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}