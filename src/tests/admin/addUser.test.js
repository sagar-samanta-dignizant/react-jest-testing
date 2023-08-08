import React from "react";
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import usersService from "../../services/users.service";
import AddUser from "../../sections/admin/user/AddUser";

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
          <AddUser />
        </MemoryRouter>
      </HelmetProvider>
    );
  });
  test('renders "Add User" title', () => {
    const addUserTitle = screen.getByText(/Add User/i);
    expect(addUserTitle).toBeInTheDocument();
  });
  test('renders email input field', () => {
    const emailInput = screen.getByLabelText(/Email \*/i);
    expect(emailInput).toBeInTheDocument();
  });
  test('renders "Send Link" button', () => {
    const sendLinkButton = screen.getByRole('button', { name: /Send Link/i });
    expect(sendLinkButton).toBeInTheDocument();
  });
  test('updates email input value on change', () => {
    const emailInput = screen.getByLabelText(/Email \*/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });
  test('displays email chips correctly', () => {
    const emailInput = screen.getByLabelText(/Email \*/i);

    fireEvent.change(emailInput, { target: { value: 'test1@example.com,test2@example.com' } });

    const chip1 = screen.getByText(/test1@example.com/i);
    const chip2 = screen.getByText(/test2@example.com/i);
    expect(chip1).toBeInTheDocument();
    expect(chip2).toBeInTheDocument();
  });
  test('displays "more" chip for more than 9 emails', () => {
    const emailInput = screen.getByLabelText(/Email \*/i);

    fireEvent.change(emailInput, {
      target: {
        value:
          'test1@example.com,test12@example.com,test13@example.com,test2@example.com,test3@example.com,test4@example.com,test5@example.com,test6@example.com,test7@example.com,test8@example.com,test9@example.com,test10@example.com',
      },
    });
    
    expect(screen.getByText(/test1@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/test2@example.com/i)).toBeInTheDocument()
    const moreChip = screen.queryByText(/more/i);
    expect(moreChip).toBeTruthy();
  });


})











































// const puppeteer = require('puppeteer');

// describe('AddUser Component', () => {
//   let browser;
//   let page;

//   beforeAll(async () => {
//     browser = await puppeteer.launch();
//     page = await browser.newPage();
//   });

//   afterAll(async () => {
//     await browser.close();
//   });

//   it('should add users when "Send Link" button is clicked', async () => {
//     // Navigate to the test page containing the AddUser component
//     await page.goto('http://localhost:3000/admin/users');

//     // Wait for the email input field to be visible
//     await page.waitForSelector('input[name="email"]');

//     // // Enter email addresses in the TextField
//     await page.type('input[name="email"]', 'user1@example.com,user2@example.com,user3@example.com');

//     // // Click the "Send Link" button
//     // await page.click('button[type="button"]');

//     // // Wait for the email addresses to be processed (you may need to adjust the wait time based on the actual API response time)
//     // await page.waitForTimeout(2000);

//     // // Get the rendered Chip elements and extract their labels
//     // const chipLabels = await page.evaluate(() => {
//     //   const chips = Array.from(document.querySelectorAll('.MuiChip-root'));
//     //   return chips.map(chip => chip.textContent.trim());
//     // });

//     // // Assert that the email addresses are displayed as Chips
//     // expect(chipLabels).toEqual(['user1@example.com', 'user2@example.com', 'user3@example.com']);
//   });
// });
