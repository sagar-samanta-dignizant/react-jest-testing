/* eslint-disable no-undef */
const PasswordMinError = "Min 8 characters required";
const PasswordError = "Passwords does not match";

describe("Reset Password page test", () => {
  beforeEach(async () => {
    await page.goto("http://localhost:3000/user/reset");
  });

  it("should load reset password page", async () => {
    const resetPasswordPageLoadText = await page.$eval(
      "#Reset-password",
      (text) => text.innerText
    );
    expect(resetPasswordPageLoadText).toMatch("Reset Password");
  });

  it("should give validation error", async () => {
    await page.click("input[name=password]");
    await page.type("input[name=password]", "");

    await page.click("button[type=submit]");

    const el = await page.$eval(
      "p[id=password-helper-text]",
      (text) => text.innerText
    );
    expect(el).toMatch(PasswordMinError);
  });

  it("should give invalid password validation error", async () => {
    await page.click("input[name=password]");
    await page.type("input[name=password]", "test123");

    await page.click("button[type=submit]");

    const el = await page.$eval(
      "p[id=password-helper-text]",
      (text) => text.innerText
    );
    expect(el).toMatch(PasswordMinError);
  });
  // it("should give password validation error", async () => {
  //   await page.click("input[name=password]");
  //   await page.type("input[name=password]", "Test@123");
  //   await page.click("input[name=confirm_password]");
  //   await page.type("input[name=confirm_password]", "Test123");

  //   await page.click("button[type=submit]");

  //   const el = await page.$eval(
  //     "p[id=confirm_password-helper-text]",
  //     (text) => text.innerText
  //   );
  //   expect(el).toMatch(PasswordError);
  // });
});
