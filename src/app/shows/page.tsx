import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { PastShowsSection, UpcomingShowsSection } from "@/components/ShowsSections";
import { BAND_NAME } from "@/data/band";
import { SUBPAGE_NAV_LINKS } from "@/data/nav";

export const metadata: Metadata = {
  title: `Shows — ${BAND_NAME}`,
};

export default function ShowsPage() {
  return (
    <>
      <SiteHeader links={SUBPAGE_NAV_LINKS} />

      <main className="w-100 px-3">
        <UpcomingShowsSection />

        <PastShowsSection />
      </main>

      <SiteFooter />
    </>
  );
}
