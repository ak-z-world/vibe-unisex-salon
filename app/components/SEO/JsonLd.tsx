// app/components/SEO/JsonLd.tsx
// Generic structured-data renderer. Pass any schema object (or array of
// schema objects) built with lib/schema-generators.ts. Centralizing the
// <script type="application/ld+json"> output avoids repeating
// dangerouslySetInnerHTML boilerplate across every page/component.

export default function JsonLd({
  data,
  id,
}: {
  data: object | object[];
  id?: string;
}) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
