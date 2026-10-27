import type { ReactNode } from "react";
import FadeInImage from "@/components/FadeInImage";
import PhotoModalTrigger from "@/components/PhotoModalTrigger";
import ZoomableImage from "@/components/ZoomableImage";
import { cx } from "@/lib/cx";
import styles from "./PhotoShowcase.module.css";

export default function PhotoShowcase({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }): ReactNode {
  return (
    <PhotoModalTrigger
      variant="frame"
      bodyClassName="p-0"
      triggerLabel={`Ver imagen completa: ${alt}`}
      thumbnail={<FadeInImage src={src} alt={alt} width={width} height={height} sizes="(min-width: 540px) 500px, 100vw" className={styles.photoFrame} />}
    >
      <ZoomableImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(min-width: 1200px) 1140px, 100vw"
        className={cx("w-100 h-auto", styles.photoFull)}
      />
    </PhotoModalTrigger>
  );
}
