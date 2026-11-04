import type { ReactNode } from "react";
import Link from "next/link";
import { SiInstagram } from "react-icons/si";
import FadeInImage from "@/components/FadeInImage";
import InstagramEmbed from "@/components/InstagramEmbed";
import JsonLd from "@/components/JsonLd";
import ShowGalleryButton from "@/components/ShowGalleryButton";
import ShowPhotos from "@/components/ShowPhotos";
import { BAND_NAME, SITE_URL } from "@/data/band";
import { BOOKING_LINK } from "@/data/nav";
import type { PressLink, Show } from "@/data/shows";
import { instagramPoster } from "@/lib/instagram-poster";
import { showDateParts } from "@/lib/show-schedule";
import { PAST_SHOWS, UPCOMING_SHOWS } from "@/lib/shows";
import { cx } from "@/lib/cx";
import styles from "./ShowsSections.module.css";

/** Shows anteriores en la lista de la home (el resto, en /shows). */
const HOME_PAST_SHOWS: number = 4;

function upcomingShowJsonLd(show: Show): object {
  return {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: `${BAND_NAME} en ${show.event ?? show.venue}`,
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

function UpcomingShowsJsonLd(): ReactNode {
  return UPCOMING_SHOWS.map((show: Show) => <JsonLd key={`${show.date}-${show.venue}`} data={upcomingShowJsonLd(show)} />);
}

// Sin nombre de evento, el título es el lugar y debajo va solo la ciudad.
function showTitle(show: Show): string {
  return show.event ?? show.venue;
}

function showPlace(show: Show): string {
  return show.event ? `${show.venue} · ${show.city}` : show.city;
}

function showHost(show: Show): string {
  return show.invitedBy ? `Invitados por ${show.invitedBy}` : "Fecha propia";
}

/** id de cada show en /shows, para linkearlo desde la home: "2025-11-08-mendoza-1084". */
function showAnchor(show: Show): string {
  const venue: string = show.venue
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${show.date}-${venue}`;
}

function ShowDate({ date, highlight = false, large = false }: { date: string; highlight?: boolean; large?: boolean }): ReactNode {
  const { day, month, weekday, year } = showDateParts(date);
  return (
    <time dateTime={date} className={cx(styles.date, highlight && styles.dateHighlight, large && styles.dateLarge)}>
      <span className={styles.dateDay}>
        {day} {month}
      </span>
      <span className={styles.dateMeta}>
        {weekday} · {year}
      </span>
    </time>
  );
}

// Una fila de la lista de fechas de la home: fecha, foto (siempre a color), show, quién nos invitó y la acción.
// Toda la fila lleva al show en /shows (el link del título se estira sobre ella).
function ShowRow({ show, upcoming }: { show: Show; upcoming: boolean }): ReactNode {
  const title: string = showTitle(show);
  const href: string = `/shows#${showAnchor(show)}`;
  const thumbnail: string | undefined = show.photos?.[(show.coverPhoto ?? 1) - 1];
  return (
    <li className={styles.row}>
      <ShowDate date={show.date} highlight={upcoming} />
      <div className={styles.rowMedia}>
        {upcoming ? (
          <span className={styles.upcomingBox}>Próximo</span>
        ) : (
          thumbnail && <FadeInImage src={thumbnail} alt="" width={132} height={88} className={styles.rowThumb} />
        )}
      </div>
      <div className={styles.rowMain}>
        {upcoming && <span className={styles.upcomingLabel}>Próximo</span>}
        <h3 className={styles.title}>
          <Link href={href} className={styles.rowLink}>
            {title}
          </Link>
        </h3>
        <p className={styles.place}>{showPlace(show)}</p>
      </div>
      <p className={styles.rowNote}>{upcoming ? (show.entry ?? showHost(show)) : showHost(show)}</p>
      <div className={styles.rowAction}>
        {upcoming ? (
          <Link href={href} className="text-link">
            Más info →
          </Link>
        ) : show.photos && show.photos.length > 0 ? (
          <ShowGalleryButton eventName={title} photos={show.photos} className="text-link" />
        ) : (
          show.postUrl && (
            <a href={show.postUrl} className="text-link" target="_blank" rel="noopener noreferrer">
              Instagram ↗
            </a>
          )
        )}
      </div>
    </li>
  );
}

/** Home: los próximos shows y los últimos anteriores, como lista de gira. */
export function ShowListSection(): ReactNode {
  const past: Show[] = PAST_SHOWS.slice(0, HOME_PAST_SHOWS);
  return (
    <section id="fechas" className="page-container section">
      <UpcomingShowsJsonLd />
      <div className="section-header">
        <h2>Fechas</h2>
        <Link href="/shows" className="text-link">
          Historial completo →
        </Link>
      </div>
      <ul className={styles.rows}>
        {UPCOMING_SHOWS.map((show: Show) => (
          <ShowRow key={`${show.date}-${show.venue}`} show={show} upcoming />
        ))}
        {past.map((show: Show) => (
          <ShowRow key={`${show.date}-${show.venue}`} show={show} upcoming={false} />
        ))}
      </ul>
    </section>
  );
}

function UpcomingShow({ show }: { show: Show }): ReactNode {
  return (
    <article id={showAnchor(show)} className={styles.upcomingShow}>
      <div className={styles.upcomingInfo}>
        <ShowDate date={show.date} highlight large />
        <h3 className={styles.upcomingTitle}>{showTitle(show)}</h3>
        <p className={styles.place}>{showPlace(show)}</p>
        {show.description && <p className={styles.description}>{show.description}</p>}
        {show.entry && <p className={styles.entry}>{show.entry}</p>}
        <div className={styles.links}>
          {show.ticketUrl && (
            <a href={show.ticketUrl} className="button button--solid">
              Entradas
            </a>
          )}
          {show.postUrl && (
            <a href={show.postUrl} className="text-link" target="_blank" rel="noopener noreferrer">
              <SiInstagram aria-hidden />
              Ver publicación ↗
            </a>
          )}
        </div>
      </div>
      {show.postUrl && (
        <div className={styles.upcomingEmbed}>
          <InstagramEmbed url={show.postUrl} poster={instagramPoster(show.postUrl)} />
        </div>
      )}
    </article>
  );
}

/** /shows: la próxima fecha en detalle, con la publicación de Instagram. */
export function UpcomingShowsSection(): ReactNode {
  return (
    <section id="proximo" className={cx("page-container section", styles.upcomingSection)}>
      <UpcomingShowsJsonLd />
      <h2 className={styles.sectionTitle}>{UPCOMING_SHOWS.length > 1 ? "Próximos shows" : "Próximo show"}</h2>
      {UPCOMING_SHOWS.length === 0 ? (
        <div className={styles.empty}>
          <p className="mb-0">No hay fechas confirmadas en este momento.</p>
          <Link href={BOOKING_LINK.href} className="text-link">
            ¿Querés que toquemos en tu evento? Escribinos →
          </Link>
        </div>
      ) : (
        UPCOMING_SHOWS.map((show: Show) => <UpcomingShow key={`${show.date}-${show.venue}`} show={show} />)
      )}
    </section>
  );
}

function PastShow({ show }: { show: Show }): ReactNode {
  const title: string = showTitle(show);
  return (
    <li id={showAnchor(show)} className={styles.pastShow}>
      <ShowDate date={show.date} />
      <div className={styles.pastMain}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.place}>{showPlace(show)}</p>
        <p className={styles.host}>{showHost(show)}</p>
        {show.description && <p className={styles.description}>{show.description}</p>}
        {(show.postUrl || show.pressLinks) && (
          <div className={styles.links}>
            {show.postUrl && (
              <a href={show.postUrl} className="text-link" target="_blank" rel="noopener noreferrer">
                <SiInstagram aria-hidden />
                Ver publicación ↗
              </a>
            )}
            {show.pressLinks?.map((link: PressLink) => (
              <a key={link.url} href={link.url} className="text-link" target="_blank" rel="noopener noreferrer">
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
        {show.photos && show.photos.length > 0 && <ShowPhotos eventName={title} photos={show.photos} />}
      </div>
    </li>
  );
}

/** /shows: todos los shows anteriores, agrupados por año. */
export function PastShowsSection(): ReactNode {
  const byYear: Map<string, Show[]> = Map.groupBy(PAST_SHOWS, (show: Show): string => show.date.slice(0, 4));
  return (
    <section id="shows-anteriores" className="page-container section pt-0">
      <h2 className={styles.sectionTitle}>Shows anteriores</h2>
      {Array.from(byYear.entries()).map(([year, shows]: [string, Show[]]) => (
        <div key={year} className={styles.year}>
          <h3 className={styles.yearTitle}>{year}</h3>
          <ul className={styles.pastList}>
            {shows.map((show: Show) => (
              <PastShow key={`${show.date}-${show.venue}`} show={show} />
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
