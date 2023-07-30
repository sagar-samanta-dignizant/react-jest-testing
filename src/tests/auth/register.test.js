const PageLoadText = "Register Company";
const pageText = "Add your company details";
const nextPageName = "Name"

describe("Register page test", () => {
  beforeEach(async () => {
    await page.goto("http://localhost:3000/register");
  });

  it("should redirect to register user page after register as new user button click", async () => {
    await page.goto("http://localhost:3000/login"); // Make sure to navigate to the correct page first.
    await page.waitForSelector("#registerNewUser");
    await page.click("#registerNewUser");
    const registerNewUser = await page.$eval(".register-user", (text) => text.innerText);
    expect(registerNewUser).toMatch("Add your company details");
  });

  // === LOGIN PAGE LOAD TEST CASE START === //

  it("should load register page", async () => {
    const loginPageLoadText = await page.$eval(
      ".register-user",
      (text) => text.innerText
    );
    expect(loginPageLoadText).toMatch(pageText);
  });

  it("next page button click", async () => {
    try {
      // Click the "Next" button to go to the next step
      await page.click("#NextButton");
  
      // Fill the required fields in the second step
      await page.waitForSelector('input[name="companyname"]');
      await page.click('input[name="companyname"]');
      await page.type('input[name="companyname"]', "diesh");
  
      await page.click('input[name="company_address_1"]');
      await page.type('input[name="company_address_1"]', "test");
  
      await page.click('input[name="company_state"]');
      await page.type('input[name="company_state"]', "test");
  
      await page.click('input[name="company_city"]');
      await page.type('input[name="company_city"]', "test");
  
      await page.click('input[name="company_country"]');
      await page.type('input[name="company_country"]', "test");
  
      await page.click('input[name="company_postal_code"]');
      await page.type('input[name="company_postal_code"]', "32568");
  
      // Optional: You can click the "Next" button again to navigate to the next step (if applicable)
      // await page.click("#NextButton");
  
      // Assert that the form fields in the second step are filled correctly
      const companynameValue = await page.$eval('input[name="companyname"]', (el) => el.value);
      expect(companynameValue).toBe("diesh");
  
      const companyAddressValue = await page.$eval('input[name="company_address_1"]', (el) => el.value);
      expect(companyAddressValue).toBe("test");
  
      const companyStateValue = await page.$eval('input[name="company_state"]', (el) => el.value);
      expect(companyStateValue).toBe("test");
  
      const companyCityValue = await page.$eval('input[name="company_city"]', (el) => el.value);
      expect(companyCityValue).toBe("test");
  
      const companyCountryValue = await page.$eval('input[name="company_country"]', (el) => el.value);
      expect(companyCountryValue).toBe("test");
  
      const companyPostalCodeValue = await page.$eval('input[name="company_postal_code"]', (el) => el.value);
      expect(companyPostalCodeValue).toBe("32568");
    } catch (error) {
      console.log("An error occurred while trying to click on Next and fill form fields => ", error);
    }
  });
  

  // it("back button click without fill any fields", async () => {
  //   await page.click("button");

  //   const pageLoadText = await page.$eval(
  //     "p[id=companyname-helper-text]",
  //     (text) => text.innerText
  //   );
  //   expect(pageLoadText).toMatch("Company Name is required");

  //   const addressError = await page.$eval(
  //     "p[id=company_address_1-helper-text]",
  //     (text) => text.innerText
  //   );
  //   expect(addressError).toMatch("Address is required");

  //   const stateError = await page.$eval(
  //     "p[id=company_state-helper-text]",
  //     (text) => text.innerText
  //   );
  //   expect(stateError).toMatch("State is required");

  //   const cityError = await page.$eval(
  //     "p[id=company_city-helper-text]",
  //     (text) => text.innerText
  //   );
  //   expect(cityError).toMatch("City is required");

  //   const countryError = await page.$eval(
  //     "p[id=company_country-helper-text]",
  //     (text) => text.innerText
  //   );
  //   expect(countryError).toMatch("Country is required");
  // });
  

  it("submit button click", async () => {
    try {
      await page.click("input[name=companyname]");
      await page.type("input[name=companyname]", "diesh");

      await page.click("input[name=company_address_1]");
      await page.type("input[name=company_address_1]", "test");

      await page.click("input[name=company_state]");
      await page.type("input[name=company_state]", "test");

      await page.click("input[name=company_city]");
      await page.type("input[name=company_city]", "test");

      await page.click("input[name=company_country]");
      await page.type("input[name=company_country]", "test");

      await page.click("input[name=company_postal_code]");
      await page.type("input[name=company_postal_code]", "32568");

      await page.click("button");

      await page.click("input[name=full_name]");
      await page.type("input[name=full_name]", "test");

      await page.click("input[name=user_email]");
      await page.type("input[name=user_email]", "test@gmail.com");

      await page.click("input[name=display_name]");
      await page.type("input[name=display_name]", "test");

      await page.click("input[name=phone_no]");
      await page.type("input[name=phone_no]", "1234567890");

      await page.click("input[name=password]");
      await page.type("input[name=password]", "Test@123");

      await page.click("input[name=confirm_password]");
      await page.type("input[name=confirm_password]", "Test@123");

      await Promise.all([
        page.click("button[type=submit]"),
        page.waitForNavigation(),
      ]);

      const successMessage = await page.$eval(
        ".MuiAlert-message",
        (text) => text.innerText
      );

      expect(successMessage).toMatch("You have successfully registered!");
    } catch (err) {
      console.log("An error occured while trying to register => ", err);
    }
  });
});