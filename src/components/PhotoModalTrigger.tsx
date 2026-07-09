"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function PhotoModalTrigger({
  triggerClassName,
  triggerLabel,
  thumbnail,
  children,
}: {
  triggerClassName: string;
  triggerLabel: string;
  thumbnail: ReactNode;
  children: ReactNode;
}): ReactNode {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        className={`${triggerClassName} photo-modal-trigger`}
        onClick={() => setShow(true)}
        aria-label={triggerLabel}
      >
        {thumbnail}
      </button>

      <Modal show={show} onHide={() => setShow(false)} centered size="xl" className="photo-modal">
        <Modal.Header closeButton className="border-0 pb-0" />
        {children}
      </Modal>
    </>
  );
}
