"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { cx } from "@/lib/cx";
import styles from "./not-found.module.css";

export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }): ReactNode {
  useEffect((): void => {
    console.error(error);
  }, [error]);

  return (
    <main className={cx("page-container", styles.page)}>
      <h1 className={styles.errorTitle}>Algo salió mal</h1>
      <p className={styles.text}>Hubo un error inesperado. Intentalo de nuevo.</p>
      <button onClick={() => retry()} className="button button--outline mt-3" type="button">
        Reintentar
      </button>
    </main>
  );
}
