import type { ReactNode } from "react";
import FadeInImage from "@/components/FadeInImage";
import PhotoModalTrigger from "@/components/PhotoModalTrigger";
import ZoomableImage from "@/components/ZoomableImage";
import { cx } from "@/lib/cx";
import styles from "./PhotoShowcase.module.css";

type PhotoShowcaseProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
};

// Foto a todo el ancho de la pantalla, recortada; al tocarla se abre completa y con zoom.
export default function PhotoShowcase({ src, alt, width, height, caption }: PhotoShowcaseProps): ReactNode {
  return (
    <figure className="mb-0">
      <PhotoModalTrigger
        bodyClassName="p-0"
        triggerLabel={`Ver imagen completa: ${alt}`}
        thumbnail={<FadeInImage src={src} alt={alt} width={width} height={height} sizes="100vw" className={cx(styles.photoFrame, "photo-bw")} />}
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
      <figcaption className={cx("page-container", styles.caption)}>{caption}</figcaption>
    </figure>
  );
}
