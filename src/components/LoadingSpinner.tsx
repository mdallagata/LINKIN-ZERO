import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner(): ReactNode {
  return (
    <div className={cx(styles.wrapper, "d-flex justify-content-center align-items-center")} role="status">
      <div className={styles.loadingSpinner} />
      <span className="visually-hidden">Cargando…</span>
    </div>
  );
}
