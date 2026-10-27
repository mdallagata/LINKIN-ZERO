"use client";

import type { ReactNode, SyntheticEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";

// Foto que aparece con un fade cuando termina de cargar. La opacidad la maneja
// .fade-in-image en globals.css, que solo la oculta si hay JS.
export default function FadeInImage({ alt, className, style, onLoad, ...rest }: ImageProps): ReactNode {
  const [loaded, setLoaded] = useState<boolean>(false);
  const fadeTransition: string = "opacity 0.4s ease-in";

  return (
    <Image
      {...rest}
      alt={alt}
      className={`${className ?? ""} fade-in-image${loaded ? " is-loaded" : ""}`}
      style={{ ...style, transition: style?.transition ? `${style.transition}, ${fadeTransition}` : fadeTransition }}
      onLoad={(e: SyntheticEvent<HTMLImageElement>) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}
