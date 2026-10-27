"use client";

import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { getImageProps } from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BAND_NAME, BAND_TAGLINE } from "@/data/band";
import type { NavLink } from "@/data/nav";
import { scrollBehavior } from "@/lib/scroll";
import { cx } from "@/lib/cx";
import styles from "./SiteHeader.module.css";

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

  // Cuando el centinela (justo arriba de la barra) sale por arriba de la
  // pantalla, la barra pasa a position: fixed. Mientras está fija deja un hueco
  // de la altura que tenía en el hero (medida justo antes de soltarse): sin él
  // la columna centrada se reacomodaría, movería el centinela y el estado
  // oscilaría. (Con position: sticky no alcanza: la barra está dentro del hero
  // de 100svh y sticky no la deja salir de ahí.)
  useEffect((): (() => void) | void => {
    const sentinel: HTMLDivElement | null = sentinelRef.current;
    const navBar: HTMLElement | null = navBarRef.current;
    if (!sentinel || !navBar) return;
    let wasStuck: boolean = false;
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (!entry) return;
        const isStuck: boolean = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        if (isStuck && !wasStuck) setPlaceholderHeight(navBar.offsetHeight);
        wasStuck = isStuck;
        setStuck(isStuck);
      },
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return (): void => observer.disconnect();
  }, []);

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

  const Wordmark: "h1" | "div" = brandAsHeading ? "h1" : "div";

  return (
    <header className={cx(styles.siteHero, "w-100", isPhotoHero && styles.siteHeroPhoto)}>
      {heroImage && <HeroImage src={heroImage} position={heroImagePosition ?? "45%"} />}
      <div className="pt-3 pb-2">
        <Link href="/" className="text-decoration-none">
          <Wordmark className={cx(styles.siteWordmark, isPhotoHero && styles.siteWordmarkGlow)} data-text={`[ ${BAND_NAME} ]`}>
            [ {BAND_NAME} ]
          </Wordmark>
        </Link>
        {isPhotoHero ? (
          // Una <span> por letra para la animación; el lector de pantalla lee la
          // frase entera de la copia oculta en vez de deletrearla.
          <p className={cx(styles.heroTagline, styles.heroTaglineReveal, "mb-0")}>
            <span className="visually-hidden">{BAND_TAGLINE}</span>
            <span aria-hidden="true">
              {BAND_TAGLINE.split("").map((char: string, i: number): ReactNode => (
                <span key={i} className={styles.taglineChar} style={{ animationDelay: `${i * 0.04}s` }}>
                  {char === " " ? "\u00a0" : char}
                </span>
              ))}
            </span>
          </p>
        ) : (
          <p className={cx(styles.heroTagline, "mb-0")}>{BAND_TAGLINE}</p>
        )}
      </div>

      <div ref={sentinelRef} aria-hidden="true" />

      <nav ref={navBarRef} aria-label="Principal" className={cx("w-100 px-3 pb-4 pb-md-5", stuck && styles.siteNavBarStuck)}>
        <hr className="brand-hr my-2" />
        <ul className={cx(styles.siteNavList, "justify-content-center flex-wrap gap-4 gap-md-5 py-2")}>
          {links.map((link: NavLink) => {
            const isActive: boolean = link.href === pathname || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <li key={link.href}>
                <Link
                  className={styles.siteNavLink}
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
        <div className={styles.scrollIndicator} aria-hidden="true">
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
// El encuadre de cada breakpoint está en .heroBgImage (SiteHeader.module.css).
function HeroImage({ src, position }: { src: string; position: string }): ReactNode {
  const common = { alt: "", fill: true, sizes: "100vw", fetchPriority: "high", loading: "eager" } as const;
  const { props: mobile } = getImageProps({ ...common, src: MOBILE_HERO_IMAGE });
  const { props } = getImageProps({ ...common, src });
  const style = { ...props.style, objectFit: "cover", "--hero-position": position } as CSSProperties;

  return (
    <picture>
      <source media="(max-width: 576px)" srcSet={mobile.srcSet ?? mobile.src} />
      <img {...props} alt="" className={styles.heroBgImage} style={style} />
    </picture>
  );
}
