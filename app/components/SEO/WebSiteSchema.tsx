// app/components/SEO/WebSiteSchema.tsx
// Emits the site-wide WebSite + SearchAction JSON-LD once, from the root
// layout. Google and answer engines use this to attach a sitelinks search
// box and to resolve the canonical "website" entity referenced by the
// Organization schema's @id.

import JsonLd from "@/app/components/SEO/JsonLd";
import { buildWebSiteSchema } from "@/lib/schema-generators";

export default function WebSiteSchema() {
  return <JsonLd id="website-schema" data={buildWebSiteSchema()} />;
}
