import type { ReactNode } from "react";
import HeroImage from "@/components/HeroImage";
import { cx } from "@/lib/cx";
import styles from "./PageHero.module.css";

type PageHeroProps = {
  title: string;
  eyebrow: string;
  image: string;
  imagePosition: string;
};

// Hero de las páginas internas: foto más baja que la de la home y el título
// de la página (el h1) abajo a la izquierda.
export default function PageHero({ title, eyebrow, image, imagePosition }: PageHeroProps): ReactNode {
  return (
    <section className={styles.hero}>
      <HeroImage src={image} position={imagePosition} className={styles.shade} />
      <div className={cx("page-container", styles.content)}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
      </div>
    </section>
  );
}
