// playwright.config.ts
import { type PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 40 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     */
    timeout: 5000
  },
  reporter: [
    ['line'], 
    ['allure-playwright']
  ],
  use: {
    headless:false,
    baseURL: 'https://magento.softwaretestingboard.com/',
    video: 'retain-on-failure',
    contextOptions: {
      recordVideo: {
        dir: './videosAll' // Or wherever you want the videos to be saved.
      }
    },
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }
  ],
};
export default config;