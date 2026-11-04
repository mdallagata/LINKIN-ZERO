import type { ReactNode } from "react";
import Link from "next/link";
import { cx } from "@/lib/cx";
import styles from "./not-found.module.css";

export default function NotFound(): ReactNode {
  return (
    <main className={cx("page-container", styles.page)}>
      <p className="eyebrow">Página no encontrada</p>
      <h1 className={styles.errorCode}>404</h1>
      <p className={styles.text}>Esta página no existe o se movió.</p>
      <Link href="/" className="text-link">
        Volver al inicio →
      </Link>
    </main>
  );
}
