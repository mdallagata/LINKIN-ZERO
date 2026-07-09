"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import FadeInImage from "@/components/FadeInImage";

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
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        className="photo-frame-wrap photo-modal-trigger"
        onClick={() => setShow(true)}
        aria-label={`Ver imagen completa: ${alt}`}
      >
        <FadeInImage src={src} alt={alt} width={width} height={height} className="photo-frame" />
      </button>

      <Modal show={show} onHide={() => setShow(false)} centered size="xl" className="photo-modal">
        <Modal.Header closeButton className="border-0 pb-0" />
        <Modal.Body className="p-0">
          <FadeInImage src={src} alt={alt} width={width} height={height} className="w-100 h-auto" />
        </Modal.Body>
      </Modal>
    </>
  );
}
