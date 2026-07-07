import type { Metadata } from "next";
import type { ReactNode } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { PastShowsSection, UpcomingShowsSection } from "@/components/ShowsSections";
import { BAND_NAME } from "@/data/band";
import { SUBPAGE_NAV_LINKS } from "@/data/nav";

export const metadata: Metadata = {
  title: `Shows — ${BAND_NAME}`,
  description:
    `Shows pasados y próximos de ${BAND_NAME}. Vimos en Magic Music Box, Espacio Lola Mora ` +
    `(Septiembre Musical), Obscene Fest y más. Seguinos para conocer nuevas fechas.`,
};

export default function ShowsPage(): ReactNode {
  return (
    <>
      <SiteHeader links={SUBPAGE_NAV_LINKS} />

      <main className="w-100 px-3">
        <UpcomingShowsSection />

        <PastShowsSection />
      </main>

      <SiteFooter />
    </>
  );
}
