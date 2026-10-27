export type PressLink = {
  label: string;
  url: string;
};

export type Show = {
  /** Fecha en formato ISO (AAAA-MM-DD). Define si el show es próximo o anterior y el orden; el texto "28 de Noviembre, 2026" sale de acá. */
  date: string;
  venue: string;
  city: string;
  /** Nombre del evento. Sin él, la tarjeta de un show anterior usa el lugar como título. */
  event?: string;
  /** Banda o entidad que nos invitó; sin esto el show se marca como "Fecha propia". */
  invitedBy?: string;
  description?: string;
  /** Publicación de Instagram del show: la promo mientras es próximo, el recuerdo después. */
  postUrl?: string;
  ticketUrl?: string;
  /** Info de acceso, se muestra como badge mientras el show es próximo (ej. entrada gratuita). */
  entry?: string;
  pressLinks?: PressLink[];
  photos?: string[];
};

// Nombres de bandas invitadas/anfitrionas, reutilizados en varias descripciones.
const PORN_BAND_NAME: string = "PORN";
const BREAKPOINT_BAND_NAME: string = "BREAKPOINT";

// Las fotos de cada show están numeradas 1.webp…N.webp en public/images/shows/<carpeta>/.
function showPhotos(folder: number, count: number): string[] {
  return Array.from({ length: count }, (_: unknown, i: number): string => `/images/shows/${folder}/${i + 1}.webp`);
}

// Todos los shows, próximos y anteriores, en cualquier orden: src/lib/shows.ts
// los separa según la fecha del día en que se genera el sitio.
export const SHOWS: Show[] = [
  {
    date: "2026-11-28",
    venue: "Tuc-Man Expo Tattoo",
    city: "Tucumán, Argentina",
    entry: "Entrada: alimento no perecedero",
    invitedBy: "Tuc-Man Expo Tattoo",
    postUrl: "https://www.instagram.com/p/Dcr8pDARsA_/",
    description: "Formamos parte de la Tuc-Man Expo Tattoo, el evento de tatuajes más grande del NOA, con más de 200 artistas en la Sociedad Rural de Tucumán.",
  },
  {
    date: "2026-06-19",
    venue: "Magic Music Box",
    city: "Tucumán, Argentina",
    event: "Noche Nu Metal",
    invitedBy: BREAKPOINT_BAND_NAME,
    description: `Formamos parte de la fecha debut de ${BREAKPOINT_BAND_NAME}, compartiendo escenario en una noche a puro nu metal.`,
    postUrl: "https://www.instagram.com/p/DaRebBYDFNT/",
    photos: showPhotos(4, 6),
  },
  {
    date: "2025-11-08",
    venue: "Mendoza 1084",
    city: "Tucumán, Argentina",
    event: "OBSCENE FEST — Nü Sessions · VOL. I",
    invitedBy: PORN_BAND_NAME,
    description: `Tres tributos en una noche de Nü Metal: ${PORN_BAND_NAME} (Korn), LINKIN ZERØ (Linkin Park) y Def Party (Deftones), más DJ set de 2000s.`,
    postUrl: "https://www.instagram.com/p/DSYwsETDNQ8/",
    photos: showPhotos(3, 10),
  },
  {
    date: "2025-09-12",
    venue: "Magic Music Box",
    city: "Tucumán, Argentina",
    event: "PROJEKT REVOLUTION",
    description: `Nuestra primera fecha propia, tocando junto a ${PORN_BAND_NAME} (Korn) en una noche dedicada por completo al nu metal.`,
    postUrl: "https://www.instagram.com/p/DO4zdAtjF5A/",
    photos: showPhotos(2, 8),
  },
  {
    date: "2025-09-05",
    venue: "Espacio Lola Mora",
    city: "Tucumán, Argentina",
    event: "65° Septiembre Musical — NuMetal & Prog Night",
    invitedBy: PORN_BAND_NAME,
    pressLinks: [
      {
        label: "Ver nota del Ente Cultural Tucumán",
        url: "https://enteculturaltucuman.gob.ar/septiembre-musical-2025-tributos-a-korn-linkin-park-y-tool-en-el-espacio-lola-mora/",
      },
      {
        label: "Ver nota de Tu Blog Del Rock",
        url: "https://www.instagram.com/p/DOSQHs4jSGN/",
      },
    ],
    description: `Una noche de rock alternativo y metal junto a ${PORN_BAND_NAME} (Korn) y Aeon (Tool), en un evento cultural y familiar con música en vivo, feria de artesanos y gastronomía.`,
    postUrl: "https://www.instagram.com/p/DOXS0a2DDJ7/",
    photos: showPhotos(1, 6),
  },
];
