"use client";

import Image from "next/image";
import Container from "react-bootstrap/Container";

const SOCIALS = [
  {
    href: "https://www.instagram.com/linkinpark/",
    src: "/images/ig.jpg",
    alt: "Linkin Park's Instagram Icon",
    width: 1920,
    height: 1440,
  },
  {
    href: "https://www.youtube.com/c/LinkinPark",
    src: "/images/yt.jpg",
    alt: "Linkin Park's Youtube Icon",
    width: 1200,
    height: 630,
  },
  {
    href: "https://twitter.com/linkinpark",
    src: "/images/t.png",
    alt: "Linkin Park's Twitter Icon",
    width: 225,
    height: 225,
  },
];

export default function SiteFooter() {
  return (
    <footer className="w-100 mt-5 mt-md-6 pb-5">
      <Container className="text-center" style={{ maxWidth: 720 }}>
        <p className="glow-sm mb-4" style={{ color: "rgb(174, 214, 214)" }}>
          ©2004 LINKIN PARK. ALL RIGHTS RESERVED
          <br />
          <a className="glow-hover text-brand" href="#">
            TERMS &amp; CONDITIONS// PRIVACY POLICY // AD CHOICES // COOKIE
            POLICY // DO NOT SELL MY PERSONAL INFORMATION
          </a>
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-3">
          {SOCIALS.map((social) => (
            <a
              key={social.href}
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
