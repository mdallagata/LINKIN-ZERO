"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { BAND_NAME, LEGAL_DISCLAIMER } from "@/data/band";
import type { NavLink } from "@/data/nav";

const QUICK_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Miembros", href: "/members" },
  { label: "Shows", href: "/shows" },
  { label: "Contacto", href: "/#contacto" },
];

export default function SiteFooter(): ReactNode {
  return (
    <footer className="w-100 mt-5 mt-md-6 pb-5">
      <hr className="brand-hr" />
      <Container className="text-center" style={{ maxWidth: 960 }}>
        <Nav className="justify-content-center flex-wrap gap-3 mb-3">
          {QUICK_LINKS.map((link: NavLink) => (
            <Nav.Link
              key={link.href}
              as={Link}
              className="glow-hover text-brand p-0"
              href={link.href}
            >
              {link.label}
            </Nav.Link>
          ))}
        </Nav>
        <p className="glow-sm text-muted mb-0">
          © {new Date().getFullYear()} {BAND_NAME} — {LEGAL_DISCLAIMER}
        </p>
      </Container>
    </footer>
  );
}
