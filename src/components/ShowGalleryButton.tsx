"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import ShowPhotoGallery from "@/components/ShowPhotoGallery";

// Botón de texto que abre la galería de un show desde la primera foto (la
// lista de fechas de la home). En /shows están las miniaturas (ShowPhotos).
export default function ShowGalleryButton({ eventName, photos, className }: { eventName: string; photos: string[]; className?: string }): ReactNode {
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const openGallery = (): void => {
    setIndex(0);
    setOpen(true);
  };

  return (
    <>
      <button type="button" className={className} onClick={openGallery} aria-label={`Ver las ${photos.length} fotos de ${eventName}`}>
        Fotos ({photos.length}) →
      </button>
      <ShowPhotoGallery eventName={eventName} photos={photos} index={index} onIndexChange={setIndex} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
