"use client";

import type { ReactNode, SyntheticEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";
import { cx } from "@/lib/cx";
import styles from "./FadeInImage.module.css";

// Foto que aparece con un fade cuando termina de cargar. La opacidad la maneja
// FadeInImage.module.css, que solo la oculta si hay JS.
export default function FadeInImage({ alt, className, style, onLoad, ...rest }: ImageProps): ReactNode {
  const [loaded, setLoaded] = useState<boolean>(false);
  const fadeTransition: string = "opacity 0.4s ease-in";

  return (
    <Image
      {...rest}
      alt={alt}
      className={cx(className, styles.fadeInImage, loaded && styles.isLoaded)}
      style={{ ...style, transition: style?.transition ? `${style.transition}, ${fadeTransition}` : fadeTransition }}
      onLoad={(e: SyntheticEvent<HTMLImageElement>) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}
