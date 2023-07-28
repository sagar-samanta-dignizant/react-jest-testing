/* eslint-disable no-undef */
const puppeteer = require('puppeteer');
const EmailRequriedError = "Email is required";
const PasswordMinError = "Min 8 characters required";
const EmailInvalidError = "Email is invalid";
const LoginPageInfoText = "Use your email and password to login";
const ResetPasswordPageInfoText = "Use your email to reset password";
const ResetNewUser = "Add your company details";
const InvalidPasswordError =
  "Password must include uppercase, lowercase, number and special symbol";



describe("Login page test", () => {

  beforeEach(async () => {
    await page.goto("http://localhost:3000/login");
  });

  // === LOGIN PAGE LOAD TEST CASE START === //

  it("should load login page", async () => {
    // await page.waitForSelector("#email-helper-text", { timeout: 10000 });
    // jest.setTimeout(10000);
    const loginPageLoadText = await page.$eval(
      ".email-helper-text",
      (text) => text.innerText
    );
    expect(loginPageLoadText).toMatch("Use your email and password to login");
  });

  // === LOGIN PAGE LOAD TEST CASE END === //

  // === LOGIN PAGE LOGIN AND FORGET PASSWORD BUTTON TEST CASES START === //

  it("should redirect to reset password page after forget password button click", async () => {
    await page.click("#resetPasswordBtn");

    const resetPasswordInfoText = await page.$eval(
      ".ResetPassBtn",
      (text) => text.innerText
    );

    expect(resetPasswordInfoText).toMatch(ResetPasswordPageInfoText);
  });

  it("should redirect to register user page after register as new user button click", async () => {
    await page.click("#registerNewUser");

    const registerNewUser = await page.$eval(
      ".register-user",
      (text) => text.innerText
    );

    expect(registerNewUser).toMatch("Add your company details");
  });

  it("should give form validation error after login button click without passing email and password", async () => {
    await page.click("button[type=submit]");

    // eslint-disable-next-line no-undef
    const emailError = await page.$eval(
      "p[id=email-helper-text]",
      (text) => text.innerText
    );
    const passwordError = await page.$eval(
      "p[id=password-helper-text]",
      (text) => text.innerText
    );
    expect(emailError).toMatch(EmailRequriedError);
    expect(passwordError).toMatch(PasswordMinError);
  });

  // === LOGIN PAGE LOGIN AND FORGET PASSWORD BUTTON TEST CASES END === //

  // === EMAIL FIELD AND PASSWORD VALIDATION TEST CASES START === //

  it("should give email and password validation error", async () => {
    await page.click("input[name=email]");
    await page.type("input[name=email]", "testingemail.com ");

    await page.click("input[type=password]");
    await page.type("input[type=password]", "123456789");

    await page.click("button[type=submit]");

    const el = await page.$eval(
      "p[id=email-helper-text]",
      (text) => text.innerText
    );
    expect(el).toMatch(EmailInvalidError);
    const le = await page.$eval(
      "p[id=password-helper-text]",
      (text) => text.innerText
    );
    expect(le).toMatch(InvalidPasswordError);
  });

  // === EMAIL FIELD VALIDATION TEST CASES END === //

  // === PASSWORD FIELD VALIDATION TEST CASES START === //

  it("should give minimum password validation error", async () => {
    await page.click("input[name=email]");
    await page.type("input[name=email]", "testing@email.com ");

    await page.click("input[type=password]");
    await page.type("input[type=password]", "111");

    await page.click("button[type=submit]");

    const el = await page.$eval(
      "p[id=password-helper-text]",
      (text) => text.innerText
    );
    expect(el).toMatch(PasswordMinError);
  });

  it("should give invalid password validation error", async () => {
    await page.click("input[name=email]");
    await page.type("input[name=email]", "testing@email.com ");

    await page.click("input[type=password]");
    await page.type("input[type=password]", "dipesh123");

    await page.click("button[type=submit]");

    const el = await page.$eval(
      "p[id=password-helper-text]",
      (text) => text.innerText
    );
    expect(el).toMatch(InvalidPasswordError);
  });

  it("should redirect to OTP page after successful login", async () => {
    try {
      await Promise.all([
        page.goto("http://localhost:3000/otp"),
        page.waitForSelector("input[name=otp]"),
        page.click("input[name=otp]"),
        page.click("input[name=email]"),
        page.type("input[name=email]", "testing@email.com"),
        page.click("input[type=password]"),
        page.type("input[type=password]", "Dipesh@123"),
        page.click("button[type=submit]"),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);
    } catch (err) {
      console.log("An error occurred while trying to login => ", err);
    }

    if (page.url() !== "http://localhost:3000/otp") {
      throw new Error("Login failed! Could not redirect to OTP page.");
    }
  }, 10000);


  // === PASSWORD FIELD VALIDATION TEST CASES END === //
});
