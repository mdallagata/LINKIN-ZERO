"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import { NAV_LINKS } from "@/data/nav";

export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }): ReactNode {
  useEffect((): void => {
    console.error(error);
  }, [error]);

  return (
    <>
      <SiteHeader links={NAV_LINKS} />

      <main className="w-100 px-3">
        <section className="container mb-5 pb-4 container-narrow">
          <h1 className="mb-1">Algo salió mal</h1>
          <div className="section-divider" />
          <p className="text-muted">Hubo un error inesperado. Intentalo de nuevo.</p>
          <button onClick={() => retry()} className="outline-button mt-3" type="button">
            Reintentar
          </button>
        </section>
      </main>
    </>
  );
}
