import type { ReactNode } from "react";
import { SiInstagram } from "react-icons/si";
import FadeInImage from "@/components/FadeInImage";
import PhotoModalTrigger from "@/components/PhotoModalTrigger";
import type { Member } from "@/data/members";

type MemberSectionProps = Member & {
  /** Foto a la izquierda en md+ (las filas alternan). */
  reverse?: boolean;
  loading?: "lazy" | "eager";
};

export default function MemberSection({
  name,
  role,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  reverse = false,
  instagramUrl,
  loading,
  imagePosition,
}: MemberSectionProps): ReactNode {
  const textCol: ReactNode = (
    <div className={`col-md-7 text-center ${reverse ? "text-md-end order-md-last" : "text-md-start"}`}>
      <h2 className="mb-1">{name}</h2>
      <p className="member-role text-brand mb-0">
        {role}
        <a href={instagramUrl} className="icon-link icon-link--member" target="_blank" rel="noopener noreferrer" aria-label={`Instagram de ${name}`}>
          <SiInstagram aria-hidden />
        </a>
      </p>
    </div>
  );

  const imageCol: ReactNode = (
    <div className={`col-md-5 text-center mb-4 mb-md-0 ${reverse ? "order-md-first" : ""}`}>
      <PhotoModalTrigger
        triggerClassName="photo-trigger photo-trigger--member"
        triggerLabel={`Ver foto completa de ${name}`}
        bodyClassName="p-0 d-flex justify-content-center"
        thumbnail={
          <FadeInImage
            className="member-photo"
            src={imageSrc}
            alt={imageAlt}
            width={imageWidth}
            height={imageHeight}
            sizes="(min-width: 768px) 480px, 100vw"
            loading={loading}
            style={imagePosition ? { objectPosition: imagePosition } : undefined}
          />
        }
      >
        <FadeInImage
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
          sizes="(min-width: 768px) 57vh, 100vw"
          className="h-auto"
          style={{ maxHeight: "85vh", width: "100%", objectFit: "contain" }}
          loading={loading}
        />
      </PhotoModalTrigger>
    </div>
  );

  return (
    <article className="row align-items-center gy-4 mb-5 pb-4" style={{ maxWidth: 1100, margin: "0 auto" }}>
      {textCol}
      {imageCol}
    </article>
  );
}
