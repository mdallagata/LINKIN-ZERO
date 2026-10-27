import type { Metadata } from "next";
import type { ReactNode } from "react";
import FadeInSection from "@/components/FadeInSection";
import ScrollToContent from "@/components/ScrollToContent";
import SiteHeader from "@/components/SiteHeader";
import { PastShowsSection, UpcomingShowsSection } from "@/components/ShowsSections";
import { BAND_NAME } from "@/data/band";
import { NAV_LINKS } from "@/data/nav";
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
    <>
      <SiteHeader links={NAV_LINKS} heroImage="/images/shows-hero.webp" heroImagePosition="65%" />

      <ScrollToContent selector="#shows-heading" />

      <main className="w-100 px-3">
        <div className="container text-center mb-4 container-narrow" id="shows-heading">
          <h1 className="mb-1">Shows</h1>
          <div className="section-divider" />
        </div>

        <FadeInSection>
          <div className="pt-4">
            <UpcomingShowsSection />
          </div>
        </FadeInSection>

        <FadeInSection>
          <PastShowsSection />
        </FadeInSection>
      </main>
    </>
  );
}
