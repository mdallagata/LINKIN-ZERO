"use client";

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
};

function initials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
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
}: MemberSectionProps) {
  const textCol = (
    <Col
      md={7}
      className={`text-center ${reverse ? "text-md-end" : "text-md-start"}`}
    >
      <h1 className="glow-lg mb-1">{name}</h1>
      <p className="glow-sm text-brand mb-3">{role}</p>
      <p className="glow-sm" style={{ color: "rgb(174, 214, 214)" }}>
        {bio}
      </p>
    </Col>
  );

  const imageCol = (
    <Col md={5} className="text-center mb-4 mb-md-0">
      {imageSrc ? (
        <Image
          className="member-photo"
          src={imageSrc}
          alt={imageAlt ?? name}
          width={imageWidth}
          height={imageHeight}
          unoptimized={imageSrc.endsWith(".gif")}
          style={{ maxHeight: 420, width: "auto" }}
        />
      ) : (
        <div className="placeholder-avatar">{initials(name)}</div>
      )}
    </Col>
  );

  return (
    <Row
      as="article"
      className="align-items-center gy-4 mb-5 pb-4"
      style={{ maxWidth: 960, margin: "0 auto" }}
    >
      {reverse ? (
        <>
          {imageCol}
          {textCol}
        </>
      ) : (
        <>
          {textCol}
          {imageCol}
        </>
      )}
    </Row>
  );
}
