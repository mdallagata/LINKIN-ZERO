export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", href: "/" },
  { label: "Miembros", href: "/members" },
  { label: "Contacto", href: "/#contacto" },
  { label: "Shows", href: "/shows" },
];
