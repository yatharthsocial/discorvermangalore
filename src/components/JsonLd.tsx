import type { Graph, Thing, WithContext } from "schema-dts";

// Renders structured data as recommended by the Next.js JSON-LD guide.
export function JsonLd({ data }: { data: WithContext<Thing> | Graph }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
