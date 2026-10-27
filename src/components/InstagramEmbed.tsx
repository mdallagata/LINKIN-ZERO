"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SiInstagram } from "react-icons/si";
import type { InstagramEmbedInfo } from "@/lib/instagram-embed";
import { instagramEmbedInfo } from "@/lib/instagram-embed";

type Props = {
  url: string;
  /** Captura del embed (`pnpm instagram-poster <url>`). Con portada, el iframe se crea recién al tocarla. */
  poster?: string;
};

type Status = "waiting" | "loading" | "loaded";

// Si el embed tarda más que esto (red lenta, post borrado o privado) aparece
// el link a Instagram, pero el iframe sigue cargando y lo reemplaza si llega.
const SLOW_AFTER_MS: number = 8000;

// El iframe nunca viene en el HTML del servidor: si terminara de cargar antes
// de que React hidrate, onLoad se perdería. Sin portada se crea al entrar en
// pantalla; con portada, cuando la tocan (el embed son ~50 pedidos a Instagram
// que no tiene sentido hacer si nadie va a mirar el video).
export default function InstagramEmbed({ url, poster }: Props): ReactNode {
  const info: InstagramEmbedInfo | null = instagramEmbedInfo(url);
  const [status, setStatus] = useState<Status>("waiting");
  const [slow, setSlow] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect((): void | (() => void) => {
    const el: HTMLDivElement | null = containerRef.current;
    if (poster || !el) return;
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setStatus("loading");
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return (): void => observer.disconnect();
  }, [poster]);

  useEffect((): void | (() => void) => {
    if (status !== "loading") return;
    const timeoutId: number = window.setTimeout((): void => setSlow(true), SLOW_AFTER_MS);
    return (): void => window.clearTimeout(timeoutId);
  }, [status]);

  if (!info) {
    return <div className="text-center text-muted py-4">URL de Instagram inválida</div>;
  }

  const frameStyle: CSSProperties = { maxWidth: info.width, aspectRatio: info.aspectRatio };

  return (
    <div ref={containerRef} className="instagram-embed" style={frameStyle}>
      {status !== "loaded" &&
        (poster ? (
          <button
            type="button"
            className="instagram-poster"
            onClick={() => setStatus("loading")}
            disabled={status === "loading"}
            aria-label="Cargar la publicación de Instagram"
          >
            <Image src={poster} alt="" fill sizes={`${info.width}px`} />
            <span className={`instagram-poster__hint${status === "loading" ? " instagram-skeleton" : ""}`}>
              <SiInstagram aria-hidden />
              {status === "loading" ? "Cargando…" : "Tocá para cargar"}
            </span>
          </button>
        ) : (
          <div className="instagram-placeholder instagram-skeleton">
            <SiInstagram size={32} aria-hidden />
            Cargando...
          </div>
        ))}

      {status !== "waiting" && (
        <iframe
          src={info.src}
          title="Publicación de Instagram"
          className={`instagram-frame${status === "loaded" ? " is-loaded" : ""}`}
          allowFullScreen
          scrolling="no"
          onLoad={() => setStatus("loaded")}
        />
      )}

      {slow && status === "loading" && (
        <a href={url} target="_blank" rel="noopener noreferrer" className="instagram-fallback glow-hover text-brand">
          <SiInstagram size={32} aria-hidden />
          <span>Ver en Instagram ↗</span>
        </a>
      )}
    </div>
  );
}
