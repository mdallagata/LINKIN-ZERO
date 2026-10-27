"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import FadeInImage from "@/components/FadeInImage";
import ShowPhotoGallery from "@/components/ShowPhotoGallery";

const VISIBLE_THUMBS: number = 3;

// Miniaturas de un show y su galería: la única parte interactiva de la tarjeta
// (el resto se renderiza en el servidor).
export default function ShowPhotos({ eventName, photos }: { eventName: string; photos: string[] }): ReactNode {
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const openAt = (i: number): void => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <div className="d-flex gap-2 mt-3 flex-wrap justify-content-center">
      {photos.slice(0, VISIBLE_THUMBS).map((photo: string, i: number) => (
        <button key={photo} type="button" className="show-card-thumb" onClick={() => openAt(i)} aria-label={`Ver foto ${i + 1}`}>
          <FadeInImage src={photo} alt={`${eventName} — Foto ${i + 1}`} width={120} height={90} className="show-card-thumb-img" />
        </button>
      ))}
      {photos.length > VISIBLE_THUMBS && (
        <button type="button" className="show-card-thumb show-card-thumb--more" onClick={() => openAt(0)} aria-label="Ver todas las fotos">
          <span>+{photos.length - VISIBLE_THUMBS}</span>
        </button>
      )}
      <ShowPhotoGallery eventName={eventName} photos={photos} index={index} onIndexChange={setIndex} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
