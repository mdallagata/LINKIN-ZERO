import type { ReactNode } from "react";
import { BAND_NAME, LEGAL_DISCLAIMER } from "@/data/band";

export default function SiteFooter(): ReactNode {
  return (
    <footer className="site-footer w-100 pb-5">
      <hr className="brand-hr" />
      <div className="container text-center container-narrow">
        <p className="text-muted mb-0">
          © {new Date().getFullYear()} {BAND_NAME} — {LEGAL_DISCLAIMER}
        </p>
      </div>
    </footer>
  );
}
