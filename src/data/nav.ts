export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Shows", href: "/shows" },
  { label: "Integrantes", href: "/members" },
];

/** Botón destacado del menú: lleva a la sección de contrataciones de la home. */
export const BOOKING_LINK: NavLink = { label: "Contratar", href: "/#contacto" };
