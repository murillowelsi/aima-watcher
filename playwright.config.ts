import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './scripts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://portal-renovacoes.aima.gov.pt',
    locale: 'pt-PT',
    geolocation: { latitude: 39.3999, longitude: -8.2245 }, // Portugal (center coordinates)
    permissions: ['geolocation'],
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
