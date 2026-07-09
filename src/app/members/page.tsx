import type { Metadata } from "next";
import type { ReactNode } from "react";
import Container from "react-bootstrap/Container";
import FadeInSection from "@/components/FadeInSection";
import MemberSection from "@/components/MemberSection";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { BAND_NAME, BAND_TAGLINE, DAILY_REVALIDATE_SECONDS, OG_IMAGE, SITE_URL } from "@/data/band";
import { Member, MEMBERS } from "@/data/members";
import { NAV_LINKS } from "@/data/nav";

export const metadata: Metadata = {
  title: "Miembros",
  description:
    `Conocé a los integrantes de ${BAND_NAME}: Lucas Sorroza (batería), Gustavo Monjes (bajo), ` +
    `Mariano Cruz (voz), Mauricio Dall'Agata (guitarra) y Exequiel Arias (voz/guitarra).`,
  openGraph: {
    title: `Miembros — ${BAND_NAME}`,
    description: BAND_TAGLINE,
    url: `${SITE_URL}/members`,
    siteName: BAND_NAME,
    locale: "es_AR",
    type: "website",
    images: [OG_IMAGE],
  },
};

export const revalidate = DAILY_REVALIDATE_SECONDS;

export default function MembersPage(): ReactNode {
  return (
    <>
      <SiteHeader links={NAV_LINKS} heroImage="/images/members-hero.jpg" heroImagePosition="30%" />

      <main className="w-100 px-3">
        <Container className="text-center mb-4 container-narrow">
          <h1 className="mb-1">Miembros</h1>
          <div className="section-divider" />
        </Container>

        <Container fluid>
          {MEMBERS.map((member: Member, i: number) => (
            <FadeInSection key={member.name} delay={i * 150}>
              <MemberSection {...member} reverse={i % 2 !== 0} />
            </FadeInSection>
          ))}
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
