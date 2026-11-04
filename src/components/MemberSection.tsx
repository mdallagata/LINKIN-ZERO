import type { CSSProperties, ReactNode } from "react";
import { SiInstagram } from "react-icons/si";
import FadeInImage from "@/components/FadeInImage";
import PhotoModalTrigger from "@/components/PhotoModalTrigger";
import ZoomableImage from "@/components/ZoomableImage";
import type { Member } from "@/data/members";
import { instagramHandle } from "@/lib/instagram-handle";
import { cx } from "@/lib/cx";
import styles from "./MemberSection.module.css";

type MemberSectionProps = Member & {
  loading?: "lazy" | "eager";
};

// Un integrante en /members: retrato (en blanco y negro; completo y a color
// en el modal) y al lado el instrumento, el nombre y su Instagram.
export default function MemberSection({
  name,
  role,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  instagramUrl,
  loading,
  imagePosition,
}: MemberSectionProps): ReactNode {
  return (
    <article className={styles.member}>
      <div className={styles.photoCol}>
        <PhotoModalTrigger
          triggerLabel={`Ver foto completa de ${name}`}
          bodyClassName="p-0 d-flex justify-content-center"
          thumbnail={
            <FadeInImage
              className={cx(styles.memberPhoto, "photo-bw")}
              src={imageSrc}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              sizes="(min-width: 992px) 520px, 100vw"
              loading={loading}
              style={imagePosition ? { objectPosition: imagePosition } : undefined}
            />
          }
        >
          <ZoomableImage
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            sizes="(min-width: 768px) 57vh, 100vw"
            className={styles.memberPhotoFull}
            style={{ "--photo-ratio": imageHeight / imageWidth } as CSSProperties}
            loading={loading}
          />
        </PhotoModalTrigger>
      </div>
      <div className={styles.info}>
        <p className="eyebrow">{role}</p>
        <h2 className={styles.name}>{name}</h2>
        <a href={instagramUrl} className="text-link" target="_blank" rel="noopener noreferrer">
          <SiInstagram aria-hidden />
          {instagramHandle(instagramUrl)}
        </a>
      </div>
    </article>
  );
}
