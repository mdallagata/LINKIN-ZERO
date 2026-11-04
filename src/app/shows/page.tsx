import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageHero from "@/components/PageHero";
import { PastShowsSection, UpcomingShowsSection } from "@/components/ShowsSections";
import { BAND_NAME } from "@/data/band";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Shows",
  description:
    `Shows pasados y próximos de ${BAND_NAME}. Tocamos en Magic Music Box, Espacio Lola Mora ` +
    `(Septiembre Musical), Obscene Fest y más. Seguinos para conocer nuevas fechas.`,
  path: "/shows",
});

export default function ShowsPage(): ReactNode {
  return (
    <main>
      <PageHero title="Shows" eyebrow={`${BAND_NAME} en vivo`} image="/images/shows-hero.webp" imagePosition="28%" />
      <UpcomingShowsSection />
      <PastShowsSection />
    </main>
  );
}
