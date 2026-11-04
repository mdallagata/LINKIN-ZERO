// Datos del embed de una publicación de Instagram. Lo usan InstagramEmbed y
// scripts/instagram-poster.mts, así que no puede importar nada con "@/".

export type InstagramEmbedInfo = {
  /** Código de la publicación (lo que va después de /p/ o /reel/). */
  code: string;
  src: string;
  label: "Post" | "Reel";
  /** Recuadro del embed en px (la captura de portada se saca con estas medidas). */
  width: number;
  height: number;
};

export function instagramEmbedInfo(url: string): InstagramEmbedInfo | null {
  const match: RegExpMatchArray | null = url.match(/instagram\.com\/(p|reel)\/([^/?]+)/);
  const type: string | undefined = match?.[1];
  const code: string | undefined = match?.[2];
  if (!type || !code) return null;
  return type === "reel"
    ? { code, src: `https://www.instagram.com/reel/${code}/embed`, label: "Reel", width: 400, height: 711 }
    : { code, src: `https://www.instagram.com/p/${code}/embed`, label: "Post", width: 350, height: 420 };
}
