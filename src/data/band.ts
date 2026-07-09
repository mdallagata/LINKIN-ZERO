export const BAND_NAME: string = "LINKIN ZERØ";
export const SITE_URL: string = "https://linkinzero.vercel.app";
export const BAND_TAGLINE: string = "Tributo a LINKIN PARK — Tucumán, Argentina";
export const BAND_DESCRIPTION: string = "Somos una banda tributo a LINKIN PARK de Tucumán, Argentina, formada en diciembre de 2023. A donde vayamos buscamos ofrecer una experiencia fiel, potente y emocional, tratando de transmitir la esencia de esta banda, tanto en lo musical como en lo sonoro.";
export const CONTACT_EMAIL: string = "linkin.zero.tuc@gmail.com";
export const INSTAGRAM_URL: string = "https://www.instagram.com/linkin.zero/";
export const WHATSAPP_URL: string = "https://wa.me/543816176275";

export const LEGAL_DISCLAIMER: string =
  "Tributo independiente. Sin afiliación con LINKIN PARK.";

// Revalida a diario: sin esto, el año del footer (new Date().getFullYear())
// queda fijo en el HTML del último build hasta el próximo deploy.
export const DAILY_REVALIDATE_SECONDS: number = 86400;

// Imagen compartida por el openGraph de todas las páginas, para que compartir
// cualquier link (no solo la home) muestre preview con foto en redes sociales.
export const OG_IMAGE = {
  url: "/icon.png",
  width: 256,
  height: 256,
  alt: BAND_NAME,
};
