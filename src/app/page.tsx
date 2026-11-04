import type { Metadata } from "next";
import type { ReactNode } from "react";
import BookingSection from "@/components/BookingSection";
import HomeHero from "@/components/HomeHero";
import InstagramEmbed from "@/components/InstagramEmbed";
import MemberGrid from "@/components/MemberGrid";
import PhotoShowcase from "@/components/PhotoShowcase";
import { ShowListSection } from "@/components/ShowsSections";
import type { BandFact } from "@/data/band";
import { BAND_DESCRIPTION, BAND_FACTS, BAND_NAME, BAND_STATEMENT } from "@/data/band";
import { LIVE_VIDEOS_URL, REEL_URL } from "@/data/instagram";
import { instagramPoster } from "@/lib/instagram-poster";
import { cx } from "@/lib/cx";
import styles from "./page.module.css";

// Título, descripción y openGraph de la home son los del layout.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home(): ReactNode {
  return (
    <main>
      <HomeHero />

      <section id="quienes-somos" className={cx("page-container section", styles.about)}>
        <div className={styles.aboutLead}>
          <p className="eyebrow">Quiénes somos</p>
          <h2 className={styles.statement}>{BAND_STATEMENT}</h2>
        </div>
        <div className={styles.aboutBody}>
          <p className={styles.description}>{BAND_DESCRIPTION}</p>
          <dl className={styles.facts}>
            {BAND_FACTS.map((fact: BandFact) => (
              <div key={fact.label} className={styles.fact}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <PhotoShowcase
        src="/images/todos.webp"
        alt="Los integrantes de LINKIN ZERØ en Obscene Fest"
        width={2800}
        height={1864}
        caption="Obscene Fest — Nü Sessions Vol. I · Noviembre 2025"
      />

      <ShowListSection />

      <section id="en-vivo" className={cx("page-container section", styles.live)}>
        <div className={styles.liveText}>
          <h2>En vivo</h2>
          <p className={styles.description}>Así suena {BAND_NAME} arriba del escenario.</p>
          <a href={LIVE_VIDEOS_URL} className="text-link" target="_blank" rel="noopener noreferrer">
            Más videos en Instagram ↗
          </a>
        </div>
        <div className={styles.liveEmbed}>
          <InstagramEmbed url={REEL_URL} poster={instagramPoster(REEL_URL)} />
        </div>
      </section>

      <MemberGrid />

      <BookingSection />
    </main>
  );
}
