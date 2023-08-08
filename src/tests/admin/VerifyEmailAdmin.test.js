import React from "react";
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import usersService from "../../services/users.service";
import VerifyEmailAdmin from "../../pages/admin/VerifyEmailAdmin";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Verify Email Admin", () => {
  beforeEach(() => {
    usersService.sendMailVerificationEmail = jest.fn(); // Move this inside the beforeEach block
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <HelmetProvider>
        <MemoryRouter>
          <VerifyEmailAdmin />
        </MemoryRouter>
      </HelmetProvider>
    );
  });

  test('renders the OTP input field', () => {
    const otpInputs = screen.queryAllByTestId(/otp-input/i);
    expect(otpInputs.length).toBeGreaterThan(0);
  });

  test('renders the "Verify Email" button', () => {
    const verifyButton = screen.getByRole('button', { name: /Verify Email/i });
    expect(verifyButton).toBeInTheDocument();
  });

//   test('displays a success toast message when verification is successful', async () => {
//     const onSuccessCloseMock = jest.fn();
//     usersService.sendMailVerificationEmail.mockResolvedValueOnce({
//       isError: false,
//       message: "Verification successful",
//       res: {},
//     });
  
//     const verifyButton = screen.getByRole('button', { name: /Verify Email/i });
//     fireEvent.click(verifyButton);
  
//     // Wait for the promise to resolve
//     await Promise.resolve();
  
//     // Check if the mock is being called
//     console.log("kkkkk",onSuccessCloseMock);
  
//     expect(onSuccessCloseMock).toHaveBeenCalledTimes(1);
//   });
  
});
