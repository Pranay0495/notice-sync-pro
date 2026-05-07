import { chromium, Browser, Page } from 'playwright';

interface ScrapeResult {
  success: boolean;
  notices: any[];
  error?: string;
}

export async function scrapeIncomeTaxNotices(username: string, password: string): Promise<ScrapeResult> {
  const browser: Browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  try {
    // 1. Navigate to Login Page
    await page.goto('https://eportal.incometax.gov.in/iec/foservices/#/login');
    
    // 2. Enter Username
    await page.fill('#panAdhaarUserId', username);
    await page.click('.main-container button[type="submit"]');

    // 3. Check for secure access message and enter password
    await page.waitForSelector('#loginPasswordField');
    await page.click('label[for="input-check-box"]'); // Check the "Please confirm your secure access message"
    await page.fill('#loginPasswordField', password);
    await page.click('.main-container button[type="submit"]');

    // 4. Handle Dashboard & Navigation to Notices
    // Note: The portal often has popups/modals. We need to close them.
    try {
      await page.waitForSelector('.modal-close', { timeout: 5000 });
      await page.click('.modal-close');
    } catch (e) {
      // No modal found, continue
    }

    // Navigate to "Pending Actions" -> "e-Proceedings"
    // This is the common path for notices
    await page.click('text=Pending Actions');
    await page.click('text=e-Proceedings');

    // 5. Extract Notices Data
    await page.waitForSelector('.e-proceedings-table'); // Assuming selector based on common patterns
    
    const notices = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('.e-proceedings-table tr')).slice(1); // Skip header
      return rows.map(row => {
        const cols = row.querySelectorAll('td');
        return {
          referenceNumber: cols[1]?.innerText.trim(),
          section: cols[2]?.innerText.trim(),
          description: cols[3]?.innerText.trim(),
          issueDate: cols[4]?.innerText.trim(),
          dueDate: cols[5]?.innerText.trim(),
          status: 'NEW'
        };
      });
    });

    await browser.close();
    return { success: true, notices };

  } catch (error: any) {
    await browser.close();
    console.error('IT Scrape Error:', error.message);
    return { success: false, notices: [], error: error.message };
  }
}
