export type NavLink = {
  label: string;
  href: string;
};

export const HOME_NAV_LINKS: NavLink[] = [
  { label: "Miembros", href: "/members" },
  { label: "Shows", href: "/shows" },
  { label: "Contacto", href: "/#contacto" },
];

export const SUBPAGE_NAV_LINKS: NavLink[] = [{ label: "Inicio", href: "/" }];
