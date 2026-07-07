import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { BAND_NAME } from "@/data/band";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: `${BAND_NAME} — LINKIN PARK Tribute Band`,
  description: `${BAND_NAME} — banda tributo a LINKIN PARK de Tucumán, Argentina.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-bs-theme="dark"
      className={archivo.variable}
    >
      <body className="d-flex flex-column min-vh-100 align-items-center">
        {children}
      </body>
    </html>
  );
}
