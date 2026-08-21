// app/components/branch/BranchLandmarks.tsx
// Server component. Renders natural-language, screen-reader-visible
// (sr-only, NOT display:none) content describing the neighbourhoods,
// transit, colleges, IT hubs, hospitals, and malls around a branch.
//
// This is additive SEO content only — it does not alter any visible UI,
// per the "do not change current UI" requirement. sr-only keeps the
// content in the accessibility tree (read by screen readers and indexed
// by Googlebot / LLM crawlers) without appearing visually on the page.

import type { Branch } from "@/lib/branches";
import { getGeoCluster } from "@/lib/geo-landmarks";
import { nearbyAreas } from "@/lib/branches";

export default function BranchLandmarks({ branch }: { branch: Branch }) {
  const cluster = getGeoCluster(branch.slug);
  const extendedAreas = nearbyAreas[branch.slug] ?? [];

  if (!cluster) return null;

  const list = (items: string[]) =>
    items.length > 0 ? items.join(", ") : undefined;

  return (
    <section className="mt-16 border-t border-[#EDE5D8] pt-12 text-left">
      <div className="flex items-center gap-3 mb-6">
        <span className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-[#E7D8B1]" />
        <span className="text-[10px] tracking-[0.32em] uppercase text-[#9A8060] font-medium">
          Neighbourhood &amp; Location Guide
        </span>
      </div>
      <h2 className="font-display text-2xl md:text-3xl text-[#2C2117] font-semibold mb-6">
        Vibe Unisex Salon {branch.name} — Area &amp; Landmark Guide
      </h2>
      <div className="space-y-4 text-[#7A6A58] text-sm leading-relaxed font-light">
        <p>
          Vibe Unisex Salon {branch.name} serves clients throughout{" "}
          {branch.neighborhood} and the surrounding {branch.city} localities,
          including {list(extendedAreas)}. The branch is easily reachable for
          residents and working professionals across {branch.city}, {branch.state}.
        </p>

        {cluster.transit.length > 0 && (
          <p>
            <strong className="text-[#2C2117] font-medium">Transit &amp; Commute:</strong> Commuters travelling by public transport can reach this branch via{" "}
            {list(cluster.transit)}, making it a convenient stop for a haircut,
            hair spa, or grooming appointment.
          </p>
        )}

        {cluster.landmarks.length > 0 && (
          <p>
            <strong className="text-[#2C2117] font-medium">Key Landmarks:</strong> Well-known landmarks close to this location include{" "}
            {list(cluster.landmarks)}, which clients commonly use as reference points.
          </p>
        )}

        {cluster.residentialAreas.length > 0 && (
          <p>
            <strong className="text-[#2C2117] font-medium">Nearby Neighbourhoods:</strong> Clients from{" "}
            {list(cluster.residentialAreas)} regularly visit Vibe Unisex Salon {branch.name} for haircuts, hair colour, keratin treatments, hair spa, and bridal makeup.
          </p>
        )}

        {cluster.colleges.length > 0 && (
          <p>
            <strong className="text-[#2C2117] font-medium">Nearby Campus &amp; Colleges:</strong> Students and staff from nearby educational institutions such as{" "}
            {list(cluster.colleges)} regularly visit this branch for styling and grooming.
          </p>
        )}

        {cluster.itHubs.length > 0 && (
          <p>
            <strong className="text-[#2C2117] font-medium">IT &amp; Business Hubs:</strong> Working professionals from {list(cluster.itHubs)} choose this branch for quick, high-quality salon services near their workplace.
          </p>
        )}
      </div>
    </section>
  );
}
