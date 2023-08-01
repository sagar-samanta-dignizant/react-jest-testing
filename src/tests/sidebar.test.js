/* eslint-disable no-undef */
const ImageAlt = "home-logo";

describe("Sidebar", () => {
  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    await page.goto("http://localhost:3000");
    // Add any other setup steps here, such as logging in or creating test data
  },10000);

  beforeEach(() => {
    jest.setTimeout(10000);
  });

  afterAll(async () => {
    await page.close();
  });

  describe("sidebar image", () => {
    it("should display the correct alt text", async () => {
      const SidebarLoadImage = await page.$eval("#home-logo", (text) =>
        text.getAttribute("alt")
      );
      expect(SidebarLoadImage).toMatch(ImageAlt);
    });
  });

  describe("sidebar menu buttons", () => {
    beforeEach(async () => {
      jest.setTimeout(10000);
      await page.click("#sidebar-menu-icon");
    });

    afterEach(async () => {
      jest.setTimeout(10000);
      await page.click("#sidebar-menu-icon");
    });

    it("should navigate to the home page when clicking the Home button", async () => {
      expect.assertions(1);
      await Promise.all([
        page.waitForNavigation(),
        page.click(".home"),
      ]);
      expect(page.url()).toContain("/admin");
    });

    it("should navigate to the Users page when clicking the Users button", async () => {
      expect.assertions(1);
      await Promise.all([
        page.waitForNavigation(),
        page.click(".users"),
      ]);
      expect(page.url()).toContain("/admin/users");
    });

    it("should navigate to the Admin Settings page when clicking the Admin Settings button", async () => {
      expect.assertions(1);
      await Promise.all([
        page.waitForNavigation(),
        page.click(".admin-settings"),
      ]);
      expect(page.url()).toContain("/admin/profile");
    });

    it("should navigate to the Profile page when clicking the Profile button", async () => {
      expect.assertions(1);
      await Promise.all([
        page.waitForNavigation(),
        page.click(".profile"),
      ]);
      expect(page.url()).toContain("/admin/models");
    });
  });
});



