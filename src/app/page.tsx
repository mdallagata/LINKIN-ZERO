import type { ReactNode } from "react";
import Container from "react-bootstrap/Container";
import ContactForm from "@/components/ContactForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { LatestShowSection, UpcomingShowsSection } from "@/components/ShowsSections";
import { BAND_DESCRIPTION } from "@/data/band";
import { HOME_NAV_LINKS } from "@/data/nav";

export default function Home(): ReactNode {
  return (
    <>
      <SiteHeader links={HOME_NAV_LINKS} />

      <main className="w-100 px-3">
        <Container as="section" className="mb-5 pb-4" style={{ maxWidth: 960 }}>
          <h1 className="glow-lg text-decoration-underline mb-4">Sobre la banda</h1>
          <p className="glow-sm text-muted">
            {BAND_DESCRIPTION}
          </p>
        </Container>

        <UpcomingShowsSection />

        <LatestShowSection />

        <Container as="section" id="contacto" className="mb-5 pb-4" style={{ maxWidth: 960 }}>
          <h1 className="glow-lg text-decoration-underline mb-4">Contacto</h1>
          <ContactForm />
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
