import { existsSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { REEL_URL } from "../src/data/instagram";
import { MEMBERS } from "../src/data/members";
import type { Member } from "../src/data/members";
import { SHOWS } from "../src/data/shows";
import type { Show } from "../src/data/shows";
import { instagramEmbedInfo } from "../src/lib/instagram-embed";
import { formatShowDate, splitShows } from "../src/lib/show-schedule";

// Chequeos de src/data: lo que antes había que acordarse de revisar a mano
// antes de deployar (fotos que existan, fechas bien escritas, links válidos).

function publicFileExists(path: string): boolean {
  return existsSync(`public${path}`);
}

test.describe("shows", () => {
  for (const show of SHOWS) {
    test(`${show.date} — ${show.venue}`, () => {
      expect(show.date, "formato AAAA-MM-DD").toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(`${show.date}T12:00:00Z`).toISOString().slice(0, 10), "una fecha que existe").toBe(show.date);
      for (const photo of show.photos ?? []) expect(publicFileExists(photo), `existe ${photo}`).toBe(true);
      if (show.postUrl) expect(instagramEmbedInfo(show.postUrl), `publicación de Instagram: ${show.postUrl}`).not.toBeNull();
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

  test("la fecha se muestra en castellano y una mal escrita frena el build", () => {
    expect(formatShowDate("2026-11-28")).toBe("28 de Noviembre, 2026");
    expect(formatShowDate("2025-09-05")).toBe("5 de Septiembre, 2025");
    expect(() => formatShowDate("28/11/2026")).toThrow();
  });
});
