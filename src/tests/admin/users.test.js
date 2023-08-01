const puppeteer = require('puppeteer');

describe('User page test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  beforeEach(async () => {
    page = await browser.newPage();
    // await page.goto('http://localhost:3000/admin/users');
  });

  afterEach(async () => {
    await page.close();
  });

  afterAll(async () => {
    await browser.close();
  });

  // it('should display the correct alt text', async () => {
  //   const ImageAlt = 'userButton';
  //   const SidebarLoadImage = await page.$eval('#userButton', (image) =>
  //     image.getAttribute('alt')
  //   );
  //   expect(SidebarLoadImage).toBe(ImageAlt);
  // });

  // it('on add user click', async () => {
  //   const popUpTitle = 'Add User';
  //   await page.waitForSelector('button#userButton');
  //   await page.click('button#userButton');
  //   const UserPageLoadText = await page.$eval('#add-user', (text) => text.innerText);
  //   expect(UserPageLoadText).toMatch(popUpTitle);
  // });

  it('on add user button click', async () => {
    await page.goto('http://localhost:3000/admin/users');
    const message = 'Send Email.';
    await page.waitForSelector('#userButton');
    await page.click('#userButton');
    await page.click('input[name=email]');
    await page.type('input[name=email]', 'testingemail.com,test');
    await page.click('button#userButton');
    // await page.waitForSelector('.go4109123758');
    const LoadText = await page.$eval('.go4109123758', (text) => text.innerText);
    expect(LoadText).toMatch(message);
  });

  it('on search click', async () => {
    // await page.waitForSelector('input[aria-label=search]'); // Wait for the input field to be available
  // await page.click('input[aria-label=search]'); // Click on the input field
    // await page.type('input[aria-label=search]', 'dipesh');
    // await Promise.all([page.click('#search-icon'), page.waitForNavigation()]);
  });
});
