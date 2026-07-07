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
    <section className="sr-only" aria-hidden="false" role="complementary">
      <h2>
        Vibe Unisex Salon {branch.name} — Neighbourhood &amp; Connectivity
        Guide
      </h2>
      <p>
        Vibe Unisex Salon {branch.name} serves clients throughout{" "}
        {branch.neighborhood} and the surrounding {branch.city} localities,
        including {list(extendedAreas)}. The branch is easily reachable for
        residents and working professionals across this part of{" "}
        {branch.city}, {branch.state}.
      </p>

      {cluster.transit.length > 0 && (
        <p>
          Commuters travelling by public transport can reach this branch via{" "}
          {list(cluster.transit)}, making it a convenient stop for a haircut,
          hair spa, or grooming appointment before or after work.
        </p>
      )}

      {cluster.landmarks.length > 0 && (
        <p>
          Well-known landmarks close to this location include{" "}
          {list(cluster.landmarks)}, which residents and visitors commonly
          use as reference points when navigating to{" "}
          {branch.neighborhood}.
        </p>
      )}

      {cluster.residentialAreas.length > 0 && (
        <p>
          Popular residential neighbourhoods near this branch include{" "}
          {list(cluster.residentialAreas)}. Clients from these areas
          frequently visit Vibe Unisex Salon {branch.name} for haircuts, hair
          colour, keratin treatments, hair spa, and bridal makeup.
        </p>
      )}

      {cluster.colleges.length > 0 && (
        <p>
          Students and staff from nearby educational institutions such as{" "}
          {list(cluster.colleges)} regularly visit this branch for
          affordable grooming and styling services.
        </p>
      )}

      {cluster.itHubs.length > 0 && (
        <p>
          Working professionals from {list(cluster.itHubs)} choose this
          branch for quick, high-quality salon services close to their
          workplace.
        </p>
      )}

      {cluster.hospitals.length > 0 && (
        <p>
          The branch is also located within convenient reach of{" "}
          {list(cluster.hospitals)}.
        </p>
      )}

      {cluster.malls.length > 0 && (
        <p>
          Clients often combine their salon visit with shopping trips to{" "}
          {list(cluster.malls)}, both located near {branch.neighborhood}.
        </p>
      )}
    </section>
  );
}
