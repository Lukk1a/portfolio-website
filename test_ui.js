const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(5000); // wait for load
    
    // Check for horizontal overflow
    const overflowX = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    if (overflowX) {
      console.log('WARNING: Horizontal overflow detected!');
    } else {
      console.log('SUCCESS: No horizontal overflow detected.');
    }

    // Take screenshot
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    console.log('Screenshot saved to screenshot.png');
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await browser.close();
  }
})();
