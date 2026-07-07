"use client";

import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import { BAND_NAME, BAND_TAGLINE } from "@/data/band";
import type { NavLink } from "@/data/nav";

export default function SiteHeader({ links }: { links: NavLink[] }) {
  return (
    <>
      <nav className="pt-4">
        <Link href="/" className="glow-hover text-decoration-none">
          <div className="site-wordmark glow-lg text-brand">
            「 {BAND_NAME} 」
          </div>
        </Link>
        <p className="glow-sm mt-2" style={{ color: "rgb(174, 214, 214)" }}>
          {BAND_TAGLINE}
        </p>
      </nav>

      <header className="w-100 px-3 pb-4 pb-md-5" style={{ maxWidth: 1400 }}>
        <hr className="brand-hr" />
        <Nav className="justify-content-center flex-wrap gap-3 gap-md-4 py-3">
          {links.map((link) =>
            link.href.startsWith("http") ? (
              <Nav.Link
                key={link.href}
                className="site-nav-link glow-hover text-brand p-0"
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
                className="site-nav-link glow-hover text-brand p-0"
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
