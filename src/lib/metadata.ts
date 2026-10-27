import type { Metadata } from "next";
import { BAND_NAME, OG_IMAGE } from "@/data/band";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Ruta de la página (ej. "/members"); metadataBase del layout la vuelve absoluta. */
  path: string;
};

// Cuando una página define openGraph o twitter, Next reemplaza el objeto entero
// del layout en vez de combinarlo: por eso cada página arma los dos completos
// acá, con su propio título y descripción, más la URL canónica.
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const fullTitle: string = `${title} — ${BAND_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: BAND_NAME, locale: "es_AR", type: "website", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [OG_IMAGE.url] },
  };
}

// "a, b y c": listas en español para textos armados desde los datos.
export function listInSpanish(items: string[]): string {
  return new Intl.ListFormat("es", { style: "long", type: "conjunction" }).format(items);
}
