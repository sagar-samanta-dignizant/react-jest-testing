/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/no-render-in-setup */


import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import authService from "../../services/auth.service";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ForgetPassword } from "../../pages";
import { toast } from 'react-hot-toast';

jest.mock('../../services/auth.service', () => ({
  forgotPassword: jest.fn(),
})); // Mock the authService module

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

describe("ForgetPasswordForm", () => {
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => jest.fn(),
  }));

  beforeEach(() => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ForgetPassword />
        </MemoryRouter>
      </HelmetProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should display the form title', () => {

    // Check if the title is rendered
    expect(screen.getByText('Forgot Password')).toBeInTheDocument();
  });
  test("should give form validation error after Request Password Reset button click without passing email", async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Request Password Reset' }));

    // Wait for the email and password validation errors to appear
    const emailError = await screen.findByText("Email is required");

    // Expect the email and password validation errors to be displayed on the page
    expect(emailError).toBeInTheDocument();
  });
  test('should display form validation errors for invalid data', async () => {

    const submitButton = screen.getByRole('button', { name: 'Request Password Reset' });
    fireEvent.click(submitButton);
  
    // Wait for the form validation errors to appear
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.queryByText('Password reset email sent successfully!')).not.toBeInTheDocument();
    });
  
    // Ensure that the authService.forgotPassword function is not called
    const mockForgotPassword = jest.spyOn(authService, 'forgotPassword');
    expect(mockForgotPassword).not.toHaveBeenCalled();
  })

});
