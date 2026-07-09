"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import Modal from "react-bootstrap/Modal";

const ALT_TEXT = "Los integrantes de LINKIN ZERØ en Obscene Fest";

export default function QuienesSomosPhoto(): ReactNode {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        type="button"
        className="quienes-somos-photo-wrap photo-modal-trigger"
        onClick={() => setShow(true)}
        aria-label={`Ver imagen completa: ${ALT_TEXT}`}
      >
        <Image src="/images/todos.png" alt={ALT_TEXT} width={1170} height={779} className="quienes-somos-photo" />
      </button>

      <Modal show={show} onHide={() => setShow(false)} centered size="xl" className="photo-modal">
        <Modal.Header closeButton className="border-0 pb-0" />
        <Modal.Body className="p-0">
          <Image src="/images/todos.png" alt={ALT_TEXT} width={1170} height={779} className="w-100 h-auto" />
        </Modal.Body>
      </Modal>
    </>
  );
}
