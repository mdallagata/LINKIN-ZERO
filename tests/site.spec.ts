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
  { path: "/", title: "LINKIN ZERØ", h1: "LINKIN ZERØ", canonical: "https://linkinzero.hyan.dev" },
  { path: "/members", title: "Integrantes — LINKIN ZERØ", h1: "Integrantes", canonical: "https://linkinzero.hyan.dev/members" },
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
  await nav.getByRole("link", { name: "Integrantes" }).click();
  await expect(page).toHaveURL(/\/members$/);
  await expect(nav.getByRole("link", { name: "Integrantes" })).toHaveAttribute("aria-current", "page");
});

test("Contratar, desde otra página, lleva a la sección de contrataciones de la home", async ({ page, isMobile }) => {
  test.skip(isMobile, "en celular Contratar está en la barra fija de abajo");
  await page.goto("/shows");
  await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Contratar" }).click();
  await expect(page).toHaveURL(/\/#contacto$/);
  await expect(page.locator("#contacto")).toBeInViewport();
});

test("en celular, Contratar por WhatsApp queda siempre a mano", async ({ page, isMobile }) => {
  test.skip(!isMobile, "solo en celular");
  await page.goto("/shows");
  await scrollToBottom(page);
  const booking: Locator = page.getByRole("link", { name: "Contratar por WhatsApp" });
  await expect(booking).toBeInViewport();
  await expect(booking).toHaveAttribute("href", /^https:\/\/wa\.me\//);
});

test("Fechas: la fila de un show lleva a ese show en /shows, y Fotos abre la galería sin salir de la home", async ({ page }) => {
  await page.goto("/");
  const row: Locator = page
    .locator("#fechas li")
    .filter({ has: page.getByRole("button", { name: /fotos/ }) })
    .first();

  // El botón de fotos queda por encima del link que cubre la fila.
  await row.getByRole("button", { name: /fotos/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
  await page.keyboard.press("Escape");

  // Cualquier parte de la fila (acá, la esquina de la fecha) sigue el link del título.
  const href: string = (await row.getByRole("link").first().getAttribute("href")) ?? "";
  expect(href).toMatch(/^\/shows#/);
  await row.click({ position: { x: 8, y: 8 } });
  await expect(page).toHaveURL(new RegExp(`${href}$`));
  await expect(page.locator(`[id="${href.split("#")[1]}"]`)).toBeInViewport();
});

test("galería: abre en la foto elegida, se navega con las flechas y se cierra con Esc", async ({ page }) => {
  await page.goto("/shows");
  const thumb: Locator = page.getByRole("button", { name: "Ver foto 2" }).first();
  await thumb.click();

  const dialog: Locator = page.getByRole("dialog");
  const photo: Locator = dialog.getByRole("img");
  await expect(dialog).toBeVisible();
  await expect(photo).toHaveAttribute("alt", /Foto 2$/);
  await expect(dialog.getByText(/^2 \/ \d+$/)).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(photo).toHaveAttribute("alt", /Foto 3$/);
  await expect(dialog.getByText(/^3 \/ \d+$/)).toBeVisible();

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

test("zoom: un click acerca la foto, se arrastra, otro click la deja entera y al cerrar el modal se resetea", async ({ page, isMobile }) => {
  test.skip(isMobile, "con el dedo es doble toque: lo prueba el test de celular");
  await page.goto("/");
  const trigger: Locator = page.getByRole("button", { name: /^Ver imagen completa/ });
  await trigger.click();
  const dialog: Locator = page.getByRole("dialog");
  const photo: Locator = dialog.getByRole("img");
  const transform = (): Promise<string> => photo.evaluate((img: HTMLElement): string => img.style.transform);
  const box = await photo.boundingBox();
  if (!box) throw new Error("la foto no tiene tamaño");
  const [x, y]: [number, number] = [box.x + box.width / 2, box.y + box.height / 2];

  await page.mouse.click(x, y);
  await expect.poll(transform).toContain("scale(2.5)");
  const zoomed: string = await transform();
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 120, y + 60, { steps: 5 });
  await page.mouse.up();
  await expect.poll(transform).not.toBe(zoomed);
  await page.mouse.click(x, y);
  await expect.poll(transform).toContain("scale(1)");

  // El botón de la esquina hace lo mismo; al cerrar y volver a abrir, la foto se ve entera.
  await dialog.getByRole("button", { name: "Acercar la foto" }).click();
  await expect.poll(transform).toContain("scale(2.5)");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await trigger.click();
  await expect.poll(transform).toContain("scale(1)");
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
