import type { Metadata } from "next";
import type { ReactNode } from "react";
import Container from "react-bootstrap/Container";
import FadeInSection from "@/components/FadeInSection";
import MemberSection from "@/components/MemberSection";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { BAND_NAME, BAND_TAGLINE } from "@/data/band";
import { Member, MEMBERS } from "@/data/members";
import { NAV_LINKS } from "@/data/nav";

export const metadata: Metadata = {
  title: `Miembros — ${BAND_NAME}`,
  description:
    `Conocé a los integrantes de ${BAND_NAME}: Lucas Sorroza (batería), Gustavo Monjes (bajo), ` +
    `Mariano Cruz (voz), Mauricio Dall'Agata (guitarra) y Exequiel Mleziva (voz/guitarra).`,
  openGraph: {
    title: `Miembros — ${BAND_NAME}`,
    description: BAND_TAGLINE,
  },
};

export default function MembersPage(): ReactNode {
  return (
    <>
      <SiteHeader links={NAV_LINKS} />

      <main className="w-100 px-3">
        <Container fluid>
          {MEMBERS.map((member: Member, i: number) => (
            <FadeInSection key={member.name}>
              <MemberSection {...member} priority={i === 0} />
            </FadeInSection>
          ))}
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
