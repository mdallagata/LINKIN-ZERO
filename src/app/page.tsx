import Container from "react-bootstrap/Container";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { LatestShowSection, UpcomingShowsSection } from "@/components/ShowsSections";
import { CONTACT_EMAIL } from "@/data/band";
import { HOME_NAV_LINKS } from "@/data/nav";

export default function Home() {
  return (
    <>
      <SiteHeader links={HOME_NAV_LINKS} />

      <main className="w-100 px-3">
        <UpcomingShowsSection />

        <LatestShowSection />

        <Container as="section" id="contacto" className="mb-5 pb-4" style={{ maxWidth: 700 }}>
          <h1 className="glow-lg text-decoration-underline mb-4">Contacto</h1>
          <p className="glow-sm" style={{ color: "rgb(174, 214, 214)" }}>
            ¿Querés contratarnos para tu evento o local?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="glow-hover text-brand"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
