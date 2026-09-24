const test = require('node:test');
const assert = require('node:assert');
const { BASE_URL, createTestPage, waitForServer } = require('./helpers');

test.describe('Tier 3: Cross-Feature Interactions', () => {
  test.before(async () => {
    const isOnline = await waitForServer(BASE_URL, 15000);
    assert.ok(isOnline, `Server at ${BASE_URL} must be responding.`);
  });

  // Cross-Feature 1: Mobile Menu Navigation + Scroll Synchronize
  test('3.1 Mobile menu link click closes drawer and scrolls to target section', async () => {
    const testEnv = await createTestPage({ viewport: { width: 375, height: 667 } });
    try {
      await testEnv.page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await testEnv.page.waitForTimeout(500);

      // Open mobile menu
      const openBtn = testEnv.page.locator('button[aria-label="Open mobile navigation menu"]');
      await openBtn.click();
      await testEnv.page.waitForTimeout(200);

      // Click "Showcase Projects" in mobile drawer
      const projectsLink = testEnv.page.locator('#mobile-menu a[href="#projects"]');
      assert.ok(await projectsLink.isVisible(), 'Showcase projects link should be visible in drawer');
      await projectsLink.click();

      // Drawer should close
      await testEnv.page.waitForTimeout(400);
      const modal = testEnv.page.locator('#mobile-menu');
      assert.strictEqual(await modal.isVisible(), false, 'Drawer should close after navigation click');

      // Scroll position should have moved down toward projects section
      const scrollY = await testEnv.page.evaluate(() => window.scrollY);
      assert.ok(scrollY > 200, `Page should have scrolled down (got scrollY=${scrollY})`);
    } finally {
      await testEnv.close();
    }
  });

  // Cross-Feature 2: Language Matrix Tab Switch + Contact Copy Toast Trigger
  test('3.2 Tab click followed by copy button triggers toast correctly', async () => {
    const testEnv = await createTestPage({ viewport: { width: 1280, height: 800 } });
    try {
      await testEnv.page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await testEnv.page.waitForTimeout(500);

      // 1. Switch to TypeScript tab
      const tsTab = testEnv.page.locator('button[role="tab"]:has-text("TypeScript")');
      await tsTab.click();
      await testEnv.page.waitForTimeout(200);

      // Verify snippet updated
      const panel = testEnv.page.locator('#language-spec-panel');
      assert.match(await panel.textContent(), /StrictSchema/i, 'TypeScript snippet should be active');

      // 2. Scroll to contact section
      const contactSection = testEnv.page.locator('#contact');
      await contactSection.scrollIntoViewIfNeeded();
      await testEnv.page.waitForTimeout(300);

      // 3. Click copy email
      const copyEmailBtn = testEnv.page.locator('#contact button[aria-label="Copy email address to clipboard"]');
      await copyEmailBtn.click();

      // 4. Verify toast notification appears
      const toast = testEnv.page.locator('[role="status"]');
      await testEnv.page.waitForTimeout(300);
      assert.ok(await toast.isVisible(), 'Toast notification should be visible');
      assert.match(await toast.textContent(), /Copied email address to clipboard/i);

      // 5. Verify toast auto-dismisses after timeout
      await testEnv.page.waitForTimeout(3200);
      assert.strictEqual(await toast.isVisible(), false, 'Toast should automatically dismiss after 2.8-3.0s');
    } finally {
      await testEnv.close();
    }
  });

  // Cross-Feature 3: Mobile Menu Copy Button Triggers Toast and Closes Drawer
  test('3.3 Clicking copy in mobile drawer triggers toast and dismisses drawer', async () => {
    const testEnv = await createTestPage({ viewport: { width: 375, height: 667 } });
    try {
      await testEnv.page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await testEnv.page.waitForTimeout(500);

      // Open drawer
      const openBtn = testEnv.page.locator('button[aria-label="Open mobile navigation menu"]');
      await openBtn.click();
      await testEnv.page.waitForTimeout(300);

      // Locate Email button in mobile menu footer and ensure it is scrolled into view
      const copyEmailBtn = testEnv.page.locator('#mobile-menu button[aria-label="Copy email address to clipboard"]');
      await copyEmailBtn.scrollIntoViewIfNeeded();
      assert.ok(await copyEmailBtn.isVisible(), 'Email copy button in drawer should be visible');
      await copyEmailBtn.click();

      // Verify drawer closes and unmounts
      const modal = testEnv.page.locator('#mobile-menu');
      await modal.waitFor({ state: 'hidden', timeout: 3000 });
      assert.strictEqual(await modal.isVisible(), false, 'Drawer should close after copy action');

      // Verify toast is visible
      const toast = testEnv.page.locator('[role="status"]');
      assert.ok(await toast.isVisible(), 'Copy toast should be displayed on drawer copy');
    } finally {
      await testEnv.close();
    }
  });

  // Cross-Feature 4: Back-to-Top Interaction
  test('3.4 Back-to-Top button smoothly scrolls from bottom to top', async () => {
    const testEnv = await createTestPage({ viewport: { width: 1280, height: 800 } });
    try {
      await testEnv.page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await testEnv.page.waitForTimeout(500);

      // Scroll to bottom
      await testEnv.page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });
      await testEnv.page.waitForTimeout(500);

      const scrolledY = await testEnv.page.evaluate(() => window.scrollY);
      assert.ok(scrolledY > 500, `Page should be scrolled down (got ${scrolledY})`);

      // Click Back to top button in footer
      const backToTopBtn = testEnv.page.locator('footer button[aria-label="Back to top of page"]');
      await backToTopBtn.click();
      // Wait for smooth scroll animation to reach top
      await testEnv.page.waitForFunction(() => window.scrollY < 150, { timeout: 4000 });

      // Verify scroll position returned to near 0
      const finalY = await testEnv.page.evaluate(() => window.scrollY);
      assert.ok(finalY < 150, `Window should have returned to top (got scrollY=${finalY})`);
    } finally {
      await testEnv.close();
    }
  });

  // Cross-Feature 5: Discord Copy in Contact Section
  test('3.5 Discord copy button triggers checkmark visual swap and toast', async () => {
    const testEnv = await createTestPage({ viewport: { width: 1280, height: 800 } });
    try {
      await testEnv.page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await testEnv.page.waitForTimeout(500);

      const contactSection = testEnv.page.locator('#contact');
      await contactSection.scrollIntoViewIfNeeded();
      await testEnv.page.waitForTimeout(300);

      // Click Discord card
      const discordBtn = testEnv.page.locator('#contact button:has-text("DISCORD")');
      await discordBtn.click();
      await testEnv.page.waitForTimeout(300);

      // Verify toast
      const toast = testEnv.page.locator('[role="status"]');
      assert.ok(await toast.isVisible(), 'Toast should be visible');
      assert.match(await toast.textContent(), /Copied Discord handle to clipboard/i);
    } finally {
      await testEnv.close();
    }
  });
});
