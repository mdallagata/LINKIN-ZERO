import { existsSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { BAND_NAME } from "../src/data/band";
import { REEL_URL } from "../src/data/instagram";
import { MEMBERS } from "../src/data/members";
import type { Member } from "../src/data/members";
import { SHOWS } from "../src/data/shows";
import type { ScheduleSlot, Show } from "../src/data/shows";
import { instagramEmbedInfo } from "../src/lib/instagram-embed";
import { lineupText, showDateParts, showStartDate, splitShows } from "../src/lib/show-schedule";

// Chequeos de src/data: lo que antes había que acordarse de revisar a mano
// antes de deployar (fotos que existan, fechas bien escritas, links válidos).

/** Hora en 24 h: "8:30", "21:30". */
const TIME_PATTERN: RegExp = /^([01]?\d|2[0-3]):[0-5]\d$/;

function publicFileExists(path: string): boolean {
  return existsSync(`public${path}`);
}

test.describe("shows", () => {
  for (const show of SHOWS) {
    test(`${show.date} — ${show.venue}`, () => {
      expect(show.date, "formato AAAA-MM-DD").toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(`${show.date}T12:00:00Z`).toISOString().slice(0, 10), "una fecha que existe").toBe(show.date);
      for (const photo of show.photos ?? []) expect(publicFileExists(photo), `existe ${photo}`).toBe(true);
      if (show.coverPhoto !== undefined) expect(show.photos?.[show.coverPhoto - 1], `existe la foto ${show.coverPhoto} de vista previa`).toBeDefined();
      if (show.postUrl) expect(instagramEmbedInfo(show.postUrl), `publicación de Instagram: ${show.postUrl}`).not.toBeNull();
      if (show.time !== undefined) expect(show.time, "hora en 24 h").toMatch(TIME_PATTERN);
      for (const slot of show.schedule ?? []) expect(slot.time, `hora de "${slot.label}"`).toMatch(TIME_PATTERN);
      const ourSlot: ScheduleSlot | undefined = show.schedule?.find((slot: ScheduleSlot): boolean => slot.label === BAND_NAME);
      if (ourSlot) expect(ourSlot.time, "nuestro horario en el cronograma es el mismo que `time`").toBe(show.time);
    });
  }

  test("no hay dos shows el mismo día en el mismo lugar", () => {
    const keys: string[] = SHOWS.map((s: Show): string => `${s.date} ${s.venue}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

test("integrantes: todas las fotos existen", () => {
  for (const member of MEMBERS) expect(publicFileExists(member.imageSrc), `foto de ${member.name}`).toBe(true);
  expect(new Set(MEMBERS.map((m: Member): string => m.name)).size).toBe(MEMBERS.length);
});

test("el reel de la home es una publicación de Instagram", () => {
  expect(instagramEmbedInfo(REEL_URL)).not.toBeNull();
});

test.describe("próximos y anteriores", () => {
  const show: Show = { date: "2026-11-28", venue: "Lugar", city: "Tucumán" };

  test("el día del show todavía es próximo; al día siguiente pasa a anteriores", () => {
    expect(splitShows([show], "2026-11-27").upcoming).toEqual([show]);
    expect(splitShows([show], "2026-11-28").upcoming).toEqual([show]);
    expect(splitShows([show], "2026-11-29")).toEqual({ upcoming: [], past: [show] });
  });

  test("próximos del más cercano al más lejano; anteriores del más reciente al más viejo", () => {
    const dates = (shows: Show[]): string[] => shows.map((s: Show): string => s.date);
    const shows: Show[] = ["2026-01-10", "2027-03-01", "2025-05-05", "2026-12-24"].map((date: string): Show => ({ ...show, date }));
    const { upcoming, past } = splitShows(shows, "2026-06-01");
    expect(dates(upcoming)).toEqual(["2026-12-24", "2027-03-01"]);
    expect(dates(past)).toEqual(["2026-01-10", "2025-05-05"]);
  });

  test("la fecha se muestra en castellano, con su día de la semana, y una mal escrita frena el build", () => {
    expect(showDateParts("2026-11-28")).toEqual({ day: "28", month: "Nov", weekday: "Sáb", year: "2026" });
    expect(showDateParts("2025-09-05")).toEqual({ day: "05", month: "Sep", weekday: "Vie", year: "2025" });
    expect(() => showDateParts("28/11/2026")).toThrow();
  });

  test("con hora, el inicio para schema.org va en hora de Tucumán", () => {
    expect(showStartDate("2026-11-29", "21:30")).toBe("2026-11-29T21:30:00-03:00");
    expect(showStartDate("2026-11-29", "8:30")).toBe("2026-11-29T08:30:00-03:00");
    expect(showStartDate("2026-11-29")).toBe("2026-11-29");
  });

  test("las otras bandas del cronograma se nombran en orden", () => {
    const schedule: ScheduleSlot[] = [
      { time: "18:00", label: "Dark Phoenix", band: true },
      { time: "20:00", label: "Premiación" },
      { time: "21:00", label: "Dentro del Túnel", band: true },
      { time: "21:30", label: BAND_NAME },
    ];
    expect(lineupText({ ...show, schedule })).toBe("Compartimos escenario con Dark Phoenix y Dentro del Túnel");
    expect(lineupText(show)).toBeUndefined();
  });
});
