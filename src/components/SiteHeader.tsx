"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Nav from "react-bootstrap/Nav";
import FadeInImage from "@/components/FadeInImage";
import { BAND_NAME, BAND_TAGLINE } from "@/data/band";
import type { NavLink } from "@/data/nav";

export default function SiteHeader({
  links,
  heroImage,
  heroImagePosition,
}: {
  links: NavLink[];
  heroImage?: string;
  heroImagePosition?: string;
}): ReactNode {
  const pathname: string = usePathname();
  const router = useRouter();
  const isPhotoHero: boolean = Boolean(heroImage);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mq: MediaQueryList = window.matchMedia("(max-width: 576px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent): void => { setIsMobile(e.matches); };
    mq.addEventListener("change", handler);
    return (): void => { mq.removeEventListener("change", handler); };
  }, []);

  const mobileHeroImage: string = "/images/show-hero.webp";
  const effectiveHeroImage: string | undefined = isMobile ? mobileHeroImage : heroImage;
  const effectiveHeroPosition: string = isMobile ? "55%" : (heroImagePosition ?? "45%");

  const sentinelRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState<boolean>(false);
  const [placeholderHeight, setPlaceholderHeight] = useState<number>(0);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return (): void => observer.disconnect();
  }, []);

  // While the nav bar is fixed it leaves the flow; a spacer of its in-flow
  // height keeps the centered hero flex column from re-centering (and moving
  // the sentinel), which would otherwise oscillate the stuck state.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const measure = new ResizeObserver(() => {
      if (!stuck) setPlaceholderHeight(header.offsetHeight);
    });
    measure.observe(header);
    return (): void => measure.disconnect();
  }, [stuck]);

  const handleNavClick = (e: MouseEvent, href: string): void => {
    const hashIndex: number = href.indexOf("#");
    if (hashIndex === -1) return;
    const hash: string = href.slice(hashIndex);
    const path: string = href.slice(0, hashIndex) || "/";
    if (!hash) return;
    e.preventDefault();
    if (pathname === path) {
      const parent: Element | null = document.querySelector(hash);
      if (!parent) return;
      const el: Element = parent.querySelector("h1, h2") ?? parent;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(href);
    }
  };

  const heroClass: string = ["site-hero", "w-100", isPhotoHero && "site-hero--photo"].filter(Boolean).join(" ");
  const wordmarkClass: string = `site-wordmark${isPhotoHero ? " site-wordmark--glow" : ""}`;
  const objectPosition: string = `center ${effectiveHeroPosition}`;

  return (
    <div className={heroClass}>
      {effectiveHeroImage && (
        <FadeInImage
          src={effectiveHeroImage}
          alt=""
          fill
          preload
          sizes="100vw"
          className="hero-bg-image"
          style={{ objectFit: "cover", objectPosition }}
        />
      )}
      <nav className="pt-3 pb-2">
        <Link href="/" className="text-decoration-none">
          <div className={wordmarkClass}>[ {BAND_NAME} ]</div>
        </Link>
        <p className={`hero-tagline mb-0${isPhotoHero ? " hero-tagline--reveal" : ""}`}>
          {isPhotoHero
            ? BAND_TAGLINE.split("").map((char: string, i: number): ReactNode => {
              const style: CSSProperties = {
                animationDelay: `${i * 0.04}s`,
              };
              return (
                <span key={i} className="tagline-char" style={style}>
                  {char === " " ? " " : char}
                </span>
              );
            })
            : BAND_TAGLINE}
        </p>
      </nav>

      <div ref={sentinelRef} aria-hidden="true" />

      <header ref={headerRef} className={`site-nav-bar w-100 px-3 pb-4 pb-md-5${stuck ? " site-nav-bar--stuck" : ""}`}>
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
                onClick={(e: MouseEvent): void => handleNavClick(e, link.href)}
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
      {stuck && <div aria-hidden="true" style={{ height: placeholderHeight }} />}
      {isPhotoHero && (
        <div className="scroll-indicator" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      )}
    </div>
  );
}
