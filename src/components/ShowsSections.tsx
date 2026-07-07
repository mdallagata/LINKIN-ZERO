"use client";

import Image from "next/image";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import { INSTAGRAM_URL } from "@/data/band";
import type { PastShow, UpcomingShow } from "@/data/shows";
import { PAST_SHOWS, UPCOMING_SHOWS } from "@/data/shows";

function ShowPhotos({ photos }: { photos?: string[] }) {
  if (!photos || photos.length === 0) return null;
  return (
    <div className="d-flex flex-wrap gap-2 mt-3">
      {photos.map((photo) => (
        <Image
          key={photo}
          src={photo}
          alt=""
          width={160}
          height={160}
          className="rounded"
          style={{ objectFit: "cover", height: 120, width: 120 }}
        />
      ))}
    </div>
  );
}

function PastShowItem({ show, index }: { show: PastShow; index: number }) {
  return (
    <Accordion.Item eventKey={String(index)}>
      <Accordion.Header>
        <div>
          <p className="glow-sm text-brand mb-0 fw-bold">{show.date}</p>
          <p className="glow-sm mb-0" style={{ color: "rgb(174, 214, 214)" }}>
            {show.event}
            <br />
            {show.venue} — {show.city}
          </p>
        </div>
      </Accordion.Header>
      <Accordion.Body>
        {show.description && (
          <p className="glow-sm" style={{ color: "rgb(174, 214, 214)" }}>
            {show.description}
          </p>
        )}
        <ShowPhotos photos={show.photos} />
        {show.detailsUrl && (
          <a
            href={show.detailsUrl}
            className="glow-hover text-brand d-inline-block mt-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver más →
          </a>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}

export function UpcomingShowsSection() {
  return (
    <Container as="section" id="fechas" className="mb-5 pb-4" style={{ maxWidth: 700 }}>
      <h1 className="glow-lg text-decoration-underline mb-4">Próximas Fechas</h1>
      {UPCOMING_SHOWS.length === 0 ? (
        <div className="placeholder-box">
          <p className="mb-0">
            No hay fechas confirmadas por el momento. Seguinos en{" "}
            <a
              href={INSTAGRAM_URL}
              className="glow-hover text-brand"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>{" "}
            para enterarte primero.
          </p>
        </div>
      ) : (
        <Accordion className="shows-accordion text-start">
          {UPCOMING_SHOWS.map((show: UpcomingShow, index: number) => (
            <Accordion.Item eventKey={String(index)} key={`${show.date}-${show.venue}`}>
              <Accordion.Header>
                <div>
                  <p className="glow-sm text-brand mb-0 fw-bold">{show.date}</p>
                  <p className="glow-sm mb-0" style={{ color: "rgb(174, 214, 214)" }}>
                    {show.venue} — {show.city}
                  </p>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                {show.description && (
                  <p className="glow-sm" style={{ color: "rgb(174, 214, 214)" }}>
                    {show.description}
                  </p>
                )}
                <ShowPhotos photos={show.photos} />
                <a href={show.ticketUrl} className="glow-hover text-brand d-inline-block mt-3">
                  Entradas →
                </a>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Container>
  );
}

export function LatestShowSection() {
  const latest = PAST_SHOWS[0];
  if (!latest) return null;
  return (
    <Container as="section" id="ultimo-show" className="mb-5 pb-4" style={{ maxWidth: 700 }}>
      <h1 className="glow-lg text-decoration-underline mb-4">Último Show</h1>
      <Accordion className="shows-accordion text-start">
        <PastShowItem show={latest} index={0} />
      </Accordion>
    </Container>
  );
}

export function PastShowsSection() {
  return (
    <Container
      as="section"
      id="shows-anteriores"
      className="mb-5 pb-4"
      style={{ maxWidth: 700 }}
    >
      <h1 className="glow-lg text-decoration-underline mb-4">Shows Anteriores</h1>
      <Accordion className="shows-accordion text-start">
        {PAST_SHOWS.map((show: PastShow, index: number) => (
          <PastShowItem key={`${show.date}-${show.venue}`} show={show} index={index} />
        ))}
      </Accordion>
    </Container>
  );
}
