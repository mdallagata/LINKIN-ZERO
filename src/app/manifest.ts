import type { MetadataRoute } from "next";
import { BAND_NAME, BAND_TAGLINE } from "@/data/band";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BAND_NAME} — ${BAND_TAGLINE}`,
    short_name: BAND_NAME,
    description: BAND_TAGLINE,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#5f9ea0",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
