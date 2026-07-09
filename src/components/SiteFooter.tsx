import type { ReactNode } from "react";
import Container from "react-bootstrap/Container";
import { BAND_NAME, LEGAL_DISCLAIMER } from "@/data/band";

export default function SiteFooter(): ReactNode {
  return (
    <footer className="w-100 mt-5 mt-md-6 pb-5">
      <hr className="brand-hr" />
      <Container className="text-center container-narrow">
        <p className="text-muted mb-0">
          © {new Date().getFullYear()} {BAND_NAME} — {LEGAL_DISCLAIMER}
        </p>
      </Container>
    </footer>
  );
}
