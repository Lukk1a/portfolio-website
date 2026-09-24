const { chromium } = require('playwright');
const http = require('http');

const BASE_URL = process.env.BASE_URL || process.env.TEST_URL || 'http://localhost:3000';

/**
 * Polls the target server until it responds or timeout is reached.
 */
async function waitForServer(url = BASE_URL, timeoutMs = 25000) {
  const startTime = Date.now();
  const parsed = new URL(url);

  while (Date.now() - startTime < timeoutMs) {
    const isReady = await new Promise((resolve) => {
      const req = http.request(
        {
          hostname: parsed.hostname === 'localhost' ? '127.0.0.1' : parsed.hostname,
          port: parsed.port || 80,
          path: '/',
          method: 'GET',
          timeout: 4000,
        },
        (res) => {
          res.resume();
          resolve(res.statusCode < 500);
        }
      );
      req.on('error', () => resolve(false));
      req.on('timeout', () => {
        req.destroy();
        resolve(false);
      });
      req.end();
    });

    if (isReady) return true;
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

/**
 * Creates a browser and page instance with console error tracking.
 */
async function createTestPage(options = {}) {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const context = await browser.newContext({
    viewport: options.viewport || { width: 1280, height: 800 },
    permissions: ['clipboard-read', 'clipboard-write'],
    ...options.contextOptions,
  });

  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err.message);
  });

  return {
    browser,
    context,
    page,
    consoleErrors,
    pageErrors,
    close: async () => {
      await context.close();
      await browser.close();
    },
  };
}

/**
 * Helper to smoothly scroll page to bottom and back
 */
async function scrollFullPage(page) {
  await page.evaluate(async () => {
    const distance = 400;
    const delay = 40;
    while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
      document.scrollingElement.scrollBy(0, distance);
      await new Promise((r) => setTimeout(r, delay));
    }
    document.scrollingElement.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 100));
  });
}

module.exports = {
  BASE_URL,
  waitForServer,
  createTestPage,
  scrollFullPage,
};
