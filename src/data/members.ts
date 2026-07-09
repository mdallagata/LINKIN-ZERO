export type Member = {
  name: string;
  role: string;
  reverse: boolean;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  instagramUrl: string;
};

export const MEMBERS: Member[] = [
  {
    name: "Lucas Emir Sorroza",
    role: "Batería",
    reverse: false,
    imageSrc: "/images/lucas.jpg",
    imageAlt: "Lucas Emir Sorroza",
    imageWidth: 800,
    imageHeight: 1200,
    instagramUrl: "https://www.instagram.com/emirxsorroza/",
  },
  {
    name: "Gustavo Monjes",
    role: "Bajo",
    reverse: true,
    imageSrc: "/images/gustavo.jpg",
    imageAlt: "Gustavo Monjes",
    imageWidth: 800,
    imageHeight: 1200,
    instagramUrl: "https://www.instagram.com/gustavomonjes/",
  },
  {
    name: "Mariano Cruz",
    role: "Voces",
    reverse: false,
    imageSrc: "/images/mariano.jpg",
    imageAlt: "Mariano Cruz",
    imageWidth: 800,
    imageHeight: 1200,
    instagramUrl: "https://www.instagram.com/marianoncrz/",
  },
  {
    name: "Mauricio Dall'Agata",
    role: "Guitarra principal",
    reverse: true,
    imageSrc: "/images/mauricio.jpg",
    imageAlt: "Mauricio Dall'Agata",
    imageWidth: 800,
    imageHeight: 1200,
    instagramUrl: "https://www.instagram.com/m_dallagata/",
  },
  {
    name: "Exequiel Arias",
    role: "Voces / Guitarra rítmica",
    reverse: false,
    imageSrc: "/images/exequiel.jpg",
    imageAlt: "Exequiel Arias",
    imageWidth: 800,
    imageHeight: 1200,
    instagramUrl: "https://www.instagram.com/perfect.hatred.2048/",
  },
];
