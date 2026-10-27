import "server-only";
import { SHOWS } from "@/data/shows";
import type { ShowSchedule } from "@/lib/show-schedule";
import { splitShows } from "@/lib/show-schedule";

// Solo en el servidor: la separación depende del día en que se genera el sitio.
// Si el navegador la recalculara después del último deploy, el HTML y React no
// coincidirían al hidratar.

// Hoy en Tucumán (AAAA-MM-DD). El CI regenera el sitio todos los días, así que
// un show pasa solo de "próximo" a "anterior" al día siguiente de tocar.
const TODAY: string = new Date().toLocaleDateString("en-CA", { timeZone: "America/Argentina/Tucuman" });

const SCHEDULE: ShowSchedule = splitShows(SHOWS, TODAY);
export const UPCOMING_SHOWS: ShowSchedule["upcoming"] = SCHEDULE.upcoming;
export const PAST_SHOWS: ShowSchedule["past"] = SCHEDULE.past;
