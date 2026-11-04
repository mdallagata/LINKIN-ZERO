import type { ReactNode } from "react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { BAND_NAME, INSTAGRAM_URL, WHATSAPP_URL } from "@/data/band";
import styles from "./MobileBookingBar.module.css";

/** Solo en celular: "Contratar" por WhatsApp siempre a mano, fijo abajo de la pantalla. */
export default function MobileBookingBar(): ReactNode {
  return (
    <div className={styles.bar}>
      <a href={WHATSAPP_URL} className="button button--solid" target="_blank" rel="noopener noreferrer" aria-label="Contratar por WhatsApp">
        <SiWhatsapp aria-hidden />
        Contratar
      </a>
      <a
        href={INSTAGRAM_URL}
        className="button button--outline button--icon"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram de ${BAND_NAME}`}
      >
        <SiInstagram aria-hidden />
      </a>
    </div>
  );
}
