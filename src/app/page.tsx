import type { ReactNode } from "react";
import Container from "react-bootstrap/Container";
import ContactButtons from "@/components/ContactButtons";
import FadeInSection from "@/components/FadeInSection";
import QuienesSomosPhoto from "@/components/QuienesSomosPhoto";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { LatestShowSection, UpcomingShowsSection } from "@/components/ShowsSections";
import { BAND_DESCRIPTION } from "@/data/band";
import { NAV_LINKS } from "@/data/nav";

export default function Home(): ReactNode {
  return (
    <>
      <SiteHeader links={NAV_LINKS} heroPhoto heroImagePosition="40%" />

      <main className="w-100 px-3 position-relative">
        <div role="img" aria-label="Batería de LINKIN ZERØ en vivo" className="home-side-photo" />

        <Container
          as="section"
          style={{ maxWidth: 700, marginBottom: "4.5rem" }}
        >
          <h1 className="mb-1">¿Quiénes somos?</h1>
          <div className="section-divider" />
          <QuienesSomosPhoto />
          <p className="hero-description mb-0">{BAND_DESCRIPTION}</p>
        </Container>

        <FadeInSection>
          <UpcomingShowsSection />
        </FadeInSection>

        <FadeInSection>
          <LatestShowSection />
        </FadeInSection>

        <FadeInSection>
          <Container as="section" id="contacto" className="mb-5 pb-4" style={{ maxWidth: 960 }}>
            <h2 className="mb-1">Contacto</h2>
            <div className="section-divider" />
            <ContactButtons />
          </Container>
        </FadeInSection>
      </main>

      <SiteFooter />
    </>
  );
}
