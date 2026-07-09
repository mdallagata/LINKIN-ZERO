"use client";

import type { ReactNode } from "react";
import Container from "react-bootstrap/Container";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { NAV_LINKS } from "@/data/nav";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): ReactNode {
  return (
    <>
      <SiteHeader links={NAV_LINKS} />

      <main className="w-100 px-3">
        <Container as="section" className="mb-5 pb-4 container-narrow">
          <h1 className="mb-1">Algo salió mal</h1>
          <div className="section-divider" />
          <p className="text-muted">
            Hubo un error inesperado. Intentalo de nuevo.
          </p>
          <button
            onClick={() => reset()}
            className="btn btn-outline-light mt-3"
            type="button"
          >
            Reintentar
          </button>
        </Container>
      </main>

      <SiteFooter />
    </>
  );
}
