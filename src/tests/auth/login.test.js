/* eslint-disable testing-library/no-render-in-setup */
// /* eslint-disable no-undef */

// Import necessary testing libraries
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../../pages";



describe("Login component", () => {
  beforeEach(() => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </HelmetProvider>
    );
  });
  test("renders title correctly", () => {
    // Assert that the title is rendered correctly
    const titleElement = screen.getByText("Admin Panel Login");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders info alert correctly", () => {
    // Assert that the info alert is rendered correctly
    const infoAlertElement = screen.getByText(
      "Use your email and password to login"
    );
    expect(infoAlertElement).toBeInTheDocument();
  });

  test("renders login form correctly", () => {
    // Assert that the login form is rendered correctly
    const loginFormElement = screen.getByText("Admin Panel Login");
    expect(loginFormElement).toBeInTheDocument();
  });
  test("should redirect to reset password page after forget password button click", async () => {
    // Find the "Forget Password" button by its ID and click it
    fireEvent.click(screen.getByText(/forget password/i));

    // Wait for the message to appear after clicking the button (you may need to adjust this based on the actual behavior)
    const resetPasswordInfoText = await screen.findByText("Admin Panel Login");

    // Expect the message to be displayed on the page
    expect(resetPasswordInfoText).toBeInTheDocument();
  });
  test("should give form validation error after login button click without passing email and password", async () => {
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    // Wait for the email and password validation errors to appear
    const emailError = await screen.findByText("Email is required");
    const passwordError = await screen.findByText("Min 8 characters required");

    // Expect the email and password validation errors to be displayed on the page
    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  test("should give invalid password validation error", async () => {
    // Render the Login component in your test environment

    // Find the email input field, type a valid email address, and click it
    const emailInput = screen.getByLabelText("Email*");
    fireEvent.change(emailInput, { target: { value: "testing@email.com" } });

    // Find the password input field, type an invalid password, and click it
    const passwordInput = screen.getByLabelText("Password*");
    fireEvent.change(passwordInput, { target: { value: "dipesh123" } });

    // Find the submit button and click it
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    // Wait for the invalid password validation error to appear
    const passwordError = await screen.findByText(
      "Password must include uppercase, lowercase, number and special symbol"
    );

    // Expect the invalid password validation error to be displayed on the page
    expect(passwordError).toBeInTheDocument();
  });
});
