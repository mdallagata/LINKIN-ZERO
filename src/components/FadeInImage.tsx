"use client";

import type { ReactNode, SyntheticEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import type { ImageProps } from "next/image";

type FadeInImageProps = ImageProps & {
  fadeDuration?: number;
};

export default function FadeInImage({
  fadeDuration = 0.4,
  alt,
  style,
  onLoad,
  ...rest
}: FadeInImageProps): ReactNode {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <Image
      {...rest}
      alt={alt}
      style={{
        ...style,
        opacity: loaded ? 1 : 0,
        transition: `opacity ${fadeDuration}s ease-in`,
      }}
      onLoad={(e: SyntheticEvent<HTMLImageElement>) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}
