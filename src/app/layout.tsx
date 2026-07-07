import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { BAND_NAME, BAND_TAGLINE } from "@/data/band";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: `${BAND_NAME} — ${BAND_TAGLINE}`,
  description: `${BAND_NAME}, ${BAND_TAGLINE}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-bs-theme="dark"
      data-scroll-behavior="smooth"
      className={archivo.variable}
    >
      <body className="d-flex flex-column min-vh-100 align-items-center">
        {children}
      </body>
    </html>
  );
}
