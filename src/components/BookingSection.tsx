import type { ReactNode } from "react";
import ContactButtons from "@/components/ContactButtons";
import LogoMark from "@/components/LogoMark";
import { BAND_NAME, CONTACT_EMAIL, CONTACT_PHONE } from "@/data/band";
import { cx } from "@/lib/cx";
import styles from "./BookingSection.module.css";

/** Cierre de la home: el bloque de contrataciones, en el color de marca. */
export default function BookingSection(): ReactNode {
  return (
    <section id="contacto" className={styles.booking}>
      <LogoMark className={styles.mark} large />
      <div className={cx("page-container", styles.content)}>
        <p className={styles.eyebrow}>Contrataciones</p>
        <h2 className={styles.title}>¿Querés {BAND_NAME} en tu evento?</h2>
        <p className={styles.text}>
          Tocamos en todo el país. Si sos productor, organizás un evento o querés un show privado, escribinos y armamos la propuesta.
        </p>
        <ContactButtons />
        <p className={styles.details}>
          {CONTACT_EMAIL} · {CONTACT_PHONE}
        </p>
      </div>
    </section>
  );
}
