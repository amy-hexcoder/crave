import IngestForm from "@/components/IngestForm";

export default function HomePage() {
  return (
    <div className="grid gap-8">
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-6 items-start">
        <div>
          <h2 className="h2">Curate your next craving.</h2>
          <p className="mt-2 text-sm text-white/80">
            Paste a URL or list (OpenTable, Eater, Michelin) and we’ll build a map + itinerary you can share.
          </p>
          <div className="mt-4 flex gap-2">
            <span className="pill bg-white/10 text-white">Palo Alto</span>
            <span className="pill bg-white/10 text-white">Open now</span>
            <span className="pill bg-white/10 text-white">$$–$$$</span>
          </div>
        </div>
      </section>

      {/* 
        The form handles the Server Action and redirect. 
        Keeping it in a client component keeps this root page clean. 
      */}
      <IngestForm />

      {/* Feature Highlights */}
      <section className="grid md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="font-semibold text-black">Paste a URL</div>
          <p className="subtle mt-1">We parse lists and extract restaurants.</p>
        </div>
        <div className="card p-4">
          <div className="font-semibold text-black">See it on a map</div>
          <p className="subtle mt-1">Proximity-first sorting around your area.</p>
        </div>
        <div className="card p-4">
          <div className="font-semibold text-black">Export & book</div>
          <p className="subtle mt-1">One tap to Google Maps and OpenTable.</p>
        </div>
      </section>
    </div>
  );
}
