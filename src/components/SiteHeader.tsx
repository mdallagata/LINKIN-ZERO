"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Nav from "react-bootstrap/Nav";
import { BAND_NAME, BAND_TAGLINE } from "@/data/band";
import type { NavLink } from "@/data/nav";

const DEFAULT_HERO: string = "/images/show-hero.jpg";

export default function SiteHeader({
  links,
  heroPhoto = false,
  heroImage,
  heroImagePosition,
}: {
  links: NavLink[];
  heroPhoto?: boolean;
  heroImage?: string;
  heroImagePosition?: string;
}): ReactNode {
  const pathname: string = usePathname();
  const [heroLoaded, setHeroLoaded] = useState<boolean>(false);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string): void => {
    const hashIndex: number = href.indexOf("#");
    if (hashIndex === -1) return;
    const hash: string = href.slice(hashIndex);
    const path: string = href.slice(0, hashIndex) || "/";
    if (pathname === path && hash) {
      const el: HTMLElement | null = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const heroClass: string = ["site-hero", "w-100", heroPhoto && "site-hero--photo"].filter(Boolean).join(" ");

  const wordmarkClass: string = `site-wordmark${heroPhoto ? " site-wordmark--glow" : ""}`;

  const activeHeroImage: string | undefined = heroImage || (heroPhoto ? DEFAULT_HERO : undefined);
  const objectPosition: string = `center ${heroImagePosition ?? "45%"}`;

  return (
    <>
      <div className={heroClass}>
        {activeHeroImage && (
          <Image
            src={activeHeroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-bg-image"
            style={{
              objectFit: "cover",
              objectPosition,
              opacity: heroLoaded ? 1 : 0,
              transition: "opacity 0.5s ease-in",
            }}
            onLoad={() => setHeroLoaded(true)}
          />
        )}
        <nav className="pt-3 pb-2">
          <Link href="/" className="text-decoration-none">
            <div className={wordmarkClass}>[ {BAND_NAME} ]</div>
          </Link>
          <p className={`hero-tagline mb-0${heroPhoto ? " hero-tagline--reveal" : ""}`}>
            {heroPhoto
              ? BAND_TAGLINE.split("").map((char: string, i: number): ReactNode => {
                  const style: CSSProperties = {
                    animationDelay: `${i * 0.04}s`,
                  };
                  return (
                    <span key={i} className="tagline-char" style={style}>
                      {char === " " ? "\u00A0" : char}
                    </span>
                  );
                })
              : BAND_TAGLINE}
          </p>
        </nav>

        <header className="w-100 px-3 pb-4 pb-md-5">
          <hr className="brand-hr my-2" />
          <Nav className="justify-content-center flex-wrap gap-4 gap-md-5 py-2">
            {links.map((link: NavLink) => {
              const isActive: boolean = link.href === pathname || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Nav.Link
                  key={link.href}
                  as={Link}
                  className="site-nav-link text-white p-0"
                  href={link.href}
                  onClick={(e: MouseEvent<HTMLAnchorElement>): void => handleNavClick(e, link.href)}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={link.label}
                >
                  {link.label}
                </Nav.Link>
              );
            })}
          </Nav>
          <hr className="brand-hr my-2" />
        </header>
        {heroPhoto && (
          <div className="scroll-indicator" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        )}
      </div>
    </>
  );
}
