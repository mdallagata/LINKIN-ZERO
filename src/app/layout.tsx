import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linkin Park's WebSite",
  description: "A fan-made tribute to Linkin Park, revisited.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-bs-theme="dark" data-scroll-behavior="smooth">
      <body className="d-flex flex-column min-vh-100 align-items-center">
        {children}
      </body>
    </html>
  );
}
