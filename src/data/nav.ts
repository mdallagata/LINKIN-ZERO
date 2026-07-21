export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Contacto", href: "/#contacto" },
  { label: "Miembros", href: "/members" },
  { label: "Shows", href: "/shows" },
];
