import type { Metadata } from "next";
import type { ReactNode } from "react";
import MemberSection from "@/components/MemberSection";
import PageHero from "@/components/PageHero";
import { BAND_NAME } from "@/data/band";
import { type Member, MEMBERS } from "@/data/members";
import { listInSpanish, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Integrantes",
  description: `Conocé a los integrantes de ${BAND_NAME}: ${listInSpanish(MEMBERS.map((m: Member): string => `${m.name} (${m.role.toLowerCase()})`))}.`,
  path: "/members",
});

export default function MembersPage(): ReactNode {
  return (
    <main>
      <PageHero title="Integrantes" eyebrow="La banda" image="/images/members-hero.webp" imagePosition="50%" />
      <div className="page-container section pt-4">
        {MEMBERS.map((member: Member) => (
          <MemberSection key={member.name} {...member} loading="lazy" />
        ))}
      </div>
    </main>
  );
}
