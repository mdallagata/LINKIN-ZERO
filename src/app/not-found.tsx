import type { ReactNode } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { NAV_LINKS } from "@/data/nav";
import { cx } from "@/lib/cx";
import styles from "./not-found.module.css";

export default function NotFound(): ReactNode {
  return (
    <>
      <SiteHeader links={NAV_LINKS} />

      <main className="w-100 px-3">
        <section className="container mb-5 pb-4 container-narrow">
          <h1 className={cx("mb-1", styles.errorCode)}>404</h1>
          <div className="section-divider" />
          <p className={cx("text-muted", styles.errorSubtitle)}>Página no encontrada</p>
          <Link href="/" className={cx("text-brand glow-hover d-inline-block mt-3", styles.backLink)}>
            Volver al inicio →
          </Link>
        </section>
      </main>
    </>
  );
}
