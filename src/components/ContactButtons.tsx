import type { ComponentType, ReactNode } from "react";
import { FiMail } from "react-icons/fi";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { CONTACT_EMAIL, INSTAGRAM_URL, WHATSAPP_URL } from "@/data/band";
import { cx } from "@/lib/cx";
import styles from "./ContactButtons.module.css";

type ContactLink = {
  href: string;
  label: string;
  Icon: ComponentType<{ "aria-hidden"?: boolean }>;
};

// WhatsApp primero y relleno: es por donde más rápido se cierra una fecha.
const CONTACT_LINKS: ContactLink[] = [
  { href: WHATSAPP_URL, label: "WhatsApp", Icon: SiWhatsapp },
  { href: `mailto:${CONTACT_EMAIL}`, label: "Email", Icon: FiMail },
  { href: INSTAGRAM_URL, label: "Instagram", Icon: SiInstagram },
];

/** Botones de contacto del bloque de contrataciones (van sobre el color de marca). */
export default function ContactButtons(): ReactNode {
  return (
    <div className={styles.contactButtons}>
      {CONTACT_LINKS.map(({ href, label, Icon }: ContactLink, i: number) => {
        const isExternal: boolean = href.startsWith("http");
        return (
          <a
            key={label}
            href={href}
            className={cx("button button--large", i === 0 ? "button--dark" : "button--dark-outline")}
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <Icon aria-hidden />
            {label}
          </a>
        );
      })}
    </div>
  );
}
