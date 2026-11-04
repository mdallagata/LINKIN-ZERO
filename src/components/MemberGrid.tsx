import type { ReactNode } from "react";
import Link from "next/link";
import FadeInImage from "@/components/FadeInImage";
import type { Member } from "@/data/members";
import { MEMBERS } from "@/data/members";
import { instagramHandle } from "@/lib/instagram-handle";
import { cx } from "@/lib/cx";
import styles from "./MemberGrid.module.css";

/** Home: los integrantes en una grilla de retratos (el detalle, en /members). */
export default function MemberGrid(): ReactNode {
  return (
    <section id="integrantes" className="page-container section">
      <div className="section-header">
        <h2>Integrantes</h2>
        <Link href="/members" className="text-link">
          Conocé a la banda →
        </Link>
      </div>
      <ul className={styles.grid}>
        {MEMBERS.map((member: Member) => (
          <li key={member.name} className={cx(styles.member, "photo-reveal")}>
            <div className={styles.photoFrame}>
              <FadeInImage
                src={member.imageSrc}
                alt={member.imageAlt}
                width={member.imageWidth}
                height={member.imageHeight}
                sizes="(min-width: 1440px) 260px, (min-width: 992px) 18vw, (min-width: 768px) 30vw, 50vw"
                className={cx(styles.photo, "photo-bw")}
                style={member.imagePosition ? { objectPosition: member.imagePosition } : undefined}
              />
            </div>
            <p className={styles.name}>{member.name}</p>
            <p className={styles.role}>{member.role}</p>
            <a href={member.instagramUrl} className={styles.handle} target="_blank" rel="noopener noreferrer">
              {instagramHandle(member.instagramUrl)}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
