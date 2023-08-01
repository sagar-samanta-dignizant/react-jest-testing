const puppeteer = require('puppeteer');

describe('Forgot Password Form Test', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
    });

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto('http://localhost:3000/forget_password'); // Replace with the actual URL of your "Forgot Password" page
    });

    afterEach(async () => {
        await page.close();
    });

    afterAll(async () => {
        await browser.close();
    });

    //   it('should display the form title', async () => {
    //     await page.waitForSelector('h1');
    //     const titleText = await page.evaluate(() => document.querySelector('h1').innerText);
    //     expect(titleText).toBe('Forgot Password');
    //   });

    it('should display the email input field', async () => {
        await page.waitForSelector('input[name="email"]');
        const emailInput = await page.$('input[name="email"]');
        expect(emailInput).toBeTruthy();
    });

    it('should display the company name input field', async () => {
        await page.waitForSelector('input[name="companyname"]');
        const companyNameInput = await page.$('input[name="companyname"]');
        expect(companyNameInput).toBeTruthy();
    });

    it('should display the "Request Password Reset" button', async () => {
        await page.waitForSelector('button[type="submit"]');
        const submitButton = await page.$('button[type="submit"]');
        expect(submitButton).toBeTruthy();
    });

    it('should display the "Go to Login" button', async () => {
        await page.waitForSelector('button#loginPagebtn');
        const loginButton = await page.$('button#loginPagebtn');
        expect(loginButton).toBeTruthy();
    });

    it('should submit the form with valid email', async () => {
        await page.waitForSelector('input[name="email"]');
        await page.type('input[name="email"]', 'vidhyasudani123@gmail.com'); // Replace with a valid test email
        await page.waitForSelector('button[type="submit"]');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(2000); // Add a short delay to allow the request to complete
        const newURL = page.url();
        expect(newURL).toContain("/forget_password");
    });
  

    it('should submit the form with valid email and company name', async () => {
        // Provide valid email and company name
        const validEmail = 'validemail@example.com';
        const validCompanyName = 'Valid Company';

        await page.waitForSelector('input[name="email"]');
        await page.type('input[name="email"]', validEmail);

        await page.waitForSelector('input[name="companyname"]');
        await page.type('input[name="companyname"]', validCompanyName);

        await page.waitForSelector('button[type="submit"]');
        const newURL = page.url();
        expect(newURL).toContain("/forget_password");

    });

    it('should display an error message for an invalid email', async () => {
        await page.waitForSelector('input[name="email"]');
        await page.type('input[name="email"]', 'invalid_email'); // Replace with an invalid test email
        await page.waitForSelector('button[type="submit"]');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(2000); // Add a short delay to allow the request to complete
        const el = await page.$eval("p[id=email-helper-text]", (text) => text.innerText);
        expect(el).toMatch("Email is invalid");
    });
});
