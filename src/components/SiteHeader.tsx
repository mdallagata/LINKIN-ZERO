"use client";

import Image from "next/image";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";

type NavLink = {
  label: string;
  href: string;
};

export default function SiteHeader({ links }: { links: NavLink[] }) {
  return (
    <>
      <nav className="pt-3">
        <Image
          src="/images/lpgif.gif"
          alt="Linkin Park Logo"
          width={640}
          height={320}
          priority
          unoptimized
          style={{ height: "auto", width: "min(85vw, 380px)" }}
        />
      </nav>

      <header className="w-100 px-3 pb-4 pb-md-5" style={{ maxWidth: 960 }}>
        <hr className="brand-hr" />
        <Nav className="justify-content-center flex-wrap gap-3 gap-md-4 py-3 fs-5">
          {links.map((link) =>
            link.href.startsWith("http") ? (
              <Nav.Link
                key={link.href}
                className="glow-hover text-brand p-0"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </Nav.Link>
            ) : (
              <Nav.Link
                key={link.href}
                as={Link}
                className="glow-hover text-brand p-0"
                href={link.href}
              >
                {link.label}
              </Nav.Link>
            )
          )}
        </Nav>
        <hr className="brand-hr" />
      </header>
    </>
  );
}
