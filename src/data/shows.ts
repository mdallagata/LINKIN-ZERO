export type UpcomingShow = {
  date: string;
  venue: string;
  city: string;
  ticketUrl?: string;
  /** Link a la publicación de Instagram con la promo del show. */
  promoUrl?: string;
  /** Texto del link de promo (por defecto "Promo"). */
  promoLabel?: string;
  /** Info de acceso al show, se muestra como badge (ej. entrada gratuita). */
  entry?: string;
  /** Banda o entidad que invitó/anfitriona del show. */
  invitedBy?: string;
  description?: string;
};

export type PressLink = {
  label: string;
  url: string;
};

export type PastShow = {
  date: string;
  /** Fecha en formato ISO (AAAA-MM-DD), solo para ordenar cronológicamente — `date` es el texto que se muestra. */
  sortKey: string;
  venue: string;
  city: string;
  event: string;
  invitedBy?: string;
  pressLinks?: PressLink[];
  description?: string;
  embedUrl?: string;
  photos?: string[];
};

// Nombres de bandas invitadas/anfitrionas, reutilizados en varias descripciones.
const PORN_BAND_NAME: string = "PORN";
const BREAKPOINT_BAND_NAME: string = "BREAKPOINT";

// Fechas confirmadas, ordenadas por cronología.
export const UPCOMING_SHOWS: UpcomingShow[] = [
  {
    date: "28 de Noviembre, 2026",
    venue: "Tuc-Man Expo Tattoo",
    city: "Tucumán, Argentina",
    entry: "Entrada: alimento no perecedero",
    invitedBy: "Tuc-Man Expo Tattoo",
    promoUrl: "https://www.instagram.com/p/DcAQ0yEtPay/",
    promoLabel: "Ver publicación PROMO",
    description: "Tocamos en vivo en la Tuc-Man Expo Tattoo, el evento de tatuajes más grande del NOA, con más de 200 artistas en la Sociedad Rural de Tucumán.",
  },
];

const PAST_SHOWS: PastShow[] = [
  {
    date: "19 de Junio, 2026",
    sortKey: "2026-06-19",
    venue: "Magic Music Box",
    city: "Tucumán, Argentina",
    event: "Noche Nu Metal",
    invitedBy: BREAKPOINT_BAND_NAME,
    description: `Tocamos como banda invitada en la fecha debut de ${BREAKPOINT_BAND_NAME}, compartiendo escenario en una noche a puro nu metal.`,
    embedUrl: "https://www.instagram.com/p/DaRebBYDFNT/embed",
    photos: ["/images/shows/4/1.webp", "/images/shows/4/2.webp", "/images/shows/4/3.webp", "/images/shows/4/4.webp", "/images/shows/4/5.webp", "/images/shows/4/6.webp"],
  },
  {
    date: "8 de Noviembre, 2025",
    sortKey: "2025-11-08",
    venue: "Mendoza 1084",
    city: "Tucumán, Argentina",
    event: "OBSCENE FEST — Nü Sessions · VOL. I",
    invitedBy: PORN_BAND_NAME,
    description: `Tres tributos en una noche de Nü Metal: ${PORN_BAND_NAME} (Korn), LINKIN ZERØ (Linkin Park) y Def Party (Deftones), más DJ set de 2000s.`,
    embedUrl: "https://www.instagram.com/p/DSYwsETDNQ8/embed",
    photos: ["/images/shows/3/1.webp", "/images/shows/3/2.webp", "/images/shows/3/3.webp", "/images/shows/3/4.webp", "/images/shows/3/5.webp", "/images/shows/3/6.webp", "/images/shows/3/7.webp", "/images/shows/3/8.webp", "/images/shows/3/9.webp", "/images/shows/3/10.webp"],
  },
  {
    date: "12 de Septiembre, 2025",
    sortKey: "2025-09-12",
    venue: "Magic Music Box",
    city: "Tucumán, Argentina",
    event: "PROJEKT REVOLUTION",
    description: `Nuestra primera fecha propia, tocando junto a ${PORN_BAND_NAME} (Korn) en una noche dedicada por completo al nu metal.`,
    embedUrl: "https://www.instagram.com/p/DO4zdAtjF5A/embed",
    photos: ["/images/shows/2/1.webp", "/images/shows/2/2.webp", "/images/shows/2/3.webp", "/images/shows/2/4.webp", "/images/shows/2/5.webp", "/images/shows/2/6.webp", "/images/shows/2/7.webp", "/images/shows/2/8.webp"],
  },
  {
    date: "5 de Septiembre, 2025",
    sortKey: "2025-09-05",
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
    embedUrl: "https://www.instagram.com/p/DOXS0a2DDJ7/embed",
    photos: ["/images/shows/1/1.jpg", "/images/shows/1/2.jpg", "/images/shows/1/3.jpg", "/images/shows/1/4.jpg", "/images/shows/1/5.jpg", "/images/shows/1/6.jpg"],
  },
];

// PAST_SHOWS ordenado del más reciente al más antiguo por sortKey, no por
// posición en el array — evita que un show cargado fuera de orden rompa
// silenciosamente "Último Show" en la home.
export const SORTED_PAST_SHOWS: PastShow[] = [...PAST_SHOWS].sort((a: PastShow, b: PastShow) => b.sortKey.localeCompare(a.sortKey));
