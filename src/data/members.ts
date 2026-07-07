export type Member = {
  name: string;
  role: string;
  bio: string;
  reverse: boolean;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export const MEMBERS: Member[] = [
  {
    name: "Lucas Emir Sorroza",
    role: "Batería",
    bio: "Biografía próximamente.",
    reverse: false,
    imageSrc: "/images/lucas.jpg",
    imageAlt: "Lucas Emir Sorroza",
    imageWidth: 400,
    imageHeight: 400,
  },
  {
    name: "Gustavo Monjes",
    role: "Bajo",
    bio: "Biografía próximamente.",
    reverse: true,
    imageSrc: "/images/gustavo.jpg",
    imageAlt: "Gustavo Monjes",
    imageWidth: 400,
    imageHeight: 400,
  },
  {
    name: "Mariano Cruz Abregu Mussatti",
    role: "Voz",
    bio: "Biografía próximamente.",
    reverse: false,
    imageSrc: "/images/mariano.jpg",
    imageAlt: "Mariano Cruz Abregu Mussatti",
    imageWidth: 400,
    imageHeight: 400,
  },
  {
    name: "Mauricio Antonio Dall'Agata",
    role: "Guitarra principal",
    bio: "Biografía próximamente.",
    reverse: true,
    imageSrc: "/images/mauricio.jpg",
    imageAlt: "Mauricio Antonio Dall'Agata",
    imageWidth: 400,
    imageHeight: 400,
  },
  {
    name: "Exequiel Mleziva",
    role: "Voz / Guitarra rítmica",
    bio: "Biografía próximamente.",
    reverse: false,
    imageSrc: "/images/exequiel.jpg",
    imageAlt: "Exequiel Mleziva",
    imageWidth: 400,
    imageHeight: 400,
  },
];
