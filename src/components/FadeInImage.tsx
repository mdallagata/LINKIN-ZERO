"use client";

import type { ReactNode, SyntheticEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";
export default function FadeInImage({
  alt,
  style,
  onLoad,
  ...rest
}: ImageProps): ReactNode {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <Image
      {...rest}
      alt={alt}
      style={{
        ...style,
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.4s ease-in",
      }}
      onLoad={(e: SyntheticEvent<HTMLImageElement>) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}
