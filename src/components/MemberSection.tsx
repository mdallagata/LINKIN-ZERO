"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { SiInstagram } from "react-icons/si";
import FadeInImage from "@/components/FadeInImage";

type MemberSectionProps = {
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  reverse?: boolean;
  instagramUrl: string;
};

export default function MemberSection({
  name,
  role,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  reverse = false,
  instagramUrl,
}: MemberSectionProps): ReactNode {
  const [show, setShow] = useState<boolean>(false);

  const textCol: ReactNode = (
    <Col
      md={7}
      className={`text-center ${reverse ? "text-md-end order-md-last" : "text-md-start"}`}
    >
      <h2 className="mb-1">{name}</h2>
      <p className="member-role text-brand mb-0">
        {role}
        <a
          href={instagramUrl}
          className="member-instagram-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Instagram de ${name}`}
        >
          <SiInstagram aria-hidden />
        </a>
      </p>
    </Col>
  );

  const imageCol: ReactNode = (
    <Col md={5} className={`text-center mb-4 mb-md-0 ${reverse ? "order-md-first" : ""}`}>
      <button
        type="button"
        className="member-photo-wrap photo-modal-trigger"
        onClick={() => setShow(true)}
        aria-label={`Ver foto completa de ${name}`}
      >
        <FadeInImage
          className="member-photo"
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          sizes="(min-width: 768px) 480px, 100vw"
        />
      </button>

      <Modal show={show} onHide={() => setShow(false)} centered size="xl" className="photo-modal">
        <Modal.Header closeButton className="border-0 pb-0" />
        <Modal.Body className="p-0 d-flex justify-content-center">
          <FadeInImage
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            className="h-auto"
            style={{ maxHeight: "85vh", width: "100%", objectFit: "contain" }}
          />
        </Modal.Body>
      </Modal>
    </Col>
  );

  return (
    <Row
      as="article"
      className="align-items-center gy-4 mb-5 pb-4"
      style={{ maxWidth: 1100, margin: "0 auto" }}
    >
      {textCol}
      {imageCol}
    </Row>
  );
}
