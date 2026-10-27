"use client";

import type { ReactNode } from "react";
import { useEffect, useEffectEvent } from "react";
import PhotoDialog from "@/components/PhotoDialog";
import ZoomableImage from "@/components/ZoomableImage";
import { cx } from "@/lib/cx";
import styles from "./ShowPhotoGallery.module.css";

type ShowPhotoGalleryProps = {
  eventName: string;
  photos: string[];
  /** Foto que se muestra; la controla el padre (ShowPhotos) para abrir en la miniatura elegida. */
  index: number;
  onIndexChange: (index: number) => void;
  open: boolean;
  onClose: () => void;
};

export default function ShowPhotoGallery({ eventName, photos, index, onIndexChange, open, onClose }: ShowPhotoGalleryProps): ReactNode {
  const photo: string | undefined = photos[index];
  const canGoPrev: boolean = index > 0;
  const canGoNext: boolean = index < photos.length - 1;

  // Botones, flechas del teclado y swipe pasan todos por acá.
  const goPrev = (): void => {
    if (canGoPrev) onIndexChange(index - 1);
  };
  const goNext = (): void => {
    if (canGoNext) onIndexChange(index + 1);
  };

  const handleKeyDown = useEffectEvent((e: KeyboardEvent): void => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  });

  useEffect((): void | (() => void) => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent): void => handleKeyDown(e);
    window.addEventListener("keydown", onKeyDown);
    return (): void => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <PhotoDialog open={open} onClose={onClose} label={`Fotos de ${eventName}`} bodyClassName="p-3 d-flex flex-column">
      <div className={styles.showPhotoFull}>
        {photo && (
          <ZoomableImage
            key={photo}
            src={photo}
            alt={`${eventName} — Foto ${index + 1}`}
            fill
            sizes="(min-width: 1200px) 1110px, (min-width: 992px) 770px, (min-width: 576px) 470px, 100vw"
            className={styles.photo}
            loading="eager"
            onSwipe={(direction: "prev" | "next"): void => (direction === "prev" ? goPrev() : goNext())}
          />
        )}
      </div>
      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center mt-3 gap-2">
        <div className="d-flex gap-4">
          <button type="button" className="outline-button outline-button--round" onClick={goPrev} disabled={!canGoPrev} aria-label="Foto anterior">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button type="button" className="outline-button outline-button--round" onClick={goNext} disabled={!canGoNext} aria-label="Foto siguiente">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        <small className={cx("text-white text-opacity-50 text-nowrap", styles.caption)}>{eventName}</small>
      </div>
    </PhotoDialog>
  );
}
