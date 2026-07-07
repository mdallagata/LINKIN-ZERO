"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import type { PastShow, UpcomingShow } from "@/data/shows";
import { PAST_SHOWS, UPCOMING_SHOWS } from "@/data/shows";

function ShowPhotos({ photos }: { photos?: string[] }): ReactNode {
  if (!photos || photos.length === 0) return null;
  return (
    <div className="d-flex flex-wrap gap-2 mt-3">
      {photos.map((photo: string) => (
        <Image
          key={photo}
          src={photo}
          alt=""
          width={160}
          height={160}
          className="rounded"
          loading="lazy"
          style={{ objectFit: "cover", height: 120, width: 120 }}
        />
      ))}
    </div>
  );
}

function instagramPostUrl(embedUrl: string): string {
  return embedUrl.replace(/\/embed\/?$/, "");
}

function hasRealSetlist(setlist?: string[]): boolean {
  if (!setlist || setlist.length === 0) return false;
  return setlist.some((song: string) => song !== "PRÓXIMAMENTE");
}

function PastShowCard({ show, featured = false }: { show: PastShow; featured?: boolean }): ReactNode {
  return (
    <div className={`show-card${featured ? " show-card--featured" : ""}`}>
      <p className="text-brand mb-0 fw-bold font-mono">{show.date}</p>
      <h3 className="mb-2 mt-1">{show.event}</h3>
      <p className="text-muted mb-0">
        {show.venue} — {show.city}
      </p>
      {show.description && <p className="text-muted mt-3">{show.description}</p>}
      <ShowPhotos photos={show.photos} />
      {hasRealSetlist(show.setlist) && (
        <div className="mt-3">
          <h3 className="mb-2" style={{ fontSize: "0.95rem" }}>
            Setlist
          </h3>
          <ul className="list-unstyled mb-0 text-muted" style={{ columns: 2, columnGap: "1rem" }}>
            {show.setlist!.map((song: string, i: number) => (
              <li key={`${song}-${i}`} className="mb-1">
                {song}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="d-flex flex-wrap gap-3 mt-3">
        {show.embedUrl && (
          <a
            href={instagramPostUrl(show.embedUrl)}
            className="glow-hover text-brand"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver publicación en Instagram ↗
          </a>
        )}
        {show.detailsUrl && (
          <a href={show.detailsUrl} className="glow-hover text-brand" target="_blank" rel="noopener noreferrer">
            Ver más →
          </a>
        )}
      </div>
    </div>
  );
}

export function UpcomingShowsSection(): ReactNode {
  return (
    <Container as="section" id="fechas" className="mb-5 pb-4" style={{ maxWidth: 960 }}>
      <h2 className="mb-1">Próximas Fechas</h2>
      <div className="section-divider" />
      {UPCOMING_SHOWS.length === 0 ? (
        <div className="placeholder-box">
          <p className="mb-0">
            No hay fechas confirmadas por el momento. ¿Querés que toquemos en tu evento?{" "}
            <Link href="/#contacto" className="glow-hover text-brand">
              Escribinos →
            </Link>
          </p>
        </div>
      ) : (
        <div className="text-start">
          {UPCOMING_SHOWS.map((show: UpcomingShow) => (
            <div className="show-card" key={`${show.date}-${show.venue}`}>
              <p className="text-brand mb-0 fw-bold font-mono">{show.date}</p>
              <h3 className="mb-2 mt-1">
                {show.venue} — {show.city}
              </h3>
              {show.description && <p className="text-muted">{show.description}</p>}
              <ShowPhotos photos={show.photos} />
              <a href={show.ticketUrl} className="glow-hover text-brand d-inline-block mt-3">
                Entradas →
              </a>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

export function LatestShowSection(): ReactNode {
  const latest: PastShow | undefined = PAST_SHOWS[0];
  if (!latest) return null;
  return (
    <Container as="section" id="ultimo-show" className="mb-5 pb-4" style={{ maxWidth: 960 }}>
      <h2 className="mb-1">Último Show</h2>
      <div className="section-divider" />
      <div className="text-start">
        <PastShowCard show={latest} featured />
      </div>
    </Container>
  );
}

export function PastShowsSection(): ReactNode {
  return (
    <Container as="section" id="shows-anteriores" className="mb-5 pb-4" style={{ maxWidth: 960 }}>
      <h2 className="mb-1">Shows Anteriores</h2>
      <div className="section-divider" />
      <div className="text-start">
        {PAST_SHOWS.map((show: PastShow) => (
          <PastShowCard key={`${show.date}-${show.venue}`} show={show} />
        ))}
      </div>
    </Container>
  );
}
