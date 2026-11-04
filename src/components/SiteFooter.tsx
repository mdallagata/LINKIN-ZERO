import type { ReactNode } from "react";
import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import { BAND_NAME, INSTAGRAM_URL, LEGAL_DISCLAIMER } from "@/data/band";
import type { NavLink } from "@/data/nav";
import { BOOKING_LINK, NAV_LINKS } from "@/data/nav";
import { cx } from "@/lib/cx";
import styles from "./SiteFooter.module.css";

export default function SiteFooter(): ReactNode {
  return (
    <footer className={styles.siteFooter}>
      <div className={cx("page-container", styles.top)}>
        <Link href="/" className={styles.brand}>
          <LogoMark className={styles.logo} />
          {BAND_NAME}
        </Link>
        <ul className={styles.links}>
          {[...NAV_LINKS, BOOKING_LINK].map((link: NavLink) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
        </ul>
      </div>
      <div className="page-container">
        <p className={styles.legal}>
          © {new Date().getFullYear()} {BAND_NAME} — {LEGAL_DISCLAIMER}
        </p>
      </div>
    </footer>
  );
}
