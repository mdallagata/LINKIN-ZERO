export type UpcomingShow = {
  date: string;
  venue: string;
  city: string;
  ticketUrl: string;
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
};

// Nombres de bandas invitadas/anfitrionas, reutilizados en varias descripciones.
export const PORN_BAND_NAME: string = "PORN";
export const BREAKPOINT_BAND_NAME: string = "BREAKPOINT";

// Sin fechas confirmadas por el momento.
export const UPCOMING_SHOWS: UpcomingShow[] = [];

export const PAST_SHOWS: PastShow[] = [
  {
    date: "19 de Junio, 2026",
    sortKey: "2026-06-19",
    venue: "Magic Music Box",
    city: "Tucumán, Argentina",
    event: "Noche Nu Metal",
    invitedBy: BREAKPOINT_BAND_NAME,
    description: `Tocamos como banda invitada en la fecha debut de ${BREAKPOINT_BAND_NAME}, compartiendo escenario en una noche a puro nu metal.`,
    embedUrl: "https://www.instagram.com/p/DaRebBYDFNT/embed",
  },
  {
    date: "8 de Noviembre, 2025",
    sortKey: "2025-11-08",
    venue: "Mendoza 1084",
    city: "Tucumán, Argentina",
    event: "OBSCENE FEST — Nü Sessions · VOL. I",
    description: `Tres tributos en una noche de Nü Metal: ${PORN_BAND_NAME} (Korn), LINKIN ZERØ (Linkin Park) y Def Party (Deftones), más DJ set de 2000s.`,
    embedUrl: "https://www.instagram.com/p/DSYwsETDNQ8/embed",
  },
  {
    date: "12 de Septiembre, 2025",
    sortKey: "2025-09-12",
    venue: "Magic Music Box",
    city: "Tucumán, Argentina",
    event: "PROJEKT REVOLUTION",
    description: `Nuestra primera fecha propia, tocando junto a ${PORN_BAND_NAME} (Korn) en una noche dedicada por completo al nu metal.`,
    embedUrl: "https://www.instagram.com/p/DO4zdAtjF5A/embed",
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
  },
];

// PAST_SHOWS ordenado del más reciente al más antiguo por sortKey, no por
// posición en el array — evita que un show cargado fuera de orden rompa
// silenciosamente "Último Show" en la home.
export const SORTED_PAST_SHOWS: PastShow[] = [...PAST_SHOWS].sort((a: PastShow, b: PastShow) => b.sortKey.localeCompare(a.sortKey));
