import type { CDPSession, Locator, Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

// Recorrido del sitio exportado (out/) en un navegador real. Instagram no se
// toca: sus pedidos se responden con una página vacía.
test.beforeEach(async ({ page }) => {
  await page.route(/instagram\.com|cdninstagram|fbcdn/, (route) => route.fulfill({ contentType: "text/html", body: "<html><body></body></html>" }));
});

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (error: Error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  return errors;
}

async function scrollToBottom(page: Page): Promise<void> {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  });
}

const PAGES: { path: string; title: string; h1: string; canonical: string }[] = [
  { path: "/", title: "LINKIN ZERØ", h1: "[ LINKIN ZERØ ]", canonical: "https://linkinzero.hyan.dev" },
  { path: "/members", title: "Miembros — LINKIN ZERØ", h1: "Miembros", canonical: "https://linkinzero.hyan.dev/members" },
  { path: "/shows", title: "Shows — LINKIN ZERØ", h1: "Shows", canonical: "https://linkinzero.hyan.dev/shows" },
];

for (const { path, title, h1, canonical } of PAGES) {
  test(`${path} carga sin errores, con un solo h1 y su canonical`, async ({ page }) => {
    const errors: string[] = collectErrors(page);
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(h1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await scrollToBottom(page);
    expect(errors).toEqual([]);
  });
}

test("una ruta que no existe devuelve la página 404", async ({ page }) => {
  const response = await page.goto("/no-existe");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("404");
});

test("la navegación lleva a cada página y marca la actual", async ({ page }) => {
  await page.goto("/");
  const nav: Locator = page.getByRole("navigation", { name: "Principal" });
  await nav.getByRole("link", { name: "Miembros" }).click();
  await expect(page).toHaveURL(/\/members$/);
  await expect(nav.getByRole("link", { name: "Miembros" })).toHaveAttribute("aria-current", "page");
});

test("galería: abre en la foto elegida, se navega con las flechas y se cierra con Esc", async ({ page }) => {
  await page.goto("/shows");
  const thumb: Locator = page.getByRole("button", { name: "Ver foto 2" }).first();
  await thumb.click();

  const dialog: Locator = page.getByRole("dialog");
  const photo: Locator = dialog.getByRole("img");
  await expect(dialog).toBeVisible();
  await expect(photo).toHaveAttribute("alt", /Foto 2$/);
  await page.keyboard.press("ArrowRight");
  await expect(photo).toHaveAttribute("alt", /Foto 3$/);

  // El modal está en la capa superior: el botón "volver arriba" no queda por encima.
  const backToTop: Locator = page.getByRole("button", { name: "Volver arriba", includeHidden: true });
  const onTop: boolean = await backToTop.evaluate((button: HTMLElement): boolean => {
    const box: DOMRect = button.getBoundingClientRect();
    return document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2) === button;
  });
  expect(onTop).toBe(false);

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(thumb).toBeFocused();
});

test("Instagram: muestra la portada y carga el embed recién al tocarla", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    if (/instagram\.com/.test(request.url())) requests.push(request.url());
  });
  await page.goto("/");
  await scrollToBottom(page);
  expect(requests).toEqual([]);

  await page.getByRole("button", { name: "Cargar la publicación de Instagram" }).last().click();
  await expect(page.locator('iframe[title="Publicación de Instagram"]')).toHaveCSS("opacity", "1");
  expect(requests.length).toBeGreaterThan(0);
});

test.describe("sin JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("no queda contenido invisible esperando un fade", async ({ page }) => {
    for (const path of ["/", "/members", "/shows"]) {
      await page.goto(path);
      const hidden: number = await page.evaluate(
        (): number =>
          [...document.querySelectorAll("main *")].filter((el: Element): boolean => el.checkVisibility() && getComputedStyle(el).opacity === "0").length,
      );
      expect(hidden, path).toBe(0);
    }
  });
});

test.describe("celular", () => {
  test.skip(({ isMobile }) => !isMobile, "gestos táctiles");

  async function touch(cdp: CDPSession, type: "touchStart" | "touchMove" | "touchEnd", points: [number, number][]): Promise<void> {
    await cdp.send("Input.dispatchTouchEvent", { type, touchPoints: points.map(([x, y]: [number, number], id: number) => ({ x, y, id })) });
  }

  test("galería: swipe pasa de foto y doble toque pone y saca el zoom", async ({ page }) => {
    await page.goto("/shows");
    await page.getByRole("button", { name: "Ver foto 2" }).first().tap();
    const photo: Locator = page.getByRole("dialog").getByRole("img");
    await expect(photo).toHaveAttribute("alt", /Foto 2$/);

    const box = await photo.boundingBox();
    if (!box) throw new Error("la foto no tiene tamaño");
    const [x, y]: [number, number] = [box.x + box.width / 2, box.y + box.height / 2];
    const cdp: CDPSession = await page.context().newCDPSession(page);

    await touch(cdp, "touchStart", [[x + 100, y]]);
    for (let i = 1; i <= 6; i++) await touch(cdp, "touchMove", [[x + 100 - i * 30, y]]);
    await touch(cdp, "touchEnd", []);
    await expect(photo).toHaveAttribute("alt", /Foto 3$/);

    // Los cuatro eventos se mandan juntos (CDP los procesa en orden): el doble
    // toque tiene que entrar en 300 ms aunque la máquina esté cargada.
    const doubleTap = (): Promise<unknown> =>
      Promise.all([touch(cdp, "touchStart", [[x, y]]), touch(cdp, "touchEnd", []), touch(cdp, "touchStart", [[x, y]]), touch(cdp, "touchEnd", [])]);
    await doubleTap();
    await expect.poll(() => photo.evaluate((img: HTMLElement): string => img.style.transform)).toContain("scale(2.5)");
    await page.waitForTimeout(400);
    await doubleTap();
    await expect.poll(() => photo.evaluate((img: HTMLElement): string => img.style.transform)).toContain("scale(1)");
  });
});
