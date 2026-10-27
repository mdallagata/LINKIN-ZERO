import type { Show } from "@/data/shows";

export type ShowSchedule = {
  /** De `today` en adelante, el más cercano primero. */
  upcoming: Show[];
  /** Anteriores a `today`, el más reciente primero. */
  past: Show[];
};

/** Separa los shows en próximos y anteriores. `today` en formato AAAA-MM-DD: el día del show todavía cuenta como próximo. */
export function splitShows(shows: Show[], today: string): ShowSchedule {
  return {
    upcoming: shows.filter((s: Show): boolean => s.date >= today).sort((a: Show, b: Show): number => a.date.localeCompare(b.date)),
    past: shows.filter((s: Show): boolean => s.date < today).sort((a: Show, b: Show): number => b.date.localeCompare(a.date)),
  };
}

const MONTHS: string[] = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

/** "2026-11-28" → "28 de Noviembre, 2026". */
export function formatShowDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return `${day} de ${MONTHS[month - 1]}, ${year}`;
}
