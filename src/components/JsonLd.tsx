import type { ReactNode } from "react";

// Patrón recomendado por Next.js para JSON-LD: script nativo (no next/script,
// que está pensado para JS ejecutable) con los "<" escapados para evitar
// inyección si algún dato viniera de una fuente no confiable.
export default function JsonLd({ data }: { data: object }): ReactNode {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
