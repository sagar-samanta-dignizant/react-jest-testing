/* eslint-disable testing-library/no-render-in-setup */
// const { number } = require("yup");

import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import Otp from "../../pages/auth/Otp";


describe("OTP page test", () => {
  beforeEach(() => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Otp />
        </MemoryRouter>
      </HelmetProvider>
    );
  });

  test("should load OTP page", async () => {
    // Use queryByText to check if the page contains the text "Use your SMS CODE to login"
    const OtpPageLoadText = screen.queryByText(/Use your SMS CODE to Login/i);

    // Expect the text to be present in the page
    expect(OtpPageLoadText).toBeInTheDocument();
  });
  test("should redirect to reset 2 factor page if user has not access to his phone button click on reset 2 factor authentication", async () => {

    // Find the button by its text "Reset 2 Factor Authentication" and click it
    const reset2FactorButton = screen.getByText(
      "Reset 2 Factor Authentication"
    );
    fireEvent.click(reset2FactorButton);


    // Assert that the page now shows the message "Use your SMS CODE to login"
    const smsCodeMessage = screen.getByText(/Use your SMS CODE to login/i);
    expect(smsCodeMessage).toBeInTheDocument();
  });
  test("should render the OTP input field with the correct number of input elements", () => {
    const otpInputs = screen.getAllByRole("textbox");
    expect(otpInputs).toHaveLength(6);
  });
});
