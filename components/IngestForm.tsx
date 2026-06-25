"use client";

import { useTransition } from "react";
import { createPlan } from "@/app/actions";
import { useRouter } from "next/navigation";

export default function IngestForm() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      const id = await createPlan(formData);
      router.push(`/plan/${id}`);
    });
  }

  return (
    <form action={onSubmit} className="grid md:grid-cols-[1fr_auto] gap-3">
      <div className="card p-4">
        <label className="text-xs font-semibold text-black/60">Paste a URL or list</label>
        <textarea
          name="input"
          required
          placeholder="e.g. https://www.opentable.com/blog/michelin-bib-gourmand-california/"
          className="mt-2 w-full h-36 rounded-lg border border-black/10 p-3 text-sm"
        />
        <div className="mt-3 grid md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-black/60">Plan title</label>
            <input
              type="text"
              name="title"
              className="mt-2 w-full rounded-lg border border-black/10 p-2.5 text-sm"
              placeholder="Palo Alto Hitlist"
              defaultValue="Palo Alto Hitlist"
            />
          </div>
        </div>
        <p className="mt-3 text-xs text-black/60">
          Tip: Drop the OpenTable Michelin Bib link to see a pre-seeded demo.
        </p>
      </div>
      <div className="flex md:flex-col gap-3">
        <button
          className="btn btn-primary h-12 md:h-auto"
          disabled={pending}
          aria-busy={pending}
        >
          {pending ? "Generating..." : "Generate Itinerary →"}
        </button>
        <a
          href="/plan/demo"
          className="btn btn-ghost h-12 md:h-auto text-white"
        >
          View Demo
        </a>
      </div>
    </form>
  );
}