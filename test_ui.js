const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');

/**
 * Hardened Multi-Viewport Zero Horizontal Overflow & UI Verification Test
 * 
 * Tests across 6 standard viewports:
 * - 375px, 390px, 768px, 1024px, 1280px, 1440px
 * 
 * Verifies:
 * 1. document.documentElement.scrollWidth <= document.documentElement.clientWidth
 * 2. Element-level boundary check: boundingClientRect.right <= clientWidth + 1
 * 3. Saves screenshots to .agents/test-results/ui-test-[viewport].png (NEVER touches screenshot.png in root)
 * 4. Sets process.exitCode = 1 on ANY failure.
 */

const BASE_URL = process.env.BASE_URL || process.env.TEST_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.resolve(__dirname, '.agents', 'test-results');

const VIEWPORTS = [
  { name: '375px', width: 375, height: 667, device: 'Mobile Small (375px)' },
  { name: '390px', width: 390, height: 844, device: 'Mobile Standard (390px)' },
  { name: '768px', width: 768, height: 1024, device: 'Tablet Portrait (768px)' },
  { name: '1024px', width: 1024, height: 768, device: 'Tablet Landscape / Small Desktop (1024px)' },
  { name: '1280px', width: 1280, height: 800, device: 'Desktop HD (1280px)' },
  { name: '1440px', width: 1440, height: 900, device: 'Desktop Wide (1440px)' },
];

// Helper to poll for server availability before running tests
async function waitForServer(url, timeoutMs = 25000) {
  const startTime = Date.now();
  const parsed = new URL(url);

  while (Date.now() - startTime < timeoutMs) {
    const isReady = await new Promise((resolve) => {
      const req = http.request(
        {
          hostname: parsed.hostname,
          port: parsed.port || 80,
          path: '/',
          method: 'GET',
          timeout: 4000,
        },
        (res) => {
          res.resume();
          // Accept 200-399 (server is listening and responding)
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

(async () => {
  console.log('='.repeat(70));
  console.log('HARDENED MULTI-VIEWPORT UI & OVERFLOW TEST HARNESS');
  console.log(`Target URL: ${BASE_URL}`);
  console.log(`Output Directory: ${OUTPUT_DIR}`);
  console.log('='.repeat(70));

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Created output directory: ${OUTPUT_DIR}`);
  }

  // Pre-test safety assertion: verify reference screenshot.png in root is preserved
  const rootScreenshot = path.resolve(__dirname, 'screenshot.png');
  let initialRootSize = null;
  if (fs.existsSync(rootScreenshot)) {
    initialRootSize = fs.statSync(rootScreenshot).size;
    console.log(`Root reference screenshot verified: ${initialRootSize} bytes (will not be modified).`);
  }

  console.log('\nChecking target server readiness...');
  let serverReady = await waitForServer(BASE_URL, 3000);
  let devProcess = null;

  if (!serverReady) {
    console.log(`Server not detected at ${BASE_URL}. Auto-starting Next.js dev server...`);
    devProcess = require('child_process').spawn('npm', ['run', 'dev'], {
      shell: true,
      stdio: 'pipe',
      cwd: __dirname,
      env: { ...process.env, PORT: '3000' },
    });

    console.log('Waiting for dev server to initialize...');
    serverReady = await waitForServer(BASE_URL, 35000);
    if (!serverReady) {
      console.error(`\n[FATAL] Server at ${BASE_URL} is not responding.`);
      console.error('Please ensure the development server is running ("npm run dev" or "npm start").');
      if (devProcess) devProcess.kill();
      process.exitCode = 1;
      process.exit(1);
    }
  }
  console.log('Server is online and responding.\n');

  let browser;
  let anyFailure = false;
  const results = [];

  try {
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    for (const vp of VIEWPORTS) {
      console.log(`-`.repeat(70));
      console.log(`Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) - ${vp.device}`);

      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
      });

      const pageErrors = [];
      page.on('pageerror', (err) => {
        if (err.message && (err.message.includes('[turbopack]') || err.message.includes('hmr-client'))) {
          return;
        }
        pageErrors.push(err.message);
      });

      try {
        await page.goto(BASE_URL, {
          waitUntil: 'networkidle',
          timeout: 30000,
        });

        // Allow micro-animations and layouts to settle
        await page.waitForTimeout(1000);

        // Scroll through the page to trigger all in-view transitions, then scroll back to top
        await page.evaluate(async () => {
          const distance = 400;
          const delay = 50;
          while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
            document.scrollingElement.scrollBy(0, distance);
            await new Promise((r) => setTimeout(r, delay));
          }
          document.scrollingElement.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 200));
        });

        // 1. Root Level Horizontal Overflow Check
        const rootMetrics = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const clientWidth = docEl.clientWidth;
          const docScrollWidth = docEl.scrollWidth;
          const bodyScrollWidth = body ? body.scrollWidth : 0;
          const scrollWidth = Math.max(docScrollWidth, bodyScrollWidth);

          return {
            clientWidth,
            scrollWidth,
            docScrollWidth,
            bodyScrollWidth,
            hasDocOverflow: scrollWidth > clientWidth,
          };
        });

        // 2. Element-Level Boundary Check
        const elementReport = await page.evaluate(() => {
          const clientWidth = document.documentElement.clientWidth;
          const failingElements = [];
          const allElements = document.querySelectorAll('*');

          for (const el of allElements) {
            // Skip detached or non-rendered elements
            if (!el.isConnected) continue;
            const style = window.getComputedStyle(el);
            if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
              continue;
            }

            const rect = el.getBoundingClientRect();
            // Ignore zero-dimension elements
            if (rect.width === 0 && rect.height === 0) continue;

            // Element boundary condition: right > clientWidth + 1
            if (rect.right > clientWidth + 1) {
              // Construct human-readable unique CSS selector
              let selector = el.tagName.toLowerCase();
              if (el.id) {
                selector = `#${el.id}`;
              } else if (el.className && typeof el.className === 'string') {
                const classList = el.className
                  .trim()
                  .split(/\s+/)
                  .filter((c) => c && !c.includes(':') && !c.includes('[') && !c.includes('/'))
                  .slice(0, 3);
                if (classList.length > 0) {
                  selector += '.' + classList.join('.');
                }
              }

              const ariaLabel = el.getAttribute('aria-label');
              const innerTextPreview = (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40);

              failingElements.push({
                selector,
                tagName: el.tagName.toLowerCase(),
                id: el.id || null,
                ariaLabel: ariaLabel || null,
                textPreview: innerTextPreview || null,
                coordinates: {
                  left: Math.round(rect.left * 100) / 100,
                  right: Math.round(rect.right * 100) / 100,
                  width: Math.round(rect.width * 100) / 100,
                  top: Math.round(rect.top * 100) / 100,
                  bottom: Math.round(rect.bottom * 100) / 100,
                  excess: Math.round((rect.right - clientWidth) * 100) / 100,
                },
              });
            }
          }

          return {
            failingCount: failingElements.length,
            failingElements,
          };
        });

        // 3. Save Screenshot safely to .agents/test-results/ui-test-[viewport].png
        const screenshotFilename = `ui-test-${vp.name}.png`;
        const screenshotPath = path.join(OUTPUT_DIR, screenshotFilename);
        await page.screenshot({ path: screenshotPath, fullPage: true });

        // Also save alternate name without 'px' (e.g. ui-test-375.png) for maximum tooling compatibility
        const numericWidth = vp.width.toString();
        const altScreenshotPath = path.join(OUTPUT_DIR, `ui-test-${numericWidth}.png`);
        try {
          fs.copyFileSync(screenshotPath, altScreenshotPath);
        } catch (_) {}

        console.log(`[Screenshot Saved] -> ${screenshotPath}`);

        // Evaluate results for this viewport
        const hasOverflow = rootMetrics.hasDocOverflow || elementReport.failingCount > 0;
        const hasRuntimeErrors = pageErrors.length > 0;

        if (hasOverflow || hasRuntimeErrors) {
          anyFailure = true;
          console.error(`[FAIL] Overflow or errors detected at ${vp.name}!`);
          console.error(`  - clientWidth: ${rootMetrics.clientWidth}px`);
          console.error(`  - scrollWidth: ${rootMetrics.scrollWidth}px (excess: ${rootMetrics.scrollWidth - rootMetrics.clientWidth}px)`);

          if (elementReport.failingCount > 0) {
            console.error(`  - Offending elements count: ${elementReport.failingCount}`);
            console.error(`  - Failing element details (first 5):`);
            elementReport.failingElements.slice(0, 5).forEach((item, idx) => {
              console.error(`    ${idx + 1}. Selector: <${item.selector}> | Tag: <${item.tagName}>`);
              if (item.id) console.error(`       ID: #${item.id}`);
              if (item.ariaLabel) console.error(`       Aria-Label: "${item.ariaLabel}"`);
              if (item.textPreview) console.error(`       Text: "${item.textPreview}"`);
              console.error(`       Coordinates: left=${item.coordinates.left}, right=${item.coordinates.right}, width=${item.coordinates.width}, excess=+${item.coordinates.excess}px`);
            });
          }

          if (hasRuntimeErrors) {
            console.error(`  - Page runtime errors (${pageErrors.length}):`);
            pageErrors.forEach((e) => console.error(`      * ${e}`));
          }

          results.push({
            viewport: vp.name,
            status: 'FAIL',
            clientWidth: rootMetrics.clientWidth,
            scrollWidth: rootMetrics.scrollWidth,
            failingElements: elementReport.failingCount,
            errors: pageErrors,
          });
        } else {
          console.log(`[PASS] Zero horizontal overflow verified at ${vp.name}.`);
          console.log(`  - clientWidth: ${rootMetrics.clientWidth}px, scrollWidth: ${rootMetrics.scrollWidth}px`);
          console.log(`  - All elements bounded within viewport (0 elements exceeding clientWidth + 1).`);

          results.push({
            viewport: vp.name,
            status: 'PASS',
            clientWidth: rootMetrics.clientWidth,
            scrollWidth: rootMetrics.scrollWidth,
            failingElements: 0,
            errors: [],
          });
        }
      } catch (navError) {
        anyFailure = true;
        console.error(`[ERROR] Failed to test viewport ${vp.name}:`, navError.message);
        results.push({
          viewport: vp.name,
          status: 'ERROR',
          message: navError.message,
        });
      } finally {
        await page.close();
      }
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  // Post-test safety assertion: verify root reference screenshot was NEVER touched
  if (fs.existsSync(rootScreenshot) && initialRootSize !== null) {
    const finalRootSize = fs.statSync(rootScreenshot).size;
    if (finalRootSize !== initialRootSize) {
      console.error(`\n[CRITICAL ERROR] Root screenshot.png was modified! (Initial: ${initialRootSize}, Final: ${finalRootSize})`);
      anyFailure = true;
    } else {
      console.log(`\n[Integrity Verified] Root screenshot.png remained completely untouched (${finalRootSize} bytes).`);
    }
  }

  // Summary Table
  console.log('\n' + '='.repeat(70));
  console.log('VIEWPORT VERIFICATION SUMMARY');
  console.log('='.repeat(70));
  console.table(
    results.map((r) => ({
      Viewport: r.viewport,
      Status: r.status,
      ClientWidth: r.clientWidth !== undefined ? `${r.clientWidth}px` : 'N/A',
      ScrollWidth: r.scrollWidth !== undefined ? `${r.scrollWidth}px` : 'N/A',
      Overflow: r.scrollWidth > r.clientWidth ? `+${r.scrollWidth - r.clientWidth}px` : '0px',
      'Element Violations': r.failingElements !== undefined ? r.failingElements : 'N/A',
    }))
  );

  if (devProcess) {
    console.log('\nStopping auto-started dev server...');
    devProcess.kill('SIGTERM');
    try {
      require('child_process').execSync('powershell -Command "Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue).OwningProcess -Force -ErrorAction SilentlyContinue"');
    } catch (_) {}
  }

  if (anyFailure) {
    console.error('\n❌ TEST RUN FAILED: Horizontal overflow or element boundary violations detected.');
    process.exitCode = 1;
    process.exit(1);
  } else {
    console.log('\n✅ ALL 6 VIEWPORTS PASSED: Zero horizontal overflow confirmed across all form factors.');
    process.exitCode = 0;
    process.exit(0);
  }
})();
