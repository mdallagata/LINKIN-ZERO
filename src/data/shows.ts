export type UpcomingShow = {
  date: string;
  venue: string;
  city: string;
  ticketUrl: string;
  description?: string;
  photos?: string[];
};

export type PastShow = {
  date: string;
  venue: string;
  city: string;
  event: string;
  detailsUrl?: string;
  description?: string;
  photos?: string[];
};

// Sin fechas confirmadas por el momento.
export const UPCOMING_SHOWS: UpcomingShow[] = [];

// Orden: el más reciente primero (PAST_SHOWS[0] es el que se muestra en "Último Show" en la home).
export const PAST_SHOWS: PastShow[] = [
  {
    date: "5 de septiembre, 2025",
    venue: "Espacio Lola Mora",
    city: "Tucumán, Argentina",
    event: "65° Septiembre Musical — NuMetal & Prog Night",
    detailsUrl:
      "https://enteculturaltucuman.gob.ar/septiembre-musical-2025-tributos-a-korn-linkin-park-y-tool-en-el-espacio-lola-mora/",
    description:
      "El 65° Septiembre Musical nos convocó el viernes 5 de septiembre en el Espacio Lola Mora para una noche intensa de rock alternativo y metal. Junto a Porn (tributo a Korn) y Aeon (tributo a Tool), revivimos la potencia de bandas icónicas que marcaron a generaciones enteras. Fue un espacio de encuentro familiar con música en vivo, feria de artesanos y gastronomía, celebrando la vigencia de estos himnos en la memoria colectiva.",
  },
];
