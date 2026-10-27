import type { NextConfig } from "next";
import imageSizes from "./src/lib/image-sizes.json";

const nextConfig: NextConfig = {
  output: "export",
  // Sitio estático: no hay servidor que redimensione fotos. Cada ancho del
  // srcset sale de public/generated (scripts/generate-images.mts) vía el loader.
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: imageSizes.deviceSizes,
    imageSizes: imageSizes.imageSizes,
  },
  // Sin esto Next puede tomar como raíz una carpeta de más arriba si encuentra
  // otro lockfile ahí (por ejemplo un ~/yarn.lock suelto).
  turbopack: {
    root: __dirname,
  },
  // Bootstrap 5.3 todavía usa @import y funciones globales de Sass, que Dart
  // Sass marca como deprecadas: son cientos de avisos que no podemos arreglar.
  sassOptions: {
    quietDeps: true,
    silenceDeprecations: ["import"],
  },
};

export default nextConfig;
