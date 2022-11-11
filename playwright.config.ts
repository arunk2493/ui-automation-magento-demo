import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['line'], 
    ['allure-playwright']
  ],
  /* Shared settings for all the projects below.  */
  use: {
    channel: 'chrome',
    headless:false,
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Collect trace when retrying the failed test. */
    trace: 'on-first-retry',
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
};

export default config;
