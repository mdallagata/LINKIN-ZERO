"use client";

import Image from "next/image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

type MemberSectionProps = {
  name: string;
  bio: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  reverse?: boolean;
  highlight?: boolean;
};

export default function MemberSection({
  name,
  bio,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  reverse = false,
  highlight = false,
}: MemberSectionProps) {
  const textCol = (
    <Col
      md={7}
      className={`text-center ${reverse ? "text-md-end" : "text-md-start"}`}
    >
      <h1
        className={
          highlight
            ? "glow-yellow animate-fade-pulse mb-3"
            : "glow-lg mb-3"
        }
      >
        {name}
      </h1>
      <p className="glow-sm" style={{ color: "rgb(174, 214, 214)" }}>
        {bio}
      </p>
    </Col>
  );

  const imageCol = (
    <Col md={5} className="text-center mb-4 mb-md-0">
      <Image
        className="member-photo"
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        unoptimized={imageSrc.endsWith(".gif")}
        style={{ maxHeight: 420, width: "auto" }}
      />
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
