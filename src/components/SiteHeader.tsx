"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import { BAND_NAME } from "@/data/band";
import type { NavLink } from "@/data/nav";

export default function SiteHeader({ links }: { links: NavLink[] }): ReactNode {
  return (
    <>
      <nav className="pt-3">
        <Link href="/" className="glow-hover text-decoration-none">
          <div className="site-wordmark glow-lg text-white">
            [ {BAND_NAME} ]
          </div>
        </Link>
      </nav>

      <header className="w-100 px-3 pb-4 pb-md-5">
        <hr className="brand-hr my-2" />
        <Nav className="justify-content-center flex-wrap gap-4 gap-md-5 py-2">
          {links.map((link) =>
            link.href.startsWith("http") ? (
              <Nav.Link
                key={link.href}
                className="site-nav-link glow-hover text-white p-0"
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
                className="site-nav-link glow-hover text-white p-0"
                href={link.href}
              >
                {link.label}
              </Nav.Link>
            )
          )}
        </Nav>
        <hr className="brand-hr my-2" />
      </header>
    </>
  );
}
