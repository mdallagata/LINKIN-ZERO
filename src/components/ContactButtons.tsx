"use client";

import type { ComponentType, ReactNode } from "react";
import { SiGmail, SiInstagram, SiWhatsapp } from "react-icons/si";
import { CONTACT_EMAIL, INSTAGRAM_URL, WHATSAPP_URL } from "@/data/band";

type ContactLink = {
  href: string;
  label: string;
  Icon: ComponentType<{ "aria-hidden"?: boolean }>;
};

const CONTACT_LINKS: ContactLink[] = [
  { href: WHATSAPP_URL, label: "WhatsApp", Icon: SiWhatsapp },
  { href: `mailto:${CONTACT_EMAIL}`, label: "Email", Icon: SiGmail },
  { href: INSTAGRAM_URL, label: "Instagram", Icon: SiInstagram },
];

export default function ContactButtons(): ReactNode {
  return (
    <div className="contact-buttons">
      {CONTACT_LINKS.map(({ href, label, Icon }) => {
        const isExternal: boolean = href.startsWith("http");
        return (
          <a
            key={label}
            href={href}
            className="contact-button"
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
