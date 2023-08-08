import React from "react";
import { render, fireEvent, screen,waitFor } from '@testing-library/react';
import Users from "../../pages/admin/Users";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import usersService from "../../services/users.service";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// jest.mock('../../services/users.service');

describe("Profile component", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Users />
        </MemoryRouter>
      </HelmetProvider>
    );
  });
  test("renders without crashing", async () => {
    expect(screen.getByText("Users")).toBeInTheDocument();
  });
  test("displays loading state initially", async () => {   
    // Test that the loading state is displayed initially
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
  test('opens "Add User" modal on button click', () => {
    const addUserButton = screen.getByText('Add User');
    fireEvent.click(addUserButton);
    expect(screen.getByText('Add User')).toBeInTheDocument();
  });  
})
























// const puppeteer = require('puppeteer');

// describe('User page test', () => {
//   let browser;
//   let page;

//   beforeAll(async () => {
//     browser = await puppeteer.launch();
//   });

//   beforeEach(async () => {
//     page = await browser.newPage();
//     // await page.goto('http://localhost:3000/admin/users');
//   });

//   afterEach(async () => {
//     await page.close();
//   });

//   afterAll(async () => {
//     await browser.close();
//   });

//   // it('should display the correct alt text', async () => {
//   //   const ImageAlt = 'userButton';
//   //   const SidebarLoadImage = await page.$eval('#userButton', (image) =>
//   //     image.getAttribute('alt')
//   //   );
//   //   expect(SidebarLoadImage).toBe(ImageAlt);
//   // });

//   // it('on add user click', async () => {
//   //   const popUpTitle = 'Add User';
//   //   await page.waitForSelector('button#userButton');
//   //   await page.click('button#userButton');
//   //   const UserPageLoadText = await page.$eval('#add-user', (text) => text.innerText);
//   //   expect(UserPageLoadText).toMatch(popUpTitle);
//   // });

//   it('on add user button click', async () => {
//     await page.goto('http://localhost:3000/admin/users');
//     const message = 'Send Email.';
//     await page.waitForSelector('#userButton');
//     await page.click('#userButton');
//     await page.click('input[name=email]');
//     await page.type('input[name=email]', 'testingemail.com,test');
//     await page.click('button#userButton');
//     // await page.waitForSelector('.go4109123758');
//     const LoadText = await page.$eval('.go4109123758', (text) => text.innerText);
//     expect(LoadText).toMatch(message);
//   });

//   it('on search click', async () => {
//     // await page.waitForSelector('input[aria-label=search]'); // Wait for the input field to be available
//   // await page.click('input[aria-label=search]'); // Click on the input field
//     // await page.type('input[aria-label=search]', 'dipesh');
//     // await Promise.all([page.click('#search-icon'), page.waitForNavigation()]);
//   });
// });



