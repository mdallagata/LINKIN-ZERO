import type { Metadata } from "next";
import type { ReactNode } from "react";
import FadeInSection from "@/components/FadeInSection";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { PastShowsSection, UpcomingShowsSection } from "@/components/ShowsSections";
import { BAND_NAME, BAND_TAGLINE } from "@/data/band";
import { NAV_LINKS } from "@/data/nav";

export const metadata: Metadata = {
  title: `Shows — ${BAND_NAME}`,
  description:
    `Shows pasados y próximos de ${BAND_NAME}. Vimos en Magic Music Box, Espacio Lola Mora ` +
    `(Septiembre Musical), Obscene Fest y más. Seguinos para conocer nuevas fechas.`,
  openGraph: {
    title: `Shows — ${BAND_NAME}`,
    description: BAND_TAGLINE,
  },
};

export default function ShowsPage(): ReactNode {
  return (
    <>
      <SiteHeader links={NAV_LINKS} />

      <main className="w-100 px-3">
        <FadeInSection>
          <UpcomingShowsSection />
        </FadeInSection>

        <FadeInSection>
          <PastShowsSection />
        </FadeInSection>
      </main>

      <SiteFooter />
    </>
  );
}
