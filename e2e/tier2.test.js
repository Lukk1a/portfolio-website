const test = require('node:test');
const assert = require('node:assert');
const { BASE_URL, createTestPage, waitForServer } = require('./helpers');

test.describe('Tier 2: Boundary & Corner Cases', () => {
  test.before(async () => {
    const isOnline = await waitForServer(BASE_URL, 15000);
    assert.ok(isOnline, `Server at ${BASE_URL} must be responding.`);
  });

  // Boundary 1: Extreme Viewport - Ultra-Narrow 320px
  test('2.1 Ultra-narrow 320px viewport renders with zero horizontal overflow', async () => {
    const testEnv = await createTestPage({ viewport: { width: 320, height: 568 } });
    try {
      await testEnv.page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await testEnv.page.waitForTimeout(500);

      const overflow = await testEnv.page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      assert.strictEqual(overflow, false, 'No horizontal overflow allowed at 320px');

      const heroHeading = testEnv.page.locator('#hero h1');
      assert.ok(await heroHeading.isVisible(), 'Hero heading should be visible even at 320px');
    } finally {
      await testEnv.close();
    }
  });

  // Boundary 2: Extreme Viewport - Ultra-Wide 2560px (4K / Ultrawide)
  test('2.2 Ultra-wide 2560px viewport maintains centered content bounds', async () => {
    const testEnv = await createTestPage({ viewport: { width: 2560, height: 1440 } });
    try {
      await testEnv.page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await testEnv.page.waitForTimeout(500);

      const overflow = await testEnv.page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      assert.strictEqual(overflow, false, 'No horizontal overflow allowed at 2560px');

      // Max width container check: hero section should not stretch unboundedly to 2560px
      const heroWidth = await testEnv.page.evaluate(() => {
        const hero = document.getElementById('hero');
        return hero ? hero.getBoundingClientRect().width : 0;
      });
      assert.ok(heroWidth <= 1200, `Hero width should respect max-w constraints (got ${heroWidth}px)`);
    } finally {
      await testEnv.close();
    }
  });

  // Boundary 3: Long String and Code Snippet Containment
  test('2.3 Monospace code snippets do not break container boundaries', async () => {
    const testEnv = await createTestPage({ viewport: { width: 375, height: 667 } });
    try {
      await testEnv.page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await testEnv.page.waitForTimeout(500);

      const codeSnippetsBounded = await testEnv.page.evaluate(() => {
        const clientWidth = document.documentElement.clientWidth;
        const codeElements = document.querySelectorAll('code, pre');
        let allBounded = true;
        codeElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.right > clientWidth + 1) {
            allBounded = false;
          }
        });
        return allBounded;
      });

      assert.strictEqual(codeSnippetsBounded, true, 'All code snippets must be safely contained within clientWidth');
    } finally {
      await testEnv.close();
    }
  });

  // Boundary 4: Rapid Tab Switching Stress
  test('2.4 Rapid consecutive language tab clicks do not corrupt state or crash', async () => {
    const testEnv = await createTestPage({ viewport: { width: 1280, height: 800 } });
    try {
      await testEnv.page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await testEnv.page.waitForTimeout(500);

      const languages = ['Python', 'TypeScript', 'Luau', 'JavaScript', 'C++', 'Python', 'Luau'];
      for (const lang of languages) {
        const tab = testEnv.page.locator(`button[role="tab"]:has-text("${lang}")`);
        await tab.click();
        // rapid switch with minimal delay
        await testEnv.page.waitForTimeout(50);
      }

      // Allow animations to settle
      await testEnv.page.waitForTimeout(400);

      // Verify final active tab is Luau
      const activeTab = testEnv.page.locator('button[role="tab"]:has-text("Luau")');
      const isSelected = await activeTab.getAttribute('aria-selected');
      assert.strictEqual(isSelected, 'true', 'Final active tab should be Luau');

      const snippetPanel = testEnv.page.locator('#language-spec-panel');
      const text = await snippetPanel.textContent();
      assert.match(text, /Replicator:delta_sync/i, 'Snippet should match the final selected language');

      // Check zero unhandled page errors
      assert.strictEqual(testEnv.pageErrors.length, 0, 'No runtime page errors during rapid tab switching');
    } finally {
      await testEnv.close();
    }
  });

  // Boundary 5: Rapid Copy Button Clicking (Debounce & State Stability)
  test('2.5 Rapid repeated clicks on copy button do not throw or duplicate unhandled toasts', async () => {
    const testEnv = await createTestPage({ viewport: { width: 1280, height: 800 } });
    try {
      await testEnv.page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await testEnv.page.waitForTimeout(500);

      const copyEmailBtn = testEnv.page.locator('#contact button[aria-label="Copy email address to clipboard"]');
      // Rapid clicks 5 times
      for (let i = 0; i < 5; i++) {
        await copyEmailBtn.click();
        await testEnv.page.waitForTimeout(40);
      }

      await testEnv.page.waitForTimeout(300);

      // Toast must still be present and readable
      const toast = testEnv.page.locator('[role="status"]');
      assert.ok(await toast.isVisible(), 'Copy toast should remain visible');
      assert.strictEqual(testEnv.pageErrors.length, 0, 'No errors during rapid copy clicks');
    } finally {
      await testEnv.close();
    }
  });

  // Boundary 6: Rapid Mobile Menu Toggle Cycling
  test('2.6 Rapid mobile menu open/close cycling settles cleanly', async () => {
    const testEnv = await createTestPage({ viewport: { width: 375, height: 667 } });
    try {
      await testEnv.page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await testEnv.page.waitForTimeout(500);

      const openBtn = testEnv.page.locator('button[aria-label="Open mobile navigation menu"]');

      // Cycle 1: Open
      await openBtn.click();
      await testEnv.page.waitForTimeout(100);
      const closeBtn = testEnv.page.locator('button[aria-label="Close menu"]');
      await closeBtn.click();
      await testEnv.page.waitForTimeout(100);

      // Cycle 2: Open again
      await openBtn.click();
      await testEnv.page.waitForTimeout(150);

      // Modal should be visible
      const modal = testEnv.page.locator('#mobile-menu');
      assert.ok(await modal.isVisible(), 'Mobile menu should be open');

      // Close it
      await closeBtn.click();
      await testEnv.page.waitForTimeout(300);
      assert.strictEqual(await modal.isVisible(), false, 'Mobile menu should be cleanly closed');
    } finally {
      await testEnv.close();
    }
  });

  // Boundary 7: Keyboard Navigation - Tablist Arrow Keys
  test('2.7 ArrowRight and ArrowLeft keys cycle through language tabs in matrix', async () => {
    const testEnv = await createTestPage({ viewport: { width: 1280, height: 800 } });
    try {
      await testEnv.page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await testEnv.page.waitForTimeout(500);

      // Focus first tab (C++)
      const cppTab = testEnv.page.locator('button[role="tab"]:has-text("C++")');
      await cppTab.focus();

      // Press ArrowRight -> should focus and select Python
      await testEnv.page.keyboard.press('ArrowRight');
      await testEnv.page.waitForTimeout(200);

      const pyTab = testEnv.page.locator('button[role="tab"]:has-text("Python")');
      assert.strictEqual(await pyTab.getAttribute('aria-selected'), 'true', 'ArrowRight should select Python');

      // Press ArrowLeft -> should wrap back to C++
      await testEnv.page.keyboard.press('ArrowLeft');
      await testEnv.page.waitForTimeout(200);
      assert.strictEqual(await cppTab.getAttribute('aria-selected'), 'true', 'ArrowLeft should select C++');
    } finally {
      await testEnv.close();
    }
  });

  // Boundary 8: Modal Escape Key
  test('2.8 Pressing Escape key closes the mobile menu', async () => {
    const testEnv = await createTestPage({ viewport: { width: 375, height: 667 } });
    try {
      await testEnv.page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await testEnv.page.waitForTimeout(500);

      const openBtn = testEnv.page.locator('button[aria-label="Open mobile navigation menu"]');
      await openBtn.click();
      await testEnv.page.waitForTimeout(200);

      const modal = testEnv.page.locator('#mobile-menu');
      assert.ok(await modal.isVisible(), 'Mobile menu should be open');

      // Press Escape
      await testEnv.page.keyboard.press('Escape');
      await testEnv.page.waitForTimeout(300);

      assert.strictEqual(await modal.isVisible(), false, 'Escape key should close the mobile menu');
    } finally {
      await testEnv.close();
    }
  });

  // Boundary 9: Prefers-Reduced-Motion Media Emulation
  test('2.9 Prefers-reduced-motion emulation renders without animation stalls', async () => {
    const testEnv = await createTestPage({
      viewport: { width: 1280, height: 800 },
      contextOptions: {
        forcedColors: 'none',
        reducedMotion: 'reduce',
      },
    });
    try {
      await testEnv.page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await testEnv.page.waitForTimeout(300);

      // Verify all sections are visible immediately
      const hero = testEnv.page.locator('#hero');
      const skills = testEnv.page.locator('#skills');
      const about = testEnv.page.locator('#about');

      assert.ok(await hero.isVisible(), 'Hero visible under reduced-motion');
      assert.ok(await skills.isVisible(), 'Skills visible under reduced-motion');
      assert.ok(await about.isVisible(), 'About visible under reduced-motion');
    } finally {
      await testEnv.close();
    }
  });
});
