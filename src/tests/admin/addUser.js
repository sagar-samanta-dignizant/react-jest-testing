const puppeteer = require('puppeteer');

describe('AddUser Component', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should add users when "Send Link" button is clicked', async () => {
    // Navigate to the test page containing the AddUser component
    await page.goto('http://localhost:3000/admin/users');

    // Wait for the email input field to be visible
    await page.waitForSelector('input[name="email"]');

    // // Enter email addresses in the TextField
    await page.type('input[name="email"]', 'user1@example.com,user2@example.com,user3@example.com');

    // // Click the "Send Link" button
    // await page.click('button[type="button"]');

    // // Wait for the email addresses to be processed (you may need to adjust the wait time based on the actual API response time)
    // await page.waitForTimeout(2000);

    // // Get the rendered Chip elements and extract their labels
    // const chipLabels = await page.evaluate(() => {
    //   const chips = Array.from(document.querySelectorAll('.MuiChip-root'));
    //   return chips.map(chip => chip.textContent.trim());
    // });

    // // Assert that the email addresses are displayed as Chips
    // expect(chipLabels).toEqual(['user1@example.com', 'user2@example.com', 'user3@example.com']);
  });
});
