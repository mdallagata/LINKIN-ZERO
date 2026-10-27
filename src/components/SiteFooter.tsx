import type { ReactNode } from "react";
import { BAND_NAME, LEGAL_DISCLAIMER } from "@/data/band";
import { cx } from "@/lib/cx";
import styles from "./SiteFooter.module.css";

export default function SiteFooter(): ReactNode {
  return (
    <footer className={cx(styles.siteFooter, "w-100 pb-5")}>
      <hr className="brand-hr" />
      <div className="container text-center container-narrow">
        <p className="text-muted mb-0">
          © {new Date().getFullYear()} {BAND_NAME} — {LEGAL_DISCLAIMER}
        </p>
      </div>
    </footer>
  );
}
