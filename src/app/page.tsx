import type { Metadata } from "next";
import type { ReactNode } from "react";
import ContactButtons from "@/components/ContactButtons";
import FadeInSection from "@/components/FadeInSection";
import InstagramEmbed from "@/components/InstagramEmbed";
import PhotoShowcase from "@/components/PhotoShowcase";
import SiteHeader from "@/components/SiteHeader";
import { LatestShowSection, UpcomingShowsSection } from "@/components/ShowsSections";
import { BAND_DESCRIPTION } from "@/data/band";
import { NAV_LINKS } from "@/data/nav";
import { REEL_URL } from "@/data/instagram";
import { UPCOMING_SHOWS } from "@/lib/shows";

// Título, descripción y openGraph de la home son los del layout.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home(): ReactNode {
  return (
    <>
      <SiteHeader links={NAV_LINKS} heroImage="/images/show-hero.webp" heroImagePosition="55%" brandAsHeading />

      <main className="w-100 px-3 position-relative">
        <div role="img" aria-label="Batería de LINKIN ZERØ en vivo" className="home-side-photo">
          <div className="home-side-photo__img" />
        </div>
        <div role="img" aria-label="Público en un show de LINKIN ZERØ" className="home-side-photo home-side-photo--left">
          <div className="home-side-photo__img" />
        </div>

        <section id="quienes-somos" className="container mb-5" style={{ maxWidth: 700 }}>
          <h2 className="h1 mb-1">¿Quiénes somos?</h2>
          <div className="section-divider" />
          <PhotoShowcase src="/images/todos.webp" alt="Los integrantes de LINKIN ZERØ en Obscene Fest" width={1400} height={932} />
          <p className="hero-description mb-0">{BAND_DESCRIPTION}</p>

          <div className="contact-section mt-5" id="contacto">
            <h2 className="mb-1">Contacto</h2>
            <div className="section-divider" />
            <ContactButtons />
          </div>
        </section>

        <div className="section-gap" id="proximos-shows" style={{ paddingTop: "3rem" }}>
          {UPCOMING_SHOWS.length > 0 && (
            <FadeInSection>
              <UpcomingShowsSection />
            </FadeInSection>
          )}
          {UPCOMING_SHOWS.length > 0 && (
            <div className="container container-narrow">
              <hr className="brand-hr my-4" />
            </div>
          )}
          <FadeInSection>
            <LatestShowSection />
          </FadeInSection>
          <div style={{ marginTop: "1rem" }}>
            <FadeInSection>
              <InstagramEmbed url={REEL_URL} />
            </FadeInSection>
          </div>
        </div>
      </main>
    </>
  );
}
