"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import "./bootstrap.scss";
import "./globals.css";

// Reemplaza al layout raíz cuando el error ocurre en el layout mismo: por eso
// arma su propio <html> y <body> e importa los estilos (sin las fuentes, que
// las carga el layout; cae en las del sistema).
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }): ReactNode {
  useEffect((): void => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es" data-bs-theme="dark">
      <body className="d-flex flex-column min-vh-100 align-items-center justify-content-center px-3">
        <title>Algo salió mal — LINKIN ZERØ</title>
        <h1 className="mb-1">Algo salió mal</h1>
        <div className="section-divider" />
        <p className="text-muted">Hubo un error inesperado. Intentalo de nuevo.</p>
        <button onClick={() => retry()} className="outline-button mt-3" type="button">
          Reintentar
        </button>
      </body>
    </html>
  );
}
