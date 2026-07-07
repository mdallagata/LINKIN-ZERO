import type { ReactNode } from "react";

export default function LoadingSpinner(): ReactNode {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "40vh" }}
      role="status"
    >
      <div className="loading-spinner" />
      <span className="visually-hidden">Cargando…</span>
    </div>
  );
}
