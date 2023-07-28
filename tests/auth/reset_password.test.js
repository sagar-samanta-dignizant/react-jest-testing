/* eslint-disable no-undef */
const EmailRequriedError = "Email is required";
const EmailInvalidError = "Email is invalid";
const LoginPageInfoText = "Use your email and password to login";
const ResetPasswordPageInfoText = "Use your email to reset password";

describe("Reset Password page test", () => {
  beforeEach(async () => {
    await page.goto("http://localhost:3000/forget_password");
  });

  it("should load reset password page", async () => {
    const resetPasswordPageLoadText = await page.$eval(
      ".MuiAlert-message",
      (text) => text.innerText
    );
    expect(resetPasswordPageLoadText).toMatch(ResetPasswordPageInfoText);
  });

  it("should redirect to login page after go to login button click", async () => {
    await page.click("#loginPagebtn");

    const loginPageInfoText = await page.$eval(
      ".MuiAlert-message",
      (text) => text.innerText
    );

    expect(loginPageInfoText).toMatch(LoginPageInfoText);
  });

  it("should give email validation error", async () => {
    await page.click("input[name=email]");
    await page.type("input[name=email]", " ");

    await page.click("button[type=submit]");

    const emailError = await page.$eval(
      "p[id=email-helper-text]",
      (text) => text.innerText
    );
    expect(emailError).toMatch(EmailRequriedError);
  });

  it("should give invalid email validation error", async () => {
    await page.click("input[name=email]");
    await page.type("input[name=email]", "testingemail.com ");

    await page.click("button[type=submit]");
    // const el = await page.$eval(
    //   "p[id=email-helper-text]",
    //   (text) => text.innerText
    // );
    const el = await page.$eval(
      "p[id=email-helper-text]",
      (text) => text.innerText
    );
    expect(el).toMatch(EmailInvalidError);
  });
});
