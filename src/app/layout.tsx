import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { NextFontWithVariable } from "next/dist/compiled/@next/font/dist/types";
import { Anton, Space_Grotesk } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import BackToTop from "@/components/BackToTop";
import { BAND_NAME, BAND_TAGLINE, SITE_URL } from "@/data/band";

const anton: NextFontWithVariable = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const spaceGrotesk: NextFontWithVariable = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BAND_NAME}`,
    template: `%s — ${BAND_NAME}`,
  },
  description:
    `${BAND_NAME} — banda tributo a LINKIN PARK de Tucumán, Argentina.` +
    ` Contrataciones para eventos y shows en vivo.`,
  keywords: [
    "LINKIN ZERØ",
    "tributo LINKIN PARK",
    "banda cover LINKIN PARK Argentina",
    "contratar tributo LINKIN PARK",
    "LINKIN PARK Tucumán",
    "banda tributo nu metal",
    "show en vivo contratación",
  ],
  openGraph: {
    title: BAND_NAME,
    description: BAND_TAGLINE,
    url: SITE_URL,
    siteName: BAND_NAME,
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 256,
        height: 256,
        alt: BAND_NAME,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: BAND_NAME,
    description: BAND_TAGLINE,
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
      <html
        lang="es"
        data-bs-theme="dark"
        className={`${anton.variable} ${spaceGrotesk.variable}`}
      >
        <body className="d-flex flex-column min-vh-100 align-items-center">
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
