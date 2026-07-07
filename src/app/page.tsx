import type { ReactNode } from "react";
import Container from "react-bootstrap/Container";
import ContactForm from "@/components/ContactForm";
import FadeInSection from "@/components/FadeInSection";
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
        <FadeInSection>
          <Container as="section" className="mb-5 pb-4" style={{ maxWidth: 960 }}>

            <p className="text-muted">
              {BAND_DESCRIPTION}
            </p>
          </Container>
        </FadeInSection>

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
            <ContactForm />
          </Container>
        </FadeInSection>
      </main>

      <SiteFooter />
    </>
  );
}
