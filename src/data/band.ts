import { MEMBERS } from "@/data/members";

export const BAND_NAME: string = "LINKIN ZERØ";
export const SITE_URL: string = "https://linkinzero.hyan.dev";
export const BAND_TAGLINE: string = "Tributo a LINKIN PARK";
export const BAND_LOCATION: string = "Tucumán, Argentina";
/** Frase grande de "Quiénes somos" en la home. */
export const BAND_STATEMENT: string = "Fiel, potente y emocional.";
export const BAND_DESCRIPTION: string =
  "Somos una banda tributo a LINKIN PARK de Tucumán, Argentina, formada en diciembre de 2023. A donde vayamos buscamos ofrecer una experiencia fiel, potente y emocional, tratando de transmitir la esencia de esta banda, tanto en lo musical como en lo sonoro.";
export const CONTACT_EMAIL: string = "linkin.zero.tuc@gmail.com";
export const INSTAGRAM_URL: string = "https://www.instagram.com/linkin.zero/";
export const WHATSAPP_URL: string = "https://wa.me/543816176275";
/** El mismo número de WHATSAPP_URL, escrito para mostrarlo. */
export const CONTACT_PHONE: string = "+54 381 617-6275";

export type BandFact = {
  label: string;
  value: string;
};

// Datos rápidos para quien nos quiere contratar, junto a la descripción de la home.
export const BAND_FACTS: BandFact[] = [
  { label: "Desde", value: "Diciembre 2023" },
  { label: "Base", value: BAND_LOCATION },
  { label: "Formación", value: `${MEMBERS.length} músicos en vivo` },
  { label: "Tocamos en", value: "Todo el país" },
];

export const LEGAL_DISCLAIMER: string = "Tributo independiente. Sin afiliación con LINKIN PARK.";

// Imagen compartida por el openGraph de todas las páginas, para que compartir
// cualquier link (no solo la home) muestre preview con foto en redes sociales.
type OGImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

export const OG_IMAGE: OGImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: `${BAND_NAME} en vivo`,
};
