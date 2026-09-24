const test = require('node:test');
const assert = require('node:assert');
const { BASE_URL, createTestPage, waitForServer } = require('./helpers');

test.describe('Tier 4: Real-World User Scenario', () => {
  test.before(async () => {
    const isOnline = await waitForServer(BASE_URL, 15000);
    assert.ok(isOnline, `Server at ${BASE_URL} must be responding.`);
  });

  test('4.1 Complete end-to-end recruiter / engineering evaluator user journey', async () => {
    const testEnv = await createTestPage({ viewport: { width: 1440, height: 900 } });
    const { page, pageErrors, consoleErrors } = testEnv;

    try {
      console.log('  [Journey Step 1] Recruiter visits portfolio homepage');
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(600);

      // Verify page title and header
      const pageTitle = await page.title();
      assert.ok(pageTitle.length > 0, 'Page must have a non-empty document title');

      const heroHeading = page.locator('#hero h1');
      assert.ok(await heroHeading.isVisible(), 'Hero heading must be immediately visible');
      const headlineText = await heroHeading.textContent();
      assert.match(headlineText, /Luka Pajkanovic/i, 'Headline must match portfolio author');

      console.log('  [Journey Step 2] Visitor clicks "VIEW ARCHITECTURE" CTA');
      const ctaBtn = page.locator('#hero a[href="#skills"]');
      await ctaBtn.click();
      await page.waitForTimeout(800);

      // Verify page scrolled to #skills section
      const skillsSection = page.locator('#skills');
      assert.ok(await skillsSection.isVisible(), 'Skills section should be reached');

      console.log('  [Journey Step 3] Visitor explores Interactive Language Matrix');
      // Step through languages: C++ -> Python -> TypeScript -> Luau
      const panel = page.locator('#language-spec-panel');

      // Click C++
      const cppTab = page.locator('button[role="tab"]:has-text("C++")');
      await cppTab.click();
      await page.waitForTimeout(300);
      assert.match(await panel.textContent(), /LinearArena::alloc/i, 'Should display C++ alloc code');

      // Click Python
      const pythonTab = page.locator('button[role="tab"]:has-text("Python")');
      await pythonTab.click();
      await page.waitForTimeout(300);
      assert.match(await panel.textContent(), /stream\.consume/i, 'Should switch to Python snippet');

      // Click TypeScript
      const tsTab = page.locator('button[role="tab"]:has-text("TypeScript")');
      await tsTab.click();
      await page.waitForTimeout(300);
      assert.match(await panel.textContent(), /StrictSchema/i, 'Should switch to TypeScript snippet');

      // Click Luau
      const luauTab = page.locator('button[role="tab"]:has-text("Luau")');
      await luauTab.click();
      await page.waitForTimeout(300);
      assert.match(await panel.textContent(), /Replicator:delta_sync/i, 'Should switch to Luau snippet');

      console.log('  [Journey Step 4] Visitor reviews Systems Discipline and Linear Arena Visualizer');
      const aboutSection = page.locator('#about');
      await aboutSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);

      // Verify rules
      const rule1 = page.locator('#about span:has-text("01 //")');
      assert.ok(await rule1.isVisible(), 'Principle 01 must be visible');

      // Verify Linear Arena Visualizer
      const arenaLabel = page.locator('#about span:has-text("LINEAR_ARENA_LAYOUT")');
      assert.ok(await arenaLabel.isVisible(), 'Memory arena layout must be visible');
      const zeroFrag = page.locator('#about span:has-text("HEAP_FRAGMENTATION: 0%")');
      assert.ok(await zeroFrag.isVisible(), 'Zero heap fragmentation status must be confirmed');

      console.log('  [Journey Step 5] Visitor inspects Showcase Projects');
      const projectsSection = page.locator('#projects');
      await projectsSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);

      const hcrProject = page.locator('#projects h3:has-text("HAN Competitive Robotics")');
      assert.ok(await hcrProject.isVisible(), 'HCR Battlebot project card must be visible');

      const liveLink = page.locator('#projects a:has-text("LIVE")');
      assert.ok(await liveLink.isVisible(), 'Live project link must exist');

      console.log('  [Journey Step 6] Visitor examines Active Research Radar');
      const learningSection = page.locator('#learning');
      await learningSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);

      const concurrencyTrack = page.locator('#learning h3:has-text("Low Latency Concurrency")');
      assert.ok(await concurrencyTrack.isVisible(), 'Low latency concurrency research track must be visible');

      console.log('  [Journey Step 7] Visitor reaches Contact section and copies email');
      const contactSection = page.locator('#contact');
      await contactSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);

      const copyEmailBtn = page.locator('#contact button[aria-label="Copy email address to clipboard"]');
      await copyEmailBtn.click();
      await page.waitForTimeout(300);

      const toast = page.locator('[role="status"]');
      assert.ok(await toast.isVisible(), 'Toast notification must confirm email copied');
      assert.match(await toast.textContent(), /Copied email address to clipboard/i);

      console.log('  [Journey Step 8] Visitor uses Back-to-Top to return to header');
      const backToTopBtn = page.locator('footer button[aria-label="Back to top of page"]');
      await backToTopBtn.scrollIntoViewIfNeeded();
      await backToTopBtn.click();
      await page.waitForFunction(() => window.scrollY < 200, { timeout: 4000 });

      const finalScrollY = await page.evaluate(() => window.scrollY);
      assert.ok(finalScrollY < 200, `Window should be back near top (scrollY=${finalScrollY})`);

      console.log('  [Journey Step 9] Verifying zero runtime page errors across entire scenario');
      assert.strictEqual(pageErrors.length, 0, `Encountered unexpected page errors: ${pageErrors.join(', ')}`);

      console.log('  [Success] Full real-world user scenario completed cleanly.');
    } finally {
      await testEnv.close();
    }
  });
});
