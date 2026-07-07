import type { ReactNode } from "react";
import Container from "react-bootstrap/Container";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { LatestShowSection, UpcomingShowsSection } from "@/components/ShowsSections";
import { BAND_DESCRIPTION, CONTACT_EMAIL, INSTAGRAM_URL } from "@/data/band";
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
          <p className="glow-sm text-muted">
            ¿Querés contratarnos para tu evento o local?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="glow-hover text-brand"
            >
              {CONTACT_EMAIL}
            </a>
            {" "}o mandanos un mensaje a nuestro{" "}
            <a
              href={INSTAGRAM_URL}
              className="glow-hover text-brand"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>.
          </p>
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
