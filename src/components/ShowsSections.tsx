"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import { SiInstagram } from "react-icons/si";
import type { PastShow, PressLink, UpcomingShow } from "@/data/shows";
import { SORTED_PAST_SHOWS, UPCOMING_SHOWS } from "@/data/shows";

function instagramPostUrl(embedUrl: string): string {
  return embedUrl.replace(/\/embed\/?$/, "");
}

function PastShowCard({ show, featured = false }: { show: PastShow; featured?: boolean }): ReactNode {
  return (
    <div className={`show-card${featured ? " show-card--featured" : ""}`}>
      <div className="d-flex justify-content-between align-items-baseline flex-wrap gap-2">
        <p className="text-brand mb-0 fw-bold">{show.date}</p>
        <p className="show-badge mb-0">
          {show.invitedBy ? `Invitados por ${show.invitedBy}` : "Fecha propia"}
        </p>
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
            className="instagram-link"
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
    </div>
  );
}

export function UpcomingShowsSection(): ReactNode {
  return (
    <Container as="section" id="fechas" className="mb-5 pb-4" style={{ maxWidth: 960 }}>
      <h2 className="mb-1 mt-5">Próximos Shows</h2>
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
              <p className="text-brand mb-0 fw-bold">{show.date}</p>
              <h3 className="mb-2 mt-1">
                {show.venue} — {show.city}
              </h3>
              {show.description && <p className="text-muted">{show.description}</p>}
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
  const latest: PastShow | undefined = SORTED_PAST_SHOWS[0];
  if (!latest) return null;
  return (
    <Container
      as="section"
      id="ultimo-show"
      className="pb-4"
      style={{ maxWidth: 960, marginTop: "4.5rem", marginBottom: "4.5rem" }}
    >
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
        {SORTED_PAST_SHOWS.map((show: PastShow) => (
          <PastShowCard key={`${show.date}-${show.venue}`} show={show} />
        ))}
      </div>
    </Container>
  );
}
