"use client";

import type { CSSProperties, ReactNode } from "react";
import { getImageProps } from "next/image";
import { cx } from "@/lib/cx";
import styles from "./HeroImage.module.css";

const MOBILE_HERO_IMAGE: string = "/images/show-hero.webp";

// Foto de fondo de los heros (HomeHero, PageHero), en blanco y negro, que
// ocupa todo el hero; cada uno le pone su degradé con `className`. Es de
// cliente porque getImageProps llama al loader de imágenes, que lo es.
// En celular todas las páginas usan la misma foto (las de escritorio no
// encuadran bien en vertical). La elige el navegador con <picture> antes de
// descargar nada: con JS (matchMedia) el HTML del servidor traía la de
// escritorio, React no corregía el src al hidratar y se bajaban las dos.
export default function HeroImage({ src, position, className }: { src: string; position: string; className?: string }): ReactNode {
  const common = { alt: "", fill: true, sizes: "100vw", fetchPriority: "high", loading: "eager" } as const;
  const { props: mobile } = getImageProps({ ...common, src: MOBILE_HERO_IMAGE });
  const { props } = getImageProps({ ...common, src });
  const style = { ...props.style, objectFit: "cover", "--hero-position": position } as CSSProperties;

  return (
    <div className={cx(styles.media, className)}>
      <picture>
        <source media="(max-width: 576px)" srcSet={mobile.srcSet ?? mobile.src} />
        <img {...props} alt="" className={cx(styles.heroImage, "photo-bw")} style={style} />
      </picture>
    </div>
  );
}
