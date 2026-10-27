"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BAND_NAME, BAND_TAGLINE } from "@/data/band";
import type { NavLink } from "@/data/nav";
import { scrollBehavior } from "@/lib/scroll";

type SiteHeaderProps = {
  links: NavLink[];
  heroImage?: string;
  heroImagePosition?: string;
  /** En la home el nombre de la banda es el h1; en las demás, el título de la página. */
  brandAsHeading?: boolean;
};

export default function SiteHeader({ links, heroImage, heroImagePosition, brandAsHeading = false }: SiteHeaderProps): ReactNode {
  const pathname: string = usePathname();
  const router = useRouter();
  const isPhotoHero: boolean = Boolean(heroImage);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState<boolean>(false);
  const [placeholderHeight, setPlaceholderHeight] = useState<number>(0);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0), { threshold: 0 });
    observer.observe(sentinel);
    return (): void => observer.disconnect();
  }, []);

  // While the nav bar is fixed it leaves the flow; a spacer of its in-flow
  // height keeps the centered hero flex column from re-centering (and moving
  // the sentinel), which would otherwise oscillate the stuck state.
  useEffect(() => {
    const navBar = navBarRef.current;
    if (!navBar) return;
    const measure = new ResizeObserver(() => {
      if (!stuck) setPlaceholderHeight(navBar.offsetHeight);
    });
    measure.observe(navBar);
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
      el.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    } else {
      router.push(href);
    }
  };

  const heroClass: string = ["site-hero", "w-100", isPhotoHero && "site-hero--photo"].filter(Boolean).join(" ");
  const Wordmark: "h1" | "div" = brandAsHeading ? "h1" : "div";
  const wordmarkClass: string = `site-wordmark${isPhotoHero ? " site-wordmark--glow" : ""}`;

  return (
    <header className={heroClass}>
      {heroImage && <HeroImage src={heroImage} position={heroImagePosition ?? "45%"} />}
      <div className="pt-3 pb-2">
        <Link href="/" className="text-decoration-none">
          <Wordmark className={wordmarkClass}>[ {BAND_NAME} ]</Wordmark>
        </Link>
        {isPhotoHero ? (
          // Una <span> por letra para la animación; el lector de pantalla lee la
          // frase entera de la copia oculta en vez de deletrearla.
          <p className="hero-tagline hero-tagline--reveal mb-0">
            <span className="visually-hidden">{BAND_TAGLINE}</span>
            <span aria-hidden="true">
              {BAND_TAGLINE.split("").map((char: string, i: number): ReactNode => (
                <span key={i} className="tagline-char" style={{ animationDelay: `${i * 0.04}s` }}>
                  {char === " " ? "\u00a0" : char}
                </span>
              ))}
            </span>
          </p>
        ) : (
          <p className="hero-tagline mb-0">{BAND_TAGLINE}</p>
        )}
      </div>

      <div ref={sentinelRef} aria-hidden="true" />

      <nav ref={navBarRef} aria-label="Principal" className={`site-nav-bar w-100 px-3 pb-4 pb-md-5${stuck ? " site-nav-bar--stuck" : ""}`}>
        <hr className="brand-hr my-2" />
        <ul className="site-nav-list justify-content-center flex-wrap gap-4 gap-md-5 py-2">
          {links.map((link: NavLink) => {
            const isActive: boolean = link.href === pathname || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <li key={link.href}>
                <Link
                  className="site-nav-link"
                  href={link.href}
                  onClick={(e: MouseEvent): void => handleNavClick(e, link.href)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <hr className="brand-hr my-2" />
      </nav>
      {stuck && <div aria-hidden="true" style={{ height: placeholderHeight }} />}
      {isPhotoHero && (
        <div className="scroll-indicator" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      )}
    </header>
  );
}

const MOBILE_HERO_IMAGE: string = "/images/show-hero.webp";

// En celular todas las páginas usan la misma foto (las de escritorio no
// encuadran bien en vertical). La elige el navegador con <picture> antes de
// descargar nada: con JS (matchMedia) el HTML del servidor traía la de
// escritorio, React no corregía el src al hidratar y se bajaban las dos.
// El encuadre de cada breakpoint está en .hero-bg-image (globals.css).
function HeroImage({ src, position }: { src: string; position: string }): ReactNode {
  const common = { alt: "", fill: true, sizes: "100vw", fetchPriority: "high", loading: "eager" } as const;
  const { props: mobile } = getImageProps({ ...common, src: MOBILE_HERO_IMAGE });
  const { props } = getImageProps({ ...common, src });
  const style = { ...props.style, objectFit: "cover", "--hero-position": position } as CSSProperties;

  return (
    <picture>
      <source media="(max-width: 576px)" srcSet={mobile.srcSet ?? mobile.src} />
      <img {...props} alt="" className="hero-bg-image" style={style} />
    </picture>
  );
}
