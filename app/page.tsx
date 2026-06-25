import IngestForm from "@/components/IngestForm";

export default function HomePage() {
  return (
    <div className="grid gap-8">
      <section className="grid md:grid-cols-2 gap-6 items-start">
        <div>
          <h2 className="h2">Curate your next craving.</h2>
          <p className="mt-2 text-sm text-white/80">
            Paste a URL or list (OpenTable, Eater, Michelin) and we’ll build a map + itinerary you can share.
          </p>
          <div className="mt-4 flex gap-2">
            <span className="pill">Palo Alto</span>
            <span className="pill">Open now</span>
            <span className="pill">$$–$$$</span>
          </div>
        </div>
      </section>

      <IngestForm />

      <section className="grid md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="font-semibold">Paste a URL</div>
          <p className="subtle mt-1">We parse lists and extract restaurants.</p>
        </div>
        <div className="card p-4">
          <div className="font-semibold">See it on a map</div>
          <p className="subtle mt-1">Proximity-first sorting around your area.</p>
        </div>
        <div className="card p-4">
          <div className="font-semibold">Export & book</div>
          <p className="subtle mt-1">One tap to Google Maps and OpenTable.</p>
        </div>
      </section>
    </div>
  );
}