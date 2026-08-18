"use client";

import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import { SiInstagram } from "react-icons/si";

type Props = {
  url: string;
};

type EmbedInfo = {
  src: string;
  label: "Post" | "Reel";
};

function embedInfo(url: string): EmbedInfo | null {
  const postMatch = url.match(/instagram\.com\/p\/([^/?]+)/);
  if (postMatch) return { src: `https://www.instagram.com/p/${postMatch[1]}/embed`, label: "Post" };
  const reelMatch = url.match(/instagram\.com\/reel\/([^/?]+)/);
  if (reelMatch) return { src: `https://www.instagram.com/reel/${reelMatch[1]}/embed`, label: "Reel" };
  return null;
}

export default function InstagramEmbed({ url }: Props): ReactNode {
  const info: EmbedInfo | null = embedInfo(url);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  if (!info) {
    return (
      <div className="text-center text-muted py-4">
        URL de Instagram inválida
      </div>
    );
  }

  const aspectRatio: string = info.label === "Reel" ? "9 / 16" : "1 / 1.2";

  const containerStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: info.label === "Reel" ? 400 : 350,
    margin: "0 auto",
    aspectRatio,
  };

  const iframeStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    border: "none",
    borderRadius: 8,
    opacity: loaded ? 1 : 0,
    transition: "opacity 0.3s ease",
  };

  const handleLoad = (): void => setLoaded(true);
  const handleError = (): void => setError(true);

  return (
    <div className="text-center">
      <div style={containerStyle}>
        {!loaded && !error && (
          <div
            className="instagram-skeleton"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 8,
              background: "var(--surface-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="text-muted" style={{ fontSize: "0.85rem" }}>
              <SiInstagram size={32} aria-hidden className="mb-1" />
              <br />
              Cargando...
            </div>
          </div>
        )}

        {error ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-hover text-brand d-inline-flex align-items-center gap-2"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 8,
              background: "var(--surface-2)",
              textDecoration: "none",
            }}
          >
            <SiInstagram size={32} aria-hidden />
            <span>Ver en Instagram ↗</span>
          </a>
        ) : (
          <iframe
            src={info.src}
            title="Instagram"
            style={iframeStyle}
            allowFullScreen
            loading="lazy"
            scrolling="no"
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
      </div>
    </div>
  );
}
