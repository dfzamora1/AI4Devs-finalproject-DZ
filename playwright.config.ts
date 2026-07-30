import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  use: { baseURL: 'http://127.0.0.1:5173', trace: 'on-first-retry' },
  webServer: [
    { command: 'npm run dev:backend', url: 'http://127.0.0.1:3000/health', reuseExistingServer: true },
    { command: 'npm run dev -w frontend -- --host 127.0.0.1', url: 'http://127.0.0.1:5173', reuseExistingServer: true }
  ]
});
