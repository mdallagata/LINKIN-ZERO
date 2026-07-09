import type { Metadata } from "next";
import type { ReactNode } from "react";
import Container from "react-bootstrap/Container";
import FadeInSection from "@/components/FadeInSection";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { PastShowsSection, UpcomingShowsSection } from "@/components/ShowsSections";
import { BAND_NAME, BAND_TAGLINE, DAILY_REVALIDATE_SECONDS, OG_IMAGE, SITE_URL } from "@/data/band";
import { NAV_LINKS } from "@/data/nav";

export const metadata: Metadata = {
  title: "Shows",
  description:
    `Shows pasados y próximos de ${BAND_NAME}. Vimos en Magic Music Box, Espacio Lola Mora ` +
    `(Septiembre Musical), Obscene Fest y más. Seguinos para conocer nuevas fechas.`,
  openGraph: {
    title: `Shows — ${BAND_NAME}`,
    description: BAND_TAGLINE,
    url: `${SITE_URL}/shows`,
    siteName: BAND_NAME,
    locale: "es_AR",
    type: "website",
    images: [OG_IMAGE],
  },
};

export const revalidate: number = DAILY_REVALIDATE_SECONDS;

export default function ShowsPage(): ReactNode {
  return (
    <>
      <SiteHeader links={NAV_LINKS} heroImage="/images/shows-hero.jpg" heroImagePosition="30%" />

      <main className="w-100 px-3">
        <Container className="text-center mb-4 container-narrow">
          <h1 className="mb-1">Shows</h1>
          <div className="section-divider" />
        </Container>

        <FadeInSection>
          <div className="pt-4">
            <UpcomingShowsSection />
          </div>
        </FadeInSection>

        <FadeInSection>
          <PastShowsSection />
        </FadeInSection>
      </main>

      <SiteFooter />
    </>
  );
}
