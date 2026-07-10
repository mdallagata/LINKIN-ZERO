import type { ReactNode } from "react";
import Container from "react-bootstrap/Container";
import ContactButtons from "@/components/ContactButtons";
import FadeInSection from "@/components/FadeInSection";
import FirstScrollTo from "@/components/FirstScrollTo";
import PhotoShowcase from "@/components/PhotoShowcase";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { LatestShowSection, UpcomingShowsSection } from "@/components/ShowsSections";
import { BAND_DESCRIPTION } from "@/data/band";
import { NAV_LINKS } from "@/data/nav";

// Revalida a diario: sin esto, el año del footer (new Date().getFullYear())
// queda fijo en el HTML del último build hasta el próximo deploy.
export const revalidate: number = 86400;

export default function Home(): ReactNode {
  return (
    <>
      <SiteHeader links={NAV_LINKS} heroImage="/images/show-hero.jpg" heroImagePosition="55%" />

      <FirstScrollTo steps={[{ selector: "#quienes-somos" }, { selector: "#proximos-shows" }]} />

      <main className="w-100 px-3 position-relative">
        <div role="img" aria-label="Batería de LINKIN ZERØ en vivo" className="home-side-photo">
          <div className="home-side-photo__img" />
        </div>
        <div role="img" aria-label="Público en un show de LINKIN ZERØ" className="home-side-photo home-side-photo--left">
          <div className="home-side-photo__img" />
        </div>

        <Container
          as="section"
          id="quienes-somos"
          className="section-gap"
          style={{ maxWidth: 700 }}
        >
          <h1 className="mb-1">¿Quiénes somos?</h1>
          <div className="section-divider" />
          <PhotoShowcase
            src="/images/todos.jpg"
            alt="Los integrantes de LINKIN ZERØ en Obscene Fest"
            width={1400}
            height={932}
          />
          <p className="hero-description mb-0">{BAND_DESCRIPTION}</p>

          <hr className="brand-hr my-5" />

          <div className="contact-section" id="contacto">
            <h2 className="mb-1">Contacto</h2>
            <div className="section-divider" />
            <ContactButtons />
          </div>
        </Container>

        <div className="section-gap" id="proximos-shows">
          <FadeInSection>
            <UpcomingShowsSection />
          </FadeInSection>
          <FadeInSection>
            <LatestShowSection />
          </FadeInSection>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
