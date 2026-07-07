import type { Metadata } from "next";
import type { ReactNode } from "react";
import Container from "react-bootstrap/Container";
import MemberSection from "@/components/MemberSection";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { BAND_NAME } from "@/data/band";
import { MEMBERS } from "@/data/members";
import { SUBPAGE_NAV_LINKS } from "@/data/nav";

export const metadata: Metadata = {
  title: `Miembros — ${BAND_NAME}`,
};

export default function MembersPage(): ReactNode {
  return (
    <>
      <SiteHeader links={SUBPAGE_NAV_LINKS} />

      <main className="w-100 px-3">
        <Container fluid>
          {MEMBERS.map((member) => (
            <MemberSection key={member.name} {...member} />
          ))}
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
