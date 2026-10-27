import type { Metadata } from "next";
import type { ReactNode } from "react";
import Container from "react-bootstrap/Container";
import FadeInSection from "@/components/FadeInSection";
import MemberSection from "@/components/MemberSection";
import ScrollToContent from "@/components/ScrollToContent";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { BAND_NAME } from "@/data/band";
import { type Member, MEMBERS } from "@/data/members";
import { NAV_LINKS } from "@/data/nav";
import { listInSpanish, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Miembros",
  description: `Conocé a los integrantes de ${BAND_NAME}: ${listInSpanish(MEMBERS.map((m: Member): string => `${m.name} (${m.role.toLowerCase()})`))}.`,
  path: "/members",
});

export default function MembersPage(): ReactNode {
  return (
    <>
      <SiteHeader links={NAV_LINKS} heroImage="/images/members-hero.webp" heroImagePosition="50%" />

      <ScrollToContent selector="#members-heading" />

      <main className="w-100 px-3">
        <Container className="text-center mb-4 container-narrow" id="members-heading">
          <h1 className="mb-1">Miembros</h1>
          <div className="section-divider" />
        </Container>

        <Container fluid>
          {MEMBERS.map((member: Member, i: number) => (
            <FadeInSection key={member.name} delay={i * 150}>
              <MemberSection {...member} reverse={i % 2 !== 0} loading="lazy" />
            </FadeInSection>
          ))}
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
