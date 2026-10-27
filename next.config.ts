import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
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
