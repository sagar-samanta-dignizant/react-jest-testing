/* eslint-disable no-undef */
const puppeteer = require('puppeteer');

describe('Profile page test', () => {
  // beforeEach(async () => {
  //   await page.goto('http://localhost:3000/admin/profile');
  // });
  let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
    });

    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto('http://localhost:3000/admin/profile'); 
    });

    afterEach(async () => {
        await page.close();
    });

    afterAll(async () => {
        await browser.close();
    });

  it('should load Profile page', async () => {
    // await page.waitForSelector('#admin-settings');
    // await page.click('#admin-settings');
    // const userPageLoadText = await page.evaluate(() => document.querySelector('#admin-settings').innerText);
    // expect(userPageLoadText).toMatch('Admin Settings');
  });

  // it('should show form validation errors for admin details', async () => {
  //   await page.waitForSelector('#admin-settings');
  //   await page.click('#admin-settings');
  //   await page.click('#admin-details');
  //   await page.click('button[type=submit]');

  //   const fullNameError = await page.evaluate(() => document.querySelector('#full_name-helper-text').innerText);
  //   expect(fullNameError).toMatch('Min 3 characters are required');

  //   const emailError = await page.evaluate(() => document.querySelector('#email-helper-text').innerText);
  //   expect(emailError).toMatch('Email is required');
  // });

  // it('should show form validation errors for company details', async () => {
  //   await page.waitForSelector('#admin-settings', { timeout: 10000 }); // Increase the timeout to 10000 ms
  //   await page.click('#admin-settings');
  //   await page.click('#company-details');
  //   await page.click('button[type=submit]');

  //   const companyNameError = await page.evaluate(() => document.querySelector('#companyname-helper-text').innerText);
  //   expect(companyNameError).toMatch('Company Name is required');

  //   const addressError = await page.evaluate(() => document.querySelector('#company_address_1-helper-text').innerText);
  //   expect(addressError).toMatch('Address is required');

  //   const stateError = await page.evaluate(() => document.querySelector('#company_state-helper-text').innerText);
  //   expect(stateError).toMatch('State is required');

  //   const cityError = await page.evaluate(() => document.querySelector('#company_city-helper-text').innerText);
  //   expect(cityError).toMatch('City is required');

  //   const countryError = await page.evaluate(() => document.querySelector('#company_country-helper-text').innerText);
  //   expect(countryError).toMatch('Country is required');

  //   const codeError = await page.evaluate(() => document.querySelector('#company_postal_code-helper-text').innerText);
  //   expect(codeError).toMatch('Postal code is required');
  // });

  // it('should navigate to the payment details menu', async () => {
  //   await page.waitForSelector('#admin-settings');
  //   await page.click('#admin-settings');
  //   await page.click('#payment-details');
  //   const pageLoadText = await page.evaluate(() => document.querySelector('#number-label').innerText);
  //   expect(pageLoadText).toMatch('Card Number');
  // });
});
