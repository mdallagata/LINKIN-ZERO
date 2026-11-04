import type { ReactNode } from "react";
import Link from "next/link";
import HeroImage from "@/components/HeroImage";
import { BAND_LOCATION, BAND_NAME, BAND_TAGLINE } from "@/data/band";
import { BOOKING_LINK } from "@/data/nav";
import type { Show } from "@/data/shows";
import { showDateParts } from "@/lib/show-schedule";
import { UPCOMING_SHOWS } from "@/lib/shows";
import { cx } from "@/lib/cx";
import styles from "./HomeHero.module.css";

// Hero de la home: foto a pantalla completa, el nombre de la banda enorme (el
// h1) y, abajo de todo, la próxima fecha, para que se vea sin scrollear.
export default function HomeHero(): ReactNode {
  const next: Show | undefined = UPCOMING_SHOWS[0];
  // La Ø final va en el color de marca.
  const wordmarkStart: string = BAND_NAME.slice(0, -1);
  const wordmarkEnd: string = BAND_NAME.slice(-1);

  return (
    <section className={styles.hero}>
      <HeroImage src="/images/show-hero.webp" position="26%" className={styles.shade} />
      <div className={cx("page-container", styles.content)}>
        <p className={styles.tagline}>
          {BAND_TAGLINE} · {BAND_LOCATION}
        </p>
        <h1 className={styles.wordmark}>
          {wordmarkStart}
          <span className={styles.wordmarkEnd}>{wordmarkEnd}</span>
        </h1>
        {next ? <NextShow show={next} /> : <NoUpcomingShows />}
      </div>
    </section>
  );
}

function NextShow({ show }: { show: Show }): ReactNode {
  const { day, month, weekday } = showDateParts(show.date);
  return (
    <Link href="/shows#proximo" className={styles.strip}>
      <span className={styles.stripLabel}>Próximo show</span>
      <time dateTime={show.date} className={styles.stripDate}>
        {weekday} {day} {month}
      </time>
      <span className={styles.stripMain}>
        <strong>{show.event ?? show.venue}</strong>
        <span className={styles.stripMuted}> — {show.event ? show.venue : show.city}</span>
      </span>
      {show.entry && <span className={styles.stripMuted}>{show.entry}</span>}
      <span className={styles.stripMore}>Más info →</span>
    </Link>
  );
}

function NoUpcomingShows(): ReactNode {
  return (
    <Link href={BOOKING_LINK.href} className={styles.strip}>
      <span className={styles.stripLabel}>Sin fechas confirmadas</span>
      <span className={styles.stripMain}>¿Querés que toquemos en tu evento?</span>
      <span className={styles.stripMore}>Escribinos →</span>
    </Link>
  );
}
