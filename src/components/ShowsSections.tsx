import type { ReactNode } from "react";
import Link from "next/link";
import { FiCalendar } from "react-icons/fi";
import { SiInstagram } from "react-icons/si";
import InstagramEmbed from "@/components/InstagramEmbed";
import JsonLd from "@/components/JsonLd";
import ShowPhotos from "@/components/ShowPhotos";
import { BAND_NAME, SITE_URL } from "@/data/band";
import type { PressLink, Show } from "@/data/shows";
import { instagramPoster } from "@/lib/instagram-poster";
import { formatShowDate } from "@/lib/show-schedule";
import { PAST_SHOWS, UPCOMING_SHOWS } from "@/lib/shows";
import { cx } from "@/lib/cx";
import styles from "./ShowsSections.module.css";

function upcomingShowJsonLd(show: Show): object {
  return {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: `${BAND_NAME} en ${show.venue}`,
    startDate: show.date,
    location: {
      "@type": "Place",
      name: show.venue,
      address: show.city,
    },
    performer: {
      "@type": "MusicGroup",
      name: BAND_NAME,
      url: SITE_URL,
    },
    ...(show.description ? { description: show.description } : {}),
    ...(show.ticketUrl ? { offers: { "@type": "Offer", url: show.ticketUrl } } : {}),
  };
}

// Fecha + "Fecha propia": la primera línea de todas las tarjetas de shows.
function ShowCardHeader({ show }: { show: Show }): ReactNode {
  return (
    <div className="d-flex justify-content-between align-items-baseline flex-wrap gap-2">
      <p className="text-brand mb-0 fw-bold d-inline-flex align-items-center gap-2">
        <FiCalendar aria-hidden="true" />
        {formatShowDate(show.date)}
      </p>
      {!show.invitedBy && <span className={styles.showBadge}>Fecha propia</span>}
    </div>
  );
}

function PastShowCard({ show, featured = false }: { show: Show; featured?: boolean }): ReactNode {
  const title: string = show.event ?? show.venue;
  return (
    <div className={cx(styles.showCard, featured && styles.showCardFeatured)}>
      <ShowCardHeader show={show} />
      <h3 className="mb-2 mt-1">{title}</h3>
      <p className="text-muted mb-0">{show.event ? `${show.venue} — ${show.city}` : show.city}</p>
      {show.description && <p className="text-muted mt-3">{show.description}</p>}
      <div className="d-flex flex-wrap gap-3 mt-3">
        {show.postUrl && (
          <a href={show.postUrl} className="icon-link icon-link--text" target="_blank" rel="noopener noreferrer">
            <SiInstagram aria-hidden />
            Ver publicación
          </a>
        )}
        {show.pressLinks?.map((link: PressLink) => (
          <a key={link.url} href={link.url} className="glow-hover text-brand" target="_blank" rel="noopener noreferrer">
            {link.label} ↗
          </a>
        ))}
      </div>
      {show.photos && show.photos.length > 0 && <ShowPhotos eventName={title} photos={show.photos} />}
    </div>
  );
}

function UpcomingShowCard({ show }: { show: Show }): ReactNode {
  return (
    <div>
      <div className={styles.showCard}>
        <ShowCardHeader show={show} />
        <h3 className="mb-2 mt-1">
          {show.venue} — {show.city}
        </h3>
        {show.description && <p className="text-muted mt-3 mb-0">{show.description}</p>}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">
          <div className="d-flex flex-wrap gap-3">
            {show.postUrl && (
              <a href={show.postUrl} className="icon-link icon-link--text" target="_blank" rel="noopener noreferrer">
                <SiInstagram aria-hidden />
                Ver publicación ↗
              </a>
            )}
            {show.ticketUrl && (
              <a href={show.ticketUrl} className="glow-hover text-brand d-inline-block">
                Entradas →
              </a>
            )}
          </div>
          {show.entry && <span className={styles.entryBadge}>{show.entry}</span>}
        </div>
      </div>
      {show.postUrl && (
        <div className="mt-4">
          <InstagramEmbed url={show.postUrl} poster={instagramPoster(show.postUrl)} />
        </div>
      )}
    </div>
  );
}

export function UpcomingShowsSection(): ReactNode {
  return (
    <section id="fechas" className="container mb-5 pb-4 container-narrow">
      {UPCOMING_SHOWS.map((show: Show) => (
        <JsonLd key={show.date} data={upcomingShowJsonLd(show)} />
      ))}
      <h2 className="mb-1 mt-5">Próximo Show</h2>
      <div className="section-divider" />
      {UPCOMING_SHOWS.length === 0 ? (
        <div className={styles.placeholderBox}>
          <p className="mb-0">
            No hay fechas confirmadas en este momento. ¿Querés que toquemos en tu evento?{" "}
            <Link href="/#contacto" className="glow-hover text-brand">
              Escribinos →
            </Link>
          </p>
        </div>
      ) : (
        <div className="text-start">
          {UPCOMING_SHOWS.map((show: Show) => (
            <UpcomingShowCard key={`${show.date}-${show.venue}`} show={show} />
          ))}
        </div>
      )}
    </section>
  );
}

export function LatestShowSection(): ReactNode {
  const latest: Show | undefined = PAST_SHOWS[0];
  if (!latest) return null;
  return (
    <section id="ultimo-show" className={cx("container pb-4 container-narrow", styles.latest)}>
      <h2 className="mb-1">Último Show</h2>
      <div className="section-divider" />
      <PastShowCard show={latest} featured />
    </section>
  );
}

export function PastShowsSection(): ReactNode {
  const byYear: Map<string, Show[]> = Map.groupBy(PAST_SHOWS, (show: Show): string => show.date.slice(0, 4));
  return (
    <section id="shows-anteriores" className="container mb-5 pb-4 container-narrow">
      <h2 className="mb-1">Shows Anteriores</h2>
      <div className="section-divider" />
      <div className={cx("text-start", styles.timeline)}>
        {Array.from(byYear.entries()).map(([year, shows]: [string, Show[]]) => (
          <div key={year}>
            <h3 className={styles.timelineYear}>{year}</h3>
            {shows.map((show: Show) => (
              <PastShowCard key={`${show.date}-${show.venue}`} show={show} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
