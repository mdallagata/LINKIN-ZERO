"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ZoomableImage from "@/components/ZoomableImage";

export default function ShowPhotoGallery({
  eventName,
  photos,
  photoIndex,
  show,
  onHide,
  onExited,
}: {
  eventName: string;
  photos: string[];
  photoIndex: number;
  show: boolean;
  onHide: () => void;
  onExited?: () => void;
}): ReactNode {
  const [offset, setOffset] = useState<number>(0);
  const [prevPhotoIndex, setPrevPhotoIndex] = useState<number>(photoIndex);

  if (photoIndex !== prevPhotoIndex) {
    setPrevPhotoIndex(photoIndex);
    setOffset(0);
  }

  const displayIndex: number = photoIndex + offset;
  const canGoPrev: boolean = displayIndex > 0;
  const canGoNext: boolean = displayIndex < photos.length - 1;

  useEffect((): void | (() => void) => {
    if (!show) return;
    function onKeyDown(e: KeyboardEvent): void {
      if (e.key === "ArrowLeft" && canGoPrev) setOffset((o: number): number => o - 1);
      if (e.key === "ArrowRight" && canGoNext) setOffset((o: number): number => o + 1);
    }
    window.addEventListener("keydown", onKeyDown);
    return (): void => window.removeEventListener("keydown", onKeyDown);
  }, [show, canGoPrev, canGoNext]);

  return (
    <Modal show={show} onHide={onHide} onExited={onExited} centered size="xl" className="photo-modal">
      <Modal.Header closeButton className="border-0 pb-0" />
      <Modal.Body className="p-3 d-flex flex-column">
        <div className="show-photo-full">
          <ZoomableImage
            key={photos[displayIndex]}
            src={photos[displayIndex]}
            alt={`${eventName} — Foto ${displayIndex + 1}`}
            width={1200}
            height={800}
            className="w-100 h-100"
            style={{ objectFit: "contain" }}
            loading="eager"
          />
        </div>
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-center mt-3 gap-2">
          <div className="d-flex gap-4">
          <button
            type="button"
            className="btn btn-sm btn-outline-light rounded-circle p-2 d-flex align-items-center"
            onClick={() => setOffset((o: number): number => o - 1)}
            disabled={!canGoPrev}
            aria-label="Foto anterior"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-light rounded-circle p-2 d-flex align-items-center"
            onClick={() => setOffset((o: number): number => o + 1)}
            disabled={!canGoNext}
            aria-label="Foto siguiente"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          </div>
          <small className="text-white text-opacity-50 text-nowrap" style={{ fontSize: "0.75rem" }}>{eventName}</small>
        </div>
      </Modal.Body>
    </Modal>
  );
}
