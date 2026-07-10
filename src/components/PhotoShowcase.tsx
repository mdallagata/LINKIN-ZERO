"use client";

import type { ReactNode } from "react";
import Modal from "react-bootstrap/Modal";
import FadeInImage from "@/components/FadeInImage";
import PhotoModalTrigger from "@/components/PhotoModalTrigger";
import ZoomableImage from "@/components/ZoomableImage";

export default function PhotoShowcase({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}): ReactNode {
  return (
    <PhotoModalTrigger
      triggerClassName="photo-trigger photo-trigger--frame"
      triggerLabel={`Ver imagen completa: ${alt}`}
      thumbnail={<FadeInImage src={src} alt={alt} width={width} height={height} className="photo-frame" />}
    >
      <Modal.Body className="p-0">
        <ZoomableImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-100 h-auto"
          style={{ maxHeight: "85vh", objectFit: "contain" }}
        />
      </Modal.Body>
    </PhotoModalTrigger>
  );
}
