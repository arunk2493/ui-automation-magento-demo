// playwright.config.ts
import { type PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  reporter: [
    ['line'], 
    ['allure-playwright']
  ],
  use: {
    baseURL: 'https://magento.softwaretestingboard.com/',
    video: 'retain-on-failure',
    contextOptions: {
      recordVideo: {
        dir: './videosAll' // Or wherever you want the videos to be saved.
      }
    },
    browserName:'chromium',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
};
export default config;