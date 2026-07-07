"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

type MemberSectionProps = {
  name: string;
  role: string;
  bio: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  reverse?: boolean;
  priority?: boolean;
};

function initials(name: string): string {
  return name
    .split(" ")
    .map((word: string): string => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function MemberSection({
  name,
  role,
  bio,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  reverse = false,
  priority = false,
}: MemberSectionProps): ReactNode {
  const textCol: ReactNode = (
    <Col
      md={7}
      className={`text-center ${reverse ? "text-md-end order-md-last" : "text-md-start"}`}
    >
      <h2 className="mb-1">{name}</h2>
      <p className="member-role text-brand mb-3">{role}</p>
      <p className="text-muted">{bio}</p>
    </Col>
  );

  const imageCol: ReactNode = (
    <Col md={5} className={`text-center mb-4 mb-md-0 ${reverse ? "order-md-first" : ""}`}>
      {imageSrc ? (
        <div className="member-photo-wrap">
          <Image
            className="member-photo"
            src={imageSrc}
            alt={imageAlt ?? name}
            width={imageWidth}
            height={imageHeight}
            priority={priority}
            unoptimized={imageSrc.endsWith(".gif")}
          />
        </div>
      ) : (
        <div className="placeholder-avatar">{initials(name)}</div>
      )}
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
