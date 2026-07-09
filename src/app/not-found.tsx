import type { ReactNode } from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { NAV_LINKS } from "@/data/nav";

export default function NotFound(): ReactNode {
  return (
    <>
      <SiteHeader links={NAV_LINKS} />

      <main className="w-100 px-3">
        <Container as="section" className="mb-5 pb-4 container-narrow">
          <h1 className="mb-1 error-code">404</h1>
          <div className="section-divider" />
          <p className="text-muted error-subtitle">Página no encontrada</p>
          <Link href="/" className="text-brand glow-hover d-inline-block mt-3" style={{ fontSize: "1.1rem" }}>
            Volver al inicio →
          </Link>
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
