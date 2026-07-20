export type Member = {
  name: string;
  role: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  instagramUrl: string;
  imagePosition?: string;
};

export const MEMBERS: Member[] = [
  {
    name: "Lucas Emir Sorroza",
    role: "Batería",
    imageSrc: "/images/lucas.webp",
    imageAlt: "Lucas Emir Sorroza",
    imageWidth: 480,
    imageHeight: 720,
    instagramUrl: "https://www.instagram.com/emirxsorroza/",
    imagePosition: "center 60%",
  },
  {
    name: "Gustavo Monjes",
    role: "Bajo",
    imageSrc: "/images/gustavo.webp",
    imageAlt: "Gustavo Monjes",
    imageWidth: 480,
    imageHeight: 720,
    instagramUrl: "https://www.instagram.com/gustavomonjes/",
    imagePosition: "center 20%",
  },
  {
    name: "Mariano Cruz",
    role: "Voces",
    imageSrc: "/images/mariano.webp",
    imageAlt: "Mariano Cruz",
    imageWidth: 480,
    imageHeight: 720,
    instagramUrl: "https://www.instagram.com/marianoncrz/",
    imagePosition: "center 25%",
  },
  {
    name: "Mauricio Dall'Agata",
    role: "Guitarra principal",
    imageSrc: "/images/mauricio.webp",
    imageAlt: "Mauricio Dall'Agata",
    imageWidth: 480,
    imageHeight: 720,
    instagramUrl: "https://www.instagram.com/m_dallagata/",
    imagePosition: "center 40%",
  },
  {
    name: "Exequiel Arias",
    role: "Voces / Guitarra rítmica",
    imageSrc: "/images/exequiel.webp",
    imageAlt: "Exequiel Arias",
    imageWidth: 480,
    imageHeight: 720,
    instagramUrl: "https://www.instagram.com/perfect.hatred.2048/",
    imagePosition: "center 65%",
  },
];
