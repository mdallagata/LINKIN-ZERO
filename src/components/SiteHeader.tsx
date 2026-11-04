"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LogoMark from "@/components/LogoMark";
import { BAND_NAME } from "@/data/band";
import type { NavLink } from "@/data/nav";
import { BOOKING_LINK } from "@/data/nav";
import { scrollBehavior, useScrolledPast } from "@/lib/scroll";
import { cx } from "@/lib/cx";
import styles from "./SiteHeader.module.css";

// Barra fija arriba de todo. Arriba de la página es transparente (va sobre la
// foto del hero) y al scrollear toma fondo. En la home el nombre no aparece
// hasta scrollear: arriba ya está, enorme, en el hero.
export default function SiteHeader({ links }: { links: NavLink[] }): ReactNode {
  const pathname: string = usePathname();
  const router = useRouter();
  const scrolled: boolean = useScrolledPast(16);

  // Los links con # (Contratar) scrollean suave si la sección está en esta página.
  const handleNavClick = (e: MouseEvent, href: string): void => {
    const hashIndex: number = href.indexOf("#");
    if (hashIndex === -1) return;
    const hash: string = href.slice(hashIndex);
    const path: string = href.slice(0, hashIndex) || "/";
    e.preventDefault();
    if (pathname === path) {
      const el: Element | null = document.querySelector(hash);
      el?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    } else {
      router.push(href);
    }
  };

  const showName: boolean = pathname !== "/" || scrolled;

  return (
    <header className={cx(styles.siteHeader, scrolled && styles.scrolled)}>
      <nav aria-label="Principal" className={cx("page-container", styles.nav)}>
        <Link href="/" className={styles.home} aria-label={`${BAND_NAME} — inicio`}>
          <LogoMark className={styles.logo} />
          <span className={cx(styles.name, showName && styles.nameVisible)}>{BAND_NAME}</span>
        </Link>
        <ul className={styles.links}>
          {links.map((link: NavLink) => {
            const isActive: boolean = link.href !== "/" && pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link className={styles.link} href={link.href} aria-current={isActive ? "page" : undefined}>
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className={styles.bookingItem}>
            <Link className="button button--solid" href={BOOKING_LINK.href} onClick={(e: MouseEvent): void => handleNavClick(e, BOOKING_LINK.href)}>
              {BOOKING_LINK.label}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
