"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import { BAND_NAME, INSTAGRAM_URL, LEGAL_DISCLAIMER } from "@/data/band";

type SocialLink = {
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const SOCIALS: SocialLink[] = [
  {
    href: INSTAGRAM_URL,
    src: "/images/ig.jpg",
    alt: "Instagram",
    width: 1920,
    height: 1440,
  },
];

export default function SiteFooter(): ReactNode {
  return (
    <footer className="w-100 mt-5 mt-md-6 pb-5">
      <Container className="text-center" style={{ maxWidth: 720 }}>
        <p className="glow-sm text-muted mb-4">
          © 2026 {BAND_NAME}
          <br />
          {LEGAL_DISCLAIMER}
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-3">
          {SOCIALS.map((social) => (
            <a
              key={social.alt}
              className="glow-box brand-dotted-border rounded d-inline-flex"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={social.src}
                alt={social.alt}
                width={social.width}
                height={social.height}
                style={{ height: 60, width: "auto" }}
              />
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
