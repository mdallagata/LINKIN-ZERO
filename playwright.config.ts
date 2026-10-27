import { defineConfig, devices } from "@playwright/test";

const PORT: number = 3100;

// Los tests corren contra el sitio exportado (`pnpm build` primero), servido
// igual que en Cloudflare. En la máquina usan el Chrome instalado; en el CI, el
// Chromium de Playwright (`pnpm exec playwright install chromium`).
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  // Pocos workers: en la máquina de desarrollo no tiene que trabar nada.
  workers: 2,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    channel: process.env.CI ? undefined : "chrome",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "escritorio", use: { ...devices["Desktop Chrome"] } },
    { name: "celular", use: { ...devices["Pixel 7"] }, testIgnore: /data\.spec/ },
  ],
  webServer: {
    command: `node tests/serve.mjs ${PORT}`,
    port: PORT,
    reuseExistingServer: !process.env.CI,
  },
});
