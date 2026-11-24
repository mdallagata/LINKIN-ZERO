import type { ScheduleSlot, Show } from "@/data/shows";

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

const MONTHS: string[] = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
const WEEKDAYS: string[] = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export type ShowDateParts = {
  /** Con dos cifras: "05". */
  day: string;
  month: string;
  weekday: string;
  year: string;
};

/** "2026-11-28" → { day: "28", month: "Nov", weekday: "Sáb", year: "2026" }, para las listas de fechas. */
export function showDateParts(iso: string): ShowDateParts {
  const [year, month, day] = iso.split("-").map(Number);
  const monthName: string | undefined = month ? MONTHS[month - 1] : undefined;
  // Mejor que el build falle con un mensaje claro a que el sitio muestre "undefined".
  if (!year || !month || !monthName || !day) throw new Error(`Fecha de show inválida: "${iso}" (formato AAAA-MM-DD)`);
  // En UTC: el día de la semana no puede depender de la zona horaria de la máquina que genera el sitio.
  const weekday: string = WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()] ?? "";
  return { day: String(day).padStart(2, "0"), month: monthName, weekday, year: String(year) };
}

/** Inicio del show para schema.org: "2026-11-29" + "21:30" → "2026-11-29T21:30:00-03:00" (Tucumán es UTC−3 todo el año). Sin hora, solo la fecha. */
export function showStartDate(date: string, time?: string): string {
  if (!time) return date;
  const [hours, minutes] = time.split(":");
  return `${date}T${(hours ?? "").padStart(2, "0")}:${minutes}:00-03:00`;
}

/** Las otras bandas del cronograma, en orden: ["Dark Phoenix", "Dentro del Túnel"]. */
export function otherBands(show: Show): string[] {
  return (show.schedule ?? []).filter((slot: ScheduleSlot): boolean => Boolean(slot.band)).map((slot: ScheduleSlot): string => slot.label);
}

const LIST_FORMAT: Intl.ListFormat = new Intl.ListFormat("es", { type: "conjunction" });

/** "Compartimos escenario con Dark Phoenix y Dentro del Túnel", o nada si tocamos solos. */
export function lineupText(show: Show): string | undefined {
  const bands: string[] = otherBands(show);
  return bands.length > 0 ? `Compartimos escenario con ${LIST_FORMAT.format(bands)}` : undefined;
}
