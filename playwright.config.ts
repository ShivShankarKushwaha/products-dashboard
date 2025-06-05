import { devices, type PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  webServer: {
    command: "bun run build && bun run preview",
    port: 4173,
  },
  testDir: "tests/e2e",
  fullyParallel: true,
  retries: 2,
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  projects: [
    {
      name: "setup",
      testMatch: /global\.setup\.ts/,
    },
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
};

export default config;
