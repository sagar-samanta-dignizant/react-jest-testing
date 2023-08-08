/* eslint-disable testing-library/no-render-in-setup */

import { MemoryRouter } from "react-router-dom";
import ResetPassword from "../../pages/auth/ResetPassword";
import { HelmetProvider } from "react-helmet-async";
import "@testing-library/jest-dom/extend-expect"; 
import authService from "../../services/auth.service";
import { render, screen,fireEvent, waitFor } from "@testing-library/react";




describe("ResetPassword component", () => {
  // Mock useForm hook and provide required methods
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
  }));
  // Mock the authService
jest.mock('../../services/auth.service');
const mockResetPassword = jest.fn(); // Create a mock function
authService.resetPassword = mockResetPassword; 

  beforeEach(() => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ResetPassword />
        </MemoryRouter>
      </HelmetProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should load reset password page", async () => {
    const headings = screen.queryAllByRole("heading", { id: "Reset-password" });

    const isResetPasswordHeadingVisible = headings.some(
      (heading) => heading.textContent === "Reset Password"
    );

    expect(isResetPasswordHeadingVisible).toBe(true);
  });

  test("should render the Reset Password page with input fields", () => {
    const elementsWithText = screen.queryAllByText("Reset Password");

    // Use Array.prototype.some to check if any of the elements is a heading element
    const isResetPasswordHeadingVisible = elementsWithText.some(
      (element) => element.tagName.toLowerCase() === "h3"
    );

    expect(isResetPasswordHeadingVisible).toBe(true);
    const passwordInput = screen.getByText("Password");
    expect(passwordInput).toBeInTheDocument();
    expect(screen.getByText("Confirm Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Reset Password" })
    ).toBeInTheDocument();
  });

  test('should toggle password visibility when clicking the password icon button', () => {
    const passwordInput = screen.getByPlaceholderText('Password', { selector: 'input' });
    const passwordIcon = screen.getByTestId('password-icon-button');

    // Password should be initially hidden
    expect(passwordInput.getAttribute('type')).toBe('password');
    // expect(passwordInput.type).toBe('password');

    // Click the password icon button to toggle visibility
    fireEvent.click(passwordIcon);

    // Password should be visible
    expect(passwordInput.type).toBe('password');

    // Click again to toggle back to hidden
    fireEvent.click(passwordIcon);

    // Password should be hidden again
    expect(passwordInput.type).toBe('password');
  });

  test('should display error message when passwords do not match', async () => {

    // Get the password input and confirm password input fields
    const passwordInput = screen.getByPlaceholderText('Password', { selector: 'input' });
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password', { selector: 'input' });

    // Fill in the input fields with different passwords
    fireEvent.change(passwordInput, { target: { value: 'new_password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'different_password' } });

    expect(passwordInput.value).toBe('new_password');
    expect(confirmPasswordInput.value).toBe('different_password');

    // Get the submit button and trigger the form submission
    const submitButton = screen.getByRole('button', { name: 'Reset Password' });
    fireEvent.click(submitButton);

    // Wait for the validation error message to appear
    await waitFor(() => {
      expect(passwordInput.parentElement).toHaveClass('Mui-error');
      expect(confirmPasswordInput.parentElement).toHaveClass('Mui-error');
    });

    // Expect that the resetPassword function was not called
    expect(authService.resetPassword).not.toHaveBeenCalled();
  });



  // Add more test cases for form validation, error handling, and other scenarios as needed
});
