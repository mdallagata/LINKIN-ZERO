"use client";

import type { MouseEvent, ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import { FiCalendar } from "react-icons/fi";
import { SiInstagram } from "react-icons/si";
import FadeInImage from "@/components/FadeInImage";
import JsonLd from "@/components/JsonLd";
import ShowPhotoGallery from "@/components/ShowPhotoGallery";
import { BAND_NAME, SITE_URL } from "@/data/band";
import type { PastShow, PressLink, UpcomingShow } from "@/data/shows";
import { SORTED_PAST_SHOWS, UPCOMING_SHOWS } from "@/data/shows";

function upcomingShowJsonLd(show: UpcomingShow): object {
  return {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: `${BAND_NAME} en ${show.venue}`,
    startDate: show.startDate,
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

const EMBED_SUFFIX_RE = /\/embed\/?$/;
const EXTENSION_RE = /\.(\w+)$/;

function instagramPostUrl(embedUrl: string): string {
  return embedUrl.replace(EMBED_SUFFIX_RE, "");
}

// Las miniaturas de show-card usan una versión chica pre-generada
// (ver public/images/shows/*/*-thumb.webp) en vez de la foto completa —
// mostrar un archivo de foto completa en un recuadro de 120x90 desperdicia
// la mayor parte de la descarga.
function thumbUrl(photo: string): string {
  return photo.replace(EXTENSION_RE, "-thumb.$1");
}

type GalleryTarget = { show: PastShow; index: number };

// Mantiene los datos de la galería vivos hasta que termina la animación de
// cierre del modal (onExited) — si se limpiaran en onHide, el modal se
// vaciaría de golpe a mitad del fade en vez de cerrarse suave.
function useShowGallery(): {
  target: GalleryTarget | null;
  visible: boolean;
  open: (show: PastShow, index: number) => void;
  hide: () => void;
  clear: () => void;
} {
  const [target, setTarget] = useState<GalleryTarget | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  return {
    target,
    visible,
    open: (show: PastShow, index: number): void => {
      setTarget({ show, index });
      setVisible(true);
    },
    hide: (): void => setVisible(false),
    clear: (): void => setTarget(null),
  };
}

function PastShowCard({
  show,
  featured = false,
  onShowPhotos,
}: {
  show: PastShow;
  featured?: boolean;
  onShowPhotos?: (show: PastShow, index: number) => void;
}): ReactNode {
  const hasPhotos: boolean = Boolean(show.photos && show.photos.length > 0);
  const photoCount: number = show.photos?.length ?? 0;

  return (
    <div className={`show-card${featured ? " show-card--featured" : ""}`}>
      <div className="d-flex justify-content-between align-items-baseline flex-wrap gap-2">
        <p className="text-brand mb-0 fw-bold d-inline-flex align-items-center gap-2">
          <FiCalendar aria-hidden="true" />
          {show.date}
        </p>
        {!show.invitedBy && <p className="show-badge mb-0">Fecha propia</p>}
      </div>
      <h3 className="mb-2 mt-1">{show.event}</h3>
      <p className="text-muted mb-0">
        {show.venue} — {show.city}
      </p>
      {show.description && <p className="text-muted mt-3">{show.description}</p>}
      <div className="d-flex flex-wrap gap-3 mt-3">
        {show.embedUrl && (
          <a
            href={instagramPostUrl(show.embedUrl)}
            className="icon-link icon-link--text"
            target="_blank"
            rel="noopener noreferrer"
          >
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

      {hasPhotos && (
        <div className="d-flex gap-2 mt-3 flex-wrap justify-content-center">
          {show.photos!.slice(0, 3).map((photo: string, i: number) => (
            <button
              key={photo}
              type="button"
              className="show-card-thumb"
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                onShowPhotos?.(show, i);
              }}
              aria-label={`Ver foto ${i + 1}`}
            >
              <FadeInImage
                src={thumbUrl(photo)}
                alt={`${show.event} — Foto ${i + 1}`}
                width={120}
                height={90}
                className="show-card-thumb-img"
                loading="eager"
              />
            </button>
          ))}
          {photoCount > 3 && (
            <button
              type="button"
              className="show-card-thumb show-card-thumb--more"
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                onShowPhotos?.(show, 0);
              }}
              aria-label="Ver todas las fotos"
            >
              <span>+{photoCount - 3}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function PastShowsContent(): ReactNode {
  const gallery = useShowGallery();

  // Group shows by year extracted from sortKey
  const byYear: Map<string, PastShow[]> = new Map();
  for (const show of SORTED_PAST_SHOWS) {
    const year: string = show.sortKey.slice(0, 4);
    const group: PastShow[] = byYear.get(year) ?? [];
    group.push(show);
    byYear.set(year, group);
  }

  return (
    <>
      <div className="text-start timeline">
        {Array.from(byYear.entries()).map(([year, shows]: [string, PastShow[]]) => (
          <div key={year}>
            <h3 className="timeline-year">{year}</h3>
            {shows.map((show: PastShow) => (
              <PastShowCard
                key={`${show.date}-${show.venue}`}
                show={show}
                onShowPhotos={gallery.open}
              />
            ))}
          </div>
        ))}
      </div>
      {gallery.target && gallery.target.show.photos && (
        <ShowPhotoGallery
          eventName={gallery.target.show.event}
          photos={gallery.target.show.photos}
          photoIndex={gallery.target.index}
          show={gallery.visible}
          onHide={gallery.hide}
          onExited={gallery.clear}
        />
      )}
    </>
  );
}

export function UpcomingShowsSection(): ReactNode {
  return (
    <Container as="section" id="fechas" className="mb-5 pb-4 container-narrow">
      {UPCOMING_SHOWS.map((show: UpcomingShow) => (
        <JsonLd key={show.startDate} data={upcomingShowJsonLd(show)} />
      ))}
      <h2 className="mb-1 mt-5">Próximo Show</h2>
      <div className="section-divider" />
      {UPCOMING_SHOWS.length === 0 ? (
        <div className="placeholder-box">
          <p className="mb-0">
            No hay fechas confirmadas en este momento. ¿Querés que toquemos en tu evento?{" "}
            <Link href="/#contacto" className="glow-hover text-brand">
              Escribinos →
            </Link>
          </p>
        </div>
      ) : (
        <div className="text-start">
          {UPCOMING_SHOWS.map((show: UpcomingShow) => (
            <div className="show-card" key={`${show.date}-${show.venue}`}>
              <div className="d-flex justify-content-between align-items-baseline flex-wrap gap-2">
                <p className="text-brand mb-0 fw-bold d-inline-flex align-items-center gap-2">
                  <FiCalendar aria-hidden="true" />
                  {show.date}
                </p>
                {!show.invitedBy && <span className="show-badge">Fecha propia</span>}
              </div>
              <h3 className="mb-2 mt-1">
                {show.venue} — {show.city}
              </h3>
              {show.description && <p className="text-muted mt-3 mb-0">{show.description}</p>}
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">
                <div className="d-flex flex-wrap gap-3">
                  {show.promoUrl && (
                    <a
                      href={show.promoUrl}
                      className="icon-link icon-link--text"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SiInstagram aria-hidden />
                      {show.promoLabel ?? "Promo"} ↗
                    </a>
                  )}
                  {show.ticketUrl && (
                    <a href={show.ticketUrl} className="glow-hover text-brand d-inline-block">
                      Entradas →
                    </a>
                  )}
                </div>
                {show.entry && <span className="entry-badge">{show.entry}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

export function LatestShowSection(): ReactNode {
  const gallery = useShowGallery();
  const latest: PastShow | undefined = SORTED_PAST_SHOWS[0];
  if (!latest) return null;
  return (
    <Container
      as="section"
      id="ultimo-show"
      className="pb-4 container-narrow"
      style={{ marginTop: "4.5rem" }}
    >
      <h2 className="mb-1">Último Show</h2>
      <div className="section-divider" />
      <PastShowCard show={latest} featured onShowPhotos={gallery.open} />
      {gallery.target && gallery.target.show.photos && (
        <ShowPhotoGallery
          eventName={gallery.target.show.event}
          photos={gallery.target.show.photos}
          photoIndex={gallery.target.index}
          show={gallery.visible}
          onHide={gallery.hide}
          onExited={gallery.clear}
        />
      )}
    </Container>
  );
}

export function PastShowsSection(): ReactNode {
  return (
    <Container as="section" id="shows-anteriores" className="mb-5 pb-4 container-narrow">
      <h2 className="mb-1">Shows Anteriores</h2>
      <div className="section-divider" />
      <PastShowsContent />
    </Container>
  );
}
