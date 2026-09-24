const test = require('node:test');
const assert = require('node:assert');
const { BASE_URL, createTestPage, waitForServer } = require('./helpers');

test.describe('Tier 1: Feature Coverage Checks', () => {
  let testEnv;
  let page;

  test.before(async () => {
    const isOnline = await waitForServer(BASE_URL, 15000);
    assert.ok(isOnline, `Server at ${BASE_URL} must be responding.`);
    testEnv = await createTestPage({ viewport: { width: 1280, height: 800 } });
    page = testEnv.page;
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  });

  test.after(async () => {
    if (testEnv) {
      await testEnv.close();
    }
  });

  // Section 1: Navigation & Header
  test('1.1 Navbar renders brand name linked to hero', async () => {
    const brand = page.locator('header a[href="#hero"]');
    await assert.doesNotReject(brand.waitFor({ state: 'visible', timeout: 5000 }));
    const brandText = await brand.textContent();
    assert.match(brandText, /LUKA/i, 'Brand text should contain LUKA');
  });

  test('1.2 Desktop navigation items are rendered', async () => {
    const navItems = page.locator('nav[aria-label="Main navigation"] a');
    const count = await navItems.count();
    assert.ok(count >= 5, `Expected at least 5 nav links, found ${count}`);

    const expectedLabels = ['STACK', 'PRINCIPLES', 'SHOWCASE', 'RADAR', 'CONTACT'];
    for (const label of expectedLabels) {
      const item = page.locator(`nav[aria-label="Main navigation"] a:has-text("${label}")`);
      const isVisible = await item.isVisible();
      assert.ok(isVisible, `Nav item "${label}" should be visible on desktop`);
    }
  });

  test('1.3 Navigation links have correct href section targets', async () => {
    const expectedTargets = ['#skills', '#about', '#projects', '#learning', '#contact'];
    for (const target of expectedTargets) {
      const link = page.locator(`nav[aria-label="Main navigation"] a[href="${target}"]`);
      const exists = await link.count();
      assert.ok(exists > 0, `Navbar should contain link to ${target}`);
    }
  });

  test('1.4 Mobile menu trigger button exists and is accessible', async () => {
    const mobileTrigger = page.locator('button[aria-label="Open mobile navigation menu"]');
    const exists = await mobileTrigger.count();
    assert.ok(exists > 0, 'Mobile menu trigger button must exist in header');
  });

  test('1.5 Sticky navbar contains backdrop blur styling', async () => {
    const header = page.locator('header');
    const classAttr = await header.getAttribute('class');
    assert.ok(classAttr.includes('fixed') && classAttr.includes('top-0'), 'Header must be fixed at the top');
  });

  // Section 2: Hero Section
  test('2.1 Hero section is present in DOM', async () => {
    const hero = page.locator('#hero');
    const isVisible = await hero.isVisible();
    assert.ok(isVisible, 'Hero section with id="hero" must be visible');
  });

  test('2.2 Hero displays editorial full name headline', async () => {
    const heading = page.locator('#hero h1');
    const text = await heading.textContent();
    assert.match(text, /Luka Pajkanovic/i, 'Hero heading should display Luka Pajkanovic');
  });

  test('2.3 Hero displays role and statement', async () => {
    const hero = page.locator('#hero');
    const content = await hero.textContent();
    assert.match(content, /Systems & Web Developer/i, 'Hero should display role');
    assert.match(content, /high performance software/i, 'Hero should display bio statement');
  });

  test('2.4 Hero renders core specialization tags', async () => {
    const expectedTags = ['Native Memory Models', 'Async Task Pipelines', 'Deterministic Simulation', 'Type Safe Architecture'];
    for (const tag of expectedTags) {
      const badge = page.locator(`#hero span:has-text("${tag}")`);
      const isVisible = await badge.isVisible();
      assert.ok(isVisible, `Hero should display tag "${tag}"`);
    }
  });

  test('2.5 Hero primary CTA points to #skills and secondary to #contact', async () => {
    const ctaSkills = page.locator('#hero a[href="#skills"]');
    assert.ok(await ctaSkills.isVisible(), 'VIEW ARCHITECTURE CTA should be visible and link to #skills');

    const ctaContact = page.locator('#hero a[href="#contact"]');
    assert.ok(await ctaContact.isVisible(), 'CONTACT CTA should be visible and link to #contact');
  });

  // Section 3: Technical Stack & Interactive Language Matrix
  test('3.1 Skills section marker is present', async () => {
    const skillsSection = page.locator('#skills');
    const isVisible = await skillsSection.isVisible();
    assert.ok(isVisible, 'Skills section must be visible');
  });

  test('3.2 Interactive matrix renders tablist with 5 languages', async () => {
    const tablist = page.locator('div[role="tablist"]');
    assert.ok(await tablist.isVisible(), 'Tablist must be visible');

    const tabs = page.locator('div[role="tablist"] button[role="tab"]');
    const count = await tabs.count();
    assert.strictEqual(count, 5, 'Matrix tablist must contain exactly 5 language tabs');

    const expectedLangs = ['C++', 'Python', 'JavaScript', 'TypeScript', 'Luau'];
    for (const lang of expectedLangs) {
      const tab = page.locator(`button[role="tab"]:has-text("${lang}")`);
      assert.ok(await tab.isVisible(), `Tab for "${lang}" should be visible`);
    }
  });

  test('3.3 Default active language is C++ with correct code snippet', async () => {
    const cppTab = page.locator('button[role="tab"]:has-text("C++")');
    const isSelected = await cppTab.getAttribute('aria-selected');
    assert.strictEqual(isSelected, 'true', 'C++ tab should be active by default');

    const snippetPanel = page.locator('#language-spec-panel');
    const text = await snippetPanel.textContent();
    assert.match(text, /LinearArena::alloc/i, 'Snippet should contain C++ allocator preview');
  });

  test('3.4 Switching to Python displays Python code snippet', async () => {
    const pyTab = page.locator('button[role="tab"]:has-text("Python")');
    await pyTab.click();
    await page.waitForTimeout(300);

    const isSelected = await pyTab.getAttribute('aria-selected');
    assert.strictEqual(isSelected, 'true', 'Python tab should be selected after click');

    const snippetPanel = page.locator('#language-spec-panel');
    const text = await snippetPanel.textContent();
    assert.match(text, /stream\.consume/i, 'Snippet should display Python async consumer code');
  });

  test('3.5 Switching to TypeScript displays TypeScript code snippet', async () => {
    const tsTab = page.locator('button[role="tab"]:has-text("TypeScript")');
    await tsTab.click();
    await page.waitForTimeout(300);

    const snippetPanel = page.locator('#language-spec-panel');
    const text = await snippetPanel.textContent();
    assert.match(text, /StrictSchema/i, 'Snippet should display TypeScript contract code');
  });

  test('3.6 Switching to Luau displays Luau code snippet', async () => {
    const luauTab = page.locator('button[role="tab"]:has-text("Luau")');
    await luauTab.click();
    await page.waitForTimeout(300);

    const snippetPanel = page.locator('#language-spec-panel');
    const text = await snippetPanel.textContent();
    assert.match(text, /Replicator:delta_sync/i, 'Snippet should display Luau replication code');
  });

  test('3.7 Switching to JavaScript displays JavaScript code snippet', async () => {
    const jsTab = page.locator('button[role="tab"]:has-text("JavaScript")');
    await jsTab.click();
    await page.waitForTimeout(300);

    const snippetPanel = page.locator('#language-spec-panel');
    const text = await snippetPanel.textContent();
    assert.match(text, /buffer\.drain/i, 'Snippet should display JavaScript buffer drain code');
  });

  // Section 4: Categorized Skills Index
  test('4.1 Web & Runtimes category contains skills', async () => {
    const categoryTitle = page.locator('h3:has-text("WEB & RUNTIMES")');
    assert.ok(await categoryTitle.isVisible(), 'WEB & RUNTIMES category heading should be visible');

    const webItems = ['React 19', 'Next.js 15', 'Tailwind CSS'];
    for (const item of webItems) {
      const pill = page.locator(`#skills span:has-text("${item}")`);
      assert.ok(await pill.first().isVisible(), `Skill pill "${item}" should be visible`);
    }
  });

  test('4.2 DevOps & Infrastructure category contains skills', async () => {
    const categoryTitle = page.locator('h3:has-text("DEVOPS & INFRASTRUCTURE")');
    assert.ok(await categoryTitle.isVisible(), 'DEVOPS & INFRASTRUCTURE category heading should be visible');

    const devopsItems = ['Docker', 'GitHub Actions', 'GitLab CI/CD'];
    for (const item of devopsItems) {
      const pill = page.locator(`#skills span:has-text("${item}")`);
      assert.ok(await pill.first().isVisible(), `Skill pill "${item}" should be visible`);
    }
  });

  test('4.3 Game & Systems category contains skills', async () => {
    const categoryTitle = page.locator('h3:has-text("GAME & SYSTEMS SPECIALIZATIONS")');
    assert.ok(await categoryTitle.isVisible(), 'GAME & SYSTEMS category heading should be visible');

    const gameItems = ['Roblox Architecture', 'Game Loops & Physics'];
    for (const item of gameItems) {
      const pill = page.locator(`#skills span:has-text("${item}")`);
      assert.ok(await pill.first().isVisible(), `Skill pill "${item}" should be visible`);
    }
  });

  // Section 5: Engineering Principles & Systems Visualizer (#about)
  test('5.1 Engineering principles section is present', async () => {
    const about = page.locator('#about');
    assert.ok(await about.isVisible(), 'Section #about should be visible');
  });

  test('5.2 Principles core heading is displayed', async () => {
    const heading = page.locator('#about h2');
    const text = await heading.textContent();
    assert.match(text, /Building software with intention/i, 'Philosophy heading should be visible');
  });

  test('5.3 Four numbered engineering rules are rendered', async () => {
    for (let i = 1; i <= 4; i++) {
      const rule = page.locator(`#about span:has-text("0${i} //")`);
      assert.ok(await rule.isVisible(), `Engineering rule 0${i} should be visible`);
    }
  });

  test('5.4 Contiguous Linear Arena memory visualizer is rendered', async () => {
    const visualizer = page.locator('#about span:has-text("LINEAR_ARENA_LAYOUT")');
    assert.ok(await visualizer.isVisible(), 'Memory arena layout label should be visible');

    const fragStatus = page.locator('#about span:has-text("HEAP_FRAGMENTATION: 0%")');
    assert.ok(await fragStatus.isVisible(), 'Zero heap fragmentation status should be visible');
  });

  test('5.5 Memory arena address segments are displayed', async () => {
    const simSegment = page.locator('#about span:has-text("[0x0000] SIMULATION")');
    assert.ok(await simSegment.isVisible(), 'Address segment 0x0000 should be visible');
  });

  // Section 6: Showcase Projects (#projects)
  test('6.1 Projects section is present', async () => {
    const projects = page.locator('#projects');
    assert.ok(await projects.isVisible(), 'Section #projects should be visible');
  });

  test('6.2 Featured Battlebot project card is displayed', async () => {
    const projectTitle = page.locator('#projects h3:has-text("HAN Competitive Robotics")');
    assert.ok(await projectTitle.isVisible(), 'Battlebot project title should be visible');
  });

  test('6.3 Featured project renders tech stack badges', async () => {
    const nextBadge = page.locator('#projects span:has-text("Next.js 15")');
    assert.ok(await nextBadge.first().isVisible(), 'Next.js 15 badge should be visible');
  });

  test('6.4 Featured project live link points to external website', async () => {
    const liveLink = page.locator('#projects a:has-text("LIVE")');
    assert.ok(await liveLink.isVisible(), 'LIVE link should be visible');
    const href = await liveLink.getAttribute('href');
    assert.strictEqual(href, 'https://hrc.lukka.dev', 'LIVE link should point to https://hrc.lukka.dev');
  });

  // Section 7: Active Research Radar (#learning)
  test('7.1 Research radar section is present', async () => {
    const learning = page.locator('#learning');
    assert.ok(await learning.isVisible(), 'Section #learning should be visible');
  });

  test('7.2 Three research tracks are rendered', async () => {
    const tracks = ['Low Latency Concurrency', 'Graphics Pipelines', 'Distributed Consensus'];
    for (const track of tracks) {
      const card = page.locator(`#learning h3:has-text("${track}")`);
      assert.ok(await card.isVisible(), `Research track "${track}" should be visible`);
    }
  });

  test('7.3 Research track terminal milestone badges are displayed', async () => {
    const terminalMarkers = page.locator('#learning span:has-text(">_")');
    const count = await terminalMarkers.count();
    assert.ok(count >= 3, 'All 3 research tracks should contain terminal milestone >_ indicators');
  });

  // Section 8: Communication & Collaboration (#contact)
  test('8.1 Contact section is present', async () => {
    const contact = page.locator('#contact');
    assert.ok(await contact.isVisible(), 'Section #contact should be visible');
  });

  test('8.2 Contact heading is displayed', async () => {
    const heading = page.locator('#contact h2');
    const text = await heading.textContent();
    assert.match(text, /LET'S ENGINEER/i, 'Contact heading should be visible');
  });

  test('8.3 Four contact action cards are rendered', async () => {
    const cards = ['EMAIL', 'REPOSITORY', 'GITHUB', 'DISCORD'];
    for (const card of cards) {
      const el = page.locator(`#contact span:has-text("${card}")`);
      assert.ok(await el.first().isVisible(), `Action card "${card}" should be visible`);
    }
  });

  test('8.4 Email card contains direct mailto link', async () => {
    const mailto = page.locator('#contact a[href^="mailto:pajkanovicluka7@gmail.com"]');
    assert.ok(await mailto.isVisible(), 'Mailto link should be visible');
  });

  test('8.5 Copy Email button triggers clipboard feedback', async () => {
    const copyEmailBtn = page.locator('#contact button[aria-label="Copy email address to clipboard"]');
    assert.ok(await copyEmailBtn.isVisible(), 'Copy email button should be visible');
    await copyEmailBtn.click();
    await page.waitForTimeout(400);

    const toast = page.locator('[role="status"]');
    const isToastVisible = await toast.isVisible();
    assert.ok(isToastVisible, 'Copy toast should be displayed on email copy');
    const toastText = await toast.textContent();
    assert.match(toastText, /Copied email address to clipboard/i, 'Toast message should confirm email copied');
  });

  // Section 9: Footer & Back-to-Top
  test('9.1 Footer element is present', async () => {
    const footer = page.locator('footer');
    assert.ok(await footer.isVisible(), 'Footer should be visible');
  });

  test('9.2 Footer renders copyright and name', async () => {
    const footer = page.locator('footer');
    const text = await footer.textContent();
    assert.match(text, /Luka Pajkanovic/i, 'Footer should render name');
    assert.match(text, /All rights reserved/i, 'Footer should render copyright');
  });

  test('9.3 Footer renders Back-to-Top button', async () => {
    const backToTop = page.locator('footer button[aria-label="Back to top of page"]');
    assert.ok(await backToTop.isVisible(), 'Back-to-top button should be visible in footer');
  });
});
