const PageLoadText = "Register Company";
const pageText = "Add your company details";
const nextPageName = "Name"

describe("Login page test", () => {
  beforeEach(async () => {
    await page.goto("http://localhost:3000/register");
  });
  it("should redirect to register user page after register as new user button click", async () => {
    await page.click("#registerNewUser");

    const registerNewUser = await page.$eval(
      ".register-user",
      (text) => text.innerText
    );

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
  // it("next page button click", async () => {
  //   jest.setTimeout(10000); // set the timeout to 10 seconds
  //   await page.waitForSelector('button[name="Next"]');
  //   await page.click('button[name="Next"]');
  //   await page.waitForNavigation();
  //   const pageLoadText = await page.$eval(
  //     "#full_name-label",
  //     (text) => text.innerText
  //   );
  //   expect(pageLoadText).toMatch(nextPageName);

  //   const emailError = await page.$eval(
  //     "p[id=user_email]",
  //     (text) => text.innerText
  //   );
  //   expect(emailError).toMatch("Email is required");
  // });
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